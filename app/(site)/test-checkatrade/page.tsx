// app/(site)/test-checkatrade/page.tsx
/**
 * Phase B Test Page - Demonstrates Checkatrade-style layout
 */

import CheckatradeArticleLayout from '@/components/layouts/CheckatradeArticleLayout'
import { extractTOC } from '@/lib/content'

export default function TestCheckatradePage() {
  // Sample HTML content with headings that have IDs (from rehype-slug)
  const sampleContent = `
    <h2 id="introduction">Introduction</h2>
    <p>This is a test article demonstrating the Checkatrade-style layout with proper prose spacing and a sticky table of contents.</p>
    
    <h2 id="section-one">Section One</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    
    <table>
      <thead>
        <tr>
          <th>Service</th>
          <th>Cost</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Pumping</td>
          <td>$300-$600</td>
          <td>1-3 hours</td>
        </tr>
        <tr>
          <td>Cleaning</td>
          <td>$400-$800</td>
          <td>2-4 hours</td>
        </tr>
      </tbody>
    </table>
    
    <h3 id="subsection">Subsection</h3>
    <p>This is a subsection with proper spacing.</p>
    
    <h2 id="conclusion">Conclusion</h2>
    <p>This demonstrates the prose styling with proper spacing for paragraphs, headings, lists, and tables.</p>
  `

  const tocItems = extractTOC(sampleContent)

  return (
    <CheckatradeArticleLayout
      title="Septic Tank Pumping in Miami"
      subtitle="Professional septic tank pumping services for Miami-Dade County"
      updated="October 30, 2025"
      heroSrc="/images/septic/septic-tank-pumping/hero.webp"
      tocItems={tocItems}
    >
      <div dangerouslySetInnerHTML={{ __html: sampleContent }} />
    </CheckatradeArticleLayout>
  )
}
