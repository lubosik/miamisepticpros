# EXECUTION PLAN — SepticTankQuoteHub Build Order

**Version:** 1.0
**Last Updated:** 2025-10-29
**Target:** Cursor AI implementation
**Estimated Build Time:** 8–12 hours (phased)

---

## Overview

This document defines the exact build sequence Cursor will follow to implement the SepticTankQuoteHub micro-site. Each phase is dependency-ordered: do not start a phase until the previous one is complete and tested.

---

## Technology Stack (Recommendation)

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + CSS custom properties for tokens
- **Content:** MDX for articles (with front matter validation)
- **Schema:** `next-seo` + custom JSON-LD components
- **Forms:** React Hook Form + hCaptcha
- **Deployment:** Vercel (or Netlify/Cloudflare Pages)
- **Analytics:** Placeholder for Google Analytics 4

---

## Phase 1: Foundation & Routing (2–3 hours)

### 1.1 Project Initialization
```bash
npx create-next-app@latest septictankquotehub --typescript --tailwind --app
cd septictankquotehub
npm install next-seo react-hook-form @hcaptcha/react-hcaptcha gray-matter
```

### 1.2 Token System
- [ ] Create `/styles/tokens.css` with CSS custom properties from `BRAND_TOKENS.md`
- [ ] Import tokens in `app/layout.tsx`
- [ ] Create `/lib/tokens.ts` for TypeScript token access (if needed)

### 1.3 Directory Structure
```
/app
  /(marketing)           # Route group for main site
    /layout.tsx          # Marketing layout (Header + Footer)
    /page.tsx            # Home
    /services
      /page.tsx          # Services hub
      /[slug]
        /page.tsx        # Service detail (dynamic)
    /locations
      /page.tsx          # Locations hub
      /[state]
        /page.tsx        # State landing
        /[city]
          /page.tsx      # City landing
    /resources
      /page.tsx          # Resources hub
      /[service]
        /[location]
          /page.tsx      # Article detail (dynamic)
    /issues
      /page.tsx          # Issues hub
      /[slug]
        /page.tsx        # Issue detail
    /costs
      /page.tsx          # Cost guides hub
      /[slug]
        /page.tsx        # Cost detail
    /quote
      /page.tsx          # Quote form
      /thank-you
        /page.tsx        # Success page
    /privacy
      /page.tsx
    /terms
      /page.tsx

/components
  /layout               # Header, Footer, Breadcrumbs
  /ui                   # ServiceCard, LocationCard, TableSimple
  /article              # ArticleLayout, TOCAside, ProseStyles
  /seo                  # MetaTags, SchemaJSON
  /forms                # QuoteForm, FormField

/content
  /services             # Service definition JSON files
  /locations            # Location data JSON files
  /resources            # MDX articles (nested by service/location)
  /issues               # Issue MDX files
  /costs                # Cost guide MDX files

/lib
  /content              # Content loading utilities
  /seo                  # SEO helpers, schema generators
  /validation           # Zod schemas for front matter

/public
  /images               # Service icons, hero images
  /fonts                # Self-hosted fonts (if needed)

/generators             # CLI tools (Phase 7)
```

### 1.4 Base Layout Components
- [ ] `components/layout/Header.tsx` — Logo, nav, mobile menu
- [ ] `components/layout/Footer.tsx` — Links, copyright
- [ ] `app/(marketing)/layout.tsx` — Wrap all pages with Header + Footer

**Acceptance:** Navigate to `/`, `/services`, `/locations` and see Header + Footer.

---

## Phase 2: Component Library (2 hours)

### 2.1 Core UI Components
- [ ] `components/ui/ServiceCard.tsx`
  - Props: `title`, `icon`, `description`, `href`
  - Style: Card with SHADOW_MD, RADIUS_MD, hover lift effect
- [ ] `components/ui/LocationCard.tsx`
  - Props: `city`, `state`, `serviceCount`, `href`
  - Style: Similar to ServiceCard
- [ ] `components/ui/TableSimple.tsx`
  - Props: `headers[]`, `rows[][]`
  - Style: Zebra stripes, BORDER_LIGHT, responsive stack
- [ ] `components/layout/Breadcrumbs.tsx`
  - Props: `items[]` (label, href)
  - Style: SMALL, MUTED_TEXT, chevron separators

### 2.2 Article Components
- [ ] `components/article/ProseStyles.tsx`
  - Wrapper with scoped typography classes (H1–H6, p, ul, ol, blockquote, a)
  - Import and apply in article layouts
