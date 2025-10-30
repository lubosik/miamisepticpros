# OG Images Directory

This directory contains Open Graph images for service pages.

## Image Specifications

**Dimensions:** 1200px × 630px (exact)
**Format:** PNG (preferred) or JPG
**File size:** <200KB (optimized)
**Color space:** sRGB

## Naming Convention

```
{service_slug}.png
```

Examples:
- `septic-tank-pumping.png`
- `septic-tank-cleaning.png`
- `emergency-septic-services.png`

## Image Content Requirements

Each OG image should include:

1. **Service name** (large, readable text)
2. **"Miami Septic Pros"** (company name/logo)
3. **Location indicator** ("Miami, FL" or "Serving Miami-Dade")
4. **Optional:** Icon or visual related to service
5. **Brand colors** (consistent with site design)

## Design Guidelines

- **Text legibility:** High contrast, minimum 40px font for service name
- **No clutter:** Keep design simple and scannable
- **Mobile preview:** Ensure text readable when scaled down
- **Consistent branding:** Use same layout/style across all images
- **Professional appearance:** Clean, modern design

## Tools

Recommended tools for creation:
- Canva (template-based)
- Figma (design tool)
- Photoshop (advanced)
- Online OG image generators

## Template

Consider creating a template with placeholders:
- `[Service Name]`
- Fixed "Miami Septic Pros" branding
- Fixed "Miami, FL" location

Then duplicate and customize for each service.

## Quality Check

Before saving:
- [ ] Dimensions exactly 1200×630px
- [ ] File size <200KB
- [ ] Service name readable
- [ ] Company name visible
- [ ] No spelling errors
- [ ] Optimized for web (not raw/uncompressed)

## Usage in MDX

Reference in front matter:
```yaml
og_image: "/images/og/{service_slug}.png"
```

Images should be copied to `/public/images/og/` during build/deploy.

---

**Note:** Cursor can generate placeholder OG images or document image requirements for designer handoff.
