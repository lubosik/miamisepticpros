# ARTICLE STYLE GUIDE — "Medium-like, Not Brochure"

**Version:** 1.0
**Last Updated:** 2025-10-29
**Purpose:** Define the visual and editorial style for all article/guide content on SepticTankQuoteHub

---

## 1. Design Philosophy

**Goal:** Create a clean, distraction-free reading experience that prioritizes content over decoration.

**Inspiration:**
- **Medium:** Simple layout, generous whitespace, readable typography, minimal UI chrome
- **The Verge / Stratechery:** Clear hierarchy, scannable structure, tasteful data presentation

**NOT:**
- Corporate brochures with colored info boxes
- Marketing landing pages with busy CTAs everywhere
- Wikipedia-style dense tables and sidebars

---

## 2. Layout Principles

### 2.1 Visual Rules — YES

✅ **Plain white background** (`SURFACE_WHITE`)
✅ **Generous horizontal margins** (min 5–10% viewport on desktop)
✅ **Content max-width: 70ch** for body text (optimal for reading)
✅ **Large, serif headings** (Source Serif Pro) with clear hierarchy
✅ **Short paragraphs** (2–4 sentences max; break longer ones)
✅ **Bullet lists** with comfortable spacing (`SPACE_3` / 12px between items)
✅ **Numbered lists** for step-by-step instructions
✅ **Optional single hero image** at top of article (1200×630, RADIUS_LG, subtle SHADOW_SM)
✅ **Subtle horizontal dividers** (`border-top: 1px solid BORDER_LIGHT`) to separate major sections
✅ **Pull-quotes** (rare, used for emphasis):
   - Italic style, `BODY_LG` size
   - Left border accent (3px solid `ACCENT_GREEN`)
   - Background: `SURFACE_GRAY_50` (optional, for contrast)
   - Max-width: 80% of prose width

### 2.2 Visual Rules — NO

❌ **Colored info boxes** (blue, yellow, red "callout" panels)
❌ **Gradient backgrounds**
❌ **Multi-column layouts** (except desktop TOC aside)
❌ **Decorative borders everywhere** (borders only on tables, dividers)
❌ **Busy header/footer within article** (keep Header/Footer minimal)
❌ **Floating social share bars** (no sticky left/right share buttons)
❌ **Auto-playing media** (no videos, GIFs unless explicitly added by user)

---

## 3. Typography Rules

### 3.1 Heading Hierarchy

**H1 (Page Title):**
- Font: `SERIF_HEADINGS` (Source Serif Pro)
- Size: `clamp(2.25rem, 4vw, 3rem)` (36–48px)
- Weight: 700 (bold)
- Color: `PRIMARY_NAVY`
- Usage: Once per article, at the very top
- Margin: 0 top, `SPACE_6` (24px) bottom

**H2 (Major Sections):**
- Font: `SERIF_HEADINGS`
- Size: `clamp(1.75rem, 3vw, 2.25rem)` (28–36px)
- Weight: 600 (semibold)
- Color: `CHARCOAL`
- Usage: Main content sections (3–6 per article for good TOC)
- Margin: `SPACE_12` (48px) top, `SPACE_4` (16px) bottom

**H3 (Subsections):**
- Font: `SERIF_HEADINGS`
- Size: `1.5rem` (24px)
- Weight: 600
- Color: `CHARCOAL`
- Usage: Sub-points under H2
- Margin: `SPACE_10` (40px) top, `SPACE_4` bottom

**H4–H6 (Rare, for deep nesting):**
- Font: `SANS_BODY` (Inter)
- Size: `1.25rem` (H4), `1.125rem` (H5), `1rem` (H6)
- Weight: 600
- Color: `CHARCOAL`
- Usage: Only when necessary (prefer flatter structure)

### 3.2 Body Text

**Paragraphs:**
- Font: `SANS_BODY` (Inter)
- Size: `1rem` (16px)
- Weight: 400 (regular)
- Line-height: 1.7
- Color: `BODY_TEXT`
- Margin-bottom: `SPACE_6` (24px)
- Max-width: 70ch

