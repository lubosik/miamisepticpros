import Link from 'next/link'

interface LocationCardProps {
  city: string
  state: string
  serviceCount?: number
  href: string
}

export default function LocationCard({ city, state, serviceCount, href }: LocationCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-charcoal mb-2">
        {city}, {state}
      </h3>
      {serviceCount !== undefined && (
        <p className="text-small text-muted-text">{serviceCount} services available</p>
      )}
    </Link>
  )
}

