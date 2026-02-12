

# Make Progress Reports Fully Functional with Complete User Data

## What This Changes

Right now, the comprehensive/clinical report pulls from 13 tables but has significant gaps. This plan adds all missing data sources so every user interaction is captured, summarized, and shown in the reports.

## Current Gaps Identified

1. **Henry conversations** -- only counts conversations, doesn't include actual conversation summaries or key topics discussed
2. **Mini Sessions** (Between-Session Companion) -- not tracked in the report at all
3. **Toolkit interactions** -- the `toolkit_category_interactions` table exists but isn't queried
4. **Meditation sessions** -- not included in report
5. **Music therapy recordings** -- not included
6. **Workshop/event registrations** -- `event_registrations` table exists but isn't queried
7. **Gratitude entries** -- table exists, not in report
8. **Sleep tracker** -- `sleep_tracker_entries` exists, not in report
9. **Henry AI session summaries** -- the `ai_session_summaries` table stores AI-generated conversation summaries with key topics and risk flags, but the report never reads from it

## Implementation Plan

### Step 1: Expand Data Fetching (useComprehensiveReportData.ts)

Add queries for these additional tables alongside the existing 13:

- `ai_session_summaries` -- fetch conversation summaries with key_topics, risk_flags, mood_trend, and content
- `mini_sessions` -- fetch mood, energy, anxiety, focus, summary, coaching data
- `toolkit_category_interactions` -- fetch category and tool usage
- `meditation_sessions` -- fetch session count and duration
- `music_therapy_recordings` -- fetch session count, mood changes
- `event_registrations` -- fetch workshop/event titles and types
- `gratitude_entries` -- fetch count
- `sleep_tracker_entries` -- fetch sleep data

### Step 2: Expand Report Data Interface (comprehensiveReportGenerator.ts)

Add new fields to `ComprehensiveReportData`:

- `henryConversationSummaries` -- array of AI-generated summaries with topics and risk flags
- `miniSessionCount`, `miniSessionSummary` -- Between-Session Companion usage
- `toolkitInteractions` -- toolkit tools used with counts
- `meditationSessions`, `meditationTotalMinutes`
- `musicTherapySessions`
- `workshopRegistrations` -- events/workshops attended
- `gratitudeEntryCount`
- `sleepEntries` with averages

### Step 3: Add New Sections to PDF Report

Update the PDF generator to include new sections:

- **Section: Henry AI Companion (Enhanced)** -- Replace simple count with actual conversation summaries, key topics discussed across all sessions, any risk flags detected by AI, and mood trends from conversations
- **Section: Between-Session Companion** -- Mini session count, average mood/anxiety/energy scores, focus areas
- **Section: Toolkit & Workshop Engagement** -- Which toolkit categories were used, workshop registrations
- **Section: Meditation & Music Therapy** -- Session counts and duration
- **Section: Holistic Wellness** -- Gratitude entries, sleep tracking data

### Step 4: Enrich Clinician Quick Summary (Page 1)

Update the first page to include:

- Henry conversation key themes (from ai_session_summaries)
- AI-detected risk flags from conversations
- Mini session engagement level
- Workshop participation count
- Enhanced EHR note that mentions conversation themes and toolkit usage

### Step 5: Enhance Risk Flags and Recommendations

Add new risk detection from:

- AI session summaries risk_flags (crisis, self-harm flags from Henry conversations)
- Mini session data (low mood + high anxiety patterns)
- Sleep quality trends (if consistently poor)

Add new recommendations based on:

- Low toolkit engagement
- No workshop attendance
- Missing meditation practice
- Sleep issues detected

## Technical Details

- All new queries will be added to the existing `Promise.all` block in `useComprehensiveReportData.ts` for parallel fetching
- The `ComprehensiveReportData` interface will be extended with new optional fields to maintain backward compatibility
- PDF sections will use the existing helper functions (sectionTitle, statBox, bullet, bodyText)
- The `checkPage` helper ensures new sections properly paginate
- All data is filtered to the 30-day reporting window (matching existing behavior)
- User-specific filtering via `user_id` ensures reports are personalized

## Files to Modify

1. `src/hooks/useComprehensiveReportData.ts` -- Add 8 new data source queries and processing
2. `src/lib/comprehensiveReportGenerator.ts` -- Extend interface and add new PDF sections
3. No new tables needed -- all data sources already exist in the database

