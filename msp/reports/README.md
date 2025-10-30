# Reports Directory

This directory contains completion reports for each article. After completing an article and passing all quality gates, Cursor saves a copy of the acceptance checklist with all items marked complete.

## Report Naming Convention

```
{service_slug}_report.md
```

Examples:
- `septic-tank-pumping_report.md`
- `septic-tank-cleaning_report.md`
- `emergency-septic-services_report.md`

## Report Contents

Each report should be a completed copy of `/msp/reports/acceptance_checklist.md` with:

1. **All checkboxes marked** `[x]` for passed items
2. **Sign-off section completed** with date, time invested, and notes
3. **Any deviations documented** in the notes section
4. **Next article identified** for continuity

## Report Lifecycle

1. **Before writing:** Copy `acceptance_checklist.md` to `{service_slug}_report.md`
2. **During QA:** Mark items as complete `[x]` as you verify them
3. **After completion:** Fill in sign-off section
4. **Archive:** Report remains in `/msp/reports/` for audit trail

## Audit Trail

Reports serve as proof that each article passed all quality gates. Do not delete or modify reports after article publication.

---

**Master checklist:** `/msp/reports/acceptance_checklist.md` (DO NOT EDIT)
**Per-article reports:** `/msp/reports/{service_slug}_report.md` (CREATE PER ARTICLE)
