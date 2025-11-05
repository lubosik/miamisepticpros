/**
 * Registry loaders for services and resources
 * Reads from data/registry/*.json
 */

import fs from 'fs'
import path from 'path'
import type { ServiceRecord, ResourceRecord, ServiceToArticlesMap } from '@/types/content'

const registryDir = path.join(process.cwd(), 'data/registry')

let servicesCache: ServiceRecord[] | null = null
let resourcesCache: ResourceRecord[] | null = null
let mappingCache: ServiceToArticlesMap | null = null

export function getAllServices(): ServiceRecord[] {
  if (servicesCache) return servicesCache.filter(s => s.active)
  
  const filePath = path.join(registryDir, 'services.json')
  if (!fs.existsSync(filePath)) {
    return []
  }
  
  servicesCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  if (!servicesCache) return []
  return servicesCache.filter(s => s.active)
}

export function getService(key: string): ServiceRecord | null {
  const services = getAllServices()
  return services.find(s => s.key === key) || null
}

export function getAllResources(): ResourceRecord[] {
  if (resourcesCache) return resourcesCache
  
  const filePath = path.join(registryDir, 'resources.json')
  if (!fs.existsSync(filePath)) {
    return []
  }
  
  resourcesCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  if (!resourcesCache) return []
  return resourcesCache
}

export function getResource(id: string): ResourceRecord | null {
  const resources = getAllResources()
  return resources.find(r => r.id === id) || null
}

export function getResourceBySlug(slug: string): ResourceRecord | null {
  const resources = getAllResources()
  return resources.find(r => r.slug === slug) || null
}

export function getResourcesForService(serviceKey: string): ResourceRecord[] {
  const mapping = getServiceToArticlesMapping()
  const articleIds = mapping[serviceKey] || []
  const resources = getAllResources()
  return resources.filter(r => articleIds.includes(r.id))
}

export function getServiceToArticlesMapping(): ServiceToArticlesMap {
  if (mappingCache) return mappingCache
  
  const filePath = path.join(registryDir, 'service-to-articles.json')
  if (!fs.existsSync(filePath)) {
    return {}
  }
  
  mappingCache = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  if (!mappingCache) return {}
  return mappingCache
}

export function getServicesByCategory(): Record<string, ServiceRecord[]> {
  const services = getAllServices()
  const grouped: Record<string, ServiceRecord[]> = {}
  
  for (const service of services) {
    if (!grouped[service.category]) {
      grouped[service.category] = []
    }
    grouped[service.category].push(service)
  }
  
  return grouped
}

