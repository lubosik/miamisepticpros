import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/schemaGenerators'
const contentDirectory = path.join(process.cwd(), 'pages/miami/services')

export async function generateStaticParams() {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }
  
  const services = fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ slug: dirent.name }))
  
  return services
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const filePath = path.join(contentDirectory, params.slug, 'index.html')
  
  if (!fs.existsSync(filePath)) {
    return {}
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'
  const canonical = `/miami/services/${params.slug}`

  return generateMeta({
    title: data.title || `${params.slug.replace(/-/g, ' ')} Services in Miami`,
    description: data.meta_description || data.title,
    canonical,
    ogImage: data.og_image,
    ogType: 'article',
  })
}

export default function MiamiServicePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(contentDirectory, params.slug, 'index.html')
  
  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'
  const canonical = `/miami/services/${params.slug}`

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Miami Services', href: '/miami/services' },
    { label: data.title || params.slug.replace(/-/g, ' '), href: canonical },
  ]

  const serviceSchema = generateServiceSchema({
    name: data.title || params.slug,
    description: data.meta_description || '',
    url: canonical,
    serviceType: data.service_type || data.title,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  // Extract FAQs from content if present
  const faqMatches = content.matchAll(/<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs)
  const faqs: Array<{ question: string; answer: string }> = []
  for (const match of faqMatches) {
    faqs.push({ question: match[1], answer: match[2] })
  }

  const faqSchema = faqs.length > 0 ? generateFAQPageSchema(faqs.map(f => ({ question: f.question, answer: f.answer }))) : null

  // Content is HTML with React className, convert to standard HTML class
  // Replace className="..." with class="..."
  const htmlContent = content.replace(/className="([^"]*)"/g, 'class="$1"')

  return (
    <>
      <SchemaJSON schema={serviceSchema} />
      <SchemaJSON schema={breadcrumbSchema} />
      {faqSchema && <SchemaJSON schema={faqSchema} />}
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />
        
        <article className="prose-content">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      </div>
    </>
  )
}

