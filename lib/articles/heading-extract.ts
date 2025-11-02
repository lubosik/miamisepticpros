/**
 * Extract headings from HTML content (deterministic, server-side only)
 */
export function extractHeadings(html: string): Array<{ id: string; text: string; level: 2 | 3 }> {
  const out: Array<{ id: string; text: string; level: 2 | 3 }> = []
  
  // Extract H2 headings with IDs
  const h2Re = /<h2\s+[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h2>/gims
  let m
  while ((m = h2Re.exec(html))) {
    const id = m[1]
    const text = m[2].replace(/<[^>]+>/g, '').trim()
    if (text && !text.includes('Sources & References')) {
      out.push({ id, text, level: 2 })
    }
  }
  
  // Extract H3 headings (for FAQ questions, they might not have IDs in HTML)
  const h3Re = /<h3\s+[^>]*>(.*?)<\/h3>/gims
  while ((m = h3Re.exec(html))) {
    const text = m[1].replace(/<[^>]+>/g, '').trim()
    // Only include H3 if it's a question (likely FAQ)
    if (text && text.includes('?')) {
      // Generate deterministic ID
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      out.push({ id, text, level: 3 })
    }
  }
  
  return out
}