- [ ] `components/article/TOCAside.tsx`
  - Props: `headings[]` (id, text, level)
  - Desktop: sticky right rail
  - Mobile: collapsible accordion at top
- [ ] `components/article/ArticleLayout.tsx`
  - Props: `children`, `meta` (title, date, author), `headings[]`, `relatedLinks[]`
  - Structure: Hero → Breadcrumbs → Main (prose + TOC) → RelatedLinks
- [ ] `components/article/StickyMobileCTA.tsx`
  - Fixed bottom bar (mobile only)
  - Button: "Get Free Quote" → `/quote`

### 2.3 SEO Components
- [ ] `components/seo/MetaTags.tsx`
  - Props: `title`, `description`, `canonical`, `ogImage`, `type`
  - Use `next-seo` or custom `<head>` tags
- [ ] `components/seo/SchemaJSON.tsx`
  - Props: `schema` (JSON-LD object)
  - Render `<script type="application/ld+json">`
- [ ] `lib/seo/schemaGenerators.ts`
  - Functions: `generateArticleSchema()`, `generateServiceSchema()`, `generateBreadcrumbSchema()`, `generateOrganizationSchema()`

**Acceptance:** Storybook or isolated test page renders all components correctly.

---

## Phase 3: Static Pages (1 hour)

### 3.1 Home Page (`app/(marketing)/page.tsx`)
- [ ] Hero section with search placeholder (non-functional for now)
- [ ] Grid of 16 ServiceCards (hardcoded or from `/content/services/*.json`)
- [ ] Grid of 8 LocationCards (hardcoded initial cities)
- [ ] Featured guides section (3 article cards, hardcoded links)
- [ ] Add MetaTags + SchemaJSON (Organization + BreadcrumbList)

### 3.2 Hub Pages
- [ ] `/services/page.tsx` — Grid of all 16 services
- [ ] `/locations/page.tsx` — List of states → cities
- [ ] `/resources/page.tsx` — Latest 20 articles (stub for now)
- [ ] `/issues/page.tsx` — Grid of issue cards (stub)
- [ ] `/costs/page.tsx` — Grid of cost guide cards (stub)

### 3.3 Legal Pages
- [ ] `/privacy/page.tsx` — Privacy policy prose (placeholder text)
- [ ] `/terms/page.tsx` — Terms of service prose (placeholder)

**Acceptance:** All hub pages load, navigation works, no console errors.

---

## Phase 4: Dynamic Service & Location Pages (2 hours)

### 4.1 Service Data
- [ ] Create `/content/services/` directory
- [ ] Define schema in `/lib/validation/serviceSchema.ts` (Zod)
  - Fields: `slug`, `title`, `icon`, `shortDescription`, `fullDescription`, `faqs[]`, `relatedServices[]`, `schema` (Service type keywords)
- [ ] Create 16 JSON files (one per subservice), e.g., `/content/services/septic-tank-pumping.json`
- [ ] Write content loader: `/lib/content/getService.ts`, `getAllServices.ts`

### 4.2 Service Detail Page (`app/(marketing)/services/[slug]/page.tsx`)
- [ ] Load service data from JSON via `getService(slug)`
- [ ] Render: Breadcrumbs → Hero (H1, lead) → Full description (ProseStyles) → FAQs (details/summary) → Related services
- [ ] Add MetaTags + SchemaJSON (Service + BreadcrumbList)
- [ ] `generateStaticParams()` for all 16 services

### 4.3 Location Data
- [ ] Create `/content/locations/` directory structure: `/content/locations/{state}/{city}.json`
- [ ] Define schema in `/lib/validation/locationSchema.ts`
  - Fields: `city`, `state`, `stateCode`, `slug`, `population`, `availableServices[]`, `localInsights` (prose)
- [ ] Create initial JSON files for top 10 cities (Miami, Tampa, Orlando, Jacksonville, Fort Lauderdale, etc.)
- [ ] Write loaders: `getLocation(state, city)`, `getLocationsByState(state)`, `getAllStates()`

### 4.4 Location Pages
- [ ] **State landing** (`app/(marketing)/locations/[state]/page.tsx`)
  - List all cities in state with LocationCards
  - Add MetaTags + SchemaJSON (ItemList of cities)
- [ ] **City landing** (`app/(marketing)/locations/[state]/[city]/page.tsx`)
  - Hero with city name
  - Grid of available services (ServiceCards)
  - Local insights prose (from JSON)
  - Related articles section (stub for now)
  - Add MetaTags + SchemaJSON (ItemList of services + BreadcrumbList)
