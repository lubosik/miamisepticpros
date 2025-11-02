'use client'

import { useEffect } from 'react'

type Heading = { id: string; text: string; level: 2 | 3 }

/**
 * Client-side TOC enhancer - adds scroll spy without altering DOM structure
 * The nav structure is already rendered on the server; this just adds aria-current
 */
export default function Toc({ headings }: { headings: Heading[] }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Find all TOC links
    const links = Array.from(
      document.querySelectorAll('[data-fe-toc] a')
    ) as HTMLAnchorElement[]
    
    if (links.length === 0) return
    
    // Map heading IDs to their link elements
    const idToLink = new Map<string, HTMLAnchorElement>()
    links.forEach(a => {
      const href = a.getAttribute('href')
      if (href) {
        const id = href.slice(1) // Remove #
        idToLink.set(id, a)
      }
    })
    
    // Find all heading elements
    const observed = headings
      .map(h => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]
    
    if (observed.length === 0) return
    
    // Set up IntersectionObserver for scroll spy
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          const id = e.target.id
          const link = idToLink.get(id)
          if (!link) return
          
          if (e.isIntersecting) {
            // Remove aria-current from all links
            links.forEach(l => l.removeAttribute('aria-current'))
            // Set aria-current on active link
            link.setAttribute('aria-current', 'true')
          }
        })
      },
      {
        rootMargin: '0px 0px -65% 0px',
        threshold: 0.1,
      }
    )
    
    // Observe all headings
    observed.forEach(el => io.observe(el))
    
    return () => {
      io.disconnect()
    }
  }, [headings])

  // Return null - this component only enhances existing DOM
  return null
}
