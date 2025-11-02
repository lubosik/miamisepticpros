'use client'

interface ArticleCTAProps {
  serviceName?: string
}

export default function ArticleCTA({ serviceName = 'Service' }: ArticleCTAProps) {
  return (
    <div className="mt-12 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Schedule Your {serviceName}?</h2>
      <p className="text-lg mb-6 text-green-50">Get a fast, transparent quote from Miami's trusted septic experts.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/quote/" 
          className="inline-block bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
        >
          Get Free Quote
        </a>
        <a 
          href="tel:+13055550100" 
          className="inline-block bg-green-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-900 transition-colors"
        >
          Call (305) 555-0100
        </a>
      </div>
    </div>
  )
}

