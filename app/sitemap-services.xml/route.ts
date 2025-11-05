import { NextResponse } from 'next/server'
import { getAllServices } from '@/lib/content/registry'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const services = getAllServices()
  
  const baseDate = new Date().toISOString()
  
  const urls = [
    // Services hub page
    `  <url>
    <loc>${siteUrl}/services</loc>
    <lastmod>${baseDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    // Service detail pages
    ...services.map(service => `  <url>
    <loc>${siteUrl}${service.slug}</loc>
    <lastmod>${service.updated || baseDate}</lastmod>
    <changefreq>monthly</changefreq>
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

