# Complete Article Processing Checklist

This document provides a comprehensive, step-by-step checklist for processing each of the 54 articles to ensure they are properly formatted, error-free, and ready for publication on the Miami Septic Pros website.

## Overview

Each article must be processed one at a time, following this complete checklist. After processing one article, STOP and wait for "CONTINUE" before proceeding to the next.

---

## Pre-Processing Setup

### 1. Check Progress File
- [ ] Read `/msp/restructure/progress.json`
- [ ] Verify the article slug is in the `pending` array
- [ ] Confirm article hasn't been processed already (not in `done` or `failed`)

### 2. Locate Article Source
- [ ] Find article file at: `/pages/miami/services/{slug}/index.html`
- [ ] Verify file exists and is readable
- [ ] Read the full article content

---

## Phase 1: Source URLs & Citations

### 3. Verify and Update Source URLs
- [ ] Check front matter `sources` array
- [ ] Test each URL with: `curl -s -o /dev/null -w "%{http_code}" "URL"`
- [ ] Replace any 404 URLs with verified working URLs:
  - ✅ Miami-Dade: `https://www.miamidade.gov/permits/`
  - ✅ Florida DOH: `https://www.floridahealth.gov/environmental-health/onsite-sewage/`
  - ✅ Florida DEP: `https://floridadep.gov/water/domestic-wastewater/`
- [ ] Update `sources` array in front matter
- [ ] Update "Sources & References" section at bottom of article

### 4. Add Inline Citations
- [ ] Identify key facts, statistics, regulations, and guidelines throughout article
- [ ] Add hyperlinks to authoritative sources for:
  - High water table mentions → Florida DEP link
  - Miami-Dade County regulations → Miami-Dade Permits link
  - Florida DOH guidelines → Florida DOH link
  - Permit requirements → Miami-Dade Permits link
  - Contractor registration → Florida DOH link
  - Environmental data → Florida DEP link
- [ ] Ensure all links use: `target="_blank" rel="noopener noreferrer"`
- [ ] Style links with: `class="text-blue-600 hover:underline"`
- [ ] Place links naturally within sentence flow (not as footnotes)

---

## Phase 2: Checkatrade Layout Structure

### 5. Remove Hero Image
- [ ] Remove any `<figure>` elements with hero images
- [ ] Remove `og_image` reference if pointing to hero image
- [ ] Ensure no image elements remain in content

### 6. Verify "At a Glance" Box
- [ ] Check for existing "At a glance" or "Quick Summary" box
- [ ] Ensure it uses correct structure:
  ```html
  <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
    <h3 class="text-xl font-semibold mb-4 text-gray-900">At a glance</h3>
    <ul class="space-y-2 text-gray-700">
      <li><strong>Label:</strong> Value</li>
      ...
    </ul>
  </div>
  ```
- [ ] Update title to "At a glance" (not "Quick Summary")
- [ ] Ensure 3-5 bullet points with key facts

### 7. Verify Table of Contents
- [ ] Check for existing TOC
- [ ] Ensure it's wrapped in `<nav>` with proper structure:
  ```html
  <nav class="mb-8 pb-6 border-b border-gray-200">
    <h2 class="text-lg font-semibold mb-4 text-gray-900">On this page</h2>
    <ul class="space-y-2">
      <li><a href="#section-id" class="text-blue-600 hover:text-blue-800 hover:underline">Section Title</a></li>
      ...
    </ul>
  </nav>
  ```
- [ ] Verify all TOC links point to valid section IDs
- [ ] Include FAQ section in TOC

### 8. Verify FAQ Section
- [ ] Check for FAQ section with `<h2 id="faqs">Frequently Asked Questions</h2>`
- [ ] Ensure each FAQ has:
  - Question as `<h3>` tag
  - Answer as one or more `<p>` tags (can include lists, links)
- [ ] Verify at least 4-6 FAQs present
- [ ] Ensure FAQ section comes after main content

### 9. Verify CTA Section
- [ ] Check for call-to-action section
- [ ] Ensure it uses correct structure:
  ```html
  <div class="mt-12 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white text-center">
    <h2 class="text-3xl font-bold mb-4">Ready to Schedule Your {Service}?</h2>
    <p class="text-lg mb-6 text-green-50">Get a fast, transparent quote from Miami's trusted septic experts.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/quote/" class="inline-block bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">Get Free Quote</a>
      <a href="tel:+13055550100" class="inline-block bg-green-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-900 transition-colors">Call (305) 555-0100</a>
    </div>
  </div>
  ```
