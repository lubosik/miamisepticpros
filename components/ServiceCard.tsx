import Link from 'next/link'

interface ServiceCardProps {
  title: string
  icon?: string
  description: string
  href: string
  excerpt?: string
  updated?: string
}

export default function ServiceCard({ title, icon, description, href, excerpt, updated }: ServiceCardProps) {
  // Truncate description to 80 characters for digestibility
  const shortDescription = (excerpt || description).substring(0, 80).replace(/\s+\S*$/, '') + '...'
  
  return (
    <Link
      href={href}
      className="block rounded-lg border-2 border-border-light bg-white p-5 hover:border-accent-green hover:shadow-md transition-all group"
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="text-lg font-bold text-primary-navy mb-2 group-hover:text-accent-green transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-text leading-relaxed">{shortDescription}</p>
      <p className="text-xs text-accent-green font-semibold mt-3">Learn More →</p>
    </Link>
  )
}

