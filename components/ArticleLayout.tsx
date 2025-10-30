'use client'

import { ReactNode, useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import TOCAside from './TOCAside'
import RelatedLinks from './RelatedLinks'
import StickyMobileCTA from './StickyMobileCTA'
import './ProseStyles.css'

interface Heading {
  id: string
  text: string
  level: number
}

interface ArticleLayoutProps {
  children: ReactNode
  title: string
  breadcrumbs?: Array<{ label: string; href: string }>
  heroImage?: string
  relatedLinks?: Array<{ title: string; href: string }>
  headings?: Array<{ id: string; text: string; level: number }>
}

export default function ArticleLayout({
  children,
  title,
  breadcrumbs = [],
  heroImage,
  relatedLinks = [],
  headings: propHeadings = [],
}: ArticleLayoutProps) {
  const [headings, setHeadings] = useState<Heading[]>(propHeadings)
  const [ctaInjected, setCtaInjected] = useState(false)

  useEffect(() => {
    // Use prop headings if available, otherwise extract from DOM
    if (propHeadings.length > 0) {
      setHeadings(propHeadings)
      return
    }

    // Extract headings from the content
    const contentElement = document.querySelector('.prose-content')
    if (!contentElement) return

    const headingElements = contentElement.querySelectorAll('h2, h3')
    const extracted: Heading[] = []
    
    headingElements.forEach((el) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
      if (!el.id) el.id = id
      extracted.push({
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1)),
      })
    })

    setHeadings(extracted)

    // Inject inline CTA after second H2
    if (!ctaInjected && extracted.length >= 2 && extracted[0].level === 2) {
      const secondH2 = contentElement.querySelectorAll('h2')[1]
      if (secondH2 && secondH2.nextSibling) {
        const ctaDiv = document.createElement('aside')
        ctaDiv.className = 'cta-inline bg-surface-gray-50 border border-border-light rounded-md p-6 my-8 text-center'
        ctaDiv.innerHTML = `
          <p class="text-body-lg font-semibold text-charcoal mb-2">Need our septic team?</p>
          <p class="text-small text-muted-text mb-4">Get an upfront estimate from our licensed technicians in 60 seconds.</p>
          <a href="/quote" class="inline-block bg-accent-green text-white font-sans-ui font-semibold px-6 py-3 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md">
            Get My Septic Service Estimate
          </a>
        `
        secondH2.parentNode?.insertBefore(ctaDiv, secondH2.nextSibling)
        setCtaInjected(true)
      }
    }
  }, [ctaInjected, propHeadings])

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8">
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      </div>

      <h1 className="text-h1 font-serif-headings font-bold text-primary-navy mb-6">
        {title}
      </h1>

      {heroImage && (
        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={title}
            loading="lazy"
            className="w-full rounded-lg shadow-sm"
          />
        </div>
      )}

      {/* Mobile TOC */}
      <div className="lg:hidden">
        <TOCAside headings={headings} />
      </div>

      {/* Main content with desktop TOC */}
      <div className="flex gap-12">
        <article className="prose-content flex-1">
          {children}
          
          {relatedLinks.length > 0 && (
            <RelatedLinks links={relatedLinks} />
          )}
        </article>

        {/* Desktop TOC - Sticky */}
        <div className="hidden lg:block">
          <TOCAside headings={headings} />
        </div>
      </div>

      <StickyMobileCTA />
    </div>
  )
}

