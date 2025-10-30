import { notFound } from 'next/navigation'
import { getArticle } from '@/lib/content/articles'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import ArticleLayout from '@/components/ArticleLayout'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'
import { renderMarkdown } from '@/lib/content/markdownRenderer'

interface ArticlePageProps {
  params: { service: string; stateCity: string }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticle(params.service, params.stateCity)
  
  if (!article) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/resources/${params.service}/${params.stateCity}`

  return generateMeta({
    title: article.title,
    description: article.metaDescription,
    canonical,
    ogImage: article.ogImage,
    ogType: 'article',
  })
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle(params.service, params.stateCity)

  if (!article) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonical = `/resources/${params.service}/${params.stateCity}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: article.title, href: canonical },
  ]

  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.metaDescription,
    author: article.author,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    image: article.ogImage,
    url: canonical,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  const relatedLinks = article.relatedArticles.map(slug => ({
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    href: `/resources/${article.service}/${slug}`,
  }))

  // Enhanced markdown to HTML renderer for Phase 5
  const htmlContent = renderMarkdown(article.content)

  return (
    <>
      <SchemaJSON schema={articleSchema} />
      <SchemaJSON schema={breadcrumbSchema} />
      <ArticleLayout
        title={article.title}
        breadcrumbs={breadcrumbs}
        heroImage={article.ogImage}
        relatedLinks={relatedLinks}
        headings={article.headings}
      >
        <div 
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </ArticleLayout>
    </>
  )
}

export async function generateStaticParams() {
  const { getAllArticles } = await import('@/lib/content/articles')
  const all = getAllArticles()
  return all.map(({ service, stateCity }) => ({ service, stateCity }))
}
