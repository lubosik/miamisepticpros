import { generateMetadata as generateMeta } from '@/components/MetaTags'
import QuoteForm from '@/components/forms/QuoteForm'
import { getAllServices } from '@/lib/content/registry'

export async function generateMetadata() {
  return generateMeta({
    title: 'Get My Free Quote | Miami Septic Pros',
    description: 'Tell us about your septic issue and our team will provide a clear estimate. Fast, easy, and no obligation.',
    canonical: '/book',
  })
}

export default function BookPage() {
  const services = getAllServices()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Get Your Free Quote Today
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Fill out the form below and our team will provide a clear, upfront estimate. 
          No pressure, just honest estimates from licensed technicians.
        </p>
        
        <div id="quote-form">
          <QuoteForm services={services.map(s => ({ slug: s.key, title: s.name }))} />
        </div>
      </div>
    </div>
  )
}

