#!/usr/bin/env tsx
/**
 * Phase 0: Inventory & Normalization Parser
 * Reads summary doc and scans filesystem to create authoritative inventory
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface RawArticle {
  id: string
  title: string
  slug: string
  serviceKey: string
  category: string
  updated?: string
  hero?: string
  sourcePath: string
  wordCount?: number
  summary?: string
  exists: boolean
  frontMatter?: Record<string, any>
}

interface ServiceFromSummary {
  number: number
  name: string
  slug: string
  category: string
  articlePath: string
}

const summaryPath = path.join(process.cwd(), 'docs/Miami-Septic-Pros-Complete-Summary.md')
const articlesBasePath = path.join(process.cwd(), 'pages/miami/services')

// Category mapping
const categoryMap: Record<string, string> = {
  'Septic System Service': 'Septic system service',
  'Septic System Contractor': 'Septic system contractor',
  'Drainage Contractor': 'Drainage contractor',
  'Sewage Treatment Service': 'Sewage treatment service',
}

function parseSummaryMarkdown(): ServiceFromSummary[] {
  const content = fs.readFileSync(summaryPath, 'utf-8')
  const services: ServiceFromSummary[] = []
  
  // Extract services from markdown tables
  const tableRegex = /\| # \| Service Name \| Article Slug \| Status \| Article Path \|\n\|[^\n]+\n((?:\|[^\n]+\n?)+)/g
  let match
  let categoryIndex = 0
  const categories = ['Septic System Service', 'Septic System Contractor', 'Drainage Contractor', 'Sewage Treatment Service']
  
  while ((match = tableRegex.exec(content)) !== null) {
    const tableRows = match[1].trim().split('\n')
    const category = categories[categoryIndex] || 'Unknown'
    
    for (const row of tableRows) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c)
      if (cells.length >= 5 && cells[0] !== '#') {
        const number = parseInt(cells[0])
        const name = cells[1]
        const slug = cells[2].replace(/`/g, '')
        const articlePath = cells[4].replace(/`/g, '')
        
        services.push({
          number,
          name,
          slug,
          category,
          articlePath,
        })
      }
    }
    categoryIndex++
  }
  
  return services
}

function scanFilesystem(services: ServiceFromSummary[]): RawArticle[] {
  const articles: RawArticle[] = []
  const slugMap = new Map<string, number>()
  
  for (const service of services) {
    // Convert relative path to absolute
    const relativePath = service.articlePath.replace(/^\/pages\//, '')
    const absolutePath = path.join(process.cwd(), 'pages', relativePath)
    const exists = fs.existsSync(absolutePath)
    
    // Extract front matter if file exists
    let frontMatter: Record<string, any> = {}
    let wordCount = 0
    let summary = ''
    
    if (exists) {
      try {
        const fileContent = fs.readFileSync(absolutePath, 'utf-8')
        const parsed = matter(fileContent)
        frontMatter = parsed.data || {}
        
        // Count words in content (approximate)
        const content = parsed.content || ''
        wordCount = content.split(/\s+/).filter(w => w.length > 0).length
        
        // Extract first paragraph as summary
        const firstP = content.match(/<p[^>]*>(.*?)<\/p>/)?.[1] || ''
        summary = firstP.replace(/<[^>]+>/g, '').substring(0, 200).trim()
      } catch (error) {
        console.error(`Error parsing ${absolutePath}:`, error)
      }
    }
    
    // Check for duplicate slugs
    if (slugMap.has(service.slug)) {
      console.warn(`⚠️  Duplicate slug detected: ${service.slug}`)
    }
    slugMap.set(service.slug, (slugMap.get(service.slug) || 0) + 1)
    
    articles.push({
      id: `article-${service.number}`,
      title: frontMatter.title || service.name,
      slug: `/miami/services/${service.slug}`,
      serviceKey: service.slug,
      category: categoryMap[service.category] || service.category,
      updated: frontMatter.updated || frontMatter.published,
      hero: frontMatter.og_image || frontMatter.hero,
      sourcePath: absolutePath,
      wordCount,
      summary: summary || frontMatter.meta_description,
      exists,
      frontMatter: exists ? frontMatter : undefined,
    })
  }
  
  return articles
}

function generateReport(articles: RawArticle[]): void {
  console.log('\n' + '='.repeat(80))
  console.log('PHASE 0: INVENTORY & NORMALIZATION REPORT')
  console.log('='.repeat(80) + '\n')
  
  // Summary statistics
  const total = articles.length
  const exists = articles.filter(a => a.exists).length
  const missing = articles.filter(a => !a.exists)
  const duplicates = articles.filter((a, i, arr) => 
    arr.findIndex(b => b.serviceKey === a.serviceKey) !== i
  )
  const withoutServiceKey = articles.filter(a => !a.serviceKey)
  
  console.log('📊 SUMMARY STATISTICS')
  console.log('─'.repeat(80))
  console.log(`Total articles discovered: ${total}`)
  console.log(`Files exist: ${exists}`)
  console.log(`Files missing: ${missing.length}`)
  console.log(`Duplicate slugs: ${duplicates.length}`)
  console.log(`Without serviceKey: ${withoutServiceKey.length}`)
  console.log()
  
  // Category breakdown
  console.log('📁 CATEGORY BREAKDOWN')
  console.log('─'.repeat(80))
  const categoryCounts = new Map<string, number>()
  articles.forEach(a => {
    categoryCounts.set(a.category, (categoryCounts.get(a.category) || 0) + 1)
  })
  categoryCounts.forEach((count, cat) => {
    console.log(`  ${cat}: ${count} articles`)
  })
  console.log()
  
  // Missing files
  if (missing.length > 0) {
    console.log('❌ MISSING FILES')
    console.log('─'.repeat(80))
    missing.forEach(a => {
      console.log(`  [${a.serviceKey}] ${a.title}`)
      console.log(`      Expected: ${a.sourcePath}`)
    })
    console.log()
  }
  
  // Duplicate slugs
  if (duplicates.length > 0) {
    console.log('⚠️  DUPLICATE SLUGS')
    console.log('─'.repeat(80))
    const seen = new Set<string>()
    duplicates.forEach(a => {
      if (!seen.has(a.serviceKey)) {
        seen.add(a.serviceKey)
        const matches = articles.filter(b => b.serviceKey === a.serviceKey)
        console.log(`  ${a.serviceKey}: ${matches.length} occurrences`)
      }
    })
    console.log()
  }
  
  // Sample preview (10 random items)
  console.log('📝 SAMPLE PREVIEW (10 random items)')
  console.log('─'.repeat(80))
  const sample = articles
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)
  
  console.log(JSON.stringify(sample, null, 2))
  console.log()
  
  // Full JSON output
  const outputPath = path.join(process.cwd(), 'scripts/phase0-inventory.json')
  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2))
  console.log(`💾 Full inventory saved to: ${outputPath}`)
  console.log()
}

// Main execution
function main() {
  try {
    console.log('🔍 Parsing summary document...')
    const services = parseSummaryMarkdown()
    
    console.log(`✅ Found ${services.length} services in summary`)
    console.log('🔍 Scanning filesystem...')
    
    const articles = scanFilesystem(services)
    
    generateReport(articles)
    
    // Exit with error code if issues found
    const missing = articles.filter(a => !a.exists).length
    const duplicates = articles.filter((a, i, arr) => 
      arr.findIndex(b => b.serviceKey === a.serviceKey) !== i
    ).length
    
    if (missing > 0 || duplicates > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()

