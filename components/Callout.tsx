'use client'

interface CalloutProps {
  type?: 'at-a-glance' | 'this-article-covers'
  title: string
  children: React.ReactNode
}

export default function Callout({
  type = 'at-a-glance',
  title,
  children,
}: CalloutProps) {
  const className = `article-callout ${type === 'at-a-glance' ? 'at-a-glance' : ''}`

  return (
    <aside className={className} role="complementary" aria-labelledby={`callout-${type}`}>
      <h3 id={`callout-${type}`} className="article-callout-title">
        {title}
      </h3>
      {children}
    </aside>
  )
}

