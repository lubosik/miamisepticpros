import { notFound } from 'next/navigation'
import { getLocation, getAllLocations } from '@/lib/content/locations'
import { getAllServices } from '@/lib/content/registry'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'

export async function generateStaticParams() {
  const locations = getAllLocations()
  return locations.map((loc) => ({
    state: loc.stateCode.toLowerCase(),
    city: loc.citySlug,
  }))
}

export async function generateMetadata({ params }: { params: { state: string; city: string } }) {
  const location = getLocation(params.state.toUpperCase(), params.city)
  
  if (!location) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/locations/${params.state}/${params.city}`

  return generateMeta({
    title: `Septic Services in ${location.city}, ${location.stateCode} | Pumping, Cleaning & More`,
    description: location.metaDescription || `Our licensed technicians serve ${location.city}, ${location.stateCode}. Upfront estimates for pumping, inspection, repair, drainfield work, and emergency service.`,
    canonical,
  })
}

export default function CityPage({ params }: { params: { state: string; city: string } }) {
  const location = getLocation(params.state.toUpperCase(), params.city)

  if (!location) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/locations/${params.state}/${params.city}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: location.state, href: `/locations/${params.state}` },
    { label: location.city, href: canonical },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  // Get services available in this city
  const allServices = getAllServices()
  const availableServices = location.availableServices
    ? allServices.filter(s => location.availableServices!.includes(s.key))
    : allServices

  const serviceListSchema = generateItemListSchema(
    availableServices.map(s => ({
      name: s.name,
      url: `${siteUrl}${s.slug}`,
    }))
  )

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={serviceListSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic Services in {location.city}, {location.stateCode}
        </h1>
        {location.county && (
          <p className="text-body-lg text-muted-text mb-4">{location.county}</p>
        )}

        <div className="mb-12">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
            Available Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableServices.map((service) => (
              <ServiceCard
                key={service.key}
                title={service.name}
                description={service.summary}
                href={service.slug}
              />
            ))}
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
            Related Articles
          </h2>
          {availableServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableServices.slice(0, 6).map((service) => (
                <Link
                  key={service.key}
                  href={service.slug}
                  className="block p-4 border border-border-light rounded-lg hover:border-accent-green hover:shadow-md transition-all group"
                >
                  <h3 className="text-lg font-semibold text-primary-navy mb-1 group-hover:text-accent-green transition-colors">
                    {service.name} in {location.city}
                  </h3>
                  <p className="text-sm text-muted-text line-clamp-2">{service.summary.substring(0, 100)}...</p>
                  <p className="text-xs text-accent-green font-medium mt-2">Read Article →</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-body text-muted-text">
              Articles for {location.city}, {location.stateCode} coming soon.
            </p>
          )}
        </section>
      </div>
    </>
  )
}
