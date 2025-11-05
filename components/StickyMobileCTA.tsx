'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StickyMobileCTA() {
  const pathname = usePathname()
  
  // Don't show on book page or thank-you page
  if (pathname === '/book' || pathname === '/book/thank-you') {
    return null
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-white border-t border-border-light shadow-lg z-50 p-4">
      <Link
        href="/book"
        className="block w-full bg-accent-green text-white text-center font-sans-ui font-semibold py-3 px-6 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md"
      >
        Get a Fast Septic Quote
      </Link>
    </div>
  )
}

