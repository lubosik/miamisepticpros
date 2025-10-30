import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import { generateBreadcrumbSchema, renderLocalBusiness } from '@/lib/seo/schemaGenerators'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  return generateMeta({
    title: 'Contact Us — Septic Pros Miami | Get Your Free Quote',
    description: 'Reach out to our licensed septic service team in Miami. Call us for immediate assistance or fill out our contact form for a free estimate.',
    canonical: '/contact/',
  })
}

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  const localBusinessSchema = renderLocalBusiness()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Contact', item: `${siteUrl}/contact/` },
  ])

  return (
    <>
      <SchemaJSON schema={localBusinessSchema} />
      <SchemaJSON schema={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Header */}
        <section className="text-center mb-12">
          <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
            Contact Septic Pros Miami
          </h1>
          <p className="text-body-lg text-body-text max-w-2xl mx-auto">
            We're here to help with all your septic service needs. Reach out today for fast, reliable service across Miami-Dade and neighboring counties.
          </p>
        </section>

        {/* Contact Information & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <section className="space-y-6">
            <div>
              <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Phone</h3>
                  <a
                    href="tel:"
                    className="text-body-lg text-accent-green hover:text-accent-green-hover"
                  >
                    [Phone Number TBD]
                  </a>
                  <p className="text-small text-muted-text mt-1">
                    Available Monday-Saturday 8am-6pm, Sunday 9am-3pm
                  </p>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Email</h3>
                  <a
                    href="mailto:"
                    className="text-body text-accent-green hover:text-accent-green-hover"
                  >
                    [Email TBD]
                  </a>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Service Area</h3>
                  <p className="text-body text-body-text">
                    Miami-Dade County, Broward County, and Palm Beach County
                  </p>
                  <p className="text-small text-muted-text mt-1">
                    Serving Miami, Miami Beach, Coral Gables, Hialeah, Doral, Homestead, and surrounding areas
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-border-light">
              <h3 className="text-h4 font-semibold text-charcoal mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/quote"
                  className="block w-full bg-accent-green text-white text-center px-6 py-3 rounded-sm font-sans-ui font-semibold hover:bg-accent-green-hover transition-colors shadow-md"
                >
                  Request a Free Quote
                </a>
                <a
                  href="/services"
                  className="block w-full bg-surface-white border border-border-default text-charcoal text-center px-6 py-3 rounded-sm font-sans-ui font-semibold hover:border-accent-green transition-colors"
                >
                  View Our Services
                </a>
              </div>
            </div>
          </section>

          {/* Map Embed */}
          <section>
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Our Location
            </h2>
            <div className="rounded-md overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps?q=Miami,FL&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Septic Pros Miami Location"
              />
            </div>
            <p className="text-small text-muted-text mt-2">
              Map placeholder - will be updated with exact address once NAP is finalized
            </p>
          </section>
        </div>

        {/* Emergency Service Banner */}
        <section className="bg-surface-light border border-border-light rounded-md p-8 text-center">
          <h2 className="text-h3 font-serif-headings font-semibold text-charcoal mb-4">
            Need Emergency Service?
          </h2>
          <p className="text-body text-body-text mb-6 max-w-2xl mx-auto">
            We offer 24/7 emergency septic service for urgent situations like backups, overflows, and system failures. Call us now for immediate assistance.
          </p>
          <a
            href="tel:"
            className="inline-block bg-primary-navy text-white px-8 py-4 rounded-sm font-sans-ui font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            Call for Emergency Service
          </a>
        </section>
      </div>
    </>
  )
}
