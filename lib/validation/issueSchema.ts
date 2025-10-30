import { z } from 'zod'

const causeSchema = z.object({
  cause: z.string(),
  description: z.string(),
  likelihood: z.enum(['common', 'moderate', 'rare']).optional(),
})

const solutionSchema = z.object({
  solution: z.string(),
  description: z.string(),
  urgency: z.enum(['immediate', 'soon', 'routine']).optional(),
  diy: z.boolean().default(false),
})

export const issueFrontMatterSchema = z.object({
  title: z.string().min(20).max(80),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  symptoms: z.array(z.string()).min(2).max(10),
  causes: z.array(causeSchema).min(2).max(8).optional(),
  solutions: z.array(solutionSchema).min(2).max(8).optional(),
  relatedServices: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1).max(6).optional(),
  severity: z.enum(['low', 'medium', 'high', 'emergency']).optional(),
  metaDescription: z.string().min(120).max(160),
  ogImage: z.string().regex(/^\/images\/og\/.*\.(png|jpg|jpeg)$/).optional(),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  schema: z.object({
    type: z.enum(['Article', 'HowTo']).default('Article'),
  }).optional(),
})

export type IssueFrontMatter = z.infer<typeof issueFrontMatterSchema>

export function validateIssueFrontMatter(data: unknown): IssueFrontMatter {
  return issueFrontMatterSchema.parse(data)
}

