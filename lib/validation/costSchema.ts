import { z } from 'zod'

const nationalAverageSchema = z.object({
  min: z.number(),
  max: z.number(),
  typical: z.number().optional(),
})

const priceRangeItemSchema = z.object({
  factor: z.string(),
  cost: z.string(),
  notes: z.string().optional(),
})

const costFactorSchema = z.object({
  factor: z.string(),
  impact: z.string(),
  priceImpact: z.enum(['low', 'moderate', 'high']).optional(),
})

const regionalDataSchema = z.object({
  region: z.string(),
  averageCost: z.string(),
  notes: z.string().optional(),
})

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
})

export const costFrontMatterSchema = z.object({
  title: z.string().min(30).max(100),
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
  nationalAverage: nationalAverageSchema,
  priceRange: z.array(priceRangeItemSchema).min(3).max(12),
  costFactors: z.array(costFactorSchema).min(3).max(10).optional(),
  regionalData: z.array(regionalDataSchema).optional(),
  savingTips: z.array(z.string()).min(3).max(8).optional(),
  metaDescription: z.string().min(120).max(160),
  ogImage: z.string().regex(/^\/images\/og\/.*\.(png|jpg|jpeg)$/).optional(),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  sources: z.array(sourceSchema).optional(),
  schema: z.object({
    type: z.enum(['Article', 'HowTo']).default('Article'),
  }).optional(),
})

export type CostFrontMatter = z.infer<typeof costFrontMatterSchema>

export function validateCostFrontMatter(data: unknown): CostFrontMatter {
  return costFrontMatterSchema.parse(data)
}

