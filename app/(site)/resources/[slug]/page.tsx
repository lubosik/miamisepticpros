import { notFound } from 'next/navigation'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import ResourceHeroImage from '@/components/ResourceHeroImage.client'
import { getResourceBySlug, getService } from '@/lib/content/registry'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schemaGenerators'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function generateStaticParams() {
  // This route redirects to /services/:slug, so we don't generate static params here
  return []
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const fullSlug = `/resources/${params.slug}`
  const resource = getResourceBySlug(fullSlug)
  
  if (!resource) {
    return {
      title: 'Resource Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return generateMeta({
    title: `${resource.title} | Miami Septic Pros`,
    description: resource.excerpt || resource.title,
    canonical: resource.slug,
  })
}

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const fullSlug = `/resources/${params.slug}`
  const resource = getResourceBySlug(fullSlug)
  
  if (!resource) {
    notFound()
  }

  const service = getService(resource.serviceKey)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // Load article content from sourcePath
  let content = ''
  let frontMatter: Record<string, any> = {}
  
  try {
    const sourcePath = path.join(process.cwd(), resource.sourcePath)
    if (fs.existsSync(sourcePath)) {
      const fileContent = fs.readFileSync(sourcePath, 'utf-8')
      const parsed = matter(fileContent)
      content = parsed.content
      frontMatter = parsed.data || {}
    }
  } catch (error) {
    console.error(`Error loading resource content: ${error}`)
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: resource.title, href: resource.slug },
  ]

  const articleSchema = generateArticleSchema({
    headline: resource.title,
    description: resource.excerpt || resource.title,
    author: frontMatter.author || 'Miami Septic Pros',
    datePublished: resource.updated || frontMatter.published || new Date().toISOString(),
    dateModified: resource.updated || frontMatter.updated || new Date().toISOString(),
    image: resource.hero || frontMatter.og_image,
    url: resource.slug,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  return (
    <>
      <SchemaJSON schema={articleSchema} />
      <SchemaJSON schema={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <article className="mt-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif-headings font-bold text-primary-navy mb-6 sm:mb-8">
            {resource.title}
          </h1>

          {/* Hero Image */}
          {frontMatter.city && frontMatter.service && (
            <ResourceHeroImage
              city={frontMatter.city}
              service={frontMatter.service}
              alt={`${frontMatter.service} in ${frontMatter.city}, Florida`}
            />
          )}

          <div
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {service && (
            <div className="mt-12 pt-8 border-t border-border-light">
              <p className="text-sm sm:text-base text-muted-text mb-2">
                Related service:
              </p>
              <Link
                href={service.slug}
                className="inline-block text-accent-green hover:text-accent-green-hover font-semibold text-sm sm:text-base"
              >
                {service.name} →
              </Link>
            </div>
          )}
        </article>
      </div>
    </>
  )
}

