# 🚀 CURSOR: START HERE

**Project:** Miami Septic Pros Article Generation
**Status:** ✅ READY TO BEGIN
**Your Task:** Generate 12 service articles, one at a time, following strict quality gates

---

## Quick Start

### 1. Read These Files First (in order)
1. `/msp/README.md` — Complete system overview
2. `/msp/templates/writer_system_prompt.txt` — Locked writing rules
3. `/msp/reports/acceptance_checklist.md` — Quality gates you must pass
4. `/msp/queue/article_queue.json` — List of 12 articles to generate

### 2. Your First Command

**Type this to begin:**
```
BEGIN ARTICLE 1: septic-tank-pumping
```

### 3. Workflow Summary

For each article, you will:

1. **Research** (30-45 min)
   - Use Perplexity for Miami-Dade specific data
   - Document costs, permits, local factors
   - Find 3-5 authoritative sources
   - Create brief: `/msp/briefs/septic-tank-pumping_brief.md`

2. **Write** (45-60 min)
   - Copy `/msp/templates/service_page.mdx`
   - Follow `/msp/templates/writer_system_prompt.txt` exactly
   - Replace all {{VARIABLES}}
   - Write 1,500-3,000 words
   - Save to `/content/services/septic-tank-pumping.mdx`

3. **Schema** (15 min)
   - Generate FAQ JSON-LD (5-7 Q&As)
   - Generate Service JSON-LD
   - Generate Breadcrumb JSON-LD
   - Validate in Google Rich Results Test

4. **Quality Check** (15-20 min)
   - Copy `/msp/reports/acceptance_checklist.md`
   - Complete every single item
   - Mark `[x]` when verified
   - Save as `/msp/reports/septic-tank-pumping_report.md`

5. **Assets** (10 min)
   - Create OG image (1200×630px)
   - Save to `/public/images/og/septic-tank-pumping.png`

6. **Complete**
   - Update article status to "complete" in queue
   - Output: **"ARTICLE 1 COMPLETE — READY FOR CONTINUE"**
   - **STOP and WAIT** for user to say "CONTINUE"

---

## Critical Rules

🚫 **DO NOT:**
- Skip articles or process out of order
- Batch process multiple articles
- Invent prices or statistics
- Leave [[NEEDS_VERIFY]] tags
- Skip checklist items
- Continue to next article without "CONTINUE" signal

✅ **DO:**
- Follow writer system prompt exactly
- Document all research sources
- Pass every quality gate
- Test all links
- Validate all schema
- Wait for "CONTINUE" between articles

---

## File Paths You'll Use

### Templates (READ ONLY)
- `/msp/templates/writer_system_prompt.txt`
- `/msp/templates/service_page.mdx`
- `/msp/schemas/*.template.json`

### You Create (PER ARTICLE)
- `/msp/briefs/{service_slug}_brief.md`
- `/content/services/{service_slug}.mdx`
- `/msp/reports/{service_slug}_report.md`
- `/public/images/og/{service_slug}.png`

### You Update
- `/msp/queue/article_queue.json` (update status field)

---

## Quality Gates (MUST PASS ALL)

Every article requires:

✅ **Research**
- Minimum 3 authoritative sources
- Miami-Dade specific permit info
- Local cost data or methodology

✅ **Content**
- 1,500-3,000 words
- 6th-7th grade reading level
- No SEO fluff or generic statements
- All {{VARIABLES}} replaced

✅ **Structure**
- 5-8 linkable facts (intro bullets)
- Cost, permits, scope, emergency, audience sections
- 5-7 FAQ items
- CTA block

✅ **Links**
- 3+ internal links (services hub, location, related)
- 3+ external citations (all live URLs)

✅ **Schema**
- FAQ JSON-LD validated
- Service JSON-LD validated
- Breadcrumb JSON-LD validated

✅ **Assets**
- OG image created (1200×630px, <200KB)

---

## The 12 Articles (In Order)

Process sequentially. Do not skip ahead.

1. ✅ `septic-tank-pumping` — **START HERE**
2. ⏸ `septic-tank-cleaning`
3. ⏸ `septic-tank-inspection`
4. ⏸ `emergency-septic-services`
5. ⏸ `septic-tank-unclogging`
6. ⏸ `septic-system-maintenance-plans`
7. ⏸ `septic-tank-riser-installation`
8. ⏸ `septic-baffle-replacement`
9. ⏸ `septic-filter-cleaning-replacement`
10. ⏸ `septic-alarm-repair-replacement`
11. ⏸ `drain-field-repair`
12. ⏸ `septic-odor-troubleshooting`

---

## Example: First Article Flow

**User says:** "BEGIN ARTICLE 1: septic-tank-pumping"

**You do:**
1. Research septic tank pumping in Miami-Dade
2. Create `/msp/briefs/septic-tank-pumping_brief.md`
3. Write article at `/content/services/septic-tank-pumping.mdx`
4. Generate all schema markup
5. Complete `/msp/reports/septic-tank-pumping_report.md`
6. Create OG image
7. Update queue status to "complete"

**You output:** "ARTICLE 1 COMPLETE — READY FOR CONTINUE"

**You STOP and WAIT.**

**User says:** "CONTINUE"

**You do:** Start Article 2 (septic-tank-cleaning)

---

## Need Help?

- **Writing questions:** See `/msp/templates/writer_system_prompt.txt`
- **Quality questions:** See `/msp/reports/acceptance_checklist.md`
- **Structure questions:** See `/msp/templates/service_page.mdx`
- **Technical questions:** See `/msp/README.md`

---

## Miami Septic Pros Details

**Business:** Miami Septic Pros
**Address:** 55 SW 9th St, Apt 3806, Miami, FL 33130
**Phone:** +1 (305) 555-0100
**Email:** info@miamisepticpros.com
**Service Area:** Miami-Dade County (Miami, Coral Gables, Kendall, Doral, Hialeah, Aventura, Homestead)

**Local Context to Include:**
- High water table challenges
- Hurricane/storm surge considerations
- Saltwater intrusion (coastal areas)
- Miami-Dade Regulatory and Economic Resources (permits)
- Coral rock and limestone soil
- Heavy rainfall and flooding

---

## Ready?

**Type this command to begin:**

```
BEGIN ARTICLE 1: septic-tank-pumping
```

---

**Status:** 🟢 SYSTEM READY
**Waiting for:** Cursor to execute first article
