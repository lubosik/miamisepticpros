import { notFound } from 'next/navigation'
import { getIssue, getAllIssues } from '@/lib/content/issues'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import ArticleLayout from '@/components/ArticleLayout'
import ServiceCard from '@/components/ServiceCard'
import { getAllServices } from '@/lib/content/services'
import { generateArticleSchema, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo/schemaGenerators'
import { renderMarkdown } from '@/lib/content/markdownRenderer'

export async function generateStaticParams() {
  const issues = getAllIssues()
  return issues.map((issue) => ({
    slug: issue.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const issue = getIssue(params.slug)
  
  if (!issue) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/issues/${issue.slug}`

  return generateMeta({
    title: `${issue.title} | Septic System Troubleshooting`,
    description: issue.metaDescription,
    canonical,
    ogImage: issue.ogImage,
    ogType: 'article',
  })
}

export default function IssuePage({ params }: { params: { slug: string } }) {
  const issue = getIssue(params.slug)

  if (!issue) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/issues/${issue.slug}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Issues', href: '/issues' },
    { label: issue.title, href: canonical },
  ]

  const articleSchema = generateArticleSchema({
    headline: issue.title,
    description: issue.metaDescription,
    author: 'SepticTankQuoteHub',
    datePublished: issue.publishedDate,
    dateModified: issue.updatedDate || issue.publishedDate,
    image: issue.ogImage,
    url: canonical,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  // Generate HowTo schema if solutions exist
  const howToSchema = issue.solutions && issue.solutions.length > 0
    ? generateHowToSchema({
        name: issue.title,
        description: issue.metaDescription,
        steps: issue.solutions.map(sol => ({
          name: sol.solution,
          text: sol.description,
        })),
      })
    : null

  // Render markdown content
  const htmlContent = renderMarkdown(issue.content)

  // Get related services
  const allServices = getAllServices()
  const relatedServices = issue.relatedServices
    ? allServices.filter(s => issue.relatedServices!.includes(s.slug))
    : []

  return (
    <>
      <SchemaJSON schema={articleSchema} />
      <SchemaJSON schema={breadcrumbSchema} />
      {howToSchema && <SchemaJSON schema={howToSchema} />}
      
      <ArticleLayout
        title={issue.title}
        breadcrumbs={breadcrumbs}
        heroImage={issue.ogImage}
        headings={issue.headings}
      >
        {/* Symptoms Section */}
        {issue.symptoms && issue.symptoms.length > 0 && (
          <section className="mb-8">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">
              Symptoms
            </h2>
            <ul className="list-disc list-inside text-body text-body-text mb-6 space-y-2">
              {issue.symptoms.map((symptom, idx) => (
                <li key={idx}>{symptom}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Main content */}
        <div 
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Causes Section */}
        {issue.causes && issue.causes.length > 0 && (
          <section className="mb-8 mt-12">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Common Causes
            </h2>
            <div className="space-y-4">
              {issue.causes.map((cause, idx) => (
                <div key={idx} className="border-l-4 border-accent-green pl-4 py-2">
                  <h3 className="font-semibold text-charcoal mb-1">{cause.cause}</h3>
                  <p className="text-body text-body-text">{cause.description}</p>
                  {cause.likelihood && (
                    <span className="text-small text-muted-text">
                      Likelihood: {cause.likelihood}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Solutions Section */}
        {issue.solutions && issue.solutions.length > 0 && (
          <section className="mb-8 mt-12">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Solutions
            </h2>
            <div className="space-y-4">
              {issue.solutions.map((solution, idx) => (
                <div key={idx} className="border border-border-light rounded-md p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-charcoal">{solution.solution}</h3>
                    {solution.urgency && (
                      <span className={`text-small px-2 py-1 rounded-sm ${
                        solution.urgency === 'immediate' ? 'bg-red-100 text-red-800' :
                        solution.urgency === 'soon' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {solution.urgency}
                      </span>
                    )}
                  </div>
                  <p className="text-body text-body-text mb-2">{solution.description}</p>
                  {solution.diy && (
                    <span className="text-small text-muted-text">DIY Friendly</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="mt-12">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  icon={service.icon}
                  description={service.shortDescription}
                  href={`/services/${service.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </ArticleLayout>
    </>
  )
}
