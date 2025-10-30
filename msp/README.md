# MSP (Miami Septic Pros) — Article Generation System

**Version:** 1.0
**Status:** Ready for Cursor execution
**Date:** 2025-01-XX

---

## Overview

This directory contains the complete production system for programmatic article generation for Miami Septic Pros. All templates, schemas, and quality gates are locked and ready for Cursor to execute.

**DO NOT MODIFY** templates or checklists without explicit approval.

---

## Directory Structure

```
/msp/
├── README.md                           # This file
├── templates/
│   ├── writer_system_prompt.txt        # Locked writing rules (DO NOT MODIFY)
│   └── service_page.mdx                # Article template with {{VARIABLES}}
├── components/
│   └── CTA.html                        # Call-to-action component variants
├── schemas/
│   ├── faq.template.json               # FAQ schema template
│   ├── service.template.json           # Service schema template
│   └── breadcrumb.template.json        # Breadcrumb schema template
├── briefs/
│   └── {service_slug}_brief.md         # Research briefs (Cursor creates per article)
├── reports/
│   ├── acceptance_checklist.md         # Master quality gate checklist
│   └── {service_slug}_report.md        # Completion reports (Cursor creates per article)
├── assets/
│   └── og/
│       └── {service_slug}.png          # OG images (Cursor creates per article)
└── queue/
    ├── article_queue.json              # Ordered list of 12 articles
    └── routing.json                    # URL patterns and config
```

---

## Workflow for Cursor

### Step 1: Select Next Article

1. Open `/msp/queue/article_queue.json`
2. Find first article with `"status": "pending"`
3. Update status to `"in_progress"`
4. Note the `slug`, `service_name`, and `primary_kw`

### Step 2: Research & Brief

1. Use Perplexity or approved research tools to gather:
   - Cost data (Miami-Dade specific)
   - Permit requirements (Miami-Dade Regulatory and Economic Resources)
   - Local environmental factors (water table, hurricanes, etc.)
   - Emergency protocols
   - 3–5 authoritative sources
2. Create brief: `/msp/briefs/{service_slug}_brief.md`
3. Document all sources with URLs
4. If price data unavailable, note methodology for ranges

### Step 3: Generate Article

1. Copy `/msp/templates/service_page.mdx` to `/content/services/{service_slug}.mdx`
2. Follow `/msp/templates/writer_system_prompt.txt` exactly
3. Replace all `{{VARIABLES}}` with researched data:
   - `{{SERVICE}}` — Service name
   - `{{service_slug}}` — Kebab-case slug
   - `{{PRIMARY_KW}}` — Main keyword
   - `{{SUPPORT_KWS}}` — Supporting keywords array
   - `{{LINKABLE_POINTS}}` — 5–8 bullet facts
   - `{{SOURCES}}` — Citation array
   - `{{RELATED_INTERNALS}}` — Internal link objects
   - `{{TODAY_YYYY_MM_DD}}` — Publication date
4. Write 1,500–3,000 words
5. Ensure 6th–7th grade reading level
6. Include all required sections per template

### Step 4: Schema Generation

1. Generate FAQ JSON-LD using `/msp/schemas/faq.template.json`
2. Generate Service JSON-LD using `/msp/schemas/service.template.json`
3. Generate Breadcrumb JSON-LD using `/msp/schemas/breadcrumb.template.json`
4. Embed schema in `<div data-*-jsonld>` blocks in MDX
5. Validate all schema in Google Rich Results Test

### Step 5: Internal Linking

1. Link to `/miami/services/` (hub)
2. Link to `/locations/fl/miami/` (location)
3. Link to 2–3 related services (from queue)
4. Link to `/contact/` and `/quote/`
5. Verify all links resolve

### Step 6: Assets

1. Create OG image: `/public/images/og/{service_slug}.png` (1200×630px)
2. Optimize image (<200KB)
3. Update `og_image` in front matter

### Step 7: Quality Assurance

