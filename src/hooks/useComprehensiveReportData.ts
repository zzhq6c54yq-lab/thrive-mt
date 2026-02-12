import { supabase } from '@/integrations/supabase/client';
import { ComprehensiveReportData } from '@/lib/comprehensiveReportGenerator';

// Helper to safely unwrap PromiseSettledResult + check Supabase .error
function unwrap(result: PromiseSettledResult<any>): { data: any[] | null; error: any } {
  if (result.status === 'rejected') {
    console.warn('Query rejected:', result.reason);
    return { data: null, error: result.reason };
  }
  const value = result.value;
  if (value.error) {
    console.warn('Supabase query error:', value.error);
    return { data: null, error: value.error };
  }
  return { data: value.data || [], error: null };
}

// Query labels for dynamic unwrapping (avoids brittle hardcoded indices)
const QUERY_LABELS = [
  'mood', 'journal', 'activities', 'assessment', 'breathing', 'binaural', 'goals', 'badges',
  'henryConv', 'coaching', 'therapyReq', 'aiSummaries', 'miniSessions', 'toolkit', 'meditation',
  'music', 'eventReg', 'gratitude', 'sleep', 'longitudinalAssessments'
] as const;

// Est. average messages per Henry conversation — make configurable if needed
const AVG_MSGS_PER_HENRY_CONVO = 6;

