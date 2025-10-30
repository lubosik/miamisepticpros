import { z } from 'zod'

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const averageCostSchema = z.object({
  min: z.number(),
  max: z.number(),
  unit: z.string().default('per service'),
}).optional()

const serviceSchemaObject = z.object({
  slug: z.enum([
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
  title: z.string(),
  icon: z.string(),
  shortDescription: z.string().min(50).max(150),
  fullDescription: z.string().min(200).max(3000),
  metaDescription: z.string().min(120).max(160),
  faqs: z.array(faqSchema).min(3).max(8).optional(),
  relatedServices: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(2).max(6).optional(),
  averageCost: averageCostSchema,
  schema: z.object({
    serviceType: z.string().optional(),
    category: z.string().optional(),
  }).optional(),
})

export type Service = z.infer<typeof serviceSchemaObject>

export function validateService(data: unknown): Service {
  return serviceSchemaObject.parse(data)
}