**Lead Paragraph (Optional):**
- First paragraph after H1
- Font: `SANS_BODY`
- Size: `1.125rem` (18px)
- Weight: 400
- Line-height: 1.7
- Color: `BODY_TEXT`
- Margin-bottom: `SPACE_8` (32px)
- Style: Often italic or slightly bolder (not required, just larger)

**Emphasis:**
- **Bold:** `font-weight: 600` for key terms (use sparingly)
- *Italic:* for emphasis, quotes (use sparingly)
- `Code:` Use monospace (`MONOSPACE`) for technical terms, file paths (rare in septic content)

### 3.3 Links

**Inline Links:**
- Color: `ACCENT_GREEN`
- Hover: `ACCENT_GREEN_HOVER`, underline
- Visited: Same as default (no purple)
- Transition: `TRANSITION_FAST` (150ms)

**External Links:**
- Add icon (optional): `↗` or small SVG after link text
- Open in new tab: `target="_blank" rel="noopener noreferrer"`

---

## 4. Lists

### 4.1 Unordered Lists (Bullets)

```html
<ul>
  <li>Item one with 2–3 sentences of explanation if needed.</li>
  <li>Item two, keep it scannable.</li>
  <li>Item three, use sub-bullets only when necessary.</li>
</ul>
```

**Style:**
- Bullet: Simple disc (default)
- Padding-left: `SPACE_6` (24px)
- List item spacing: `SPACE_3` (12px) between items
- Nested lists: Indent by `SPACE_4` (16px) more

### 4.2 Ordered Lists (Numbers)

```html
<ol>
  <li>First step: Describe action clearly.</li>
  <li>Second step: Include any warnings or tips.</li>
  <li>Third step: Conclude with result.</li>
</ol>
```

**Style:**
- Numbers: Decimal (1, 2, 3...)
- Padding-left: `SPACE_6` (24px)
- List item spacing: `SPACE_3` (12px)

### 4.3 Definition Lists (Rare)

Use for glossaries or term/definition pairs:

```html
<dl>
  <dt>Septic Tank</dt>
  <dd>Underground wastewater treatment chamber.</dd>

  <dt>Drainfield</dt>
  <dd>Soil absorption system for effluent.</dd>
</dl>
```

**Style:**
- `<dt>`: `font-weight: 600`, color `CHARCOAL`
- `<dd>`: Normal body text, margin-left `SPACE_4` (16px)

---

## 5. Tables — Minimal & Data-focused

### 5.1 When to Use Tables

✅ **Good Use Cases:**
- Cost comparisons (e.g., tank size vs. price)
- Symptom diagnosis (e.g., "Issue → Likely Cause → Action")
- Service frequency schedules (e.g., "System Type → Pumping Interval")
- Regional pricing data

❌ **Avoid Tables For:**
- Content that works better as a list
- Single-column data (use list instead)
- Dense paragraphs (use prose instead)

### 5.2 Table Style Rules

**Structure:**
```html
<table>
  <thead>
    <tr>
      <th>Tank Size (Gallons)</th>
      <th>Average Cost</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>750–1,000</td>
      <td>$300–$400</td>
      <td>Every 3 years</td>
    </tr>
    <tr>
      <td>1,000–1,500</td>
      <td>$400–$600</td>
      <td>Every 3–5 years</td>
    </tr>
  </tbody>
</table>
```

**Visual Style:**
- Border: `1px solid BORDER_LIGHT` around table and cells
- Header row (`<thead>`):
  - Background: `SURFACE_GRAY_100`
  - Font: `SANS_BODY`, `SMALL` size (14px)
  - Font-weight: 600
  - Text-align: left
  - Padding: `SPACE_3` (12px) vertical, `SPACE_4` (16px) horizontal
- Body rows (`<tbody>`):
  - Zebra striping: Every other row `background: SURFACE_GRAY_50`
  - Padding: `SPACE_3` vertical, `SPACE_4` horizontal
  - Font: `SANS_BODY`, `SMALL` size
  - Hover: `background: SURFACE_GRAY_100` (optional)
