/**
 * Phase 1: Generate Authoritative Registries
 * Creates services.json, resources.json, and service-to-articles.json from inventory
 */

import fs from 'fs'
import path from 'path'

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

interface ServiceRecord {
  key: string
  name: string
  slug: string
  category: "Septic system service" | "Septic system contractor" | "Drainage contractor" | "Sewage treatment service"
  summary: string
  hero: string
  updated: string
  schemaType: "Service"
  active: boolean
}

interface ResourceRecord {
  id: string
  title: string
  slug: string
  serviceKey: string
  updated?: string
  hero?: string
  sourcePath: string
  excerpt?: string
  wordCount?: number
}

const inventoryPath = path.join(process.cwd(), 'scripts/phase0-inventory.json')
const registryDir = path.join(process.cwd(), 'data/registry')

// Ensure registry directory exists
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true })
}

function generateServices(articles: RawArticle[]): ServiceRecord[] {
  const services: ServiceRecord[] = []
  const seen = new Set<string>()
  
  for (const article of articles) {
    if (seen.has(article.serviceKey)) continue
    seen.add(article.serviceKey)
    
    // Extract service name from title (remove "in Miami" suffix and extra dashes)
    let serviceName = article.frontMatter?.service_type || article.title
    serviceName = serviceName
      .replace(/\s+in\s+Miami.*$/i, '')
      .replace(/\s*—.*$/, '')
      .trim()
    
    // Determine hero image
    let hero = article.hero || article.frontMatter?.og_image || ''
    if (!hero || hero === '') {
      hero = `/images/services/${article.serviceKey}.webp`
    }
    
    // Get summary/excerpt
    const summary = article.summary || 
                    article.frontMatter?.meta_description || 
                    `Professional ${serviceName.toLowerCase()} services in Miami-Dade County.`
    
    services.push({
      key: article.serviceKey,
      name: serviceName,
      slug: `/services/${article.serviceKey}`,
      category: article.category as ServiceRecord['category'],
      summary: summary.substring(0, 300), // Limit summary length
      hero,
      updated: article.updated || article.frontMatter?.published || new Date().toISOString().split('T')[0],
      schemaType: "Service",
      active: true,
    })
  }
  
  return services.sort((a, b) => a.name.localeCompare(b.name))
}

function generateResources(articles: RawArticle[]): ResourceRecord[] {
  return articles.map(article => ({
    id: article.id,
    title: article.title,
    slug: `/resources/${article.serviceKey}`,
    serviceKey: article.serviceKey,
    updated: article.updated || article.frontMatter?.published,
    hero: article.hero || article.frontMatter?.og_image,
    sourcePath: article.sourcePath.replace(process.cwd() + '/', ''),
    excerpt: article.summary?.substring(0, 200),
    wordCount: article.wordCount,
  }))
}

function generateServiceToArticles(services: ServiceRecord[], resources: ResourceRecord[]): Record<string, string[]> {
  const mapping: Record<string, string[]> = {}
  
  for (const service of services) {
    mapping[service.key] = []
  }
  
  for (const resource of resources) {
    if (!mapping[resource.serviceKey]) {
      mapping[resource.serviceKey] = []
    }
    mapping[resource.serviceKey].push(resource.id)
  }
  
  return mapping
}

function main() {
  console.log('📦 Phase 1: Generating Authoritative Registries\n')
  
  // Read inventory
  const inventoryData = JSON.parse(fs.readFileSync(inventoryPath, 'utf-8')) as RawArticle[]
  
  console.log(`✅ Loaded ${inventoryData.length} articles from inventory\n`)
  
  // Generate services
  console.log('🔨 Generating services.json...')
  const services = generateServices(inventoryData)
  const servicesPath = path.join(registryDir, 'services.json')
  fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2))
  console.log(`   ✅ Created ${services.length} services`)
  
  // Generate resources
  console.log('🔨 Generating resources.json...')
  const resources = generateResources(inventoryData)
  const resourcesPath = path.join(registryDir, 'resources.json')
  fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2))
  console.log(`   ✅ Created ${resources.length} resources`)
  
  // Generate service-to-articles mapping
  console.log('🔨 Generating service-to-articles.json...')
  const mapping = generateServiceToArticles(services, resources)
  const mappingPath = path.join(registryDir, 'service-to-articles.json')
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2))
  console.log(`   ✅ Created mapping for ${Object.keys(mapping).length} services`)
  
  // Summary
  console.log('\n📊 Summary:')
  console.log(`   Services: ${services.length}`)
  console.log(`   Resources: ${resources.length}`)
  console.log(`   Services with articles: ${Object.values(mapping).filter(ids => ids.length > 0).length}`)
  console.log(`   Services without articles: ${Object.values(mapping).filter(ids => ids.length === 0).length}`)
  
  console.log('\n✅ Phase 1 complete!')
}

main()

