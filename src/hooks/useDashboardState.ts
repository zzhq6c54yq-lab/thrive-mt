import { useMemo } from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';
import { useUser } from '@/contexts/UserContext';
import { DashboardData } from './useTodayDashboard';

export type DashboardState = 'onboarding' | 'maintenance' | 'flagged_low_mood' | 'post_session';

export function useDashboardState(dashboardData: DashboardData) {
  const { user } = useUser();

  const state = useMemo<DashboardState>(() => {
    if (!user) return 'maintenance';

    // Calculate account age
    const accountAge = differenceInDays(new Date(), new Date(user.created_at || new Date()));

    // Calculate average mood
    const avgMood = dashboardData.weeklyStats.moodTrend.length > 0
      ? dashboardData.weeklyStats.moodTrend.reduce((sum, point) => sum + point.score, 0) / 
        dashboardData.weeklyStats.moodTrend.length
      : 3;

    // Check if has therapist
    const hasTherapist = dashboardData.upcomingAppointments.length > 0;

    // Check last session (would need to query completed sessions)
    // For now, we'll use a simplified check
    const lastSessionDate = null; // TODO: Query from therapy_bookings where status = 'completed'

    // Determine state
    if (accountAge <= 7) {
      return 'onboarding';
    }

    if (lastSessionDate && differenceInHours(new Date(), new Date(lastSessionDate)) < 24) {
      return 'post_session';
    }

    if (avgMood < 2.5 && !hasTherapist) {
      return 'flagged_low_mood';
    }

    return 'maintenance';
  }, [user, dashboardData]);

  return { state };
}
