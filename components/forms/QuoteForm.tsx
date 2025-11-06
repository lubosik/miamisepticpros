'use client'

import { useState, useEffect } from 'react'
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
  const [submitSuccess, setSubmitSuccess] = useState(false)

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

  // Capture UTM params and referrer on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const utm_source = params.get('utm_source')
      const utm_medium = params.get('utm_medium')
      const utm_campaign = params.get('utm_campaign')
      const utm_term = params.get('utm_term')
      const utm_content = params.get('utm_content')

      if (utm_source) setValue('utm_source', utm_source)
      if (utm_medium) setValue('utm_medium', utm_medium)
      if (utm_campaign) setValue('utm_campaign', utm_campaign)
      if (utm_term) setValue('utm_term', utm_term)
      if (utm_content) setValue('utm_content', utm_content)
      
      // Store referrer (document.referrer or sessionStorage fallback)
      const referrer = document.referrer || sessionStorage.getItem('referrer') || 'direct'
      setValue('referrer', referrer)
      
      // Store current page as referrer for next page
      sessionStorage.setItem('referrer', window.location.href)
    }
  }, [setValue])

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // Extract first name for thank you page
      const firstName = data.name.split(' ')[0] || data.name

      // Prepare form data for Web3Forms
      const formData = new FormData()
      formData.append('access_key', 'bc5a03ef-5395-4c81-a84c-037112caa5a0')
      formData.append('subject', `New Quote Request: ${data.serviceType || 'Septic Service'}`)
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('address', `${data.address}, ${data.city}, ${data.state} ${data.zip}`)
      formData.append('service_type', data.serviceType || 'Not specified')
      formData.append('urgency', data.urgency || 'routine')
      formData.append('symptoms', data.symptoms || 'None provided')
      formData.append('utm_source', data.utm_source || '')
      formData.append('utm_medium', data.utm_medium || '')
      formData.append('utm_campaign', data.utm_campaign || '')
      formData.append('utm_term', data.utm_term || '')
      formData.append('utm_content', data.utm_content || '')
      formData.append('referrer', data.referrer || '')
      
      // Honeypot spam protection
      formData.append('botcheck', '')
      
      // Redirect to thank you page with first name
      formData.append('redirect', `${window.location.origin}/quote/thank-you?name=${encodeURIComponent(firstName)}`)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit quote request')
      }

      // Success - redirect immediately (Web3Forms handles redirect)
      setSubmitSuccess(true)
      reset()
      
      // Fallback redirect in case Web3Forms redirect doesn't work
      setTimeout(() => {
        window.location.href = `/quote/thank-you?name=${encodeURIComponent(firstName)}`
      }, 1000)
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

      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800 font-semibold">
            ✓ Quote request submitted successfully! Redirecting to confirmation page...
          </p>
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

      {/* Hidden UTM tracking fields */}
      <input type="hidden" {...register('utm_source')} />
      <input type="hidden" {...register('utm_medium')} />
      <input type="hidden" {...register('utm_campaign')} />
      <input type="hidden" {...register('utm_term')} />
      <input type="hidden" {...register('utm_content')} />
      <input type="hidden" {...register('referrer')} />

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

