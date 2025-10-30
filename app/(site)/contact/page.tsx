import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import { generateBreadcrumbSchema, renderLocalBusiness } from '@/lib/seo/schemaGenerators'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

  return generateMeta({
    title: 'Contact Miami Septic Pros — Get Your Free Quote Today',
    description: 'Reach out to our licensed septic service team in Miami-Dade County. Call us for immediate assistance or request a free estimate online.',
    canonical: '/contact/',
  })
}

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

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
            Contact Miami Septic Pros
          </h1>
          <p className="text-body-lg text-body-text max-w-2xl mx-auto">
            We're here to help with all your septic service needs. Reach out today for fast, reliable service across Miami-Dade County.
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
                    href="tel:+13055550100"
                    className="text-body-lg text-accent-green hover:text-accent-green-hover"
                  >
                    +1 (305) 555-0100
                  </a>
                  <p className="text-small text-muted-text mt-1">
                    Available Monday-Saturday 8am-6pm, Sunday 9am-3pm
                  </p>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Email</h3>
                  <a
                    href="mailto:info@miamisepticpros.com"
                    className="text-body text-accent-green hover:text-accent-green-hover"
                  >
                    info@miamisepticpros.com
                  </a>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Address</h3>
                  <p className="text-body text-body-text">
                    55 SW 9th ST APT 3806<br />
                    Miami, FL 33130
                  </p>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Service Area</h3>
                  <p className="text-body text-body-text">
                    Miami-Dade County
                  </p>
                  <p className="text-small text-muted-text mt-1">
                    Serving Miami, Coral Gables, Kendall, Doral, Hialeah, Aventura, Homestead, and surrounding areas
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
                src="https://www.google.com/maps?q=55+SW+9th+ST+APT+3806+Miami+FL+33130&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Miami Septic Pros Location"
              />
            </div>
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
            href="tel:+13055550100"
            className="inline-block bg-primary-navy text-white px-8 py-4 rounded-sm font-sans-ui font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            Call +1 (305) 555-0100 for Emergency Service
          </a>
        </section>
      </div>
    </>
  )
}