- Margin: `SPACE_8` (32px) top and bottom

**Responsive Behavior:**
- Desktop: Full table
- Mobile (`< 768px`):
  - **Option A:** Horizontal scroll (wrap in `<div style="overflow-x: auto">`)
  - **Option B:** Stack as definition list (`<dl>`) if 2 columns

### 5.3 Table Caption

```html
<table>
  <caption>Average Septic Tank Pumping Costs in South Florida (2025)</caption>
  <!-- ... -->
</table>
```

**Style:**
- Font: `SMALL`, `MUTED_TEXT`
- Text-align: left
- Padding-bottom: `SPACE_2` (8px)

---

## 6. Images

### 6.1 Hero Image (Optional)

**Placement:** Top of article, below H1 and metadata
**Dimensions:** 1200×630 (optimal for OG sharing)
**Style:**
- Max-width: 100%
- Border-radius: `RADIUS_LG` (6px)
- Box-shadow: `SHADOW_SM`
- Margin-bottom: `SPACE_8` (32px)

**Alt Text:** Required, descriptive (e.g., "Septic tank pumping truck in residential driveway")

### 6.2 Inline Images

**Placement:** Within article prose, centered
**Dimensions:** Flexible, but max-width 100%
**Style:**
- Display: block
- Margin: `SPACE_8` (32px) top and bottom
- Margin-left/right: auto (centered)
- Border-radius: `RADIUS_MD` (4px)
- Box-shadow: `SHADOW_SM` (optional)

**Caption:**
```html
<figure>
  <img src="..." alt="..." />
  <figcaption>Cross-section diagram of a septic system (Source: EPA)</figcaption>
</figure>
```

**Caption Style:**
- Font: `SMALL` (14px), `MUTED_TEXT`
- Text-align: center
- Margin-top: `SPACE_2` (8px)

### 6.3 Image Guidelines

- Use WebP format when possible (fallback to JPG/PNG)
- Optimize: < 200KB per image
- Lazy load: `loading="lazy"` (except hero image)
- No stock photos of generic "happy families" — prefer diagrams, real equipment photos, or no image

---

## 7. Blockquotes & Pull-quotes

### 7.1 Standard Blockquote (for citations)

```html
<blockquote>
  <p>Regular maintenance is the single most important factor in septic system longevity.</p>
  <cite>— Florida Department of Health</cite>
</blockquote>
```

**Style:**
- Border-left: `3px solid ACCENT_GREEN`
- Background: `SURFACE_GRAY_50`
- Padding: `SPACE_4` vertical, `SPACE_6` horizontal
- Font: `BODY` size, italic
- Margin: `SPACE_8` top and bottom
- Cite: `SMALL` size, `MUTED_TEXT`, not italic

### 7.2 Pull-quote (for emphasis, rare)

```html
<aside class="pullquote">
  <p>Most septic failures are preventable with routine pumping every 3–5 years.</p>
</aside>
```

**Style:**
- Font: `BODY_LG` (18px), italic
- Color: `PRIMARY_NAVY`
- Border-left: `4px solid ACCENT_GREEN`
- Background: none (or very subtle `SURFACE_GRAY_50`)
- Padding: `SPACE_4` left
- Margin: `SPACE_10` (40px) top and bottom
- Max-width: 80% of prose width

**Usage:** Use sparingly (1–2 per article max). Pull-quotes should highlight a key takeaway, not just repeat text.

---

## 8. Code Blocks (Rare)

For technical content (e.g., septic regulations, ordinance text):

```html
<pre><code>
Florida Statute 381.0065(4)(a): All septic tanks must be pumped
at intervals sufficient to prevent solids from entering the drainfield.
</code></pre>
```

**Style:**
- Font: `MONOSPACE`
- Size: `SMALL` (14px)
- Background: `SURFACE_GRAY_50`
- Border: `1px solid BORDER_LIGHT`
- Padding: `SPACE_4`
- Border-radius: `RADIUS_SM`
- Overflow-x: auto (horizontal scroll if needed)

