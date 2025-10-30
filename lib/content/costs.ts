import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { validateCostFrontMatter, type CostFrontMatter } from '../validation/costSchema'

const contentDirectory = path.join(process.cwd(), 'content/costs')

export interface CostGuide extends CostFrontMatter {
  content: string
  headings: Array<{ id: string; text: string; level: number }>
}

export function getCostGuide(slug: string): CostGuide | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontMatter = validateCostFrontMatter(data)

    // Extract headings from content
    const headings: Array<{ id: string; text: string; level: number }> = []
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    let match
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      headings.push({ id, text, level })
    }

    return {
      ...frontMatter,
      content,
      headings,
    }
  } catch (error) {
    console.error(`Error loading cost guide ${slug}:`, error)
    return null
  }
}

export function getAllCostGuides(): Array<{ slug: string }> {
  const guides: Array<{ slug: string }> = []

  if (!fs.existsSync(contentDirectory)) {
    return guides
  }

  const files = fs.readdirSync(contentDirectory)

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const slug = file.replace(/\.mdx$/, '')
      guides.push({ slug })
    }
  }

  return guides
}

