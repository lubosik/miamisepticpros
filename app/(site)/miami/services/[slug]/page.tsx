import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { generateMetadata as generateMeta } from '@/components/MetaTags'
import SchemaJSON from '@/components/SchemaJSON'
import ArticleLayout from '@/components/article/ArticleLayout.server'
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/seo/schemaGenerators'
import { cleanContent } from '@/lib/format/cleanContent'

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
    title: data.title?.replace(' | Miami Septic Pros', '') || `${params.slug.replace(/-/g, ' ')} Services in Miami`,
    description: data.meta_description || data.title,
    canonical,
    ogImage: data.og_image,
    ogType: 'article',
  })
}

function extractHeadings(html: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = []
  
  // Extract H2 headings with IDs
  const h2Matches = html.matchAll(/<h2[^>]*id=['"]([^'"]+)['"][^>]*>(.*?)<\/h2>/gi)
  for (const match of h2Matches) {
    const id = match[1]
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    if (text && !text.includes('Sources & References')) {
      headings.push({ id, text, level: 2 })
    }
  }
  
  // Extract H3 headings that are questions (FAQs)
  const h3Matches = html.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)
  for (const match of h3Matches) {
    const text = match[1].replace(/<[^>]+>/g, '').trim()
    if (text && text.includes('?')) {
      const id = text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      headings.push({ id, text, level: 3 })
    }
  }
  
  return headings
}

function extractAtAGlance(html: string): Array<{ label: string; value: string }> | null {
  const atGlanceMatch = html.match(/<div[^>]*class="[^"]*bg-(?:blue|green)-50[^"]*"[^>]*>.*?<h3[^>]*>At a glance<\/h3>(.*?)<\/div>/is)
  if (!atGlanceMatch) return null
  
  const content = atGlanceMatch[1]
  const items: Array<{ label: string; value: string }> = []
  
  const liMatches = content.matchAll(/<li[^>]*>(.*?)<\/li>/gi)
  for (const match of liMatches) {
    const text = match[1].replace(/<[^>]+>/g, '').trim()
    const strongMatch = text.match(/<strong>(.*?)<\/strong>:\s*(.+)/i) || text.match(/\*\*(.*?)\*\*:\s*(.+)/)
    if (strongMatch) {
      items.push({
        label: strongMatch[1].replace(/<[^>]+>/g, '').trim(),
        value: strongMatch[2].trim(),
      })
    }
  }
  
  return items.length > 0 ? items : null
}

function extractThisArticleCovers(html: string): string[] | null {
  // Look for existing TOC nav
  const tocMatch = html.match(/<nav[^>]*>.*?<h2[^>]*>On this page<\/h2>.*?<ul[^>]*>(.*?)<\/ul>.*?<\/nav>/is)
  if (!tocMatch) return null
  
  const items: string[] = []
  const liMatches = tocMatch[1].matchAll(/<li[^>]*><a[^>]*>(.*?)<\/a><\/li>/gi)
  
  for (const match of liMatches) {
    const text = match[1].replace(/<[^>]+>/g, '').trim()
    if (text) {
      items.push(text)
    }
  }
  
  return items.length > 0 ? items : null
}

