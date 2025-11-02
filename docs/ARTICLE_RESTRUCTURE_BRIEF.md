# Article Restructure Brief for Prompt Engineer

**Date:** October 30, 2025  
**Project:** SepticTankQuoteHub / Miami Septic Pros  
**Total Articles:** 54 complete articles  
**Target Style:** Checkatrade.com article layout and structure  
**Task:** Restructure each article one-by-one to match Checkatrade.com's layout exactly

---

## Executive Summary

All 54 service articles have been generated as HTML files in `/pages/miami/services/[slug]/index.html`. Each article currently has:

- ✅ Quick Summary box (blue accent, border-left)
- ✅ Table of Contents with anchor links
- ✅ Cost breakdown box with min/avg/max cards (green)
- ✅ Section heading IDs for navigation
- ✅ HTML format (no markdown symbols)
- ✅ FAQ schema markup
- ✅ Service schema markup
- ✅ Breadcrumb schema markup

However, the layout and styling need to be restructured to **exactly match** Checkatrade.com's article layout, structure, spacing, typography, and component styling.

---

## Reference: Checkatrade.com Style

**Target URL:** `https://www.checkatrade.com/blog/cost-guides/new-boiler-cost/`

**Key Layout Elements:**
1. **Quick Summary Box** - Blue accent, specific padding/spacing
2. **Table of Contents** - Styled navigation with anchor links, specific typography
3. **Cost Breakdown Box** - Green cards showing min/avg/max, specific card styling
4. **Section Headings** - Specific IDs, typography, spacing
5. **Content Sections** - Proper paragraph spacing, typography hierarchy
6. **Call-to-Action Blocks** - Styled CTA sections
7. **FAQ Section** - Specific FAQ styling

---

## Current Article Structure

All articles follow this pattern (stored as HTML files):

**File Location:** `/pages/miami/services/[slug]/index.html`

**Current Structure:**
```html
---
title: "[Service Name] in Miami..."
slug: "[slug]"
[front matter]
---

<h1>[Service Name] in Miami, FL</h1>

[Intro paragraphs]

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
  <h3>Quick Summary</h3>
  <ul>...</ul>
</div>

<h2>Table of Contents</h2>
<ul class="space-y-2">
  <li><a href="#cost">...</a></li>
</ul>

<strong>Fast facts (Miami-Dade):</strong>
<ul>...</ul>

<hr />

<h2 id="cost">How much does [Service] cost in Miami?</h2>

<div class="bg-green-50 border-2 border-green-500 rounded-lg p-6 my-6">
  <h3>Average [Service] Cost in Miami</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    [Min/Avg/Max cards]
  </div>
</div>

[Content sections with H2s, H3s, lists, etc.]

<h2 id="faqs">Frequently Asked Questions</h2>
[7 FAQs]

[Schema JSON-LD scripts]
```

---

## Complete List of 54 Articles

### Primary Category (20 articles)

1. **septic-tank-pumping** - `/pages/miami/services/septic-tank-pumping/index.html`
2. **septic-tank-cleaning** - `/pages/miami/services/septic-tank-cleaning/index.html`
3. **septic-tank-inspection** - `/pages/miami/services/septic-tank-inspection/index.html`
4. **emergency-septic-services** - `/pages/miami/services/emergency-septic-services/index.html`
5. **septic-tank-unclogging** - `/pages/miami/services/septic-tank-unclogging/index.html`
6. **septic-system-maintenance-plans** - `/pages/miami/services/septic-system-maintenance-plans/index.html`
7. **septic-tank-riser-installation** - `/pages/miami/services/septic-tank-riser-installation/index.html`
8. **septic-baffle-replacement** - `/pages/miami/services/septic-baffle-replacement/index.html`
9. **septic-filter-cleaning-replacement** - `/pages/miami/services/septic-filter-cleaning-replacement/index.html`
10. **septic-alarm-repair-replacement** - `/pages/miami/services/septic-alarm-repair-replacement/index.html`
11. **septic-tank-location-service** - `/pages/miami/services/septic-tank-location-service/index.html`
12. **real-estate-septic-inspections** - `/pages/miami/services/real-estate-septic-inspections/index.html`
13. **septic-tank-camera-inspections** - `/pages/miami/services/septic-tank-camera-inspections/index.html`
14. **septic-odor-troubleshooting** - `/pages/miami/services/septic-odor-troubleshooting/index.html`
15. **septic-sludge-and-scum-layer-removal** - `/pages/miami/services/septic-sludge-and-scum-layer-removal/index.html`
16. **septic-enzyme-treatments** - `/pages/miami/services/septic-enzyme-treatments/index.html`
17. **routine-septic-service-contracts** - `/pages/miami/services/routine-septic-service-contracts/index.html`
18. **septic-system-winterization-storm-proofing** - `/pages/miami/services/septic-system-winterization-storm-proofing/index.html`
19. **residential-septic-services** - `/pages/miami/services/residential-septic-services/index.html`
20. **commercial-septic-tank-service** - `/pages/miami/services/commercial-septic-tank-service/index.html`