---

## 9. Table of Contents (TOC)

### 9.1 Desktop (≥1024px)

**Placement:** Sticky right rail (outside main prose column)
**Width:** 240px
**Position:** `position: sticky; top: SPACE_8 (32px);`

**Structure:**
```html
<aside class="toc">
  <nav>
    <p class="toc-title">On this page</p>
    <ul>
      <li><a href="#section-1">Why Pumping Matters</a></li>
      <li><a href="#section-2">How Often to Pump</a></li>
      <li><a href="#section-3">Cost Breakdown</a>
        <ul>
          <li><a href="#section-3-1">By Tank Size</a></li>
        </ul>
      </li>
      <li><a href="#section-4">Finding Pros in Miami</a></li>
    </ul>
  </nav>
</aside>
```

**Style:**
- Title: `SANS_UI`, `SMALL`, `font-weight: 600`, `MUTED_TEXT`, uppercase
- Links: `SMALL`, `BODY_TEXT`, no underline
- Active section: `ACCENT_GREEN`, `font-weight: 600`
- Hover: `ACCENT_GREEN`
- Nested list: Indent by `SPACE_4` (16px), use smaller font (`TINY`)

### 9.2 Mobile/Tablet (<1024px)

**Placement:** Collapsible accordion at top of article (below H1/metadata, above first paragraph)

**Structure:**
```html
<details class="toc-mobile">
  <summary>On this page</summary>
  <nav>
    <ul>
      <li><a href="#section-1">Why Pumping Matters</a></li>
      <!-- ... -->
    </ul>
  </nav>
</details>
```

**Style:**
- Summary: `SANS_UI`, `BODY` size, `font-weight: 600`, `CHARCOAL`, chevron icon (▼)
- Background: `SURFACE_GRAY_50`
- Border: `1px solid BORDER_LIGHT`
- Border-radius: `RADIUS_MD`
- Padding: `SPACE_4`
- Default state: Collapsed
- Links: Same as desktop

---

## 10. Calls to Action (CTAs)

### 10.1 Inline CTA (After H2 #2)

**Placement:** After the 2nd H2 section (approximately 30–40% down the article)

**Structure:**
```html
<aside class="cta-inline">
  <p class="cta-text">Need a trusted septic pro in Miami?</p>
  <p class="cta-subtext">Get free quotes from licensed contractors in 60 seconds.</p>
  <a href="/quote" class="cta-button">Get Free Quote</a>
</aside>
```

**Style:**
- Background: `SURFACE_GRAY_50`
- Border: `1px solid BORDER_LIGHT`
- Border-radius: `RADIUS_MD`
- Padding: `SPACE_6`
- Margin: `SPACE_8` top and bottom
- Max-width: 90% of prose width (or 100%)
- Text-align: center

**CTA Text:**
- Font: `SANS_BODY`, `BODY_LG` (18px)
- Color: `CHARCOAL`
- Font-weight: 600

**CTA Subtext:**
- Font: `SMALL` (14px)
- Color: `MUTED_TEXT`
- Margin-bottom: `SPACE_4`

**CTA Button:**
- Background: `ACCENT_GREEN`
- Hover: `ACCENT_GREEN_HOVER`
- Color: `white`
- Font: `SANS_UI`, `BODY` size, `font-weight: 600`
- Padding: `SPACE_3` (12px) vertical, `SPACE_6` (24px) horizontal
- Border-radius: `RADIUS_SM`
- Box-shadow: `SHADOW_MD`, hover: `SHADOW_LG`
- Transition: `TRANSITION_FAST`

### 10.2 Sticky Mobile CTA (Mobile Only, <768px)

**Placement:** Fixed at bottom of viewport

**Structure:**
```html
<div class="cta-sticky-mobile">
  <a href="/quote" class="cta-button-mobile">Get Free Quote</a>
</div>
```

**Style:**
- Position: `fixed; bottom: 0; left: 0; right: 0;`
- Background: `SURFACE_WHITE`
- Box-shadow: `SHADOW_LG` (top shadow)
- Padding: `SPACE_4`
- Z-index: 50
- Border-top: `1px solid BORDER_LIGHT`

