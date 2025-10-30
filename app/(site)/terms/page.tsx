import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Terms of Service | SepticTankQuoteHub',
    description: 'Terms of service for using SepticTankQuoteHub. Read our policies and user agreement.',
    canonical: '/terms',
  })
}

export default function TermsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Terms', href: '/terms' },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Terms of Service
        </h1>
        
        <div className="prose-content">
          <p className="text-body text-body-text mb-6">
            <strong>Last Updated:</strong> October 29, 2025
          </p>
          
          <p className="text-body text-body-text mb-6">
            Please read these Terms of Service (&quot;Terms&quot;) carefully before using SepticTankQuoteHub (&quot;Service&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          </p>

          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">
            Acceptance of Terms
          </h2>
          
          <p className="text-body text-body-text mb-6">
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, then you may not access the Service.
          </p>

          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">
            Use of Service
          </h2>
          
          <p className="text-body text-body-text mb-6">
            You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="text-body text-body-text mb-3">In any way that violates any applicable federal, state, local, or international law</li>
            <li className="text-body text-body-text mb-3">To transmit, or procure the sending of, any advertising or promotional material</li>
            <li className="text-body text-body-text mb-3">To impersonate or attempt to impersonate the company or another user</li>
          </ul>

          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">
            Disclaimer
          </h2>
          
          <p className="text-body text-body-text mb-6">
            We primarily perform services in-house. When needed, we may use licensed subcontractors. We do not sell your data.
          </p>
        </div>
      </div>
    </>
  )
}