export async function fetchComprehensiveReportData(userId: string, userName: string): Promise<ComprehensiveReportData> {
  try {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Fetch all data sources in parallel — allSettled so one failure doesn't kill everything
  const settled = await Promise.allSettled([
    // 1. Mood (daily_check_ins)
    supabase
      .from('daily_check_ins')
      .select('mood_score, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true }),

    // 2. Journal entries
    supabase
      .from('journal_entries')
      .select('id, mood, notes, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true })
      .limit(50),

    // 3. User activities
    supabase
      .from('user_activities')
      .select('activity_type, duration_minutes, completed_at')
      .eq('user_id', userId)
      .gte('completed_at', thirtyDaysAgo.toISOString())
      .limit(50),

    // 4. Assessment results
    supabase
      .from('assessment_results')
      .select('assessment_type, score, severity, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false }),

    // 5. Breathing sessions
    supabase
      .from('breathing_sessions')
      .select('duration_seconds, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 6. Binaural sessions
    supabase
      .from('binaural_sessions')
      .select('duration_minutes, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 7. Goals
    supabase
      .from('user_goals')
      .select('id, title, completed, created_at')
      .eq('user_id', userId),

    // 8. User earned badges
    supabase
      .from('user_earned_badges')
      .select('badge_id, earned_at')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })
      .limit(20),

    // 9. Henry conversations
    supabase
      .from('henry_conversations')
      .select('id, started_at')
      .eq('user_id', userId)
      .gte('started_at', thirtyDaysAgo.toISOString()),

    // 10. Coaching sessions
    supabase
      .from('coaching_sessions')
      .select('id, status, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 11. Therapy requests
    supabase
      .from('therapist_requests')
      .select('id, status, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 12. AI Session Summaries
    supabase
      .from('ai_session_summaries')
      .select('content, key_topics, risk_flags, mood_trend, summary_type, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false }),

    // 13. Mini Sessions
    supabase
      .from('mini_sessions' as any)
      .select('focus, mood, anxiety, energy, urge_level, summary, coaching, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 14. Toolkit category interactions
    supabase
      .from('toolkit_category_interactions' as any)
      .select('category_id, tool_name, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 15. Meditation sessions
    supabase
      .from('meditation_sessions' as any)
      .select('duration_seconds, meditation_type, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 16. Music therapy recordings
    supabase
      .from('music_therapy_recordings')
      .select('duration_seconds, mood_before, mood_after, instrument, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 17. Event registrations
    supabase
      .from('event_registrations' as any)
      .select('event_title, event_type, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 18. Gratitude entries
    supabase
      .from('gratitude_entries' as any)
      .select('id, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 19. Sleep tracker entries
    supabase
      .from('sleep_tracker_entries' as any)
      .select('quality, duration, bed_time, wake_time, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 20. Longitudinal assessments (12 months for MBC trend lines)
    supabase
      .from('assessment_results')
      .select('assessment_type, score, severity, created_at')
      .eq('user_id', userId)
      .gte('created_at', new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true }),
  ]);

  // Dynamic unwrap with labels (safer than hardcoded indices)
  const resMap: Record<string, any[]> = {};
  settled.forEach((result, i) => {
    const label = QUERY_LABELS[i] || `query_${i}`;
    resMap[label] = unwrap(result).data || [];
  });
  const getRes = (label: string) => resMap[label] || [];

  // ─── PROCESS MOOD DATA ───
  const moodEntries = getRes('mood');
  const moodScores = moodEntries.map(m => ({
    date: new Date(m.created_at || now).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: m.mood_score || 0,
  }));
  const avgMood = moodScores.length > 0
    ? moodScores.reduce((s, m) => s + m.score, 0) / moodScores.length
    : 0;

  // Determine trend
  let moodTrend: 'improving' | 'stable' | 'declining' = 'stable';
  if (moodScores.length >= 4) {
    const firstHalf = moodScores.slice(0, Math.floor(moodScores.length / 2));
    const secondHalf = moodScores.slice(Math.floor(moodScores.length / 2));
    const firstAvg = firstHalf.reduce((s, m) => s + m.score, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((s, m) => s + m.score, 0) / secondHalf.length;
    if (secondAvg - firstAvg > 0.5) moodTrend = 'improving';
    else if (firstAvg - secondAvg > 0.5) moodTrend = 'declining';
  }

  const highEntry = moodScores.length > 0 ? moodScores.reduce((a, b) => a.score > b.score ? a : b) : null;
  const lowEntry = moodScores.length > 0 ? moodScores.reduce((a, b) => a.score < b.score ? a : b) : null;

  // ─── PROCESS ACTIVITIES ───
  const activities = getRes('activities');
  const activityMap: Record<string, { count: number; minutes: number }> = {};
  activities.forEach(a => {
    const type = a.activity_type || 'Other';
    if (!activityMap[type]) activityMap[type] = { count: 0, minutes: 0 };
    activityMap[type].count += 1;
    activityMap[type].minutes += a.duration_minutes || 0;
  });
  const activitiesByType = Object.entries(activityMap).map(([name, v]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count: v.count,
    minutes: v.minutes,
  }));
  const totalWellnessMinutes = activities.reduce((s, a) => s + (a.duration_minutes || 0), 0);
  const mostUsedTool = activitiesByType.length > 0
    ? activitiesByType.sort((a, b) => b.count - a.count)[0].name
    : 'N/A';

  // ─── PROCESS JOURNAL ───
  const journals = getRes('journal');
  const moodCounts: Record<string, number> = {};
  journals.forEach(j => {
    if (j.mood) {
      moodCounts[j.mood] = (moodCounts[j.mood] || 0) + 1;
    }
  });
  const topJournalThemes = Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([mood]) => mood);

  // ─── SDOH KEYWORD SCAN ───
  const sdohKeywords: { term: string; category: string; priority: 'high' | 'moderate' }[] = [
    { term: 'eviction', category: 'Housing', priority: 'high' },
    { term: 'evicted', category: 'Housing', priority: 'high' },
    { term: 'homeless', category: 'Housing', priority: 'high' },
    { term: 'shelter', category: 'Housing', priority: 'high' },
    { term: 'housing', category: 'Housing', priority: 'moderate' },
    { term: 'rent', category: 'Housing', priority: 'moderate' },
    { term: 'notice to quit', category: 'Housing', priority: 'high' },
    { term: 'sleeping in car', category: 'Housing', priority: 'high' },
    { term: 'couch surfing', category: 'Housing', priority: 'high' },
    { term: 'doubled up', category: 'Housing', priority: 'high' },
    { term: 'utility shutoff', category: 'Financial', priority: 'high' },
    { term: 'bills', category: 'Financial', priority: 'high' },
    { term: 'debt', category: 'Financial', priority: 'high' },
    { term: 'afford', category: 'Financial', priority: 'moderate' },
    { term: 'money', category: 'Financial', priority: 'moderate' },
    { term: 'broke', category: 'Financial', priority: 'high' },
    { term: 'food', category: 'Food Security', priority: 'high' },
    { term: 'hungry', category: 'Food Security', priority: 'high' },
    { term: 'meal', category: 'Food Security', priority: 'moderate' },
    { term: 'starving', category: 'Food Security', priority: 'high' },
    { term: 'food bank', category: 'Food Security', priority: 'high' },
    { term: 'utilities', category: 'Financial', priority: 'high' },
    { term: 'electricity', category: 'Financial', priority: 'moderate' },
    { term: 'unemployed', category: 'Employment', priority: 'high' },
    { term: 'fired', category: 'Employment', priority: 'high' },
    { term: 'laid off', category: 'Employment', priority: 'high' },
    { term: 'job loss', category: 'Employment', priority: 'high' },
    { term: 'can\'t work', category: 'Employment', priority: 'high' },
    { term: 'disability', category: 'Access', priority: 'moderate' },
    { term: 'insurance', category: 'Access', priority: 'moderate' },
    { term: 'transportation', category: 'Access', priority: 'moderate' },
    { term: 'va benefits', category: 'Access', priority: 'moderate' },
    { term: 'service connected', category: 'Access', priority: 'moderate' },
  ];

  const sdohFlags: { keyword: string; context: string; priority: 'high' | 'moderate' }[] = [];
  const seenCategories = new Set<string>();
  journals.forEach(j => {
    const text = (j.notes || '').toLowerCase();
    sdohKeywords.forEach(kw => {
      if (text.includes(kw.term) && !seenCategories.has(kw.category + kw.term)) {
        seenCategories.add(kw.category + kw.term);
        const idx = text.indexOf(kw.term);
        const start = Math.max(0, idx - 30);
        const end = Math.min(text.length, idx + kw.term.length + 30);
        const snippet = (j.notes || '').substring(start, end).replace(/\n/g, ' ').trim();
        sdohFlags.push({
          keyword: `${kw.category}: "${kw.term}"`,
          context: snippet.length < (j.notes || '').length ? `...${snippet}...` : snippet,
          priority: kw.priority,
        });
      }
    });
  });

  // ─── PROCESS ASSESSMENTS ───
  const assessmentsCompleted = getRes('assessment').map(a => ({
    type: a.assessment_type,
    score: a.score,
    severity: a.severity || 'N/A',
    date: new Date(a.created_at || now).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  // ─── PROCESS BREATHING / BINAURAL ───
  const breathingData = getRes('breathing');
  const breathingTotalMinutes = Math.round(breathingData.reduce((s, b) => s + (b.duration_seconds || 0), 0) / 60);
  const binauralData = getRes('binaural');
  const binauralTotalMinutes = binauralData.reduce((s, b) => s + (b.duration_minutes || 0), 0);

  // ─── PROCESS GOALS ───
  const goals = getRes('goals');
  const goalsCompleted = goals.filter(g => g.completed === true).length;
  const goalCompletionRate = goals.length > 0 ? Math.round((goalsCompleted / goals.length) * 100) : 0;

  // ─── PROCESS BADGES ───
  const badgesEarned = getRes('badges').map((b) => ({
    title: b.badge_id || 'Achievement',
    date: new Date(b.earned_at || now).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  // ─── PROCESS HENRY CONVERSATIONS ───
  const henryConversations = getRes('henryConv').length;
  const henryMessages = henryConversations * AVG_MSGS_PER_HENRY_CONVO;

  // ─── PROCESS COACHING / THERAPY ───
  const coachingSessions = getRes('coaching').length;
  const therapyRequests = getRes('therapyReq').length;

  // ─── CALCULATE STREAKS (reuse moodEntries, TZ-safe) ───
  const streakDates = moodEntries.map(d => new Date(d.created_at || now).toISOString().split('T')[0]);
  const uniqueDates = [...new Set(streakDates)];
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Current streak: consecutive from today backward
  for (let i = 0; i < 90; i++) {
    const checkDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const checkStr = checkDate.toISOString().split('T')[0];
    if (uniqueDates.includes(checkStr)) {
      tempStreak++;
    } else {
      break;
    }
  }
  currentStreak = tempStreak;

  // Longest streak: full scan
  tempStreak = 0;
  for (let i = 0; i < 90; i++) {
    const checkDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const checkStr = checkDate.toISOString().split('T')[0];
    if (uniqueDates.includes(checkStr)) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // ─── PROCESS AI SESSION SUMMARIES ───
  const aiSummaries = getRes('aiSummaries');
  const henryConversationSummaries = aiSummaries.map(s => {
    let keyTopics: string[] = [];
    let riskFlagsArr: string[] = [];
    try {
      keyTopics = typeof s.key_topics === 'string' ? JSON.parse(s.key_topics) : (s.key_topics || []);
      if (!Array.isArray(keyTopics)) keyTopics = [];
    } catch { keyTopics = []; }
    try {
      riskFlagsArr = typeof s.risk_flags === 'string' ? JSON.parse(s.risk_flags) : (s.risk_flags || []);
      if (!Array.isArray(riskFlagsArr)) riskFlagsArr = [];
    } catch { riskFlagsArr = []; }
    return {
      content: s.content || '',
      keyTopics,
      riskFlags: riskFlagsArr,
      moodTrend: s.mood_trend || null,
      date: new Date(s.created_at || now).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  // Aggregate key topics across all summaries
  const allKeyTopics: Record<string, number> = {};
  henryConversationSummaries.forEach(s => {
    s.keyTopics.forEach(t => {
      allKeyTopics[t] = (allKeyTopics[t] || 0) + 1;
    });
  });
  const henryTopThemes = Object.entries(allKeyTopics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic]) => topic);

  // Aggregate AI-detected risk flags
  const aiRiskFlags: string[] = [];
  henryConversationSummaries.forEach(s => {
    s.riskFlags.forEach(flag => {
      if (!aiRiskFlags.includes(flag)) aiRiskFlags.push(flag);
    });
  });

  // ─── PROCESS MINI SESSIONS ───
  const miniSessions = getRes('miniSessions') as any[];
  const miniSessionCount = miniSessions.length;
  const miniMoods = miniSessions.filter(m => m.mood != null).map(m => m.mood as number);
  const miniAnxiety = miniSessions.filter(m => m.anxiety != null).map(m => m.anxiety as number);
  const miniEnergy = miniSessions.filter(m => m.energy != null).map(m => m.energy as number);
  const avgMiniMood = miniMoods.length > 0 ? miniMoods.reduce((s, v) => s + v, 0) / miniMoods.length : null;
  const avgMiniAnxiety = miniAnxiety.length > 0 ? miniAnxiety.reduce((s, v) => s + v, 0) / miniAnxiety.length : null;
  const avgMiniEnergy = miniEnergy.length > 0 ? miniEnergy.reduce((s, v) => s + v, 0) / miniEnergy.length : null;

  // Focus area distribution
  const focusCounts: Record<string, number> = {};
  miniSessions.forEach(m => {
    const focus = m.focus || 'other';
    focusCounts[focus] = (focusCounts[focus] || 0) + 1;
  });
  const miniFocusAreas = Object.entries(focusCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([area, count]) => ({ area, count }));

  // ─── PROCESS TOOLKIT INTERACTIONS ───
  const toolkitData = getRes('toolkit') as any[];
  const toolkitCounts: Record<string, number> = {};
  toolkitData.forEach(t => {
    const key = t.category_id || t.tool_name || 'Unknown';
    toolkitCounts[key] = (toolkitCounts[key] || 0) + 1;
  });
  const toolkitInteractions = Object.entries(toolkitCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // ─── PROCESS MEDITATION SESSIONS ───
  const meditationData = getRes('meditation') as any[];
  const meditationSessions = meditationData.length;
  const meditationTotalMinutes = Math.round(meditationData.reduce((s, m) => s + (m.duration_seconds || 0), 0) / 60);

  // ─── PROCESS MUSIC THERAPY ───
  const musicData = getRes('music') as any[];
  const musicTherapySessions = musicData.length;
  const musicTotalMinutes = Math.round(musicData.reduce((s, m) => s + (m.duration_seconds || 0), 0) / 60);
  const musicMoodChanges = musicData
    .filter(m => m.mood_before && m.mood_after)
    .map(m => ({ before: m.mood_before, after: m.mood_after }));

  // ─── PROCESS EVENT REGISTRATIONS ───
  const eventData = getRes('eventReg') as any[];
  const workshopRegistrations = eventData.map(e => ({
    title: e.event_title || 'Untitled Event',
    type: e.event_type || 'workshop',
    status: 'registered',
  }));

  // ─── PROCESS GRATITUDE ENTRIES ───
  const gratitudeEntryCount = getRes('gratitude').length;

  // ─── PROCESS SLEEP TRACKER ───
  const sleepData = getRes('sleep') as any[];
  const sleepEntries = sleepData.map(s => ({
    quality: s.quality as number | null,
    hours: s.duration as number | null,
    date: new Date(s.created_at || now).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));
  const sleepQualities = sleepEntries.filter(s => s.quality != null).map(s => s.quality!);
  const sleepHours = sleepEntries.filter(s => s.hours != null).map(s => s.hours!);
  const avgSleepQuality = sleepQualities.length > 0 ? sleepQualities.reduce((s, v) => s + v, 0) / sleepQualities.length : null;
  const avgSleepHours = sleepHours.length > 0 ? sleepHours.reduce((s, v) => s + v, 0) / sleepHours.length : null;

  // ─── PROCESS MBC SCORES (PHQ-9, GAD-7, PCL-5, AUDIT-C) ───
  const MBC_TYPES = ['PHQ-9', 'GAD-7', 'PCL-5', 'AUDIT-C'];
  const mbcFromCurrent = assessmentsCompleted.filter(a => MBC_TYPES.some(t => a.type.toUpperCase().includes(t)));
  
  // Longitudinal assessments (12 months)
  const longAssessments = getRes('longitudinalAssessments') as any[];
  const longitudinalAssessments = longAssessments
    .filter(a => MBC_TYPES.some(t => (a.assessment_type || '').toUpperCase().includes(t)))
    .map(a => ({
      type: a.assessment_type,
      score: a.score,
      date: new Date(a.created_at || now).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
    }));

  function getMBCScores(typeName: string) {
    return longitudinalAssessments
      .filter(a => a.type.toUpperCase().includes(typeName))
      .map(a => ({ score: a.score, severity: getMBCSeverity(typeName, a.score), date: a.date }));
  }

  function getMBCSeverity(type: string, score: number): string {
    if (type === 'PHQ-9') {
      if (score <= 4) return 'Minimal';
      if (score <= 9) return 'Mild';
      if (score <= 14) return 'Moderate';
      if (score <= 19) return 'Moderately Severe';
      return 'Severe';
    }
    if (type === 'GAD-7') {
      if (score <= 4) return 'Minimal';
      if (score <= 9) return 'Mild';
      if (score <= 14) return 'Moderate';
      return 'Severe';
    }
    if (type === 'PCL-5') {
      if (score < 31) return 'Below Threshold';
      if (score < 45) return 'Probable PTSD';
      return 'Severe';
    }
    if (type === 'AUDIT-C') {
      if (score <= 2) return 'Low Risk';
      if (score <= 5) return 'Moderate Risk';
      return 'High Risk';
    }
    return 'N/A';
  }

  const mbcScores = {
    phq9: getMBCScores('PHQ-9'),
    gad7: getMBCScores('GAD-7'),
    pcl5: getMBCScores('PCL-5'),
    auditC: getMBCScores('AUDIT-C'),
  };

  const latestMBC = {
    phq9: mbcScores.phq9.length > 0 ? mbcScores.phq9[mbcScores.phq9.length - 1] : null,
    gad7: mbcScores.gad7.length > 0 ? mbcScores.gad7[mbcScores.gad7.length - 1] : null,
    pcl5: mbcScores.pcl5.length > 0 ? mbcScores.pcl5[mbcScores.pcl5.length - 1] : null,
    auditC: mbcScores.auditC.length > 0 ? mbcScores.auditC[mbcScores.auditC.length - 1] : null,
  };

  // ─── COMPUTE RESILIENCE INDEX (0-100) ───
  const resilienceFactors: { factor: string; score: number; max: number }[] = [];
  // Engagement consistency (max 25)
  const engagementDays = new Set([...moodEntries.map(m => new Date(m.created_at).toISOString().split('T')[0])]).size;
  const engConsistency = Math.min(25, Math.round((engagementDays / 30) * 25));
  resilienceFactors.push({ factor: 'Engagement Consistency', score: engConsistency, max: 25 });
  // Tool diversity (max 20)
  const toolsUsed = new Set([
    ...(breathingData.length > 0 ? ['breathing'] : []),
    ...(binauralData.length > 0 ? ['binaural'] : []),
    ...(journals.length > 0 ? ['journal'] : []),
    ...(meditationSessions > 0 ? ['meditation'] : []),
    ...(musicTherapySessions > 0 ? ['music'] : []),
    ...(miniSessionCount > 0 ? ['miniSession'] : []),
    ...(henryConversations > 0 ? ['henry'] : []),
    ...(gratitudeEntryCount > 0 ? ['gratitude'] : []),
  ]).size;
  const toolDiv = Math.min(20, Math.round((toolsUsed / 8) * 20));
  resilienceFactors.push({ factor: 'Tool Diversity', score: toolDiv, max: 20 });
  // Mood stability (max 20)
  const moodVariance = moodScores.length >= 2
    ? moodScores.reduce((s, m) => s + Math.pow(m.score - avgMood, 2), 0) / moodScores.length
    : 0;
  const moodStability = Math.min(20, Math.round(Math.max(0, 20 - moodVariance * 2)));
  resilienceFactors.push({ factor: 'Mood Stability', score: moodStability, max: 20 });
  // Goal completion (max 15)
  const goalScore = Math.min(15, Math.round((goalCompletionRate / 100) * 15));
  resilienceFactors.push({ factor: 'Goal Achievement', score: goalScore, max: 15 });
  // Sleep quality (max 20)
  const sleepScore = avgSleepQuality != null ? Math.min(20, Math.round((avgSleepQuality / 10) * 20)) : 10;
  resilienceFactors.push({ factor: 'Sleep Quality', score: sleepScore, max: 20 });

  const resilienceIndex = resilienceFactors.reduce((s, f) => s + f.score, 0);

  // ─── PERFORMANCE TRIAD (Sleep, Activity, Engagement) ───
  const sleepTriadScore = avgSleepHours != null ? Math.min(100, Math.round((avgSleepHours / 8) * 100)) : 50;
  const activityTriadScore = Math.min(100, Math.round((activities.length / 20) * 100));
  const totalEngCount = journals.length + breathingData.length + miniSessionCount + meditationSessions + musicTherapySessions + henryConversations;
  const engagementTriadScore = Math.min(100, Math.round((totalEngCount / 30) * 100));
  const overallReadiness = Math.round((sleepTriadScore + activityTriadScore + engagementTriadScore) / 3);
  const performanceTriad = { sleepScore: sleepTriadScore, activityScore: activityTriadScore, engagementScore: engagementTriadScore, overallReadiness };

  // Sleep-Activity Correlation
  let sleepActivityCorrelation = 'Insufficient data for correlation analysis.';
  if (sleepEntries.length >= 5 && activities.length >= 5) {
    if (avgSleepQuality != null && avgSleepQuality >= 6 && activityTriadScore >= 50) {
      sleepActivityCorrelation = 'Positive correlation: Good sleep quality aligns with consistent activity engagement.';
    } else if (avgSleepQuality != null && avgSleepQuality < 5 && activityTriadScore < 40) {
      sleepActivityCorrelation = 'Concerning pattern: Both sleep quality and activity levels are below optimal.';
    } else {
      sleepActivityCorrelation = 'Mixed pattern: Sleep and activity levels show independent variation.';
    }
  }

  // ─── GENERATE RISK FLAGS ───
  const riskFlags: string[] = [];
  if (avgMood > 0 && avgMood < 4) riskFlags.push(`Low average mood score (${avgMood.toFixed(1)}/10) — consider clinical follow-up`);
  if (moodTrend === 'declining') riskFlags.push('Declining mood trend detected over the reporting period');
  if (moodScores.some(m => m.score <= 2)) riskFlags.push('One or more mood entries at critically low levels (≤2/10)');
  if (journals.length === 0 && activities.length === 0) riskFlags.push('No engagement with wellness tools in the past 30 days');
  if (currentStreak === 0 && moodScores.length > 3) riskFlags.push('Broken daily check-in streak — re-engagement support recommended');

  // MBC-specific risk flags
  if (latestMBC.phq9 && latestMBC.phq9.score >= 15) riskFlags.push(`PHQ-9 score ${latestMBC.phq9.score} (${latestMBC.phq9.severity}) — depression screening elevated`);
  if (latestMBC.gad7 && latestMBC.gad7.score >= 10) riskFlags.push(`GAD-7 score ${latestMBC.gad7.score} (${latestMBC.gad7.severity}) — anxiety screening elevated`);
  if (latestMBC.pcl5 && latestMBC.pcl5.score >= 31) riskFlags.push(`PCL-5 score ${latestMBC.pcl5.score} (${latestMBC.pcl5.severity}) — PTSD threshold met`);
  if (latestMBC.auditC && latestMBC.auditC.score >= 4) riskFlags.push(`AUDIT-C score ${latestMBC.auditC.score} (${latestMBC.auditC.severity}) — alcohol screening elevated`);

  // New risk flags from AI summaries
  if (aiRiskFlags.length > 0) {
    aiRiskFlags.forEach(flag => {
      riskFlags.push(`AI-detected: ${flag}`);
    });
  }

  // Mini session risk patterns
  if (avgMiniMood !== null && avgMiniMood < 3 && avgMiniAnxiety !== null && avgMiniAnxiety > 7) {
    riskFlags.push('Between-Session Companion shows pattern of low mood + high anxiety — clinical attention recommended');
  }

  // Sleep quality risk
  if (avgSleepQuality !== null && avgSleepQuality < 3) {
    riskFlags.push(`Consistently poor sleep quality (avg ${avgSleepQuality.toFixed(1)}/10) — may require intervention`);
  }
  if (avgSleepHours !== null && avgSleepHours < 5) {
    riskFlags.push(`Very low average sleep duration (${avgSleepHours.toFixed(1)} hrs/night)`);
  }

  // ─── GENERATE RECOMMENDATIONS ───
  const recommendations: string[] = [];
  if (moodTrend === 'declining') {
    recommendations.push('Schedule a check-in session to discuss mood trends');
  }
  if (journals.length < 5) {
    recommendations.push('Encourage daily journaling to build emotional awareness');
  }
  if (breathingData.length < 3) {
    recommendations.push('Introduce structured breathing exercises (4-7-8 or box breathing)');
  }
  if (goals.length === 0) {
    recommendations.push('Set 2-3 achievable weekly wellness goals to build momentum');
  }
  if (goalCompletionRate < 50 && goals.length > 0) {
    recommendations.push('Review and adjust goal difficulty — smaller goals may improve completion rate');
  }
  if (coachingSessions === 0) {
    recommendations.push('Consider scheduling a coaching session for personalized guidance');
  }
  if (moodTrend === 'improving') {
    recommendations.push('Continue current wellness routine — positive momentum is building');
  }
  if (activitiesByType.length > 3) {
    recommendations.push('Great tool variety — maintain diverse wellness practices for resilience');
  }

  // New recommendations from expanded data
  if (toolkitInteractions.length === 0) {
    recommendations.push('Explore the Wellness Toolkit — diverse coping tools can strengthen resilience');
  }
  if (workshopRegistrations.length === 0) {
    recommendations.push('Consider joining a workshop or group event for community support');
  }
  if (meditationSessions === 0) {
    recommendations.push('Try guided meditation — even 5 minutes daily can improve emotional regulation');
  }
  if (avgSleepQuality !== null && avgSleepQuality < 5) {
    recommendations.push('Focus on sleep hygiene — poor sleep directly impacts mood and anxiety');
  }
  if (gratitudeEntryCount === 0) {
    recommendations.push('Start a gratitude practice — 3 items daily can shift perspective over time');
  }

  if (recommendations.length < 2) {
    recommendations.push('Explore new wellness tools to discover what resonates most');
    recommendations.push('Maintain consistent daily check-ins for accurate progress tracking');
  }

  // ─── GENERATE SUGGESTED EHR NOTE (Enhanced with MBC) ───
  const moodSummary = avgMood > 0 ? `avg mood ${avgMood.toFixed(1)}/10 (${moodTrend})` : 'no mood data recorded';
  const totalInteractions = activities.length + journals.length + breathingData.length + miniSessionCount + meditationSessions + musicTherapySessions;
  const engagementSummary = totalInteractions > 0
    ? `${totalInteractions} wellness interactions logged`
    : 'minimal platform engagement';
  const mbcSummary = [
    latestMBC.phq9 ? `PHQ-9: ${latestMBC.phq9.score}` : null,
    latestMBC.gad7 ? `GAD-7: ${latestMBC.gad7.score}` : null,
    latestMBC.pcl5 ? `PCL-5: ${latestMBC.pcl5.score}` : null,
    latestMBC.auditC ? `AUDIT-C: ${latestMBC.auditC.score}` : null,
  ].filter(Boolean).join(', ');
  const mbcNote = mbcSummary ? ` MBC: ${mbcSummary}.` : '';
  const henryThemeSummary = henryTopThemes.length > 0
    ? ` Key conversation themes: ${henryTopThemes.slice(0, 3).join(', ')}.`
    : '';
  const toolkitSummary = toolkitInteractions.length > 0
    ? ` Toolkit categories used: ${toolkitInteractions.slice(0, 3).map(t => t.name).join(', ')}.`
    : '';
  const sdohSummary = sdohFlags.filter(f => f.priority === 'high').length > 0
    ? ` SDOH flags present (${[...new Set(sdohFlags.filter(f => f.priority === 'high').map(f => f.keyword.split(':')[0]))].join(', ')}).`
    : ' No acute housing or safety risks detected.';
  const riskSummary = riskFlags.length > 0 ? ` ${riskFlags.length} attention item(s) flagged.` : ' No risk flags.';
  const suggestedEHRNote = `Veteran engaged with ThriveMT for ${engagementDays}/30 days.${mbcNote} ${moodSummary}, ${engagementSummary}.${riskSummary}${sdohSummary}${henryThemeSummary}${toolkitSummary} ${moodTrend === 'declining' ? 'Recommend clinical follow-up.' : 'Clinician review complete.'}`.trim();

  // ─── TOTAL POINTS ───
  const totalPoints = activities.length * 10 + badgesEarned.length * 50 + journals.length * 15 + breathingData.length * 5 + binauralData.length * 5 + miniSessionCount * 10 + meditationSessions * 10 + gratitudeEntryCount * 5;

  const result: ComprehensiveReportData = {
    userName,
    reportDate: now,
    dateRange: { start: thirtyDaysAgo, end: now },
    moodScores,
    avgMood,
    moodTrend,
    moodHighDay: highEntry?.date || 'N/A',
    moodLowDay: lowEntry?.date || 'N/A',
    totalActivities: activities.length,
    totalWellnessMinutes,
    activitiesByType,
    mostUsedTool,
    journalEntryCount: journals.length,
    journalStreak: currentStreak,
    topJournalThemes,
    assessmentsCompleted,
    breathingSessions: breathingData.length,
    breathingTotalMinutes,
    binauralSessions: binauralData.length,
    binauralTotalMinutes,
    goalsSet: goals.length,
    goalsCompleted,
    goalCompletionRate,
    badgesEarned,
    henryConversations,
    henryMessages,
    coachingSessions,
    therapyRequests,
    currentStreak,
    longestStreak,
    totalPoints,
    riskFlags,
    recommendations,
    sdohFlags,
    suggestedEHRNote,
    // New expanded data
    henryConversationSummaries,
    henryTopThemes,
    aiRiskFlags,
    miniSessionCount,
    avgMiniMood,
    avgMiniAnxiety,
    avgMiniEnergy,
    miniFocusAreas,
    toolkitInteractions,
    meditationSessions,
    meditationTotalMinutes,
    musicTherapySessions,
    musicTotalMinutes,
    musicMoodChanges,
    workshopRegistrations,
    gratitudeEntryCount,
    sleepEntries,
    avgSleepQuality,
    avgSleepHours,
    // VA/DoD clinical enhancements
    mbcScores,
    latestMBC,
    longitudinalAssessments,
    resilienceIndex,
    resilienceFactors,
    sleepActivityCorrelation,
    performanceTriad,
  };

  console.log('Report generated successfully:', { userId, totalFields: Object.keys(result).length });
  return result;
  } catch (error: any) {
    console.error('Report fetch failed:', error);
    throw new Error(`Failed to generate report: ${error?.message || 'Unknown error'}`);
  }
}
