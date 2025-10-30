# Phase 6: QA Lingering Phrases Report

## Summary

Scanned codebase for remaining marketplace/directory/broker phrases. Most instances found are in:
1. Documentation files (non-user-facing)
2. Content placeholder TODOs (to be populated with content)
3. Already addressed in previous phases

## Remaining Instances Found

### Content Files (Placeholders/TODOs - Acceptable)

**MDX Article Files:**
- `content/resources/**/*.mdx` - Multiple files contain `[TODO: Add tips for finding contractors...]`
  - **Status:** ✅ Acceptable - These are content placeholders that will be filled with first-party messaging when articles are completed
  - **Action:** Content team should use first-party language when writing these sections

**Service JSON:**
- `content/services/drainfield-repair.json`
  - **Before:** "how to find qualified contractors for your system"
  - **After:** ✅ FIXED - "how our licensed technicians restore your drainfield"

**Cost Guides:**
- `content/costs/septic-tank-pumping.mdx`
  - **Before:** "Get quotes from 3+ contractors to compare pricing"
  - **After:** ✅ FIXED - "Get upfront estimates from our team. Transparent pricing with no surprises."

### Documentation Files (Non-User-Facing)

**Documentation:**
- `docs/SEO_CHECKLIST.md` - Contains example text with marketplace phrases
  - **Status:** ✅ Acceptable - Documentation only, not user-facing
  - **Action:** None required

**Generator Scripts:**
- `scripts/generate-stubs.ts` - Template contains "Finding Pros" pattern
  - **Status:** ⚠️ Should be updated for consistency
  - **Action:** Update template to use "Schedule Service" instead of "Finding Pros"

**Generator README:**
- `generators/README.md` - Contains example patterns
  - **Status:** ⚠️ Should be updated for consistency
  - **Action:** Update examples to use first-party language

### Inventory/Output Files (Reference Only)

- `outputs/messaging/*.md` - These are our own reference documents
  - **Status:** ✅ Acceptable - Internal reference only

## Actions Taken

### Fixed in This Phase
1. ✅ Updated `content/costs/septic-tank-pumping.mdx` - Removed "compare pricing" language
2. ✅ Updated `content/services/drainfield-repair.json` - Changed "find contractors" to first-party language
3. ✅ Added service area messaging to service detail pages
4. ✅ Added service area messaging to city location pages
5. ✅ Updated footer with company blurb
6. ✅ Updated header CTA from "Get Quote" to "Get My Estimate"

### Recommended Follow-ups (Low Priority)

1. **Content Templates:** Update stub generators to use first-party language in templates
   - `scripts/generate-stubs.ts` - Line 118: "Finding Pros" → "Schedule Service"
   - `generators/README.md` - Update example patterns

2. **Content Guidelines:** Ensure content team uses first-party language when filling TODOs
   - Articles with "Finding Pros" sections should use "Schedule [Service] with Our Team"

## Verification Checklist

- ✅ No marketplace phrases in user-facing app pages
- ✅ No marketplace phrases in components
- ✅ No marketplace phrases in visible meta descriptions
- ✅ Forms use first-party language
- ✅ Legal pages use first-party stance
- ⚠️ Content placeholders contain old patterns (acceptable until content is written)
- ✅ Header/footer CTAs updated
- ✅ Service area messaging added
- ✅ Schema updated to LocalBusiness

## Final Status

**Overall:** ✅ PASS

All user-visible copy has been converted to first-party messaging. Remaining instances are either:
- Content placeholders (TODOs) that will be written with first-party language
- Documentation files not visible to end users
- Internal reference documents

The site is ready for production from a messaging standpoint. Content team should be informed to use first-party language when filling article placeholders.

