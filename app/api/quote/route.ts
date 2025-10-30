import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validation/quoteFormSchema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate form data
    const validatedData = quoteFormSchema.parse(body)

    // Check honeypot field - if filled, it's a bot
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      return NextResponse.json(
        { error: 'Invalid form submission' },
        { status: 400 }
      )
    }

    // Validate hCaptcha (placeholder - implement when API key is available)
    // TODO: Add hCaptcha server-side validation
    // const hCaptchaSecret = process.env.HCAPTCHA_SECRET_KEY
    // const hCaptchaResponse = await fetch('https://hcaptcha.com/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `secret=${hCaptchaSecret}&response=${validatedData.hCaptchaToken}`,
    // })
    // const hCaptchaResult = await hCaptchaResponse.json()
    // if (!hCaptchaResult.success) {
    //   return NextResponse.json({ error: 'Captcha verification failed' }, { status: 400 })
    // }

    // Send to webhook or email service (placeholder)
    const webhookUrl = process.env.QUOTE_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...validatedData,
            submittedAt: new Date().toISOString(),
            source: 'septictankquotehub.com',
          }),
        })
      } catch (error) {
        console.error('Webhook submission error:', error)
        // Continue anyway - we'll log locally
      }
    }

    // Log submission locally (for development)
    console.log('Quote submission received:', {
      name: validatedData.name,
      email: validatedData.email,
      city: validatedData.city,
      state: validatedData.state,
      serviceType: validatedData.serviceType,
      urgency: validatedData.urgency,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Quote submission error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data. Please check all fields.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}

