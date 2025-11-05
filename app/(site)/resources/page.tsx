import { Suspense } from 'react'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'
import { getAllResources, getAllServices } from '@/lib/content/registry'
import ResourceFilters from '@/components/ResourceFilters.client'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  return generateMeta({
    title: 'Septic Service Resources & Guides | Miami Septic Pros',
    description: 'Browse comprehensive guides and resources for septic services in Miami-Dade County. Learn about pumping, cleaning, repairs, and more.',
    canonical: '/resources',
  })
}

export default function ResourcesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const resources = getAllResources()
  const services = getAllServices()

  const resourceListSchema = generateItemListSchema(
    resources.map(r => ({
      name: r.title,
      url: `${siteUrl}${r.slug}`
    }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Resources', item: `${siteUrl}/resources` },
  ])

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={resourceListSchema} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic Service Resources
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Comprehensive guides and resources for septic services in Miami-Dade County. Learn about pumping, cleaning, repairs, installations, and more.
        </p>

        <Suspense fallback={<div>Loading resources...</div>}>
          <ResourceFilters resources={resources} services={services} />
        </Suspense>
      </div>
    </>
  )
}
