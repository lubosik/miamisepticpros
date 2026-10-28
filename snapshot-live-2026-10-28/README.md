# Live snapshot: miamisepticpros.com, 28 Oct 2026

Parity baseline and rollback reference for the move from Namecheap shared hosting (LiteSpeed) to Cloudflare Workers static assets (master plan WS6C). Taken on 2026-10-28 between 17:13 and 17:28 UTC (crawl 17:13 to 17:17, RSC payloads and assets until 17:19, probes until 17:25, a final asset reconciliation pass at 17:27). Nothing on the live site was changed and no form was submitted: every request was a plain GET.

## What is here

| Path | Contents |
|---|---|
| `pages/` | Raw HTML exactly as served for every URL that returned 200 `text/html`, at its URL path (`/services/` is `pages/services/index.html`). Bytes are unmodified (only the gzip transfer encoding is removed). Next to each page is its Next.js RSC payload `index.txt`, also as served (414 files), because client-side navigation fetches them. |
| `pages/_other-responses/` | Bodies of non-200 responses (LiteSpeed 301 page, the site's Next.js 404 page, 403 page, directory listings), stored once each by SHA-256. Every record in `manifest.json` and `probes.json` gives the `body_sha256` of each hop, so each response can be matched to its file. |
| `assets/` | Every same-origin asset referenced by the pages, at its URL path: 85 JS, 2 CSS, 77 PNG images, favicons, `site.webmanifest`, `robots.txt`, sitemaps, `404.html`. |
| `manifest.json` | One row per requested URL (1,213) with the full redirect chain (status, Location and all response headers for every hop) and the extracted fields listed below. Also the full asset list (224 entries, each with status, headers, size, SHA-256 and where it is saved). |
| `manifest.csv` | The same page rows, flattened (JSON-LD reduced to types plus a SHA-256; raw JSON-LD is in the JSON). |
| `probes.json` | 545 behaviour probes (each with every hop's status, Location and headers), the sitemap fetches and the RSC payload fetches. |
| `inferred-_redirects`, `inferred-_headers` | Draft Cloudflare rules inferred from the probes. Inferred, confirm against `.htaccess` when the owner provides it. |

Size: about 67 MB in total, so everything is committed (no git-ignored image folder was needed), with one exception: two live JS chunks, `/_next/static/chunks/app/(site)/tools/compliance-check/page-9bbae3a63a7ff255.js` and `/_next/static/chunks/app/(site)/tools/risk-scan/page-4e6e143880c9ffcb.js`, contain a Resend API key (sent as `Authorization: Bearer` from the browser). GitHub push protection blocks them and master plan rule 8 forbids secrets in git, so they are listed in this folder's `.gitignore` and exist only in the local working copy where the snapshot was taken. Their size, SHA-256 and headers are in `manifest.json`. Anyone viewing the snapshot offline from a fresh clone will find those two tool pages missing their page script. The key is public on the live site today and should be rotated.

## How it was taken

- Client: Python 3 `requests` (HTTP/1.1 through the session's HTTPS proxy, CA-verified) and BeautifulSoup with lxml for parsing. No JavaScript was executed, so the HTML is what the server sends, not what a browser renders after hydration.
- User agent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36`, with normal browser `Accept` and `Accept-Language` headers.
- Politeness: 3 concurrent workers, 0.35 s pause before every request, up to 4 attempts with exponential backoff on network errors (none were needed).
- Redirects: followed by hand, up to 10 hops, recording every hop. Hops that leave `miamisepticpros.com` and `www.miamisepticpros.com` were not followed (there were none).
- Seeds: `/robots.txt` (its `Sitemap:` line), `/sitemap.xml` (530 URLs), the child sitemaps `/sitemap-services.xml` (103) and `/sitemap-resources.xml` (372), which are subsets, the homepage, and the 13 repo routes from `ops-checkpoint0/repo-not-in-live.txt`.
- Crawl: every same-origin `<a href>`, `<link rel=canonical|alternate>` and `<iframe src>` on every 200 HTML page was followed recursively on `https://miamisepticpros.com`. Fragments were dropped; query strings were kept. URLs were requested exactly as linked, including the non-slash and double-slash forms that appear in live links.
- Assets: collected from `link`, `script`, `img`, `source`, `video`, `audio`, `iframe`, `embed`, `object`, `srcset`, `meta content` and inline `style` attributes and blocks, plus a scan of each page's HTML and RSC payload for same-origin asset paths and `/_next/static/...` paths. CSS files were scanned for `url()` and `@import`, JS files for `/_next/static/...` paths, repeated until nothing new appeared. A fixed list of standard root files was also requested (`manifest.json`, `apple-touch-icon.png`, `ads.txt`, `llms.txt` and so on); those that 404 are in the asset list with `referenced_by_pages: false`. An over-broad first pass of the path regex produced some non-existent URLs (for example `/contact/page-<hash>.js`, cut out of `static/chunks/app/(site)/contact/page-<hash>.js`); those were fetched (404) and then removed from the asset list because no page references them.
- External resources (Unsplash images, Google Tag Manager, Trustpilot widget, Google Maps embed, Web3Forms and outbound links) were not downloaded.
- Probes (`probes.json`, `category` field): `trailing-slash/no-slash-variant` (every 200 page without its slash), `scheme/http-apex`, `host/http-www`, `host/https-www`, `host/https-www-deep`, `query-string`, `index-and-extension`, `path-normalisation` (case, `//`, `./`, `../`), `not-found-and-special` (random 404 paths with token `07atj3oqrq`, `/404.html`, `/.htaccess`, `/_next/`, `/api/quote`), `legacy/miami-services-slug` (all 61 slugs in the repo's `pages/miami/services/`), `legacy/resources-slug`, `legacy/pattern-test` (random slugs), `legacy/guess`, `resources/canonical-vs-served`.

## Extracted fields (manifest)

`url`, `in_sitemap`, `discovered_via`, `status_first`, `status` (final), `final_url`, `hop_count`, `redirect_chain`, `title`, `meta_description`, `canonical` (plus `canonical_is_self` and `canonical_status_in_crawl`), `meta_robots`, `x_robots_tag`, `h1` (all H1s), `jsonld_raw` (each block verbatim) and `jsonld_types`, `word_count`, `main_text_sha256`, `hreflang`, `og_tags`, `twitter_tags`, `internal_links_out` (unique same-origin `<a>` targets, in page order), `inbound_internal_link_pages`, `forms` (every form with its fields and buttons), `quote_form_present`, `form_posts_to`, `meta_csp`, `meta_refresh`, `client_redirect`, `duplicate_main_text_count`, `duplicate_title_count`, `last_modified`, `saved_html`, `final_body_sha256`.

- Main text: the `<main>` element if present, otherwise `<body>` without `header`, `nav` and `footer`; `script`, `style`, `noscript`, `template`, `svg` and `iframe` removed; whitespace collapsed to single spaces. `word_count` counts whitespace-separated tokens of that text; `main_text_sha256` is the SHA-256 of it in UTF-8. `main_text_source` says which rule applied.
- Quote form: a `<form>` with at least 3 visible fields including an email or phone field. The forms have no `action` attribute; they submit with client-side `fetch`. `form_posts_to` lists the endpoints found in the same-origin JS the page loads (`https://api.web3forms.com/submit`, found in 12 chunks including the shared layout chunk).

## How to view it offline

```
mkdir -p /tmp/msp-view && cp -r pages/. assets/. /tmp/msp-view/ && python3 -m http.server -d /tmp/msp-view 8080
```
Then open http://localhost:8080/. Unsplash images, GA4, Trustpilot and Maps need network access.

## What the snapshot shows

- 1,213 URLs requested. Sitemap (530): 1 is 200 (`/`), 177 are 301 to the slash URL then 200, 352 are 404. Repo seeds (13): 5 are 301 to 200, 8 are 404. Found only through links (670): 406 are 200, 34 are 301 to 200, 229 are 404, 1 is 301 to 404.
- 414 distinct 200 HTML URLs, of which 389 are distinct pages with a clean trailing-slash URL: the 178 sitemap pages, 206 `/resources/{service}-fl-{city}/` city guides that are not in any sitemap, and 5 more (`/privacy/`, `/terms/`, `/quote/thank-you/`, `/contact/thank-you/`, `/test-checkatrade/`). The other 25 are double-slash URLs (for example `/resources/septic-tank-pumping-fl-hialeah//`) that live pages link to and that serve the same page with 200.
- The 206 city guides carry a canonical to `/resources/{service}/fl-{city}/`, which is 404. The sitemap lists the same 404 form without the slash. 206 of the 352 dead sitemap URLs have a live twin in the hyphen form.
- 25 distinct URLs linked from live `<a>` tags return 404 (for example `/services/septic-system-design`, linked from 10 pages; `/miami/services/`, linked from 5).
- Trailing slash: all 388 probed pages 301 from `/path` to `/path/`, query string kept. `http://` is 301 to `https://`. `https://www.` returns 200 (no redirect to the apex). `/miami/services/<anything>` is a pattern 301 to `/services/<anything>` (an unknown slug also 301s, then 404s), then a second 301 adds the slash.
- Duplicates served as 200: `/index`, `/index.html`, `/services/index`, `/services/index.html`, `//services/`, `/services//`, `/404/` and `/404.html`. `/_next/` and `/_next/static/` show LiteSpeed directory listings. Unknown URLs get the site's own 404 page with status 404.
- Headers: every response (HTML, assets, 301s, 404s) has `X-Content-Type-Options: nosniff` and `X-Frame-Options: SAMEORIGIN`. `/_next/static/` has `Cache-Control: public, max-age=2592000`; images and icons `public, max-age=31536000`; HTML none.
- CSP: one `<meta http-equiv="Content-Security-Policy">` value on every 200 HTML page (all 407 rows that were requested at their final URL); its `connect-src` does not allow `https://api.web3forms.com`, which every form posts to (the CHECKPOINT 0 root cause, unchanged today).
- A quote form is on 405 of those 407 pages (not on `/privacy/` or `/terms/`). 41 referenced same-origin images return 404 live, including 36 `/images/locations/*.jpg`, `/logo.png`, `/images/septic/septic-tank-pumping/hero.webp` and three Open Graph images (`/images/og-default.png`, two under `/images/og/`).
