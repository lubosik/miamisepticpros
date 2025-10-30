# BRAND TOKENS — SepticTankQuoteHub

**Version:** 1.0
**Last Updated:** 2025-10-29
**Purpose:** Single source of truth for all design tokens (colors, typography, spacing, shadows, radii)

---

## 1. Color Palette

### 1.1 Primary Colors

| Token Name            | Hex Value | Usage                                      | WCAG AA on White |
|-----------------------|-----------|--------------------------------------------|------------------|
| `PRIMARY_NAVY`        | `#1a2332` | Headings (H1, H2), primary text            | ✅ 13.2:1        |
| `CHARCOAL`            | `#2d3748` | Secondary headings (H3, H4), emphasis      | ✅ 10.8:1        |
| `BODY_TEXT`           | `#374151` | Body copy, paragraphs                      | ✅ 8.9:1         |
| `MUTED_TEXT`          | `#6b7280` | Captions, metadata, timestamps             | ✅ 4.6:1         |
| `ACCENT_GREEN`        | `#047857` | Links, CTAs, highlights, active states     | ✅ 5.1:1         |
| `ACCENT_GREEN_HOVER`  | `#065f46` | Hover state for ACCENT_GREEN               | ✅ 6.8:1         |

### 1.2 Surface Colors

| Token Name            | Hex Value | Usage                                      |
|-----------------------|-----------|--------------------------------------------|
| `SURFACE_WHITE`       | `#ffffff` | Main page background                       |
| `SURFACE_GRAY_50`     | `#f9fafb` | Subtle backgrounds (code blocks, tables)   |
| `SURFACE_GRAY_100`    | `#f3f4f6` | Zebra stripes, hover states                |

### 1.3 Border Colors

| Token Name            | Hex Value | Usage                                      |
|-----------------------|-----------|--------------------------------------------|
| `BORDER_LIGHT`        | `#e5e7eb` | Table borders, dividers, input borders     |
| `BORDER_DEFAULT`      | `#d1d5db` | Stronger borders, focus rings              |

### 1.4 CSS Custom Properties

Add to `/styles/tokens.css`:

```css
:root {
  /* Colors */
  --color-primary-navy: #1a2332;
  --color-charcoal: #2d3748;
  --color-body-text: #374151;
  --color-muted-text: #6b7280;
  --color-accent-green: #047857;
  --color-accent-green-hover: #065f46;

  --color-surface-white: #ffffff;
  --color-surface-gray-50: #f9fafb;
  --color-surface-gray-100: #f3f4f6;

  --color-border-light: #e5e7eb;
  --color-border-default: #d1d5db;
}
```

### 1.5 Tailwind Config Extension

Add to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-navy': '#1a2332',
        'charcoal': '#2d3748',
        'body-text': '#374151',
        'muted-text': '#6b7280',
        'accent-green': '#047857',
        'accent-green-hover': '#065f46',
        'surface-white': '#ffffff',
        'surface-gray-50': '#f9fafb',
        'surface-gray-100': '#f3f4f6',
        'border-light': '#e5e7eb',
        'border-default': '#d1d5db',
      },
    },
  },
}
```

---

## 2. Typography

### 2.1 Font Families

| Token Name         | Stack                                                                 | Usage                  |
|--------------------|-----------------------------------------------------------------------|------------------------|
| `SERIF_HEADINGS`   | `'Source Serif Pro', 'Georgia', 'Cambria', serif`                    | H1, H2, H3             |
| `SANS_BODY`        | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Body text, H4, H5, H6  |
| `SANS_UI`          | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`             | Buttons, nav, UI       |
| `MONOSPACE`        | `'SF Mono', 'Consolas', 'Monaco', monospace`                         | Code blocks (rare)     |

### 2.2 Type Scale

| Element   | Size (rem/px)           | Font Family      | Weight | Line Height | Letter Spacing | Color          |
|-----------|-------------------------|------------------|--------|-------------|----------------|----------------|
| **H1**    | `clamp(2.25rem, 4vw, 3rem)` (36–48px) | SERIF_HEADINGS | 700    | 1.1         | -0.02em        | PRIMARY_NAVY   |
| **H2**    | `clamp(1.75rem, 3vw, 2.25rem)` (28–36px) | SERIF_HEADINGS | 600    | 1.2         | -0.01em        | CHARCOAL       |
| **H3**    | `1.5rem` (24px)         | SERIF_HEADINGS   | 600    | 1.3         | 0              | CHARCOAL       |
| **H4**    | `1.25rem` (20px)        | SANS_BODY        | 600    | 1.4         | 0              | CHARCOAL       |
| **H5**    | `1.125rem` (18px)       | SANS_BODY        | 600    | 1.4         | 0              | CHARCOAL       |
| **H6**    | `1rem` (16px)           | SANS_BODY        | 600    | 1.5         | 0.05em         | CHARCOAL       |
| **Body**  | `1rem` (16px)           | SANS_BODY        | 400    | 1.7         | 0              | BODY_TEXT      |
| **Body LG** | `1.125rem` (18px)     | SANS_BODY        | 400    | 1.7         | 0              | BODY_TEXT      |
| **Small** | `0.875rem` (14px)       | SANS_BODY        | 400    | 1.5         | 0              | MUTED_TEXT     |
| **Tiny**  | `0.75rem` (12px)        | SANS_BODY        | 400    | 1.4         | 0              | MUTED_TEXT     |

