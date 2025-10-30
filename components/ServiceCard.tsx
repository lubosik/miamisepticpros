import Link from 'next/link'

interface ServiceCardProps {
  title: string
  icon?: string
  description: string
  href: string
}

export default function ServiceCard({ title, icon, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow"
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="text-xl font-semibold text-charcoal mb-2">{title}</h3>
      <p className="text-body text-muted-text">{description}</p>
    </Link>
  )
}

