# SEO CHECKLIST — SepticTankQuoteHub

**Version:** 1.0
**Last Updated:** 2025-10-29
**Purpose:** Comprehensive SEO requirements for all page types on SepticTankQuoteHub

---

## 1. Meta Tags (All Pages)

### 1.1 Required Meta Tags

Every page must include:

```html
<title>Unique Page Title (50–60 chars) | SepticTankQuoteHub</title>
<meta name="description" content="Unique description (150–160 chars)" />
<link rel="canonical" href="https://septictankquotehub.com/current-page-url/" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta charset="utf-8" />
```

### 1.2 Open Graph Tags (Social Sharing)

```html
<meta property="og:title" content="Page Title (60 chars max)" />
<meta property="og:description" content="Description (150–160 chars)" />
<meta property="og:image" content="https://septictankquotehub.com/images/og/page-specific.png" />
<meta property="og:url" content="https://septictankquotehub.com/current-page-url/" />
<meta property="og:type" content="website" /> <!-- or "article" for blog posts -->
<meta property="og:site_name" content="SepticTankQuoteHub" />
<meta property="og:locale" content="en_US" />
```

### 1.3 Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title (60 chars max)" />
<meta name="twitter:description" content="Description (150–160 chars)" />
<meta name="twitter:image" content="https://septictankquotehub.com/images/og/page-specific.png" />
```

### 1.4 Additional Meta Tags

```html
<meta name="robots" content="index, follow" /> <!-- Default for all pages except /quote/thank-you -->
<meta name="googlebot" content="index, follow" />
<meta name="author" content="SepticTankQuoteHub" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

---

## 2. Page-Specific SEO Requirements

### 2.1 Home Page (`/`)

**Title:**
```
Septic Tank Services Near You | Free Quotes | SepticTankQuoteHub
```

**Meta Description:**
```
Find trusted septic pros in your area. Get free quotes for pumping, cleaning, inspection, repair, and more. Clear guidance. Fast service.
```

**Canonical:**
```
https://septictankquotehub.com/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `Organization` (with logo, sameAs social links)
- `WebSite` (with siteNavigationElement)
- `BreadcrumbList` (Home only)

---

### 2.2 Service Hub (`/services/`)

**Title:**
```
Septic Services | Pumping, Cleaning, Inspection & More
```

**Meta Description:**
```
Browse all septic services: pumping, cleaning, inspection, repair, drainfield work, emergency service, and more. Find the right service for your needs.
```

**Canonical:**
```
https://septictankquotehub.com/services/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `ItemList` (list of all 16 services)
- `BreadcrumbList` (Home > Services)
- `Organization`

---

### 2.3 Service Detail (`/services/{slug}/`)

**Example:** `/services/septic-tank-pumping/`

**Title:**
```
Septic Tank Pumping Services | How It Works, Cost & More
```

**Meta Description:**
```
Professional septic tank pumping services. Learn what it is, how often to pump, average costs, and how to find a trusted contractor near you.
```

**Canonical:**
```
https://septictankquotehub.com/services/septic-tank-pumping/
```

**OG Type:** `website` (or `article` if content-heavy)

**JSON-LD Schema:**
- `Service` (with serviceType, provider, areaServed)
- `FAQPage` (if FAQs present)
- `BreadcrumbList` (Home > Services > Septic Tank Pumping)
- `Organization`

**Service Schema Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Septic Tank Pumping",
  "provider": {
    "@type": "Organization",
    "name": "SepticTankQuoteHub",
    "url": "https://septictankquotehub.com"
  },
  "areaServed": {
    "@type": "State",
    "name": "Florida"
  },
  "description": "Professional septic tank pumping services to prevent system failure.",
  "url": "https://septictankquotehub.com/services/septic-tank-pumping/"
}
```

---

### 2.4 Locations Hub (`/locations/`)

**Title:**
```
Septic Services by Location | Florida & More
```

**Meta Description:**
```
Find septic services in your city. Browse top locations in Florida and beyond. Local pros, free quotes, trusted contractors.
```

**Canonical:**
```
https://septictankquotehub.com/locations/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `ItemList` (list of states)
- `BreadcrumbList` (Home > Locations)
- `Organization`

