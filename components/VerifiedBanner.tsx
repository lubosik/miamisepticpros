'use client'

interface VerifiedBannerProps {
  mainText: string
  subText?: string
}

export default function VerifiedBanner({
  mainText,
  subText,
}: VerifiedBannerProps) {
  return (
    <div className="article-verified-banner" role="status" aria-live="polite">
      <div className="article-verified-icon" aria-hidden="true">
        ✓
      </div>
      <div>
        <div className="article-verified-text">{mainText}</div>
        {subText && (
          <div className="article-verified-subtext">{subText}</div>
        )}
      </div>
    </div>
  )
}

