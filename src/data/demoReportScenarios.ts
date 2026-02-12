import { ComprehensiveReportData } from '@/lib/comprehensiveReportGenerator';

/**
 * Three demo clinical report scenarios for printing/presentation.
 * Scenario 1: Good — thriving patient
 * Scenario 2: Moderate — progressing with areas of concern
 * Scenario 3: Bad — high-risk, declining engagement
 */

const now = new Date();
const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

function daysAgo(n: number) {
  return new Date(now.getTime() - n * 24 * 60 * 60 * 1000);
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function fmtDateYr(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
}

// ════════════════════════════════════════════════
// SCENARIO 1 — GOOD (Thriving)
// ════════════════════════════════════════════════
export function buildScenario1(userName: string): ComprehensiveReportData {
  const moodScores = Array.from({ length: 28 }, (_, i) => ({
    date: fmtDate(daysAgo(28 - i)),
    score: Math.min(10, 6 + Math.round(i / 7) + (i % 3 === 0 ? 1 : 0)),
  }));

  return {
    userName,
    reportDate: now,
    dateRange: { start: thirtyDaysAgo, end: now },

    // Mood — strong upward trend
    moodScores,
    avgMood: 8.2,
    moodTrend: 'improving',
    moodHighDay: fmtDate(daysAgo(1)),
    moodLowDay: fmtDate(daysAgo(27)),

    // Activities — very active
    totalActivities: 47,
    totalWellnessMinutes: 1420,
    activitiesByType: [
      { name: 'Meditation', count: 18, minutes: 540 },
      { name: 'Journaling', count: 12, minutes: 360 },
      { name: 'Breathing', count: 10, minutes: 200 },
      { name: 'Exercise', count: 7, minutes: 320 },
    ],
    mostUsedTool: 'Meditation',

    // Journal — excellent engagement
    journalEntryCount: 24,
    journalStreak: 14,
    topJournalThemes: ['Grateful', 'Hopeful', 'Calm', 'Motivated', 'Reflective'],

    // Assessments — all healthy ranges
    assessmentsCompleted: [
      { type: 'PHQ-9', score: 3, severity: 'Minimal', date: fmtDate(daysAgo(5)) },
      { type: 'GAD-7', score: 4, severity: 'Minimal', date: fmtDate(daysAgo(5)) },
      { type: 'PCL-5', score: 12, severity: 'Below Threshold', date: fmtDate(daysAgo(10)) },
      { type: 'AUDIT-C', score: 1, severity: 'Low Risk', date: fmtDate(daysAgo(10)) },
    ],

    // Breathing & Binaural — consistent
    breathingSessions: 22,
    breathingTotalMinutes: 110,
    binauralSessions: 15,
    binauralTotalMinutes: 225,

    // Goals — high completion
    goalsSet: 8,
    goalsCompleted: 7,
    goalCompletionRate: 88,

    // Badges
    badgesEarned: [
      { title: 'Mindfulness Master', date: fmtDate(daysAgo(3)) },
      { title: '30-Day Streak', date: fmtDate(daysAgo(1)) },
      { title: 'Resilience Builder', date: fmtDate(daysAgo(7)) },
      { title: 'Journal Warrior', date: fmtDate(daysAgo(10)) },
    ],

    // AI Companion — active use
    henryConversations: 18,
    henryMessages: 108,

    // Coaching / Therapy
    coachingSessions: 4,
    therapyRequests: 1,

    // Streaks & Points
    currentStreak: 28,
    longestStreak: 28,
    totalPoints: 2650,

    // Risk flags — none
    riskFlags: [],
    recommendations: [
      'Continue current wellness routine — positive momentum is building',
      'Great tool variety — maintain diverse wellness practices for resilience',
      'Consider setting stretch goals to maintain growth trajectory',
      'Share progress with care team to reinforce treatment plan alignment',
    ],

    // SDOH — none
    sdohFlags: [],

    // EHR Note
    suggestedEHRNote: `Patient-Generated Health Data (PGHD) reviewed. Patient engaged with ThriveMT for 28/30 days (47 interactions). MBC Measures (PHQ-9: 3, GAD-7: 4, PCL-5: 12, AUDIT-C: 1) stable. ACORN Social Triage: No acute housing or food risks. No HRS warning signs detected. Shared clinical decision-making informed by PGHD. Clinician review complete.`,

    // Henry AI Summaries
    henryConversationSummaries: [
      { content: 'Patient discussed gratitude practices and positive family interactions.', keyTopics: ['Gratitude', 'Family', 'Coping'], riskFlags: [], moodTrend: 'improving', date: fmtDate(daysAgo(2)) },
      { content: 'Explored mindfulness techniques and reported improved sleep.', keyTopics: ['Mindfulness', 'Sleep', 'Self-care'], riskFlags: [], moodTrend: 'improving', date: fmtDate(daysAgo(8)) },
      { content: 'Discussed career goals and motivation. Mood elevated throughout.', keyTopics: ['Career', 'Motivation', 'Goals'], riskFlags: [], moodTrend: 'stable', date: fmtDate(daysAgo(14)) },
    ],
    henryTopThemes: ['Gratitude', 'Mindfulness', 'Family', 'Career', 'Self-care'],
    aiRiskFlags: [],

    // Mini Sessions
    miniSessionCount: 12,
    avgMiniMood: 7.8,
    avgMiniAnxiety: 2.1,
    avgMiniEnergy: 7.5,
    miniFocusAreas: [
      { area: 'Relaxation', count: 5 },
      { area: 'Focus', count: 4 },
      { area: 'Sleep prep', count: 3 },
    ],

    // Toolkit
    toolkitInteractions: [
      { name: 'Breathing Exercises', count: 22 },
      { name: 'Guided Meditation', count: 18 },
      { name: 'Binaural Beats', count: 15 },
      { name: 'Art Therapy', count: 8 },
      { name: 'Music Therapy', count: 6 },
    ],

    // Meditation
    meditationSessions: 18,
    meditationTotalMinutes: 270,

    // Music Therapy
    musicTherapySessions: 6,
    musicTotalMinutes: 90,
    musicMoodChanges: [
      { before: 'Anxious', after: 'Calm' },
      { before: 'Stressed', after: 'Relaxed' },
      { before: 'Neutral', after: 'Happy' },
    ],

    // Workshop registrations
    workshopRegistrations: [
      { title: 'Mindfulness for Veterans', type: 'workshop', status: 'completed' },
      { title: 'Resilience Building Seminar', type: 'seminar', status: 'completed' },
    ],

    // Gratitude
    gratitudeEntryCount: 20,

    // Sleep — excellent
    sleepEntries: Array.from({ length: 14 }, (_, i) => ({
      quality: 7 + (i % 3 === 0 ? 1 : 0),
      hours: 7.5 + (i % 2 === 0 ? 0.5 : 0),
      date: fmtDate(daysAgo(14 - i)),
    })),
    avgSleepQuality: 7.6,
    avgSleepHours: 7.8,

    // MBC Scores — all healthy
    mbcScores: {
      phq9: [
        { score: 8, severity: 'Mild', date: fmtDateYr(daysAgo(90)) },
        { score: 6, severity: 'Mild', date: fmtDateYr(daysAgo(60)) },
        { score: 4, severity: 'Minimal', date: fmtDateYr(daysAgo(30)) },
        { score: 3, severity: 'Minimal', date: fmtDateYr(daysAgo(5)) },
      ],
      gad7: [
        { score: 10, severity: 'Moderate', date: fmtDateYr(daysAgo(90)) },
        { score: 7, severity: 'Mild', date: fmtDateYr(daysAgo(60)) },
        { score: 5, severity: 'Mild', date: fmtDateYr(daysAgo(30)) },
        { score: 4, severity: 'Minimal', date: fmtDateYr(daysAgo(5)) },
      ],
      pcl5: [
        { score: 28, severity: 'Below Threshold', date: fmtDateYr(daysAgo(90)) },
        { score: 20, severity: 'Below Threshold', date: fmtDateYr(daysAgo(60)) },
        { score: 15, severity: 'Below Threshold', date: fmtDateYr(daysAgo(30)) },
        { score: 12, severity: 'Below Threshold', date: fmtDateYr(daysAgo(10)) },
      ],
      auditC: [
        { score: 2, severity: 'Low Risk', date: fmtDateYr(daysAgo(60)) },
        { score: 1, severity: 'Low Risk', date: fmtDateYr(daysAgo(10)) },
      ],
    },
    latestMBC: {
      phq9: { score: 3, severity: 'Minimal', date: fmtDateYr(daysAgo(5)) },
      gad7: { score: 4, severity: 'Minimal', date: fmtDateYr(daysAgo(5)) },
      pcl5: { score: 12, severity: 'Below Threshold', date: fmtDateYr(daysAgo(10)) },
      auditC: { score: 1, severity: 'Low Risk', date: fmtDateYr(daysAgo(10)) },
    },

    longitudinalAssessments: [
      { type: 'PHQ-9', score: 8, date: fmtDateYr(daysAgo(90)) },
      { type: 'PHQ-9', score: 6, date: fmtDateYr(daysAgo(60)) },
      { type: 'PHQ-9', score: 3, date: fmtDateYr(daysAgo(5)) },
      { type: 'GAD-7', score: 10, date: fmtDateYr(daysAgo(90)) },
      { type: 'GAD-7', score: 4, date: fmtDateYr(daysAgo(5)) },
      { type: 'PCL-5', score: 28, date: fmtDateYr(daysAgo(90)) },
      { type: 'PCL-5', score: 12, date: fmtDateYr(daysAgo(10)) },
    ],

    resilienceIndex: 87,
    resilienceFactors: [
      { factor: 'Engagement Consistency', score: 23, max: 25 },
      { factor: 'Tool Diversity', score: 20, max: 20 },
      { factor: 'Mood Stability', score: 18, max: 20 },
      { factor: 'Goal Achievement', score: 13, max: 15 },
      { factor: 'Sleep Quality', score: 13, max: 20 },
    ],

    sleepActivityCorrelation: 'Positive correlation: Good sleep quality aligns with consistent activity engagement.',
    performanceTriad: {
      sleepScore: 95,
      activityScore: 88,
      engagementScore: 93,
      overallReadiness: 92,
    },

    hrsFlags: {
      directWarnings: [],
      indirectWarnings: [],
      riskLevel: 'none',
    },
  };
}

// ════════════════════════════════════════════════
// SCENARIO 2 — MODERATE (Progressing with concerns)
// ════════════════════════════════════════════════
export function buildScenario2(userName: string): ComprehensiveReportData {
  const moodScores = Array.from({ length: 20 }, (_, i) => ({
    date: fmtDate(daysAgo(28 - i)),
    score: 4 + Math.round(Math.sin(i / 3) * 2),
  }));

  return {
    userName,
    reportDate: now,
    dateRange: { start: thirtyDaysAgo, end: now },

    moodScores,
    avgMood: 5.4,
    moodTrend: 'stable',
    moodHighDay: fmtDate(daysAgo(9)),
    moodLowDay: fmtDate(daysAgo(18)),

    totalActivities: 19,
    totalWellnessMinutes: 480,
    activitiesByType: [
      { name: 'Breathing', count: 8, minutes: 160 },
      { name: 'Journaling', count: 6, minutes: 180 },
      { name: 'Walking', count: 5, minutes: 140 },
    ],
    mostUsedTool: 'Breathing',

    journalEntryCount: 11,
    journalStreak: 3,
    topJournalThemes: ['Stressed', 'Hopeful', 'Tired', 'Anxious', 'Reflective'],

    assessmentsCompleted: [
      { type: 'PHQ-9', score: 12, severity: 'Moderate', date: fmtDate(daysAgo(7)) },
      { type: 'GAD-7', score: 10, severity: 'Moderate', date: fmtDate(daysAgo(7)) },
      { type: 'PCL-5', score: 35, severity: 'Probable PTSD', date: fmtDate(daysAgo(14)) },
      { type: 'AUDIT-C', score: 3, severity: 'Moderate Risk', date: fmtDate(daysAgo(14)) },
    ],

    breathingSessions: 10,
    breathingTotalMinutes: 50,
    binauralSessions: 5,
    binauralTotalMinutes: 75,

    goalsSet: 5,
    goalsCompleted: 2,
    goalCompletionRate: 40,

    badgesEarned: [
      { title: 'First Check-In', date: fmtDate(daysAgo(25)) },
      { title: 'Journal Starter', date: fmtDate(daysAgo(18)) },
    ],

    henryConversations: 8,
    henryMessages: 48,

    coachingSessions: 1,
    therapyRequests: 2,

    currentStreak: 3,
    longestStreak: 7,
    totalPoints: 890,

    riskFlags: [
      'PHQ-9 score 12 (Moderate) — depression screening elevated',
      'GAD-7 score 10 (Moderate) — anxiety screening elevated',
      'PCL-5 score 35 (Probable PTSD) — PTSD threshold met',
      'HRS MONITOR: Indirect warning signs detected (Sleep Disruption, Hopelessness)',
    ],
    recommendations: [
      'Schedule a check-in session to discuss mood trends',
      'Introduce structured breathing exercises (4-7-8 or box breathing)',
      'Review and adjust goal difficulty — smaller goals may improve completion rate',
      'Focus on sleep hygiene — poor sleep directly impacts mood and anxiety',
      'Consider joining a workshop or group event for community support',
      'Try guided meditation — even 5 minutes daily can improve emotional regulation',
    ],

    sdohFlags: [
      { keyword: 'Financial Strain: "bills"', context: '...struggling to keep up with bills this month...', priority: 'moderate' },
      { keyword: 'Employment: "laid off"', context: '...got laid off last week, feeling stressed...', priority: 'high' },
    ],

    suggestedEHRNote: `Patient-Generated Health Data (PGHD) reviewed. Patient engaged with ThriveMT for 18/30 days (19 interactions). MBC Measures (PHQ-9: 12, GAD-7: 10, PCL-5: 35, AUDIT-C: 3) trending unfavorably. ACORN Social Triage: Flags present (Financial Strain, Employment). Indirect HRS indicators noted (Sleep Disruption, Hopelessness). Monitor closely. Shared clinical decision-making informed by PGHD. Recommend clinical follow-up.`,

    henryConversationSummaries: [
      { content: 'Patient expressed concern about job loss and financial pressures. Mood fluctuating.', keyTopics: ['Employment', 'Finances', 'Anxiety'], riskFlags: [], moodTrend: 'stable', date: fmtDate(daysAgo(3)) },
      { content: 'Discussed trouble sleeping and feeling restless. Practiced breathing together.', keyTopics: ['Insomnia', 'Breathing', 'Stress'], riskFlags: [], moodTrend: 'declining', date: fmtDate(daysAgo(10)) },
    ],
    henryTopThemes: ['Employment', 'Anxiety', 'Insomnia', 'Finances', 'Stress'],
    aiRiskFlags: [],

    miniSessionCount: 5,
    avgMiniMood: 4.8,
    avgMiniAnxiety: 6.2,
    avgMiniEnergy: 4.5,
    miniFocusAreas: [
      { area: 'Anxiety relief', count: 3 },
      { area: 'Sleep prep', count: 2 },
    ],

    toolkitInteractions: [
      { name: 'Breathing Exercises', count: 10 },
      { name: 'Guided Meditation', count: 5 },
      { name: 'Binaural Beats', count: 5 },
    ],

    meditationSessions: 5,
    meditationTotalMinutes: 50,

    musicTherapySessions: 2,
    musicTotalMinutes: 30,
    musicMoodChanges: [
      { before: 'Anxious', after: 'Calm' },
    ],

    workshopRegistrations: [
      { title: 'Stress Management 101', type: 'workshop', status: 'registered' },
    ],

    gratitudeEntryCount: 6,

    sleepEntries: Array.from({ length: 10 }, (_, i) => ({
      quality: 3 + (i % 4 === 0 ? 2 : 0),
      hours: 5.5 + (i % 3 === 0 ? 1 : 0),
      date: fmtDate(daysAgo(14 - i)),
    })),
    avgSleepQuality: 4.2,
    avgSleepHours: 5.8,

    mbcScores: {
      phq9: [
        { score: 14, severity: 'Moderate', date: fmtDateYr(daysAgo(90)) },
        { score: 13, severity: 'Moderate', date: fmtDateYr(daysAgo(60)) },
        { score: 12, severity: 'Moderate', date: fmtDateYr(daysAgo(7)) },
      ],
      gad7: [
        { score: 12, severity: 'Moderate', date: fmtDateYr(daysAgo(90)) },
        { score: 11, severity: 'Moderate', date: fmtDateYr(daysAgo(60)) },
        { score: 10, severity: 'Moderate', date: fmtDateYr(daysAgo(7)) },
      ],
      pcl5: [
        { score: 40, severity: 'Probable PTSD', date: fmtDateYr(daysAgo(90)) },
        { score: 38, severity: 'Probable PTSD', date: fmtDateYr(daysAgo(60)) },
        { score: 35, severity: 'Probable PTSD', date: fmtDateYr(daysAgo(14)) },
      ],
      auditC: [
        { score: 4, severity: 'Moderate Risk', date: fmtDateYr(daysAgo(60)) },
        { score: 3, severity: 'Moderate Risk', date: fmtDateYr(daysAgo(14)) },
      ],
    },
    latestMBC: {
      phq9: { score: 12, severity: 'Moderate', date: fmtDateYr(daysAgo(7)) },
      gad7: { score: 10, severity: 'Moderate', date: fmtDateYr(daysAgo(7)) },
      pcl5: { score: 35, severity: 'Probable PTSD', date: fmtDateYr(daysAgo(14)) },
      auditC: { score: 3, severity: 'Moderate Risk', date: fmtDateYr(daysAgo(14)) },
    },

    longitudinalAssessments: [
      { type: 'PHQ-9', score: 14, date: fmtDateYr(daysAgo(90)) },
      { type: 'PHQ-9', score: 12, date: fmtDateYr(daysAgo(7)) },
      { type: 'GAD-7', score: 12, date: fmtDateYr(daysAgo(90)) },
      { type: 'GAD-7', score: 10, date: fmtDateYr(daysAgo(7)) },
      { type: 'PCL-5', score: 40, date: fmtDateYr(daysAgo(90)) },
      { type: 'PCL-5', score: 35, date: fmtDateYr(daysAgo(14)) },
    ],

    resilienceIndex: 52,
    resilienceFactors: [
      { factor: 'Engagement Consistency', score: 15, max: 25 },
      { factor: 'Tool Diversity', score: 10, max: 20 },
      { factor: 'Mood Stability', score: 10, max: 20 },
      { factor: 'Goal Achievement', score: 6, max: 15 },
      { factor: 'Sleep Quality', score: 11, max: 20 },
    ],

    sleepActivityCorrelation: 'Concerning pattern: Both sleep quality and activity levels are below optimal.',
    performanceTriad: {
      sleepScore: 52,
      activityScore: 45,
      engagementScore: 60,
      overallReadiness: 52,
    },

    hrsFlags: {
      directWarnings: [],
      indirectWarnings: [
        { category: 'Sleep Disruption', term: 'insomnia', context: '...can\'t shake this insomnia lately...' },
        { category: 'Hopelessness', term: 'hopeless', context: '...sometimes feels hopeless with everything...' },
      ],
      riskLevel: 'indirect-only',
    },
  };
}

// ════════════════════════════════════════════════
// SCENARIO 3 — BAD (High-risk, declining)
// ════════════════════════════════════════════════
export function buildScenario3(userName: string): ComprehensiveReportData {
  const moodScores = Array.from({ length: 12 }, (_, i) => ({
    date: fmtDate(daysAgo(28 - i * 2)),
    score: Math.max(1, 5 - Math.floor(i / 2)),
  }));

  return {
    userName,
    reportDate: now,
    dateRange: { start: thirtyDaysAgo, end: now },

    moodScores,
    avgMood: 2.8,
    moodTrend: 'declining',
    moodHighDay: fmtDate(daysAgo(28)),
    moodLowDay: fmtDate(daysAgo(2)),

    totalActivities: 5,
    totalWellnessMinutes: 85,
    activitiesByType: [
      { name: 'Breathing', count: 3, minutes: 45 },
      { name: 'Journaling', count: 2, minutes: 40 },
    ],
    mostUsedTool: 'Breathing',

    journalEntryCount: 4,
    journalStreak: 0,
    topJournalThemes: ['Hopeless', 'Isolated', 'Ashamed', 'Can\'t sleep', 'Burden'],

    assessmentsCompleted: [
      { type: 'PHQ-9', score: 22, severity: 'Severe', date: fmtDate(daysAgo(3)) },
      { type: 'GAD-7', score: 18, severity: 'Severe', date: fmtDate(daysAgo(3)) },
      { type: 'PCL-5', score: 58, severity: 'Severe', date: fmtDate(daysAgo(5)) },
      { type: 'AUDIT-C', score: 8, severity: 'High Risk', date: fmtDate(daysAgo(5)) },
    ],

    breathingSessions: 3,
    breathingTotalMinutes: 15,
    binauralSessions: 1,
    binauralTotalMinutes: 15,

    goalsSet: 3,
    goalsCompleted: 0,
    goalCompletionRate: 0,

    badgesEarned: [],

    henryConversations: 3,
    henryMessages: 18,

    coachingSessions: 0,
    therapyRequests: 0,

    currentStreak: 0,
    longestStreak: 2,
    totalPoints: 145,

    riskFlags: [
      'Low average mood score (2.8/10) — consider clinical follow-up',
      'Declining mood trend detected over the reporting period',
      'One or more mood entries at critically low levels (≤2/10)',
      'Broken daily check-in streak — re-engagement support recommended',
      'PHQ-9 score 22 (Severe) — depression screening elevated',
      'GAD-7 score 18 (Severe) — anxiety screening elevated',
      'PCL-5 score 58 (Severe) — PTSD threshold met',
      'AUDIT-C score 8 (High Risk) — alcohol screening elevated',
      'Consistently poor sleep quality (avg 2.6/10) — may require intervention',
      'Very low average sleep duration (4.2 hrs/night)',
      '⚠ HRS ELEVATED: Direct suicide warning signs detected — immediate safety assessment recommended',
    ],
    recommendations: [
      'URGENT: Schedule immediate safety assessment with care team',
      'Schedule a check-in session to discuss mood trends',
      'Encourage daily journaling to build emotional awareness',
      'Introduce structured breathing exercises (4-7-8 or box breathing)',
      'Set 2-3 achievable weekly wellness goals to build momentum',
      'Consider scheduling a coaching session for personalized guidance',
      'Focus on sleep hygiene — poor sleep directly impacts mood and anxiety',
      'Start a gratitude practice — 3 items daily can shift perspective over time',
      'Explore the Wellness Toolkit — diverse coping tools can strengthen resilience',
    ],

    sdohFlags: [
      { keyword: 'Housing Stability: "notice to quit"', context: '...received a notice to quit from my landlord...', priority: 'high' },
      { keyword: 'Housing Stability: "sleeping in car"', context: '...been sleeping in car for the past week...', priority: 'high' },
      { keyword: 'Food Insecurity: "hungry"', context: '...going hungry most days, can\'t afford groceries...', priority: 'high' },
      { keyword: 'Financial Strain: "utility shutoff"', context: '...got a utility shutoff notice for electricity...', priority: 'high' },
      { keyword: 'Employment: "fired"', context: '...got fired last month and can\'t find work...', priority: 'high' },
    ],

    suggestedEHRNote: `Patient-Generated Health Data (PGHD) reviewed. Patient engaged with ThriveMT for 8/30 days (5 interactions). MBC Measures (PHQ-9: 22, GAD-7: 18, PCL-5: 58, AUDIT-C: 8) trending unfavorably. ACORN Social Triage: Flags present (Housing Stability, Food Insecurity, Financial Strain, Employment). HRS WARNING SIGNS DETECTED — immediate safety assessment recommended. Shared clinical decision-making informed by PGHD. Recommend clinical follow-up.`,

    henryConversationSummaries: [
      { content: 'Patient expressed feelings of hopelessness and being a burden to family. Mentioned difficulty sleeping for days.', keyTopics: ['Hopelessness', 'Burden', 'Insomnia'], riskFlags: ['suicidal ideation concern'], moodTrend: 'declining', date: fmtDate(daysAgo(2)) },
      { content: 'Patient talked about losing housing and struggling to find food. Very distressed.', keyTopics: ['Housing', 'Food insecurity', 'Crisis'], riskFlags: ['housing crisis'], moodTrend: 'declining', date: fmtDate(daysAgo(8)) },
      { content: 'Patient mentioned drinking more to cope. Feeling isolated and ashamed.', keyTopics: ['Alcohol', 'Isolation', 'Shame'], riskFlags: ['substance use escalation'], moodTrend: 'declining', date: fmtDate(daysAgo(15)) },
    ],
    henryTopThemes: ['Hopelessness', 'Housing', 'Alcohol', 'Isolation', 'Crisis'],
    aiRiskFlags: ['suicidal ideation concern', 'housing crisis', 'substance use escalation'],

    miniSessionCount: 2,
    avgMiniMood: 2.0,
    avgMiniAnxiety: 9.0,
    avgMiniEnergy: 1.5,
    miniFocusAreas: [
      { area: 'Crisis support', count: 2 },
    ],

    toolkitInteractions: [
      { name: 'Breathing Exercises', count: 3 },
    ],

    meditationSessions: 0,
    meditationTotalMinutes: 0,

    musicTherapySessions: 0,
    musicTotalMinutes: 0,
    musicMoodChanges: [],

    workshopRegistrations: [],

    gratitudeEntryCount: 0,

    sleepEntries: Array.from({ length: 6 }, (_, i) => ({
      quality: Math.max(1, 3 - Math.floor(i / 2)),
      hours: 4.5 - (i * 0.2),
      date: fmtDate(daysAgo(10 - i)),
    })),
    avgSleepQuality: 2.6,
    avgSleepHours: 4.2,

    mbcScores: {
      phq9: [
        { score: 15, severity: 'Moderately Severe', date: fmtDateYr(daysAgo(90)) },
        { score: 18, severity: 'Moderately Severe', date: fmtDateYr(daysAgo(60)) },
        { score: 20, severity: 'Severe', date: fmtDateYr(daysAgo(30)) },
        { score: 22, severity: 'Severe', date: fmtDateYr(daysAgo(3)) },
      ],
      gad7: [
        { score: 12, severity: 'Moderate', date: fmtDateYr(daysAgo(90)) },
        { score: 15, severity: 'Severe', date: fmtDateYr(daysAgo(60)) },
        { score: 17, severity: 'Severe', date: fmtDateYr(daysAgo(30)) },
        { score: 18, severity: 'Severe', date: fmtDateYr(daysAgo(3)) },
      ],
      pcl5: [
        { score: 42, severity: 'Probable PTSD', date: fmtDateYr(daysAgo(90)) },
        { score: 48, severity: 'Severe', date: fmtDateYr(daysAgo(60)) },
        { score: 55, severity: 'Severe', date: fmtDateYr(daysAgo(30)) },
        { score: 58, severity: 'Severe', date: fmtDateYr(daysAgo(5)) },
      ],
      auditC: [
        { score: 5, severity: 'Moderate Risk', date: fmtDateYr(daysAgo(60)) },
        { score: 7, severity: 'High Risk', date: fmtDateYr(daysAgo(30)) },
        { score: 8, severity: 'High Risk', date: fmtDateYr(daysAgo(5)) },
      ],
    },
    latestMBC: {
      phq9: { score: 22, severity: 'Severe', date: fmtDateYr(daysAgo(3)) },
      gad7: { score: 18, severity: 'Severe', date: fmtDateYr(daysAgo(3)) },
      pcl5: { score: 58, severity: 'Severe', date: fmtDateYr(daysAgo(5)) },
      auditC: { score: 8, severity: 'High Risk', date: fmtDateYr(daysAgo(5)) },
    },

    longitudinalAssessments: [
      { type: 'PHQ-9', score: 15, date: fmtDateYr(daysAgo(90)) },
      { type: 'PHQ-9', score: 22, date: fmtDateYr(daysAgo(3)) },
      { type: 'GAD-7', score: 12, date: fmtDateYr(daysAgo(90)) },
      { type: 'GAD-7', score: 18, date: fmtDateYr(daysAgo(3)) },
      { type: 'PCL-5', score: 42, date: fmtDateYr(daysAgo(90)) },
      { type: 'PCL-5', score: 58, date: fmtDateYr(daysAgo(5)) },
      { type: 'AUDIT-C', score: 5, date: fmtDateYr(daysAgo(60)) },
      { type: 'AUDIT-C', score: 8, date: fmtDateYr(daysAgo(5)) },
    ],

    resilienceIndex: 18,
    resilienceFactors: [
      { factor: 'Engagement Consistency', score: 5, max: 25 },
      { factor: 'Tool Diversity', score: 3, max: 20 },
      { factor: 'Mood Stability', score: 4, max: 20 },
      { factor: 'Goal Achievement', score: 0, max: 15 },
      { factor: 'Sleep Quality', score: 6, max: 20 },
    ],

    sleepActivityCorrelation: 'Concerning pattern: Both sleep quality and activity levels are critically low. Immediate intervention recommended.',
    performanceTriad: {
      sleepScore: 22,
      activityScore: 15,
      engagementScore: 25,
      overallReadiness: 21,
    },

    hrsFlags: {
      directWarnings: [
        { term: 'don\'t want to live', context: '...some days I just don\'t want to live like this anymore...' },
        { term: 'burden', context: '...I\'m just a burden to everyone around me...' },
      ],
      indirectWarnings: [
        { category: 'Hopelessness', term: 'hopeless', context: '...everything feels hopeless...' },
        { category: 'Shame', term: 'ashamed', context: '...ashamed of where I am in life...' },
        { category: 'Sleep Disruption', term: 'can\'t sleep', context: '...can\'t sleep, just stare at the ceiling...' },
        { category: 'Social Withdrawal', term: 'isolated', context: '...completely isolated, haven\'t talked to anyone...' },
        { category: 'Entrapment', term: 'no way out', context: '...feels like there\'s no way out of this situation...' },
      ],
      riskLevel: 'elevated',
    },
  };
}
