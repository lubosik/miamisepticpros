import { z } from 'zod'

const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
}).optional()

const locationSchemaObject = z.object({
  city: z.string(),
  state: z.string(),
  stateCode: z.string().regex(/^[A-Z]{2}$/),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  county: z.string().optional(),
  population: z.number().int().min(0).optional(),
  availableServices: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1).max(16).optional(),
  localInsights: z.string().min(100).max(2000).optional(),
  metaDescription: z.string().min(120).max(160).optional(),
  coordinates: coordinatesSchema,
})

export type Location = z.infer<typeof locationSchemaObject>

export function validateLocation(data: unknown): Location {
  return locationSchemaObject.parse(data)
}

