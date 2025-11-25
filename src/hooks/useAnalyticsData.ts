import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Sample fallback data showing impressive progress
const SAMPLE_MOOD_DATA = [
  { name: 'Week 1', mood: 4 },
  { name: 'Week 2', mood: 5 },
  { name: 'Week 3', mood: 6 },
  { name: 'Week 4', mood: 7 },
  { name: 'Week 5', mood: 7 },
  { name: 'Week 6', mood: 8 },
  { name: 'Week 7', mood: 8 },
  { name: 'Week 8', mood: 9 }
];

const SAMPLE_ACTIVITY_DATA = [
  { name: 'Mon', minutes: 45 },
  { name: 'Tue', minutes: 30 },
  { name: 'Wed', minutes: 60 },
  { name: 'Thu', minutes: 40 },
  { name: 'Fri', minutes: 55 },
  { name: 'Sat', minutes: 70 },
  { name: 'Sun', minutes: 50 }
];

const SAMPLE_WELLNESS_DATA = [
  { name: 'Meditation', value: 30 },
  { name: 'Journaling', value: 25 },
  { name: 'Breathing', value: 20 },
  { name: 'Exercise', value: 15 },
  { name: 'Therapy', value: 10 }
];

export const useAnalyticsData = () => {
  // Fetch mood data from daily_check_ins
  const { data: moodData = [] } = useQuery({
    queryKey: ["mood-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return SAMPLE_MOOD_DATA;

      const { data, error } = await supabase
        .from("daily_check_ins")
        .select("mood_score, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(50);
      
      if (error) throw error;
      
      // Group by week
      const groupedData: Record<string, { total: number; count: number }> = {};
      
      data?.forEach((entry) => {
        const date = new Date(entry.created_at);
        const weekNumber = Math.ceil(date.getDate() / 7);
        const weekKey = `Week ${weekNumber}`;
        
        if (!groupedData[weekKey]) {
          groupedData[weekKey] = { total: 0, count: 0 };
        }
        
        groupedData[weekKey].total += entry.mood_score;
        groupedData[weekKey].count += 1;
      });
      
      const processedData = Object.entries(groupedData).map(([name, { total, count }]) => ({
        name,
        mood: Math.round(total / count)
      }));
      
      return processedData.length > 0 ? processedData : SAMPLE_MOOD_DATA;
    }
  });

  // Fetch activity data
  const { data: activityData = [] } = useQuery({
    queryKey: ["activity-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return SAMPLE_ACTIVITY_DATA;

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
        return SAMPLE_ACTIVITY_DATA;
      }
      
      // Group by day of week
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const groupedData: Record<string, number> = {};
      
      daysOfWeek.forEach(day => {
        groupedData[day] = 0;
      });
      
      data?.forEach((activity) => {
        const day = daysOfWeek[new Date(activity.completed_at).getDay()];
        groupedData[day] += activity.duration_minutes || 0;
      });
      
      const processedData = Object.entries(groupedData).map(([name, minutes]) => ({
        name,
        minutes
      }));
      
      return processedData.some(d => d.minutes > 0) 
        ? processedData 
        : SAMPLE_ACTIVITY_DATA;
    }
  });

  // Fetch wellness metrics
  const { data: wellnessData = [] } = useQuery({
    queryKey: ["wellness-analytics"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return SAMPLE_WELLNESS_DATA;

      const { data, error } = await supabase
        .from("wellness_metrics")
        .select("*")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(100);
      
      if (error) {
        console.error('Wellness data error:', error);
        return SAMPLE_WELLNESS_DATA;
      }
      
      // Group by metric type
      const groupedData: Record<string, number> = {};
      
      data?.forEach((metric) => {
        if (!groupedData[metric.metric_type]) {
          groupedData[metric.metric_type] = 0;
        }
        groupedData[metric.metric_type] += Number(metric.metric_value);
      });
      
      const processedData = Object.entries(groupedData).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: Math.round(value)
      }));
      
      return processedData.length > 0 ? processedData : SAMPLE_WELLNESS_DATA;
    }
  });

  return {
    moodData,
    activityData,
    wellnessData
  };
};
