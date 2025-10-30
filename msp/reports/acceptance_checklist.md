# Article Acceptance Checklist
## Miami Septic Pros — Service Page Quality Gates

**Article:** `{{service_slug}}`
**Date:** `{{YYYY-MM-DD}}`
**Status:** `[ ] PENDING` `[ ] IN PROGRESS` `[ ] COMPLETE`

---

## Phase 1: Research & Planning

### Sources & Citations
- [ ] Minimum 3 authoritative sources identified
- [ ] All sources documented in brief
- [ ] Sources include at least one official government/regulatory site
- [ ] All source URLs tested and active
- [ ] Citation methodology documented

### Keyword Mapping
- [ ] Primary keyword confirmed
- [ ] 5–10 support keywords identified
- [ ] Keywords mapped to H2 sections
- [ ] Search intent validated
- [ ] Competitor content reviewed

### Local Research
- [ ] Miami-Dade permit requirements documented
- [ ] Local environmental factors researched (water table, hurricanes, etc.)
- [ ] Neighborhood examples identified
- [ ] Local pricing data collected or methodology noted
- [ ] Emergency protocols specific to Miami documented

---

## Phase 2: Content Draft

### Structure Validation
- [ ] Front matter complete with all required fields
- [ ] H1 follows template format
- [ ] 5–8 linkable facts in intro bullets
- [ ] All required sections present:
  - [ ] Cost breakdown
  - [ ] Permit requirements
  - [ ] Service scope/what's included
  - [ ] Emergency guidance
  - [ ] Target audience
  - [ ] Local environmental considerations
  - [ ] Related services
  - [ ] FAQ (5–7 Q&As)
- [ ] CTA block properly placed
- [ ] Sources & references section complete

### Writing Quality
- [ ] Tone: clear, human, local (no generic SEO filler)
- [ ] Reading level: 6th–7th grade (verified with tool)
- [ ] No [[NEEDS_VERIFY]] tags remain
- [ ] No invented prices or statistics
- [ ] All {{VARIABLES}} replaced with actual values
- [ ] Miami-Dade neighborhoods referenced appropriately
- [ ] Local context integrated naturally (not forced)
- [ ] Question H2s match search intent
- [ ] Facts cited with inline references

### Content Completeness
- [ ] Word count: 1,500–3,000 words
- [ ] No duplicate content from other site pages
- [ ] No off-topic sections
- [ ] Emergency information clear and actionable
- [ ] Permit guidance links to official resources
- [ ] Service scope detailed and specific

---

## Phase 3: Internal Linking

### Required Links
- [ ] Link to Services hub (`/miami/services/`)
- [ ] Link to Miami location page (`/locations/fl/miami/`)
- [ ] Minimum 2 related service links
- [ ] Link to contact page (`/contact/`)
- [ ] Link to quote form (`/quote/`)

### Link Quality
- [ ] All internal links use correct paths
- [ ] All links tested and resolve
- [ ] Anchor text natural and descriptive
- [ ] No broken internal links
- [ ] Links distributed naturally throughout content

---

## Phase 4: Schema Markup

### FAQ Schema
- [ ] FAQ JSON-LD generated
- [ ] Minimum 5 question-answer pairs
- [ ] Questions match content exactly
- [ ] Answers properly escaped for JSON
- [ ] Schema validated in Google Rich Results Test

### Service Schema
- [ ] Service JSON-LD generated
- [ ] Service type accurately described
- [ ] Provider info references LocalBusiness @id
- [ ] Area served: Miami-Dade County
- [ ] URL matches canonical
- [ ] Hours available included
- [ ] Schema validated in Google Rich Results Test

### Breadcrumb Schema
- [ ] Breadcrumb JSON-LD generated
- [ ] Path: Home → Services → Service Name
- [ ] URLs absolute and correct
- [ ] Schema validated in Google Rich Results Test

### Schema Integration
- [ ] All schema blocks embedded in MDX
- [ ] No duplicate LocalBusiness schema (global only)
- [ ] Schema syntax valid JSON
- [ ] No trailing commas or syntax errors

