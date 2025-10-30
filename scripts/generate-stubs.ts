#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface TargetRow {
  service: string
  stateCode: string
  state: string
  city: string
  priority?: string
}

// Read CSV input
function readCSV(filePath: string): TargetRow[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').filter(line => line.trim())
  const headers = lines[0].split(',').map(h => h.trim())
  const rows: TargetRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const row: Partial<TargetRow> = {}
    headers.forEach((header, idx) => {
      row[header as keyof TargetRow] = values[idx] as any
    })
    rows.push(row as TargetRow)
  }

  return rows
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function toTitleCase(text: string): string {
  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function generateStub(target: TargetRow, outputDir: string) {
  const citySlug = slugify(target.city)
  const locationSlug = `${target.stateCode.toLowerCase()}-${citySlug}`
  const serviceDir = path.join(outputDir, target.service)

  // Create service directory if it doesn't exist
  if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir, { recursive: true })
  }

  const serviceTitle = toTitleCase(target.service)

  const frontMatter = {
    title: `Complete Guide to ${serviceTitle} in ${target.city}, ${target.stateCode}`,
    slug: `${target.service}-${locationSlug}`,
    service: target.service,
    state: target.state,
    stateCode: target.stateCode,
    city: target.city,
    citySlug: citySlug,
    primaryKeyword: `${serviceTitle.toLowerCase()} in ${target.city} ${target.stateCode}`,
    supportKeywords: [
      `${target.city} ${serviceTitle.toLowerCase()} cost`,
      `${serviceTitle.toLowerCase()} ${target.city}`,
      `${serviceTitle.toLowerCase()} near me ${target.city}`,
      `licensed ${serviceTitle.toLowerCase()} contractors ${target.city}`,
    ],
    metaDescription: `Everything you need to know about ${serviceTitle.toLowerCase()} in ${target.city}: how often you need it, costs, what to expect, and how to find a trusted contractor.`,
    ogImage: `/images/og/${target.service}-${locationSlug}.png`,
    publishedDate: new Date().toISOString().split('T')[0],
    updatedDate: new Date().toISOString().split('T')[0],
    author: 'SepticTankQuoteHub',
    sources: [],
    relatedArticles: [],
    schema: {
      type: 'Article' as const,
      hasFAQ: true,
      hasHowTo: false,
    },
  }

  const content = `
If you own a septic system in ${target.city}, ${target.state}, understanding ${serviceTitle.toLowerCase()} is essential to prevent backups, odors, and costly repairs. This guide covers everything you need to know about ${serviceTitle.toLowerCase()} in ${target.city}: how often you need it, what it costs, and how to find a trusted contractor in ${target.city}.

## What Is ${serviceTitle}?

[TODO: Add detailed explanation of the service, specific to ${target.city} if relevant]

## Why You Need ${serviceTitle} in ${target.city}

[TODO: Add benefits and importance, mention local factors like climate, soil, regulations]

## How ${serviceTitle} Works

[TODO: Add step-by-step process]

## Cost Breakdown for ${target.city}, ${target.stateCode}

[TODO: Add cost table with local pricing]

| Factor | Cost Range | Notes |
|--------|------------|-------|
| Standard service | $XXX–$XXX | Most common |
| Large/complex | $XXX–$XXX | Additional time/equipment |
| Emergency | $XXX–$XXX | After-hours surcharge |

## Finding ${serviceTitle} Pros in ${target.city}

[TODO: Add tips for finding contractors, what to look for, licensing requirements in ${target.stateCode}]

## Frequently Asked Questions

### How often do I need ${serviceTitle.toLowerCase()} in ${target.city}?

[TODO: Add answer with local context]

### How much does ${serviceTitle.toLowerCase()} cost in ${target.city}?

[TODO: Add answer with local pricing]

### What should I look for in a ${target.city} ${serviceTitle.toLowerCase()} contractor?

[TODO: Add answer]

---

**Note:** This is a placeholder stub. Replace all [TODO] sections with researched, original content before publishing.
`.trim()

  const fileContent = matter.stringify(content, frontMatter)
  const outputPath = path.join(serviceDir, `${locationSlug}.mdx`)

  fs.writeFileSync(outputPath, fileContent)
  console.log(`✅ Created ${outputPath}`)
}

// Main execution
const inputDir = path.join(process.cwd(), 'inputs')
const outputDir = path.join(process.cwd(), 'content/resources')
const targetsPath = path.join(inputDir, 'targets.csv')

if (!fs.existsSync(targetsPath)) {
  console.error(`❌ Error: ${targetsPath} not found`)
  console.log('Please create inputs/targets.csv with columns: service,stateCode,state,city,priority')
  process.exit(1)
}

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const targets = readCSV(targetsPath)
console.log(`\n📝 Generating ${targets.length} article stubs...\n`)

targets.forEach((target) => {
  try {
    generateStub(target, outputDir)
  } catch (error) {
    console.error(`❌ Error generating stub for ${target.service} ${target.city}:`, error)
  }
})

console.log(`\n🎉 Generated ${targets.length} article stubs`)