### Contractor Category (14 articles)

21. **new-septic-system-installation** - `/pages/miami/services/new-septic-system-installation/index.html`
22. **septic-tank-replacement** - `/pages/miami/services/septic-tank-replacement/index.html`
23. **drain-field-installation** - `/pages/miami/services/drain-field-installation/index.html`
24. **drain-field-replacement** - `/pages/miami/services/drain-field-replacement/index.html`
25. **septic-tank-lid-replacement** - `/pages/miami/services/septic-tank-lid-replacement/index.html`
26. **septic-system-design-and-permitting** - `/pages/miami/services/septic-system-design-and-permitting/index.html`
27. **holding-tank-installation** - `/pages/miami/services/holding-tank-installation/index.html`
28. **lift-station-installation** - `/pages/miami/services/lift-station-installation/index.html`
29. **grease-trap-installation-for-restaurants** - `/pages/miami/services/grease-trap-installation-for-restaurants/index.html`
30. **septic-to-sewer-conversion** - `/pages/miami/services/septic-to-sewer-conversion/index.html`
31. **site-evaluation-for-septic-installation** - `/pages/miami/services/site-evaluation-for-septic-installation/index.html`
32. **septic-permit-application-and-approvals** - `/pages/miami/services/septic-permit-application-and-approvals/index.html`
33. **advanced-treatment-unit-installation** - `/pages/miami/services/advanced-treatment-unit-installation/index.html`
34. **expansion-of-existing-septic-systems** - `/pages/miami/services/expansion-of-existing-septic-systems/index.html`

### Drainage Category (10 articles)

35. **french-drain-installation** - `/pages/miami/services/french-drain-installation/index.html`
36. **yard-drainage-solutions** - `/pages/miami/services/yard-drainage-solutions/index.html`
37. **drainage-system-repairs** - `/pages/miami/services/drainage-system-repairs/index.html`
38. **catch-basin-installation** - `/pages/miami/services/catch-basin-installation/index.html`
39. **surface-water-management-systems** - `/pages/miami/services/surface-water-management-systems/index.html`
40. **stormwater-runoff-control** - `/pages/miami/services/stormwater-runoff-control/index.html`
41. **drain-field-troubleshooting-and-jetting** - `/pages/miami/services/drain-field-troubleshooting-and-jetting/index.html`
42. **drainage-inspections-and-mapping** - `/pages/miami/services/drainage-inspections-and-mapping/index.html`
43. **erosion-control-around-septic-systems** - `/pages/miami/services/erosion-control-around-septic-systems/index.html`
44. **emergency-drainage-backups** - `/pages/miami/services/emergency-drainage-backups/index.html`

### Sewage Category (10 articles)

45. **sewage-system-pumping** - `/pages/miami/services/sewage-system-pumping/index.html`
46. **sewage-ejector-pump-repair-replacement** - `/pages/miami/services/sewage-ejector-pump-repair-replacement/index.html`
47. **sewage-spill-cleanup-and-sanitization** - `/pages/miami/services/sewage-spill-cleanup-and-sanitization/index.html`
48. **wastewater-treatment-system-installation** - `/pages/miami/services/wastewater-treatment-system-installation/index.html`
49. **septic-safe-cleaning-product-consultation** - `/pages/miami/services/septic-safe-cleaning-product-consultation/index.html`
50. **lift-station-monitoring-and-service** - `/pages/miami/services/lift-station-monitoring-and-service/index.html`
51. **sludge-hauling-and-disposal** - `/pages/miami/services/sludge-hauling-and-disposal/index.html`
52. **grease-interceptor-cleaning** - `/pages/miami/services/grease-interceptor-cleaning/index.html`
53. **drain-cleaning-with-jetting-for-sewage-lines** - `/pages/miami/services/drain-cleaning-with-jetting-for-sewage-lines/index.html`
54. **sludge-digesters-and-bio-treatment-unit-service** - `/pages/miami/services/sludge-digesters-and-bio-treatment-unit-service/index.html`

