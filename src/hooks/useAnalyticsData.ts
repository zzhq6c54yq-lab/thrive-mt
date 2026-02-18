import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAnalyticsData = () => {
  // Fetch mood data from daily_check_ins — real data only
  const { data: moodData = [] } = useQuery({
    queryKey: ["mood-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("daily_check_ins")
        .select("mood_score, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(50);

      if (error) throw error;
      if (!data || data.length === 0) return [];

      // Group by week
      const groupedData: Record<string, { total: number; count: number }> = {};
      data.forEach((entry) => {
        const date = new Date(entry.created_at);
        const weekNumber = Math.ceil(date.getDate() / 7);
        const weekKey = `Week ${weekNumber}`;
        if (!groupedData[weekKey]) groupedData[weekKey] = { total: 0, count: 0 };
        groupedData[weekKey].total += entry.mood_score;
        groupedData[weekKey].count += 1;
      });

      return Object.entries(groupedData).map(([name, { total, count }]) => ({
        name,
        mood: Math.round(total / count)
      }));
    }
  });

  // Fetch activity data — real data only
  const { data: activityData = [] } = useQuery({
    queryKey: ["activity-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", user.id)
        .gte("completed_at", sevenDaysAgo.toISOString())
        .order("completed_at", { ascending: true });

      if (error) {
        console.error('Activity data error:', error);
        return [];
      }
      if (!data || data.length === 0) return [];

      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const groupedData: Record<string, number> = {};
      daysOfWeek.forEach(day => { groupedData[day] = 0; });
      data.forEach((activity) => {
        const day = daysOfWeek[new Date(activity.completed_at).getDay()];
        groupedData[day] += activity.duration_minutes || 0;
      });

      return Object.entries(groupedData).map(([name, minutes]) => ({ name, minutes }));
    }
  });

  // Fetch wellness metrics — real data only
  const { data: wellnessData = [] } = useQuery({
    queryKey: ["wellness-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("wellness_metrics")
        .select("*")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(100);

      if (error) {
        console.error('Wellness data error:', error);
        return [];
      }
      if (!data || data.length === 0) return [];

      const groupedData: Record<string, number> = {};
      data.forEach((metric) => {
        if (!groupedData[metric.metric_type]) groupedData[metric.metric_type] = 0;
        groupedData[metric.metric_type] += Number(metric.metric_value);
      });

      return Object.entries(groupedData).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: Math.round(value)
      }));
    }
  });

  // Real trends data from actual user activity
  const { data: trendsData } = useQuery({
    queryKey: ["trends-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

      // Days active this month (check-ins)
      const { data: checkInsThisMonth } = await supabase
        .from("daily_check_ins")
        .select("created_at")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString());

      // Days active last month
      const { data: checkInsLastMonth } = await supabase
        .from("daily_check_ins")
        .select("created_at")
        .eq("user_id", user.id)
        .gte("created_at", sixtyDaysAgo.toISOString())
        .lt("created_at", thirtyDaysAgo.toISOString());

      // Unique active days this month
      const uniqueDaysThisMonth = new Set(
        (checkInsThisMonth || []).map(c => new Date(c.created_at).toDateString())
      ).size;

      const uniqueDaysLastMonth = new Set(
        (checkInsLastMonth || []).map(c => new Date(c.created_at).toDateString())
      ).size;

      // Total wellness minutes (breathing + binaural + user_activities)
      const { data: breathingSessions } = await supabase
        .from("breathing_sessions")
        .select("duration_seconds")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString());

      const { data: binauralSessions } = await supabase
        .from("binaural_sessions")
        .select("duration_minutes")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString());

      const breathingMins = (breathingSessions || []).reduce((s, b) => s + Math.round((b.duration_seconds || 0) / 60), 0);
      const binauralMins = (binauralSessions || []).reduce((s, b) => s + (b.duration_minutes || 0), 0);

      const totalMinutes = breathingMins + binauralMins;

      // Fetch mood scores separately for trend calc
      const { data: moodThisMonthData } = await supabase
        .from("daily_check_ins")
        .select("mood_score")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString())
        .not("mood_score", "is", null);

      const { data: moodLastMonthData } = await supabase
        .from("daily_check_ins")
        .select("mood_score")
        .eq("user_id", user.id)
        .gte("created_at", sixtyDaysAgo.toISOString())
        .lt("created_at", thirtyDaysAgo.toISOString())
        .not("mood_score", "is", null);

      const avgMoodThis = moodThisMonthData && moodThisMonthData.length > 0
        ? moodThisMonthData.reduce((s, d) => s + d.mood_score, 0) / moodThisMonthData.length
        : null;
      const avgMoodLast = moodLastMonthData && moodLastMonthData.length > 0
        ? moodLastMonthData.reduce((s, d) => s + d.mood_score, 0) / moodLastMonthData.length
        : null;

      const moodChangePercent = avgMoodThis && avgMoodLast && avgMoodLast > 0
        ? Math.round(((avgMoodThis - avgMoodLast) / avgMoodLast) * 100)
        : null;

      const daysActiveDelta = uniqueDaysThisMonth - uniqueDaysLastMonth;

      return {
        daysActive: uniqueDaysThisMonth,
        daysActiveDelta,
        totalMinutes,
        avgMoodThis: avgMoodThis ? Math.round(avgMoodThis * 10) / 10 : null,
        moodChangePercent,
        hasData: uniqueDaysThisMonth > 0,
      };
    }
  });

  return {
    moodData,
    activityData,
    wellnessData,
    trendsData,
  };
};
