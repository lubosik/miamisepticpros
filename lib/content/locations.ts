import fs from 'fs'
import path from 'path'
import { validateLocation, type Location } from '../validation/locationSchema'

const contentDirectory = path.join(process.cwd(), 'content/locations')

export function getLocation(stateCode: string, citySlug: string): Location | null {
  const filePath = path.join(contentDirectory, stateCode.toLowerCase(), `${citySlug}.json`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return validateLocation(data)
  } catch (error) {
    console.error(`Error loading location ${stateCode}/${citySlug}:`, error)
    return null
  }
}

export function getLocationsByState(stateCode: string): Location[] {
  const locations: Location[] = []
  const stateDir = path.join(contentDirectory, stateCode.toLowerCase())

  if (!fs.existsSync(stateDir)) {
    return locations
  }

  const files = fs.readdirSync(stateDir)

  for (const file of files) {
    if (file.endsWith('.json')) {
      const citySlug = file.replace(/\.json$/, '')
      const location = getLocation(stateCode, citySlug)
      if (location) {
        locations.push(location)
      }
    }
  }

  return locations.sort((a, b) => (b.population || 0) - (a.population || 0))
}

export function getAllStates(): string[] {
  const states: string[] = []

  if (!fs.existsSync(contentDirectory)) {
    return states
  }

  const dirs = fs.readdirSync(contentDirectory, { withFileTypes: true })

  for (const dir of dirs) {
    if (dir.isDirectory()) {
      states.push(dir.name.toUpperCase())
    }
  }

  return states.sort()
}

export function getAllLocations(): Array<{ stateCode: string; citySlug: string }> {
  const locations: Array<{ stateCode: string; citySlug: string }> = []

  if (!fs.existsSync(contentDirectory)) {
    return locations
  }

  const stateDirs = fs.readdirSync(contentDirectory, { withFileTypes: true })

  for (const stateDir of stateDirs) {
    if (!stateDir.isDirectory()) continue

    const statePath = path.join(contentDirectory, stateDir.name)
    const files = fs.readdirSync(statePath)

    for (const file of files) {
      if (file.endsWith('.json')) {
        const citySlug = file.replace(/\.json$/, '')
        locations.push({
          stateCode: stateDir.name.toUpperCase(),
          citySlug,
        })
      }
    }
  }

  return locations
}

