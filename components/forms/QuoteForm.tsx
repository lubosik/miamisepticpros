'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteFormSchema, type QuoteFormData } from '@/lib/validation/quoteFormSchema'
// US States for dropdown
const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
]

interface QuoteFormProps {
  services: Array<{ slug: string; title: string }>
}

export default function QuoteForm({ services }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      urgency: 'routine',
      privacyConsent: false,
      honeypot: '',
    },
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit quote request')
      }

      // Success - redirect to thank you page
      window.location.href = '/quote/thank-you'
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  // hCaptcha will be loaded and handled client-side
  // For now, we'll use a placeholder token approach
  const handleCaptchaVerify = (token: string) => {
    setValue('hCaptchaToken', token)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6"
      data-testid="quote-form"
    >
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        {...register('honeypot')}
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        data-testid="honeypot-field"
      />

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      {/* Contact Information */}
      <section className="space-y-4">
        <h2 className="text-h3 font-serif-headings font-semibold text-charcoal">Contact Information</h2>
        
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-1">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`w-full px-4 py-3 border rounded-sm text-body ${
              errors.name ? 'border-red-500' : 'border-border-default'
            }`}
            data-testid="quote-form-name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-1">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full px-4 py-3 border rounded-sm text-body ${
              errors.email ? 'border-red-500' : 'border-border-default'
            }`}
            data-testid="quote-form-email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-1">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            placeholder="(555) 123-4567"
            className={`w-full px-4 py-3 border rounded-sm text-body ${
              errors.phone ? 'border-red-500' : 'border-border-default'
            }`}
            data-testid="quote-form-phone"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </section>

      {/* Location */}
      <section className="space-y-4">
        <h2 className="text-h3 font-serif-headings font-semibold text-charcoal">Service Location</h2>
        
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-charcoal mb-1">
            Street Address <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className={`w-full px-4 py-3 border rounded-sm text-body ${
              errors.address ? 'border-red-500' : 'border-border-default'
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-charcoal mb-1">
              City <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="city"
              {...register('city')}
              className={`w-full px-4 py-3 border rounded-sm text-body ${
                errors.city ? 'border-red-500' : 'border-border-default'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-charcoal mb-1">
              State <span className="text-red-600">*</span>
            </label>
            <select
              id="state"
              {...register('state')}
              className={`w-full px-4 py-3 border rounded-sm text-body ${
                errors.state ? 'border-red-500' : 'border-border-default'
              }`}
            >
              <option value="">Select State</option>
              {US_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-semibold text-charcoal mb-1">
            ZIP Code <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="zip"
            {...register('zip')}
            placeholder="12345"
            className={`w-full px-4 py-3 border rounded-sm text-body ${
              errors.zip ? 'border-red-500' : 'border-border-default'
            }`}
          />
          {errors.zip && (
            <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>
          )}
        </div>
      </section>

      {/* Service Details */}
      <section className="space-y-4">
        <h2 className="text-h3 font-serif-headings font-semibold text-charcoal">Service Details</h2>
        
        <div>
          <label htmlFor="serviceType" className="block text-sm font-semibold text-charcoal mb-1">
            Service Needed <span className="text-red-600">*</span>
          </label>
          <select
            id="serviceType"
            {...register('serviceType')}
            className={`w-full px-4 py-3 border rounded-sm text-body ${
              errors.serviceType ? 'border-red-500' : 'border-border-default'
            }`}
          >
            <option value="">Select a Service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-3">
            How Urgent? <span className="text-red-600">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                {...register('urgency')}
                value="routine"
                className="mr-2"
              />
              <span className="text-body text-body-text">Routine (schedule within 1-2 weeks)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register('urgency')}
                value="soon"
                className="mr-2"
              />
              <span className="text-body text-body-text">Soon (within a few days)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register('urgency')}
                value="emergency"
                className="mr-2"
              />
              <span className="text-body text-body-text">Emergency (need service today)</span>
            </label>
          </div>
          {errors.urgency && (
            <p className="mt-1 text-sm text-red-600">{errors.urgency.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-sm font-semibold text-charcoal mb-1">
            Symptoms or Issues (Optional)
          </label>
          <textarea
            id="symptoms"
            {...register('symptoms')}
            rows={4}
            placeholder="Describe any symptoms or issues you're experiencing..."
            className={`w-full px-4 py-3 border rounded-sm text-body ${
              errors.symptoms ? 'border-red-500' : 'border-border-default'
            }`}
          />
          {errors.symptoms && (
            <p className="mt-1 text-sm text-red-600">{errors.symptoms.message}</p>
          )}
        </div>
      </section>

      {/* hCaptcha Placeholder - temporarily disabled for testing */}
      <input
        type="hidden"
        {...register('hCaptchaToken')}
        value="placeholder-token-for-testing"
      />

      {/* Privacy Consent */}
      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            {...register('privacyConsent')}
            className="mt-1 mr-2"
          />
          <span className="text-sm text-body-text">
            I agree to the <a href="/privacy" className="text-accent-green hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. We may share your request details with our licensed subcontractors solely to perform your service. <span className="text-red-600">*</span>
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="mt-1 text-sm text-red-600">{errors.privacyConsent.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent-green text-white font-sans-ui font-semibold px-8 py-4 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="quote-form-submit"
      >
        {isSubmitting ? 'Submitting...' : 'Get My Septic Service Estimate'}
      </button>
    </form>
  )
}

