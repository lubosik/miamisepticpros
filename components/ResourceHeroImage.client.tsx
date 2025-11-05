'use client'

import { useState, useEffect } from 'react'

interface ResourceHeroImageProps {
  city: string
  service: string
  alt?: string
}

export default function ResourceHeroImage({ city, service, alt }: ResourceHeroImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Create a search query based on the service and city
        const query = `${service.replace(/-/g, ' ')} truck professional ${city} Florida`
        const response = await fetch(
          `/api/unsplash-image?query=${encodeURIComponent(query)}&w=1200&h=600`
        )
        const data = await response.json()

        if (data.url) {
          setImageUrl(data.url)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Failed to load resource hero image:', err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImage()
  }, [city, service])

  if (isLoading) {
    return (
      <div className="relative w-full h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg animate-pulse mb-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-green/10 to-transparent" />
      </div>
    )
  }

  if (error || !imageUrl) {
    return null
  }

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mb-8 group">
      {/* Subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-green/30 to-green-600/30 blur-sm" />

      {/* Main Image Container */}
      <div className="relative h-full">
        <img
          src={imageUrl}
          alt={alt || `${service} in ${city}, Florida`}
          className="w-full h-full object-cover"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
        />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Subtle color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-transparent to-blue-900/10 mix-blend-overlay" />
      </div>

      {/* Border Effect */}
      <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />
    </div>
  )
}
