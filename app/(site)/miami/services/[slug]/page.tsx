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
  // This route redirects to /services/:slug, so we don't generate static params here
  return []
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
  const atGlanceMatch = html.match(/<div[^>]*class="[^"]*bg-(?:blue|green)-50[^"]*"[^>]*>[\s\S]*?<h3[^>]*>At a glance<\/h3>([\s\S]*?)<\/div>/i)
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
  const tocMatch = html.match(/<nav[^>]*>[\s\S]*?<h2[^>]*>On this page<\/h2>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>[\s\S]*?<\/nav>/i)
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

function cleanArticleContent(html: string, serviceName?: string): string {
  // Remove hero image figure (will be in hero section)
  html = html.replace(/<figure[^>]*class="mb-8"[^>]*>[\s\S]*?<\/figure>/i, '')
  
  // Remove H1 (will be in hero)
  html = html.replace(/<h1[^>]*>.*?<\/h1>/i, '')
  
  // Remove existing "At a glance" callout (we'll add it via component)
  html = html.replace(/<div[^>]*class="[^"]*bg-(?:blue|green)-50[^"]*"[^>]*>[\s\S]*?<h3[^>]*>At a glance<\/h3>[\s\S]*?<\/div>/i, '')
  
  // Remove existing TOC nav (we'll add sticky TOC via component)
  html = html.replace(/<nav[^>]*class="[^"]*mb-8[^"]*"[^>]*>[\s\S]*?<\/nav>/i, '')
  
  // Remove existing "Sources & References" section (we'll add via component)
  html = html.replace(/<div[^>]*class="[^"]*mt-6[^"]*"[^>]*>[\s\S]*?<\/div>/i, '')
  html = html.replace(/<h2[^>]*>Sources &amp; References<\/h2>[\s\S]*?<\/div>/i, '')
  
  // Convert cost cards to table format
  html = html.replace(
    /<div[^>]*class="[^"]*bg-green-50[^"]*"[^>]*>[\s\S]*?<h3[^>]*>Average[^<]*Cost[^<]*<\/h3>([\s\S]*?)<\/div>/i,
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
  html = html.replace(/<div[^>]*class="[^"]*mt-12[^"]*"[^>]*bg-gradient[^"]*"[^>]*>[\s\S]*?<\/div>/i, '')
  
  // Remove Sources & References section (will be rendered via Sources component)
  html = html.replace(/<div[^>]*class="[^"]*mt-8[^"]*"[^>]*pt-6[^"]*"[^"]*border-t[^"]*"[^>]*>[\s\S]*?<h2[^>]*>Sources[^<]*<\/h2>[\s\S]*?<\/div>[\s\S]*?<\/div>/i, '')
  html = html.replace(/<h2[^>]*>Sources[^<]*<\/h2>[\s\S]*?<\/div>/i, '')
  
  // Remove service area footer section
  html = html.replace(/<div[^>]*class="[^"]*mt-6[^"]*"[^>]*pt-6[^"]*"[^"]*border-t[^"]*"[^>]*text-sm[^"]*"[^>]*>[\s\S]*?<\/div>/i, '')
  
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
    // linkCitations handled separately via Sources component
  })
  
  // Insert mid-article CTA after the cost section
  html = insertMidArticleCTA(html, serviceName)
  
  return html.trim()
}

function insertMidArticleCTA(html: string, serviceName?: string): string {
  // Find the cost section (h2 with id="cost")
  const costSectionMatch = html.match(/<h2[^>]*id=["']cost["'][^>]*>[\s\S]*?<\/h2>([\s\S]*?)(?=<h2|$)/i)
  
  if (!costSectionMatch) {
    // If no cost section, insert after first h2 section
    const firstH2Match = html.match(/(<h2[^>]*>[\s\S]*?<\/h2>)([\s\S]*?)(?=<h2|$)/i)
    if (firstH2Match) {
      const insertionPoint = firstH2Match.index! + firstH2Match[0].length
      const ctaHTML = generateMidArticleCTA(serviceName)
      return html.slice(0, insertionPoint) + ctaHTML + html.slice(insertionPoint)
    }
    return html
  }
  
  // Find the end of the cost section content (before next h2 or end)
  const costSectionEnd = costSectionMatch.index! + costSectionMatch[0].length
  
  // Insert CTA after cost section
  const ctaHTML = generateMidArticleCTA(serviceName)
  return html.slice(0, costSectionEnd) + ctaHTML + html.slice(costSectionEnd)
}

function generateMidArticleCTA(serviceName?: string): string {
  const displayName = serviceName || 'Septic Service'
  return `
<div class="mt-12 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white text-center">
  <h2 class="text-3xl font-bold mb-4">Ready to Schedule Your ${displayName}?</h2>
  <p class="text-lg mb-6 text-green-50">Get a fast, transparent quote from Miami's trusted septic experts.</p>
  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <a 
      href="/quote/" 
      class="inline-block bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
    >
      Get Free Quote
    </a>
    <a 
      href="tel:+13055550100" 
      class="inline-block bg-green-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-900 transition-colors"
    >
      Call (305) 555-0100
    </a>
  </div>
</div>
  `.trim()
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

  // Extract service name for CTA (remove common suffixes)
  const serviceName = title
    .replace(' in Miami, FL', '')
    .replace(' in Miami', '')
    .replace(' | Miami Septic Pros', '')
    .trim()
  
  // Extract and clean content (this will remove FAQ section)
  let cleanedContent = cleanArticleContent(rawContent, serviceName)
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
