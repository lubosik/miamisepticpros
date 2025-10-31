# Article Routing Guide

## Current Status

✅ **Articles are generated** in: `pages/miami/services/*/index.mdx`

✅ **Route handler created** at: `app/(site)/miami/services/[slug]/page.tsx`

## How to View the Articles

The articles are now accessible at:
- `/miami/services/septic-tank-pumping`
- `/miami/services/septic-tank-cleaning`
- `/miami/services/septic-tank-inspection`
- `/miami/services/emergency-septic-services`
- `/miami/services/septic-tank-unclogging`
- `/miami/services/septic-system-maintenance-plans`
- `/miami/services/septic-tank-riser-installation`

## To View Locally

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Visit any article URL:
   ```
   http://localhost:3000/miami/services/septic-tank-pumping
   ```

## Article Features

Each article includes:
- ✅ Quick Summary box (blue accent)
- ✅ Table of Contents with anchor links
- ✅ Cost breakdown boxes (green cards)
- ✅ Section heading IDs for navigation
- ✅ Full HTML content (no markdown symbols visible)
- ✅ Schema markup (Service, FAQ, Breadcrumb)

## File Structure

```
pages/miami/services/
├── septic-tank-pumping/index.mdx
├── septic-tank-cleaning/index.mdx
├── septic-tank-inspection/index.mdx
├── emergency-septic-services/index.mdx
├── septic-tank-unclogging/index.mdx
├── septic-system-maintenance-plans/index.mdx
└── septic-tank-riser-installation/index.mdx
```

The route handler reads these MDX files and renders them with:
- Front matter metadata
- HTML content rendering
- Schema JSON-LD
- Breadcrumbs
- SEO metadata

