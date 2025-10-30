import Link from 'next/link'

interface RelatedLinksProps {
  links: Array<{
    title: string
    href: string
  }>
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  if (links.length === 0) return null

  return (
    <section className="mt-16 pt-16 border-t border-border-light">
      <h2 className="text-h3 font-serif-headings font-semibold text-charcoal mb-6">
        Related Guides
      </h2>
      <ul className="space-y-3 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-body text-accent-green hover:text-accent-green-hover hover:underline transition-colors"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

