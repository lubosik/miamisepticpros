'use client'

import { useState, useEffect } from 'react'

interface LocationImageProps {
  src: string
  alt: string
  className?: string
  coordinates?: { latitude: number; longitude: number }
}

export default function LocationImage({ src, alt, className, coordinates }: LocationImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if local image exists, if not fetch from Unsplash immediately
    const loadImage = async () => {
      setIsLoading(true)
      setHasError(false)
      
      // Extract city name from alt text for Unsplash search
      const cityName = alt.split(',')[0].trim()
      const unsplashQuery = `${cityName} Florida city`
      
      try {
        // Try to fetch from Unsplash API immediately
        const response = await fetch(`/api/unsplash-image?query=${encodeURIComponent(unsplashQuery)}&w=800&h=600`)
        const data = await response.json()
        if (data.url) {
          setImageSrc(data.url)
          setIsLoading(false)
        } else {
          // Fallback to generic Florida image
          setImageSrc(`https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop`)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to load location image:', error)
        // Fallback to generic Florida image
        setImageSrc(`https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop`)
        setIsLoading(false)
      }
    }

    loadImage()
  }, [src, alt])

  const handleError = async (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && imageSrc) {
      // Extract city name from alt text for Unsplash search
      const cityName = alt.split(',')[0].trim()
      try {
        const response = await fetch(`/api/unsplash-image?query=${encodeURIComponent(cityName + ' Florida city')}&w=800&h=600`)
        const data = await response.json()
        if (data.url) {
          setImageSrc(data.url)
          setHasError(true)
          e.currentTarget.onerror = null // Prevent infinite loop
        } else {
          // Ultimate fallback
          setImageSrc(`https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop`)
          setHasError(true)
        }
      } catch (error) {
        // Ultimate fallback
        setImageSrc(`https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop`)
        setHasError(true)
      }
    }
  }

  if (!imageSrc) {
    return (
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <span className="text-muted-text text-small z-10">Loading image...</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      itemProp="image"
      {...(coordinates ? {
        'data-lat': coordinates.latitude,
        'data-lng': coordinates.longitude,
      } : {})}
    />
  )
}

