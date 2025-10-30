/**
 * Shared markdown to HTML renderer for articles, issues, and cost guides
 */
export function renderMarkdown(content: string): string {
  const lines = content.split('\n')
  let html = ''
  let inTable = false
  let inList = false
  let tableRows: string[] = []
  let listItems: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Headings
    if (trimmed.startsWith('## ')) {
      closeBlocks()
      const text = trimmed.replace('## ', '').trim()
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      html += `<h2 id="${id}" class="text-h2 font-serif-headings font-semibold text-charcoal mt-12 mb-4">${escapeHtml(text)}</h2>`
    } else if (trimmed.startsWith('### ')) {
      closeBlocks()
      const text = trimmed.replace('### ', '').trim()
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      html += `<h3 id="${id}" class="text-h3 font-serif-headings font-semibold text-charcoal mt-10 mb-4">${escapeHtml(text)}</h3>`
    } 
    // Tables
    else if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (!inTable) {
        inTable = true
        tableRows = []
      }
      tableRows.push(trimmed)
    }
    // List items
    else if (trimmed.match(/^[-*]\s+/)) {
      if (inTable) {
        html += renderTable(tableRows)
        tableRows = []
        inTable = false
      }
      if (!inList) {
        inList = true
        listItems = []
      }
      const text = trimmed.replace(/^[-*]\s+/, '').trim()
      listItems.push(text)
    }
    // Paragraphs
    else if (trimmed && !trimmed.match(/^---/)) {
      closeBlocks()
      html += `<p class="text-body text-body-text mb-6 leading-relaxed">${escapeHtml(trimmed)}</p>`
    } else if (!trimmed) {
      closeBlocks()
    }
  }

  closeBlocks()

  function closeBlocks() {
    if (inTable) {
      html += renderTable(tableRows)
      tableRows = []
      inTable = false
    }
    if (inList) {
      html += `<ul class="list-disc list-inside text-body text-body-text mb-6 space-y-2">`
      listItems.forEach(item => {
        html += `<li>${escapeHtml(item)}</li>`
      })
      html += `</ul>`
      listItems = []
      inList = false
    }
  }

  return html
}

function renderTable(rows: string[]): string {
  if (rows.length === 0) return ''
  
  let html = '<div class="overflow-x-auto my-8"><table class="min-w-full border border-border-light rounded-md">'
  
  rows.forEach((row, idx) => {
    const cells = row.split('|').map(c => c.trim()).filter(c => c)
    
    if (idx === 0) {
      // Header row
      html += '<thead class="bg-surface-gray-50"><tr>'
      cells.forEach(cell => {
        html += `<th class="border border-border-light px-4 py-3 text-left font-semibold text-charcoal">${escapeHtml(cell)}</th>`
      })
      html += '</tr></thead><tbody>'
    } else if (idx === 1 && cells.every(c => c.match(/^[-:]+$/))) {
      // Separator row - skip
      return
    } else {
      // Data row
      html += '<tr>'
      cells.forEach(cell => {
        html += `<td class="border border-border-light px-4 py-3 text-body text-body-text">${escapeHtml(cell)}</td>`
      })
      html += '</tr>'
    }
  })
  
  html += '</tbody></table></div>'
  return html
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