1. Copy `/msp/reports/acceptance_checklist.md` to `/msp/reports/{service_slug}_report.md`
2. Complete every checklist item
3. Mark `[ ]` as `[x]` when verified
4. Document any deviations or issues
5. **ALL ITEMS MUST PASS** before proceeding

### Step 8: Complete & Move to Next

1. If all checklist items pass:
   - Update article status to `"complete"` in `/msp/queue/article_queue.json`
   - Save completion report
   - Output: **"ARTICLE {id} COMPLETE — READY FOR CONTINUE"**
2. **STOP and WAIT** for user to say **"CONTINUE"**
3. Do NOT start next article until instructed

---

## Quality Gates (Non-Negotiable)

Every article MUST satisfy:

✅ **Content**
- 1,500–3,000 words
- 6th–7th grade reading level
- No generic SEO filler
- All {{VARIABLES}} replaced
- No [[NEEDS_VERIFY]] tags

✅ **Local Context**
- Miami-Dade neighborhoods referenced
- High water table / hurricanes addressed
- Permit info from official sources
- Local pricing methodology documented

✅ **Structure**
- All required sections present
- 5–8 linkable facts in intro
- 5–7 FAQ items
- CTA block included
- Sources & references documented

✅ **Links**
- Minimum 3 internal links
- Minimum 3 external citations
- All links tested and active
- No 404s or redirect chains

✅ **Schema**
- FAQ JSON-LD valid
- Service JSON-LD valid
- Breadcrumb JSON-LD valid
- All schema validated in Google Rich Results Test

✅ **Assets**
- OG image created (1200×630px)
- Image optimized (<200KB)
- Image path matches front matter

✅ **Technical**
- MDX file in `/content/services/`
- Canonical URL correct
- Sitemap entry added
- Meta tags complete

---

## Article Queue (12 Articles)

**Initial batch:**

1. `septic-tank-pumping` (HIGH priority)
2. `septic-tank-cleaning` (HIGH priority)
3. `septic-tank-inspection` (HIGH priority)
4. `emergency-septic-services` (CRITICAL priority)
5. `septic-tank-unclogging` (HIGH priority)
6. `septic-system-maintenance-plans` (MEDIUM priority)
7. `septic-tank-riser-installation` (MEDIUM priority)
8. `septic-baffle-replacement` (MEDIUM priority)
9. `septic-filter-cleaning-replacement` (MEDIUM priority)
10. `septic-alarm-repair-replacement` (MEDIUM priority)
11. `drain-field-repair` (HIGH priority)
12. `septic-odor-troubleshooting` (MEDIUM priority)

**Process sequentially.** Do not skip ahead.

---

## Commands for Cursor

### Start First Article
```
BEGIN ARTICLE 1: septic-tank-pumping
```

### Mark Complete & Wait
```
ARTICLE 1 COMPLETE — READY FOR CONTINUE
```

### User Continues
```
CONTINUE
```

### Cursor Starts Next
```
BEGIN ARTICLE 2: septic-tank-cleaning
```

---

## Rules for Cursor

1. **ONE ARTICLE AT A TIME** — Do not batch process
2. **WAIT FOR CONTINUE** — Stop after each article completion
3. **FOLLOW CHECKLIST** — Every item must pass
4. **NO SHORTCUTS** — Complete all quality gates
5. **NO INVENTED DATA** — Research from approved sources only
6. **DOCUMENT EVERYTHING** — Save briefs and reports
7. **VALIDATE SCHEMA** — Test in Google Rich Results Test
8. **TEST ALL LINKS** — No broken links allowed

---

## Contact & Support

**Project:** Miami Septic Pros
**Location:** 55 SW 9th St, Apt 3806, Miami, FL 33130
**Phone:** +1 (305) 555-0100
**Email:** info@miamisepticpros.com

**Technical Questions:** Refer to `/msp/templates/writer_system_prompt.txt`
**Quality Issues:** Refer to `/msp/reports/acceptance_checklist.md`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-XX | Initial system creation |

---

**Status:** ✅ READY FOR CURSOR EXECUTION

**Next Action:** Cursor should execute `BEGIN ARTICLE 1: septic-tank-pumping`