**Button:**
- Width: 100% (minus horizontal margins)
- Same style as inline CTA button
- Text: "Get Free Quote" (short, no subtext)

**Display Logic:**
- Show only on mobile (`< 768px`)
- Hide on desktop (`≥ 768px`)

---

## 11. Related Links

**Placement:** At the bottom of article, before footer

**Structure:**
```html
<section class="related-links">
  <h2>Related Guides</h2>
  <ul>
    <li><a href="/resources/septic-inspection/fl-miami">Septic Inspection in Miami, FL</a></li>
    <li><a href="/resources/emergency-pumping/fl-miami">Emergency Septic Pumping in Miami</a></li>
    <li><a href="/costs/septic-tank-pumping">Septic Tank Pumping Cost Guide</a></li>
  </ul>
</section>
```

**Style:**
- H2: `SERIF_HEADINGS`, `H3` size (24px), `CHARCOAL`
- List: No bullets (use `list-style: none`)
- Links: `ACCENT_GREEN`, underline on hover, `BODY` size
- Spacing: `SPACE_3` between links
- Margin: `SPACE_16` (64px) top, `SPACE_8` bottom

---

## 12. Metadata & Byline

**Placement:** Below H1, above hero image (or first paragraph if no image)

**Structure:**
```html
<div class="article-meta">
  <p class="author">By SepticTankQuoteHub</p>
  <p class="dates">
    <time datetime="2025-01-15">Published Jan 15, 2025</time>
    <span class="separator">•</span>
    <time datetime="2025-01-20">Updated Jan 20, 2025</time>
  </p>
</div>
```

**Style:**
- Font: `SMALL` (14px)
- Color: `MUTED_TEXT`
- Margin-bottom: `SPACE_6` (24px)
- Separator: Middle dot (•) with horizontal padding `SPACE_2` (8px)

---

## 13. Horizontal Dividers

Use sparingly to separate major sections (e.g., before "Related Links").

**Structure:**
```html
<hr />
```

**Style:**
- Border: none
- Border-top: `1px solid BORDER_LIGHT`
- Margin: `SPACE_16` (64px) top and bottom

---

## 14. Accessibility Notes

- **Alt text:** Required on all images (descriptive, not "image of...")
- **Heading hierarchy:** Never skip levels (H1 → H2 → H3, not H1 → H3)
- **Link text:** Descriptive ("read our cost guide") not generic ("click here")
- **Color contrast:** All text meets WCAG AA (verified in `BRAND_TOKENS.md`)
- **Focus indicators:** Visible on all interactive elements (links, buttons, form fields)
- **Keyboard navigation:** All CTAs, TOC links, and forms accessible via keyboard

---

## 15. Editorial Guidelines

### 15.1 Tone & Voice

- **Professional but approachable:** Not overly formal, not too casual
- **Educational:** Prioritize clarity and helpfulness over marketing fluff
- **Local:** Mention city/region when relevant (e.g., "Miami's high water table...")
- **Trust-building:** Cite sources (EPA, state health departments), use data

### 15.2 Content Structure

**Recommended Article Length:** 1,200–2,000 words

**Standard Article Outline:**
1. **H1:** Main title (include service + location)
2. **Lead paragraph:** What this guide covers (100–150 words)
3. **H2 #1:** What is [Service]? (Definition, overview)
4. **H2 #2:** Why You Need [Service] (Benefits, importance)
   - *Inline CTA placement after this section*
5. **H2 #3:** How [Service] Works (Process, steps)
6. **H2 #4:** Cost Breakdown (Pricing factors, table)
7. **H2 #5:** Finding Pros in [City] (Local tips, what to look for)
8. **H2 #6:** FAQs (3–5 common questions)
9. **Related Links**

**Heading Best Practices:**
- Use questions for FAQs: "How often should I pump my septic tank?"
- Use action verbs for steps: "Locate Your Septic Tank"
- Keep H2s to 6–8 words max

### 15.3 Keyword Integration

