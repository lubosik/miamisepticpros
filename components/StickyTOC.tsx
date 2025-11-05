'use client'

interface Heading {
  id: string
  text: string
  level?: number
}

interface StickyTOCProps {
  items: Array<{ id: string; text: string }>
}

export default function StickyTOC({ items }: StickyTOCProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <aside className="hidden md:block">
      <div className="sticky top-24 rounded-lg border p-4">
        <p className="text-sm font-semibold mb-3">Table of contents</p>
        <ul className="space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.id}>
              <a href={`#${i.id}`} className="hover:underline">
                {i.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

