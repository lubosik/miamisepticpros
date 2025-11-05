#!/usr/bin/env tsx
/**
 * Phase 1: Validate Registries
 * Ensures all registries are consistent and complete
 */

import fs from 'fs'
import path from 'path'
import type { ServiceRecord, ResourceRecord, ServiceToArticlesMap } from '../types/content'

const registryDir = path.join(process.cwd(), 'data/registry')

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

function validateRegistries(): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  }
  
  // Load registries
  const servicesPath = path.join(registryDir, 'services.json')
  const resourcesPath = path.join(registryDir, 'resources.json')
  const mappingPath = path.join(registryDir, 'service-to-articles.json')
  
  if (!fs.existsSync(servicesPath)) {
    result.errors.push('services.json not found')
    result.valid = false
    return result
  }
  
  if (!fs.existsSync(resourcesPath)) {
    result.errors.push('resources.json not found')
    result.valid = false
    return result
  }
  
  if (!fs.existsSync(mappingPath)) {
    result.errors.push('service-to-articles.json not found')
    result.valid = false
    return result
  }
  
  const services: ServiceRecord[] = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'))
  const resources: ResourceRecord[] = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'))
  const mapping: ServiceToArticlesMap = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))
  
  // Check 1: All ResourceRecord.serviceKey must exist in services.json
  const serviceKeys = new Set(services.map(s => s.key))
  const invalidServiceKeys = resources.filter(r => !serviceKeys.has(r.serviceKey))
  if (invalidServiceKeys.length > 0) {
    result.errors.push(`Resources with invalid serviceKey: ${invalidServiceKeys.map(r => r.id).join(', ')}`)
    result.valid = false
  }
  
  // Check 2: No duplicate slugs in services
  const serviceSlugs = new Map<string, string>()
  const duplicateServiceSlugs: string[] = []
  services.forEach(s => {
    if (serviceSlugs.has(s.slug)) {
      duplicateServiceSlugs.push(s.slug)
    }
    serviceSlugs.set(s.slug, s.key)
  })
  if (duplicateServiceSlugs.length > 0) {
    result.errors.push(`Duplicate service slugs: ${duplicateServiceSlugs.join(', ')}`)
    result.valid = false
  }
  
  // Check 3: No duplicate slugs in resources
  const resourceSlugs = new Map<string, string>()
  const duplicateResourceSlugs: string[] = []
  resources.forEach(r => {
    if (resourceSlugs.has(r.slug)) {
      duplicateResourceSlugs.push(r.slug)
    }
    resourceSlugs.set(r.slug, r.id)
  })
  if (duplicateResourceSlugs.length > 0) {
    result.errors.push(`Duplicate resource slugs: ${duplicateResourceSlugs.join(', ')}`)
    result.valid = false
  }
  
  // Check 4: Each ServiceRecord.active === true has ≥ 1 linked article
  const activeServices = services.filter(s => s.active)
  const servicesWithoutArticles: string[] = []
  activeServices.forEach(service => {
    const articleIds = mapping[service.key] || []
    if (articleIds.length === 0) {
      servicesWithoutArticles.push(service.key)
    }
  })
  if (servicesWithoutArticles.length > 0) {
    result.errors.push(`Active services without articles: ${servicesWithoutArticles.join(', ')}`)
    result.valid = false
  }
  
  // Check 5: All mapping entries reference valid resource IDs
  const resourceIds = new Set(resources.map(r => r.id))
  const invalidMappingEntries: string[] = []
  Object.entries(mapping).forEach(([serviceKey, articleIds]) => {
    articleIds.forEach(articleId => {
      if (!resourceIds.has(articleId)) {
        invalidMappingEntries.push(`${serviceKey}:${articleId}`)
      }
    })
  })
  if (invalidMappingEntries.length > 0) {
    result.errors.push(`Mapping entries reference invalid resource IDs: ${invalidMappingEntries.join(', ')}`)
    result.valid = false
  }
  
  // Check 6: All resources are referenced in mapping
  const mappedResourceIds = new Set<string>()
  Object.values(mapping).forEach(ids => ids.forEach(id => mappedResourceIds.add(id)))
  const unmappedResources = resources.filter(r => !mappedResourceIds.has(r.id))
  if (unmappedResources.length > 0) {
    result.warnings.push(`Resources not in mapping: ${unmappedResources.map(r => r.id).join(', ')}`)
  }
  
  // Check 7: Count of active services (should be 54)
  const activeCount = activeServices.length
  if (activeCount !== 54) {
    result.warnings.push(`Expected 54 active services, found ${activeCount}`)
  }
  
  return result
}

function main() {
  console.log('\n' + '='.repeat(80))
  console.log('PHASE 1: VALIDATION REPORT')
  console.log('='.repeat(80) + '\n')
  
  const result = validateRegistries()
  
  if (result.errors.length > 0) {
    console.log('❌ ERRORS FOUND:')
    console.log('─'.repeat(80))
    result.errors.forEach(error => console.log(`  • ${error}`))
    console.log()
  }
  
  if (result.warnings.length > 0) {
    console.log('⚠️  WARNINGS:')
    console.log('─'.repeat(80))
    result.warnings.forEach(warning => console.log(`  • ${warning}`))
    console.log()
  }
  
  if (result.valid && result.errors.length === 0) {
    console.log('✅ VALIDATION PASSED')
    console.log('─'.repeat(80))
    console.log('  All registries are consistent and complete.')
    console.log()
    
    // Print counts
    const servicesPath = path.join(registryDir, 'services.json')
    const resourcesPath = path.join(registryDir, 'resources.json')
    const mappingPath = path.join(registryDir, 'service-to-articles.json')
    
    const services: ServiceRecord[] = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'))
    const resources: ResourceRecord[] = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'))
    const mapping: ServiceToArticlesMap = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))
    
    console.log('📊 COUNTS:')
    console.log(`  Services: ${services.length}`)
    console.log(`  Active services: ${services.filter(s => s.active).length}`)
    console.log(`  Resources: ${resources.length}`)
    console.log(`  Service mappings: ${Object.keys(mapping).length}`)
    console.log(`  Services with articles: ${Object.values(mapping).filter(ids => ids.length > 0).length}`)
    console.log()
  } else {
    console.log('❌ VALIDATION FAILED')
    console.log('─'.repeat(80))
    console.log(`  Found ${result.errors.length} error(s)`)
    console.log()
    process.exit(1)
  }
}

main()

