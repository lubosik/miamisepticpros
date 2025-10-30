'use client'

import Link from 'next/link'

export default function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-white border-t border-border-light shadow-lg z-50 p-4">
      <Link
        href="/quote"
        className="block w-full bg-accent-green text-white text-center font-sans-ui font-semibold py-3 px-6 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md"
      >
        Get Free Quote
      </Link>
    </div>
  )
}

