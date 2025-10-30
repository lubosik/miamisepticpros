import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import ServiceCard from '@/components/ServiceCard'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/seo/schemaGenerators'
import { getAllServices } from '@/lib/content/services'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Septic Services | Pumping, Cleaning, Inspection & More',
    description: 'Browse all septic services: pumping, cleaning, inspection, repair, drainfield work, emergency service, and more. Find the right service for your needs.',
    canonical: '/services',
  })
}

export default function ServicesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // Load all services from JSON files
  const services = getAllServices()

  // Fallback to hardcoded list if no services loaded yet
  const servicesToShow = services.length > 0 ? services : [
    { slug: 'septic-tank-pumping', title: 'Septic Tank Pumping', icon: '🚛', description: 'Regular removal of solid waste to prevent backups and extend system life.' },
    { slug: 'septic-tank-cleaning', title: 'Septic Tank Cleaning', icon: '🧼', description: 'Deep cleaning to remove buildup and restore tank efficiency.' },
    { slug: 'septic-inspection', title: 'Septic Inspection', icon: '🔍', description: 'Comprehensive health check to identify issues before they become costly.' },
    { slug: 'real-estate-septic-inspection', title: 'Real Estate Inspection', icon: '🏠', description: 'Pre-purchase septic system evaluation for home buyers.' },
    { slug: 'septic-tank-repair', title: 'Septic Tank Repair', icon: '🔧', description: 'Expert repair services to restore your septic system functionality.' },
    { slug: 'emergency-pumping', title: 'Emergency Pumping', icon: '🚨', description: '24/7 emergency septic pumping when backups threaten your home.' },
    { slug: 'drainfield-repair', title: 'Drainfield Repair', icon: '🏗️', description: 'Restore failed drainfields with professional repair services.' },
    { slug: 'drainfield-replacement', title: 'Drainfield Replacement', icon: '🔄', description: 'Complete drainfield replacement for severely damaged systems.' },
    { slug: 'septic-installation', title: 'Septic Installation', icon: '🆕', description: 'New septic system installation for residential properties.' },
    { slug: 'riser-installation', title: 'Riser Installation', icon: '⬆️', description: 'Install above-ground risers for easier tank access.' },
    { slug: 'baffle-replacement', title: 'Baffle Replacement', icon: '🔀', description: 'Replace damaged or missing septic tank baffles.' },
    { slug: 'septic-tank-locating', title: 'Tank Locating', icon: '📍', description: 'Find your buried septic tank for maintenance or inspection.' },
    { slug: 'camera-inspection', title: 'Camera Inspection', icon: '📹', description: 'Video camera inspection to diagnose pipe and drainfield issues.' },
    { slug: 'lift-station-service', title: 'Lift Station Service', icon: '⚙️', description: 'Maintenance and repair of sewage lift station pumps.' },
    { slug: 'grease-trap-pumping', title: 'Grease Trap Pumping', icon: '🛢️', description: 'Commercial grease trap cleaning and maintenance.' },
    { slug: 'septic-system-maintenance', title: 'System Maintenance', icon: '🛠️', description: 'Regular maintenance plans to keep your system running smoothly.' },
  ]

  const serviceListSchema = generateItemListSchema(
    servicesToShow.map(s => ({ 
      name: s.title || (s as any).title, 
      url: `${siteUrl}/services/${s.slug || (s as any).slug}` 
    }))
  )
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Services', item: `${siteUrl}/services` },
  ])
  
  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      <SchemaJSON schema={serviceListSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic Services
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Browse all septic services: pumping, cleaning, inspection, repair, drainfield work, emergency service, and more. Our licensed technicians handle your service.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesToShow.map((service) => {
            const slug = 'slug' in service ? service.slug : (service as any).slug
            const title = 'title' in service ? service.title : (service as any).title
            const icon = 'icon' in service ? service.icon : (service as any).icon
            const description = 'shortDescription' in service 
              ? service.shortDescription 
              : (service as any).description || ''
            
            return (
              <ServiceCard
                key={slug}
                title={title}
                icon={icon}
                description={description}
                href={`/services/${slug}`}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

