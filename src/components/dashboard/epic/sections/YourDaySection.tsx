import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Award } from 'lucide-react';
import QuickCheckIn from '../../today/QuickCheckIn';
import TodaysFocus from '../../today/TodaysFocus';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { MoodPulseWidget, StreakProtectorWidget, ProgressRingWidget, QuickNotesWidget } from '../widgets/SmartWidgets';

interface YourDaySectionProps {
  dashboardData: DashboardData;
  onCheckInComplete: () => void;
}

export default function YourDaySection({ dashboardData, onCheckInComplete }: YourDaySectionProps) {
  return (
    <div className="space-y-6">
      {/* Quick Check-In */}
      <div id="quick-check-in">
        <QuickCheckIn onCheckInComplete={onCheckInComplete} />
      </div>

      {/* AI Insight Card */}
      {dashboardData.planMetadata?.adaptive_note && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-100 mb-1">
                AI Insight for Today
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {dashboardData.planMetadata.adaptive_note}
              </p>
              {dashboardData.planMetadata?.plan_summary && (
                <p className="text-xs text-gray-400 mt-2 italic">
                  {dashboardData.planMetadata.plan_summary}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Today's Focus */}
      <div id="todays-focus">
        <TodaysFocus activities={dashboardData.todaysPlan} />
      </div>

      {/* Smart Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MoodPulseWidget />
        <StreakProtectorWidget streak={dashboardData.checkInStreak} />
        <ProgressRingWidget 
          completed={dashboardData.weeklyStats.challengesCompleted} 
          total={dashboardData.todaysPlan.length || 7}
        />
        <QuickNotesWidget />
      </div>

      {/* Streaks & Wins Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardData.checkInStreak}</p>
              <p className="text-xs text-gray-300">Day Streak</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardData.weeklyStats.challengesCompleted}</p>
              <p className="text-xs text-gray-300">Challenges Done</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardData.rewardsWallet?.current_points || 0}</p>
              <p className="text-xs text-gray-300">Wellness Points</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
