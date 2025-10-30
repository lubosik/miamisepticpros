# CONTENT GENERATORS — SepticTankQuoteHub

**Version:** 1.0
**Last Updated:** 2025-10-29
**Purpose:** CLI tools to generate stub content files from CSV data

---

## Overview

These generators create JSON and MDX stub files for:
- Services (16 total)
- Locations (states + cities)
- Articles (service × location combinations, ~800-1000 stubs)
- Issues (symptom pages, ~20-30 stubs)
- Cost guides (16 stubs, one per service)

**IMPORTANT:** Generators create **stubs only** with valid front matter and placeholder content. Full article content must be written manually or by content team later (see Phase 12 in `EXECUTION_PLAN.md`).

---

## Prerequisites

```bash
npm install csv-parser slugify gray-matter
```

---

## Directory Structure

```
/generators
  /data               # Input CSV files (provided by user or auto-generated)
    services.csv
    locations.csv
    targets.csv       # Service × location combinations for articles
    issues.csv
    costs.csv
  /scripts            # Generator scripts (TypeScript/JavaScript)
    generate-services.ts
    generate-locations.ts
    generate-articles.ts
    generate-issues.ts
    generate-costs.ts
  README.md           # This file
```

---

## 1. Service Generator

### Input: `data/services.csv`

**Columns:**
- `slug` (string, required) — URL-friendly slug (e.g., `septic-tank-pumping`)
- `title` (string, required) — Display name (e.g., `Septic Tank Pumping`)
- `icon` (string, optional) — Icon path or emoji (e.g., `/icons/pumping.svg` or `🚛`)
- `shortDescription` (string, required) — Brief description (80-120 chars)

**Example CSV:**
```csv
slug,title,icon,shortDescription
septic-tank-pumping,Septic Tank Pumping,🚛,Regular removal of solid waste to prevent backups and extend system life.
septic-tank-cleaning,Septic Tank Cleaning,🧼,Deep cleaning to remove buildup and restore tank efficiency.
septic-inspection,Septic Inspection,🔍,Comprehensive health check to identify issues before they become costly.
```

### Output: `/content/services/{slug}.json`

**Generator Script: `scripts/generate-services.ts`**