### 2.3 CSS Custom Properties

```css
:root {
  /* Font Families */
  --font-serif-headings: 'Source Serif Pro', 'Georgia', 'Cambria', serif;
  --font-sans-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-sans-ui: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-monospace: 'SF Mono', 'Consolas', 'Monaco', monospace;

  /* Type Scale */
  --font-size-h1: clamp(2.25rem, 4vw, 3rem);
  --font-size-h2: clamp(1.75rem, 3vw, 2.25rem);
  --font-size-h3: 1.5rem;
  --font-size-h4: 1.25rem;
  --font-size-h5: 1.125rem;
  --font-size-h6: 1rem;
  --font-size-body: 1rem;
  --font-size-body-lg: 1.125rem;
  --font-size-small: 0.875rem;
  --font-size-tiny: 0.75rem;

  /* Line Heights */
  --line-height-tight: 1.1;
  --line-height-snug: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-snug: -0.01em;
  --letter-spacing-wide: 0.05em;
}
```

### 2.4 Tailwind Config Extension

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'serif-headings': ['Source Serif Pro', 'Georgia', 'Cambria', 'serif'],
        'sans-body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'sans-ui': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['SF Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'h1': ['clamp(2.25rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'h5': ['1.125rem', { lineHeight: '1.4' }],
        'h6': ['1rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'tiny': ['0.75rem', { lineHeight: '1.4' }],
      },
    },
  },
}
```

---

## 3. Spacing Scale

| Token Name  | Value (px) | Value (rem) | Usage Examples                              |
|-------------|------------|-------------|---------------------------------------------|
| `SPACE_1`   | 4px        | 0.25rem     | Icon padding, tiny gaps                     |
| `SPACE_2`   | 8px        | 0.5rem      | Small margins, list item spacing            |
| `SPACE_3`   | 12px       | 0.75rem     | List item spacing, card padding             |
| `SPACE_4`   | 16px       | 1rem        | Paragraph margin, button padding            |
| `SPACE_5`   | 20px       | 1.25rem     | Section spacing (small)                     |
| `SPACE_6`   | 24px       | 1.5rem      | Paragraph margin-bottom, card padding       |
| `SPACE_8`   | 32px       | 2rem        | Section spacing (medium), sticky top offset |
| `SPACE_10`  | 40px       | 2.5rem      | H3 margin-top, component spacing            |
| `SPACE_12`  | 48px       | 3rem        | H2 margin-top, large component gaps         |
| `SPACE_16`  | 64px       | 4rem        | Section dividers, hero padding              |
| `SPACE_20`  | 80px       | 5rem        | Major section breaks                        |
| `SPACE_24`  | 96px       | 6rem        | Hero padding (large screens)                |

### 3.1 Vertical Rhythm (Article Content)

| Element                 | Margin Top  | Margin Bottom |
|-------------------------|-------------|---------------|
| Paragraph (`<p>`)       | 0           | `SPACE_6` (24px) |
| H2                      | `SPACE_12` (48px) | `SPACE_4` (16px) |
| H3                      | `SPACE_10` (40px) | `SPACE_4` (16px) |
| H4, H5, H6              | `SPACE_8` (32px)  | `SPACE_3` (12px) |
| Unordered/Ordered List  | 0           | `SPACE_6` (24px) |
| List Item (`<li>`)      | 0           | `SPACE_3` (12px) |
| Blockquote              | `SPACE_8` (32px)  | `SPACE_8` (32px) |
| Table                   | `SPACE_8` (32px)  | `SPACE_8` (32px) |
| Image                   | `SPACE_8` (32px)  | `SPACE_8` (32px) |

### 3.2 CSS Custom Properties

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### 3.3 Tailwind Config Extension

Already included in default Tailwind scale. Use as: `p-3` (12px), `mt-12` (48px), etc.

---

## 4. Border Radius

| Token Name    | Value | Usage                                      |
|---------------|-------|--------------------------------------------|
| `RADIUS_SM`   | 2px   | Buttons, tags, small UI elements           |
| `RADIUS_MD`   | 4px   | Cards, inputs, most components             |
| `RADIUS_LG`   | 6px   | Hero images, modals, large containers      |

### 4.1 CSS Custom Properties

```css
:root {
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
}
```

### 4.2 Tailwind Config Extension

```js
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '6px',
      },
    },
  },
}
```

---

## 5. Shadows

| Token Name    | Value                                                                        | Usage                     |
|---------------|------------------------------------------------------------------------------|---------------------------|
| `SHADOW_SM`   | `0 1px 2px 0 rgba(0, 0, 0, 0.05)`                                            | Subtle elevation (cards)  |
| `SHADOW_MD`   | `0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)`   | Cards, dropdowns          |
| `SHADOW_LG`   | `0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)` | Modals, sticky bars       |

### 5.1 CSS Custom Properties

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}
```

