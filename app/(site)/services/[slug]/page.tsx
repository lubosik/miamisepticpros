import { notFound } from 'next/navigation'
import { getService, getAllServices } from '@/lib/content/services'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import ServiceCard from '@/components/ServiceCard'
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/schemaGenerators'

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  
  if (!service) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/services/${service.slug}`

  return generateMeta({
    title: `${service.title} Services | How It Works, Cost & More`,
    description: service.metaDescription,
    canonical,
  })
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)

  if (!service) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/services/${service.slug}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title, href: canonical },
  ]

  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.metaDescription,
    url: canonical,
    serviceType: service.schema?.serviceType || service.title,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  const faqSchema = service.faqs && service.faqs.length > 0
    ? generateFAQPageSchema(service.faqs)
    : null

  // Convert markdown description to HTML
  const htmlDescription = service.fullDescription
    .split('\n')
    .map(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim()
        return `<h2 class="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">${escapeHtml(text)}</h2>`
      }
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?):\*\* (.+)/)
        if (match) {
          return `<li class="text-body text-body-text mb-3"><strong>${escapeHtml(match[1])}:</strong> ${escapeHtml(match[2])}</li>`
        }
      }
      if (line.startsWith('- ')) {
        const text = line.replace('- ', '').trim()
        return `<li class="text-body text-body-text mb-3">${escapeHtml(text)}</li>`
      }
      if (line.match(/^\d+\. /)) {
        const text = line.replace(/^\d+\. /, '').trim()
        return `<li class="text-body text-body-text mb-3">${escapeHtml(text)}</li>`
      }
      if (line.trim()) {
        return `<p class="text-body text-body-text mb-6 leading-relaxed">${escapeHtml(line)}</p>`
      }
      return ''
    })
    .filter(Boolean)
    .join('')

  // Get related services
  const allServices = getAllServices()
  const relatedServices = service.relatedServices
    ? allServices.filter(s => service.relatedServices!.includes(s.slug))
    : []

  return (
    <>
      <SchemaJSON schema={serviceSchema} />
      <SchemaJSON schema={breadcrumbSchema} />
      {faqSchema && <SchemaJSON schema={faqSchema} />}
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="mb-8">
          <div className="text-4xl mb-4">{service.icon}</div>
          <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-4">
            {service.title}
          </h1>
          <p className="text-body-lg text-body-text">
            {service.shortDescription}
          </p>
          <p className="text-small text-muted-text mt-2">
            Service Area: Miami-Dade • Broward • Palm Beach
          </p>
        </div>

        {service.averageCost && (
          <div className="mb-8 p-6 bg-surface-gray-50 border border-border-light rounded-md">
            <p className="text-body font-semibold text-charcoal mb-2">Average Cost:</p>
            <p className="text-h3 font-serif-headings text-accent-green">
              ${service.averageCost.min}–${service.averageCost.max}
              <span className="text-body text-muted-text ml-2">({service.averageCost.unit})</span>
            </p>
          </div>
        )}

        <div className="prose-content mb-12">
          <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />
        </div>

        {service.faqs && service.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <details key={idx} className="border border-border-light rounded-md p-4">
                  <summary className="cursor-pointer font-semibold text-charcoal mb-2">
                    {faq.question}
                  </summary>
                  <p className="text-body text-body-text mt-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {relatedServices.length > 0 && (
          <section className="mt-12">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related) => (
                <ServiceCard
                  key={related.slug}
                  title={related.title}
                  icon={related.icon}
                  description={related.shortDescription}
                  href={`/services/${related.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}
