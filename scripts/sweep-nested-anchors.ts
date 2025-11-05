#!/usr/bin/env tsx
/**
 * Phase A: Sweep nested anchors
 * Finds any <a> or <Link> nested inside another <a> or <Link>
 */

import fs from 'fs'
import path from 'path'

const exts = ['.tsx', '.jsx', '.mdx', '.ts', '.js']
let bad = 0

function checkNestedAnchors(content: string, filePath: string): void {
  const lines = content.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Check for Link containing Link or <a>
    if (/<Link[^>]*>[\s\S]*?<Link|<Link[^>]*>[\s\S]*?<a[^>]*>/.test(line)) {
      // More precise: check if Link tag contains another Link or <a> before closing
      const linkOpenMatch = line.match(/<Link[^>]*>/g)
      if (linkOpenMatch) {
        let depth = 0
        let inLink = false
        let linkStartCol = 0
        
        for (let j = 0; j < line.length; j++) {
          const substr = line.substring(j)
          
          if (substr.startsWith('<Link')) {
            if (inLink) {
              console.error(`❌ Nested Link found in: ${filePath}:${i + 1}`)
              bad++
              break
            }
            inLink = true
            linkStartCol = j
            depth++
          } else if (substr.startsWith('</Link>')) {
            inLink = false
            depth--
          } else if (inLink && substr.startsWith('<a')) {
            console.error(`❌ <a> nested in <Link> found in: ${filePath}:${i + 1}`)
            bad++
            break
          } else if (inLink && substr.startsWith('</a>')) {
            // This is fine, it's closing an inner anchor
          }
        }
      }
    }
    
    // Check for <a> containing <a> or Link
    if (/<a[^>]*>[\s\S]*?<a|<a[^>]*>[\s\S]*?<Link/.test(line)) {
      const anchorOpenMatch = line.match(/<a[^>]*>/g)
      if (anchorOpenMatch) {
        let inAnchor = false
        
        for (let j = 0; j < line.length; j++) {
          const substr = line.substring(j)
          
          if (substr.startsWith('<a')) {
            if (inAnchor) {
              console.error(`❌ Nested <a> found in: ${filePath}:${i + 1}`)
              bad++
              break
            }
            inAnchor = true
          } else if (substr.startsWith('</a>')) {
            inAnchor = false
          } else if (inAnchor && substr.startsWith('<Link')) {
            console.error(`❌ <Link> nested in <a> found in: ${filePath}:${i + 1}`)
            bad++
            break
          }
        }
      }
    }
  }
}

function walk(dir: string) {
  if (!fs.existsSync(dir)) return

  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    const s = fs.statSync(p)

    if (s.isDirectory()) {
      // Skip node_modules and .next
      if (f === 'node_modules' || f === '.next' || f === 'dist' || f === 'build') continue
      walk(p)
    } else if (exts.includes(path.extname(p))) {
      const txt = fs.readFileSync(p, 'utf8')
      checkNestedAnchors(txt, p)
    }
  }
}

console.log('🔍 Sweeping for nested anchors...\n')

const dirs = ['components', 'app', 'pages', 'content']
dirs.forEach((d) => {
  if (fs.existsSync(d)) {
    walk(d)
  }
})

if (bad) {
  console.error(`\n❌ Found ${bad} nested anchor pattern(s). Fix before proceeding.`)
  process.exit(1)
} else {
  console.log('✅ No nested anchors detected.')
}