```typescript
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const INPUT_CSV = path.join(__dirname, '../data/services.csv');
const OUTPUT_DIR = path.join(__dirname, '../../content/services');

interface ServiceRow {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
}

const services: ServiceRow[] = [];

fs.createReadStream(INPUT_CSV)
  .pipe(csv())
  .on('data', (row: ServiceRow) => {
    services.push(row);
  })
  .on('end', () => {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    services.forEach((service) => {
      const serviceData = {
        slug: service.slug,
        title: service.title,
        icon: service.icon || '🛠️',
        shortDescription: service.shortDescription,
        fullDescription: `## What Is ${service.title}?\n\n[TODO: Add detailed description here]\n\n## Why You Need ${service.title}\n\n[TODO: Add benefits here]\n\n## How It Works\n\n[TODO: Add process here]`,
        metaDescription: `Professional ${service.title.toLowerCase()} services. Learn what it is, how often you need it, average costs, and how to find a trusted contractor near you.`,
        faqs: [
          {
            question: `How often do I need ${service.title.toLowerCase()}?`,
            answer: '[TODO: Add answer]'
          },
          {
            question: `How much does ${service.title.toLowerCase()} cost?`,
            answer: '[TODO: Add answer]'
          },
          {
            question: `Can I do ${service.title.toLowerCase()} myself?`,
            answer: '[TODO: Add answer]'
          }
        ],
        relatedServices: [],
        schema: {
          serviceType: service.title,
          category: 'Maintenance'
        }
      };

      const outputPath = path.join(OUTPUT_DIR, `${service.slug}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(serviceData, null, 2));
      console.log(`✅ Created ${outputPath}`);
    });

    console.log(`\n🎉 Generated ${services.length} service files`);
  });
```

### Run:
```bash
npm run generate:services
# or
npx ts-node generators/scripts/generate-services.ts
```

---

## 2. Location Generator

### Input: `data/locations.csv`

**Columns:**
- `city` (string, required) — City name (e.g., `Miami`)
- `state` (string, required) — Full state name (e.g., `Florida`)
- `stateCode` (string, required) — Two-letter code (e.g., `FL`)
- `population` (integer, optional) — Approximate population
- `county` (string, optional) — County name

**Example CSV:**
```csv
city,state,stateCode,population,county
Miami,Florida,FL,442241,Miami-Dade County
Tampa,Florida,FL,387050,Hillsborough County
Orlando,Florida,FL,307573,Orange County
Jacksonville,Florida,FL,949611,Duval County
Fort Lauderdale,Florida,FL,182760,Broward County
```

### Output: `/content/locations/{stateCode}/{city-slug}.json`

**Generator Script: `scripts/generate-locations.ts`**

```typescript
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import slugify from 'slugify';

const INPUT_CSV = path.join(__dirname, '../data/locations.csv');
const OUTPUT_DIR = path.join(__dirname, '../../content/locations');

interface LocationRow {
  city: string;
  state: string;
  stateCode: string;
  population?: string;
  county?: string;
}

const locations: LocationRow[] = [];

fs.createReadStream(INPUT_CSV)
  .pipe(csv())
  .on('data', (row: LocationRow) => {
    locations.push(row);
  })
  .on('end', () => {
    locations.forEach((location) => {
      const citySlug = slugify(location.city, { lower: true, strict: true });
      const stateDir = path.join(OUTPUT_DIR, location.stateCode.toLowerCase());

      // Create state directory if doesn't exist
      if (!fs.existsSync(stateDir)) {
        fs.mkdirSync(stateDir, { recursive: true });
      }

      const locationData = {
        city: location.city,
        state: location.state,
        stateCode: location.stateCode,
        slug: citySlug,
        county: location.county || '',
        population: parseInt(location.population || '0', 10),
        availableServices: [
          'septic-tank-pumping',
          'septic-tank-cleaning',
          'septic-inspection',
          'real-estate-septic-inspection',
          'septic-tank-repair',
          'emergency-pumping',
          'drainfield-repair',
          'drainfield-replacement',
          'septic-installation',
          'riser-installation',
          'baffle-replacement',
          'septic-tank-locating',
          'camera-inspection',
          'lift-station-service',
          'septic-system-maintenance'
        ],
        localInsights: `## Septic Systems in ${location.city}\n\n[TODO: Add local-specific information here: soil type, water table, regulations, climate considerations]\n\n### Local Regulations\n\n[TODO: Add county/city regulations]\n\n### Common Issues\n\n[TODO: Add regional issues]`,
        metaDescription: `Find trusted septic pros in ${location.city}, ${location.stateCode}. Get free quotes for pumping, inspection, repair, drainfield work, and emergency service. Local experts.`
      };

      const outputPath = path.join(stateDir, `${citySlug}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(locationData, null, 2));
      console.log(`✅ Created ${outputPath}`);
    });

    console.log(`\n🎉 Generated ${locations.length} location files`);
  });
```

### Run:
```bash
npm run generate:locations
# or
npx ts-node generators/scripts/generate-locations.ts
```

---

## 3. Article Generator (Resources)

### Input: `data/targets.csv`

**Columns:**
- `service` (string, required) — Service slug
- `stateCode` (string, required) — Two-letter state code
- `state` (string, required) — Full state name
- `city` (string, required) — City name
- `priority` (integer, optional) — Priority ranking (1 = highest)

**Example CSV:**
```csv
service,stateCode,state,city,priority
septic-tank-pumping,FL,Florida,Miami,1
septic-tank-pumping,FL,Florida,Tampa,1
septic-tank-pumping,FL,Florida,Orlando,1
septic-inspection,FL,Florida,Miami,2
septic-inspection,FL,Florida,Tampa,2
```

**Note:** This CSV can have 800-1000+ rows (service × location combinations). Prioritize high-population cities.

### Output: `/content/resources/{service}/{stateCode}-{city-slug}.mdx`

**Generator Script: `scripts/generate-articles.ts`**

```typescript
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import slugify from 'slugify';
import matter from 'gray-matter';

const INPUT_CSV = path.join(__dirname, '../data/targets.csv');
const OUTPUT_DIR = path.join(__dirname, '../../content/resources');

interface TargetRow {
  service: string;
  stateCode: string;
  state: string;
  city: string;
  priority?: string;
}

const targets: TargetRow[] = [];

fs.createReadStream(INPUT_CSV)
  .pipe(csv())
  .on('data', (row: TargetRow) => {
    targets.push(row);
  })
  .on('end', () => {
    targets.forEach((target) => {
      const citySlug = slugify(target.city, { lower: true, strict: true });
      const locationSlug = `${target.stateCode.toLowerCase()}-${citySlug}`;
      const serviceDir = path.join(OUTPUT_DIR, target.service);

      // Create service directory if doesn't exist
      if (!fs.existsSync(serviceDir)) {
        fs.mkdirSync(serviceDir, { recursive: true });
      }

      // Convert service slug to title (e.g., "septic-tank-pumping" -> "Septic Tank Pumping")
      const serviceTitle = target.service
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const frontMatter = {
        title: `Complete Guide to ${serviceTitle} in ${target.city}, ${target.stateCode}`,
        slug: `${target.service}-${locationSlug}`,
        service: target.service,
        state: target.state,
        stateCode: target.stateCode,
        city: target.city,
        citySlug: citySlug,
        primaryKeyword: `${serviceTitle.toLowerCase()} in ${target.city} ${target.stateCode}`,
        supportKeywords: [
          `${target.city} ${serviceTitle.toLowerCase()} cost`,
          `${serviceTitle.toLowerCase()} ${target.city}`,
          `${serviceTitle.toLowerCase()} near me ${target.city}`,
          `licensed ${serviceTitle.toLowerCase()} contractors ${target.city}`
        ],
        metaDescription: `Everything you need to know about ${serviceTitle.toLowerCase()} in ${target.city}: how often you need it, costs, what to expect, and how to find a trusted contractor.`,
        ogImage: `/images/og/${target.service}-${locationSlug}.png`,
        publishedDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        author: 'SepticTankQuoteHub',
        sources: [],
        relatedArticles: [],
        schema: {
          type: 'Article',
          hasFAQ: true,
          hasHowTo: false
        }
      };

      const content = `
If you own a septic system in ${target.city}, ${target.state}, understanding ${serviceTitle.toLowerCase()} is essential to prevent backups, odors, and costly repairs. This guide covers everything you need to know about ${serviceTitle.toLowerCase()} in ${target.city}: how often you need it, what it costs, and how to find a trusted contractor in ${target.city}.

## What Is ${serviceTitle}?

[TODO: Add detailed explanation of the service, specific to ${target.city} if relevant]

## Why You Need ${serviceTitle} in ${target.city}

[TODO: Add benefits and importance, mention local factors like climate, soil, regulations]

## How ${serviceTitle} Works

[TODO: Add step-by-step process]

## Cost Breakdown for ${target.city}, ${target.stateCode}

[TODO: Add cost table with local pricing]

| Factor | Cost Range | Notes |
|--------|------------|-------|
| Standard service | $XXX–$XXX | Most common |
| Large/complex | $XXX–$XXX | Additional time/equipment |
| Emergency | $XXX–$XXX | After-hours surcharge |

## Finding ${serviceTitle} Pros in ${target.city}

[TODO: Add tips for finding contractors, what to look for, licensing requirements in ${target.stateCode}]

## Frequently Asked Questions

### How often do I need ${serviceTitle.toLowerCase()} in ${target.city}?

[TODO: Add answer with local context]

### How much does ${serviceTitle.toLowerCase()} cost in ${target.city}?

[TODO: Add answer with local pricing]

### What should I look for in a ${target.city} ${serviceTitle.toLowerCase()} contractor?

[TODO: Add answer]

---

**Note:** This is a placeholder stub. Replace all [TODO] sections with researched, original content before publishing.
`.trim();

      const fileContent = matter.stringify(content, frontMatter);
      const outputPath = path.join(serviceDir, `${locationSlug}.mdx`);

      fs.writeFileSync(outputPath, fileContent);
      console.log(`✅ Created ${outputPath}`);
    });

    console.log(`\n🎉 Generated ${targets.length} article stubs`);
  });
```

### Run:
```bash
npm run generate:articles
# or
npx ts-node generators/scripts/generate-articles.ts
```

---

## 4. Issue Generator

### Input: `data/issues.csv`

**Columns:**
- `slug` (string, required) — URL-friendly slug (e.g., `drains-gurgling`)
- `title` (string, required) — Issue title/question (e.g., `Why Are My Drains Gurgling?`)
- `severity` (string, optional) — `low`, `medium`, `high`, `emergency`

**Example CSV:**
```csv
slug,title,severity
drains-gurgling,Why Are My Drains Gurgling?,medium
slow-draining-sinks,Slow Draining Sinks: Causes & Solutions,medium
sewage-backup,Sewage Backup in House: What to Do,emergency
foul-odors,Foul Odors Near Septic Tank,high
wet-spots-yard,Wet Spots in Yard Over Septic System,high
```

### Output: `/content/issues/{slug}.mdx`

**Generator Script: `scripts/generate-issues.ts`**

Similar structure to article generator, creates MDX stubs with front matter matching `issue.json` schema.

---

## 5. Cost Guide Generator

### Input: `data/costs.csv`

**Columns:**
- `slug` (string, required) — Service slug
- `service` (string, required) — Service slug (same as slug)
- `nationalMin` (number, required) — National minimum cost
- `nationalMax` (number, required) — National maximum cost
- `typical` (number, optional) — Most common cost

**Example CSV:**
```csv
slug,service,nationalMin,nationalMax,typical
septic-tank-pumping,septic-tank-pumping,300,600,425
septic-inspection,septic-inspection,200,500,350
drainfield-replacement,drainfield-replacement,5000,20000,10000
```

### Output: `/content/costs/{slug}.mdx`

**Generator Script: `scripts/generate-costs.ts`**

Similar structure to article generator, creates MDX stubs with front matter matching `cost.json` schema.

---

## 6. NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "generate:services": "ts-node generators/scripts/generate-services.ts",
    "generate:locations": "ts-node generators/scripts/generate-locations.ts",
    "generate:articles": "ts-node generators/scripts/generate-articles.ts",
    "generate:issues": "ts-node generators/scripts/generate-issues.ts",
    "generate:costs": "ts-node generators/scripts/generate-costs.ts",
    "generate:all": "npm run generate:services && npm run generate:locations && npm run generate:articles && npm run generate:issues && npm run generate:costs"
  }
}
```

---

## 7. Validation

After running generators, validate all front matter:

```bash
npm run validate:content
```

**Validation Script: `scripts/validate-content.ts`**

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

// Load schemas
const resourceSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../content-types/resource.json'), 'utf-8')
);

// Validate all MDX files in /content/resources
const resourceDir = path.join(__dirname, '../../content/resources');

let errors = 0;
let validated = 0;

function validateDirectory(dir: string, schema: any) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      validateDirectory(fullPath, schema);
    } else if (file.name.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const parsed = matter(content);

      const validate = ajv.compile(schema);
      const valid = validate(parsed.data);

      if (!valid) {
        console.error(`❌ ${fullPath}`);
        console.error(validate.errors);
        errors++;
      } else {
        console.log(`✅ ${fullPath}`);
        validated++;
      }
    }
  });
}

validateDirectory(resourceDir, resourceSchema);

console.log(`\n📊 Validation complete: ${validated} files validated, ${errors} errors`);
process.exit(errors > 0 ? 1 : 0);
```