---

### 2.5 State Landing (`/locations/{state}/`)

**Example:** `/locations/fl/`

**Title:**
```
Septic Services in Florida | Pumping, Cleaning, Inspection & More
```

**Meta Description:**
```
Find trusted septic pros across Florida. Get free quotes for pumping, inspection, repair, and more in Miami, Tampa, Orlando, and 50+ cities.
```

**Canonical:**
```
https://septictankquotehub.com/locations/fl/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `ItemList` (list of cities in state)
- `BreadcrumbList` (Home > Locations > FL)
- `Organization`

---

### 2.6 City Landing (`/locations/{state}/{city}/`)

**Example:** `/locations/fl/miami/`

**Title:**
```
Septic Services in Miami, FL | Pumping, Cleaning & More
```

**Meta Description:**
```
Find trusted septic pros in Miami, FL. Get free quotes for pumping, inspection, repair, drainfield work, and emergency service. Local experts.
```

**Canonical:**
```
https://septictankquotehub.com/locations/fl/miami/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `ItemList` (list of services available in city)
- `BreadcrumbList` (Home > Locations > FL > Miami)
- `Organization`

---

### 2.7 Resources Hub (`/resources/`)

**Title:**
```
Septic Guides & Resources | Expert Tips & Advice
```

**Meta Description:**
```
Browse our library of septic system guides. Learn about maintenance, costs, troubleshooting, and more. Expert advice for homeowners.
```

**Canonical:**
```
https://septictankquotehub.com/resources/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `ItemList` (list of latest articles)
- `BreadcrumbList` (Home > Resources)
- `Organization`

---

### 2.8 Article Detail (`/resources/{service}/{state}-{city}/`)

**Example:** `/resources/septic-tank-pumping/fl-miami/`

**Title:**
```
Complete Guide to Septic Tank Pumping in Miami, FL (2025)
```

**Meta Description:**
```
Everything you need to know about septic tank pumping in Miami: how often to pump, costs, what to expect, and how to find a trusted contractor.
```

**Canonical:**
```
https://septictankquotehub.com/resources/septic-tank-pumping/fl-miami/
```

**OG Type:** `article`

**JSON-LD Schema:**
- `Article` (with headline, author, datePublished, dateModified, image)
- `HowTo` (if step-by-step content present)
- `FAQPage` (if FAQs present)
- `BreadcrumbList` (Home > Resources > Septic Tank Pumping > FL-Miami)
- `Organization`

**Article Schema Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Complete Guide to Septic Tank Pumping in Miami, FL",
  "author": {
    "@type": "Organization",
    "name": "SepticTankQuoteHub"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SepticTankQuoteHub",
    "logo": {
      "@type": "ImageObject",
      "url": "https://septictankquotehub.com/logo.png"
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-20",
  "image": "https://septictankquotehub.com/images/og/septic-tank-pumping-fl-miami.png",
  "description": "Everything you need to know about septic tank pumping in Miami...",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://septictankquotehub.com/resources/septic-tank-pumping/fl-miami/"
  }
}
```

---

### 2.9 Issues Hub (`/issues/`)

**Title:**
```
Septic System Issues & Symptoms | Troubleshooting Guide
```

**Meta Description:**
```
Is your septic system acting up? Browse common symptoms like gurgling drains, slow draining, odors, and more. Learn causes and solutions.
```