- [ ] `generateStaticParams()` for all state/city combinations

**Acceptance:** Visit `/services/septic-tank-pumping`, `/locations/fl`, `/locations/fl/miami` — all render with correct data and schema.

---

## Phase 5: Article System (2–3 hours)

### 5.1 MDX Setup
- [ ] Install: `npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm rehype-slug rehype-autolink-headings`
- [ ] Configure `next.config.js` to handle `.mdx` files
- [ ] Create `/lib/content/articles.ts` with:
  - `getArticle(service, location)` — load MDX + parse front matter
  - `getAllArticles()` — list all for sitemap
  - `getArticlesByService(service)` — filter by service
  - Auto-generate TOC from headings (extract H2/H3)

### 5.2 Article Schema
- [ ] Define in `/lib/validation/articleSchema.ts`
  - Front matter fields: `title`, `slug`, `service`, `state`, `city`, `primaryKeyword`, `supportKeywords[]`, `metaDescription`, `ogImage`, `publishedDate`, `updatedDate`, `author`, `sources[]`
- [ ] Validate on load, throw error if invalid

### 5.3 Article Detail Page (`app/(marketing)/resources/[service]/[location]/page.tsx`)
- [ ] Load MDX via `getArticle(service, location)`
- [ ] Extract headings for TOC
- [ ] Render with `ArticleLayout`:
  - Breadcrumbs
  - Optional hero image
  - H1 + metadata (author, date)
  - Main prose (ProseStyles wrapper) with TOC aside
  - Inline CTA after H2 #2 (detect position programmatically or use marker component)
  - RelatedLinks (pull from front matter or auto-suggest)
  - StickyMobileCTA
- [ ] Add MetaTags + SchemaJSON (Article + HowTo/FAQPage if applicable + BreadcrumbList)
- [ ] `generateStaticParams()` from `getAllArticles()`

### 5.4 Sample Articles
- [ ] Create `/content/resources/septic-tank-pumping/fl-miami.mdx` (placeholder, note where to import research)
- [ ] Create `/content/resources/septic-inspection/fl-tampa.mdx`
- [ ] Create `/content/resources/emergency-pumping/fl-orlando.mdx`
- [ ] Each includes:
  - Valid front matter
  - 1,200+ word prose
  - H2/H3 structure for TOC
  - At least one TableSimple
  - FAQs section (use `<details>` or custom FAQ component)

**Acceptance:** Visit `/resources/septic-tank-pumping/fl-miami`, see full article with TOC, inline CTA, sticky mobile CTA, correct schema.

---

## Phase 6: Issues & Cost Guides (1 hour)

### 6.1 Issues
- [ ] Create `/content/issues/` with MDX files (e.g., `drains-gurgling.mdx`, `slow-draining-sinks.mdx`)
- [ ] Define schema: `issueSchema.ts` (title, slug, symptoms[], causes[], solutions[], relatedServices[])
- [ ] Loader: `getIssue(slug)`, `getAllIssues()`
- [ ] Page: `app/(marketing)/issues/[slug]/page.tsx`
  - Render with ArticleLayout (reuse)
  - Add MetaTags + SchemaJSON (Article or HowTo)
  - `generateStaticParams()`

### 6.2 Cost Guides
- [ ] Create `/content/costs/` with MDX files (e.g., `septic-tank-pumping.mdx`, `drainfield-replacement.mdx`)
- [ ] Define schema: `costSchema.ts` (title, slug, service, nationalAverage, priceRange[], factors[], regionalData[])
- [ ] Loader: `getCostGuide(slug)`, `getAllCostGuides()`
- [ ] Page: `app/(marketing)/costs/[slug]/page.tsx`
  - Render with ArticleLayout
  - Include TableSimple for cost breakdowns
  - Add MetaTags + SchemaJSON (Article + HowTo if step-by-step)
  - `generateStaticParams()`

**Acceptance:** Visit `/issues/drains-gurgling` and `/costs/septic-tank-pumping`, both render correctly with schema.

---

## Phase 7: Quote Form (1 hour)

### 7.1 Form Component
- [ ] Create `components/forms/QuoteForm.tsx`
- [ ] Use React Hook Form with Zod validation
- [ ] Fields (per spec in Phase 0):
  - Contact: name, email, phone
  - Location: address, city, state (dropdown), ZIP
  - Service: serviceType (dropdown from 16 options), urgency (radio)
  - Symptoms: textarea (optional)
  - Privacy: checkbox (required)
  - hCaptcha widget
  - Honeypot field (hidden)
