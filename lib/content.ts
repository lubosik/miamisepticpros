// lib/content.ts
/**
 * Server-side ToC extraction (no client DOM reads)
 */

export function extractTOC(html: string): Array<{ id: string; text: string }> {
  const h = Array.from(html.matchAll(/<h([2-4]) id="([^"]+)">([^<]+)<\/h\1>/g))
  return h.map((m) => ({ id: m[2], text: m[3] }))
}