---

## Current Implementation Details

### Article Format
- **File Type:** HTML (`.html` files, not MDX)
- **Front Matter:** YAML front matter parsed using `gray-matter`
- **Content:** Pure HTML (no markdown syntax)
- **Route Handler:** `/app/(site)/miami/services/[slug]/page.tsx` reads HTML files
- **Styling:** Tailwind CSS classes
- **Schema:** JSON-LD scripts embedded in each article

### Current Components Structure

1. **Quick Summary Box:**
   ```html
   <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
     <h3 class="text-lg font-semibold mb-2">Quick Summary</h3>
     <ul class="list-disc list-inside space-y-1">...</ul>
   </div>
   ```

2. **Table of Contents:**
   ```html
   <h2>Table of Contents</h2>
   <ul class="space-y-2">
     <li><a href="#cost">...</a></li>
   </ul>
   ```

3. **Cost Breakdown Box:**
   ```html
   <div class="bg-green-50 border-2 border-green-500 rounded-lg p-6 my-6">
     <h3 class="text-2xl font-bold mb-4">Average [Service] Cost in Miami</h3>
     <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
       <div class="bg-white p-4 rounded">...</div>
     </div>
   </div>
   ```

4. **Fast Facts Section:**
   ```html
   <strong>Fast facts (Miami-Dade):</strong>
   <ul>...</ul>
   ```

### Current Content Sections
Each article typically includes:
- H1: Service name + "in Miami, FL"
- 2-3 intro paragraphs
- Quick Summary box
- Table of Contents
- Fast Facts list (8 bullet points)
- Cost section (H2 with id="cost")
- What is [Service] section
- Why needed / Benefits section
- How it works / Process section
- When needed section
- Miami-specific considerations
- Professional service benefits
- Related services links
- FAQs (7 questions)
- Schema JSON-LD (FAQPage, Service, BreadcrumbList)
- CTA block
- Sources & References

---

## What Needs to Be Restructured

### Layout & Styling Changes Needed

1. **Quick Summary Box**
   - Current: Basic blue-50 background, border-left-4
   - Needed: Match Checkatrade.com's exact styling, spacing, typography

2. **Table of Contents**
   - Current: Simple H2 + unordered list
   - Needed: Match Checkatrade.com's TOC styling (likely with better visual hierarchy, spacing, hover states)

3. **Cost Breakdown Cards**
   - Current: Grid with 3 cards (min/avg/max), green-50 background
   - Needed: Match Checkatrade.com's exact card styling, typography, spacing, visual treatment

4. **Section Headings**
   - Current: H2s with IDs, basic styling
   - Needed: Ensure IDs are properly formatted, match Checkatrade heading typography/spacing

5. **Content Sections**
   - Current: Basic paragraphs, lists, headings
   - Needed: Match Checkatrade.com's paragraph spacing, typography, list styling

6. **CTA Blocks**
   - Current: Green accent background with buttons
   - Needed: Match Checkatrade.com's CTA styling

7. **FAQ Section**
   - Current: H3 questions, paragraph answers
   - Needed: Match Checkatrade.com's FAQ component styling

---

## Technical Context

### File System
- **Articles Location:** `/pages/miami/services/[slug]/index.html`
- **Route Handler:** `/app/(site)/miami/services/[slug]/page.tsx`
- **Reading Method:** Uses `gray-matter` to parse front matter and HTML content
- **Rendering:** Content is rendered with `dangerouslySetInnerHTML` after converting `className` to `class`

### Important Constraints
- **No Breaking Changes:** Must not break existing functionality
- **Preserve Content:** All article content must remain intact
- **Preserve Schema:** All JSON-LD schema markup must remain
- **Preserve Links:** All internal/external links must work
- **Preserve IDs:** All section heading IDs must remain for anchor links

### Styling System
- **Framework:** Next.js 14 with Tailwind CSS
- **Current Classes:** Using Tailwind utility classes
- **Custom Classes:** May need to add custom classes if Checkatrade uses specific styling not available in Tailwind

---

## Research Briefs (Reference Data)

