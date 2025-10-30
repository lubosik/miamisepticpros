import { notFound } from 'next/navigation'
import { getCostGuide, getAllCostGuides } from '@/lib/content/costs'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import ArticleLayout from '@/components/ArticleLayout'
import { generateArticleSchema, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/seo/schemaGenerators'
import { renderMarkdown } from '@/lib/content/markdownRenderer'

export async function generateStaticParams() {
  const guides = getAllCostGuides()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = getCostGuide(params.slug)
  
  if (!guide) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/costs/${guide.slug}`

  return generateMeta({
    title: `${guide.title} | Pricing Guide`,
    description: guide.metaDescription,
    canonical,
    ogImage: guide.ogImage,
    ogType: 'article',
  })
}

export default function CostGuidePage({ params }: { params: { slug: string } }) {
  const guide = getCostGuide(params.slug)

  if (!guide) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/costs/${guide.slug}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Costs', href: '/costs' },
    { label: guide.title, href: canonical },
  ]

  const articleSchema = generateArticleSchema({
    headline: guide.title,
    description: guide.metaDescription,
    author: 'SepticTankQuoteHub',
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate || guide.publishedDate,
    image: guide.ogImage,
    url: canonical,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  // Render markdown content
  const htmlContent = renderMarkdown(guide.content)

  return (
    <>
      <SchemaJSON schema={articleSchema} />
      <SchemaJSON schema={breadcrumbSchema} />
      
      <ArticleLayout
        title={guide.title}
        breadcrumbs={breadcrumbs}
        heroImage={guide.ogImage}
        headings={guide.headings}
      >
        {/* National Average */}
        {guide.nationalAverage && (
          <div className="mb-8 p-6 bg-surface-gray-50 border border-border-light rounded-md">
            <p className="text-small text-muted-text mb-2">National Average Cost</p>
            <p className="text-h2 font-serif-headings text-accent-green font-bold">
              ${guide.nationalAverage.min}–${guide.nationalAverage.max}
              {guide.nationalAverage.typical && (
                <span className="text-body-lg text-charcoal font-normal ml-2">
                  (typical: ${guide.nationalAverage.typical})
                </span>
              )}
            </p>
          </div>
        )}

        {/* Main content */}
        <div 
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Price Range Table */}
        {guide.priceRange && guide.priceRange.length > 0 && (
          <section className="mt-12 mb-8">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Cost Breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border-light rounded-md">
                <thead className="bg-surface-gray-50">
                  <tr>
                    <th className="border border-border-light px-4 py-3 text-left font-semibold text-charcoal">
                      Factor
                    </th>
                    <th className="border border-border-light px-4 py-3 text-left font-semibold text-charcoal">
                      Cost Range
                    </th>
                    {guide.priceRange.some(item => item.notes) && (
                      <th className="border border-border-light px-4 py-3 text-left font-semibold text-charcoal">
                        Notes
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {guide.priceRange.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-border-light px-4 py-3 text-body text-body-text font-semibold">
                        {item.factor}
                      </td>
                      <td className="border border-border-light px-4 py-3 text-body text-charcoal font-semibold">
                        {item.cost}
                      </td>
                      {guide.priceRange.some(i => i.notes) && (
                        <td className="border border-border-light px-4 py-3 text-body text-body-text">
                          {item.notes || ''}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Cost Factors */}
        {guide.costFactors && guide.costFactors.length > 0 && (
          <section className="mt-12 mb-8">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Factors That Affect Cost
            </h2>
            <div className="space-y-4">
              {guide.costFactors.map((factor, idx) => (
                <div key={idx} className="border-l-4 border-accent-green pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-charcoal">{factor.factor}</h3>
                    {factor.priceImpact && (
                      <span className={`text-small px-2 py-1 rounded-sm ${
                        factor.priceImpact === 'high' ? 'bg-red-100 text-red-800' :
                        factor.priceImpact === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {factor.priceImpact} impact
                      </span>
                    )}
                  </div>
                  <p className="text-body text-body-text">{factor.impact}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regional Data */}
        {guide.regionalData && guide.regionalData.length > 0 && (
          <section className="mt-12 mb-8">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Regional Pricing Variations
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border-light rounded-md">
                <thead className="bg-surface-gray-50">
                  <tr>
                    <th className="border border-border-light px-4 py-3 text-left font-semibold text-charcoal">
                      Region
                    </th>
                    <th className="border border-border-light px-4 py-3 text-left font-semibold text-charcoal">
                      Average Cost
                    </th>
                    <th className="border border-border-light px-4 py-3 text-left font-semibold text-charcoal">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guide.regionalData.map((region, idx) => (
                    <tr key={idx}>
                      <td className="border border-border-light px-4 py-3 text-body text-body-text font-semibold">
                        {region.region}
                      </td>
                      <td className="border border-border-light px-4 py-3 text-body text-charcoal font-semibold">
                        {region.averageCost}
                      </td>
                      <td className="border border-border-light px-4 py-3 text-body text-body-text">
                        {region.notes || ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Saving Tips */}
        {guide.savingTips && guide.savingTips.length > 0 && (
          <section className="mt-12 mb-8">
            <h2 className="text-h2 font-serif-headings font-semibold text-charcoal mb-4">
              Tips to Save Money
            </h2>
            <ul className="list-disc list-inside text-body text-body-text mb-6 space-y-2">
              {guide.savingTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </section>
        )}
      </ArticleLayout>
    </>
  )
}
