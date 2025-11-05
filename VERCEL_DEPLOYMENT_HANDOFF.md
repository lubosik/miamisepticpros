# Vercel Deployment Handoff Document
## Miami Septic Pros Website

### Repository Information
- **GitHub Repository**: `https://github.com/lubosik/miamisepticpros`
- **Branch**: `main`
- **Framework**: Next.js 14.2.0
- **Package Manager**: npm

---

## Current Status

✅ **Completed:**
- Code pushed to GitHub repository
- MDX configuration fixed (remarkPlugins issue resolved)
- Mobile responsiveness added
- All website files present (research/docs excluded)

❌ **Pending:**
- Vercel deployment and configuration

---

## Vercel Deployment Steps

### Step 1: Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import Git Repository:
   - Select **GitHub** as Git provider
   - Find and select: `lubosik/miamisepticpros`
   - Click **"Import"**

### Step 2: Configure Project Settings

**Framework Preset:**
- Vercel should auto-detect: **Next.js**
- If not, manually select: **Next.js**

**Root Directory:**
- Leave as default: `./` (root)

**Build Command:**
- Default: `npm run build` (should work automatically)
- If issues occur, try: `npm ci && npm run build`

**Output Directory:**
- Leave as default (Next.js handles this automatically)

**Install Command:**
- Default: `npm install`
- If issues occur, try: `npm ci`

### Step 3: Environment Variables (Optional but Recommended)

Add these environment variables in Vercel dashboard under **Settings → Environment Variables**:

```
UNSPLASH_ACCESS_KEY=lDB7u4zFDvEUCFZy51zl2WyNU-q70sbw_b7wXW2L1Zo
```

**Note:** The Unsplash key is already hardcoded in the API route, but adding it as an environment variable is more secure.

**Optional (if you have Google Analytics):**
```
NEXT_PUBLIC_GA_ID=your-ga-id-here
```

**Optional (for canonical URLs):**
```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (usually 2-5 minutes)
3. Check build logs for any errors

---

## Build Configuration Details

### Next.js Configuration
- **File**: `next.config.js`
- **MDX**: Enabled with `@next/mdx`
- **Plugins**: `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
- **Page Extensions**: `['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']`

### Package.json Scripts
```json
{
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

### Dependencies
Key dependencies are listed in `package.json`. Make sure all are installed:
- Next.js 14.2.0
- React 18.3.0
- @next/mdx 14.2.0
- @mdx-js/loader, @mdx-js/react
- remark-gfm, rehype plugins
- Tailwind CSS
- TypeScript

---

## Troubleshooting Common Issues

### Issue 1: MDX Build Error
**Error**: "Expected usable value but received an empty preset"

**Solution**: ✅ Already fixed in `next.config.js`
- Changed `remarkPlugins: []` to `remarkPlugins: [require('remark-gfm')]`
- This fix is already in the repository

### Issue 2: Module Not Found Errors
**Error**: Cannot find module '@mdx-js/loader' or similar

**Solution**:
1. Ensure all dependencies are installed: `npm install`
2. Check that `package.json` includes all required packages
3. Try deleting `node_modules` and `.next` folder, then `npm install`

### Issue 3: Build Timeout
**Error**: Build exceeds timeout limit

**Solution**:
1. Check for large files in repository (already excluded `.next/` and `node_modules/`)
2. Review build logs for slow operations
3. Consider upgrading Vercel plan if needed

### Issue 4: Environment Variable Issues
**Error**: Unsplash API errors

**Solution**:
1. Verify `UNSPLASH_ACCESS_KEY` is set in Vercel environment variables
2. Check API route: `app/api/unsplash-image/route.ts`
3. Key is hardcoded as fallback, but env var is preferred

### Issue 5: Mobile Responsiveness Issues
**Error**: Layout breaks on mobile

**Solution**: ✅ Already fixed
- Mobile menu added
- Responsive classes added throughout
- Viewport meta tag configured

---

## Post-Deployment Checklist

After successful deployment:

- [ ] Test homepage loads correctly
- [ ] Test mobile menu functionality
- [ ] Test service pages
- [ ] Test location pages
- [ ] Test resource articles
- [ ] Test calculator tool (`/tools/septic-pumping-schedule`)
- [ ] Test booking page (`/book`)
- [ ] Test contact page (`/contact`)
- [ ] Verify images load correctly (Unsplash fallbacks)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Check SEO meta tags render correctly
- [ ] Verify schema markup is present

---

## Custom Domain Setup (Optional)

If you want to use a custom domain:

1. Go to **Settings → Domains** in Vercel
2. Add your domain name
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## Project Structure Overview

```
miamisepticpros/
├── app/                    # Next.js App Router
│   ├── (site)/            # Site layout group
│   │   ├── page.tsx       # Homepage
│   │   ├── services/       # Service pages
│   │   ├── locations/      # Location pages
│   │   ├── resources/      # Resource articles
│   │   ├── tools/          # Calculator tool
│   │   ├── book/           # Booking page
│   │   └── contact/        # Contact page
│   ├── api/                # API routes
│   │   └── unsplash-image/ # Image API
│   └── layout.tsx          # Root layout
├── components/              # React components
├── lib/                    # Utility functions
├── content/                # Content files
├── data/registry/          # Service/resource registries
├── styles/                 # CSS files
├── public/                 # Static assets
├── next.config.js           # Next.js config
├── package.json            # Dependencies
└── tailwind.config.ts      # Tailwind config
```

---

## Key Files to Review

1. **next.config.js** - MDX configuration (already fixed)
2. **app/layout.tsx** - Root layout with viewport meta
3. **app/(site)/layout.tsx** - Site layout with mobile menu
4. **app/api/unsplash-image/route.ts** - Image API route
5. **package.json** - Dependencies and scripts

---

## Support Information

### Deployment URL
After deployment, Vercel will provide:
- Preview URL: `https://miamisepticpros-hnu6yb2ep-lubosi-kongwas-projects.vercel.app`
- Production URL: `https://miamisepticpros.vercel.app` (or custom domain)

### Logs Location
- Build logs: Available in Vercel dashboard under **Deployments**
- Runtime logs: Available in Vercel dashboard under **Functions**

### Repository Access
- GitHub: `https://github.com/lubosik/miamisepticpros`
- Main branch: `main`

---

## Quick Start Commands

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

## Notes for Claude Code

1. **MDX Issue**: Already resolved - `remarkPlugins` now includes `remark-gfm`
2. **Mobile Menu**: Implemented as client component with useState
3. **Images**: Uses Unsplash API with fallbacks - no local images needed
4. **Environment Variables**: Optional but recommended for Unsplash key
5. **Build Command**: Default `npm run build` should work
6. **Framework**: Next.js is auto-detected by Vercel

The repository is ready for deployment. All fixes have been applied and pushed to GitHub.

---

## Contact & Support

If deployment issues occur:
1. Check Vercel build logs for specific errors
2. Verify all dependencies are installed correctly
3. Ensure Node.js version is compatible (Next.js 14 requires Node 18+)
4. Check environment variables are set correctly

---

**Document Created**: 2025-11-05
**Repository Status**: ✅ Ready for deployment
**Last Commit**: All fixes applied and pushed

