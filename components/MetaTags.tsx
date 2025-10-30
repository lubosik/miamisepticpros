import { Metadata } from 'next'
import { DefaultSeo } from 'next-seo'

interface MetaTagsProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
}

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage = '/images/og-default.png',
  ogType = 'website',
  noindex = false,
}: MetaTagsProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://septictankquotehub.com'
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return {
    title: title.length > 60 ? `${title.substring(0, 57)}...` : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'SepticTankQuoteHub',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: ogType,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  }
}

