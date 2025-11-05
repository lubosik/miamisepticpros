// lib/services.manifest.json
// Generated manifest of all services for Phase D
// Format: [{"slug":"service-key","title":"Service Name","updated":"2025-10-30"}]

import { getAllServices } from './content/registry'

export function getServicesManifest() {
  const services = getAllServices()
  return services.map(service => ({
    slug: service.key,
    title: service.name,
    updated: service.updated || '2025-10-30',
  }))
}