---

## 8. CSV Data Sources

### Option 1: Manual Creation
Create CSV files manually in `/generators/data/` using the column specs above.

### Option 2: Auto-generate from Existing Data
If you have a list of cities/services, write a script to generate CSVs:

```typescript
// Example: Generate locations.csv from city list
const cities = [
  { city: 'Miami', state: 'Florida', stateCode: 'FL', population: 442241 },
  { city: 'Tampa', state: 'Florida', stateCode: 'FL', population: 387050 },
  // ... more cities
];

const csv = 'city,state,stateCode,population\n' +
  cities.map((c) => `${c.city},${c.state},${c.stateCode},${c.population}`).join('\n');

fs.writeFileSync('generators/data/locations.csv', csv);
```

### Option 3: Import from External API
Use census data, Google Places API, or other sources to generate location CSV automatically.

---

## 9. Bulk Content Workflow

**Phase 9 (Generators):**
1. Prepare CSV files in `/generators/data/`
2. Run generators to create stubs
3. Validate front matter with `validate:content` script
4. Commit stubs to repository

**Phase 12 (Content Population — Ongoing):**
1. Writer/content team picks a stub file
2. Replace all `[TODO]` sections with researched content
3. Follow `ARTICLE_STYLE.md` guidelines (1,200+ words, TOC structure, FAQs)
4. Update `updatedDate` in front matter
5. Submit for QA review
6. Publish (rebuild site to include new content)

