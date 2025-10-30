import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Link from 'next/link'
import { generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'
import { getAllCostGuides, getCostGuide } from '@/lib/content/costs'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Septic System Cost Guides | Pumping, Repair & Installation Costs',
    description: 'Browse detailed cost guides for septic services. Learn average prices, cost factors, and how to budget for pumping, repair, replacement, and more.',
    canonical: '/costs',
  })
}

export default function CostsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // Load cost guides from content files
  const allGuides = getAllCostGuides()
  const costGuides = allGuides.map(({ slug }) => {
    const guide = getCostGuide(slug)
    return guide ? {
      slug: guide.slug,
      title: guide.title,
      description: guide.metaDescription.substring(0, 100) + '...',
    } : null
  }).filter(Boolean) as Array<{ slug: string; title: string; description: string }>

  // Fallback to stub if no guides loaded
  const guidesToShow = costGuides.length > 0 ? costGuides : [
    { slug: 'septic-tank-pumping', title: 'Septic Tank Pumping Cost', description: 'Average cost: $300–$600. Learn what affects pricing.' },
    { slug: 'drainfield-replacement', title: 'Drainfield Replacement Cost', description: 'Average cost: $5,000–$20,000. Budget planning guide.' },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Costs', item: `${siteUrl}/costs` },
  ])

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic System Cost Guides
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Browse detailed cost guides for septic services. Learn average prices, cost factors, and how to budget for pumping, repair, replacement, and more.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidesToShow.map((guide) => (
            <Link
              key={guide.slug}
              href={`/costs/${guide.slug}`}
              className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-charcoal mb-2">{guide.title}</h3>
              <p className="text-body text-muted-text">{guide.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

