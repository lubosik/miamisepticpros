'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const firstName = searchParams.get('name') || 'there'

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-green rounded-full mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-headings font-bold text-primary-navy mb-4">
          Thank You, {firstName}!
        </h1>
        <p className="text-lg sm:text-xl text-body-text max-w-2xl mx-auto">
          Your quote request has been received successfully. Our team is already reviewing your information.
        </p>
      </div>

      {/* What Happens Next */}
      <div className="bg-surface-light rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-serif-headings font-semibold text-charcoal mb-6 text-center">
          What Happens Next?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">1</div>
            <h3 className="font-semibold text-charcoal mb-2">We Review Your Request</h3>
            <p className="text-sm text-body-text">
              Our licensed technicians review your service details and location within minutes.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">2</div>
            <h3 className="font-semibold text-charcoal mb-2">We Contact You</h3>
            <p className="text-sm text-body-text">
              A team member will reach out as quickly as possible—usually within 2-4 hours during business hours.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">3</div>
            <h3 className="font-semibold text-charcoal mb-2">We Provide Your Quote</h3>
            <p className="text-sm text-body-text">
              You'll receive a clear, upfront estimate with no hidden fees or surprises.
            </p>
          </div>
        </div>
      </div>

      {/* Value-Added Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Emergency Service */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-900 mb-3">Need Emergency Service?</h3>
          <p className="text-body-text mb-4">
            If you're experiencing a septic emergency like backups, overflows, or system failures, don't wait. Call us now for immediate assistance.
          </p>
          <a
            href="tel:+13055550100"
            className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-sm hover:bg-red-700 transition-colors"
          >
            Call (305) 555-0100 Now
          </a>
          <p className="text-xs text-red-700 mt-2">Available 24/7 for emergencies</p>
        </div>

        {/* Helpful Resources */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">While You Wait</h3>
          <p className="text-body-text mb-4">
            Check out our helpful resources to learn more about septic system maintenance and common issues.
          </p>
          <div className="space-y-2">
            <Link href="/resources" className="block text-accent-green hover:underline font-semibold">
              → Browse Our Resources
            </Link>
            <Link href="/services" className="block text-accent-green hover:underline font-semibold">
              → View All Services
            </Link>
            <Link href="/tools/septic-pumping-schedule" className="block text-accent-green hover:underline font-semibold">
              → Use Our Free Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* Reassurance Message */}
      <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-6 mb-8 text-center">
        <p className="text-lg font-semibold text-charcoal mb-2">
          Rest Assured, {firstName}
        </p>
        <p className="text-body-text">
          Our team is committed to providing fast, reliable service. We understand that septic issues can be stressful, 
          and we're here to help. A team member will reach out as quickly as possible—typically within 2-4 hours during 
          business hours, or immediately for emergency requests.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/"
          className="w-full sm:w-auto bg-accent-green text-white font-sans-ui font-semibold px-8 py-4 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md text-center"
        >
          Return to Homepage
        </Link>
        <Link
          href="/services"
          className="w-full sm:w-auto bg-surface-white border-2 border-accent-green text-accent-green font-sans-ui font-semibold px-8 py-4 rounded-sm hover:bg-accent-green/5 transition-colors text-center"
        >
          Browse Our Services
        </Link>
      </div>

      {/* Contact Info */}
      <div className="mt-12 pt-8 border-t border-border-light text-center">
        <p className="text-body-text mb-2">
          <strong>Questions?</strong> Call us anytime:
        </p>
        <a
          href="tel:+13055550100"
          className="text-2xl font-bold text-accent-green hover:text-accent-green-hover"
        >
          (305) 555-0100
        </a>
        <p className="text-sm text-muted-text mt-2">
          Monday-Saturday 8am-6pm | Sunday 9am-3pm | 24/7 Emergency Service
        </p>
      </div>
    </div>
  )
}

