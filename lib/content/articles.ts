import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { validateArticleFrontMatter, type ArticleFrontMatter } from '../validation/articleSchema'

const contentDirectory = path.join(process.cwd(), 'content/resources')

export interface Article extends ArticleFrontMatter {
  content: string
  headings: Array<{ id: string; text: string; level: number }>
}

export function getArticle(service: string, stateCity: string): Article | null {
  const filePath = path.join(contentDirectory, service, `${stateCity}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  try {
    const frontMatter = validateArticleFrontMatter(data)

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
    console.error(`Error validating article ${filePath}:`, error)
    return null
  }
}

export function getAllArticles(): Array<{ service: string; stateCity: string }> {
  const articles: Array<{ service: string; stateCity: string }> = []

  if (!fs.existsSync(contentDirectory)) {
    return articles
  }

  const serviceDirs = fs.readdirSync(contentDirectory, { withFileTypes: true })
  
  for (const serviceDir of serviceDirs) {
    if (!serviceDir.isDirectory()) continue

    const servicePath = path.join(contentDirectory, serviceDir.name)
    const files = fs.readdirSync(servicePath)

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const stateCity = file.replace(/\.mdx$/, '')
        articles.push({
          service: serviceDir.name,
          stateCity,
        })
      }
    }
  }

  return articles
}

export function getArticlesByService(service: string): Array<Article> {
  const articles: Article[] = []
  const servicePath = path.join(contentDirectory, service)

  if (!fs.existsSync(servicePath)) {
    return articles
  }

  const files = fs.readdirSync(servicePath)

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const stateCity = file.replace(/\.mdx$/, '')
      const article = getArticle(service, stateCity)
      if (article) {
        articles.push(article)
      }
    }
  }

  return articles
}

