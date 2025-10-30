import { notFound } from 'next/navigation'
import { getLocation, getAllLocations } from '@/lib/content/locations'
import { getAllServices } from '@/lib/content/services'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import ServiceCard from '@/components/ServiceCard'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'

export async function generateStaticParams() {
  const locations = getAllLocations()
  return locations.map((loc) => ({
    state: loc.stateCode.toLowerCase(),
    city: loc.citySlug,
  }))
}

export async function generateMetadata({ params }: { params: { state: string; city: string } }) {
  const location = getLocation(params.state.toUpperCase(), params.city)
  
  if (!location) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/locations/${params.state}/${params.city}`

  return generateMeta({
    title: `Septic Services in ${location.city}, ${location.stateCode} | Pumping, Cleaning & More`,
    description: location.metaDescription || `Our licensed technicians serve ${location.city}, ${location.stateCode}. Upfront estimates for pumping, inspection, repair, drainfield work, and emergency service.`,
    canonical,
  })
}

export default function CityPage({ params }: { params: { state: string; city: string } }) {
  const location = getLocation(params.state.toUpperCase(), params.city)

  if (!location) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/locations/${params.state}/${params.city}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: location.state, href: `/locations/${params.state}` },
    { label: location.city, href: canonical },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  // Get services available in this city
  const allServices = getAllServices()
  const availableServices = location.availableServices
    ? allServices.filter(s => location.availableServices!.includes(s.slug))
    : allServices

  const serviceListSchema = generateItemListSchema(
    availableServices.map(s => ({
      name: s.title,
      url: `${siteUrl}/services/${s.slug}`,
    }))
  )

  // Convert local insights markdown to HTML
  const htmlInsights = location.localInsights
    ? location.localInsights
        .split('\n')
        .map(line => {
          if (line.startsWith('## ')) {
            const text = line.replace('## ', '').trim()
            return `<h2 class="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">${escapeHtml(text)}</h2>`
          }
          if (line.startsWith('### ')) {
            const text = line.replace('### ', '').trim()
            return `<h3 class="text-h3 font-serif-headings font-semibold text-charcoal mt-10 mb-4">${escapeHtml(text)}</h3>`
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
          if (line.trim()) {
            return `<p class="text-body text-body-text mb-6 leading-relaxed">${escapeHtml(line)}</p>`
          }
          return ''
        })
        .filter(Boolean)
        .join('')
    : ''

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={serviceListSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic Services in {location.city}, {location.stateCode}
        </h1>
        {location.county && (
          <p className="text-body-lg text-muted-text mb-4">{location.county}</p>
        )}
        <p className="text-body text-body-text mb-8">
          Headquartered in Miami, serving Miami-Dade and neighbors in Broward & Palm Beach.
        </p>

        <div className="mb-12">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
            Available Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableServices.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                icon={service.icon}
                description={service.shortDescription}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </div>

        {location.localInsights && (
          <section className="prose-content">
            <div dangerouslySetInnerHTML={{ __html: htmlInsights }} />
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
            Related Articles
          </h2>
          <p className="text-body text-muted-text">
            Articles for {location.city}, {location.stateCode} coming soon.
          </p>
        </section>
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