### 5.2 Tailwind Config Extension

```js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
}
```

---

## 6. Prose (Article Content) Max-Width

| Token Name         | Value | Usage                                      |
|--------------------|-------|--------------------------------------------|
| `PROSE_MAX_WIDTH`  | 70ch  | Max width for article body text (optimal readability) |

### 6.1 CSS

```css
.prose {
  max-width: 70ch;
  margin-left: auto;
  margin-right: auto;
}
```

### 6.2 Tailwind

```js
// Use Tailwind's prose plugin or custom class
<article className="prose prose-lg max-w-[70ch] mx-auto">
```

---

## 7. Breakpoints (Responsive Design)

Use Tailwind's default breakpoints:

| Name    | Min Width | Usage                |
|---------|-----------|----------------------|
| `sm`    | 640px     | Mobile landscape     |
| `md`    | 768px     | Tablet               |
| `lg`    | 1024px    | Desktop (TOC aside)  |
| `xl`    | 1280px    | Large desktop        |
| `2xl`   | 1536px    | Extra large          |

### 7.1 Special Rules

- **TOC Aside:** Sticky on `lg+`, collapsible accordion on `< lg`
- **Sticky Mobile CTA:** Show on `< md` only
- **Header Nav:** Hamburger menu on `< md`, full nav on `md+`

---

## 8. Transitions & Animations

| Token Name               | Value                          | Usage                        |
|--------------------------|--------------------------------|------------------------------|
| `TRANSITION_FAST`        | `150ms ease-in-out`            | Hover states, button clicks  |
| `TRANSITION_NORMAL`      | `200ms ease-in-out`            | Default transitions          |
| `TRANSITION_SLOW`        | `300ms ease-in-out`            | Modals, drawers              |

### 8.1 CSS

```css
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}

.btn {
  transition: background-color var(--transition-fast);
}
```

---

## 9. Usage Examples

### 9.1 Button Component (Tailwind)

```jsx
<button className="
  bg-accent-green hover:bg-accent-green-hover
  text-white font-sans-ui font-semibold
  px-6 py-3
  rounded-sm
  shadow-md hover:shadow-lg
  transition-all duration-150
">
  Get Free Quote
</button>
```

### 9.2 Card Component (CSS)

```css
.service-card {
  background: var(--color-surface-white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  transition: box-shadow var(--transition-fast);
}

.service-card:hover {
  box-shadow: var(--shadow-lg);
}
```

### 9.3 Article Heading (Tailwind)

```jsx
<h1 className="
  font-serif-headings font-bold
  text-h1 text-primary-navy
  leading-tight tracking-tight
  mb-4
">
  Complete Guide to Septic Tank Pumping in Miami, FL
</h1>
```

---

## 10. Accessibility Notes

- **Color Contrast:** All text/background combinations meet WCAG AA (4.5:1 for body, 3:1 for large text)
- **Focus Rings:** Use `ACCENT_GREEN` with 2px solid outline, 2px offset
- **Font Sizes:** Minimum 16px for body text (1rem)
- **Touch Targets:** Minimum 44×44px for buttons, links (mobile)

---

## 11. Token Checklist for Cursor

When implementing components, verify:
- [ ] All colors from `BRAND_TOKENS.md` palette
- [ ] Font families match `SERIF_HEADINGS` / `SANS_BODY`
- [ ] Font sizes use scale (H1–H6, Body, Small)
- [ ] Spacing uses scale (SPACE_1 → SPACE_24)
- [ ] Border radius matches `RADIUS_SM/MD/LG`
- [ ] Shadows use `SHADOW_SM/MD/LG`
- [ ] Transitions use `TRANSITION_FAST/NORMAL/SLOW`
- [ ] Prose max-width = 70ch
- [ ] Mobile breakpoints respected (TOC, CTA placement)

---

**END OF BRAND TOKENS**
