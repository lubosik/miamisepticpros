import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validation/quoteFormSchema'
import fs from 'fs'
import path from 'path'

// Ensure quotes directory exists
const QUOTES_DIR = path.join(process.cwd(), 'var', 'quotes')
const QUOTES_LOG_FILE = path.join(QUOTES_DIR, 'quotes.jsonl')

function ensureQuotesDir() {
  if (!fs.existsSync(QUOTES_DIR)) {
    fs.mkdirSync(QUOTES_DIR, { recursive: true })
  }
}

function appendJSONL(data: object) {
  ensureQuotesDir()
  const line = JSON.stringify(data) + '\n'
  fs.appendFileSync(QUOTES_LOG_FILE, line, 'utf8')
}

async function sendEmailViaWeb3Forms(data: any) {
  const web3FormsAccessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!web3FormsAccessKey) {
    console.warn('WEB3FORMS_ACCESS_KEY not set, skipping email')
    return false
  }

  try {
    const emailBody = {
      access_key: web3FormsAccessKey,
      subject: `New Septic Service Quote Request: ${data.name}`,
      from_name: 'Miami Septic Pros',
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: `${data.address}, ${data.city}, ${data.state} ${data.zip}`,
      service: data.serviceType,
      urgency: data.urgency,
      symptoms: data.symptoms || 'None provided',
      utm_source: data.utm_source || 'direct',
      utm_medium: data.utm_medium || 'none',
      utm_campaign: data.utm_campaign || 'none',
      referrer: data.referrer || 'direct',
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailBody),
    })

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error('Web3Forms email error:', error)
    return false
  }
}

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

    // Prepare submission record with UTM and referrer
    const submissionRecord = {
      ...validatedData,
      submittedAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    }

    // Write to JSONL log
    appendJSONL(submissionRecord)

    // Send email via Web3Forms (fallback)
    const emailSent = await sendEmailViaWeb3Forms(validatedData)

    // Send to webhook if configured
    const webhookUrl = process.env.QUOTE_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionRecord),
        })
      } catch (error) {
        console.error('Webhook submission error:', error)
        // Continue anyway - we've logged locally
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully',
        emailSent,
      },
      { status: 200 }
    )
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
