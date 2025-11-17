import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, startOfDay } from 'date-fns';

export interface DailyActivity {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  estimated_minutes: number;
  icon_name: string | null;
  route_path: string | null;
  points_reward: number;
  order: number;
  time_of_day?: string;
}

export interface DashboardData {
  profile: any;
  todaysPlan: DailyActivity[];
  checkInStreak: number;
  recentCheckIns: any[];
  upcomingAppointments: any[];
  rewardsWallet: {
    current_points: number;
    copay_credits_usd: number;
    lifetime_earned: number;
  } | null;
  latestInsight: {
    insight_text: string;
    insight_type: string;
  } | null;
  weeklyStats: {
    challengesCompleted: number;
    latestAssessment: { score: number; label: string } | null;
    moodTrend: { date: string; score: number }[];
  };
}

export function useTodayDashboard() {
  const { user, profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    profile: null,
    todaysPlan: [],
    checkInStreak: 0,
    recentCheckIns: [],
    upcomingAppointments: [],
    rewardsWallet: null,
    latestInsight: null,
    weeklyStats: {
      challengesCompleted: 0,
      latestAssessment: null,
      moodTrend: []
    }
  });

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch all data in parallel
      const [
        todaysPlanData,
        streakData,
        checkInsData,
        appointmentsData,
        walletData,
        insightData,
        activitiesData,
        assessmentsData
      ] = await Promise.all([
        // Today's plan
        supabase
          .from('daily_plans')
          .select('*')
          .eq('user_id', user.id)
          .eq('plan_date', format(new Date(), 'yyyy-MM-dd'))
          .maybeSingle(),
        
        // Check-in streak
        supabase
          .from('user_streaks')
          .select('*')
          .eq('user_id', user.id)
          .eq('streak_type', 'check_in')
          .maybeSingle(),
        
        // Recent check-ins (last 7 days for mood trend)
        supabase
          .from('daily_check_ins')
          .select('*')
          .eq('user_id', user.id)
          .gte('created_at', subDays(new Date(), 7).toISOString())
          .order('created_at', { ascending: false }),
        
        // Upcoming appointments (next 2)
        supabase
          .from('therapy_bookings')
          .select('*, therapist:therapists(name, title, image_url)')
          .eq('user_id', user.id)
          .gte('appointment_date', new Date().toISOString())
          .order('appointment_date', { ascending: true })
          .limit(2),
        
        // Rewards wallet
        supabase
          .from('rewards_wallet')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle(),
        
        // Latest insight
        supabase
          .from('insights_cache')
          .select('*')
          .eq('user_id', user.id)
          .gte('valid_until', new Date().toISOString())
          .order('generated_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        
        // User activities (for challenges completed count)
        supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', user.id)
          .gte('completed_at', subDays(new Date(), 7).toISOString()),
        
        // Latest assessment scores
        supabase
          .from('wellness_metrics')
          .select('*')
          .eq('user_id', user.id)
          .eq('metric_type', 'phq9_score')
          .order('recorded_at', { ascending: false })
          .limit(1)
          .maybeSingle()
      ]);

      // Process today's plan
      let todaysPlan: DailyActivity[] = [];
      if (todaysPlanData.data?.activities) {
        const activities = Array.isArray(todaysPlanData.data.activities) 
          ? todaysPlanData.data.activities 
          : [];
        
        if (activities.length > 0) {
          const activityIds = activities.map((a: any) => a.activity_id);
          const { data: activitiesCatalog } = await supabase
            .from('activities_catalog')
            .select('*')
            .in('id', activityIds);

          if (activitiesCatalog) {
            todaysPlan = activities
              .map((planActivity: any) => {
                const catalogActivity = activitiesCatalog.find(a => a.id === planActivity.activity_id);
                if (!catalogActivity) return null;
                return {
                  ...catalogActivity,
                  order: planActivity.order,
                  time_of_day: planActivity.time_of_day
                };
              })
              .filter(Boolean) as DailyActivity[];
            
            todaysPlan.sort((a, b) => a.order - b.order);
          }
        }
      } else if (profile) {
        // Generate a simple plan if none exists
        todaysPlan = await generateSimplePlan(user.id, profile);
      }

      // Process mood trend for chart
      const moodTrend = (checkInsData.data || []).map(check => ({
        date: format(new Date(check.created_at), 'MMM dd'),
        score: check.mood_score
      })).reverse();

      // Get latest assessment label
      let latestAssessment = null;
      if (assessmentsData.data) {
        const score = assessmentsData.data.metric_value;
        latestAssessment = {
          score,
          label: score < 5 ? 'Minimal' : score < 10 ? 'Mild' : score < 15 ? 'Moderate' : score < 20 ? 'Moderately Severe' : 'Severe'
        };
      }

      setDashboardData({
        profile: profile,
        todaysPlan,
        checkInStreak: streakData.data?.current_streak || 0,
        recentCheckIns: checkInsData.data || [],
        upcomingAppointments: appointmentsData.data || [],
        rewardsWallet: walletData.data || { current_points: 0, copay_credits_usd: 0, lifetime_earned: 0 },
        latestInsight: insightData.data,
        weeklyStats: {
          challengesCompleted: activitiesData.data?.length || 0,
          latestAssessment,
          moodTrend
        }
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  return { dashboardData, loading, refetch: loadDashboardData };
}

// Simple plan generator (fallback when no plan exists)
async function generateSimplePlan(userId: string, profile: any): Promise<DailyActivity[]> {
  const goals = profile?.goals || [];
  const timePreference = profile?.time_preference_minutes || 10;

  // Get featured activities matching user's goals
  const { data: activities } = await supabase
    .from('activities_catalog')
    .select('*')
    .eq('is_featured', true)
    .lte('estimated_minutes', timePreference);

  if (!activities || activities.length === 0) return [];

  // Filter by goals if available
  let filteredActivities = activities;
  if (goals.length > 0) {
    filteredActivities = activities.filter(activity => 
      activity.goal_tags?.some((tag: string) => goals.includes(tag))
    );
  }

  // If no matches, use all featured activities
  if (filteredActivities.length === 0) {
    filteredActivities = activities;
  }

  // Pick top 3 activities
  const selectedActivities = filteredActivities.slice(0, 3).map((activity, index) => ({
    ...activity,
    order: index + 1,
    time_of_day: index === 0 ? 'morning' : index === 1 ? 'afternoon' : 'evening'
  }));

  // Save the generated plan
  await supabase.from('daily_plans').upsert({
    user_id: userId,
    plan_date: format(new Date(), 'yyyy-MM-dd'),
    activities: selectedActivities.map((a, i) => ({
      activity_id: a.id,
      order: i + 1,
      time_of_day: a.time_of_day
    }))
  });

  return selectedActivities;
}
