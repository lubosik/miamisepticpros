'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    const formData = new FormData(e.currentTarget)
    const firstName = (formData.get('name') as string)?.split(' ')[0] || 'there'

    try {
      // Prepare form data for Web3Forms
      const web3FormData = new FormData()
      web3FormData.append('access_key', 'bc5a03ef-5395-4c81-a84c-037112caa5a0')
      web3FormData.append('subject', `Contact Form Submission from ${formData.get('name')}`)
      web3FormData.append('name', formData.get('name') as string)
      web3FormData.append('email', formData.get('email') as string)
      web3FormData.append('phone', formData.get('phone') as string || '')
      web3FormData.append('message', formData.get('message') as string)
      web3FormData.append('botcheck', '')
      web3FormData.append('redirect', `${window.location.origin}/contact/thank-you?name=${encodeURIComponent(firstName)}`)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData,
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message')
      }

      setSubmitSuccess(true)
      e.currentTarget.reset()

      // Redirect to thank you page
      setTimeout(() => {
        router.push(`/contact/thank-you?name=${encodeURIComponent(firstName)}`)
      }, 1000)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800 font-semibold">
            ✓ Message sent successfully! Redirecting...
          </p>
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-charcoal mb-1">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          className="w-full px-4 py-3 border border-border-default rounded-sm text-body"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-charcoal mb-1">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          className="w-full px-4 py-3 border border-border-default rounded-sm text-body"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-semibold text-charcoal mb-1">
          Phone (Optional)
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          className="w-full px-4 py-3 border border-border-default rounded-sm text-body"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-charcoal mb-1">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-3 border border-border-default rounded-sm text-body"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent-green text-white font-sans-ui font-semibold px-8 py-4 rounded-sm hover:bg-accent-green-hover transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

