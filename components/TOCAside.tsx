'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TOCAsideProps {
  headings: Heading[]
}

export default function TOCAside({ headings }: TOCAsideProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[]
      
      let current = ''
      for (const element of headingElements) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          current = element.id
        } else {
          break
        }
      }
      
      setActiveId(current || headings[0]?.id || '')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  if (headings.length === 0) return null

  return (
    <>
      {/* Mobile TOC - Collapsible accordion */}
      <details className="md:hidden mb-8 bg-surface-gray-50 border border-border-light rounded-md">
        <summary className="p-4 cursor-pointer font-sans-ui text-body font-semibold text-charcoal list-none">
          <span className="flex items-center justify-between">
            On this page
            <span className="text-muted-text">{isOpen ? '▲' : '▼'}</span>
          </span>
        </summary>
        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.level === 3 ? 'ml-4' : ''}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`text-small hover:text-accent-green transition-colors ${
                    activeId === heading.id
                      ? 'text-accent-green font-semibold'
                      : 'text-body-text'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>

      {/* Desktop TOC - Sticky right rail */}
      <aside className="hidden lg:block lg:w-60 lg:flex-shrink-0">
        <nav className="sticky top-8">
          <p className="text-small text-muted-text font-semibold uppercase mb-4">
            On this page
          </p>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.level === 3 ? 'ml-4' : ''}
              >
                <a
                  href={`#${heading.id}`}
                  className={`text-small hover:text-accent-green transition-colors ${
                    activeId === heading.id
                      ? 'text-accent-green font-semibold'
                      : 'text-body-text'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

