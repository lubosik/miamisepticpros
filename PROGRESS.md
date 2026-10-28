# PROGRESS: Miami Septic Pros

## CHECKPOINT 0 (27 to 28 Oct 2026): does the repo match live?

**Answer: No, and by a wide margin.** The live site is a different, newer build. This repo (`main` and `claude/funny-wright-fgsyrs`, last commit 6 Nov 2025) covers only 77 of the 178 live pages, and its versions of shared pages differ in title, H1, canonical and JSON-LD. Per WS6B.1, work on this site stops here until the owner supplies the live source or approves a rebuild.

Investigation only. No site code was changed. Raw lists are in `ops-checkpoint0/`.

### Evidence

1. **Live is newer.** Live sitemap `last-modified: 25 Jan 2026`, homepage `last-modified: 27 Jan 2026`. Repo last commit 6 Nov 2025.
2. **101 live pages have no route in the repo:** 42 root city money pages (`/septic-tank-pumping-miami/`, `/septic-inspections-doral/` and so on, 7 services x 6 cities), 6 root city hubs (`/miami/`, `/doral/`, `/hialeah/`, `/homestead/`, `/kendall/`, `/coral-gables/`), 28 extra `/locations/fl/{city}/` pages (repo has 8 city JSON files), 19 `/resources/wiki-citations-*/` articles, `/about/`, `/team/`, `/faq/`, `/tools/compliance-check/`, `/tools/risk-scan/`, `/issues/slow-drains-septic-backups/`.
3. **The live forms are not in the repo.** The "Quick Quote" mini form (name, phone, zip, issue, consent) on 177 live pages does not exist in the repo. The live Web3Forms key is different from the key committed in the repo.
4. **The live CSP is not in the repo.** Live pages carry a `<meta http-equiv="Content-Security-Policy">` tag. No CSP exists anywhere in the repo. This tag is what breaks the forms (see Form diagnosis).
5. **Trailing slash.** Live serves every page at a trailing-slash URL with trailing-slash canonicals. The repo has no `trailingSlash` setting and renders canonicals without the slash.
6. **Trustpilot widget** on 177 live pages; not in the repo.
7. **The repo does not build.** `next build` at HEAD fails on 5 ESLint errors (`react/no-unescaped-entities` in `app/(site)/quote/thank-you/page.tsx` and others) and, with lint skipped, on a TypeScript error (`'searchParams' is possibly 'null'` in `app/(site)/contact/thank-you/page.tsx`). So the live site cannot have been built from this commit.
8. **Domain default.** Repo `app/sitemap.ts` and page metadata default to `https://septictankquotehub.com` when `NEXT_PUBLIC_SITE_URL` is unset.

How checked: `git archive HEAD` copy in a scratch folder, run with `next dev` and `NEXT_PUBLIC_SITE_URL=https://miamisepticpros.com`, compared with live HTML fetched with curl and Playwright.

### URL diff summary

| Set | Count |
|---|---|
| Live `/sitemap.xml` URLs (no sitemap index; `sitemap-services.xml` 103 and `sitemap-resources.xml` 372 are subsets) | 530 |
| ...returning 200 directly | 1 (homepage) |
| ...returning 301 to the trailing-slash URL, then 200 | 177 |
| ...returning **404** | **352** (all `/resources/{service}/fl-{city}` URLs) |
| Real live pages | 178 |
| Repo routes (all, see `repo-routes.tsv`) | 204 |
| ...that render 200 | 90 |
| ...that are 301 sources in `next.config.js` (`/resources/:slug` 54 and `/miami/services/:slug` 60) | 114 |
| Live pages also in repo | 77 |
| Live sitemap URLs with no repo route | 453 (352 dead plus 101 real pages) |
| Repo 200 routes not in live sitemap | 13: `/privacy`, `/terms`, `/test-checkatrade`, `/contact/thank-you`, `/quote/thank-you`, `/miami/services`, and 7 bogus `/locations/{city}` "state" pages (`getAllStates()` treats each `content/locations/{city}/` folder as a state) |

Notes:
- The sitemap lists URLs without the trailing slash, so every listed live URL is a 301 hop. Two thirds of the sitemap (352 URLs) are 404s. Both hurt crawling.
- `/issues/slow-drains-septic-backups/` is in the sitemap and returns 200, but the page is a Next.js client error page (`<html id="__next_error__">`).
- Repo `content/locations/{city}/*.mdx` (280 files, 7 cities x 40) are not routed by any page in the repo.

