import { supabase } from '@/integrations/supabase/client';
import { ComprehensiveReportData } from '@/lib/comprehensiveReportGenerator';

export async function fetchComprehensiveReportData(userId: string, userName: string): Promise<ComprehensiveReportData> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Fetch all data sources in parallel
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
  ] = await Promise.all([
    // 1. Mood (daily_check_ins)
    supabase
      .from('daily_check_ins')
      .select('mood_score, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true }),

    // 2. Journal entries (schema: id, mood, mood_score, notes, created_at)
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

    // 7. Goals (schema: id, title, completed, goal_type, current, target)
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

    // 13. Streak data (all check-ins for streak calc)
    supabase
      .from('daily_check_ins')
      .select('created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(90),
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
  // Extract themes from mood field
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
        // Extract a snippet around the keyword for context
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

  // ─── GENERATE RISK FLAGS ───
  const riskFlags: string[] = [];
  if (avgMood > 0 && avgMood < 4) riskFlags.push(`Low average mood score (${avgMood.toFixed(1)}/10) — consider clinical follow-up`);
  if (moodTrend === 'declining') riskFlags.push('Declining mood trend detected over the reporting period');
  if (moodScores.some(m => m.score <= 2)) riskFlags.push('One or more mood entries at critically low levels (≤2/10)');
  if (journals.length === 0 && activities.length === 0) riskFlags.push('No engagement with wellness tools in the past 30 days');
  if (currentStreak === 0 && moodScores.length > 3) riskFlags.push('Broken daily check-in streak — re-engagement support recommended');

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
  if (recommendations.length < 2) {
    recommendations.push('Explore new wellness tools to discover what resonates most');
    recommendations.push('Maintain consistent daily check-ins for accurate progress tracking');
  }

  // ─── GENERATE SUGGESTED EHR NOTE ───
  const moodSummary = avgMood > 0 ? `avg mood ${avgMood.toFixed(1)}/10 (${moodTrend})` : 'no mood data recorded';
  const engagementSummary = activities.length + journals.length + breathingData.length > 0
    ? `${activities.length + journals.length + breathingData.length} wellness interactions logged`
    : 'minimal platform engagement';
  const sdohSummary = sdohFlags.filter(f => f.priority === 'high').length > 0
    ? ` SDOH flags present (${[...new Set(sdohFlags.filter(f => f.priority === 'high').map(f => f.keyword.split(':')[0]))].join(', ')}).`
    : '';
  const riskSummary = riskFlags.length > 0 ? ` ${riskFlags.length} attention item(s) flagged.` : ' No risk flags.';
  const suggestedEHRNote = `Patient engaged with ThriveMT digital wellness platform over 30-day period: ${moodSummary}, ${engagementSummary}.${riskSummary}${sdohSummary} ${moodTrend === 'declining' ? 'Recommend clinical follow-up.' : 'Continue current care plan.'}`.trim();

  // ─── TOTAL POINTS ───
  const totalPoints = activities.length * 10 + badgesEarned.length * 50 + journals.length * 15 + breathingData.length * 5 + binauralData.length * 5;

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
  };
}