---

## Phase 5: Assets & Media

### OG Image
- [ ] OG image created at `/public/images/og/{service_slug}.png`
- [ ] Image dimensions: 1200×630px
- [ ] Image includes service name and "Miami Septic Pros"
- [ ] Image optimized for web (<200KB)
- [ ] Image path matches front matter `og_image` field

### Placeholders
- [ ] Image/video/diagram slots identified in content
- [ ] Alt text placeholders included
- [ ] Media recommendations documented in brief

---

## Phase 6: Technical Implementation

### File & Routing
- [ ] MDX file created at `/content/services/{service_slug}.mdx`
- [ ] Filename matches slug exactly
- [ ] File encoding: UTF-8
- [ ] Line endings: LF (not CRLF)
- [ ] No BOM characters

### Routing Configuration
- [ ] Route added to Next.js dynamic routing
- [ ] Canonical URL: `https://miamisepticpros.com/miami/services/{service_slug}/`
- [ ] Trailing slash consistent with site standard
- [ ] Route tested in dev environment

### Sitemap
- [ ] Page included in XML sitemap
- [ ] Priority: 0.8
- [ ] Changefreq: monthly
- [ ] Lastmod: current date

### Metadata
- [ ] Meta title: 50–60 characters
- [ ] Meta description: 150–160 characters
- [ ] OG tags complete
- [ ] Twitter card tags included
- [ ] Noindex: false (indexable)

---

## Phase 7: Quality Assurance

### Content Review
- [ ] Spell check passed (US English)
- [ ] Grammar check passed
- [ ] Formatting consistent with site style
- [ ] Lists properly formatted
- [ ] Tables (if any) render correctly
- [ ] Code blocks (if any) highlighted correctly

### Link Check
- [ ] All internal links verified
- [ ] All external citations verified
- [ ] No 404 errors
- [ ] No redirect chains
- [ ] Phone numbers click-to-call formatted correctly
- [ ] Email addresses properly formatted

### Schema Validation
- [ ] All schema validated in Google Rich Results Test
- [ ] No critical errors in structured data
- [ ] Warnings documented and acceptable
- [ ] Schema visible in page source

### Accessibility
- [ ] Heading hierarchy logical (H1→H2→H3)
- [ ] No skipped heading levels
- [ ] Lists use proper HTML elements
- [ ] CTA buttons have descriptive text
- [ ] Phone/email links accessible

### Performance
- [ ] Page builds without errors
- [ ] No JavaScript console errors
- [ ] Images (if any) optimized
- [ ] Page loads in <3 seconds (dev)

---

## Phase 8: Final Sign-Off

### Pre-Launch Checklist
- [ ] Article reviewed by human editor (if applicable)
- [ ] All checklist items above marked complete
- [ ] Brief saved to `/msp/briefs/{service_slug}_brief.md`
- [ ] Report saved to `/msp/reports/{service_slug}_report.md`
- [ ] Article status updated to "complete" in queue JSON

### Documentation
- [ ] Research sources documented
- [ ] Writing decisions documented
- [ ] Schema choices documented
- [ ] Any deviations from template explained
- [ ] Next article identified (if applicable)

### Ready for Production
- [ ] All quality gates passed
- [ ] Article merged to main branch (if using version control)
- [ ] Sitemap regenerated
- [ ] Search console notified (optional)

---

## Sign-Off

**Completed by:** `{{AUTHOR}}`
**Date:** `{{YYYY-MM-DD}}`
**Time invested:** `{{HH:MM}}`
**Next article:** `{{next_service_slug}}`

**Status:** `[ ] APPROVED FOR PUBLICATION` `[ ] NEEDS REVISION`

**Notes:**
```
{{COMPLETION_NOTES}}
```

---

## Revision History

| Date | Change | Reason |
|------|--------|--------|
| {{DATE}} | {{CHANGE}} | {{REASON}} |

---

**End of Checklist**
