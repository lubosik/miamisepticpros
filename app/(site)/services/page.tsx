import { Suspense } from 'react'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'
import { getAllServices } from '@/lib/content/registry'
import ServiceFilters from '@/components/ServiceFilters.client'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  return generateMeta({
    title: 'Septic Services | Pumping, Cleaning, Inspection & More',
    description: 'Browse all septic services: pumping, cleaning, inspection, repair, drainfield work, emergency service, and more. Find the right service for your needs.',
    canonical: '/services',
  })
}

export default function ServicesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // Load all services from registry
  const services = getAllServices()

  const serviceListSchema = generateItemListSchema(
    services.map(s => ({
      name: s.name,
      url: `${siteUrl}${s.slug}`
    }))
  )

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Services', item: `${siteUrl}/services` },
  ])

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={serviceListSchema} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic Services
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Browse all septic services: pumping, cleaning, inspection, repair, drainfield work, emergency service, and more. Our licensed technicians handle your service.
        </p>

        <Suspense fallback={<div>Loading services...</div>}>
          <ServiceFilters services={services} />
        </Suspense>
      </div>
    </>
  )
}