- **Primary keyword:** Include in H1, first paragraph, 1–2 H2s, naturally throughout
- **Support keywords:** Sprinkle throughout (don't force)
- **Avoid keyword stuffing:** Write for humans first, search engines second

### 15.4 Sources & Citations

- Link to authoritative sources: EPA, state health depts, university extensions
- Use inline links for citations (e.g., "According to the [EPA](link), septic systems...")
- No formal bibliography unless required (prefer inline links)

---

## 16. Checklist for Writers

Before publishing an article, verify:
- [ ] H1 includes service + location (e.g., "Septic Tank Pumping in Miami, FL")
- [ ] Lead paragraph (100–150 words) summarizes article
- [ ] 3–6 H2 sections for good TOC structure
- [ ] Short paragraphs (2–4 sentences each)
- [ ] At least one list (bullets or numbered)
- [ ] At least one table (if data-driven content)
- [ ] Inline CTA placed after H2 #2
- [ ] Related links section at bottom (3–4 links)
- [ ] All images have descriptive alt text
- [ ] No colored info boxes or busy decorations
- [ ] Max prose width: 70ch
- [ ] Front matter complete and validated (see content schemas)
- [ ] Sources cited with inline links
- [ ] No keyword stuffing (primary keyword appears 3–5 times naturally)

---

## 17. Examples (Annotated)

### 17.1 Good Example (Following Guidelines)

```markdown
# Complete Guide to Septic Tank Pumping in Miami, FL

By SepticTankQuoteHub | Published Jan 15, 2025 • Updated Jan 20, 2025

![Septic tank pumping truck in Miami residential driveway](hero.jpg)

If you own a septic system in Miami, regular pumping is essential to prevent backups, odors, and costly repairs. This guide covers everything you need to know about septic tank pumping in South Florida: how often to pump, what it costs, and how to find a trusted contractor in Miami-Dade County.

## What Is Septic Tank Pumping?

Septic tank pumping is the process of removing accumulated solids (sludge and scum) from your septic tank. Over time, these solids build up and reduce the tank's capacity. If not pumped regularly, solids can overflow into the drainfield, causing system failure.

[... continue with clear structure, short paragraphs, lists, tables ...]

---

## Related Guides

- Septic Inspection in Miami, FL
- Emergency Septic Pumping in South Florida
- Septic Tank Pumping Cost Guide
```

### 17.2 Bad Example (Violates Guidelines)

```markdown
# Miami Septic Services — We're Here to Help! 🚨

[BLUE INFO BOX]
Did you know? Most homeowners don't pump their septic tanks often enough!
[END BOX]

Welcome to our comprehensive guide on all things septic! We're so excited to share this information with you. Septic systems are super important and we want to make sure you know everything there is to know about them because knowledge is power and we're here to empower you!

[RED WARNING BOX]
WARNING: If you don't pump your septic tank, BAD THINGS WILL HAPPEN!
[END BOX]

[GIANT TABLE WITH 10 COLUMNS AND TINY TEXT]

Call us now for a free quote! Click here! Don't wait!

[... continues with long paragraphs, no structure, excessive CTAs, colored boxes everywhere ...]
```

**Why it's bad:**
- Emoji in H1 (unprofessional)
- Colored info boxes (busy, distracting)
- Long, rambling paragraphs
- No clear H2 structure (bad for TOC)
- Excessive CTAs (feels like a sales page)
- Giant table (not mobile-friendly)

---

## 18. Final Notes for Cursor

When implementing articles:
1. **Wrap all prose in `ProseStyles` component** (defined in Phase 2)
2. **Auto-generate TOC** from H2/H3 tags (extract IDs)
3. **Inject inline CTA** after H2 #2 programmatically (or use marker in MDX)
4. **Render sticky mobile CTA** only on `< 768px`
5. **Validate front matter** against schema before build
6. **Test responsive behavior** (especially tables, TOC, CTAs)
7. **Run Lighthouse audit** on sample article (aim for 90+ all scores)

---

**END OF ARTICLE STYLE GUIDE**
