import { supabase } from '@/integrations/supabase/client';
import { ComprehensiveReportData } from '@/lib/comprehensiveReportGenerator';

export async function fetchComprehensiveReportData(userId: string, userName: string): Promise<ComprehensiveReportData> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Fetch all data sources in parallel (21 queries)
  const [
    moodRes,
    journalRes,
    activitiesRes,
    assessmentRes,
    breathingRes,
    binauralRes,
    goalsRes,
    badgesRes,
    henryConvRes,
    coachingRes,
    therapyReqRes,
    wellnessRes,
    streakRes,
    // New data sources
    aiSummariesRes,
    miniSessionsRes,
    toolkitRes,
    meditationRes,
    musicRes,
    eventRegRes,
    gratitudeRes,
    sleepRes,
  ] = await Promise.all([
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
      .order('created_at', { ascending: true }),

    // 3. User activities
    supabase
      .from('user_activities')
      .select('activity_type, duration_minutes, completed_at')
      .eq('user_id', userId)
      .gte('completed_at', thirtyDaysAgo.toISOString()),

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
      .select('id, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

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

    // 12. Wellness metrics
    supabase
      .from('wellness_metrics')
      .select('metric_type, metric_value, recorded_at')
      .eq('user_id', userId)
      .gte('recorded_at', thirtyDaysAgo.toISOString()),

    // 13. Streak data
    supabase
      .from('daily_check_ins')
      .select('created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(90),

    // 14. AI Session Summaries (Henry conversation summaries with topics & risk flags)
    supabase
      .from('ai_session_summaries')
      .select('content, key_topics, risk_flags, mood_trend, summary_type, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false }),

    // 15. Mini Sessions (Between-Session Companion)
    supabase
      .from('mini_sessions' as any)
      .select('focus, mood, anxiety, energy, urge_level, summary, coaching, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 16. Toolkit category interactions
    supabase
      .from('toolkit_category_interactions' as any)
      .select('category, tool_name, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 17. Meditation sessions
    supabase
      .from('meditation_sessions' as any)
      .select('duration_minutes, meditation_type, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 18. Music therapy recordings
    supabase
      .from('music_therapy_recordings')
      .select('duration_seconds, mood_before, mood_after, instrument, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 19. Event registrations (workshops)
    supabase
      .from('event_registrations' as any)
      .select('event_title, event_type, status, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 20. Gratitude entries
    supabase
      .from('gratitude_entries' as any)
      .select('id, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),

    // 21. Sleep tracker entries
    supabase
      .from('sleep_tracker_entries' as any)
      .select('sleep_quality, hours_slept, bedtime, wake_time, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString()),
  ]);

  // ─── PROCESS MOOD DATA ───
  const moodEntries = moodRes.data || [];
  const moodScores = moodEntries.map(m => ({
    date: new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: m.mood_score,
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
  const activities = activitiesRes.data || [];
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
  const journals = journalRes.data || [];
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
  const assessmentsCompleted = (assessmentRes.data || []).map(a => ({
    type: a.assessment_type,
    score: a.score,
    severity: a.severity || 'N/A',
    date: new Date(a.created_at!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  // ─── PROCESS BREATHING / BINAURAL ───
  const breathingData = breathingRes.data || [];
  const breathingTotalMinutes = Math.round(breathingData.reduce((s, b) => s + (b.duration_seconds || 0), 0) / 60);
  const binauralData = binauralRes.data || [];
  const binauralTotalMinutes = binauralData.reduce((s, b) => s + (b.duration_minutes || 0), 0);

  // ─── PROCESS GOALS ───
  const goals = goalsRes.data || [];
  const goalsCompleted = goals.filter(g => g.completed === true).length;
  const goalCompletionRate = goals.length > 0 ? Math.round((goalsCompleted / goals.length) * 100) : 0;

  // ─── PROCESS BADGES ───
  const badgesEarned = (badgesRes.data || []).map((b) => ({
    title: b.badge_id || 'Achievement',
    date: new Date(b.earned_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  // ─── PROCESS HENRY CONVERSATIONS ───
  const henryConversations = henryConvRes.data?.length || 0;
  const henryMessages = henryConversations * 6;

  // ─── PROCESS COACHING / THERAPY ───
  const coachingSessions = coachingRes.data?.length || 0;
  const therapyRequests = therapyReqRes.data?.length || 0;

  // ─── CALCULATE STREAKS ───
  const streakDates = (streakRes.data || []).map(d => new Date(d.created_at).toDateString());
  const uniqueDates = [...new Set(streakDates)];
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date();

  for (let i = 0; i < 90; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    if (uniqueDates.includes(checkDate.toDateString())) {
      tempStreak++;
      if (tempStreak > currentStreak && i < tempStreak) {
        currentStreak = tempStreak;
      }
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      tempStreak = 0;
    }
  }
  if (tempStreak > longestStreak) longestStreak = tempStreak;

  // ─── PROCESS AI SESSION SUMMARIES ───
  const aiSummaries = (aiSummariesRes.data || []) as any[];
  const henryConversationSummaries = aiSummaries.map(s => ({
    content: s.content || '',
    keyTopics: (s.key_topics || []) as string[],
    riskFlags: (s.risk_flags || []) as string[],
    moodTrend: s.mood_trend || null,
    date: new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

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
  const miniSessions = (miniSessionsRes.data || []) as any[];
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
  const toolkitData = (toolkitRes.data || []) as any[];
  const toolkitCounts: Record<string, number> = {};
  toolkitData.forEach(t => {
    const key = t.category || t.tool_name || 'Unknown';
    toolkitCounts[key] = (toolkitCounts[key] || 0) + 1;
  });
  const toolkitInteractions = Object.entries(toolkitCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // ─── PROCESS MEDITATION SESSIONS ───
  const meditationData = (meditationRes.data || []) as any[];
  const meditationSessions = meditationData.length;
  const meditationTotalMinutes = meditationData.reduce((s, m) => s + (m.duration_minutes || 0), 0);

  // ─── PROCESS MUSIC THERAPY ───
  const musicData = (musicRes.data || []) as any[];
  const musicTherapySessions = musicData.length;
  const musicTotalMinutes = Math.round(musicData.reduce((s, m) => s + (m.duration_seconds || 0), 0) / 60);
  const musicMoodChanges = musicData
    .filter(m => m.mood_before && m.mood_after)
    .map(m => ({ before: m.mood_before, after: m.mood_after }));

  // ─── PROCESS EVENT REGISTRATIONS ───
  const eventData = (eventRegRes.data || []) as any[];
  const workshopRegistrations = eventData.map(e => ({
    title: e.event_title || 'Untitled Event',
    type: e.event_type || 'workshop',
    status: e.status || 'registered',
  }));

  // ─── PROCESS GRATITUDE ENTRIES ───
  const gratitudeEntryCount = (gratitudeRes.data || []).length;

  // ─── PROCESS SLEEP TRACKER ───
  const sleepData = (sleepRes.data || []) as any[];
  const sleepEntries = sleepData.map(s => ({
    quality: s.sleep_quality as number | null,
    hours: s.hours_slept as number | null,
    date: new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));
  const sleepQualities = sleepEntries.filter(s => s.quality != null).map(s => s.quality!);
  const sleepHours = sleepEntries.filter(s => s.hours != null).map(s => s.hours!);
  const avgSleepQuality = sleepQualities.length > 0 ? sleepQualities.reduce((s, v) => s + v, 0) / sleepQualities.length : null;
  const avgSleepHours = sleepHours.length > 0 ? sleepHours.reduce((s, v) => s + v, 0) / sleepHours.length : null;

  // ─── GENERATE RISK FLAGS ───
  const riskFlags: string[] = [];
  if (avgMood > 0 && avgMood < 4) riskFlags.push(`Low average mood score (${avgMood.toFixed(1)}/10) — consider clinical follow-up`);
  if (moodTrend === 'declining') riskFlags.push('Declining mood trend detected over the reporting period');
  if (moodScores.some(m => m.score <= 2)) riskFlags.push('One or more mood entries at critically low levels (≤2/10)');
  if (journals.length === 0 && activities.length === 0) riskFlags.push('No engagement with wellness tools in the past 30 days');
  if (currentStreak === 0 && moodScores.length > 3) riskFlags.push('Broken daily check-in streak — re-engagement support recommended');

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

  // ─── GENERATE SUGGESTED EHR NOTE ───
  const moodSummary = avgMood > 0 ? `avg mood ${avgMood.toFixed(1)}/10 (${moodTrend})` : 'no mood data recorded';
  const totalInteractions = activities.length + journals.length + breathingData.length + miniSessionCount + meditationSessions + musicTherapySessions;
  const engagementSummary = totalInteractions > 0
    ? `${totalInteractions} wellness interactions logged`
    : 'minimal platform engagement';
  const henryThemeSummary = henryTopThemes.length > 0
    ? ` Key conversation themes: ${henryTopThemes.slice(0, 3).join(', ')}.`
    : '';
  const toolkitSummary = toolkitInteractions.length > 0
    ? ` Toolkit categories used: ${toolkitInteractions.slice(0, 3).map(t => t.name).join(', ')}.`
    : '';
  const sdohSummary = sdohFlags.filter(f => f.priority === 'high').length > 0
    ? ` SDOH flags present (${[...new Set(sdohFlags.filter(f => f.priority === 'high').map(f => f.keyword.split(':')[0]))].join(', ')}).`
    : '';
  const riskSummary = riskFlags.length > 0 ? ` ${riskFlags.length} attention item(s) flagged.` : ' No risk flags.';
  const suggestedEHRNote = `Patient engaged with ThriveMT digital wellness platform over 30-day period: ${moodSummary}, ${engagementSummary}.${riskSummary}${henryThemeSummary}${toolkitSummary}${sdohSummary} ${moodTrend === 'declining' ? 'Recommend clinical follow-up.' : 'Continue current care plan.'}`.trim();

  // ─── TOTAL POINTS ───
  const totalPoints = activities.length * 10 + badgesEarned.length * 50 + journals.length * 15 + breathingData.length * 5 + binauralData.length * 5 + miniSessionCount * 10 + meditationSessions * 10 + gratitudeEntryCount * 5;

  return {
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
  };
}
