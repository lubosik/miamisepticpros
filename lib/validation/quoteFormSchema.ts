import { z } from 'zod'

export const quoteFormSchema = z.object({
  // Contact information
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number').min(10, 'Phone number must be at least 10 digits'),

  // Location
  address: z.string().min(5, 'Please enter your full address').max(200),
  city: z.string().min(2, 'Please enter your city').max(100),
  state: z.string().length(2, 'Please select a state').regex(/^[A-Z]{2}$/),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),

  // Service details
  serviceType: z.enum([
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
  urgency: z.enum(['routine', 'soon', 'emergency']),
  symptoms: z.string().max(1000, 'Symptoms description is too long').optional(),

  // Privacy and security
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
  hCaptchaToken: z.string().optional(), // Temporarily optional for testing
  honeypot: z.string().max(0, 'Invalid form submission').optional(), // Should be empty if filled, reject

  // UTM tracking (optional)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  referrer: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>
