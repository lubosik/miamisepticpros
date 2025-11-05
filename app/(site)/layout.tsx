'use client'

import { useState } from 'react'
import localBusinessData from '../../ops/schema/localbusiness.json'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="text-accent-green hover:text-accent-green-hover font-semibold text-sm sm:text-base"
                  >
                    {phone}
                  </a>
                )}
                <span className="hidden sm:inline text-muted-text">|</span>
                <span className="text-muted-text text-xs sm:text-small">
                  Serving {serviceArea} & Surrounding Areas
                </span>
              </div>
              <a
                href="/book"
                className="text-body-text hover:text-accent-green text-sm sm:text-base"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-lg sm:text-xl font-semibold text-primary-navy">
              {localBusinessData.name}
            </a>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/services" className="text-body-text hover:text-accent-green">Services</a>
              <a href="/locations" className="text-body-text hover:text-accent-green">Locations</a>
              <a href="/resources" className="text-body-text hover:text-accent-green">Resources</a>
              <a href="/tools/septic-pumping-schedule" className="text-body-text hover:text-accent-green">Free Tools</a>
              <a href="/book" className="text-body-text hover:text-accent-green">Contact</a>
              <a href="/book" className="bg-accent-green text-white px-4 py-2 rounded-sm hover:bg-accent-green-hover font-semibold">
                Get Free Quote
              </a>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary-navy hover:text-accent-green"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border-light">
              <div className="flex flex-col gap-4 pt-4">
                <a href="/services" className="text-body-text hover:text-accent-green py-2">Services</a>
                <a href="/locations" className="text-body-text hover:text-accent-green py-2">Locations</a>
                <a href="/resources" className="text-body-text hover:text-accent-green py-2">Resources</a>
                <a href="/tools/septic-pumping-schedule" className="text-body-text hover:text-accent-green py-2">Free Tools</a>
                <a href="/book" className="text-body-text hover:text-accent-green py-2">Contact</a>
                <a href="/book" className="bg-accent-green text-white px-4 py-2 rounded-sm hover:bg-accent-green-hover font-semibold text-center">
                  Get Free Quote
                </a>
              </div>
            </div>
          )}
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
              <p className="text-body text-body-text mb-4 text-sm sm:text-base">
                Licensed septic service company serving Miami-Dade County. Professional pumping, cleaning, installation, and repairs for Miami, Coral Gables, Kendall, Doral, Hialeah, Aventura, and Homestead.
              </p>
              <address className="text-body text-body-text mb-4 not-italic text-sm sm:text-base">
                55 SW 9th ST APT 3806<br />
                Miami, FL 33130
              </address>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-block text-body text-accent-green hover:text-accent-green-hover font-semibold text-sm sm:text-base"
                >
                  {phone}
                </a>
              )}
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-h5 font-semibold text-charcoal mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/services" className="text-body text-body-text hover:text-accent-green text-sm sm:text-base">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/resources" className="text-body text-body-text hover:text-accent-green text-sm sm:text-base">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="/locations" className="text-body text-body-text hover:text-accent-green text-sm sm:text-base">
                    Service Areas
                  </a>
                </li>
                <li>
                  <a href="/book" className="text-body text-body-text hover:text-accent-green text-sm sm:text-base">
                    Get a Quote
                  </a>
                </li>
                <li>
                  <a href="/book" className="text-body text-body-text hover:text-accent-green text-sm sm:text-base">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Service Area */}
            <div>
              <h4 className="text-h5 font-semibold text-charcoal mb-4">Service Area</h4>
              <p className="text-body text-body-text mb-2 text-sm sm:text-base">
                {serviceArea} and surrounding communities
              </p>
              <ul className="text-small text-muted-text space-y-1">
                <li>Miami</li>
                <li>Coral Gables</li>
                <li>Kendall</li>
                <li>Doral</li>
                <li>Hialeah</li>
                <li>Aventura</li>
                <li>Homestead</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border-light text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-small">
              <a href="/privacy" className="text-muted-text hover:text-accent-green text-xs sm:text-sm">
                Privacy Policy
              </a>
              <span className="text-muted-text hidden sm:inline">|</span>
              <a href="/terms" className="text-muted-text hover:text-accent-green text-xs sm:text-sm">
                Terms of Service
              </a>
            </div>
            <p className="text-small text-muted-text text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} {localBusinessData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

