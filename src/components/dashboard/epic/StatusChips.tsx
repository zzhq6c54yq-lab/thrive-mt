import React from 'react';
import { format } from 'date-fns';
import { DashboardData } from '@/hooks/useTodayDashboard';

interface StatusChipsProps {
  dashboardData: DashboardData;
}

export const StatusChips: React.FC<StatusChipsProps> = ({ dashboardData }) => {
  // Calculate mood average from recent check-ins
  const recentMood = dashboardData.recentCheckIns[0]?.mood_score || 0;
  const moodLabel = recentMood >= 4 ? '😊' : recentMood >= 3 ? '😐' : '😔';
  const moodTrend = dashboardData.weeklyStats.moodTrend.length >= 2 
    ? dashboardData.weeklyStats.moodTrend[dashboardData.weeklyStats.moodTrend.length - 1].score > 
      dashboardData.weeklyStats.moodTrend[dashboardData.weeklyStats.moodTrend.length - 2].score
      ? 'rising' : 'steady'
    : 'steady';

  const nextSession = dashboardData.upcomingAppointments[0];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {/* Mood Chip */}
      {recentMood > 0 && (
        <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs text-foreground flex items-center gap-1">
          <span>{moodLabel}</span>
          <span>{recentMood.toFixed(1)}/5</span>
          <span className="text-muted-foreground">({moodTrend})</span>
        </div>
      )}
      
      {/* Streak Chip */}
      {dashboardData.checkInStreak > 0 && (
        <div className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs text-foreground flex items-center gap-1">
          <span>🔥</span>
          <span>{dashboardData.checkInStreak} days</span>
        </div>
      )}
      
      {/* Credits Chip */}
      {dashboardData.rewardsWallet && dashboardData.rewardsWallet.copay_credits_usd > 0 && (
        <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-xs text-foreground flex items-center gap-1">
          <span>${dashboardData.rewardsWallet.copay_credits_usd.toFixed(2)}</span>
          <span className="text-muted-foreground">co-pay credit</span>
        </div>
      )}
      
      {/* Next Session Chip */}
      {nextSession && (
        <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs text-foreground flex items-center gap-1">
          <span>Next:</span>
          <span>{format(new Date(nextSession.appointment_date), 'EEE h:mm a')}</span>
        </div>
      )}
    </div>
  );
};