Files: `ops-checkpoint0/live-sitemap-urls.txt`, `live-sitemap-services-child-urls.txt`, `live-sitemap-resources-child-urls.txt`, `live-sitemap-status.tsv`, `live-sitemap-404s.txt`, `live-pages-200.txt`, `repo-routes.tsv`, `live-not-in-repo.txt`, `repo-not-in-live.txt`.

### Parity sample (17 pages)

WS6 lists no protected pages for this site yet. Search Console is needed to pick them. Full values in `ops-checkpoint0/parity-sample.tsv`.

| Page | Repo has it | Title | H1 | Canonical | Robots | JSON-LD |
|---|---|---|---|---|---|---|
| / | yes | **DIFF** | same | same | same | types same, content differs |
| /services/ | yes | **DIFF** | same | DIFF (slash) | same | same |
| /services/septic-tank-pumping/ | yes | **DIFF** | same | DIFF (slash) | same | content differs (repo phone is placeholder +13055550100) |
| /services/septic-to-sewer-conversion/ | yes | **DIFF** | **DIFF** | DIFF (slash) | same | content differs |
| /services/lift-station-installation/ | yes | **DIFF** | **DIFF** | DIFF (slash) | same | content differs |
| /services/drain-field-replacement/ | yes | same | same | DIFF (slash) | same | content differs |
| /costs/septic-tank-pumping/ | yes | same | same | DIFF (slash) | same | same |
| /issues/drains-gurgling/ | yes | same | same | DIFF (slash) | same | same |
| /locations/ | yes | same | same | DIFF (slash) | same | content differs |
| /locations/fl/ | yes | same | same | DIFF (slash) | same | content differs |
| /locations/fl/miami/ | yes | **DIFF** | same | DIFF (slash) | same | same |
| /resources/ | yes | same | same | DIFF (slash) | same | content differs |
| /quote/ | yes | same | same | DIFF (slash) | same | same (none) |
| /contact/ | yes | **DIFF** | same | DIFF (slash) | same | content differs |
| /about/ | **no** | n/a | n/a | n/a | n/a | n/a |
| /septic-tank-pumping-miami/ | **no** | n/a | n/a | n/a | n/a | n/a |
| /resources/wiki-citations-what-is-brown-grease/ | **no** (repo would 301 it to a 404) | n/a | n/a | n/a | n/a | n/a |

Examples (live vs repo):
- `/`: "Septic Services Miami | Same Day Service & Instant Quote" vs "Miami Septic Pros [em-dash] Expert Septic Services in Miami-Dade ...".
- `/services/lift-station-installation/` H1: "Services Lift Station Installation" vs "Lift Station Installation in Miami [em-dash] Sewage Pump Station Installation & Service".
- `/locations/fl/miami/`: "24/7 Septic Services Miami, FL | Same Day Service" vs "Septic Services in Miami, FL | Pumping, Cleaning & More".
- Many live titles end in a literal "..." (truncated in code), for example "Septic Tank Pumping in Miami, FL | 24/7 Service & Instant...".

### Form diagnosis: why zero submissions in 10 months

**Root cause (confirmed): the live Content-Security-Policy blocks the form.** Every live page except one carries a meta CSP whose `connect-src` allows only `'self'`, Google Analytics, Google Tag Manager and Trustpilot. It does not allow `https://api.web3forms.com`. All three live form handlers submit with `fetch("https://api.web3forms.com/submit")`, so the browser refuses the request before it leaves the device. The visitor sees "Failed to fetch". No data reaches Web3Forms, so nothing can reach the inbox.

Evidence (Playwright on live, all POST requests also aborted locally so nothing could be sent):
- Chromium console: `Connecting to 'https://api.web3forms.com/submit' violates the following Content Security Policy directive: "connect-src 'self' https://www.google-analytics.com ..."`.
- Zero requests to api.web3forms.com were issued by the page; the form showed "Failed to fetch".
- CSP present on 177 of 178 live pages; none allow web3forms.

Live forms:

