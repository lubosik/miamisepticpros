import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import ServiceCard from '@/components/ServiceCard'
import LocationCard from '@/components/LocationCard'
import { generateBreadcrumbSchema, generateOrganizationSchema, generateItemListSchema, renderLocalBusiness } from '@/lib/seo/schemaGenerators'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Miami Septic Services — Pumping, Cleaning, Installs & Emergency Support | SepticTankQuoteHub',
    description: 'Our licensed technicians serve Miami-Dade and neighboring areas. Get clear, upfront estimates for pumping, cleaning, inspection, repair, and more.',
    canonical: '/',
  })
}

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // Services data - will be loaded from JSON in Phase 4
  const services = [
    { slug: 'septic-tank-pumping', title: 'Septic Tank Pumping', icon: '🚛', description: 'Regular removal of solid waste to prevent backups and extend system life.' },
    { slug: 'septic-tank-cleaning', title: 'Septic Tank Cleaning', icon: '🧼', description: 'Deep cleaning to remove buildup and restore tank efficiency.' },
    { slug: 'septic-inspection', title: 'Septic Inspection', icon: '🔍', description: 'Comprehensive health check to identify issues before they become costly.' },
    { slug: 'real-estate-septic-inspection', title: 'Real Estate Inspection', icon: '🏠', description: 'Pre-purchase septic system evaluation for home buyers.' },
    { slug: 'septic-tank-repair', title: 'Septic Tank Repair', icon: '🔧', description: 'Expert repair services to restore your septic system functionality.' },
    { slug: 'emergency-pumping', title: 'Emergency Pumping', icon: '🚨', description: '24/7 emergency septic pumping when backups threaten your home.' },
    { slug: 'drainfield-repair', title: 'Drainfield Repair', icon: '🏗️', description: 'Restore failed drainfields with professional repair services.' },
    { slug: 'drainfield-replacement', title: 'Drainfield Replacement', icon: '🔄', description: 'Complete drainfield replacement for severely damaged systems.' },
    { slug: 'septic-installation', title: 'Septic Installation', icon: '🆕', description: 'New septic system installation for residential properties.' },
    { slug: 'riser-installation', title: 'Riser Installation', icon: '⬆️', description: 'Install above-ground risers for easier tank access.' },
    { slug: 'baffle-replacement', title: 'Baffle Replacement', icon: '🔀', description: 'Replace damaged or missing septic tank baffles.' },
    { slug: 'septic-tank-locating', title: 'Tank Locating', icon: '📍', description: 'Find your buried septic tank for maintenance or inspection.' },
    { slug: 'camera-inspection', title: 'Camera Inspection', icon: '📹', description: 'Video camera inspection to diagnose pipe and drainfield issues.' },
    { slug: 'lift-station-service', title: 'Lift Station Service', icon: '⚙️', description: 'Maintenance and repair of sewage lift station pumps.' },
    { slug: 'grease-trap-pumping', title: 'Grease Trap Pumping', icon: '🛢️', description: 'Commercial grease trap cleaning and maintenance.' },
    { slug: 'septic-system-maintenance', title: 'System Maintenance', icon: '🛠️', description: 'Regular maintenance plans to keep your system running smoothly.' },
  ]

  // Top locations - hardcoded for Phase 3
  const locations = [
    { city: 'Miami', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'miami' },
    { city: 'Tampa', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'tampa' },
    { city: 'Orlando', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'orlando' },
    { city: 'Jacksonville', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'jacksonville' },
    { city: 'Fort Lauderdale', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'fort-lauderdale' },
    { city: 'West Palm Beach', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'west-palm-beach' },
    { city: 'Tallahassee', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'tallahassee' },
    { city: 'Sarasota', state: 'Florida', stateCode: 'FL', serviceCount: 16, slug: 'sarasota' },
  ]

  // Featured guides - will link to actual articles
  const featuredGuides = [
            { title: 'Septic Tank Pumping Guide', href: '/resources/septic-tank-pumping/fl-miami' },
    { title: 'Septic Inspection Checklist', href: '/resources/septic-inspection/fl-tampa' },
    { title: 'Emergency Pumping: When to Call', href: '/resources/emergency-pumping/fl-miami' },
  ]

  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = renderLocalBusiness() // Using renderLocalBusiness from localbusiness.json
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
  ])
  const serviceListSchema = generateItemListSchema(
    services.map(s => ({ name: s.title, url: `${siteUrl}/services/${s.slug}` }))
  )

  return (
    <>
      <SchemaJSON schema={organizationSchema} />
      <SchemaJSON schema={localBusinessSchema} />
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={serviceListSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
            Miami Septic Services — Pumping, Cleaning, Installs & Emergency Support
          </h1>
          <p className="text-body-lg text-body-text mb-8 max-w-2xl mx-auto">
            Licensed technicians, rapid scheduling, and transparent estimates. Serving Miami-Dade and nearby Broward & Palm Beach.
          </p>
          {/* Search placeholder - non-functional for now */}
          <div className="max-w-xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your city or ZIP code"
                className="flex-1 px-4 py-3 border border-border-default rounded-sm text-body"
                disabled
              />
              <button
                className="bg-accent-green text-white px-8 py-3 rounded-sm font-sans-ui font-semibold hover:bg-accent-green-hover transition-colors shadow-md"
                disabled
              >
                Search
              </button>
            </div>
            <p className="text-small text-muted-text mt-3">Search functionality coming soon</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-20">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-8 text-center">
            Our Septic Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                icon={service.icon}
                description={service.description}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </section>

        {/* Locations Grid */}
        <section className="mb-20">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-8 text-center">
            Popular Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location) => (
              <LocationCard
                key={`${location.stateCode}-${location.slug}`}
                city={location.city}
                state={location.stateCode}
                serviceCount={location.serviceCount}
                href={`/locations/${location.stateCode.toLowerCase()}/${location.slug}`}
              />
            ))}
          </div>
        </section>

        {/* Featured Guides */}
        <section className="mb-20">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-8 text-center">
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredGuides.map((guide, idx) => (
              <a
                key={idx}
                href={guide.href}
                className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-charcoal mb-2">{guide.title}</h3>
                <p className="text-small text-muted-text">Read our comprehensive guide →</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
