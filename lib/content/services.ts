import fs from 'fs'
import path from 'path'
import { validateService, type Service } from '../validation/serviceSchema'

const contentDirectory = path.join(process.cwd(), 'content/services')

export function getService(slug: string): Service | null {
  const filePath = path.join(contentDirectory, `${slug}.json`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return validateService(data)
  } catch (error) {
    console.error(`Error loading service ${slug}:`, error)
    return null
  }
}

export function getAllServices(): Service[] {
  const services: Service[] = []

  if (!fs.existsSync(contentDirectory)) {
    return services
  }

  const files = fs.readdirSync(contentDirectory)

  for (const file of files) {
    if (file.endsWith('.json')) {
      const slug = file.replace(/\.json$/, '')
      const service = getService(slug)
      if (service) {
        services.push(service)
      }
    }
  }

  return services
}

