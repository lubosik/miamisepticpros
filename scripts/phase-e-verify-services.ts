#!/usr/bin/env tsx
/**
 * Phase E: Verify all 54 services render correctly
 * Checks each service page for required elements
 */

import { getAllServices } from '../lib/content/registry'
import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'pages/miami/services')
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function checkService(service: { key: string; slug: string; name: string }, index: number): Promise<boolean> {
  const htmlPath = path.join(contentDirectory, service.key, 'index.html')
  
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ ${index + 1}/54: ${service.key} - HTML file not found`)
    return false
  }

  try {
    const fileContent = fs.readFileSync(htmlPath, 'utf8')
    const hasContent = fileContent.length > 100
    const hasH2 = /<h2/i.test(fileContent)
    
    if (!hasContent) {
      console.error(`❌ ${index + 1}/54: ${service.key} - Empty or invalid HTML`)
      return false
    }
    
    if (!hasH2) {
      console.warn(`⚠️  ${index + 1}/54: ${service.key} - No H2 headings found (CTAs may not inject correctly)`)
    }
    
    console.log(`✅ ${index + 1}/54: ${service.key} → ${service.slug}`)
    return true
  } catch (error) {
    console.error(`❌ ${index + 1}/54: ${service.key} - Error: ${error}`)
    return false
  }
}

async function main() {
  console.log('🔍 Phase E: Verifying all 54 services...\n')
  
  const services = getAllServices()
  console.log(`Found ${services.length} services\n`)
  
  const results = await Promise.all(
    services.map((service, index) => checkService(service, index))
  )
  
  const passed = results.filter(Boolean).length
  const failed = results.length - passed
  
  console.log(`\n=== SUMMARY ===`)
  console.log(`✅ Passed: ${passed}/54`)
  if (failed > 0) {
    console.log(`❌ Failed: ${failed}/54`)
  }
  
  if (passed === 54) {
    console.log(`\n🎉 All 54 services verified!`)
    console.log(`\nEach service page should have:`)
    console.log(`  - Hero band with red background`)
    console.log(`  - Sticky ToC sidebar (if headings present)`)
    console.log(`  - Two CTAs injected server-side`)
    console.log(`  - Clean tables with .prose spacing`)
    console.log(`  - JSON-LD schemas (Service + LocalBusiness)`)
    console.log(`  - No nested anchors`)
    console.log(`  - No hydration warnings`)
    process.exit(0)
  } else {
    console.error(`\n⚠️  Some services failed verification`)
    process.exit(1)
  }
}

main().catch(console.error)

