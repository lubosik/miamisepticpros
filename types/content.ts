/**
 * TypeScript types for content registries
 */

export type ServiceCategory = 
  | "Septic system service"
  | "Septic system contractor"
  | "Drainage contractor"
  | "Sewage treatment service"

export interface ServiceRecord {
  key: string              // "septic-tank-pumping"
  name: string             // "Septic Tank Pumping"
  slug: string            // "/services/septic-tank-pumping"
  category: ServiceCategory
  summary: string
  hero: string            // "/images/services/septic-tank-pumping.webp" (fallback ok)
  updated: string         // ISO date
  schemaType: "Service"
  active: boolean
}

export interface ResourceRecord {
  id: string
  title: string
  slug: string           // "/resources/septic-tank-pumping-miami" etc.
  serviceKey: string     // must match ServiceRecord.key
  updated?: string        // ISO date
  hero?: string
  sourcePath: string     // in-repo path
  excerpt?: string
  wordCount?: number
}

export type ServiceToArticlesMap = Record<string, string[]> // serviceKey -> ResourceRecord.id[]

