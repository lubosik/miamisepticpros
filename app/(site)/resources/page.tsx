import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Link from 'next/link'
import { generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'
import { getAllArticles } from '@/lib/content/articles'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Septic Guides & Resources | Expert Tips & Advice',
    description: 'Browse our library of septic system guides. Learn about maintenance, costs, troubleshooting, and more. Expert advice for homeowners.',
    canonical: '/resources',
  })
}

export default function ResourcesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const articles = getAllArticles().slice(0, 20) // Latest 20 articles

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Resources', item: `${siteUrl}/resources` },
  ])

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic Guides & Resources
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Browse our library of septic system guides. Learn about maintenance, costs, troubleshooting, and more. Expert advice for homeowners.
        </p>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={`${article.service}-${article.stateCity}`}
                href={`/resources/${article.service}/${article.stateCity}`}
                className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-charcoal mb-2">
                  {article.service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - {article.stateCity.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <p className="text-small text-muted-text">Read guide →</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-body text-muted-text">No articles available yet. Check back soon!</p>
        )}
      </div>
    </>
  )
}
