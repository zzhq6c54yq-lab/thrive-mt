
## Four Issues — Root Causes and Fixes

### Issue 1: Engagement Doesn't Save (Streak Not Persisting)

**Root Cause Found:** The `QuickCheckIn.tsx` streak logic has a subtle but critical bug. When a user checks in on `today`, the code checks `if (existingStreak.last_activity_date === yesterday)`. This only increments the streak. If the user checks in on a day where `last_activity_date === today` already (e.g., they check in twice same day or the record was already created), the `else` branch resets the streak to `1`. This silently destroys the streak on same-day interactions.

Additionally, the `useTodayDashboard` hook reads the streak from the `user_streaks` table but never triggers a re-fetch after a check-in completes. So the dashboard shows a stale `0` streak until the user hard-refreshes.

**Fixes:**
1. **`src/components/dashboard/today/QuickCheckIn.tsx`**: Add a third condition — if `last_activity_date === today`, skip the streak update entirely (don't reset it to 1). Only update when it's a new day.
2. **`src/components/dashboard/today/QuickCheckIn.tsx`**: After a successful check-in, the `onCheckInComplete` callback is called, but the parent doesn't always re-fetch streak data. Ensure `refetch` from `useTodayDashboard` is passed and called.
3. **`src/components/dashboard/epic/widgets/EngagementMetricsWidget.tsx`**: This widget computes its own streak independently from `daily_check_ins` (bypassing the `user_streaks` table entirely). This means it can show a different number than the dashboard. Fix it to read from `user_streaks` table directly for consistency.

---

### Issue 2: Life Transitions Cover Photos / Carousel

**Root Cause Found:** The database shows only 6 programs in `life_transition_programs`, with real `cover_image_url` values. However, the slug names in the database (`divorce-recovery`, `job-loss`, `grief-healing`, `new-parent`, `retirement`, `chronic-illness`) **do not match** the hardcoded slugs in `LifeTransitions.tsx` and `TransitionProgramCard.tsx` (`navigating-divorce`, `job-loss-recovery`, `new-parent-journey`, etc.). This means the `iconMap` never finds a match and the fallback icon `Book` is always used.

Additionally, the `TransitionProgramCard` already has a cover image with proper styling, but the `LifeTransitions.tsx` page layout uses a plain `grid` — no hero/carousel treatment for the programs.

**Fixes:**
1. **`src/pages/LifeTransitions.tsx`**: Update `iconMap` keys to match the actual database slugs (`divorce-recovery`, `job-loss`, `grief-healing`, `new-parent`, `retirement`, `chronic-illness`).
2. **`src/pages/LifeTransitions.tsx`**: Add a visually rich hero carousel at the top using Embla carousel (already installed) that showcases all programs with their cover images before the grid, giving each program a cinematic "featured" look with a full-bleed background image, overlay text, and an "Explore" CTA.
3. **`src/components/transitions/TransitionProgramCard.tsx`**: Fix fallback `defaultCovers` keys to match actual slugs so Unsplash fallback images correctly display for programs without a DB cover.

---

### Issue 3: Streaks Need to Show Actual Data

**Root Cause Found:** Multiple places show streaks from different, inconsistent sources:
- `useTodayDashboard` correctly reads from `user_streaks` table → `checkInStreak`
- `EngagementMetricsWidget` re-calculates streak independently from `daily_check_ins` (can diverge)
- `YourDaySection` displays `dashboardData.checkInStreak` which is correct but depends on the stale load
- The streak widget in the dashboard sometimes shows `0` because `user_streaks` table is empty (confirmed by query returning 0 rows) — meaning no user has ever triggered the insert path, likely because the QuickCheckIn bug prevents the insert from running, or users haven't done a check-in in the new flow

**Fixes:**
1. Fix the QuickCheckIn bug (above) so the `user_streaks` row gets created on first check-in.
2. **`src/components/dashboard/epic/widgets/EngagementMetricsWidget.tsx`**: Replace the self-calculated streak with a direct read from `user_streaks` table for the logged-in user, so all streak displays use one source of truth.
3. **`src/components/dashboard/epic/widgets/SmartWidgets.tsx`** (`StreakProtectorWidget`): Currently receives `dashboardData.checkInStreak` as a prop — this will be correct once the source-of-truth fix is applied.

---

### Issue 4: Progress Analytics Trends Must Use Real Data

**Root Cause Found:** `useAnalyticsData.ts` has a hard-coded fallback behavior that's too aggressive. It shows `SAMPLE_MOOD_DATA`, `SAMPLE_ACTIVITY_DATA`, and `SAMPLE_WELLNESS_DATA` whenever the user's actual data is empty. This means a user who hasn't done many check-ins sees fake upward-trending data, which is misleading.

Additionally, the `Trends` tab in `ProgressAnalytics.tsx` has completely hardcoded static numbers:
- "28 Days Active", "12 Tools Explored", "350 Minutes Invested" — all hardcoded
- Comparison percentages (+18%, +45 min/week) — hardcoded
- Pattern analysis (Tuesdays are best days, etc.) — hardcoded generics
- The time-period buttons (Last 30 Days, 3 Months, etc.) are not wired up at all

The `HenryInsightCard` at the top always says "+125% mood improvement" regardless of actual data.

**Fixes:**
1. **`src/hooks/useAnalyticsData.ts`**: Remove sample data fallback for authenticated users. When a user is logged in but has no data, show empty state with `{ name, mood: 0 }` or an empty array and let the UI show a "No data yet — start a check-in!" empty state instead of fake data.
2. **`src/pages/ProgressAnalytics.tsx`**: 
   - Wire up the Trends tab to fetch real stats: days active count from `daily_check_ins`, total wellness minutes from `user_activities`, tools explored from distinct `activity_type` values.
   - Replace the hardcoded insight card text with values derived from `moodData` (real average and trend calculation).
   - Add a new `useRealTrendsData` hook (or extend `useAnalyticsData`) that computes: days active this month vs last month, actual mood % change, and actual activity minutes change.
3. **`src/pages/ProgressAnalytics.tsx`**: Add empty state UI for charts when no data exists, so users see "Complete your first check-in to start tracking" rather than sample data.

---

### Technical Summary of All Files to Change

| File | What Changes |
|---|---|
| `src/components/dashboard/today/QuickCheckIn.tsx` | Fix streak update logic — skip update if already checked in today; don't reset to 1 |
| `src/components/dashboard/epic/widgets/EngagementMetricsWidget.tsx` | Read streak from `user_streaks` table, not re-computed from check-in dates |
| `src/hooks/useAnalyticsData.ts` | Remove fake sample data fallback for logged-in users; add proper empty state |
| `src/pages/ProgressAnalytics.tsx` | Wire Trends tab to real DB data; replace hardcoded stats; fix Henry insight card text |
| `src/pages/LifeTransitions.tsx` | Fix `iconMap` slug keys; add hero image carousel at top |
| `src/components/transitions/TransitionProgramCard.tsx` | Fix `defaultCovers` keys to match actual DB slugs |

No database schema changes are required. All fixes are frontend/query logic only.
