import { NextResponse } from 'next/server'
import { getAllResources } from '@/lib/content/registry'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const resources = getAllResources()
  
  const baseDate = new Date().toISOString()
  
  const urls = [
    // Resources hub page
    `  <url>
    <loc>${siteUrl}/resources</loc>
    <lastmod>${baseDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    // Resource detail pages
    ...resources.map(resource => `  <url>
    <loc>${siteUrl}${resource.slug}</loc>
    <lastmod>${resource.updated || baseDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`),
  ]
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
  
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

