'use client'

import { ReactNode } from 'react'
import ArticleHero from './ArticleHero'
import StickyTOC from './StickyTOC'
import Callout from './Callout'
import VerifiedBanner from './VerifiedBanner'
import Sources from './Sources'
import Breadcrumbs from './Breadcrumbs'
import FAQAccordion from './FAQAccordion'
import ArticleCTA from './ArticleCTA'

interface Heading {
  id: string
  text: string
  level: number
}

interface Source {
  title: string
  url: string
}

interface CheckatradeArticleLayoutProps {
  children: ReactNode
  title: string
  breadcrumbs?: Array<{ label: string; href: string }>
  category?: string
  formattedDate?: string | null
  byline?: string
  headings: Heading[]
  atAGlance?: Array<{ label: string; value: string }>
  thisArticleCovers?: string[]
  verifiedBanner?: {
    mainText: string
    subText?: string
  }
  sources?: Source[]
  faqs?: Array<{ question: string; answer: string }>
}

export default function CheckatradeArticleLayout({
  children,
  title,
  breadcrumbs = [],
  category,
  formattedDate,
  byline,
  headings,
  atAGlance,
  thisArticleCovers,
  verifiedBanner,
  sources = [],
  faqs = [],
}: CheckatradeArticleLayoutProps) {
  // Script loading is handled in StickyTOC component to avoid duplication

  return (
    <>
      {breadcrumbs.length > 0 && (
        <div className="max-w-1200 mx-auto px-6 pt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      <ArticleHero
        category={category}
        title={title}
        formattedDate={formattedDate}
        byline={byline}
      />

      <div className="article-container">
        <main className="article-main">
          {verifiedBanner && (
            <VerifiedBanner
              mainText={verifiedBanner.mainText}
              subText={verifiedBanner.subText}
            />
          )}

          {thisArticleCovers && thisArticleCovers.length > 0 && (
            <Callout type="this-article-covers" title="This article can help you understand">
              <ol className="article-callout-list">
                {thisArticleCovers.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </Callout>
          )}

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

          {typeof children === 'string' ? (
            <div 
              dangerouslySetInnerHTML={{ __html: children }} 
              suppressHydrationWarning
            />
          ) : (
            children
          )}

          {faqs.length > 0 && (
            <section className="faq-section" aria-labelledby="faq-heading">
              <h2 id="faq-heading">Frequently Asked Questions</h2>
              <FAQAccordion faqs={faqs} />
            </section>
          )}

          <ArticleCTA serviceName={title.replace(' in Miami, FL', '').replace(' | Miami Septic Pros', '')} />

          {sources.length > 0 && <Sources sources={sources} />}
        </main>

        <aside>
          <StickyTOC headings={headings} />
        </aside>
      </div>
    </>
  )
}

