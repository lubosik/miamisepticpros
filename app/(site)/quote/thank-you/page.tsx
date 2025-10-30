import { generateMetadata as generateMeta } from '@/components/MetaTags'
import Link from 'next/link'

export async function generateMetadata() {
  return generateMeta({
    title: 'Thank You | SepticTankQuoteHub',
    description: 'Thank you for your service request. Our team will contact you within 24 hours.',
    canonical: '/quote/thank-you',
    noindex: true,
  })
}

export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-4">
          Thank You!
        </h1>
        <p className="text-body-lg text-body-text mb-6">
          Your service request has been received successfully.
        </p>
        <p className="text-body text-body-text mb-8">
          Our team will contact you within 24 hours to discuss your needs and provide a clear, upfront estimate.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <a
          href="tel:+13055550100"
          className="inline-block bg-primary-navy text-white font-sans-ui font-semibold px-8 py-4 rounded-sm hover:opacity-90 transition-opacity shadow-md"
        >
          Call +1 (305) 555-0100 Now
        </a>
        <div className="text-small text-muted-text">
          Available 24/7 for emergencies
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/"
          className="inline-block bg-accent-green text-white font-sans-ui font-semibold px-6 py-3 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