- [ ] **CRITICAL:** Ensure BOTH buttons are present and visible:
  - "Get Free Quote" button (white background, green text)
  - "Call (305) 555-0100" button (dark green background, white text)
- [ ] Verify buttons are in a flex container for proper side-by-side display

### 10. Remove Duplicate Sections
- [ ] Remove any "Get expert" headings before CTA
- [ ] Remove any duplicate "Sources & References" sections (will be rendered by component)
- [ ] Remove service area footer sections
- [ ] Ensure no `<section>` tags remain in content (components will add them)

---

## Phase 3: Content Cleaning & Structure

### 11. Content Structure Check
- [ ] Verify H1 is present (only one)
- [ ] Ensure H2s have proper IDs (for TOC navigation)
- [ ] Check for proper heading hierarchy (H1 > H2 > H3)
- [ ] Remove any stray `<hr />` tags
- [ ] Remove any markdown artifacts (#, *, etc.)
- [ ] Ensure paragraphs are properly formatted

### 12. Internal Links
- [ ] Verify links to related services exist:
  - Link to `/miami/services/` hub
  - Link to 2-3 related service pages
- [ ] Check that all internal links resolve (no 404s)
- [ ] If related page doesn't exist, create stub (H1 + "Coming soon")

---

## Phase 4: Technical SEO

### 13. Front Matter Metadata
- [ ] Title format: `"{Service} in Miami, FL | Miami Septic Pros"`
- [ ] Meta description: 150-160 chars, includes primary keyword
- [ ] Verify `published` and `updated` dates are present
- [ ] Ensure `author` is set to "Miami Septic Pros"
- [ ] Verify `areaServed` is "Miami-Dade County, FL"

### 14. Schema Markup
- [ ] Article schema will be auto-generated by route handler
- [ ] FAQPage schema will be auto-generated from FAQ section
- [ ] BreadcrumbList schema will be auto-generated
- [ ] Verify no duplicate schema blocks in HTML

---

## Phase 5: Route Handler Processing

### 15. Verify Route Handler Will Work
The route handler (`app/(site)/miami/services/[slug]/page.tsx`) automatically:
- [ ] Extracts FAQs from content (requires `<h2 id="faqs">`)
- [ ] Extracts "At a glance" data (requires correct div structure)
- [ ] Removes duplicate sections (FAQ, Sources, CTA)
- [ ] Generates schemas (Article, FAQPage, BreadcrumbList)
- [ ] Applies Checkatrade layout components

**Ensure article structure matches what route handler expects:**
- [ ] FAQ section has `<h2 id="faqs">`
- [ ] "At a glance" uses correct class names
- [ ] TOC is in `<nav>` with correct classes
- [ ] CTA section matches expected pattern

---

## Phase 6: Hydration Error Prevention

### 16. Prevent Hydration Mismatches
- [ ] Ensure no client-side only rendering logic
- [ ] Verify FAQ section will render consistently (route handler handles this)
- [ ] Check that no `<section>` tags remain in cleaned content
- [ ] Ensure CTA buttons are in HTML (not conditionally rendered)
- [ ] Verify all components use `suppressHydrationWarning` where needed

---

## Phase 7: QA & Testing

### 17. Local Testing
- [ ] Start dev server on available port
- [ ] Navigate to article URL: `/miami/services/{slug}/`
- [ ] Check browser console for errors
- [ ] Verify no hydration errors appear
- [ ] Check that FAQ accordion works (click to expand/collapse)
- [ ] Verify sticky TOC works (scrolls with page)
- [ ] Verify both CTA buttons are visible and clickable
- [ ] Test all internal links
- [ ] Test all external links (open in new tab)
- [ ] Verify source URLs work (no 404s)

### 18. Visual Verification
- [ ] Hero section displays correctly (no image)
- [ ] "At a glance" box is visible with correct styling
- [ ] TOC is visible in sidebar and updates on scroll
- [ ] FAQ section displays as accordion boxes
- [ ] CTA section shows BOTH buttons side-by-side
- [ ] Sources section displays at bottom
- [ ] No duplicate sections visible
- [ ] Spacing looks good (not cramped)

---

## Phase 8: Documentation & Progress

### 19. Update Progress File
- [ ] Open `/msp/restructure/progress.json`
- [ ] Remove article slug from `pending` array
- [ ] Add article slug to `done` array
- [ ] Update progress count if needed

### 20. Create Processing Report
For each article, note:
- [ ] Article slug
- [ ] URL path
- [ ] Word count (approximate)
- [ ] Number of FAQs extracted
- [ ] Number of inline citations added
- [ ] Source URLs updated
- [ ] Any issues encountered
- [ ] QA status (passed/failed)

---

## Phase 9: CTA Component Verification

### 21. Verify CTA Component
- [ ] ArticleCTA component automatically renders after FAQs
- [ ] CTA shows BOTH buttons:
  - "Get Free Quote" button (white bg, green text)
  - "Call (305) 555-0100" button (dark green bg, white text)
- [ ] Buttons display side-by-side on desktop (flex-row)
- [ ] Buttons stack vertically on mobile (flex-col)
- [ ] Both buttons are clickable and functional

**Note:** The CTA section in article HTML will be removed during content cleaning and replaced by the ArticleCTA component automatically.

---

## Phase 10: Final Output

### 22. Print Completion Message
After completing all steps, print:
```
ARTICLE COMPLETE ({done}/{total}) — Say CONTINUE to process the next article.
```

### 23. STOP
- [ ] Do NOT process next article
- [ ] Wait for user to say "CONTINUE"
- [ ] Only then proceed to next article in queue

---

## Common Issues & Solutions

### Issue: Hydration Error - "Expected server HTML to contain a matching <section> in <main>"
**Solution:**
- The `Sources` component now uses `<div>` instead of `<section>` to prevent conflicts
- The `cleanArticleContent` function removes all `<section>` tags from article HTML
- Only FAQ section uses `<section>` (rendered by FAQAccordion component)
- Verify no `<section>` tags remain in cleaned content
- Ensure all components render consistently on server and client

### Issue: Missing "Get Quote" Button
**Solution:**
- Verify CTA section HTML has BOTH buttons
- Ensure buttons are in a flex container
- Check that CSS classes are correct
- Verify button structure matches Article 1

### Issue: Source URLs Return 404
**Solution:**
- Always use verified base URLs:
  - `https://www.miamidade.gov/permits/`
  - `https://www.floridahealth.gov/environmental-health/onsite-sewage/`
  - `https://floridadep.gov/water/domestic-wastewater/`
- Test URLs before adding to article
- Update both front matter and Sources section

### Issue: FAQ Section Not Extracting
**Solution:**
- Ensure `<h2 id="faqs">Frequently Asked Questions</h2>` is present
- Verify each FAQ uses `<h3>` for question
- Check that answers are in `<p>` tags
- Ensure FAQ section comes after main content

### Issue: Duplicate Sections Visible
**Solution:**
- Verify cleaning function removes:
  - CTA sections
  - Sources sections
  - Service area footers
- Check route handler's `cleanArticleContent` function
- Ensure sections match expected patterns

---

## Quick Reference: Required Structure

### Article HTML Structure (before processing):
```html
---
title: "{Service} in Miami, FL | Miami Septic Pros"
sources: [...verified URLs...]
---

<h1>{Service} in Miami, FL</h1>

[Intro paragraphs with inline citations]

<div class="bg-blue-50...">At a glance box</div>

<nav class="mb-8...">TOC</nav>

<h2 id="section1">Section 1</h2>
[Content with inline citations]

<h2 id="faqs">Frequently Asked Questions</h2>
<h3>Question 1?</h3>
<p>Answer 1</p>

<h3>Question 2?</h3>
<p>Answer 2</p>

<div class="mt-12...bg-gradient...">CTA with BOTH buttons</div>

<h2>Sources & References</h2>
<ol>...</ol>
```

### Route Handler Automatically:
1. Extracts FAQs (removes from content)
2. Extracts "At a glance" data
3. Removes duplicate sections (CTA, Sources, Footer)
4. Generates schemas
5. Renders with Checkatrade layout components

---

## Files to Modify Per Article

1. `/pages/miami/services/{slug}/index.html` - Update source URLs, add citations, fix structure
2. `/msp/restructure/progress.json` - Update progress tracking

---

## Files That Handle Processing Automatically

1. `/app/(site)/miami/services/[slug]/page.tsx` - Route handler (reads HTML, extracts data, renders layout)
2. `/components/CheckatradeArticleLayout.tsx` - Main layout component
3. `/components/FAQAccordion.tsx` - FAQ accordion component
4. `/components/Sources.tsx` - Sources section component

---

## End of Checklist

After completing ALL items above for ONE article:
1. Test locally
2. Verify no errors
3. Update progress file
4. Print completion message
5. **STOP and wait for CONTINUE**

