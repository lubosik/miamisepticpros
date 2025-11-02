'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Always render container to prevent hydration mismatch
  const hasFaqs = faqs && faqs.length > 0

  return (
    <div className="faq-accordion" aria-hidden={!hasFaqs ? 'true' : undefined}>
      {hasFaqs && faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
        >
          <button
            className="faq-question"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="faq-question-text">{faq.question}</span>
            <span className="faq-chevron">
              {openIndex === index ? '▼' : '▶'}
            </span>
          </button>
          {openIndex === index && (
            <div
              id={`faq-answer-${index}`}
              className="faq-answer"
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <div 
                className="faq-answer-content" 
                dangerouslySetInnerHTML={{ __html: faq.answer }}
                suppressHydrationWarning
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

