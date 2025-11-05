// lib/insertCtas.tsx
/**
 * Server-side CTA injection into HTML content
 */

export function insertCTAsIntoHtml(
  html: string,
  cta1: string,
  cta2: string
): string {
  // Split HTML at first <h2> tag
  const parts = html.split(/(<h2[^>]*>.*?<\/h2>)/i)
  
  if (parts.length > 2) {
    // Insert CTA1 after first h2 (parts[0] + parts[1] + parts[2] + cta1 + rest)
    return parts.slice(0, 3).join('') + cta1 + parts.slice(3).join('') + cta2
  }
  
  // If no h2 found, append both CTAs at the end
  return html + cta1 + cta2
}