| Form | Where | Fields | Posts to |
|---|---|---|---|
| Quick Quote ("Get Free Quote") | 177 pages, usually lower on the page; above the fold only on the root city money pages | name*, phone*, zip*, issue, consent checkbox* (required) | Web3Forms, `form_type=mini_quote`, `to_email`, `redirect`, `botcheck` |
| Full quote ("Get My Septic Service Estimate") | /quote/, /book/ | honeypot, name, email, phone, address, city, state, zip, serviceType, urgency, symptoms, privacyConsent; hidden hCaptchaToken, 5 UTM fields, referrer | Web3Forms |
| Contact ("Send Message") | /contact/ | name*, email*, phone, service, message* | Web3Forms |

- **Access key:** yes, a Web3Forms access key is in the client JS bundle (value not recorded). It differs from the SFSW key and from the key committed in this repo.
- **The repo's `app/api/quote/route.ts` is not involved live.** The site is a static export on shared hosting; `/api/quote` returns 404 and no live form calls it. That route also writes JSONL to `var/quotes/` on the local disk and needs `WEB3FORMS_ACCESS_KEY`, which would fail or be unset on Vercel or any static host. The repo's own `QuoteForm.tsx` and `ContactForm.tsx` post straight to Web3Forms with a hardcoded key committed to git (rule 8 issue; rotate it).
- Same issue for repo `app/api/unsplash-image/route.ts`: client image components call it, and it cannot exist on a static host.

Secondary risks to test once the CSP is fixed (unverified, need a real end-to-end test):
1. `to_email` is not a documented Web3Forms field as far as known; Web3Forms delivers to the email the access key was created with. The owner should check, in the Web3Forms dashboard, which inbox the MSP key belongs to.
2. The handlers send a `redirect` field and then call `res.json()`. If Web3Forms answers with a redirect, the success check may fail even when the email is sent.
3. Required consent checkbox breaks rule 6 (must be optional) and may cut conversions.
4. The CSP also blocks some GA4 hits (`www.google.com/g/collect`), so analytics undercount.

Fix path (for WS6B.3, after approval): allow the ingest endpoint and `https://api.web3forms.com` in `connect-src` (or drop the meta CSP), post to the ingest endpoint with Web3Forms fallback and the `[septic]` prefix, then submit one clearly labelled test lead.

### Hosting inventory (WS6C start)

**The live site is not on Vercel.** It is on Namecheap shared hosting, served as static files:
- `server: LiteSpeed`, `x-turbo-charged-by: LiteSpeed`; no `x-vercel-*` headers.
- DNS: A record 198.54.114.143; nameservers `dns1.namecheaphosting.com`, `dns2.namecheaphosting.com`; `www` is a CNAME to the apex.
- `vercel.json` in the repo (`{"framework": "nextjs"}`) is not in use live.

| Behaviour live | Detail |
|---|---|
| http to https | `http://miamisepticpros.com/` 301 to https; `http://www.` 301 to `https://www.` |
| www | `https://www.miamisepticpros.com/` returns **200** (no redirect to apex). Canonical points to apex. Recommend a 301 to apex on Cloudflare |
| Trailing slash | `/services` 301 to `/services/` (every page) |
| Legacy redirect | `/miami/services/{slug}` 301 to `/services/{slug}` then 301 to `/services/{slug}/` (2 hops; collapse to 1) |
| Not live | The repo's `/resources/:slug` to `/services/:slug` redirect is not active live (for example `/resources/lift-station-installation` is 404) |
| 404 | Site's own Next.js 404 page with status 404 |
| `/index.html` | Returns 200 (duplicate) |
| Headers | `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`; static assets `cache-control: public, max-age=2592000` |
| CSP | Meta tag in HTML, not a header. Must be rewritten, not ported as is |
| robots.txt | Present: disallows `/quote/thank-you/` and `/api/`, allows GPTBot and OAI-SearchBot, points to `/sitemap.xml` |
| Sitemaps | `/sitemap.xml` (530, 352 dead), `/sitemap-services.xml`, `/sitemap-resources.xml`. Regenerate with live URLs only, trailing slash |
| Third parties | GA4 (G-S8683S7L28), Trustpilot widget, Google Maps embed, Unsplash images |

### WS6B task 7: patch this codebase or move to the engine?

**Recommendation: move Miami Septic Pros onto the new engine with identical URLs. Do not patch this repo.**

