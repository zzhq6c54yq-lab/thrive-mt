import React from 'react';
import { Card } from '@/components/ui/card';
import WeeklyGlance from '../../today/WeeklyGlance';
import RewardsSection from '../../today/RewardsSection';
import CareTeamSection from '../../today/CareTeamSection';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Award } from 'lucide-react';

interface ProgressSectionProps {
  dashboardData: DashboardData;
}

export default function ProgressSection({ dashboardData }: ProgressSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Your Progress</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/progress-analytics')}
            className="text-blue-400 hover:text-blue-300"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View Full Analytics
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
            <span className="text-sm text-gray-400">This Week</span>
            <span className="text-lg font-bold text-white">
              {dashboardData.weeklyStats.challengesCompleted} activities
            </span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
            <span className="text-sm text-gray-400">Current Streak</span>
            <span className="text-lg font-bold text-orange-400">
              {dashboardData.checkInStreak} days 🔥
            </span>
          </div>

          {dashboardData.weeklyStats.latestAssessment && (
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-400">Latest Assessment</span>
              <span className="text-lg font-bold text-blue-400">
                {dashboardData.weeklyStats.latestAssessment.score}
              </span>
            </div>
          )}
        </div>
      </Card>

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

      {/* Care Team */}
      <CareTeamSection appointments={dashboardData.upcomingAppointments} />
    </div>
  );
}
