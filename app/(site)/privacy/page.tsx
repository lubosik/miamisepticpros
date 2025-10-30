import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Privacy Policy | SepticTankQuoteHub',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
    canonical: '/privacy',
  })
}

export default function PrivacyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy', href: '/privacy' },
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
          Privacy Policy
        </h1>
        
        <div className="prose-content">
          <p className="text-body text-body-text mb-6">
            <strong>Last Updated:</strong> October 29, 2025
          </p>
          
          <p className="text-body text-body-text mb-6">
            This Privacy Policy describes how SepticTankQuoteHub (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your personal information when you use our website.
          </p>

          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">
            Information We Collect
          </h2>
          
          <p className="text-body text-body-text mb-6">
            We collect information that you provide directly to us, such as when you:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="text-body text-body-text mb-3">Submit a quote request form</li>
            <li className="text-body text-body-text mb-3">Contact us via email or phone</li>
            <li className="text-body text-body-text mb-3">Subscribe to our newsletter</li>
          </ul>

          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">
            How We Use Your Information
          </h2>
          
          <p className="text-body text-body-text mb-6">
            We use the information we collect to:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li className="text-body text-body-text mb-3">Our licensed technicians handle your service. When needed, we may use licensed subcontractors.</li>
            <li className="text-body text-body-text mb-3">Respond to your inquiries and requests</li>
            <li className="text-body text-body-text mb-3">Improve our website and services</li>
          </ul>

          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">
            Contact Us
          </h2>
          
          <p className="text-body text-body-text mb-6">
            If you have questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </>
  )
}

