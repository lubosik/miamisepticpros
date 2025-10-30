import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { validateIssueFrontMatter, type IssueFrontMatter } from '../validation/issueSchema'

const contentDirectory = path.join(process.cwd(), 'content/issues')

export interface Issue extends IssueFrontMatter {
  content: string
  headings: Array<{ id: string; text: string; level: number }>
}

export function getIssue(slug: string): Issue | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontMatter = validateIssueFrontMatter(data)

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
    console.error(`Error loading issue ${slug}:`, error)
    return null
  }
}

export function getAllIssues(): Array<{ slug: string }> {
  const issues: Array<{ slug: string }> = []

  if (!fs.existsSync(contentDirectory)) {
    return issues
  }

  const files = fs.readdirSync(contentDirectory)

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const slug = file.replace(/\.mdx$/, '')
      issues.push({ slug })
    }
  }

  return issues
}

