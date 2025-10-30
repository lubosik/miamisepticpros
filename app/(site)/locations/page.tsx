import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Link from 'next/link'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'
import { getAllStates, getLocationsByState } from '@/lib/content/locations'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Miami Septic Services — Pumping, Cleaning, Installs & Emergency Support',
    description: 'Headquartered in Miami, serving Miami-Dade and neighbors in Broward & Palm Beach. Licensed technicians, transparent estimates.',
    canonical: '/locations',
  })
}

export default function LocationsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // Load states and cities from JSON files
  const states = getAllStates()
  const locationsByState: Record<string, Array<{ city: string; slug: string }>> = {}
  
  states.forEach(stateCode => {
    const locations = getLocationsByState(stateCode)
    if (locations.length > 0) {
      locationsByState[stateCode] = locations.map(loc => ({
        city: loc.city,
        slug: loc.slug,
      }))
    }
  })

  // Fallback if no data loaded
  const locations = Object.keys(locationsByState).length > 0 ? locationsByState : {
    'FL': [
      { city: 'Miami', slug: 'miami' },
      { city: 'Tampa', slug: 'tampa' },
      { city: 'Orlando', slug: 'orlando' },
      { city: 'Jacksonville', slug: 'jacksonville' },
      { city: 'Fort Lauderdale', slug: 'fort-lauderdale' },
      { city: 'West Palm Beach', slug: 'west-palm-beach' },
      { city: 'Tallahassee', slug: 'tallahassee' },
      { city: 'Sarasota', slug: 'sarasota' },
    ],
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Locations', item: `${siteUrl}/locations` },
  ])

  const locationItems: Array<{ name: string; url: string }> = []
  Object.entries(locations).forEach(([stateCode, cities]) => {
    cities.forEach(city => {
      const stateName = stateCode === 'FL' ? 'Florida' : stateCode
      locationItems.push({
        name: `${city.city}, ${stateCode}`,
        url: `${siteUrl}/locations/${stateCode.toLowerCase()}/${city.slug}`,
      })
    })
  })

  const locationListSchema = generateItemListSchema(locationItems)

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={locationListSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Miami Septic Services — Pumping, Cleaning, Installs & Emergency Support
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Headquartered in Miami, serving Miami-Dade and neighbors in Broward & Palm Beach.
        </p>
        
        <div className="space-y-8">
          {Object.entries(locations).map(([stateCode, cities]) => {
            const stateName = stateCode === 'FL' ? 'Florida (FL)' : stateCode
            return (
              <div key={stateCode} className="border border-border-light rounded-md p-6">
                <h2 className="text-h3 font-serif-headings font-semibold text-charcoal mb-4">
                  <Link href={`/locations/${stateCode.toLowerCase()}`} className="hover:text-accent-green">
                    {stateName}
                  </Link>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/locations/${stateCode.toLowerCase()}/${city.slug}`}
                      className="text-body text-body-text hover:text-accent-green transition-colors"
                    >
                      {city.city}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
