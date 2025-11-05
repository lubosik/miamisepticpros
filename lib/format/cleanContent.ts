/**
 * Content cleaning utility for article content
 * Removes markdown artifacts, normalizes whitespace, ensures proper structure
 */

export function cleanHtml(html: string): string {
  return html
    // Remove markdown heading markers at line start
    .replace(/^\s*#{1,6}\s+/gm, '')
    // Remove stray markdown bold/emphasis
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove code ticks
    .replace(/[`]{1,3}/g, '')
    // Collapse em-dash runs (—— or more)
    .replace(/—{2,}/g, '—')
    .replace(/--{2,}/g, '—')
    // Normalize whitespace
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    // Fix clamped words (ensure spaces around punctuation where needed)
    .replace(/([a-zA-Z])([.!?])([A-Z])/g, '$1$2 $3')
    // Remove duplicate words in sequence (basic pattern)
    .replace(/\b(\w+)\s+\1\b/gi, '$1')
    // Ensure proper spacing after closing tags before opening tags
    .replace(/>\s*</g, '> <')
    // Normalize paragraph breaks
    .replace(/(<\/p>)\s*(<p[^>]*>)/gi, '$1\n$2')
    .trim()
}

/**
 * Ensure all headings have proper IDs
 */
export function ensureHeadingIds(html: string): string {
  // Extract headings and generate slugs
  return html.replace(/<h([2-6])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    // Check if id already exists
    if (attrs.includes('id=')) {
      return match
    }
    
    // Generate slug from text
    const slug = text
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    return `<h${level}${attrs} id="${slug}">${text}</h${level}>`
  })
}

/**
 * Break long paragraphs into shorter ones (every 3-5 sentences)
 */
export function breakLongParagraphs(html: string): string {
  return html.replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (match, attrs, content) => {
    // Count sentences (basic pattern)
    const sentences = content.split(/([.!?]+)\s+/).filter((s: string) => s.trim())
    
    if (sentences.length <= 5) {
      return match
    }
    
    // Group into chunks of 3-4 sentences
    const chunks: string[] = []
    for (let i = 0; i < sentences.length; i += 4) {
      const chunk = sentences.slice(i, i + 4).join(' ').trim()
      if (chunk) {
        chunks.push(`<p${attrs}>${chunk}</p>`)
      }
    }
    
    return chunks.join('\n')
  })
}

/**
 * Convert inline citation placeholders to links
 */
export function linkCitations(html: string, sources: Array<{ title: string; url: string }>): string {
  sources.forEach((source, index) => {
    const anchorId = `source-${index + 1}`
    // Find citations mentioning the source title and link them
    const patterns = [
      new RegExp(`(${source.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?!</a>)`, 'gi'),
      new RegExp(`(${source.title.split('—')[0].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?!</a>)`, 'gi'),
    ]
    
    patterns.forEach(pattern => {
      html = html.replace(pattern, (match) => {
        // Don't replace if already inside a link
        const beforeMatch = html.substring(0, html.indexOf(match))
        const afterMatch = html.substring(html.indexOf(match) + match.length)
        if (beforeMatch.lastIndexOf('<a') > beforeMatch.lastIndexOf('</a>')) {
          return match
        }
        return `<a href="#${anchorId}" class="citation-link">${match}</a>`
      })
    })
  })
  
  return html
}

/**
 * Main cleaning function
 */
export function cleanContent(html: string, options?: {
  ensureIds?: boolean
  breakParagraphs?: boolean
  linkCitations?: Array<{ title: string; url: string }>
}): string {
  let cleaned = cleanHtml(html)
  
  if (options?.ensureIds) {
    cleaned = ensureHeadingIds(cleaned)
  }
  
  if (options?.breakParagraphs) {
    cleaned = breakLongParagraphs(cleaned)
  }
  
  if (options?.linkCitations && options.linkCitations.length > 0) {
    cleaned = linkCitations(cleaned, options.linkCitations)
  }
  
  return cleaned
}

