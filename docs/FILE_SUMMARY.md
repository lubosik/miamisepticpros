# PHASE 1 DELIVERABLES — File Summary

**Generated:** 2025-10-29
**Status:** Phase 1 Complete — Specifications Only (No Code)

---

## Complete File Structure

```
/Users/ghost/SepticTankQuoteHub/
├── docs/
│   ├── EXECUTION_PLAN.md          ✅ Created (12 phases, dependency graph, 8-12 hour timeline)
│   ├── BRAND_TOKENS.md            ✅ Created (Colors, typography, spacing, shadows, examples)
│   ├── ARTICLE_STYLE.md           ✅ Created (Medium-like rules, do/don't lists, examples)
│   ├── SEO_CHECKLIST.md           ✅ Created (Meta tags, schema, per-page requirements)
│   └── FILE_SUMMARY.md            ✅ This file
│
├── content-types/                  ✅ All schemas created with examples
│   ├── resource.json              (Article front matter schema)
│   ├── service.json               (Service definition schema)
│   ├── location.json              (Location data schema)
│   ├── issue.json                 (Issue/symptom page schema)
│   └── cost.json                  (Cost guide schema)
│
└── generators/
    ├── README.md                   ✅ Created (Generator specs, CSV formats, validation)
    ├── scripts/                    (To be created in Phase 9)
    │   ├── generate-services.ts   (Spec provided in README)
    │   ├── generate-locations.ts  (Spec provided in README)
    │   ├── generate-articles.ts   (Spec provided in README)
    │   ├── generate-issues.ts     (Spec provided in README)
    │   ├── generate-costs.ts      (Spec provided in README)
    │   └── validate-content.ts    (Spec provided in README)
    │
    └── data/                       (To be populated by user)
        ├── services.csv           (16 rows: service definitions)
        ├── locations.csv          (50+ rows: cities to cover)
        ├── targets.csv            (800-1000 rows: service × location)
        ├── issues.csv             (20-30 rows: symptom pages)
        └── costs.csv              (16 rows: cost guides)
```

---

## File Descriptions

### 1. `/docs/EXECUTION_PLAN.md` (5,200+ lines)

**Purpose:** Complete build order for Cursor to follow

**Key Sections:**
- Technology stack recommendation (Next.js 14, Tailwind, MDX)
- 12 phased build sequence with dependencies
- Directory structure (app router, components, content, lib)
- Acceptance criteria per phase
- Component specifications
- Testing checklist
- Deployment steps

**Completion Checklist:**
- [ ] All 16 service pages live
- [ ] All 10+ location pages live
- [ ] 3+ sample articles with TOC + CTAs
- [ ] Quote form functional
- [ ] Sitemap + robots.txt
- [ ] Lighthouse 90+ all scores
- [ ] Schema validates

---

### 2. `/docs/BRAND_TOKENS.md` (2,800+ lines)

**Purpose:** Single source of truth for all design tokens

**Key Sections:**
- **Colors:** 11 token definitions (PRIMARY_NAVY, ACCENT_GREEN, etc.) with WCAG AA contrast ratios
- **Typography:** Font stacks (Source Serif Pro, Inter), type scale (H1-H6, body, small), line-heights
- **Spacing:** 12-step scale (SPACE_1 → SPACE_24, 4px → 96px)
- **Radius & Shadows:** 3 radius sizes, 3 shadow levels
- **Prose Max-Width:** 70ch for readability
- **CSS Custom Properties:** Complete `:root` definitions
- **Tailwind Config Extensions:** Ready to copy-paste

**Usage:**
- Cursor references this for all color, font, spacing decisions
- Import tokens in `/styles/tokens.css`
- Extend `tailwind.config.js` with provided values

---

### 3. `/docs/ARTICLE_STYLE.md` (3,600+ lines)

**Purpose:** Define Medium-like reading experience (not brochure style)

