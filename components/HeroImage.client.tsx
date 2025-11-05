'use client'

import { useState, useEffect } from 'react'

interface HeroImageProps {
  query: string
  alt?: string
}

export default function HeroImage({ query, alt = 'Hero image' }: HeroImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
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
        console.error('Failed to load hero image:', err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImage()
  }, [query])

  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-green/10 to-transparent" />
      </div>
    )
  }

  if (error || !imageUrl) {
    return null
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
      {/* 3D Effect Layers */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent-green via-green-500 to-accent-green opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-green/50 to-green-600/50 blur-md" />

      {/* Main Image Container with 3D Transform */}
      <div className="relative h-full transform transition-transform duration-500 group-hover:scale-[1.02]">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
        />

        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 via-transparent to-blue-900/20 mix-blend-overlay" />

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* 3D Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 shadow-inner pointer-events-none" />
    </div>
  )
}
