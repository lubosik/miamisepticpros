import { notFound } from 'next/navigation'
import { getLocationsByState, getAllStates } from '@/lib/content/locations'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import LocationCard from '@/components/LocationCard'
import Link from 'next/link'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'

export async function generateStaticParams() {
  const states = getAllStates()
  return states.map((state) => ({
    state: state.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: { params: { state: string } }) {
  const stateCode = params.state.toUpperCase()
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/locations/${params.state}`

  return generateMeta({
    title: `Septic Services in ${stateCode === 'FL' ? 'Florida' : stateCode} | Pumping, Cleaning, Inspection & More`,
    description: `Our licensed technicians serve ${stateCode === 'FL' ? 'Florida' : stateCode}. Get upfront estimates for pumping, inspection, repair, and more.`,
    canonical,
  })
}

export default function StatePage({ params }: { params: { state: string } }) {
  const stateCode = params.state.toUpperCase()
  const locations = getLocationsByState(stateCode)

  if (locations.length === 0) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const stateName = stateCode === 'FL' ? 'Florida' : stateCode
  const canonical = `/locations/${params.state}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: stateName, href: canonical },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  const locationListSchema = generateItemListSchema(
    locations.map(loc => ({
      name: `${loc.city}, ${loc.stateCode}`,
      url: `${siteUrl}/locations/${loc.stateCode.toLowerCase()}/${loc.slug}`,
    }))
  )

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={locationListSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic Services in {stateName}
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Our licensed technicians serve {stateName}. Get upfront estimates for pumping, inspection, repair, and more.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <LocationCard
              key={location.slug}
              city={location.city}
              state={location.stateCode}
              serviceCount={location.availableServices?.length || 16}
              href={`/locations/${location.stateCode.toLowerCase()}/${location.slug}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