function cleanArticleContent(html: string): string {
  // Remove hero image figure (will be in hero section)
  html = html.replace(/<figure[^>]*class="mb-8"[^>]*>.*?<\/figure>/is, '')
  
  // Remove H1 (will be in hero)
  html = html.replace(/<h1[^>]*>.*?<\/h1>/i, '')
  
  // Remove existing "At a glance" callout (we'll add it via component)
  html = html.replace(/<div[^>]*class="[^"]*bg-(?:blue|green)-50[^"]*"[^>]*>.*?<h3[^>]*>At a glance<\/h3>.*?<\/div>/is, '')
  
  // Remove existing TOC nav (we'll add sticky TOC via component)
  html = html.replace(/<nav[^>]*class="[^"]*mb-8[^"]*"[^>]*>.*?<\/nav>/is, '')
  
  // Remove existing "Sources & References" section (we'll add via component)
  html = html.replace(/<div[^>]*class="[^"]*mt-6[^"]*"[^>]*>.*?<\/div>/is, '')
  html = html.replace(/<h2[^>]*>Sources &amp; References<\/h2>.*?<\/div>/is, '')
  
  // Convert cost cards to table format
  html = html.replace(
    /<div[^>]*class="[^"]*bg-green-50[^"]*"[^>]*>.*?<h3[^>]*>Average[^<]*Cost[^<]*<\/h3>(.*?)<\/div>/is,
    (match, tableContent) => {
      const minMatch = tableContent.match(/Minimum Cost[\s\S]*?\$(\d+)/i)
      const avgMatch = tableContent.match(/Average Cost[\s\S]*?\$(\d+)/i)
      const maxMatch = tableContent.match(/Maximum Cost[\s\S]*?\$(\d+)/i)
      const rangeMatch = tableContent.match(/Typical range[^:]*:\s*([^<]+)/i)
      
      if (minMatch || avgMatch || maxMatch) {
        return `
<div class="article-table-wrapper">
  <table class="article-table">
    <caption>Typical ranges reported by licensed Miami-Dade contractors (non-binding estimates).</caption>
    <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Low</th>
        <th scope="col">High</th>
        <th scope="col">Average</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Septic Tank Pumping</td>
        <td>$${minMatch ? minMatch[1] : '250'}</td>
        <td>$${maxMatch ? maxMatch[1] : '1200'}</td>
        <td>$${avgMatch ? avgMatch[1] : '450'}</td>
      </tr>
    </tbody>
  </table>
</div>
        `.trim()
      }
      return match
    }
  )
  
  // Remove FAQ section from content (will be rendered separately)
  // Match from h2#faqs to the next h2, or hr, or script tag, or end of content
  // Also catch case-insensitive variations
  html = html.replace(/<h2[^>]*id=["']faqs["'][^>]*>[\s\S]*?(?=<h2[^>]|<hr|<script|<\/html|$)/gi, '')
  // Remove any remaining H2 with FAQ-related text (catch-all)
  html = html.replace(/<h2[^>]*>[\s]*Frequently Asked Questions[\s]*<\/h2>/gi, '')
  
  // Remove CTA section (will be handled separately if needed)
  html = html.replace(/<div[^>]*class="[^"]*mt-12[^"]*"[^>]*bg-gradient[^"]*"[^>]*>[\s\S]*?<\/div>/is, '')
  
  // Remove Sources & References section (will be rendered via Sources component)
  html = html.replace(/<div[^>]*class="[^"]*mt-8[^"]*"[^>]*pt-6[^"]*"[^"]*border-t[^"]*"[^>]*>[\s\S]*?<h2[^>]*>Sources[^<]*<\/h2>[\s\S]*?<\/div>[\s\S]*?<\/div>/is, '')
  html = html.replace(/<h2[^>]*>Sources[^<]*<\/h2>[\s\S]*?<\/div>/is, '')
  
  // Remove service area footer section
  html = html.replace(/<div[^>]*class="[^"]*mt-6[^"]*"[^>]*pt-6[^"]*"[^"]*border-t[^"]*"[^>]*text-sm[^"]*"[^>]*>[\s\S]*?<\/div>/is, '')
  
  // Remove any remaining <hr /> tags
  html = html.replace(/<hr\s*\/?>/gi, '')
  
  // Remove any <section> tags from content (components will render their own sections)
  // Do this AFTER all other removals to catch any nested or remaining sections
  html = html.replace(/<section[^>]*>[\s\S]*?<\/section>/gi, '')
  
  // Also remove any orphaned section tags (just in case)
  html = html.replace(/<section[^>]*>/gi, '')
  html = html.replace(/<\/section>/gi, '')
  
  // Clean the content
  html = cleanContent(html, {
    ensureIds: true,
    breakParagraphs: false, // Keep existing paragraph structure
    linkCitations: false, // We'll handle this separately
  })
  
  return html.trim()
}

export default function MiamiServicePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(contentDirectory, params.slug, 'index.html')
  
  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content: rawContent } = matter(fileContents)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://miamisepticpros.com'
  const canonical = `/miami/services/${params.slug}`

  // Extract title without "| Miami Septic Pros"
  const title = (data.title || params.slug.replace(/-/g, ' ')).replace(/\s*\|\s*Miami Septic Pros\s*$/i, '').trim()

  // Extract FAQs from raw content BEFORE cleaning (preserve all HTML)
  const faqSectionMatch = rawContent.match(/<h2[^>]*id=["']faqs["'][^>]*>.*?<\/h2>([\s\S]*?)(?=<h2[^>]|<hr|<script|<\/html|$)/i)
  let faqs: Array<{ question: string; answer: string }> = []
  
  if (faqSectionMatch) {
    const faqSection = faqSectionMatch[1]
    // Split by H3 tags and extract question + all following content until next H3
    const faqParts = faqSection.split(/<h3[^>]*>/i).filter(part => part.trim())
    
    for (const part of faqParts) {
      const questionMatch = part.match(/^(.*?)<\/h3>/i)
      if (!questionMatch) continue
      
      const question = questionMatch[1].replace(/<[^>]+>/g, '').trim()
      let answer = part.replace(/^.*?<\/h3>/i, '').trim()
      
      // Keep all HTML in answer, just clean up extra whitespace and remove script tags
      answer = answer
        .replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '') // Remove script tags
      
      if (question && answer && question.includes('?') && answer.length > 10) {
        faqs.push({ question, answer })
      }
    }
  }

  // Extract and clean content (this will remove FAQ section)
  let cleanedContent = cleanArticleContent(rawContent)
  const headings = extractHeadings(cleanedContent)
  const atAGlance = extractAtAGlance(rawContent)
  const thisArticleCovers = extractThisArticleCovers(rawContent)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Miami Services', href: '/miami/services' },
    { label: title, href: canonical },
  ]

  // Generate schemas
  const articleSchema = generateArticleSchema({
    headline: title,
    description: data.meta_description || title,
    author: data.author || 'Miami Septic Pros',
    publisher: 'Miami Septic Pros',
    datePublished: data.published || data.updated || new Date().toISOString(),
    dateModified: data.updated || data.published || new Date().toISOString(),
    image: data.og_image ? `${siteUrl}${data.og_image}` : undefined,
    url: `${siteUrl}${canonical}`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map(b => ({ name: b.label, item: `${siteUrl}${b.href}` }))
  )

  const faqSchema = faqs.length > 0 ? generateFAQPageSchema(faqs) : null

  // Sources
  const sources = (data.sources || []).map((s: { url: string; title: string }) => ({
    url: s.url,
    title: s.title,
  }))

  // Use ISO date string to prevent hydration drift (no locale formatting)
  const updatedISO = data.updated || data.published || new Date().toISOString()

  return (
    <>
      <SchemaJSON schema={articleSchema} />
      <SchemaJSON schema={breadcrumbSchema} />
      {faqSchema && <SchemaJSON schema={faqSchema} />}

      <ArticleLayout
        slug={params.slug}
        title={title}
        updatedISO={updatedISO}
        category="SERVICE GUIDES"
        byline={data.author}
        contentHtml={cleanedContent}
        breadcrumbs={breadcrumbs}
        atAGlance={atAGlance || undefined}
        thisArticleCovers={thisArticleCovers || undefined}
        verifiedBanner={atAGlance ? {
          mainText: 'Verified by our professional estimators',
          subText: 'Estimates are based on local Miami-Dade contractor data',
        } : undefined}
        sources={sources}
        faqs={faqs}
      />
    </>
  )
}