Size of the live site:
- 178 real pages (plus 352 dead sitemap URLs to drop).
- About 12 templates: home; services hub and service detail (54); resources hub and article (19); locations hub, state and city (36); root city hub (6); root city money page (42); cost guide (2); issue guide (3); 3 tools; about, team, faq, contact, book, quote and thank-you pages.
- Content source today: the live content is not in this repo. The repo mixes MDX with front matter (`content/`, 116 files, 280 unused location MDX), JSON registries (`data/registry/services.json` 54, `resources.json` 54), raw HTML (`pages/miami/services/*/index.html`, 61 files) and city JSON (8). It also has a stray Pages Router folder (`pages/`) beside the App Router.

Reasons:
1. "Patching" is not possible from here: the repo is not the live code. Two thirds of the live pages and all the live forms are missing, and HEAD does not build.
2. Either way the content must come from the live HTML. Scraping 178 pages into the engine's content format (title, H1, meta description, canonical, body, FAQ, schema) is a bounded job that can be verified page by page with the same parity script.
3. The engine already gives what 6B asks for: hero form on every page, ingest endpoint with Web3Forms fallback, consent wording, Organization schema with `areaServed`, referral footer, and Cloudflare static output.
4. Removing false claims (rule 2 and 3) touches almost every template. In the engine that is done once.
5. It fixes the structural SEO problems at the same time: trailing-slash sitemap, 352 dead URLs, www duplicate, 2-hop redirects, broken `/issues/slow-drains-septic-backups/` page.

Exception: if the owner can produce the live source quickly, a one-line CSP fix there (add `https://api.web3forms.com` to `connect-src`) would restore leads now, before the rebuild. That is the cheapest stopgap and is worth doing first if the source exists.

Risk to manage: title, H1 and body text must be copied exactly for any page with Search Console clicks. Get the Search Console export first and lock those pages.

### Risky claims (rules 2 and 3), live

| # | URL | Exact text | Rule |
|---|---|---|---|
| 1 | / (hero badges) | "Licensed & Insured" (twice), "25+" "Years Experience", "Fully Guaranteed" | 2 |
| 2 | / | "All work backed by our satisfaction guarantee. We stand behind every job." | 2 |
| 3 | / | "Thousands of satisfied customers across Miami-Dade County" | 2 |
| 4 | / | "Licensed septic technicians serving Miami, Coral Gables, Kendall, Doral, Hialeah, Aventura, and Homestead." and "Licensed & Insured Septic Service Company" | 2 |
| 5 | 73 pages (55 plus 18), for example /services/emergency-septic-services/ and all `/resources/wiki-citations-*/` | "Same-day service across Miami-Dade. Licensed & insured." / "Same-day service across Miami-Dade County. Licensed & insured." | 2 |
| 6 | 80 pages, for example / and /septic-tank-pumping-miami/ | "We respond within 24 hours" | 2 (unbacked promise) |
| 7 | 177 pages | Trustpilot widget (implies reviews) | 2 |
| 8 | 177 pages (footer) | A street address with apartment number (same as SFSW, see master plan WS6A.6) | 3 |
| 9 | /about/ | "Our Miami address (...) is our dispatch office, not a walk-in storefront." | 3 |
| 10 | 75 pages (JSON-LD) | `PostalAddress` with that street address | 3 |
| 11 | 75 pages: /, /contact/, all 54 `/services/*/`, all 19 `/resources/wiki-citations-*/` (JSON-LD) | `LocalBusiness` schema with the street address; on the service pages also telephone +1-561-556-2659 (the old shared number) | 3 |
| 12 | 42 root city pages, for example /emergency-septic-pumping-coral-gables/ | "With years of experience serving Coral Gables and Miami-Dade County..." (city name swapped, also a rule 5 risk) | 2, 5 |
| 13 | Same 42 pages | "All work is performed by licensed, insured professionals who understand Miami-Dade specific environmental requirements" | 2 |
| 14 | /emergency-septic-pumping-*/ (6) | "Our licensed contractors maintain trucks ready and personnel on call 24/7..." and "...responses in 3-6 hours, while urgent but non-hazardous situations receive same-day service within 4-8 hours." | 2 |
| 15 | /septic-tank-pumping-*/ (6) | "Same-day service is available for most appointments" | 2 |
| 16 | /team/ | Names an individual team member and their role; "General liability insurance and workers' compensation coverage are required and verified."; "Years of Experience:"; "Our contractors bring years of experience working with Miami-Dade septic systems." | 2, 12 (personal data) |
| 17 | /about/ | Title "About Miami Septic Pros [em-dash] Licensed Contractors, Local to ..."; "We only work with contractors who hold valid Florida septic licenses, maintain insurance..."; "Insurance is verified before contractors are added to our network." | 2 |
| 18 | /faq/ | "Are your contractors licensed and insured? Yes, all contractors in our network are fully licensed by the state of Florida, maintain current insurance coverage..."; "Yes, all work is backed by our satisfaction guarantee." | 2 |
| 19 | /contact/ | "Our licensed technicians are ready to help with all your septic service needs." | 2 |
| 20 | /tools/compliance-check/ | "Miami-Dade Certified", "Certified by Miami-Dade County DERM" | 2 |
| 21 | 6 city hubs, for example /doral/ | "Certified septic inspections for home sales and property purchases in Doral." | 2 |
| 22 | /services/emergency-septic-services/ | "Priority dispatch and response time guarantees" | 2 |
| 23 | /services/drain-cleaning-with-jetting-for-sewage-lines/ and others | "Professional approach guarantees results." / "Licensed services guarantee results." | 2 |
| 24 | /book/ | "We may share your request details with our licensed subcontractors solely to perform your service." | 2 (we have no subcontractors) |

