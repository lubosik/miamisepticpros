'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface StickyTOCProps {
  headings: Heading[]
}

export default function StickyTOC({ headings }: StickyTOCProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load TOC script only once
    if (!document.querySelector('script[src="/js/toc.js"]')) {
      const script = document.createElement('script')
      script.src = '/js/toc.js'
      script.async = true
      document.body.appendChild(script)

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="article-toc" aria-label="On this page" data-toc>
      <div className="article-toc-title">Table of contents</div>
      <ul className="article-toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`article-toc-item ${heading.level === 3 ? 'sub' : ''}`}
          >
            <a
              href={`#${heading.id}`}
              className="article-toc-link"
              aria-current={activeId === heading.id ? 'true' : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

