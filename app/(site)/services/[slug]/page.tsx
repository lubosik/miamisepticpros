import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import CheckatradeArticleLayout from '@/components/layouts/CheckatradeArticleLayout'
import { getService } from '@/lib/content/registry'
import { extractTOC } from '@/lib/content'
import { insertCTAsIntoHtml } from '@/lib/insertCtas'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'

const contentDirectory = path.join(process.cwd(), 'pages/miami/services')

// CTA HTML strings (server-side injection)
const CTA1_HTML = `
<section class="my-10 rounded-xl border bg-white p-5 shadow-sm">
  <h3 class="text-xl font-bold">Need help today?</h3>
  <p class="mt-2 text-gray-700">Same-day service across Miami-Dade. Licensed &amp; insured.</p>
  <a class="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700" href="tel:+13055550100">
    Call Miami Septic Pros
  </a>
</section>
`

const CTA2_HTML = `
<section class="my-10 rounded-xl border bg-white p-5 shadow-sm">
  <h3 class="text-xl font-bold">Get a clear, no-pressure quote</h3>
  <p class="mt-2 text-gray-700">Describe your job. We&apos;ll confirm price and schedule.</p>
  <a class="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700" href="/book">
    Get My Free Quote
  </a>
</section>
`

export async function generateStaticParams() {
  try {
    const { getAllServices } = await import('@/lib/content/registry')
    const services = getAllServices()
    const params = services.map((service) => ({
      slug: service.key,
    }))
    console.log(`[generateStaticParams] Generated ${params.length} service params`)
    return params
  } catch (error) {
    console.error('[generateStaticParams] Error:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  const filePath = path.join(contentDirectory, params.slug, 'index.html')
  let frontMatter: Record<string, any> = {}
  
  if (fs.existsSync(filePath)) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const parsed = matter(fileContents)
      frontMatter = parsed.data || {}
    } catch (error) {
      // Continue without front matter
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const title = frontMatter.title?.replace(/\s*\|\s*Miami Septic Pros\s*$/i, '').trim() || service.name
  
  return generateMeta({
    title: `${title} | Miami Septic Pros`,
    description: frontMatter.meta_description || service.summary,
    canonical: service.slug,
    ogImage: frontMatter.og_image || service.hero,
    ogType: 'article',
  })
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  
  if (!service) {
    console.error(`[ServiceDetailPage] Service not found for slug: ${params.slug}`)
    notFound()
  }

  const filePath = path.join(contentDirectory, params.slug, 'index.html')
  
  if (!fs.existsSync(filePath)) {
    console.error(`[ServiceDetailPage] File not found: ${filePath}`)
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data: frontMatter, content: rawContent } = matter(fileContents)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  // Extract title without "| Miami Septic Pros"
  const title = (frontMatter.title || service.name)
    .replace(/\s*\|\s*Miami Septic Pros\s*$/i, '')
    .trim()

  // Extract subtitle (first paragraph or meta_description)
  const subtitle = frontMatter.meta_description || rawContent.match(/<p[^>]*>(.*?)<\/p>/)?.[1]?.replace(/<[^>]+>/g, '').substring(0, 150) || ''

  // Format updated date
  const updated = frontMatter.updated || frontMatter.published || service.updated
  const formattedDate = updated ? new Date(updated).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : undefined

  // Extract ToC from HTML (h2-h4 with IDs)
  const tocItems = extractTOC(rawContent)

  // Remove the first h1 from content if it exists (since layout already shows title)
  const contentWithoutH1 = rawContent.replace(/<h1[^>]*>.*?<\/h1>/i, '').trim()

  // Inject CTAs server-side
  const contentWithCTAs = insertCTAsIntoHtml(contentWithoutH1, CTA1_HTML, CTA2_HTML)

  // Generate JSON-LD schemas
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: frontMatter.meta_description || service.summary,
    url: `${siteUrl}${service.slug}`,
    serviceType: service.name,
    areaServed: [
      { '@type': 'City', name: 'Miami', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Miami Beach', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Coral Gables', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Hialeah', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Homestead', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'County', name: 'Miami-Dade County', containedIn: { '@type': 'State', name: 'Florida' } },
    ],
  })

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Miami Septic Pros',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '55 SW 9th ST APT 3806',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33130',
      addressCountry: 'US',
    },
    telephone: '+13055550100',
    areaServed: {
      '@type': 'County',
      name: 'Miami-Dade County',
      containedIn: {
        '@type': 'State',
        name: 'Florida',
      },
    },
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Services', item: `${siteUrl}/services` },
    { name: service.name, item: `${siteUrl}${service.slug}` },
  ])

  return (
    <>
      <SchemaJSON schema={serviceSchema} />
      <SchemaJSON schema={localBusinessSchema} />
      <SchemaJSON schema={breadcrumbSchema} />

      <CheckatradeArticleLayout
        title={title}
        subtitle={subtitle}
        updated={formattedDate}
        heroSrc={frontMatter.og_image || service.hero}
        tocItems={tocItems}
      >
        <div dangerouslySetInnerHTML={{ __html: contentWithCTAs }} />
      </CheckatradeArticleLayout>
    </>
  )
}
