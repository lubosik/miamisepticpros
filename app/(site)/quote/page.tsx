import { generateMetadata as generateMeta } from '@/components/MetaTags'
import QuoteForm from '@/components/forms/QuoteForm'
import { getAllServices } from '@/lib/content/services'

export async function generateMetadata() {
  return generateMeta({
    title: 'Get My Septic Service Estimate | SepticTankQuoteHub',
    description: 'Tell us about your septic issue and our team will provide a clear estimate. Fast, easy, and no obligation.',
    canonical: '/quote',
  })
}

export default function QuotePage() {
  const services = getAllServices()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Tell us about your septic issue
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Fill out the form below and our team will provide a clear estimate. 
          Get a clear, upfront estimate from our licensed technicians.
        </p>
        
        <div id="quote-form">
          <QuoteForm services={services.map(s => ({ slug: s.slug, title: s.title }))} />
        </div>
      </div>
    </div>
  )
}
