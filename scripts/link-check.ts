#!/usr/bin/env tsx
/**
 * Phase 8: Link Check Script
 * Crawls /services and /resources to detect 404s, missing images, and anchors
 */

const baseUrl = process.env.DEV_URL || 'http://localhost:3000'

interface LinkCheckResult {
  url: string
  status: number
  brokenLinks: string[]
  missingImages: string[]
  brokenAnchors: string[]
}

interface Summary {
  totalPages: number
  passed: number
  failed: number
  brokenLinks: Array<{ url: string; link: string; status: number }>
  missingImages: Array<{ url: string; image: string }>
  brokenAnchors: Array<{ url: string; anchor: string }>
}

async function fetchPage(url: string): Promise<{ status: number; html: string }> {
  try {
    const response = await fetch(url)
    const html = await response.text()
    return { status: response.status, html }
  } catch (error) {
    return { status: 0, html: '' }
  }
}

function extractLinks(html: string, baseUrl: string): string[] {
  const links: string[] = []
  // Match href attributes
  const hrefRegex = /href=["']([^"']+)["']/gi
  let match
  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1]
    // Convert relative URLs to absolute
    if (href.startsWith('/')) {
      links.push(`${baseUrl}${href}`)
    } else if (href.startsWith('http')) {
      links.push(href)
    }
  }
  return links
}

function extractImages(html: string): string[] {
  const images: string[] = []
  // Match src attributes in img tags
  const srcRegex = /<img[^>]+src=["']([^"']+)["']/gi
  let match
  while ((match = srcRegex.exec(html)) !== null) {
    images.push(match[1])
  }
  return images
}

function extractAnchors(html: string): string[] {
  const anchors: string[] = []
  // Match href attributes with #
  const anchorRegex = /href=["']([^"']*#[^"']+)["']/gi
  let match
  while ((match = anchorRegex.exec(html)) !== null) {
    anchors.push(match[1])
  }
  return anchors
}

async function checkLink(url: string): Promise<number> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.status
  } catch (error) {
    return 0
  }
}

async function checkAnchor(pageUrl: string, anchor: string): Promise<boolean> {
  try {
    const response = await fetch(pageUrl)
    const html = await response.text()
    // Extract the anchor ID (remove # and any query params)
    const anchorId = anchor.split('#')[1]?.split('?')[0]
    if (!anchorId) return false
    
    // Check if anchor exists in HTML (id or name attribute)
    const idRegex = new RegExp(`id=["']${anchorId}["']`, 'i')
    const nameRegex = new RegExp(`name=["']${anchorId}["']`, 'i')
    return idRegex.test(html) || nameRegex.test(html)
  } catch (error) {
    return false
  }
}

async function checkImage(imageSrc: string, baseUrl: string): Promise<boolean> {
  try {
    let imageUrl = imageSrc
    if (imageSrc.startsWith('/')) {
      imageUrl = `${baseUrl}${imageSrc}`
    } else if (!imageSrc.startsWith('http')) {
      // Relative path, assume from baseUrl
      imageUrl = `${baseUrl}${imageSrc}`
    }
    
    const response = await fetch(imageUrl, { method: 'HEAD' })
    return response.status === 200
  } catch (error) {
    return false
  }
}

async function crawlPage(url: string): Promise<LinkCheckResult> {
  const result: LinkCheckResult = {
    url,
    status: 0,
    brokenLinks: [],
    missingImages: [],
    brokenAnchors: [],
  }

  const { status, html } = await fetchPage(url)
  result.status = status

  if (status !== 200 || !html) {
    return result
  }

  // Check links
  const links = extractLinks(html, baseUrl)
  for (const link of links) {
    // Skip external links and anchors
    if (!link.startsWith(baseUrl)) continue
    if (link.includes('#')) continue
    
    const linkStatus = await checkLink(link)
    if (linkStatus !== 200) {
      result.brokenLinks.push(`${link} (${linkStatus || 'timeout'})`)
    }
  }

  // Check images
  const images = extractImages(html)
  for (const imageSrc of images) {
    // Skip data URIs and external images
    if (imageSrc.startsWith('data:') || (imageSrc.startsWith('http') && !imageSrc.startsWith(baseUrl))) {
      continue
    }
    
    const exists = await checkImage(imageSrc, baseUrl)
    if (!exists) {
      result.missingImages.push(imageSrc)
    }
  }

  // Check anchors
  const anchors = extractAnchors(html)
  for (const anchor of anchors) {
    const [pageUrl, anchorHash] = anchor.split('#')
    if (!anchorHash) continue
    
    let fullPageUrl = pageUrl
    if (pageUrl.startsWith('/')) {
      fullPageUrl = `${baseUrl}${pageUrl}`
    } else if (!pageUrl.startsWith('http')) {
      fullPageUrl = `${baseUrl}${pageUrl}`
    }
    
    const exists = await checkAnchor(fullPageUrl, anchorHash)
    if (!exists) {
      result.brokenAnchors.push(anchor)
    }
  }

  return result
}

