import localBusinessData from '../../ops/schema/localbusiness.json'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const phone = localBusinessData.telephone || ''
  const serviceArea = `${localBusinessData.address.addressLocality}, ${localBusinessData.address.addressRegion}`

  return (
    <div className="min-h-screen bg-surface-white">
      {/* Header with Phone & Service Area */}
      <header className="border-b border-border-light">
        {/* Top Bar - Phone & Service Area */}
        <div className="bg-surface-light border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex flex-wrap items-center justify-between text-small">
              <div className="flex items-center gap-4">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="text-accent-green hover:text-accent-green-hover font-semibold"
                  >
                    {phone}
                  </a>
                )}
                <span className="text-muted-text">|</span>
                <span className="text-muted-text">
                  Serving {serviceArea} & Surrounding Areas
                </span>
              </div>
              <a
                href="/contact"
                className="text-body-text hover:text-accent-green"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-xl font-semibold text-primary-navy">
              {localBusinessData.name}
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="/services" className="text-body-text hover:text-accent-green">Services</a>
              <a href="/locations" className="text-body-text hover:text-accent-green">Locations</a>
              <a href="/resources" className="text-body-text hover:text-accent-green">Resources</a>
              <a href="/contact" className="text-body-text hover:text-accent-green">Contact</a>
              <a href="/quote" className="bg-accent-green text-white px-4 py-2 rounded-sm hover:bg-accent-green-hover font-semibold">
                Get Free Quote
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer with Phone, Service Area & Links */}
      <footer className="border-t border-border-light mt-20 py-12 bg-surface-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-h4 font-serif-headings font-semibold text-charcoal mb-4">
                {localBusinessData.name}
              </h3>
              <p className="text-body text-body-text mb-4">
                Licensed septic service company serving Miami-Dade, Broward, and Palm Beach Counties. Professional pumping, cleaning, installation, and repairs.
              </p>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-block text-body text-accent-green hover:text-accent-green-hover font-semibold"
                >
                  {phone}
                </a>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-h5 font-semibold text-charcoal mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/services" className="text-body text-body-text hover:text-accent-green">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="/locations" className="text-body text-body-text hover:text-accent-green">
                    Service Areas
                  </a>
                </li>
                <li>
                  <a href="/resources" className="text-body text-body-text hover:text-accent-green">
                    Resources & Guides
                  </a>
                </li>
                <li>
                  <a href="/quote" className="text-body text-body-text hover:text-accent-green">
                    Get a Quote
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-body text-body-text hover:text-accent-green">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Service Area */}
            <div>
              <h4 className="text-h5 font-semibold text-charcoal mb-4">Service Area</h4>
              <p className="text-body text-body-text mb-2">
                {serviceArea} and surrounding communities
              </p>
              <ul className="text-small text-muted-text space-y-1">
                <li>Miami-Dade County</li>
                <li>Broward County</li>
                <li>Palm Beach County</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border-light text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-small">
              <a href="/privacy" className="text-muted-text hover:text-accent-green">
                Privacy Policy
              </a>
              <span className="text-muted-text">|</span>
              <a href="/terms" className="text-muted-text hover:text-accent-green">
                Terms of Service
              </a>
            </div>
            <p className="text-small text-muted-text">
              &copy; {new Date().getFullYear()} {localBusinessData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

