'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ContactThankYouPage() {
  const searchParams = useSearchParams()
  const firstName = searchParams.get('name') || 'there'

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
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
          Your message has been received. We'll get back to you as quickly as possible.
        </p>
      </div>

      <div className="bg-surface-light rounded-lg p-8 mb-8 text-center">
        <p className="text-body-text mb-4">
          A team member will reach out to you typically within 24 hours. For urgent matters, please call us directly.
        </p>
        <a
          href="tel:+13055550100"
          className="inline-block bg-accent-green text-white font-semibold px-8 py-4 rounded-sm hover:bg-accent-green-hover transition-colors"
        >
          Call (305) 555-0100
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto bg-accent-green text-white font-sans-ui font-semibold px-8 py-4 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md text-center"
        >
          Return to Homepage
        </Link>
        <Link
          href="/contact"
          className="w-full sm:w-auto bg-surface-white border-2 border-accent-green text-accent-green font-sans-ui font-semibold px-8 py-4 rounded-sm hover:bg-accent-green/5 transition-colors text-center"
        >
          Back to Contact
        </Link>
      </div>
    </div>
  )
}

