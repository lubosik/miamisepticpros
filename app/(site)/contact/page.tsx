import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import { generateBreadcrumbSchema, renderLocalBusiness } from '@/lib/seo/schemaGenerators'
import Link from 'next/link'
import ContactForm from '@/components/forms/ContactForm'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

  return generateMeta({
    title: 'Contact Miami Septic Pros — Get Your Free Quote Today',
    description: 'Reach out to our licensed septic service team in Miami-Dade County. Call us for immediate assistance or request a free estimate online.',
    canonical: '/contact',
  })
}

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

  const localBusinessSchema = renderLocalBusiness()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Contact', item: `${siteUrl}/contact` },
  ])

  return (
    <>
      <SchemaJSON schema={localBusinessSchema} />
      <SchemaJSON schema={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Header with Prominent Phone */}
        <section className="text-center mb-12">
          <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
            Contact Miami Septic Pros
          </h1>
          <p className="text-body-lg text-body-text max-w-2xl mx-auto mb-8">
            We&apos;re here to help with all your septic service needs. Reach out today for fast, reliable service across Miami-Dade County.
          </p>
          
          {/* Prominent Phone Number */}
          <div className="bg-accent-green text-white rounded-lg p-8 max-w-md mx-auto mb-8">
            <p className="text-small uppercase tracking-wide mb-2 opacity-90">Call Us Now</p>
            <a
              href="tel:+13055550100"
              className="text-3xl font-bold hover:opacity-90 transition-opacity block"
            >
              (305) 555-0100
            </a>
            <p className="text-small mt-2 opacity-90">Available 24/7 for Emergency Service</p>
          </div>
        </section>

        {/* Contact Information & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <section className="space-y-6">
            <div>
              <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Phone</h3>
                  <a
                    href="tel:+13055550100"
                    className="text-body-lg text-accent-green hover:text-accent-green-hover font-semibold"
                  >
                    +1 (305) 555-0100
                  </a>
                  <p className="text-small text-muted-text mt-1">
                    Available Monday-Saturday 8am-6pm, Sunday 9am-3pm
                  </p>
                  <p className="text-small text-accent-green font-semibold mt-1">
                    24/7 Emergency Service Available
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
                  <p className="text-small text-muted-text mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Office Address</h3>
                  <address className="text-body text-body-text not-italic">
                    55 SW 9th ST APT 3806<br />
                    Miami, FL 33130
                  </address>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Service Area</h3>
                  <p className="text-body text-body-text font-semibold mb-2">
                    Miami-Dade County
                  </p>
                  <p className="text-body text-body-text">
                    Serving Miami, Coral Gables, Kendall, Doral, Hialeah, Aventura, Homestead, and surrounding areas
                  </p>
                </div>

                <div>
                  <h3 className="text-h4 font-semibold text-charcoal mb-2">Licensed & Insured</h3>
                  <p className="text-body text-body-text">
                    All technicians are fully licensed and insured. We carry comprehensive liability insurance for your protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-border-light">
              <h3 className="text-h4 font-semibold text-charcoal mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/book"
                  className="block w-full bg-accent-green text-white text-center px-6 py-3 rounded-sm font-sans-ui font-semibold hover:bg-accent-green-hover transition-colors shadow-md"
                >
                  Request a Free Quote
                </Link>
                <Link
                  href="/services"
                  className="block w-full bg-surface-white border border-border-default text-charcoal text-center px-6 py-3 rounded-sm font-sans-ui font-semibold hover:border-accent-green transition-colors"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </section>

          {/* Map Embed */}
          <section>
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Our Location
            </h2>
            <div className="rounded-md overflow-hidden shadow-md mb-6">
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
            <div className="bg-surface-light rounded-md p-4">
              <p className="text-small text-body-text">
                <strong>Directions:</strong> We&apos;re located in downtown Miami. Parking available nearby. Please call ahead for office visits.
              </p>
            </div>
          </section>
        </div>

        {/* Contact Form Section */}
        <section className="mb-16">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6 text-center">
            Send Us a Message
          </h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>

        {/* Emergency Service Banner */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-h3 font-serif-headings font-semibold mb-4">
            Need Emergency Service?
          </h2>
          <p className="text-body-lg mb-6 max-w-2xl mx-auto opacity-95">
            We offer 24/7 emergency septic service for urgent situations like backups, overflows, and system failures. Call us now for immediate assistance.
          </p>
          <a
            href="tel:+13055550100"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-sm font-sans-ui font-semibold hover:bg-gray-100 transition-colors shadow-md text-lg"
          >
            Call (305) 555-0100 for Emergency Service
          </a>
        </section>
      </div>
    </>
  )
}
