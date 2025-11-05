# Vercel Deployment Guide for Claude Code
## Miami Septic Pros Website

### Repository Information
- **GitHub Repository**: `https://github.com/lubosik/miamisepticpros`
- **Branch**: `main`
- **Status**: ✅ All fixes applied and pushed
- **Framework**: Next.js 14.2.0

---

## Quick Deployment Steps

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import Git Repository:
   - Select **GitHub** as Git provider
   - Find and select: `lubosik/miamisepticpros`
   - Click **"Import"**

### Step 2: Configure Project Settings

**Framework Preset:**
- Should auto-detect: **Next.js**
- If not detected, manually select: **Next.js**

**Root Directory:**
- Leave as default: `./` (root)

**Build Command:**
- Default: `npm run build` ✅ (this is correct)

**Output Directory:**
- Leave as default (Next.js handles this automatically)

**Install Command:**
- Default: `npm install` ✅ (this is correct)

### Step 3: Environment Variables (Optional)

Add these if needed:

```
UNSPLASH_ACCESS_KEY=lDB7u4zFDvEUCFZy51zl2WyNU-q70sbw_b7wXW2L1Zo
```

**Note:** The Unsplash key is already hardcoded in the API route, but adding it as an environment variable is more secure.

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (usually 2-5 minutes)
3. Check build logs for any errors

---

## Current Status & Fixes Applied

✅ **All Issues Resolved:**

1. **MDX Configuration**: Fixed `remarkPlugins` empty array issue
   - Changed to: `remarkPlugins: [require('remark-gfm')]`

2. **Mobile Responsiveness**: Fully optimized
   - Mobile hamburger menu implemented
   - Responsive typography and spacing
   - Mobile-friendly buttons and layouts

3. **Homepage Hero Section**: Fixed background image visibility
   - Image opacity increased to 70%
   - Proper z-index layering (image z-0, content z-10, text z-20)
   - Minimum height added for proper rendering
   - Septic digging/excavation theme image

4. **Resource Images**: Mobile optimization complete
   - Thumbnail images show on mobile (Resources listing page)
   - Hero images hidden on mobile (Article detail pages)
   - All 54 articles optimized

5. **Contact Page**: Fixed metadata typo
   - Added missing `title` field

---

## Build Configuration

### Next.js Config (`next.config.js`)
```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')], // ✅ Fixed
    rehypePlugins: [
      require('rehype-slug'),
      [require('rehype-autolink-headings'), { behavior: 'wrap' }],
    ],
  },
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      {
        source: '/miami/services/:slug',
        destination: '/services/:slug',
        permanent: true,
      },
      {
        source: '/resources/:slug',
        destination: '/services/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
```

### Package.json Scripts
```json
{
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## Key Files & Structure

```
miamisepticpros/
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # Homepage (hero section fixed)
│   │   ├── contact/page.tsx      # Contact page (metadata fixed)
│   │   ├── resources/[slug]/      # Resource articles (mobile optimized)
│   │   ├── services/[slug]/      # Service pages
│   │   ├── locations/            # Location pages
│   │   ├── tools/                # Calculator tool
│   │   └── book/                 # Booking page
│   ├── api/
│   │   └── unsplash-image/       # Image API route
│   └── layout.tsx                # Root layout (viewport meta added)
├── components/
│   ├── HeroImage.client.tsx      # Hero image component (fixed)
│   ├── ResourceHeroImage.client.tsx  # Resource hero (mobile hidden)
│   └── ResourceImage.client.tsx   # Resource thumbnails (mobile visible)
├── next.config.js                # MDX config fixed
└── package.json
```

---

## Troubleshooting

### If Build Fails:

1. **MDX Error**: Should be fixed, but if it occurs:
   - Verify `remark-gfm` is in `package.json`
   - Check `next.config.js` has correct `remarkPlugins` array

2. **Module Not Found**:
   - Run `npm install` locally first
   - Ensure all dependencies are in `package.json`

3. **Image Loading Issues**:
   - Verify Unsplash API key (optional, hardcoded fallback exists)
   - Check `/api/unsplash-image/route.ts` exists

4. **Build Timeout**:
   - Check for large files (should be excluded by `.gitignore`)
   - Review build logs for slow operations

---

## Post-Deployment Checklist

After successful deployment:

- [ ] Test homepage loads correctly
- [ ] Verify hero section background image is visible
- [ ] Test mobile menu functionality
- [ ] Test service pages
- [ ] Test location pages
- [ ] Test resource articles (thumbnails visible, hero hidden on mobile)
- [ ] Test calculator tool (`/tools/septic-pumping-schedule`)
- [ ] Test booking page (`/book`)
- [ ] Test contact page (`/contact`)
- [ ] Verify images load correctly
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Check SEO meta tags render correctly
- [ ] Verify schema markup is present

---

## Environment Variables Reference

**Optional Environment Variables:**
- `UNSPLASH_ACCESS_KEY` - For Unsplash image API (already hardcoded)
- `NEXT_PUBLIC_GA_ID` - For Google Analytics (if needed)
- `NEXT_PUBLIC_SITE_URL` - For canonical URLs (defaults to `https://miamisepticpros.com`)

---

## Deployment URL

After deployment, Vercel will provide:
- Preview URL: `https://miamisepticpros-hnu6yb2ep-lubosi-kongwas-projects.vercel.app`
- Production URL: `https://miamisepticpros.vercel.app` (or custom domain)

---

## Custom Domain Setup (Optional)

If you want to use a custom domain:

1. Go to **Settings → Domains** in Vercel
2. Add your domain name
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## Git Repository

**Repository**: `https://github.com/lubosik/miamisepticpros`
**Branch**: `main`
**Last Commit**: All fixes applied and pushed

---

## Notes for Claude Code

1. **MDX Issue**: Already resolved - `remarkPlugins` includes `remark-gfm`
2. **Mobile Menu**: Implemented as client component with useState
3. **Images**: Uses Unsplash API with fallbacks - no local images needed
4. **Environment Variables**: Optional but recommended for Unsplash key
5. **Build Command**: Default `npm run build` should work
6. **Framework**: Next.js is auto-detected by Vercel
7. **Hero Section**: Background image now visible with proper opacity and z-index

The repository is ready for deployment. All fixes have been applied and pushed to GitHub.

---

## Quick Test Commands

If you need to test locally first:

```bash
# Clone repository
git clone https://github.com/lubosik/miamisepticpros.git
cd miamisepticpros

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

**Document Created**: 2025-11-05
**Repository Status**: ✅ Ready for Vercel deployment
**All Fixes**: ✅ Applied and tested