- [ ] Style: clean, accessible, error messages inline, ACCENT_GREEN submit button

### 7.2 Quote Page
- [ ] `app/(marketing)/quote/page.tsx`
  - Render QuoteForm
  - Add MetaTags (title: "Get a Free Septic Quote")
  - No schema needed

### 7.3 Submission Handler
- [ ] Create API route: `app/api/quote/route.ts`
- [ ] Validate hCaptcha server-side
- [ ] Check honeypot (reject if filled)
- [ ] Send via webhook (placeholder URL in env var) or email SMTP
- [ ] On success: return 200, redirect client to `/quote/thank-you`
- [ ] On failure: return 400 with error message

### 7.4 Thank You Page
- [ ] `app/(marketing)/quote/thank-you/page.tsx`
  - Simple message: "Thank you! A local pro will contact you within 24 hours."
  - Optional: tracking pixel (GA4 event)
  - Add MetaTags (noindex, nofollow)

**Acceptance:** Submit quote form with valid data → success page. Submit with invalid hCaptcha → error displayed.

---

## Phase 8: SEO Infrastructure (1 hour)

### 8.1 Sitemap
- [ ] Create `app/sitemap.ts` (Next.js 14 convention)
- [ ] Include all static pages + dynamic routes (services, locations, articles, issues, costs)
- [ ] Exclude `/quote/thank-you`, `/api/*`
- [ ] Set priority: home = 1.0, hubs = 0.8, detail pages = 0.6
- [ ] Set changefreq: home = daily, articles = weekly, services/locations = monthly

### 8.2 Robots.txt
- [ ] Create `app/robots.ts`
- [ ] Allow all except `/quote/thank-you`, `/api/*`
- [ ] Point to sitemap: `https://septictankquotehub.com/sitemap.xml`

### 8.3 Favicon & Manifest
- [ ] Create `/public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`
- [ ] Create `/public/site.webmanifest`
- [ ] Link in root layout `<head>`

### 8.4 Open Graph Images
- [ ] Create default OG image: `/public/og-default.png` (1200×630)
- [ ] Per-article OG images: store in `/public/images/og/{service}-{location}.png` (optional, can auto-generate later)

### 8.5 Analytics
- [ ] Add Google Analytics 4 script to root layout (env var: `NEXT_PUBLIC_GA_ID`)
- [ ] Track page views, quote form submissions

**Acceptance:** Visit `https://septictankquotehub.com/sitemap.xml`, `/robots.txt` — both render correctly. OG tags present in page source.

---

## Phase 9: Content Generation CLI (2 hours)

See `/generators/README.md` for full spec. Summary:

### 9.1 Generator Scripts
- [ ] `generators/generate-services.ts` — Create 16 service JSON files from template
- [ ] `generators/generate-locations.ts` — Read `locations.csv`, output JSON files for each city
- [ ] `generators/generate-articles.ts` — Read `targets.csv` (service × location), create stub MDX files with front matter
- [ ] `generators/generate-issues.ts` — Create issue MDX stubs from `issues.csv`
- [ ] `generators/generate-costs.ts` — Create cost guide MDX stubs from `costs.csv`

### 9.2 CSV Input Files (provided by user or auto-generated)
- [ ] `generators/data/services.csv` — 16 rows (slug, title, icon, shortDesc)
- [ ] `generators/data/locations.csv` — ~50 cities (city, state, stateCode, population)
- [ ] `generators/data/targets.csv` — ~800 rows (service × location combinations for articles)
- [ ] `generators/data/issues.csv` — ~20 rows (slug, title, symptoms)
- [ ] `generators/data/costs.csv` — ~16 rows (slug, service, nationalAverage)

### 9.3 Run Scripts
```bash
npm run generate:services
npm run generate:locations
npm run generate:articles    # Creates stubs only, not full content
npm run generate:issues
npm run generate:costs
```

**Acceptance:** Run all generators, verify `/content/` directories populated with valid JSON/MDX stubs. Front matter validates against schemas.

---

## Phase 10: Testing & Optimization (1–2 hours)

### 10.1 Lighthouse Audit
- [ ] Run on home, service detail, city, article pages
- [ ] Target: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO

### 10.2 Accessibility
- [ ] Keyboard navigation works (tab through Header, forms, CTAs)
- [ ] ARIA labels on icons, buttons, form fields
- [ ] Color contrast meets WCAG AA (verify with tool)
- [ ] Screen reader test (VoiceOver or NVDA)

