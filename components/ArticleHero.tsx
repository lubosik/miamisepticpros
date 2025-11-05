'use client'

interface ArticleHeroProps {
  category?: string
  title: string
  formattedDate?: string | null
  byline?: string
}

export default function ArticleHero({
  category = 'COST GUIDES',
  title,
  formattedDate,
  byline = 'Miami Septic Pros',
}: ArticleHeroProps) {

  return (
    <div className="article-hero-band">
      <div className="article-hero-container">
        <div className="article-hero-content">
          {category && (
            <div className="article-hero-category">{category}</div>
          )}
          <h1 className="article-hero-title">{title}</h1>
          {formattedDate && (
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
                <span>Updated {formattedDate}</span>
              </div>
              {byline && (
                <div className="article-hero-byline">By: {byline}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