Each article has a corresponding research brief in `/msp/briefs/miami-[slug].json` containing:
- Primary/support keywords
- Research sources
- Linkable facts (8 bullet points)
- Content outline
- Cost methodology
- Local factors

These briefs should NOT be modified during restructuring.

---

## Progress Tracking

**Current Status:**
- ✅ All 54 articles generated with basic Checkatrade-style elements
- ❌ Layout/styling needs to match Checkatrade.com exactly
- ❌ Component styling needs refinement

**Articles are accessible at:**
- URL Pattern: `https://miamisepticpros.com/miami/services/[slug]/`
- All articles are in the sitemap
- All articles have proper meta tags and schema

---

## Task Requirements for Prompt Engineer

Create a prompt that will:

1. **Restructure one article at a time** (sequential processing)
2. **Match Checkatrade.com layout exactly** (reference the actual Checkatrade.com article)
3. **Preserve all content** (no content changes, only layout/styling)
4. **Update styling** (Quick Summary, TOC, Cost cards, sections, FAQs)
5. **Ensure functionality** (anchor links, schema, all IDs preserved)
6. **Maintain HTML format** (articles are HTML, not MDX)
7. **Use Tailwind classes** (or create custom classes if needed)
8. **Test visually** (verify layout matches Checkatrade.com)

---

## Reference: Checkatrade.com Article Structure

Based on `https://www.checkatrade.com/blog/cost-guides/new-boiler-cost/`:

**Expected Layout:**
1. **Hero/Title Section** - H1, intro content
2. **Quick Summary Box** - Blue accent, key facts at-a-glance
3. **Table of Contents** - Styled navigation, likely with better visual treatment
4. **Cost Breakdown Section** - Green cards with min/avg/max, specific card design
5. **Main Content Sections** - Properly spaced, typography hierarchy
6. **FAQ Section** - Styled FAQ component
7. **CTA Section** - Call-to-action block
8. **Related/Sources** - Links and citations

**Key Visual Elements:**
- Specific color schemes (blue accent for summary, green for costs)
- Specific spacing/padding values
- Specific typography (font sizes, weights, line heights)
- Specific border styles and radii
- Specific card designs for cost breakdown
- Specific TOC styling and behavior

---

## Notes for Prompt Engineer

1. **One Article at a Time:** Process sequentially, wait for CONTINUE signal between articles
2. **Visual Reference Required:** Should scrape/analyze Checkatrade.com article to understand exact styling
3. **Incremental Approach:** May need to refine styling across multiple passes
4. **Testing:** Should verify anchor links work, schema validates, layout renders correctly
5. **Preserve Functionality:** All existing functionality must remain intact
6. **Content Preservation:** Zero content changes, only layout/styling updates

---

## Additional Context

### Writing Style (Preserved from Original Generation)
- Conversational tone (4th-grade reading level)
- Miami-specific context throughout
- Practical, actionable guidance
- Local regulations and requirements mentioned
- No markdown symbols (pure HTML)
- No clichés or fluff
- Includes opinions and anecdotes where appropriate

### SEO Elements (Must Preserve)
- Meta tags in front matter
- Schema JSON-LD (FAQPage, Service, BreadcrumbList)
- Proper heading hierarchy (H1, H2, H3)
- Internal linking to related services
- External citations to authoritative sources
- All section IDs for anchor navigation

### Technical Notes
- Articles use `className` in HTML but route handler converts to `class`
- Front matter is YAML format
- Content is pure HTML (no JSX components in content)
- Schema scripts are embedded in HTML content
- Images referenced but may need manual replacement (Unsplash redirect issues)

---

## Deliverables Expected from Restructure

After restructuring, each article should:

1. ✅ Match Checkatrade.com layout exactly
2. ✅ Have properly styled Quick Summary box
3. ✅ Have properly styled Table of Contents
4. ✅ Have properly styled Cost Breakdown cards
5. ✅ Have proper section spacing and typography
6. ✅ Have properly styled FAQ section
7. ✅ Have properly styled CTA blocks
8. ✅ Maintain all anchor links and IDs
9. ✅ Preserve all schema markup
10. ✅ Preserve all content (zero changes to text)
11. ✅ Render correctly in browser
12. ✅ Maintain responsive design

---

## End of Brief

This document provides the complete context for restructuring all 54 articles to match Checkatrade.com's layout. The prompt engineer should create a detailed prompt that will guide the AI through this restructuring process one article at a time.

