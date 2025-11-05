'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { ServiceRecord } from '@/types/content'
import ServiceCard from '@/components/ServiceCard'

interface ServiceFiltersProps {
  services: ServiceRecord[]
}

const ITEMS_PER_PAGE = 24

const categories = [
  { value: 'all', label: 'All Services' },
  { value: 'Septic system service', label: 'Septic System Service' },
  { value: 'Septic system contractor', label: 'Septic System Contractor' },
  { value: 'Drainage contractor', label: 'Drainage Contractor' },
  { value: 'Sewage treatment service', label: 'Sewage Treatment Service' },
] as const

export default function ServiceFilters({ services }: ServiceFiltersProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const currentCategory = searchParams?.get('category') || 'all'
  const currentPage = parseInt(searchParams?.get('p') || '1', 10)
  
  // Filter services by category
  const filteredServices = useMemo(() => {
    if (currentCategory === 'all') {
      return services
    }
    return services.filter(s => s.category === currentCategory)
  }, [services, currentCategory])
  
  // Paginate services
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE)
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredServices.slice(start, end)
  }, [filteredServices, currentPage])
  
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    params.delete('p') // Reset to page 1 when changing category
    router.push(`/services?${params.toString()}`)
  }
  
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (page === 1) {
      params.delete('p')
    } else {
      params.set('p', page.toString())
    }
    router.push(`/services?${params.toString()}`)
  }
  
  return (
    <>
      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-sm text-body font-semibold transition-colors ${
                currentCategory === cat.value
                  ? 'bg-accent-green text-white'
                  : 'bg-surface-white border border-border-light text-charcoal hover:bg-surface-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <p className="text-small text-muted-text mt-4">
          Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedServices.map((service) => (
          <ServiceCard
            key={service.key}
            title={service.name}
            icon="🔧"
            description={service.summary}
            href={service.slug}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-sm border border-border-light bg-surface-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-gray-50"
          >
            Previous
          </button>
          
          <span className="text-body text-muted-text px-4">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-sm border border-border-light bg-surface-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

