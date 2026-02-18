import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WeekMetrics {
  avgMood: number | null;
  activityMinutes: number;
  checkInDays: number;
  toolsUsed: number;
}

export interface WeeklyComparisonData {
  thisWeek: WeekMetrics;
  lastWeek: WeekMetrics;
  changes: {
    mood: number | null;       // percentage change
    activityMinutes: number | null;
    checkInDays: number | null;
    toolsUsed: number | null;
  };
  isLoading: boolean;
  hasThisWeekData: boolean;
}

const computeChange = (current: number | null, previous: number | null): number | null => {
  if (current === null || previous === null) return null;
  if (previous === 0) return current > 0 ? 100 : null;
  return Math.round(((current - previous) / previous) * 100);
};

export const useWeeklyComparison = (): WeeklyComparisonData => {
  const now = new Date();

  // This week: Mon 00:00 → now
  const startOfThisWeek = new Date(now);
  const dayOfWeek = startOfThisWeek.getDay(); // 0=Sun
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfThisWeek.setDate(startOfThisWeek.getDate() - daysToMonday);
  startOfThisWeek.setHours(0, 0, 0, 0);

  // Last week: 7 days before thisWeek start → thisWeek start
  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  const thisWeekStart = startOfThisWeek.toISOString();
  const lastWeekStart = startOfLastWeek.toISOString();
  const lastWeekEnd = startOfThisWeek.toISOString();
  const nowIso = now.toISOString();

  const { data, isLoading } = useQuery({
    queryKey: ["weekly-comparison", thisWeekStart],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const uid = user.id;

      // Run all queries in parallel
      const [
        checkInsThis,
        checkInsLast,
        breathingThis,
        breathingLast,
        binauralThis,
        binauralLast,
        activitiesThis,
        activitiesLast,
      ] = await Promise.all([
        // Check-ins this week
        supabase
          .from("daily_check_ins")
          .select("created_at, mood_score")
          .eq("user_id", uid)
          .gte("created_at", thisWeekStart)
          .lte("created_at", nowIso),

        // Check-ins last week
        supabase
          .from("daily_check_ins")
          .select("created_at, mood_score")
          .eq("user_id", uid)
          .gte("created_at", lastWeekStart)
          .lt("created_at", lastWeekEnd),

        // Breathing sessions this week
        supabase
          .from("breathing_sessions")
          .select("duration_seconds")
          .eq("user_id", uid)
          .gte("created_at", thisWeekStart)
          .lte("created_at", nowIso),

        // Breathing sessions last week
        supabase
          .from("breathing_sessions")
          .select("duration_seconds")
          .eq("user_id", uid)
          .gte("created_at", lastWeekStart)
          .lt("created_at", lastWeekEnd),

        // Binaural sessions this week
        supabase
          .from("binaural_sessions")
          .select("duration_minutes")
          .eq("user_id", uid)
          .gte("created_at", thisWeekStart)
          .lte("created_at", nowIso),

        // Binaural sessions last week
        supabase
          .from("binaural_sessions")
          .select("duration_minutes")
          .eq("user_id", uid)
          .gte("created_at", lastWeekStart)
          .lt("created_at", lastWeekEnd),

        // User activities this week (distinct tool types)
        supabase
          .from("user_activities")
          .select("activity_type, duration_minutes")
          .eq("user_id", uid)
          .gte("completed_at", thisWeekStart)
          .lte("completed_at", nowIso),

        // User activities last week
        supabase
          .from("user_activities")
          .select("activity_type, duration_minutes")
          .eq("user_id", uid)
          .gte("completed_at", lastWeekStart)
          .lt("completed_at", lastWeekEnd),
      ]);

      // --- THIS WEEK ---
      const thisCheckIns = checkInsThis.data ?? [];
      const lastCheckIns = checkInsLast.data ?? [];

      // Mood averages
      const thisMoodScores = thisCheckIns.filter(c => c.mood_score !== null).map(c => c.mood_score as number);
      const lastMoodScores = lastCheckIns.filter(c => c.mood_score !== null).map(c => c.mood_score as number);
      const avgMoodThis = thisMoodScores.length > 0
        ? Math.round((thisMoodScores.reduce((a, b) => a + b, 0) / thisMoodScores.length) * 10) / 10
        : null;
      const avgMoodLast = lastMoodScores.length > 0
        ? Math.round((lastMoodScores.reduce((a, b) => a + b, 0) / lastMoodScores.length) * 10) / 10
        : null;

      // Check-in unique days
      const thisCheckInDays = new Set(thisCheckIns.map(c => new Date(c.created_at).toDateString())).size;
      const lastCheckInDays = new Set(lastCheckIns.map(c => new Date(c.created_at).toDateString())).size;

      // Activity minutes: breathing + binaural + user_activities
      const breathThisMins = (breathingThis.data ?? []).reduce((s, b) => s + Math.round((b.duration_seconds ?? 0) / 60), 0);
      const breathLastMins = (breathingLast.data ?? []).reduce((s, b) => s + Math.round((b.duration_seconds ?? 0) / 60), 0);
      const binauralThisMins = (binauralThis.data ?? []).reduce((s, b) => s + (b.duration_minutes ?? 0), 0);
      const binauralLastMins = (binauralLast.data ?? []).reduce((s, b) => s + (b.duration_minutes ?? 0), 0);
      const userActThisMins = (activitiesThis.data ?? []).reduce((s, a) => s + (a.duration_minutes ?? 0), 0);
      const userActLastMins = (activitiesLast.data ?? []).reduce((s, a) => s + (a.duration_minutes ?? 0), 0);

      const actMinsThis = breathThisMins + binauralThisMins + userActThisMins;
      const actMinsLast = breathLastMins + binauralLastMins + userActLastMins;

      // Tools used (distinct activity_type values)
      const toolsThis = new Set((activitiesThis.data ?? []).map(a => a.activity_type).filter(Boolean)).size;
      const toolsLast = new Set((activitiesLast.data ?? []).map(a => a.activity_type).filter(Boolean)).size;

      return {
        thisWeek: {
          avgMood: avgMoodThis,
          activityMinutes: actMinsThis,
          checkInDays: thisCheckInDays,
          toolsUsed: toolsThis,
        },
        lastWeek: {
          avgMood: avgMoodLast,
          activityMinutes: actMinsLast,
          checkInDays: lastCheckInDays,
          toolsUsed: toolsLast,
        },
        hasThisWeekData: thisCheckIns.length > 0 || actMinsThis > 0,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 min
  });

  const thisWeek = data?.thisWeek ?? { avgMood: null, activityMinutes: 0, checkInDays: 0, toolsUsed: 0 };
  const lastWeek = data?.lastWeek ?? { avgMood: null, activityMinutes: 0, checkInDays: 0, toolsUsed: 0 };

  return {
    thisWeek,
    lastWeek,
    changes: {
      mood: computeChange(
        thisWeek.avgMood !== null ? thisWeek.avgMood * 10 : null,
        lastWeek.avgMood !== null ? lastWeek.avgMood * 10 : null
      ),
      activityMinutes: computeChange(thisWeek.activityMinutes, lastWeek.activityMinutes),
      checkInDays: computeChange(thisWeek.checkInDays, lastWeek.checkInDays),
      toolsUsed: computeChange(thisWeek.toolsUsed, lastWeek.toolsUsed),
    },
    isLoading,
    hasThisWeekData: data?.hasThisWeekData ?? false,
  };
};
