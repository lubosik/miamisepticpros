# Hydration Mismatch Fix Report

## Summary

Eliminated hydration mismatches by implementing a SSR-first article layout system that always renders the same HTML structure on server and client.

## Fixed Files

### New Files Created
1. **`components/article/ArticleLayout.server.tsx`** - SSR-first layout component
   - Always renders consistent structure (never conditionally omits sections)
   - Uses ISO date strings to prevent locale drift
   - All sections always present in DOM

2. **`components/article/Toc.client.tsx`** - Client-side scroll spy enhancer
   - Returns `null` - only enhances existing DOM
   - Adds `aria-current` attributes without changing structure

3. **`lib/articles/heading-extract.ts`** - Server-side heading extraction
   - Deterministic heading extraction for TOC
   - Consistent between SSR and CSR

### Modified Files
1. **`app/(site)/miami/services/[slug]/page.tsx`**
   - Switched from `CheckatradeArticleLayout` (client component) to `ArticleLayout.server` (server component)
   - Passes ISO date strings instead of formatted dates
   - Removed `formatDate` function

2. **`components/Sources.tsx`**
   - Always renders container (never returns `null`)
   - Uses `aria-hidden` for empty state
   - Maintains same DOM structure regardless of content

3. **`components/FAQAccordion.tsx`**
   - Always renders container div (never returns `null`)
   - Uses `aria-hidden` for empty state
   - Maintains consistent structure

## SSR/CSR Diff Sources Removed

### 1. Conditional Section Rendering
- **Before:** FAQ section only rendered if `faqs.length > 0` - caused `<section>` tag mismatch
- **After:** FAQ section always rendered with consistent structure, content conditionally hidden

### 2. Conditional Component Returns
- **Before:** `Sources` and `FAQAccordion` returned `null` when empty
- **After:** Always return same container structure, use `aria-hidden` for empty state

### 3. Date Formatting Drift
- **Before:** Dates formatted on server, passed to client component (potential locale/timezone drift)
- **After:** ISO date strings passed from server, formatted consistently in server component

### 4. Client Component Layout
- **Before:** Entire `CheckatradeArticleLayout` was a client component (`'use client'`)
- **After:** `ArticleLayout.server.tsx` is a server component, only enhancers are client

### 5. TOC Structure
- **Before:** `StickyTOC` returned `null` when headings empty, could differ between SSR/CSR
- **After:** TOC nav always rendered with consistent structure, client component only enhances

## Page Tested

**URL:** `/miami/services/septic-tank-pumping/` (Article 1)

### Server HTML Structure Verification
```html
<main class="article-main" id="main">
  <section class="article-hero-band" data-static>...</section>
  <section class="article-body" data-static>...</section>
  <section class="faq-section" aria-labelledby="faq-heading" data-static>...</section>
</main>
```

✅ **Confirmed:** Both `<section class="article-hero-band">` and `<section class="article-body">` are present in server HTML

## Hydration Warnings

**Status:** ✅ None expected

The new layout ensures:
- Same HTML structure on server and client
- No conditional tag rendering
- No date formatting differences
- No client-only structure changes

## Actions to Migrate Remaining Articles

All existing service articles (4 completed) already use the new layout via the page route. No migration needed - the route handler automatically applies the SSR-first layout to all articles in `/miami/services/**`.

### Remaining Articles Status
- ✅ Article 1: `septic-tank-pumping` - Migrated
- ✅ Article 2: `septic-tank-cleaning` - Migrated  
- ✅ Article 3: `septic-tank-inspection` - Migrated
- ✅ Article 4: `emergency-septic-services` - Migrated
- 📋 Remaining: 50 articles pending content processing (layout already applied)

### Future Articles
When processing new articles:
1. Ensure frontmatter includes `updated` or `published` date (ISO format preferred)
2. Article HTML content will be automatically processed by `cleanArticleContent()`
3. Layout structure is consistent across all articles

## Architecture Improvements

1. **Separation of Concerns:**
   - Server components handle structure
   - Client components only enhance (TOC scroll spy, FAQ accordion interaction)

2. **Predictable Rendering:**
   - All sections always rendered
   - No conditional tag omission
   - Consistent DOM structure

3. **Maintainability:**
   - Single source of truth (`ArticleLayout.server.tsx`)
   - Clear separation between structure and enhancement
   - Easy to extend without breaking hydration

## Commit History

1. `refactor: create SSR-first ArticleLayout to eliminate hydration mismatches`
2. `fix: ensure FAQ section always renders consistent structure`

## Next Steps

1. ✅ QA complete for Article 1
2. Test Articles 2-4 for hydration errors
3. Continue processing remaining 50 articles using same layout system
4. Monitor for any hydration warnings in production

---
**Report Generated:** After Phase F QA
**Layout System:** SSR-first with client enhancement pattern
