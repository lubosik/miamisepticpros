import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Link from 'next/link'
import { generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'
import { getAllIssues, getIssue } from '@/lib/content/issues'

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: 'Septic System Issues & Symptoms | Troubleshooting Guide',
    description: 'Is your septic system acting up? Browse common symptoms like gurgling drains, slow draining, odors, and more. Learn causes and solutions.',
    canonical: '/issues',
  })
}

export default function IssuesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // Load issues from content files
  const allIssues = getAllIssues()
  const issues = allIssues.map(({ slug }) => {
    const issue = getIssue(slug)
    return issue ? {
      slug: issue.slug,
      title: issue.title,
      description: issue.metaDescription.substring(0, 100) + '...',
    } : null
  }).filter(Boolean) as Array<{ slug: string; title: string; description: string }>

  // Fallback to stub if no issues loaded
  const issuesToShow = issues.length > 0 ? issues : [
    { slug: 'drains-gurgling', title: 'Gurgling Drains', description: 'Learn why your drains are making gurgling sounds and how to fix it.' },
    { slug: 'slow-draining-sinks', title: 'Slow Draining Sinks', description: 'Discover the causes of slow drainage and effective solutions.' },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: `${siteUrl}/` },
    { name: 'Issues', item: `${siteUrl}/issues` },
  ])

  return (
    <>
      <SchemaJSON schema={breadcrumbSchema} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
          Septic System Issues & Symptoms
        </h1>
        <p className="text-body-lg text-body-text mb-12">
          Is your septic system acting up? Browse common symptoms like gurgling drains, slow draining, odors, and more. Learn causes and solutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issuesToShow.map((issue) => (
            <Link
              key={issue.slug}
              href={`/issues/${issue.slug}`}
              className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-charcoal mb-2">{issue.title}</h3>
              <p className="text-body text-muted-text">{issue.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