**Canonical:**
```
https://septictankquotehub.com/issues/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `ItemList` (list of issues)
- `BreadcrumbList` (Home > Issues)
- `Organization`

---

### 2.10 Issue Detail (`/issues/{slug}/`)

**Example:** `/issues/drains-gurgling/`

**Title:**
```
Gurgling Drains? Causes & Solutions | Septic Troubleshooting
```

**Meta Description:**
```
Hearing gurgling sounds from your drains? Learn the most common causes (full septic tank, clogged vent, drainfield issues) and what to do next.
```

**Canonical:**
```
https://septictankquotehub.com/issues/drains-gurgling/
```

**OG Type:** `article`

**JSON-LD Schema:**
- `Article` or `HowTo`
- `FAQPage` (if FAQs present)
- `BreadcrumbList` (Home > Issues > Drains Gurgling)
- `Organization`

---

### 2.11 Cost Guides Hub (`/costs/`)

**Title:**
```
Septic System Cost Guides | Pumping, Repair & Installation Costs
```

**Meta Description:**
```
Browse detailed cost guides for septic services. Learn average prices, cost factors, and how to budget for pumping, repair, replacement, and more.
```

**Canonical:**
```
https://septictankquotehub.com/costs/
```

**OG Type:** `website`

**JSON-LD Schema:**
- `ItemList` (list of cost guides)
- `BreadcrumbList` (Home > Costs)
- `Organization`

---

### 2.12 Cost Detail (`/costs/{slug}/`)

**Example:** `/costs/septic-tank-pumping/`

**Title:**
```
Septic Tank Pumping Cost Guide (2025) | Average Prices by Tank Size
```

**Meta Description:**
```
How much does septic tank pumping cost? Average prices range from $300–$600. Learn cost factors, regional pricing, and how to save money.
```

**Canonical:**
```
https://septictankquotehub.com/costs/septic-tank-pumping/
```

**OG Type:** `article`

**JSON-LD Schema:**
- `Article`
- `HowTo` (if step-by-step savings tips)
- `FAQPage` (if FAQs present)
- `BreadcrumbList` (Home > Costs > Septic Tank Pumping)
- `Organization`

---

### 2.13 Quote Page (`/quote/`)

**Title:**
```
Get a Free Septic Quote | Fast & Easy | SepticTankQuoteHub
```

**Meta Description:**
```
Request a free quote from trusted septic pros in your area. Fill out our simple form and get responses within 24 hours. No obligation.
```

**Canonical:**
```
https://septictankquotehub.com/quote/
```

**OG Type:** `website`

**Robots:** `index, follow` (OK to index)

**JSON-LD Schema:**
- `WebPage` (simple page, no special schema)
- `BreadcrumbList` (Home > Quote)
- `Organization`

---

### 2.14 Thank You Page (`/quote/thank-you/`)

**Title:**
```
Thank You | Quote Received | SepticTankQuoteHub
```

**Meta Description:**
```
Thank you for requesting a quote. A local septic pro will contact you within 24 hours.
```

**Canonical:**
```
https://septictankquotehub.com/quote/thank-you/
```

**OG Type:** `website`

**Robots:** `noindex, nofollow` (exclude from search)

**JSON-LD Schema:** None (or just Organization)

---

### 2.15 Legal Pages (`/privacy/`, `/terms/`)

**Title (Privacy):**
```
Privacy Policy | SepticTankQuoteHub
```

**Title (Terms):**
```
Terms of Service | SepticTankQuoteHub
```

**Meta Description (Privacy):**
```
Our privacy policy explains how we collect, use, and protect your personal information.
```

**Meta Description (Terms):**
```
Terms of service for using SepticTankQuoteHub. Read our policies and user agreement.
```

**Canonical:**
```
https://septictankquotehub.com/privacy/
https://septictankquotehub.com/terms/
```

**OG Type:** `website`

**Robots:** `index, follow` (OK to index)

**JSON-LD Schema:**
- `WebPage`
- `BreadcrumbList` (Home > Privacy / Terms)
- `Organization`

---

## 3. JSON-LD Schema Reference

### 3.1 Organization (All Pages)

Include on every page (typically in root layout):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SepticTankQuoteHub",
  "url": "https://septictankquotehub.com",
  "logo": "https://septictankquotehub.com/logo.png",
  "description": "Find trusted septic pros near you. Free quotes. Clear guidance.",
  "sameAs": [
    // Add social media links when available
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  }
}
```

### 3.2 BreadcrumbList (All Pages)

