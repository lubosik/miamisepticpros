# Article One: Complete Fixes and Improvements Documentation

This document outlines all fixes, improvements, and solutions implemented to make Article 1 (septic-tank-pumping) perfect. Use this as a reference when processing subsequent articles.

## Table of Contents
1. [Hydration Error Fixes](#hydration-error-fixes)
2. [Hero Image Removal](#hero-image-removal)
3. [Source URL Verification and Updates](#source-url-verification-and-updates)
4. [Inline Citations Implementation](#inline-citations-implementation)
5. [FAQ Accordion Implementation](#faq-accordion-implementation)
6. [Content Cleaning and Processing](#content-cleaning-and-processing)
7. [Checkatrade Layout Implementation](#checkatrade-layout-implementation)
8. [Best Practices for Future Articles](#best-practices-for-future-articles)

---

## Hydration Error Fixes

### Problem
React hydration errors occurred due to mismatches between server-rendered HTML and client-rendered HTML.

### Solutions Implemented

#### 1. FAQ Accordion Component
**Issue:** The `FAQAccordion` component used a `mounted` check that rendered different HTML on server vs client.

**Fix:** Removed the `mounted` check and `useEffect`. The component now renders consistently on both server and client. Only the interactive state (which FAQ is open) differs, which is acceptable because:
- Initial render shows all FAQs closed (same on server and client)
- Only user interaction changes the state
- No structural differences between server and client HTML

**Files Modified:**
- `components/FAQAccordion.tsx`

**Key Change:**
```typescript
// REMOVED:
const [mounted, setMounted] = useState(false)
useEffect(() => { setMounted(true) }, [])
if (!mounted) { return <different HTML> }

// NOW:
// Component renders same structure on server and client
// Only openIndex state changes after user interaction
```

#### 2. Content Cleaning - Removed Duplicate Sections
**Issue:** The HTML content contained sections that were also being rendered by React components (FAQ section, Sources section, CTA section), causing duplicate or nested `<section>` elements.

**Fix:** Enhanced `cleanArticleContent()` function to remove:
- FAQ sections (`<h2 id="faqs">` and all content until next section)
- CTA sections (gradient divs with call-to-action)
- Sources & References sections
- Service area footer sections

**Files Modified:**
- `app/(site)/miami/services/[slug]/page.tsx` (cleanArticleContent function)

**Key Regex Patterns:**
```typescript
// Remove FAQ section
html = html.replace(/<h2[^>]*id=["']faqs["'][^>]*>[\s\S]*?(?=<h2|<\/div>|<\/script>|$)/is, '')

// Remove CTA sections
html = html.replace(/<div[^>]*class="[^"]*mt-12[^"]*"[^"]*bg-gradient[^"]*"[^"]*>[\s\S]*?<\/div>/is, '')

// Remove Sources section
html = html.replace(/<h2[^"]*>Sources[^<]*<\/h2>[\s\S]*?<\/div>/is, '')
```

#### 3. suppressHydrationWarning Usage
**Where Used:**
- `components/CheckatradeArticleLayout.tsx`: On the `dangerouslySetInnerHTML` div
- `components/FAQAccordion.tsx`: On FAQ answer content div

**Why:** These contain dynamic HTML content that may have slight differences in whitespace or formatting. The warning is suppressed only on these specific elements where it's necessary.

---

## Hero Image Removal

### Problem
User requested removal of hero images from all articles.

### Solution
1. Removed hero image rendering from `ArticleHero` component
2. Removed hero image props from `CheckatradeArticleLayout` component
3. Removed hero image figure from article HTML files
4. Updated route handler to not pass hero image props

**Files Modified:**
- `components/ArticleHero.tsx` - Removed image rendering and props
- `components/CheckatradeArticleLayout.tsx` - Removed heroImage and heroImageAlt props
- `app/(site)/miami/services/[slug]/page.tsx` - Removed heroImage prop passing
- `pages/miami/services/septic-tank-pumping/index.html` - Removed `<figure>` element

---

## Source URL Verification and Updates

### Problem
Original source URLs returned 404 errors:
- `https://www.miamidade.gov/global/service.page?Mduid_service=ser1469380618086923` (404)
- `https://www.floridahealth.gov/environmental-health/onsite-sewage/disposal-system-permits/index.html` (404)
- `https://floridadep.gov/waste/waste-permit/content/septic-contracting-frequently-asked-questions` (404)

### Solution
Verified working URLs by testing HTTP status codes:
1. **Miami-Dade County**: Changed to `https://www.miamidade.gov/permits/` (200 OK)
2. **Florida DOH**: Changed to `https://www.floridahealth.gov/environmental-health/onsite-sewage/` (200 OK)
3. **Florida DEP**: Changed to `https://floridadep.gov/water/domestic-wastewater/` (200 OK)

### Verification Process
```bash
curl -s -o /dev/null -w "%{http_code}" "URL" --max-time 5
```

### Files Modified
- `pages/miami/services/septic-tank-pumping/index.html` - Updated front matter `sources` array
- `pages/miami/services/septic-tank-pumping/index.html` - Updated Sources & References section

### Best Practice for Future Articles
- Always verify URLs return 200 status before adding to articles
- Use official government website base URLs that are less likely to change
- Test URLs after adding them to ensure they work

---

## Inline Citations Implementation

### Problem
User requested that specific facts and claims throughout articles should be hyperlinked to authoritative sources where the information was obtained.

### Solution
Added inline citation links throughout Article 1, linking key facts to authoritative sources:

1. **High water table** → Links to Florida DEP Domestic Wastewater page
2. **Florida DOH guidelines** → Links to Florida DOH Onsite Sewage Program
3. **Miami-Dade County waste disposal regulations** → Links to Miami-Dade Permits
4. **Miami-Dade County permit requirements** → Multiple links throughout
5. **Florida DOH contractor registration** → Links to Florida DOH site
6. **Drainfield elevation requirements** → Links to Miami-Dade Permits
7. **Regulatory compliance** → Links to Florida DOH regulations
8. **Florida environmental data** (rainfall stats) → Links to Florida DEP

### Implementation
- All inline links use `target="_blank" rel="noopener noreferrer"` for external links
- Links are styled with `class="text-blue-600 hover:underline"`
- Links are placed naturally within sentences, not as footnotes

### Files Modified
- `pages/miami/services/septic-tank-pumping/index.html` - Added ~8 inline citation links

### Best Practice for Future Articles
- Link specific facts, statistics, regulations, and guidelines to their source
- Use official government websites as citation sources
- Place links naturally within text flow
- Always include `target="_blank" rel="noopener noreferrer"` for external links

---

## FAQ Accordion Implementation

### Problem
User requested FAQ sections to be displayed as interactive accordion boxes matching Meta Box style (gray boxes with chevron icons), not just plain text.

### Solution
1. Created `FAQAccordion` component with:
   - Gray boxes with borders (`#f9fafb` background, `#e5e7eb` border)
   - Chevron icons (▶ when closed, ▼ when open)
   - Smooth expand/collapse animations
   - Hover effects
   - Full HTML support in answers

2. Created `faq-accordion.css` with complete styling

3. Modified FAQ extraction to:
   - Extract FAQs from raw HTML before content cleaning
   - Preserve full HTML in FAQ answers (multiple paragraphs, lists, etc.)
   - Remove FAQ section from main content after extraction

4. Integrated FAQ accordion into `CheckatradeArticleLayout` component

### Files Created
- `components/FAQAccordion.tsx`
- `public/styles/faq-accordion.css`

### Files Modified
- `components/CheckatradeArticleLayout.tsx` - Added FAQ section rendering
- `app/(site)/miami/services/[slug]/page.tsx` - Enhanced FAQ extraction logic
- `app/globals.css` - Appended FAQ accordion CSS

### FAQ Extraction Logic
```typescript
// Extract FAQs BEFORE cleaning content (preserve HTML)
const faqSectionMatch = rawContent.match(/<h2[^>]*id=["']faqs["'][^>]*>.*?<\/h2>([\s\S]*?)(?=<h2|<\/div>|<\/script>|$)/i)
// Split by H3 tags, extract question + all following content
// Clean up answer HTML (remove script tags, normalize whitespace)
// Pass to FAQAccordion component
```

### Best Practice for Future Articles
- FAQs must have `<h2 id="faqs">` heading to be detected
- Each FAQ question must be an `<h3>` tag
- FAQ answers can contain full HTML (paragraphs, lists, links)
- FAQ section is automatically removed from main content

---

## Content Cleaning and Processing

### Problem
Article HTML content needed to be cleaned and processed to work with Checkatrade layout components.

### Solution
Enhanced `cleanArticleContent()` function with comprehensive cleaning:

1. **Remove duplicate sections** (rendered by components):
   - Hero images
   - H1 headings (rendered in ArticleHero)
   - "At a glance" callouts (rendered via Callout component)
   - TOC nav (rendered via StickyTOC component)
   - FAQ sections (rendered via FAQAccordion component)
   - Sources sections (rendered via Sources component)
   - CTA sections
   - Service area footers

2. **Content transformation**:
   - Convert cost cards to table format (if present)
   - Ensure heading IDs are present
   - Normalize whitespace

### Files Modified
- `app/(site)/miami/services/[slug]/page.tsx` - `cleanArticleContent()` function

### Best Practice for Future Articles
- All articles should follow consistent structure
- Sections that are rendered by components should not appear in HTML
- Content cleaning must happen before rendering

---

## Checkatrade Layout Implementation

### Components Created
1. **ArticleHero** - Category badge, title, date, byline
2. **StickyTOC** - Sticky table of contents with active section highlighting
3. **Callout** - "At a glance" and "This article covers" boxes
4. **VerifiedBanner** - Trust signal banner
5. **Sources** - Sources & References section
6. **Breadcrumbs** - Navigation breadcrumbs
7. **FAQAccordion** - Interactive FAQ accordion
8. **CheckatradeArticleLayout** - Main layout wrapper

### CSS Files
- `public/styles/article.css` - Main article layout styles
- `public/styles/faq-accordion.css` - FAQ accordion styles

### JavaScript Files
- `public/js/toc.js` - Table of contents scroll tracking

### Best Practice for Future Articles
- All articles use the same layout components
- Layout is consistent across all articles
- Components handle all interactive features

---

## Best Practices for Future Articles

### Pre-Processing Checklist
1. ✅ Verify all source URLs return 200 status
2. ✅ Remove hero images from HTML
3. ✅ Ensure FAQ section has `<h2 id="faqs">` heading
4. ✅ Remove duplicate sections (CTA, Sources, Service area)
5. ✅ Add inline citations to key facts

### Processing Steps
1. Extract FAQs from raw content (before cleaning)
2. Clean article content (remove duplicates, ensure structure)
3. Extract headings for TOC
4. Extract "At a glance" data
5. Extract "This article covers" items
6. Generate schemas (Article, FAQPage, BreadcrumbList)
7. Pass all data to CheckatradeArticleLayout

### Post-Processing Verification
1. ✅ Check for hydration errors in browser console
2. ✅ Verify all links work (click through)
3. ✅ Verify FAQ accordion works (click to expand/collapse)
4. ✅ Verify TOC scrolls correctly
5. ✅ Verify no duplicate sections appear
6. ✅ Verify all sources are accessible

### Common Issues to Watch For
1. **Hydration errors**: Ensure components render same HTML on server and client
2. **404 links**: Always verify URLs before adding
3. **Duplicate content**: Remove sections rendered by components
4. **Missing FAQ section**: Ensure FAQs have proper HTML structure
5. **Nested HTML issues**: Ensure no invalid HTML nesting (p in p, div in p, etc.)

---

## Files Reference

### Components
- `components/ArticleHero.tsx`
- `components/StickyTOC.tsx`
- `components/Callout.tsx`
- `components/VerifiedBanner.tsx`
- `components/Sources.tsx` (now uses `<div>` instead of `<section>` to prevent hydration conflicts)
- `components/Breadcrumbs.tsx`
- `components/FAQAccordion.tsx`
- `components/ArticleCTA.tsx` (new - renders CTA with both buttons)
- `components/CheckatradeArticleLayout.tsx`

### Styles
- `public/styles/article.css`
- `public/styles/faq-accordion.css`
- `app/globals.css` (includes article.css content)

### Scripts
- `public/js/toc.js`

### Utilities
- `lib/format/cleanContent.ts`
- `app/(site)/miami/services/[slug]/page.tsx` (contains cleanArticleContent function)

### Example Article
- `pages/miami/services/septic-tank-pumping/index.html`

---

## Summary

Article 1 (septic-tank-pumping) is now fully functional with:
- ✅ No hydration errors
- ✅ No hero images
- ✅ Verified working source URLs
- ✅ Inline citations throughout
- ✅ Interactive FAQ accordion
- ✅ Checkatrade-style layout
- ✅ Proper content cleaning
- ✅ All sections rendered correctly

All subsequent articles should follow the same process and structure documented here.

---

## Additional Fixes for Article 2

### CTA Component Implementation
**Issue:** Missing "Get Free Quote" button in CTA section.

**Solution:**
- Created `ArticleCTA` component that renders both buttons:
  - "Get Free Quote" button (white background, green text)
  - "Call (305) 555-0100" button (dark green background, white text)
- Component automatically renders after FAQ section
- Buttons display side-by-side on desktop, stacked on mobile
- CTA section in article HTML is removed during content cleaning and replaced by component

**Files Created:**
- `components/ArticleCTA.tsx`

**Files Modified:**
- `components/CheckatradeArticleLayout.tsx` - Added ArticleCTA import and rendering

### Hydration Error Fix - Section Conflicts
**Issue:** Hydration error about missing `<section>` in `<main>`.

**Solution:**
- Changed `Sources` component from `<section>` to `<div>` to prevent conflicts
- Enhanced `cleanArticleContent` to remove all `<section>` tags from article HTML
- Only FAQ section uses `<section>` (rendered by FAQAccordion component)
- Added removal of `<hr />` tags during cleaning

**Files Modified:**
- `components/Sources.tsx` - Changed `<section>` to `<div>`
- `app/(site)/miami/services/[slug]/page.tsx` - Enhanced cleaning regex patterns

