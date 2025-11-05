'use client'

import { useState, useEffect } from 'react'

interface ResourceImageProps {
  src?: string
  alt: string
  className?: string
}

export default function ResourceImage({ src, alt, className }: ResourceImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Fetch from Unsplash immediately based on article title
    const loadImage = async () => {
      setIsLoading(true)
      setHasError(false)
      
      // Extract relevant keywords from alt/title for Unsplash search
      // Remove common words like "in Miami", "Miami", "Florida", "guide", "service", "services"
      const searchTerms = alt.toLowerCase()
        .replace(/in miami|miami|florida|guide|service|services|complete guide to|installation|repair|replacement|costs?|and|&/gi, '')
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 2) // Remove very short words
        .slice(0, 4) // Take first 4 meaningful words
        .join(' ') || 'septic tank service'
      
      try {
        // Fetch from Unsplash API immediately
        const response = await fetch(`/api/unsplash-image?query=${encodeURIComponent(searchTerms)}&w=800&h=600`)
        const data = await response.json()
        if (data.url) {
          setImageSrc(data.url)
          setIsLoading(false)
        } else {
          // Fallback to generic septic service image
          setImageSrc(`https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop`)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to load resource image:', error)
        // Fallback to generic septic service image
        setImageSrc(`https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop`)
        setIsLoading(false)
      }
    }

    loadImage()
  }, [src, alt])

  const handleError = async (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && imageSrc) {
      // Extract relevant keywords from alt/title for Unsplash search
      const searchTerms = alt.toLowerCase()
        .replace(/in miami|miami|florida|guide|service|services|complete guide to|installation|repair|replacement|costs?|and|&/gi, '')
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 2)
        .slice(0, 4)
        .join(' ') || 'septic tank service'
      
      try {
        const response = await fetch(`/api/unsplash-image?query=${encodeURIComponent(searchTerms)}&w=800&h=600`)
        const data = await response.json()
        if (data.url) {
          setImageSrc(data.url)
          setHasError(true)
          e.currentTarget.onerror = null // Prevent infinite loop
        } else {
          // Ultimate fallback
          setImageSrc(`https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop`)
          setHasError(true)
        }
      } catch (error) {
        // Ultimate fallback
        setImageSrc(`https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop`)
        setHasError(true)
      }
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (!imageSrc) {
    return (
      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-surface-gray-50 flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <span className="text-muted-text text-small z-10">Loading image...</span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-surface-gray-50">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className={className || 'w-full h-full object-cover'}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}

