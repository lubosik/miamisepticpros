'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { ResourceRecord, ServiceRecord } from '@/types/content'
import Link from 'next/link'
import ResourceImage from './ResourceImage.client'

interface ResourceFiltersProps {
  resources: ResourceRecord[]
  services: ServiceRecord[]
}

const ITEMS_PER_PAGE = 15

export default function ResourceFilters({ resources, services }: ResourceFiltersProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const currentService = searchParams?.get('service') || 'all'
  const searchQuery = searchParams?.get('q') || ''
  const currentPage = parseInt(searchParams?.get('p') || '1', 10)
  
  // Filter resources by service and search query
  const filteredResources = useMemo(() => {
    let filtered = resources
    
    // Filter by service
    if (currentService !== 'all') {
      filtered = filtered.filter(r => r.serviceKey === currentService)
    }
    
    // Filter by search query (title and excerpt)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(r => {
        const titleMatch = r.title.toLowerCase().includes(query)
        const excerptMatch = r.excerpt?.toLowerCase().includes(query) || false
        return titleMatch || excerptMatch
      })
    }
    
    return filtered
  }, [resources, currentService, searchQuery])
  
  // Paginate resources
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE)
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredResources.slice(start, end)
  }, [filteredResources, currentPage])
  
  const handleServiceChange = (serviceKey: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (serviceKey === 'all') {
      params.delete('service')
    } else {
      params.set('service', serviceKey)
    }
    params.delete('p') // Reset to page 1 when changing service
    router.push(`/resources?${params.toString()}`)
  }
  
  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (query.trim()) {
      params.set('q', query.trim())
    } else {
      params.delete('q')
    }
    params.delete('p') // Reset to page 1 when searching
    router.push(`/resources?${params.toString()}`)
  }
  
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (page === 1) {
      params.delete('p')
    } else {
      params.set('p', page.toString())
    }
    router.push(`/resources?${params.toString()}`)
  }
  
  // Get service name helper
  const getServiceName = (serviceKey: string) => {
    return services.find(s => s.key === serviceKey)?.name || serviceKey
  }
  
  return (
    <>
      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Service Filter */}
          <div className="flex-1">
            <label htmlFor="service-filter" className="block text-small font-semibold text-charcoal mb-2">
              Filter by Service
            </label>
            <select
              id="service-filter"
              value={currentService}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full px-4 py-2 border border-border-light rounded-sm bg-surface-white text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-accent-green"
            >
              <option value="all">All Services</option>
              {services.map((service) => (
                <option key={service.key} value={service.key}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search-input" className="block text-small font-semibold text-charcoal mb-2">
              Search Resources
            </label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title or description..."
              className="w-full px-4 py-2 border border-border-light rounded-sm bg-surface-white text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-accent-green"
            />
          </div>
        </div>
        
        <p className="text-small text-muted-text">
          Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {currentService !== 'all' && ` for ${getServiceName(currentService)}`}
        </p>
      </div>
      
      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedResources.map((resource) => {
          const service = services.find(s => s.key === resource.serviceKey)
          return (
            <Link
              key={resource.id}
              href={resource.slug}
              className="block p-6 bg-surface-white border border-border-light rounded-md shadow-md hover:shadow-lg transition-shadow"
            >
              <ResourceImage
                src={resource.hero}
                alt={resource.title}
              />
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                {resource.title}
              </h3>
              {service && (
                <span className="inline-block text-small text-accent-green font-semibold mb-2">
                  {service.name}
                </span>
              )}
              {resource.excerpt && (
                <p className="text-body text-muted-text mb-4 line-clamp-2">
                  {resource.excerpt}
                </p>
              )}
              {resource.updated && (
                <p className="text-small text-muted-text">
                  Updated: {new Date(resource.updated).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </p>
              )}
            </Link>
          )
        })}
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

