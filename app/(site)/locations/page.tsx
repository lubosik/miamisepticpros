import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Link from 'next/link'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'
import { getAllStates, getLocationsByState } from '@/lib/content/locations'
import LocationImage from '@/components/LocationImage.client'

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
  const locationsByState: Record<string, Array<{ city: string; slug: string; county?: string; coordinates?: { latitude: number; longitude: number } }>> = {}
  
  states.forEach(stateCode => {
    const locations = getLocationsByState(stateCode)
    if (locations.length > 0) {
      locationsByState[stateCode] = locations.map(loc => ({
        city: loc.city,
        slug: loc.slug,
        county: loc.county,
        coordinates: loc.coordinates,
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
              <div key={stateCode}>
                <h2 className="text-h3 font-serif-headings font-semibold text-charcoal mb-6">
                  <Link href={`/locations/${stateCode.toLowerCase()}`} className="hover:text-accent-green">
                    {stateName}
                  </Link>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cities.map((city) => {
                    const imagePath = `/images/locations/${city.slug}.jpg`
                    return (
                      <Link
                        key={city.slug}
                        href={`/locations/${stateCode.toLowerCase()}/${city.slug}`}
                        className="group block bg-white border border-border-light rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                      >
                        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                          <LocationImage
                            src={imagePath}
                            alt={`${city.city}, ${stateCode}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            coordinates={city.coordinates}
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-semibold text-charcoal mb-1 group-hover:text-accent-green transition-colors">
                            {city.city}
                          </h3>
                          {city.county && (
                            <p className="text-sm text-muted-text">{city.county}</p>
                          )}
                          <p className="text-sm text-accent-green font-medium mt-2">View Services →</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
