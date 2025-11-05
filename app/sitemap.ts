import { MetadataRoute } from 'next'
import { getAllServices, getAllResources } from '@/lib/content/registry'
import { getAllStates, getLocationsByState } from '@/lib/content/locations'
import { getAllIssues } from '@/lib/content/issues'
import { getAllCostGuides } from '@/lib/content/costs'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const baseDate = new Date()

  const urls: MetadataRoute.Sitemap = []

  // Static pages
  urls.push({
    url: siteUrl,
    lastModified: baseDate,
    changeFrequency: 'daily',
    priority: 1.0,
  })

  // Hub pages
  const hubPages = [
    { path: '/services', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/locations', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/resources', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/issues', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/costs', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/miami/services', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/miami/services/septic-system-service', changefreq: 'weekly' as const, priority: 0.7 },
    { path: '/miami/services/septic-system-contractor', changefreq: 'weekly' as const, priority: 0.7 },
    { path: '/miami/services/drainage-contractor', changefreq: 'weekly' as const, priority: 0.7 },
    { path: '/miami/services/sewage-treatment-service', changefreq: 'weekly' as const, priority: 0.7 },
    { path: '/quote', changefreq: 'monthly' as const, priority: 0.6 },
    { path: '/privacy', changefreq: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changefreq: 'yearly' as const, priority: 0.3 },
  ]

  hubPages.forEach(({ path, changefreq, priority }) => {
    urls.push({
      url: `${siteUrl}${path}`,
      lastModified: baseDate,
      changeFrequency: changefreq,
      priority,
    })
  })

  // Service detail pages (from registry)
  try {
    const services = getAllServices()
    services.forEach((service) => {
      urls.push({
        url: `${siteUrl}${service.slug}`,
        lastModified: service.updated ? new Date(service.updated) : baseDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error('Error loading services for sitemap:', error)
  }

  // Resource detail pages (from registry)
  try {
    const resources = getAllResources()
    resources.forEach((resource) => {
      urls.push({
        url: `${siteUrl}${resource.slug}`,
        lastModified: resource.updated ? new Date(resource.updated) : baseDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error('Error loading resources for sitemap:', error)
  }

  // State landing pages
  try {
    const states = getAllStates()
    states.forEach((stateCode) => {
      urls.push({
        url: `${siteUrl}/locations/${stateCode.toLowerCase()}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  } catch (error) {
    console.error('Error loading states for sitemap:', error)
  }

  // City landing pages
  try {
    const states = getAllStates()
    states.forEach((stateCode) => {
      const locations = getLocationsByState(stateCode)
      locations.forEach((location) => {
        urls.push({
          url: `${siteUrl}/locations/${stateCode.toLowerCase()}/${location.slug}`,
          lastModified: baseDate,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      })
    })
  } catch (error) {
    console.error('Error loading locations for sitemap:', error)
  }

  // Issue pages
  try {
    const issues = getAllIssues()
    issues.forEach(({ slug }) => {
      urls.push({
        url: `${siteUrl}/issues/${slug}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error('Error loading issues for sitemap:', error)
  }

  // Cost guide pages
  try {
    const costGuides = getAllCostGuides()
    costGuides.forEach(({ slug }) => {
      urls.push({
        url: `${siteUrl}/costs/${slug}`,
        lastModified: baseDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error('Error loading cost guides for sitemap:', error)
  }

  return urls
}