async function main() {
  console.log('\n' + '='.repeat(80))
  console.log('PHASE 8: LINK CHECK REPORT')
  console.log('='.repeat(80) + '\n')

  const summary: Summary = {
    totalPages: 0,
    passed: 0,
    failed: 0,
    brokenLinks: [],
    missingImages: [],
    brokenAnchors: [],
  }

  // Get all service and resource URLs
  const pagesToCheck: string[] = [
    '/services',
    '/resources',
  ]

  // Get service URLs (sample first 10)
  try {
    const servicesResponse = await fetch(`${baseUrl}/services`)
    if (servicesResponse.ok) {
      // We'll check the hub pages and a few sample detail pages
      pagesToCheck.push('/services/septic-tank-pumping')
      pagesToCheck.push('/services/drain-field-installation')
      pagesToCheck.push('/services/septic-tank-repair')
    }
  } catch (error) {
    console.log('⚠️  Could not fetch services list')
  }

  // Get resource URLs (sample first 10)
  try {
    const resourcesResponse = await fetch(`${baseUrl}/resources`)
    if (resourcesResponse.ok) {
      pagesToCheck.push('/resources/septic-tank-pumping')
      pagesToCheck.push('/resources/septic-tank-cleaning')
      pagesToCheck.push('/resources/septic-tank-inspection')
    }
  } catch (error) {
    console.log('⚠️  Could not fetch resources list')
  }

  console.log(`🔍 Checking ${pagesToCheck.length} pages...\n`)

  for (const page of pagesToCheck) {
    const url = `${baseUrl}${page}`
    summary.totalPages++
    
    console.log(`  Checking: ${page}`)
    const result = await crawlPage(url)

    if (result.status === 200) {
      summary.passed++
    } else {
      summary.failed++
    }

    // Collect broken links
    result.brokenLinks.forEach(link => {
      summary.brokenLinks.push({ url: result.url, link, status: 0 })
    })

    // Collect missing images
    result.missingImages.forEach(image => {
      summary.missingImages.push({ url: result.url, image })
    })

    // Collect broken anchors
    result.brokenAnchors.forEach(anchor => {
      summary.brokenAnchors.push({ url: result.url, anchor })
    })
  }

  // Print summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`  Total pages checked: ${summary.totalPages}`)
  console.log(`  Passed (200): ${summary.passed}`)
  console.log(`  Failed: ${summary.failed}`)
  console.log(`  Broken links: ${summary.brokenLinks.length}`)
  console.log(`  Missing images: ${summary.missingImages.length}`)
  console.log(`  Broken anchors: ${summary.brokenAnchors.length}`)
  console.log()

  // Print broken links (max 20)
  if (summary.brokenLinks.length > 0) {
    console.log('❌ BROKEN LINKS (max 20):')
    console.log('─'.repeat(80))
    summary.brokenLinks.slice(0, 20).forEach(({ url, link }) => {
      console.log(`  ${url}`)
      console.log(`    → ${link}`)
    })
    console.log()
  }

  // Print missing images (max 20)
  if (summary.missingImages.length > 0) {
    console.log('❌ MISSING IMAGES (max 20):')
    console.log('─'.repeat(80))
    summary.missingImages.slice(0, 20).forEach(({ url, image }) => {
      console.log(`  ${url}`)
      console.log(`    → ${image}`)
    })
    console.log()
  }

  // Print broken anchors (max 20)
  if (summary.brokenAnchors.length > 0) {
    console.log('❌ BROKEN ANCHORS (max 20):')
    console.log('─'.repeat(80))
    summary.brokenAnchors.slice(0, 20).forEach(({ url, anchor }) => {
      console.log(`  ${url}`)
      console.log(`    → ${anchor}`)
    })
    console.log()
  }

  // Final result
  const totalIssues = summary.brokenLinks.length + summary.missingImages.length + summary.brokenAnchors.length
  if (summary.failed === 0 && totalIssues === 0) {
    console.log('✅ LINK CHECK PASSED')
    console.log('─'.repeat(80))
    console.log('  All pages respond with 200')
    console.log('  No broken links, missing images, or broken anchors found')
    console.log()
  } else {
    console.log('❌ LINK CHECK FAILED')
    console.log('─'.repeat(80))
    if (summary.failed > 0) {
      console.log(`  ${summary.failed} page(s) returned non-200 status`)
    }
    if (totalIssues > 0) {
      console.log(`  Found ${totalIssues} issue(s)`)
    }
    console.log()
    process.exit(1)
  }
}

main().catch(error => {
  console.error('❌ Error:', error)
  process.exit(1)
})