Include on every page (auto-generate from route):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://septictankquotehub.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://septictankquotehub.com/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Septic Tank Pumping",
      "item": "https://septictankquotehub.com/services/septic-tank-pumping/"
    }
  ]
}
```

### 3.3 Article (Article Pages)

See example in section 2.8 above.

### 3.4 Service (Service Pages)

See example in section 2.3 above.

### 3.5 FAQPage (Pages with FAQs)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How often should I pump my septic tank?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most septic tanks should be pumped every 3–5 years, depending on household size and tank capacity."
      }
    },
    {
      "@type": "Question",
      "name": "How much does septic tank pumping cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Average cost ranges from $300–$600, depending on tank size, location, and accessibility."
      }
    }
  ]
}
```

### 3.6 HowTo (Step-by-step Guides)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Find Your Septic Tank",
  "description": "Step-by-step guide to locating your septic tank.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Check your property records",
      "text": "Start by reviewing your property deed or septic permit records."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Look for signs in your yard",
      "text": "Search for inspection pipes, manhole covers, or depressions in the ground."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Hire a locating service",
      "text": "If you can't find it, hire a professional septic locating service."
    }
  ]
}
```

### 3.7 ItemList (Hub Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://septictankquotehub.com/services/septic-tank-pumping/",
      "name": "Septic Tank Pumping"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://septictankquotehub.com/services/septic-tank-cleaning/",
      "name": "Septic Tank Cleaning"
    }
    // ... continue for all items
  ]
}
```

---

## 4. Sitemap Requirements

### 4.1 XML Sitemap (`/sitemap.xml`)

**Include:**
- All static pages (home, hubs, legal)
- All dynamic service pages (16 total)
- All dynamic location pages (states + cities)
- All articles (resources, issues, costs)

**Exclude:**
- `/quote/thank-you/`
- `/api/*`
- Any admin or internal pages

**Priority & Changefreq:**
- Home: `1.0`, `daily`
- Hubs (services, locations, resources, issues, costs): `0.8`, `weekly`
- Service details: `0.7`, `monthly`
- Location pages: `0.7`, `monthly`
- Articles: `0.6`, `weekly` (initially), then `monthly` after stabilization
- Legal pages: `0.3`, `yearly`

**Example Entry:**
```xml
<url>
  <loc>https://septictankquotehub.com/services/septic-tank-pumping/</loc>
  <lastmod>2025-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### 4.2 Image Sitemap (Optional, Future)

Include all hero images and key inline images for image SEO.

---

## 5. Robots.txt Requirements

**File:** `/robots.txt`

```txt
User-agent: *
Allow: /

# Exclude thank you page
Disallow: /quote/thank-you/

# Exclude API routes
Disallow: /api/

