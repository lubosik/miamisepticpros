import { z } from 'zod'

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
})

export const articleFrontMatterSchema = z.object({
  title: z.string().min(30).max(120),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  service: z.enum([
    'septic-tank-pumping',
    'septic-tank-cleaning',
    'septic-inspection',
    'real-estate-septic-inspection',
    'septic-tank-repair',
    'emergency-pumping',
    'drainfield-repair',
    'drainfield-replacement',
    'septic-installation',
    'riser-installation',
    'baffle-replacement',
    'septic-tank-locating',
    'camera-inspection',
    'lift-station-service',
    'grease-trap-pumping',
    'septic-system-maintenance',
  ]),
  state: z.string(),
  stateCode: z.string().regex(/^[A-Z]{2}$/),
  city: z.string(),
  citySlug: z.string().regex(/^[a-z0-9-]+$/),
  primaryKeyword: z.string().min(10),
  supportKeywords: z.array(z.string()).min(3).max(12),
  metaDescription: z.string().min(120).max(160),
  ogImage: z.string().optional(),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().default('SepticTankQuoteHub'),
  sources: z.array(sourceSchema).default([]),
  relatedArticles: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
  schema: z
    .object({
      type: z.enum(['Article', 'HowTo', 'FAQPage']).default('Article'),
      hasFAQ: z.boolean().default(false),
      hasHowTo: z.boolean().default(false),
    })
    .optional(),
})

export type ArticleFrontMatter = z.infer<typeof articleFrontMatterSchema>

export function validateArticleFrontMatter(data: unknown): ArticleFrontMatter {
  return articleFrontMatterSchema.parse(data)
}


