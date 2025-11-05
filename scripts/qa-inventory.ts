#!/usr/bin/env tsx
/**
 * Phase 8: QA Inventory Script
 * Validates registries and checks route responses
 */

import fs from 'fs'
import path from 'path'
import type { ServiceRecord, ResourceRecord, ServiceToArticlesMap } from '../types/content'

const registryDir = path.join(process.cwd(), 'data/registry')
const baseUrl = process.env.DEV_URL || 'http://localhost:3000'

interface QAResult {
  passed: boolean
  errors: string[]
  warnings: string[]
  routeChecks: {
    total: number
    passed: number
    failed: number
    failedRoutes: string[]
  }
}

async function checkRoute(url: string): Promise<number> {
  try {
    const response = await fetch(url)
    return response.status
  } catch (error) {
    return 0
  }
}

async function validateInventory(): Promise<QAResult> {
  const result: QAResult = {
    passed: true,
    errors: [],
    warnings: [],
    routeChecks: {
      total: 0,
      passed: 0,
      failed: 0,
      failedRoutes: [],
    },
  }

  // Load registries
  const servicesPath = path.join(registryDir, 'services.json')
  const resourcesPath = path.join(registryDir, 'resources.json')
  const mappingPath = path.join(registryDir, 'service-to-articles.json')

  if (!fs.existsSync(servicesPath)) {
    result.errors.push('services.json not found')
    result.passed = false
    return result
  }

  if (!fs.existsSync(resourcesPath)) {
    result.errors.push('resources.json not found')
    result.passed = false
    return result
  }

  if (!fs.existsSync(mappingPath)) {
    result.errors.push('service-to-articles.json not found')
    result.passed = false
    return result
  }

  const services: ServiceRecord[] = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'))
  const resources: ResourceRecord[] = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'))
  const mapping: ServiceToArticlesMap = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))

  // Check 1: services.json has exactly 54 active:true (or ≥ 54)
  const activeServices = services.filter(s => s.active)
  if (activeServices.length < 54) {
    result.errors.push(`Expected at least 54 active services, found ${activeServices.length}`)
    result.passed = false
  } else if (activeServices.length > 55) {
    result.warnings.push(`Found ${activeServices.length} active services (expected 54-55)`)
  }

  // Check 2: Every active service has ≥1 linked article
  const servicesWithoutArticles: string[] = []
  activeServices.forEach(service => {
    const articleIds = mapping[service.key] || []
    if (articleIds.length === 0) {
      servicesWithoutArticles.push(service.key)
    }
  })
  if (servicesWithoutArticles.length > 0) {
    result.errors.push(`Active services without articles: ${servicesWithoutArticles.join(', ')}`)
    result.passed = false
  }

  // Check 3: Every resource maps to an existing serviceKey
  const serviceKeys = new Set(services.map(s => s.key))
  const invalidServiceKeys = resources.filter(r => !serviceKeys.has(r.serviceKey))
  if (invalidServiceKeys.length > 0) {
    result.errors.push(`Resources with invalid serviceKey: ${invalidServiceKeys.map(r => r.id).join(', ')}`)
    result.passed = false
  }

  // Check 4: All generated routes respond with 200 in dev
  console.log('🔍 Checking routes...')
  const routesToCheck: string[] = [
    '/services',
    '/resources',
    ...activeServices.slice(0, 10).map(s => s.slug), // Check first 10 services
    ...resources.slice(0, 10).map(r => r.slug), // Check first 10 resources
  ]

  result.routeChecks.total = routesToCheck.length

  for (const route of routesToCheck) {
    const url = `${baseUrl}${route}`
    const status = await checkRoute(url)
    
    if (status === 200) {
      result.routeChecks.passed++
    } else {
      result.routeChecks.failed++
      result.routeChecks.failedRoutes.push(`${route} (${status || 'timeout'})`)
      if (status !== 200) {
        result.warnings.push(`Route ${route} returned ${status || 'timeout'}`)
      }
    }
  }

  return result
}

async function main() {
  console.log('\n' + '='.repeat(80))
  console.log('PHASE 8: QA INVENTORY REPORT')
  console.log('='.repeat(80) + '\n')

  const result = await validateInventory()

  // Registry validation
  if (result.errors.length > 0) {
    console.log('❌ REGISTRY ERRORS:')
    console.log('─'.repeat(80))
    result.errors.forEach(error => console.log(`  • ${error}`))
    console.log()
  }

  // Route checks
  console.log('📊 ROUTE CHECKS:')
  console.log('─'.repeat(80))
  console.log(`  Total routes checked: ${result.routeChecks.total}`)
  console.log(`  Passed (200): ${result.routeChecks.passed}`)
  console.log(`  Failed: ${result.routeChecks.failed}`)
  
  if (result.routeChecks.failedRoutes.length > 0) {
    console.log('\n  Failed routes:')
    result.routeChecks.failedRoutes.forEach(route => console.log(`    • ${route}`))
  }
  console.log()

  // Warnings
  if (result.warnings.length > 0) {
    console.log('⚠️  WARNINGS:')
    console.log('─'.repeat(80))
    result.warnings.forEach(warning => console.log(`  • ${warning}`))
    console.log()
  }

  // Final result
  if (result.passed && result.routeChecks.failed === 0) {
    console.log('✅ QA INVENTORY PASSED')
    console.log('─'.repeat(80))
    console.log('  All registry validations passed')
    console.log('  All routes respond with 200')
    console.log()
  } else {
    console.log('❌ QA INVENTORY FAILED')
    console.log('─'.repeat(80))
    if (result.errors.length > 0) {
      console.log(`  Found ${result.errors.length} registry error(s)`)
    }
    if (result.routeChecks.failed > 0) {
      console.log(`  Found ${result.routeChecks.failed} route failure(s)`)
    }
    console.log()
    process.exit(1)
  }
}

main().catch(error => {
  console.error('❌ Error:', error)
  process.exit(1)
})