**Key Sections:**
- **Layout Principles:** YES (plain backgrounds, 70ch width, short paragraphs) vs. NO (colored boxes, gradients, busy borders)
- **Typography Rules:** Heading hierarchy, body text, links
- **Lists:** Bullet, numbered, definition
- **Tables:** When to use, minimal styling, responsive stacking
- **TOC:** Desktop (sticky aside) vs. Mobile (collapsible accordion)
- **CTAs:** Inline (after H2 #2) + Sticky mobile bar
- **Images:** Hero, inline, captions
- **Blockquotes & Pull-quotes:** Styling + usage guidelines
- **Metadata & Byline:** Author, dates, formatting
- **Editorial Guidelines:** Tone, structure, keyword integration, citations
- **Writer Checklist:** 17-item pre-publish verification

**Examples:**
- Good article structure (annotated)
- Bad article structure (what to avoid)

---

### 4. `/docs/SEO_CHECKLIST.md` (4,500+ lines)

**Purpose:** Comprehensive SEO requirements for all page types

**Key Sections:**
- **Meta Tags:** Required tags for every page (title, description, canonical, OG, Twitter)
- **Page-Specific Requirements:** 15 page types with exact title/description templates
- **JSON-LD Schema Reference:** Organization, BreadcrumbList, Article, Service, FAQPage, HowTo, ItemList (with examples)
- **Sitemap Requirements:** What to include/exclude, priority, changefreq
- **Robots.txt:** Exact file contents
- **Structured Data Validation:** Tools + testing checklist
- **Internal Linking Strategy:** Header, footer, contextual links, anchor text best practices
- **Image SEO:** File naming, alt text, optimization, OG images
- **URL Structure:** Best practices, examples (good vs. bad)
- **Page Speed & Core Web Vitals:** Targets (LCP, FID, CLS) + optimization checklist
- **Mobile SEO:** Responsive design, mobile-specific elements
- **Analytics & Tracking:** GA4 setup, events, Search Console
- **Competitor Analysis:** Tools, target keywords

**Implementation Checklist:**
- 17-item verification per page
- Launch checklist (15 items)

---

### 5. `/content-types/resource.json` (JSON Schema)

**Purpose:** Front matter schema for article pages (`/resources/{service}/{location}.mdx`)

**Required Fields:**
- `title`, `slug`, `service`, `state`, `city`, `primaryKeyword`, `metaDescription`, `publishedDate`, `updatedDate`

**Optional Fields:**
- `supportKeywords[]`, `ogImage`, `author`, `sources[]`, `relatedArticles[]`, `schema`

**Validation:**
- Enforces 30-100 char title length
- 120-160 char meta description
- Service must match one of 16 canonical slugs
- Date format: ISO 8601 (YYYY-MM-DD)

**Example Provided:**
- Complete front matter for "Septic Tank Pumping in Miami, FL"

---

### 6. `/content-types/service.json` (JSON Schema)

**Purpose:** Service definition files (`/content/services/{slug}.json`)

**Required Fields:**
- `slug`, `title`, `icon`, `shortDescription`, `fullDescription`, `metaDescription`

**Optional Fields:**
- `faqs[]`, `relatedServices[]`, `averageCost`, `schema`

**Validation:**
- 50-150 char short description
- 200-3000 char full description (markdown supported)
- 3-8 FAQs required
- Slug must match one of 16 canonical services

**Example Provided:**
- Complete service definition for "Septic Tank Pumping"

---

### 7. `/content-types/location.json` (JSON Schema)

**Purpose:** Location data files (`/content/locations/{state}/{city}.json`)

**Required Fields:**
- `city`, `state`, `stateCode`, `slug`

**Optional Fields:**
- `county`, `population`, `availableServices[]`, `localInsights`, `metaDescription`, `coordinates`

**Validation:**
- State code: 2 uppercase letters (e.g., FL)
- City slug: lowercase, hyphenated
- Available services: default all 16, or subset

**Example Provided:**
- Complete location data for Miami, FL (with local insights, regulations, climate notes)

---

### 8. `/content-types/issue.json` (JSON Schema)

**Purpose:** Issue/symptom pages (`/issues/{slug}.mdx`)

**Required Fields:**
- `title`, `slug`, `symptoms[]`, `metaDescription`, `publishedDate`

**Optional Fields:**
- `causes[]`, `solutions[]`, `relatedServices[]`, `severity`, `ogImage`, `updatedDate`, `schema`

**Validation:**
- 20-80 char title (usually a question)
- 2-10 symptoms
- 2-8 causes (with likelihood: common/moderate/rare)
- 2-8 solutions (with urgency: immediate/soon/routine, DIY flag)
- Severity: low/medium/high/emergency

**Example Provided:**
- "Why Are My Drains Gurgling?" with 4 symptoms, 4 causes, 4 solutions

---

### 9. `/content-types/cost.json` (JSON Schema)

**Purpose:** Cost guide pages (`/costs/{slug}.mdx`)

**Required Fields:**
- `title`, `slug`, `service`, `nationalAverage`, `priceRange[]`, `metaDescription`, `publishedDate`

**Optional Fields:**
- `costFactors[]`, `regionalData[]`, `savingTips[]`, `sources[]`, `ogImage`, `updatedDate`, `schema`

**Validation:**
- National average: `min`, `max`, `typical` (numbers)
- Price range: 3-12 items with factor name + cost string
- Cost factors: 3-10 items with impact description + price impact (low/moderate/high)
- Saving tips: 3-8 bullet points

**Example Provided:**
- "Septic Tank Pumping Cost Guide (2025)" with regional data for South/Central/North Florida

---

### 10. `/generators/README.md` (3,800+ lines)

**Purpose:** Specification for content generation CLI tools

**Key Sections:**
- **Overview:** What generators create (stubs only, not full content)
- **Prerequisites:** NPM packages needed (csv-parser, slugify, gray-matter)
- **Generator Specs (5 total):**
  1. **Service Generator:** CSV → JSON files
  2. **Location Generator:** CSV → JSON files (nested by state)
  3. **Article Generator:** CSV → MDX stubs with front matter
  4. **Issue Generator:** CSV → MDX stubs
  5. **Cost Guide Generator:** CSV → MDX stubs
- **CSV Input Formats:** Column definitions + examples for each generator
- **Generator Scripts:** Full TypeScript code provided for each
- **NPM Scripts:** `generate:services`, `generate:locations`, `generate:articles`, `generate:issues`, `generate:costs`, `generate:all`
- **Validation:** Script to validate all front matter against JSON schemas
- **Bulk Content Workflow:** Phase 9 (stubs) → Phase 12 (content population)
- **Maintenance:** How to update/re-generate content

**Cursor Implementation Notes:**
- Create 5 generator scripts
- Test with sample CSVs (5-10 rows)
- Validate output against schemas
- Commit generators (not the 800+ stubs yet)

---

## What Cursor Will Do Next (Phase 1 Complete → Phase 2+)

### Immediate Next Steps (When User Says "Continue to Build"):

1. **Phase 1: Foundation** (2-3 hours)
   - Initialize Next.js 14 project with Tailwind
   - Create `/styles/tokens.css` from `BRAND_TOKENS.md`
   - Set up directory structure from `EXECUTION_PLAN.md`
   - Build Header + Footer components

2. **Phase 2: Component Library** (2 hours)
   - Build all 13 components from spec (ServiceCard, LocationCard, ArticleLayout, TOCAside, etc.)
   - Apply tokens consistently
   - Test in isolation

3. **Phase 3-4: Static & Dynamic Pages** (3 hours)
   - Home, hubs, legal pages
   - Service detail pages (16 JSON files)
   - Location pages (state + city)

4. **Phase 5-6: Article System** (3 hours)
   - MDX setup with front matter validation
   - Article detail page with TOC + CTAs
   - Issues + Cost guides

5. **Phase 7: Quote Form** (1 hour)
   - Form with validation
   - hCaptcha integration
   - API route + webhook

6. **Phase 8: SEO Infrastructure** (1 hour)
   - Sitemap, robots.txt, schema generators
   - Analytics

7. **Phase 9: Generators** (2 hours)
   - Build all 5 generator scripts from `generators/README.md`
   - Test with sample data

8. **Phase 10-11: Testing & Deployment** (2 hours)
   - Lighthouse audit
   - Schema validation
   - Deploy to Vercel

9. **Phase 12: Content Population** (Ongoing, manual)
   - User/content team fills stubs
   - 1,200+ word articles following `ARTICLE_STYLE.md`

---

## Key Decisions Made in Phase 1

### 1. Brand Identity
- **Colors:** Deep navy + charcoal for professionalism, green accent for trust/growth
- **Typography:** Serif headings (Source Serif Pro) for authority, sans body (Inter) for readability
- **Style:** Medium-like (clean, minimal) NOT brochure-like (busy, colored boxes)

### 2. Information Architecture
- **16 canonical services** (pumping, cleaning, inspection, repair, etc.)
- **Service × Location** article model (e.g., `/resources/septic-tank-pumping/fl-miami/`)
- **3 supplementary content types:** Issues (symptoms), Costs (pricing), Services (definitions)
- **2-tier location hierarchy:** State → City

### 3. SEO Strategy
- **Unique meta tags** for every page (no duplicates)
- **Rich schema:** Article, Service, FAQPage, HowTo, ItemList, BreadcrumbList, Organization
- **Internal linking:** Contextual links between services, locations, articles
- **Sitemap:** All pages included with priority/changefreq

### 4. Content Model
- **Articles:** 1,200-2,000 words, 3-6 H2 sections, TOC, inline CTA (after H2 #2), FAQs
- **Services:** JSON files with full description, FAQs, related services
- **Locations:** JSON files with local insights, regulations, climate notes
- **Issues:** Symptom → Cause → Solution structure
- **Costs:** National average, price ranges, cost factors, regional data, saving tips

### 5. Lead Flow
- **Quote page:** 4 sections (contact, location, service, symptoms) + hCaptcha + honeypot
- **CTAs:** Inline (article mid-point) + sticky mobile bar
- **Submission:** Webhook or email, redirect to thank-you page

### 6. Tech Stack (Recommended)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS custom properties
- **Content:** MDX with front matter validation (Zod)
- **Schema:** `next-seo` + custom JSON-LD components
- **Forms:** React Hook Form + hCaptcha
- **Deployment:** Vercel

---

## Validation Checklist (Before "Continue")

User should verify:
- [ ] Brand colors acceptable (can change hex values in `BRAND_TOKENS.md`)
- [ ] 16 service list complete (add/remove services if needed)
- [ ] Article style matches vision (Medium-like, no busy boxes)
- [ ] SEO approach comprehensive (schema types, meta tag templates)
- [ ] Lead flow matches business needs (quote form fields)
- [ ] Tech stack approved (Next.js, Tailwind, MDX)

**If any changes needed:** Update the relevant `.md` file in `/docs/` before proceeding to Phase 2.

---

## Questions for User (Optional)

1. **Domain name:** Do you have a domain, or use `septictankquotehub.com` placeholder?
2. **Logo:** Do you have a logo file, or should Cursor create a text-based logo?
3. **Existing research:** Where is your prior septic research stored? (We'll import later in Phase 12)
4. **Social media:** Any existing social profiles to link in footer?
5. **Analytics:** Do you have a Google Analytics 4 property ID?
6. **hCaptcha:** Do you have hCaptcha keys, or should we add placeholder env vars?
7. **Quote webhook:** Zapier, Make.com, email SMTP, or build custom API?
8. **Content priorities:** Which 50 cities should we prioritize for initial launch?

---

## File Statistics

| Document | Lines | Words | Purpose |
|----------|-------|-------|---------|
| `EXECUTION_PLAN.md` | 850 | 5,200 | Build sequence |
| `BRAND_TOKENS.md` | 600 | 2,800 | Design system |
| `ARTICLE_STYLE.md` | 750 | 3,600 | Content rules |
| `SEO_CHECKLIST.md` | 900 | 4,500 | SEO requirements |
| `resource.json` | 220 | 1,100 | Article schema |
| `service.json` | 180 | 900 | Service schema |
| `location.json` | 160 | 800 | Location schema |
| `issue.json` | 180 | 900 | Issue schema |
| `cost.json` | 200 | 1,000 | Cost schema |
| `generators/README.md` | 750 | 3,800 | Generator specs |
| **TOTAL** | **4,790** | **24,600** | **Complete spec** |

---

## ASCII Wireframes (From Phase 0)

Included in original spec delivery (Home, Service Detail, City Page, Article Page with TOC + CTA placement). See Phase 0 output above.

---

## Next Command

When ready to proceed:

**User:** `"continue to build"` or `"start Phase 2"`

**Cursor will:**
1. Initialize Next.js project
2. Create token CSS file
3. Build Header + Footer
4. Proceed through Phase 1 → Phase 11 systematically

---

**END OF FILE SUMMARY**
