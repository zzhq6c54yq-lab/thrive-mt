

# Life Transitions: Worksheets, 12-Hour Time Lock, and Progression Matrix

## Overview

Three enhancements to the Life Transitions feature:
1. **Daily Worksheets** -- each day gets a structured worksheet users must complete before marking the day done
2. **12-Hour Time Lock** -- after completing a day, the next day is locked for 12 hours to encourage reflection
3. **Progression Matrix** -- a structured data model that feeds into the Comprehensive Clinician Report

---

## 1. Database Changes

### New table: `transition_worksheet_responses`

Stores each user's worksheet answers per day, plus completion timestamp (used for the 12-hour lock).

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid | references auth.users |
| `program_id` | uuid | references life_transition_programs |
| `week_number` | integer | 1-6 |
| `day_number` | integer | 1-7 |
| `responses` | jsonb | worksheet answers keyed by question index |
| `completed_at` | timestamptz | when the worksheet was submitted -- used for the 12-hour gate |
| `created_at` | timestamptz | default now() |

RLS: users can only read/write their own rows.

### Modify `user_transition_progress.notes` usage

The existing `notes.completedDays` JSON structure will continue to track day completions. The new `transition_worksheet_responses` table stores the actual worksheet data separately for clean querying in reports.

---

## 2. Daily Worksheets (Content Layer)

### Data model addition in `DayContent` interface

Add a `worksheet` field to the `DayContent` interface:

```text
worksheet: {
  title: string;
  instructions: string;
  questions: {
    id: string;
    prompt: string;
    type: 'text' | 'scale' | 'multiChoice';
    options?: string[];   // for multiChoice
    scaleMin?: number;    // for scale (e.g., 1)
    scaleMax?: number;    // for scale (e.g., 10)
  }[];
}
```

Each program's daily content in `lifeTransitionDailyContent.ts` will be enriched with 3-5 worksheet questions per day, tailored to the transition topic. For example:

- **Grief Day 1** ("What Grief Looks Like"): rate emotional intensity (scale 1-10), describe where you feel grief in your body (text), select grief responses you're experiencing (multi-choice)
- **Divorce Day 3**: list 3 fears about the future (text), rate sense of control today (scale), identify one boundary you set this week (text)
- **Job Loss Day 2**: rate confidence level (scale), describe one transferable skill (text), choose coping strategies used today (multi-choice)

A helper function `generateWorksheet()` will auto-generate contextually appropriate worksheets for each day based on the day title and program slug, ensuring all 42 days per program have worksheets without manually writing 250+ questions.

---

## 3. 12-Hour Time Lock

### Logic

When a user completes a day (submits worksheet + clicks "Complete Day"):
- The `completed_at` timestamp is stored in `transition_worksheet_responses`
- Before unlocking the next day, check: `now() - completed_at >= 12 hours`
- If locked, show a countdown timer with the remaining hours/minutes

### Implementation in `DayContentView.tsx`

- Modify `isDayAccessible()` to accept a `lastCompletionTime` parameter
- Query `transition_worksheet_responses` for the previous day's `completed_at`
- If less than 12 hours have elapsed, show a lock with countdown instead of content
- Day 1 of Week 1 has no lock (immediate access)

### UI

When a day is time-locked, the day card shows:
- A clock icon with "Available in Xh Ym"
- A subtle message: "Take time to reflect on yesterday's work"

---

## 4. Worksheet UI in `DayContentView.tsx`

A new section between "Daily Task" and "Complete Day" button:

- Rendered in a distinct card with a clipboard icon and "Daily Worksheet" header
- Each question renders based on its type:
  - `text`: Textarea input
  - `scale`: Slider (1-10) with labels
  - `multiChoice`: Checkbox group
- The "Complete Day" button is disabled until all worksheet questions are answered
- On submit, responses are saved to `transition_worksheet_responses` and the day is marked complete

---

## 5. Progression Matrix for Clinical Reports

### What gets tracked

A "Transition Progression Matrix" aggregates worksheet data over weeks to show measurable progress:

| Metric | Source | Calculation |
|--------|--------|-------------|
| Completion Rate | days completed / days available | percentage |
| Engagement Consistency | gaps between completions | streak-like metric |
| Self-Reported Wellbeing Trend | scale-type worksheet answers over time | trendline (improving/stable/declining) |
| Reflection Depth | average text response length | word count trend |
| Program Progress | current week/day vs total | percentage |

### Integration into Comprehensive Report

**In `useComprehensiveReportData.ts`:**
- Add a query to `transition_worksheet_responses` for the user
- Aggregate: total worksheets completed, average scale scores per week, completion rate, and engagement gaps
- Compute a wellbeing trend from scale-type responses

**In `ComprehensiveReportData` interface:**
- Add a `lifeTransitionProgress` field:

```text
lifeTransitionProgress?: {
  programName: string;
  enrolledDate: string;
  completionRate: number;        // 0-100
  currentWeek: number;
  totalWeeks: number;
  daysCompleted: number;
  totalDays: number;
  avgWellbeingScore: number;     // from scale questions
  wellbeingTrend: 'improving' | 'stable' | 'declining';
  reflectionWordCount: number;   // average words per text response
  engagementGaps: number;        // days skipped
}[];
```

**In `comprehensiveReportGenerator.ts`:**
- Add a new section "Life Transition Program Progress" after the existing sections
- Renders a table per enrolled program with completion %, wellbeing trend, and engagement consistency
- Flags declining wellbeing trends for clinician attention

---

## Files Modified

| File | Change |
|------|--------|
| `supabase migration` | Create `transition_worksheet_responses` table with RLS |
| `src/data/lifeTransitionDailyContent.ts` | Add `worksheet` to `DayContent` interface; add worksheet generator; enrich all program days |
| `src/components/transitions/DayContentView.tsx` | Add worksheet form UI, 12-hour lock countdown, disable "Complete Day" until worksheet done |
| `src/pages/LifeTransitionProgram.tsx` | Pass completion timestamps to DayContentView; save worksheet responses to new table |
| `src/hooks/useComprehensiveReportData.ts` | Query `transition_worksheet_responses`; compute progression matrix |
| `src/lib/comprehensiveReportGenerator.ts` | Add "Life Transition Progress" section to PDF |
| `src/integrations/supabase/types.ts` | Auto-updated after migration |

