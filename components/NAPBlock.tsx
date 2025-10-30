import localBusinessData from '../ops/schema/localbusiness.json'

interface NAPBlockProps {
  variant?: 'default' | 'compact'
  className?: string
}

/**
 * NAP Block Component - Displays business Name, Address, Phone from localbusiness.json
 * This component ensures consistent business information across the site
 */
export default function NAPBlock({ variant = 'default', className = '' }: NAPBlockProps) {
  const business = localBusinessData

  // Extract data from localbusiness.json
  const name = business.name
  const address = business.address
  const phone = business.telephone
  const email = business.email

  // Format address string
  const addressString = [
    address.streetAddress,
    address.addressLocality,
    address.addressRegion,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(', ')

  if (variant === 'compact') {
    return (
      <div className={`text-small ${className}`}>
        <p className="font-semibold text-charcoal">{name}</p>
        {addressString && <p className="text-muted-text">{addressString}</p>}
        {phone && (
          <p>
            <a
              href={`tel:${phone}`}
              className="text-accent-green hover:text-accent-green-hover"
            >
              {phone}
            </a>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <h3 className="text-h4 font-serif-headings font-semibold text-charcoal mb-2">
          {name}
        </h3>
      </div>

      {addressString && (
        <div>
          <p className="text-body-sm font-semibold text-charcoal mb-1">Address</p>
          <p className="text-body text-body-text">{addressString || 'Address TBD'}</p>
        </div>
      )}

      {phone && (
        <div>
          <p className="text-body-sm font-semibold text-charcoal mb-1">Phone</p>
          <a
            href={`tel:${phone}`}
            className="text-body text-accent-green hover:text-accent-green-hover font-semibold"
          >
            {phone}
          </a>
        </div>
      )}

      {email && (
        <div>
          <p className="text-body-sm font-semibold text-charcoal mb-1">Email</p>
          <a
            href={`mailto:${email}`}
            className="text-body text-accent-green hover:text-accent-green-hover"
          >
            {email}
          </a>
        </div>
      )}

      <div>
        <p className="text-body-sm font-semibold text-charcoal mb-1">Service Area</p>
        <p className="text-body text-body-text">
          {address.addressLocality && address.addressRegion
            ? `${address.addressLocality}, ${address.addressRegion} and surrounding areas`
            : 'South Florida'}
        </p>
        <p className="text-small text-muted-text mt-1">
          Serving Miami-Dade County, Broward County, and Palm Beach County
        </p>
      </div>
    </div>
  )
}