# Sitemap
Sitemap: https://septictankquotehub.com/sitemap.xml
```

---

## 6. Structured Data Validation

### 6.1 Tools

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/
- **Google Search Console:** Monitor structured data reports

### 6.2 Testing Checklist

Before deployment, test:
- [ ] Home page (Organization + WebSite + BreadcrumbList)
- [ ] Service detail (Service + FAQPage + BreadcrumbList)
- [ ] Location page (ItemList + BreadcrumbList)
- [ ] Article (Article + HowTo/FAQPage + BreadcrumbList)
- [ ] Issue page (Article/HowTo + FAQPage)

**Expected Result:** No errors, 0–2 warnings max (warnings are usually OK).

---

## 7. Internal Linking Strategy

### 7.1 Header Navigation

- Home
- Services (dropdown or link to hub)
- Locations (dropdown or link to hub)
- Resources (link to hub)
- Quote (prominent CTA)

### 7.2 Footer Links

- All 16 services (or top 8 + "View All")
- Top 10 cities
- Resources, Issues, Costs hubs
- Privacy, Terms

### 7.3 Contextual Internal Links

**Article Pages:**
- Link to related service pages (e.g., "Learn more about [septic tank pumping](/services/septic-tank-pumping/)")
- Link to city pages (e.g., "Find septic pros in [Miami](/locations/fl/miami/)")
- Link to related articles in "Related Guides" section

**Service Pages:**
- Link to related services (e.g., "Also see: [Septic Tank Cleaning](/services/septic-tank-cleaning/)")
- Link to articles about that service

**Location Pages:**
- Link to state page from city page
- Link to articles for that location

### 7.4 Anchor Text Best Practices

- Use descriptive anchor text (e.g., "septic tank pumping in Miami" not "click here")
- Vary anchor text (don't always use exact keyword)
- Avoid over-optimization (no keyword stuffing in links)

---

## 8. Image SEO

### 8.1 File Naming

Use descriptive, hyphenated file names:
- **Good:** `septic-tank-pumping-truck-miami.jpg`
- **Bad:** `IMG_1234.jpg`, `image-1.jpg`

### 8.2 Alt Text

Write descriptive alt text for all images:
- **Good:** "Septic tank pumping truck parked in residential driveway"
- **Bad:** "image of truck", "septic", ""

### 8.3 Image Optimization

- Format: WebP (with JPG fallback for older browsers)
- Size: < 200KB per image
- Dimensions: Match usage (hero = 1200×630, inline = 800×600)
- Lazy loading: `loading="lazy"` (except hero image)

### 8.4 OG Images

- Dimensions: 1200×630 (optimal for Facebook, LinkedIn, Twitter)
- Include text overlay: Article title + brand name
- File size: < 300KB
- Format: PNG or JPG (not WebP for OG)

---

## 9. URL Structure

### 9.1 Best Practices

- **Lowercase:** All URLs lowercase (e.g., `/services/septic-tank-pumping/`)
- **Hyphens:** Use hyphens for word separation (not underscores)
- **Short & descriptive:** Keep URLs under 80 characters when possible
- **No trailing slashes on files:** Trailing slash on directories OK (Next.js default)
- **No parameters:** Use clean paths (e.g., `/locations/fl/miami/` not `/locations?state=fl&city=miami`)

### 9.2 URL Examples

✅ **Good:**
- `/services/septic-tank-pumping/`
- `/locations/fl/miami/`
- `/resources/septic-tank-pumping/fl-miami/`
- `/issues/drains-gurgling/`

❌ **Bad:**
- `/Services/Septic_Tank_Pumping.html`
- `/location.php?state=FL&city=Miami`
- `/article?id=123`

---

## 10. Page Speed & Core Web Vitals

### 10.1 Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### 10.2 Optimization Checklist

- [ ] Use Next.js `<Image>` component for automatic optimization
- [ ] Enable lazy loading on below-the-fold images
- [ ] Minimize JavaScript bundle (code splitting, tree shaking)
- [ ] Use system fonts or self-host web fonts (no external font CDN blocking)
- [ ] Enable Gzip/Brotli compression (Vercel does this automatically)
- [ ] Set caching headers for static assets (Vercel does this automatically)
- [ ] Preload critical resources (hero image, fonts)
- [ ] Minimize layout shifts (set width/height on images, reserve CTA space)

---

## 11. Mobile SEO

### 11.1 Responsive Design

- [ ] All pages render correctly on 320px–1920px viewports
- [ ] Touch targets: min 44×44px (buttons, links)
- [ ] Font size: min 16px (no zooming required)
- [ ] No horizontal scroll (except intentional tables with overflow)

### 11.2 Mobile-Specific Elements

- [ ] Sticky mobile CTA (quote button) on article pages
- [ ] Collapsible TOC on mobile
- [ ] Hamburger menu for navigation (< 768px)
- [ ] Stack tables as definition lists or allow horizontal scroll

### 11.3 Testing

- [ ] Test on real devices (iPhone, Android)
- [ ] Use Chrome DevTools mobile emulator
- [ ] Run Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

---

## 12. Analytics & Tracking

### 12.1 Google Analytics 4

**Setup:**
- Add GA4 tracking code to root layout
- Track page views (automatic with Next.js router)
- Track custom events:
  - Quote form submission
  - Inline CTA clicks
  - Sticky mobile CTA clicks
  - Service card clicks
  - Location card clicks

**Example Event (Quote Submission):**
```javascript
gtag('event', 'quote_submission', {
  service: 'septic-tank-pumping',
  location: 'miami-fl',
  urgency: 'routine'
});
```

### 12.2 Google Search Console

**Setup:**
- Verify domain ownership (DNS or HTML file)
- Submit sitemap: `https://septictankquotehub.com/sitemap.xml`
- Monitor:
  - Impressions, clicks, CTR by page/query
  - Coverage errors (404s, server errors)
  - Core Web Vitals (mobile & desktop)
  - Structured data issues

