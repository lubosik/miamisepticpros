import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/schemaGenerators'
import SepticPumpingCalculator from '@/components/tools/SepticPumpingCalculator.client'
import Link from 'next/link'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

  return generateMeta({
    title: 'Free Septic Tank Pumping Schedule Calculator | Miami Septic Pros',
    description: 'Calculate when your septic tank needs pumping based on household size, tank capacity, and usage. Free tool from Miami Septic Pros. Get your personalized pumping schedule instantly.',
    canonical: '/tools/septic-pumping-schedule',
  })
}

function generateSoftwareApplicationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'
  const pageUrl = `${siteUrl}/tools/septic-pumping-schedule`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Septic Tank Pumping Schedule Calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online calculator to determine when your septic tank needs pumping based on household size, tank capacity, and usage patterns.',
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Miami Septic Pros',
      url: siteUrl,
    },
    featureList: [
      'Calculate optimal septic tank pumping schedule',
      'Personalized recommendations based on household size',
      'Account for garbage disposal usage',
      'Determine if pumping is overdue',
      'Get next recommended pumping date',
    ],
  }
}

export default function SepticPumpingSchedulePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Tools', item: `${siteUrl}/tools` },
    { name: 'Septic Pumping Schedule Calculator', item: `${siteUrl}/tools/septic-pumping-schedule` },
  ])

  const softwareSchema = generateSoftwareApplicationSchema()

  const faqSchema = generateFAQPageSchema([
    {
      question: 'How often should I pump my septic tank?',
      answer: 'Most septic tanks should be pumped every 3-5 years, but this varies based on household size, tank capacity, and usage. Use our free calculator to determine your specific pumping schedule.',
    },
    {
      question: 'How do I know my septic tank size?',
      answer: 'Your septic tank size is typically listed in property records, inspection reports, or permits. Common sizes are 750-1000 gallons for 1-2 bedrooms, 1000-1500 gallons for 3-4 bedrooms, and 1500+ gallons for 5+ bedrooms.',
    },
    {
      question: 'What happens if I don\'t pump my septic tank?',
      answer: 'If you don\'t pump your septic tank regularly, solids can accumulate and clog your drainfield, causing backups, sewage odors, and expensive repairs. Regular pumping prevents these issues.',
    },
    {
      question: 'Does using a garbage disposal affect pumping frequency?',
      answer: 'Yes, garbage disposals increase solid waste accumulation by approximately 20%, requiring more frequent pumping. Our calculator accounts for this factor.',
    },
    {
      question: 'Is this calculator free to use?',
      answer: 'Yes, our Septic Tank Pumping Schedule Calculator is completely free to use with no signup required. You get instant, personalized results.',
    },
  ])

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={softwareSchema} />
      <SchemaJSON schema={faqSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-headings font-bold text-primary-navy mb-4 sm:mb-6 px-2 sm:px-0">
            Free Septic Tank Pumping Schedule Calculator
          </h1>
          <p className="text-base sm:text-lg text-body-text max-w-3xl mx-auto mb-3 sm:mb-4 px-2 sm:px-0">
            Find out exactly when your septic tank needs pumping based on your household size, tank capacity, and usage patterns. 
            Get your personalized maintenance schedule in seconds.
          </p>
          <p className="text-xs sm:text-small text-muted-text">
            ✅ Free • ✅ No signup required • ✅ Instant results
          </p>
        </section>

        {/* Calculator Component */}
        <div className="max-w-4xl mx-auto mb-12">
          <SepticPumpingCalculator />
        </div>

        {/* Information Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
            Why Regular Septic Tank Pumping Matters
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-body text-body-text mb-4">
              Regular septic tank pumping is essential for maintaining a healthy septic system. When solid waste accumulates beyond capacity, 
              it can clog your drainfield, cause backups, and lead to expensive repairs. Our calculator helps you determine the optimal 
              pumping schedule for your specific situation.
            </p>
            
            <h3 className="text-h3 font-semibold text-charcoal mt-8 mb-4">
              Factors That Affect Pumping Frequency
            </h3>
            <ul className="list-disc list-inside space-y-2 text-body text-body-text mb-6">
              <li><strong>Household Size:</strong> More people means more wastewater and faster accumulation</li>
              <li><strong>Tank Size:</strong> Larger tanks can hold more waste and require less frequent pumping</li>
              <li><strong>Water Usage:</strong> High water consumption accelerates waste buildup</li>
              <li><strong>Waste Type:</strong> Garbage disposals and harsh chemicals increase pumping needs</li>
              <li><strong>System Age:</strong> Older systems may need more frequent maintenance</li>
            </ul>

            <h3 className="text-h3 font-semibold text-charcoal mt-8 mb-4">
              Signs You Need Septic Pumping Now
            </h3>
            <ul className="list-disc list-inside space-y-2 text-body text-body-text mb-6">
              <li>Slow drains or toilets backing up</li>
              <li>Sewage odors in your yard or home</li>
              <li>Standing water or soggy areas near your drainfield</li>
              <li>Gurgling sounds in plumbing</li>
              <li>It&apos;s been more than 3 years since your last pump</li>
            </ul>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/services/septic-tank-pumping"
              className="block p-4 border border-border-light rounded-lg hover:border-accent-green hover:shadow-md transition-all group"
            >
              <h3 className="text-lg font-semibold text-primary-navy mb-2 group-hover:text-accent-green transition-colors">
                Septic Tank Pumping Services
              </h3>
              <p className="text-sm text-muted-text">
                Professional septic tank pumping by licensed technicians in Miami-Dade County.
              </p>
            </Link>
            <Link
              href="/services/septic-tank-inspection"
              className="block p-4 border border-border-light rounded-lg hover:border-accent-green hover:shadow-md transition-all group"
            >
              <h3 className="text-lg font-semibold text-primary-navy mb-2 group-hover:text-accent-green transition-colors">
                Septic Tank Inspection
              </h3>
              <p className="text-sm text-muted-text">
                Comprehensive septic system inspections to identify issues before they become costly.
              </p>
            </Link>
            <Link
              href="/services/septic-system-maintenance-plans"
              className="block p-4 border border-border-light rounded-lg hover:border-accent-green hover:shadow-md transition-all group"
            >
              <h3 className="text-lg font-semibold text-primary-navy mb-2 group-hover:text-accent-green transition-colors">
                Maintenance Plans
              </h3>
              <p className="text-sm text-muted-text">
                Regular maintenance plans to keep your septic system running smoothly year-round.
              </p>
            </Link>
            <Link
              href="/services/emergency-septic-services"
              className="block p-4 border border-border-light rounded-lg hover:border-accent-green hover:shadow-md transition-all group"
            >
              <h3 className="text-lg font-semibold text-primary-navy mb-2 group-hover:text-accent-green transition-colors">
                Emergency Services
              </h3>
              <p className="text-sm text-muted-text">
                24/7 emergency septic services for urgent situations like backups and overflows.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto bg-gradient-to-r from-accent-green to-green-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-h2 font-serif-headings font-bold mb-4">
            Ready to Schedule Your Septic Pumping?
          </h2>
          <p className="text-body-lg mb-6 opacity-95">
            Don&apos;t wait until you have a problem. Our licensed technicians provide fast, reliable septic pumping services 
            throughout Miami-Dade County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="bg-white text-accent-green px-8 py-4 rounded-sm font-sans-ui font-semibold hover:bg-gray-100 transition-colors shadow-md text-lg"
            >
              Schedule Pumping Service
            </a>
            <a
              href="tel:+13055550100"
              className="bg-green-700 text-white px-8 py-4 rounded-sm font-sans-ui font-semibold hover:bg-green-800 transition-colors shadow-md text-lg"
            >
              Call (305) 555-0100
            </a>
          </div>
          <p className="text-small mt-4 opacity-90">
            Same-day service available • Licensed & Insured • Free estimates
          </p>
        </section>
      </div>
    </>
  )
}

