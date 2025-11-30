import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Target, Sparkles } from 'lucide-react';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';

export const WeeklyProgressSection: React.FC = () => {
  const { dashboardData } = useTodayDashboard();

  const weeklyStats = {
    checkIns: dashboardData.recentCheckIns?.filter(c => {
      const checkInDate = new Date(c.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return checkInDate >= weekAgo;
    }).length || 0,
    activitiesCompleted: dashboardData.weeklyStats?.challengesCompleted || 0,
    avgMood: dashboardData.weeklyStats?.moodTrend?.reduce((acc, m) => acc + m.score, 0) / (dashboardData.weeklyStats?.moodTrend?.length || 1) || 0,
  };

  const moodTrendDirection = () => {
    const trend = dashboardData.weeklyStats?.moodTrend || [];
    if (trend.length < 2) return 'stable';
    const recent = trend.slice(-3).reduce((acc, m) => acc + m.score, 0) / 3;
    const older = trend.slice(0, 3).reduce((acc, m) => acc + m.score, 0) / 3;
    if (recent > older + 0.5) return 'improving';
    if (recent < older - 0.5) return 'declining';
    return 'stable';
  };

  const getTrendMessage = () => {
    const direction = moodTrendDirection();
    if (direction === 'improving') return "Your mood has been trending upward this week. That's real progress.";
    if (direction === 'declining') return "This week has been challenging. We see you showing up anyway.";
    return "You've been holding steady this week. Consistency takes strength.";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#1a2332]/80 via-[#141921]/80 to-[#1a2332]/80 backdrop-blur-sm rounded-2xl border border-[#D4AF37]/20 p-6 md:p-8 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
            Your Progress This Week
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Check-ins */}
          <div className="bg-[#0F1319]/50 rounded-lg p-4 border border-[#D4AF37]/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-sm text-muted-foreground">Check-ins</p>
            </div>
            <p className="text-3xl font-bold text-[#D4AF37]">{weeklyStats.checkIns}</p>
            <p className="text-xs text-muted-foreground mt-1">times you showed up</p>
          </div>

          {/* Activities */}
          <div className="bg-[#0F1319]/50 rounded-lg p-4 border border-[#D4AF37]/10">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-sm text-muted-foreground">Activities</p>
            </div>
            <p className="text-3xl font-bold text-[#D4AF37]">{weeklyStats.activitiesCompleted}</p>
            <p className="text-xs text-muted-foreground mt-1">tools you explored</p>
          </div>

          {/* Average Mood */}
          <div className="bg-[#0F1319]/50 rounded-lg p-4 border border-[#D4AF37]/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-sm text-muted-foreground">Average Mood</p>
            </div>
            <p className="text-3xl font-bold text-[#D4AF37]">{weeklyStats.avgMood.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground mt-1">out of 5.0</p>
          </div>
        </div>

        {/* Insight Message */}
        <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-2 border-[#D4AF37] rounded-lg p-4">
          <p className="text-sm text-[#E5C5A1] leading-relaxed">
            {getTrendMessage()}
          </p>
        </div>

        {/* This Week You Worked On */}
        {dashboardData.latestInsight && (
          <div className="mt-6 pt-6 border-t border-[#D4AF37]/10">
            <p className="text-sm text-muted-foreground mb-3">This week you worked on:</p>
            <div className="flex flex-wrap gap-2">
              {['Stress Management', 'Daily Check-ins', 'Mood Tracking'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#D4AF37]/20 text-[#E5C5A1] text-xs rounded-full border border-[#D4AF37]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};