---

## 13. Local SEO (Future Enhancement)

If expanding to local business listings:

### 13.1 Google Business Profile

- Create GBP for each service area (if physical locations exist)
- NAP consistency (Name, Address, Phone)
- Business categories: "Septic Tank Service", "Plumbing", "Contractor"
- Service areas: List cities served

### 13.2 Local Schema

Add `LocalBusiness` schema to location pages:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SepticTankQuoteHub — Miami",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "City",
    "name": "Miami"
  }
}
```

---

## 14. Content Freshness

### 14.1 Update Strategy

- **Articles:** Update annually (or when pricing/regulations change)
- **Services:** Update every 6 months (seasonal tips, new tech)
- **Locations:** Update when new services added or local regulations change
- **Update `dateModified` in front matter when content revised**

### 14.2 Seasonal Content

Consider adding:
- "Hurricane Prep for Septic Systems (FL)" — publish May–June
- "Winter Septic Maintenance (Northern States)" — publish Oct–Nov
- "Spring Cleaning: Septic Edition" — publish Mar–Apr

---

## 15. Competitor Analysis

### 15.1 Tools

- **Ahrefs / Semrush:** Keyword research, backlink analysis
- **Google Search:** Manual SERP analysis for target keywords
- **Screaming Frog:** Crawl competitor sites for structure insights

### 15.2 Target Keywords (Examples)

**Service Keywords:**
- "septic tank pumping near me"
- "septic tank cleaning [city]"
- "septic inspection cost"
- "emergency septic pumping"

**Informational Keywords:**
- "how often to pump septic tank"
- "septic tank pumping cost"
- "signs you need septic pumping"
- "septic system maintenance tips"

**Location Keywords:**
- "septic services in [city]"
- "septic tank pumping [city] [state]"
- "[city] septic inspection"

---

## 16. Implementation Checklist for Cursor

When building pages, verify:

- [ ] Unique `<title>` tag (50–60 chars)
- [ ] Unique `<meta name="description">` (150–160 chars)
- [ ] Canonical URL (absolute, with trailing slash if directory)
- [ ] OG tags (title, description, image, URL, type)
- [ ] Twitter Card tags (card, title, description, image)
- [ ] JSON-LD schema (Organization + BreadcrumbList minimum, plus page-specific)
- [ ] Robots meta (index/follow, except thank-you page)
- [ ] Favicon links (16×16, 32×32, apple-touch-icon)
- [ ] Breadcrumbs visible on page + in schema
- [ ] Alt text on all images
- [ ] Internal links use descriptive anchor text
- [ ] Mobile responsive (test on 320px, 375px, 768px)
- [ ] Page speed: LCP < 2.5s, CLS < 0.1

---

## 17. Launch Checklist

Before going live:

- [ ] All pages have unique titles & descriptions
- [ ] Sitemap generated and accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] All JSON-LD schema validates (Google Rich Results Test)
- [ ] No console errors on any page
- [ ] All internal links work (no 404s)
- [ ] Mobile-friendly test passes (Google tool)
- [ ] Lighthouse audit: 90+ on all scores (Performance, Accessibility, Best Practices, SEO)
- [ ] GA4 tracking code installed and firing
- [ ] Google Search Console verified and sitemap submitted
- [ ] OG images display correctly (Facebook Debugger, Twitter Card Validator)

---

**END OF SEO CHECKLIST**
