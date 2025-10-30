export interface BreadcrumbItem {
  name: string
  item: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

export function generateArticleSchema({
  headline,
  description,
  author = 'SepticTankQuoteHub',
  publisher = 'SepticTankQuoteHub',
  datePublished,
  dateModified,
  image,
  url,
}: {
  headline: string
  description: string
  author?: string
  publisher?: string
  datePublished: string
  dateModified: string
  image?: string
  url: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished,
    dateModified,
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${siteUrl}${url}`,
    },
  }
}

export function generateServiceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed,
}: {
  name: string
  description: string
  url: string
  serviceType: string
  areaServed?: Array<{ '@type': string; name: string; containedIn?: { '@type': string; name: string } }> | string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  // Default Miami-Dade service area if not provided
  const defaultAreaServed = [
    { '@type': 'City', name: 'Miami', containedIn: { '@type': 'State', name: 'Florida' } },
    { '@type': 'City', name: 'Miami Beach', containedIn: { '@type': 'State', name: 'Florida' } },
    { '@type': 'City', name: 'Coral Gables', containedIn: { '@type': 'State', name: 'Florida' } },
    { '@type': 'City', name: 'Hialeah', containedIn: { '@type': 'State', name: 'Florida' } },
    { '@type': 'City', name: 'Homestead', containedIn: { '@type': 'State', name: 'Florida' } },
    { '@type': 'County', name: 'Miami-Dade County', containedIn: { '@type': 'State', name: 'Florida' } },
    { '@type': 'County', name: 'Broward County', containedIn: { '@type': 'State', name: 'Florida' } },
    { '@type': 'County', name: 'Palm Beach County', containedIn: { '@type': 'State', name: 'Florida' } },
  ]
  
  const resolvedAreaServed = areaServed || defaultAreaServed
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: {
      '@type': 'Organization',
      name: 'SepticTankQuoteHub',
      url: siteUrl,
    },
    areaServed: typeof resolvedAreaServed === 'string'
      ? { '@type': 'State', name: resolvedAreaServed }
      : resolvedAreaServed,
    description,
    url: url.startsWith('http') ? url : `${siteUrl}${url}`,
  }
}

export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateHowToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export function generateItemListSchema(items: Array<{ name: string; url: string }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
      name: item.name,
    })),
  }
}

export function generateOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SepticTankQuoteHub',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Our licensed technicians handle septic services in Miami-Dade & South Florida. Transparent estimates.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
  }
}

export function generateLocalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'

  // TODO: Add actual Miami address when available
  // Current address fields are placeholders
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Plumber'],
    name: 'SepticTankQuoteHub',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
      // TODO: Add streetAddress and postalCode when available
      streetAddress: '',
      postalCode: '',
    },
    areaServed: [
      // Miami-Dade cities
      { '@type': 'City', name: 'Miami', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Miami Beach', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Coral Gables', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Hialeah', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Homestead', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Kendall', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Doral', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Aventura', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'County', name: 'Miami-Dade County', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'County', name: 'Broward County', containedIn: { '@type': 'State', name: 'Florida' } },
      { '@type': 'County', name: 'Palm Beach County', containedIn: { '@type': 'State', name: 'Florida' } },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Septic Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Septic Tank Pumping',
            serviceType: 'Septic Tank Pumping',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Septic Cleaning',
            serviceType: 'Septic Cleaning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Septic Installation',
            serviceType: 'Septic Installation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Drain Field Repair',
            serviceType: 'Drain Field Repair',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Septic Inspections',
            serviceType: 'Septic Inspections',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Emergency Septic Service',
            serviceType: 'Emergency Septic Service',
          },
        },
      ],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    priceRange: '$$',
    // TODO: Add telephone and email when available
    telephone: '',
    email: '',
  }
}

/**
 * Loads LocalBusiness schema data from ops/schema/localbusiness.json
 * and allows optional service array override for page-specific services
 */
export function renderLocalBusiness(serviceOverrides?: Array<{ name: string }>) {
  // Load the base schema from JSON file
  const localBusinessData = require('../../ops/schema/localbusiness.json')

  // If service overrides are provided, replace the services array
  if (serviceOverrides && serviceOverrides.length > 0) {
    const updatedSchema = { ...localBusinessData }
    updatedSchema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Septic Services',
      itemListElement: serviceOverrides.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
        },
      })),
    }
    return updatedSchema
  }

  return localBusinessData
}

