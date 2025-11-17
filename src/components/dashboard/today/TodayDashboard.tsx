import React from 'react';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import QuickCheckIn from './QuickCheckIn';
import TodaysFocus from './TodaysFocus';
import WeeklyGlance from './WeeklyGlance';
import RewardsSection from './RewardsSection';
import CareTeamSection from './CareTeamSection';
import SafetyStrip from './SafetyStrip';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, TrendingUp, Heart } from 'lucide-react';

export default function TodayDashboard() {
  const { dashboardData, loading, refetch } = useTodayDashboard();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-4 pb-20">
        <div className="container mx-auto max-w-6xl space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-4 pb-24">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Today</h1>
            <p className="text-gray-300">
              Welcome back, {dashboardData.profile?.display_name || 'there'} 👋
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home')}
              className="text-white hover:bg-white/10"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Tools
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/10"
            >
              <Users className="w-4 h-4 mr-2" />
              Portals
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/progress-analytics')}
              className="text-white hover:bg-white/10"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Progress
            </Button>
          </div>
        </div>

        {/* Quick Check-In */}
        <QuickCheckIn onCheckInComplete={refetch} />

        {/* Today's Focus */}
        <TodaysFocus activities={dashboardData.todaysPlan} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Glance */}
          <WeeklyGlance
            streak={dashboardData.checkInStreak}
            challengesCompleted={dashboardData.weeklyStats.challengesCompleted}
            latestAssessment={dashboardData.weeklyStats.latestAssessment}
            moodTrend={dashboardData.weeklyStats.moodTrend}
            insight={dashboardData.latestInsight}
          />

          {/* Rewards */}
          <RewardsSection
            wallet={dashboardData.rewardsWallet}
            challengesCompleted={dashboardData.weeklyStats.challengesCompleted}
          />
        </div>

        {/* Care Team */}
        <CareTeamSection appointments={dashboardData.upcomingAppointments} />

        {/* Portal Reminder (if user has selected one) */}
        {dashboardData.profile?.primary_portal && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Your Primary Portal</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {dashboardData.profile.primary_portal.replace('_', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Go to Portal
            </Button>
          </div>
        )}
      </div>

      {/* Safety Strip */}
      <SafetyStrip />
    </div>
  );
}