### 10.3 Mobile Responsiveness
- [ ] Test on 320px, 375px, 768px, 1024px, 1440px viewports
- [ ] Header hamburger menu works
- [ ] TOC collapses on mobile
- [ ] Sticky mobile CTA appears only on mobile
- [ ] Tables stack or horizontal scroll gracefully

### 10.4 Schema Validation
- [ ] Use Google Rich Results Test on 5 sample URLs (home, service, location, article, issue)
- [ ] Fix any warnings/errors

### 10.5 Performance
- [ ] Enable Next.js image optimization (`next/image` for all images)
- [ ] Lazy-load below-the-fold components
- [ ] Check bundle size (aim for < 200KB main JS)
- [ ] Enable caching headers (Vercel does this automatically)

**Acceptance:** All Lighthouse scores 90+, no console errors, forms work on mobile, schema validates.

---

## Phase 11: Deployment (30 min)

### 11.1 Environment Variables
- [ ] `NEXT_PUBLIC_SITE_URL` — Production URL
- [ ] `NEXT_PUBLIC_GA_ID` — Google Analytics ID
- [ ] `HCAPTCHA_SECRET` — Server-side hCaptcha key
- [ ] `WEBHOOK_URL` — Quote submission webhook (Zapier, Make, or email API)

### 11.2 Deploy to Vercel
```bash
vercel --prod
```

### 11.3 Post-deploy Checks
- [ ] Visit live site, test navigation
- [ ] Submit quote form, verify webhook/email received
- [ ] Check sitemap: `https://septictankquotehub.com/sitemap.xml`
- [ ] Verify OG tags with social share previews (Facebook Debugger, Twitter Card Validator)
- [ ] Submit sitemap to Google Search Console

**Acceptance:** Site live, all pages load, forms submit, schema valid, analytics firing.

---

## Phase 12: Content Population (Ongoing)

This phase is separate from build; Cursor does NOT write full article content. Instead:

### 12.1 Import Existing Research
- [ ] User provides prior septic research (docs, outlines, sources)
- [ ] Populate article MDX files manually or via content team
- [ ] Validate front matter with schema checkers

### 12.2 Bulk Content Workflow
- [ ] Use generators to create 800+ article stubs
- [ ] Writer fills in stubs using style guide (`ARTICLE_STYLE.md`)
- [ ] QA checks: word count (1,200+), TOC structure (3+ H2s), FAQs, sources

### 12.3 Content Updates
- [ ] Update `updatedDate` in front matter when articles revised
- [ ] Regenerate sitemap (automatic on Next.js build)

**Acceptance:** 50+ articles published, all validate, TOCs generate correctly, inline CTAs placed after H2 #2.

---

## Dependency Graph

```
Phase 1 (Foundation)
  ↓
Phase 2 (Components) → Phase 3 (Static Pages)
  ↓                      ↓
Phase 4 (Services + Locations) → Phase 5 (Articles) → Phase 6 (Issues + Costs)
                                    ↓
                                  Phase 7 (Quote Form)
                                    ↓
                                  Phase 8 (SEO)
                                    ↓
                                  Phase 9 (Generators)
                                    ↓
                                  Phase 10 (Testing)
                                    ↓
                                  Phase 11 (Deploy)
                                    ↓
                                  Phase 12 (Content — ongoing)
```

---

## Notes for Cursor

1. **Do not skip phases.** Each builds on the previous.
2. **Validate schemas early.** Run Zod checks after creating each content loader.
3. **Test incrementally.** After each phase, run `npm run dev` and manually verify.
4. **Refer to specs constantly:**
   - `BRAND_TOKENS.md` for all colors, fonts, spacing
   - `ARTICLE_STYLE.md` for prose layout rules
   - `SEO_CHECKLIST.md` for meta tags and schema
5. **Placeholder text is OK** for initial builds. Mark clearly with `// TODO: Replace with real content`
6. **Do not generate full article content** in Phase 5. Create stubs with front matter + 200-word placeholder.
7. **Ask for clarification** if a spec is ambiguous. Do not guess.

---

## Completion Checklist

- [ ] All 16 service pages live with valid schema
- [ ] All 10+ location pages (state + city) live
- [ ] 3+ sample articles render with TOC, inline CTA, sticky mobile CTA
- [ ] Quote form submits successfully
- [ ] Sitemap and robots.txt accessible
- [ ] Lighthouse scores 90+ on all page types
- [ ] Schema validates in Google Rich Results Test
- [ ] Mobile responsive (tested on 3+ devices)
- [ ] Deployment to production successful

---

**END OF EXECUTION PLAN**
