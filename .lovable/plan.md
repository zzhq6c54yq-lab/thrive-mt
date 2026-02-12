
## Fix Comprehensive Report: Column Mismatches and Mobile Download

### Problem Identified

The console logs reveal **5 Supabase queries are failing** because the code references column names that don't exist in the actual database tables. While `allSettled` prevents crashes, significant data is silently lost. Additionally, `doc.save()` from jsPDF doesn't reliably trigger downloads on mobile Safari.

### Root Cause: Wrong Column Names

| Table | Code Uses | Actual Column |
|-------|-----------|---------------|
| `henry_conversations` | `created_at` | `started_at` |
| `toolkit_category_interactions` | `category` | `category_id` |
| `meditation_sessions` | `duration_minutes` | `duration_seconds` |
| `event_registrations` | `status` | *(column doesn't exist -- remove from select)* |
| `sleep_tracker_entries` | `sleep_quality, hours_slept, bedtime` | `quality, duration, bed_time` |

### Plan

**File: `src/hooks/useComprehensiveReportData.ts`**

1. Fix query #9 (henry_conversations): change `created_at` to `started_at` in both `.select()` and `.gte()`
2. Fix query #14 (toolkit_category_interactions): change `category` to `category_id` in `.select()`
3. Fix query #15 (meditation_sessions): change `duration_minutes` to `duration_seconds` in `.select()`
4. Fix query #17 (event_registrations): remove `status` from `.select()`
5. Fix query #19 (sleep_tracker_entries): change `sleep_quality` to `quality`, `hours_slept` to `duration`, `bedtime` to `bed_time`
6. Update all downstream processing that references these old column names (e.g., `m.duration_minutes` becomes `m.duration_seconds`, `s.sleep_quality` becomes `s.quality`, etc.)
7. Fix meditation total minutes calculation: convert `duration_seconds / 60` instead of summing `duration_minutes`

**File: `src/lib/comprehensiveReportGenerator.ts`**

8. Replace `doc.save(filename)` in download mode with a blob-based approach (same pattern as view mode but auto-triggering download via a programmatic `<a>` click). This fixes mobile Safari silently ignoring `doc.save()`.

**File: `src/pages/ProgressAnalytics.tsx`**

9. Update download handler to use the blob-based return from the generator (both modes now return `{ blobUrl, filename }`). For download mode, programmatically click a link and revoke the URL after.

### Technical Details

The generator function signature stays the same but both modes return `{ blobUrl, filename }`. The page component handles the difference:
- **Download**: creates a hidden `<a>` tag, clicks it, revokes the blob URL
- **View**: sets state to show the modal popup (existing behavior)

This is a targeted fix -- no new dependencies, no schema changes, no new features. Just correcting the column names to match the actual database and ensuring downloads work on mobile.