| 25 | 177 pages (footer) | "Miami Septic Pros is owned by First Class Contractors, a United States Dispatcher of Contractors across several home-based industries... We specialize in Septic Installation and Repair services throughout Miami-Dade County." | 2 (partial disclosure, but "We specialize in ... Installation and Repair" implies we do the work) |
| 26 | 177 pages (mini form) | Required checkbox "I agree to be contacted by Miami Septic Pros" | 6 (must be optional, and wording must match the rule 6 text) |

Count: 26 items. The footer has a partial dispatcher disclosure, but not the rule 2 wording ("independent, licensed local providers").

### Decisions needed

1. Do you have the source for the January 2026 live build (local folder or Cursor)? Yes or no. If yes, push it to a branch and approve a one-line CSP fix as a stopgap.
2. Approve moving MSP onto the engine with identical URLs (recommended). Yes or no.
3. Confirm hosting is Namecheap, not Vercel. Yes or no.
4. Search Console export of MSP pages with clicks, to set the protected list.
5. Check in the Web3Forms dashboard which inbox the MSP key sends to.

### Unverified

- Contents of the live `.htaccess` (not readable); behaviour above is from probing.
- Web3Forms behaviour with `to_email` and `redirect` (would need a real submission; none was made).

## WS6C prep (28 Oct 2026): live snapshot taken

Full read-only snapshot of the live site in `snapshot-live-2026-10-28/` (see its README for method). GET requests only; no form submitted; nothing changed live.

- **Correction to CHECKPOINT 0:** the live site has 389 distinct pages, not 178. Besides the 178 sitemap pages there are 206 city guides at `/resources/{service}-fl-{city}/` (200, linked internally, in no sitemap) and 5 utility pages. Each city guide's canonical points to `/resources/{service}/fl-{city}/`, which is 404, and 206 of the 352 dead sitemap URLs are those canonical forms. This needs a decision before the move (fix canonical and sitemap, or 301 the canonical form).
- 1,213 URLs requested: 623 end in 200, 590 in 404. 25 distinct URLs linked from live pages are 404; 25 double-slash URLs linked from live pages serve 200 duplicates.
- Trailing slash 301 on all 388 probed pages; `www` serves 200 (duplicate host); `/miami/services/*` is a pattern 301 (2 hops); `/index`, `/index.html`, `/404/` serve 200 duplicates; nosniff and SAMEORIGIN on every response; the meta CSP still blocks Web3Forms on every page.
- Draft rules: `inferred-_redirects` (390 live-parity rules: 389 static, 1 dynamic; 414 commented RECOMMENDED lines) and `inferred-_headers` (7 rules). Inferred from probes; confirm against `.htaccess` when the owner provides it.
- **Secret exposed live:** the `/tools/compliance-check/` and `/tools/risk-scan/` JS chunks contain a Resend API key used from the browser. Rotate it (owner, Resend dashboard). Those two files are git-ignored in the snapshot (GitHub push protection, rule 8); all else is committed. Size about 67 MB.
