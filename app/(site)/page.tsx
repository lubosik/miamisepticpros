import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import ServiceCard from '@/components/ServiceCard'
import LocationCard from '@/components/LocationCard'
import { generateBreadcrumbSchema, generateOrganizationSchema, generateItemListSchema, renderLocalBusiness } from '@/lib/seo/schemaGenerators'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

  return generateMeta({
    title: 'Miami Septic Pros — Expert Septic Services in Miami-Dade County',
    description: 'Licensed septic technicians serving Miami, Coral Gables, Kendall, Doral, and all of Miami-Dade. Professional pumping, cleaning, repairs, and installations.',
    canonical: '/',
  })
}

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

  // Services data - will be loaded from JSON in Phase 4
  const services = [
    { slug: 'septic-tank-pumping', title: 'Septic Tank Pumping', icon: '🚛', description: 'Regular removal of solid waste to prevent backups and extend system life.' }, // ✅ This slug matches registry
    { slug: 'septic-tank-cleaning', title: 'Septic Tank Cleaning', icon: '🧼', description: 'Deep cleaning to remove buildup and restore tank efficiency.' }, // ✅ This slug matches registry
    { slug: 'septic-tank-inspection', title: 'Septic Tank Inspection', icon: '🔍', description: 'Comprehensive health check to identify issues before they become costly.' }, // ✅ Fixed: was 'septic-inspection', now matches registry
    { slug: 'real-estate-septic-inspections', title: 'Real Estate Inspection', icon: '🏠', description: 'Pre-purchase septic system evaluation for home buyers.' }, // ✅ Fixed: was 'real-estate-septic-inspection', now matches registry (plural)
    { slug: 'septic-tank-replacement', title: 'Septic Tank Replacement', icon: '🔧', description: 'Expert replacement services to restore your septic system functionality.' }, // ✅ Fixed: was 'septic-tank-repair', changed to 'septic-tank-replacement' (repair doesn't exist in registry)
    { slug: 'emergency-septic-services', title: 'Emergency Septic Services', icon: '🚨', description: '24/7 emergency septic pumping when backups threaten your home.' }, // ✅ Fixed: was 'emergency-pumping', now matches registry
    { slug: 'drain-field-replacement', title: 'Drainfield Replacement', icon: '🏗️', description: 'Restore failed drainfields with professional replacement services.' }, // ✅ Fixed: was 'drainfield-repair', changed to 'drain-field-replacement' (repair doesn't exist)
    { slug: 'drain-field-installation', title: 'Drainfield Installation', icon: '🔄', description: 'Complete drainfield installation for new systems.' }, // ✅ Fixed: was 'drainfield-replacement', changed to 'drain-field-installation' (to avoid duplicate)
    { slug: 'new-septic-system-installation', title: 'New Septic System Installation', icon: '🆕', description: 'New septic system installation for residential properties.' }, // ✅ Fixed: was 'septic-installation', now matches registry
    { slug: 'septic-tank-riser-installation', title: 'Riser Installation', icon: '⬆️', description: 'Install above-ground risers for easier tank access.' }, // ✅ Fixed: was 'riser-installation', now matches registry
    { slug: 'septic-baffle-replacement', title: 'Baffle Replacement', icon: '🔀', description: 'Replace damaged or missing septic tank baffles.' }, // ✅ Fixed: was 'baffle-replacement', now matches registry
    { slug: 'septic-tank-location-service', title: 'Tank Locating', icon: '📍', description: 'Find your buried septic tank for maintenance or inspection.' }, // ✅ Fixed: was 'septic-tank-locating', now matches registry
    { slug: 'septic-tank-camera-inspections', title: 'Camera Inspection', icon: '📹', description: 'Video camera inspection to diagnose pipe and drainfield issues.' }, // ✅ Fixed: was 'camera-inspection', now matches registry
    { slug: 'lift-station-monitoring-and-service', title: 'Lift Station Service', icon: '⚙️', description: 'Maintenance and repair of sewage lift station pumps.' }, // ✅ Fixed: was 'lift-station-service', now matches registry
    { slug: 'grease-interceptor-cleaning', title: 'Grease Trap Pumping', icon: '🛢️', description: 'Commercial grease trap cleaning and maintenance.' }, // ✅ Fixed: was 'grease-trap-pumping', now matches registry
    { slug: 'septic-system-maintenance-plans', title: 'System Maintenance', icon: '🛠️', description: 'Regular maintenance plans to keep your system running smoothly.' }, // ✅ Fixed: was 'septic-system-maintenance', now matches registry
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

  // Featured guides - most broad and information-rich articles
  const featuredGuides = [
    { 
      title: 'Septic Tank Pumping Guide', 
      href: '/services/septic-tank-pumping',
      description: 'Complete guide to septic tank pumping: when to pump, costs, what to expect, and how to maintain your system.',
    },
    { 
      title: 'Septic Tank Inspection Guide', 
      href: '/services/septic-tank-inspection',
      description: 'Everything you need to know about septic inspections: costs, requirements, real estate transactions, and what inspectors check.',
    },
    { 
      title: 'Septic System Maintenance Plans', 
      href: '/services/septic-system-maintenance-plans',
      description: 'Learn about maintenance plans: benefits, costs, schedules, and how regular service prevents costly repairs.',
    },
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="mb-6">
            <p className="text-small text-accent-green font-semibold uppercase tracking-wide mb-3">Licensed & Insured</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-headings font-bold text-primary-navy mb-4 sm:mb-6 px-4 sm:px-0">
              Professional Septic Services in Miami-Dade County
            </h1>
            <p className="text-base sm:text-lg text-body-text mb-4 max-w-2xl mx-auto px-4 sm:px-0">
              Licensed septic technicians serving Miami, Coral Gables, Kendall, Doral, Hialeah, Aventura, and Homestead. Expert pumping, cleaning, repairs, and installations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8 px-4 sm:px-0">
              <a
                href="/book"
                className="w-full sm:w-auto bg-accent-green text-white px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-sans-ui font-semibold hover:bg-accent-green-hover transition-colors shadow-md text-base sm:text-lg text-center"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+13055550100"
                className="w-full sm:w-auto border-2 border-accent-green text-accent-green px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-sans-ui font-semibold hover:bg-accent-green hover:text-white transition-colors text-base sm:text-lg text-center"
              >
                Call (305) 555-0100
              </a>
            </div>
            <p className="text-small text-muted-text mt-4">Available 24/7 for emergency service</p>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-surface-light rounded-lg border border-border-light">
              <div className="text-3xl font-bold text-accent-green mb-2">25+</div>
              <p className="text-body text-body-text font-semibold">Years Experience</p>
            </div>
            <div className="text-center p-6 bg-surface-light rounded-lg border border-border-light">
              <div className="text-3xl font-bold text-accent-green mb-2">100%</div>
              <p className="text-body text-body-text font-semibold">Licensed & Insured</p>
            </div>
            <div className="text-center p-6 bg-surface-light rounded-lg border border-border-light">
              <div className="text-3xl font-bold text-accent-green mb-2">24/7</div>
              <p className="text-body text-body-text font-semibold">Emergency Service</p>
            </div>
            <div className="text-center p-6 bg-surface-light rounded-lg border border-border-light">
              <div className="text-3xl font-bold text-accent-green mb-2">Free</div>
              <p className="text-body text-body-text font-semibold">No-Pressure Quotes</p>
            </div>
          </div>
        </section>

        {/* Free Tool Promotion Section */}
        <section className="mb-12 sm:mb-20 bg-gradient-to-br from-accent-green/10 to-green-600/10 rounded-lg p-6 sm:p-12 border-2 border-accent-green/20 mx-4 sm:mx-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-accent-green text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-small font-semibold mb-3 sm:mb-4">
              🆓 FREE TOOL
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-headings font-bold text-primary-navy mb-3 sm:mb-4 px-2 sm:px-0">
              Find Out When Your Septic Tank Needs Pumping
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-body-text mb-4 sm:mb-6 max-w-2xl mx-auto px-2 sm:px-0">
              Use our free Septic Tank Pumping Schedule Calculator to determine exactly when your system needs maintenance. 
              Get instant, personalized results based on your household size and usage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="/tools/septic-pumping-schedule"
                className="w-full sm:w-auto bg-accent-green text-white px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-sans-ui font-semibold hover:bg-accent-green-hover transition-colors shadow-md text-base sm:text-lg text-center"
              >
                Use Free Calculator →
              </a>
              <p className="text-xs sm:text-small text-muted-text text-center sm:text-left">
                ✅ No signup required • ✅ Instant results • ✅ Personalized schedule
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20 bg-surface-light rounded-lg p-12">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-8 text-center">
            Why Choose Miami Septic Pros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-h4 font-semibold text-charcoal mb-3">Transparent Pricing</h3>
              <p className="text-body text-body-text">
                Upfront estimates with no hidden fees. We explain every cost before work begins.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚛</div>
              <h3 className="text-h4 font-semibold text-charcoal mb-3">Same-Day Service</h3>
              <p className="text-body text-body-text">
                Most services scheduled same day. Emergency calls responded to within hours.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-h4 font-semibold text-charcoal mb-3">Fully Guaranteed</h3>
              <p className="text-body text-body-text">
                All work backed by our satisfaction guarantee. We stand behind every job.
              </p>
            </div>
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
                className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-semibold text-charcoal mb-3 group-hover:text-accent-green transition-colors">{guide.title}</h3>
                <p className="text-body text-muted-text mb-3">{guide.description}</p>
                <p className="text-small text-accent-green font-medium">Read our comprehensive guide →</p>
              </a>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-20 bg-gradient-to-r from-accent-green to-green-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-h2 font-serif-headings font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto opacity-95">
            Get your free, no-obligation quote today. Same-day service available. No pressure, just honest estimates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="bg-white text-accent-green px-8 py-4 rounded-sm font-sans-ui font-semibold hover:bg-gray-100 transition-colors shadow-md text-lg"
            >
              Get My Free Quote
            </a>
            <a
              href="tel:+13055550100"
              className="bg-green-700 text-white px-8 py-4 rounded-sm font-sans-ui font-semibold hover:bg-green-800 transition-colors shadow-md text-lg"
            >
              Call (305) 555-0100
            </a>
          </div>
          <p className="text-small mt-6 opacity-90">
            💬 Thousands of satisfied customers across Miami-Dade County
          </p>
        </section>

        {/* Business Address Section */}
        <section className="mb-20 text-center">
          <h2 className="text-h3 font-serif-headings font-semibold text-charcoal mb-6">
            Visit Our Office
          </h2>
          <address className="text-body-lg text-body-text not-italic mb-4">
            55 SW 9th ST APT 3806<br />
            Miami, FL 33130
          </address>
          <p className="text-small text-muted-text">
            Licensed & Insured Septic Service Company
          </p>
        </section>
      </div>
    </>
  )
}