---

## 10. Cursor Implementation Notes

When building generators in Phase 9:

- [ ] Create all 5 generator scripts (services, locations, articles, issues, costs)
- [ ] Add NPM scripts to `package.json`
- [ ] Test generators with sample CSV files (5-10 rows each)
- [ ] Validate output against JSON schemas in `/content-types/`
- [ ] Create validation script to check front matter
- [ ] Document CSV column requirements in this README
- [ ] Commit generators to repository (but NOT the 800+ generated stubs yet)

**Do not generate full article content.** Stubs only with placeholder text marked `[TODO]`.

---

## 11. Example Run

```bash
# Step 1: Prepare CSV files (manual or scripted)
# Place in /generators/data/

# Step 2: Run generators
npm run generate:all

# Step 3: Validate
npm run validate:content

# Step 4: Check output
ls content/services/        # Should see 16 JSON files
ls content/locations/fl/    # Should see city JSON files
ls content/resources/       # Should see service directories with MDX stubs

# Step 5: Manual content population (Phase 12)
# Edit /content/resources/septic-tank-pumping/fl-miami.mdx
# Replace [TODO] with real content
# Update front matter dates
# Save and commit
```

---

## 12. Maintenance

- **Update service list:** Edit `services.csv`, re-run `generate:services`
- **Add new cities:** Append to `locations.csv`, re-run `generate:locations`
- **Add new articles:** Append to `targets.csv`, re-run `generate:articles`
- **Re-validate all content:** Run `validate:content` after bulk edits

---

**END OF GENERATORS README**
