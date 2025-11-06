// components/layouts/CheckatradeArticleLayout.tsx
import StickyTOC from '../StickyTOC'
import type { ReactNode } from 'react'

export default function CheckatradeArticleLayout({
  title,
  subtitle,
  updated,
  heroSrc,
  tocItems,
  children,
}: {
  title: string
  subtitle?: string
  updated?: string
  heroSrc?: string
  tocItems?: Array<{ id: string; text: string }>
  children: ReactNode
}) {
  return (
    <div>
      <header className="bg-[#ff4d4f] text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 grid gap-6 md:grid-cols-[1.25fr,1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-90">Service Guides</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight">{title}</h1>
            {subtitle && <p className="mt-4 text-lg md:text-xl opacity-95">{subtitle}</p>}
            {updated && <p className="mt-3 text-sm opacity-90">Updated {updated}</p>}
          </div>
          {heroSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroSrc} alt="" className="hidden md:block rounded-xl w-full h-auto object-cover" />
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 grid gap-10 md:grid-cols-[1fr,320px]">
        <article className="prose prose-lg max-w-none">{children}</article>
        {tocItems && tocItems.length > 0 ? <StickyTOC items={tocItems} /> : null}
      </main>
    </div>
  )
}
