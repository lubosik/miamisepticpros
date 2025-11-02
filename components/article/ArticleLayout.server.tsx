import React from 'react'
import type { ReactNode } from 'react'
import Toc from './Toc.client'
import Breadcrumbs from '../Breadcrumbs'
import Callout from '../Callout'
import VerifiedBanner from '../VerifiedBanner'
import Sources from '../Sources'
import ArticleCTA from '../ArticleCTA'
import FAQAccordion from '../FAQAccordion'
import { extractHeadings } from '@/lib/articles/heading-extract'

export type Heading = {
  id: string
  text: string
  level: 2 | 3
}

export type Source = {
  title: string
  url: string
}

export type FAQ = {
  question: string
  answer: string
}

type ArticleLayoutProps = {
  slug: string
  title: string
  updatedISO: string // ISO date string from server (no locale drift)
  category?: string
  byline?: string
  heroUrl?: string
  heroAlt?: string
  contentHtml: string // Sanitized HTML from MD/MDX pipeline
  breadcrumbs: Array<{ href: string; label: string }>
  atAGlance?: Array<{ label: string; value: string }>
  thisArticleCovers?: string[]
  verifiedBanner?: {
    mainText: string
    subText?: string
  }
  sources?: Source[]
  faqs?: FAQ[]
}

/**
 * SSR-first article layout - always renders the same structure on server and client
 * Client components only enhance, never change structure
 */
export default function ArticleLayout({
  slug,
  title,
  updatedISO,
  category,
  byline,
  heroUrl,
  heroAlt,
  contentHtml,
  breadcrumbs,
  atAGlance,
  thisArticleCovers,
  verifiedBanner,
  sources = [],
  faqs = [],
}: ArticleLayoutProps) {
  // Extract headings on the server so TOC structure is deterministic
  const headings = extractHeadings(contentHtml)
  
  // Format date from ISO string (consistent on server and client)
  const formatDateFromISO = (iso: string): string => {
    try {
      const date = new Date(iso)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    } catch {
      return iso.slice(0, 10) // Fallback to YYYY-MM-DD
    }
  }
  
  const formattedDate = formatDateFromISO(updatedISO)
  const dateDisplay = updatedISO.slice(0, 10) // YYYY-MM-DD for <time>

  return (
    <div className="fe-article">
      {/* Breadcrumbs - always render if provided */}
      {breadcrumbs.length > 0 && (
        <div className="max-w-1200 mx-auto px-6 pt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      {/* Hero section - always render as <section> */}
      <section className="article-hero-band" data-static aria-label="Article header">
        <div className="article-hero-container">
          <div className="article-hero-content">
            {category && (
              <div className="article-hero-category">{category}</div>
            )}
            <h1 className="article-hero-title">{title}</h1>
            <div className="article-hero-meta">
              <div className="article-hero-date">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block mr-1"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M5 2V6M11 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>
                  Updated <time dateTime={updatedISO}>{formattedDate}</time>
                </span>
              </div>
              {byline && (
                <div className="article-hero-byline">By: {byline}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main article grid - always render both main and aside */}
      <div className="article-container">
        <main className="article-main" id="main">
          {/* Verified Banner - render always (empty if not provided) */}
          {verifiedBanner && (
            <VerifiedBanner
              mainText={verifiedBanner.mainText}
              subText={verifiedBanner.subText}
            />
          )}

          {/* This Article Covers - render always (empty if not provided) */}
          {thisArticleCovers && thisArticleCovers.length > 0 && (
            <Callout type="this-article-covers" title="This article can help you understand">
              <ol className="article-callout-list">
                {thisArticleCovers.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </Callout>
          )}

          {/* At a Glance - render always (empty if not provided) */}
          {atAGlance && atAGlance.length > 0 && (
            <Callout type="at-a-glance" title="At a glance">
              <ul>
                {atAGlance.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>
            </Callout>
          )}

          {/* Article body - always render as <section> with same structure */}
          <section className="article-body" data-static>
            <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </section>

          {/* FAQ section - ALWAYS render <section> with same structure to prevent hydration mismatch */}
          <section className="faq-section" aria-labelledby="faq-heading" data-static>
            <h2 id="faq-heading" className={faqs.length === 0 ? 'sr-only' : ''}>
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>

          {/* CTA - always render */}
          <ArticleCTA serviceName={title.replace(' in Miami, FL', '').replace(' | Miami Septic Pros', '')} />

          {/* Sources - always render to maintain structure */}
          <Sources sources={sources} />
        </main>

        {/* Right rail TOC - always render nav structure, client enhances */}
        <aside className="article-toc-rail" aria-label="Table of contents">
          <nav data-fe-toc className="article-toc">
            <div className="article-toc-title">Table of contents</div>
            {headings.length > 0 ? (
              <ul className="article-toc-list">
                {headings.map((h) => (
                  <li
                    key={h.id}
                    className={`article-toc-item ${h.level === 3 ? 'sub' : ''}`}
                  >
                    <a href={`#${h.id}`} className="article-toc-link">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="article-toc-list" aria-hidden="true">
                <li></li>
              </ul>
            )}
          </nav>
          {/* Client-side scroll spy enhancer - doesn't alter structure */}
          <Toc headings={headings} />
        </aside>
      </div>
    </div>
  )
}
