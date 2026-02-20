import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Calendar, Flame, Star, TrendingUp, Clock, MessageCircle, Heart, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface EngagementStats {
  checkInsThisWeek: number;
  activitiesCompleted: number;
  currentStreak: number;
  totalMinutesEngaged: number;
  badgesEarned: number;
  messagesSent: number;
  lastActiveAt: string | null;
}

const EngagementMetricsWidget: React.FC = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [stats, setStats] = useState<EngagementStats>({
    checkInsThisWeek: 0,
    activitiesCompleted: 0,
    currentStreak: 0,
    totalMinutesEngaged: 0,
    badgesEarned: 0,
    messagesSent: 0,
    lastActiveAt: null
  });
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);

  const fetchEngagementStats = useCallback(async () => {
    if (!user?.id) return;

    try {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Fetch all data in parallel
      const [checkInResult, planResult, breathingResult, binauralResult, journalResult, badgeResult, messageResult, streakResult, meditationResult] = await Promise.allSettled([
        supabase.from('daily_check_ins').select('*', { count: 'exact', head: true }).eq('user_id', user.id).gte('created_at', weekAgo.toISOString()),
        supabase.from('daily_plans').select('activities').eq('user_id', user.id).order('plan_date', { ascending: false }).limit(7),
        supabase.from('breathing_sessions').select('duration_seconds').eq('user_id', user.id).gte('created_at', weekAgo.toISOString()),
        supabase.from('binaural_sessions').select('duration_minutes').eq('user_id', user.id).gte('created_at', weekAgo.toISOString()),
        supabase.from('journal_entries').select('id', { count: 'exact', head: true }).eq('user_id', user.id).gte('created_at', weekAgo.toISOString()),
        supabase.from('user_earned_badges').select('id').eq('user_id', user.id),
        supabase.from('henry_messages').select('id').eq('role', 'user').limit(200),
        supabase.from('user_streaks').select('current_streak').eq('user_id', user.id).eq('streak_type', 'check_in').maybeSingle(),
        supabase.from('meditation_sessions').select('duration_seconds').eq('user_id', user.id).gte('created_at', weekAgo.toISOString()),
      ]);

      const checkInCount = checkInResult.status === 'fulfilled' ? (checkInResult.value.count || 0) : 0;

      let activitiesCompleted = 0;
      let totalMinutes = 0;
      if (planResult.status === 'fulfilled' && planResult.value.data) {
        planResult.value.data.forEach((plan: any) => {
          const activities = Array.isArray(plan.activities) ? plan.activities : [];
          activities.forEach((a: any) => {
            if (a.completed) {
              activitiesCompleted++;
              totalMinutes += a.estimated_minutes || 5;
            }
          });
        });
      }

      // Add breathing minutes
      if (breathingResult.status === 'fulfilled' && breathingResult.value.data) {
        breathingResult.value.data.forEach((s: any) => {
          totalMinutes += Math.round((s.duration_seconds || 0) / 60);
          activitiesCompleted++;
        });
      }

      // Add binaural minutes
      if (binauralResult.status === 'fulfilled' && binauralResult.value.data) {
        binauralResult.value.data.forEach((s: any) => {
          totalMinutes += s.duration_minutes || 0;
          activitiesCompleted++;
        });
      }

      // Add meditation minutes
      if (meditationResult.status === 'fulfilled' && meditationResult.value.data) {
        meditationResult.value.data.forEach((s: any) => {
          totalMinutes += Math.round((s.duration_seconds || 0) / 60);
          activitiesCompleted++;
        });
      }

      // Add journal entries as activities
      if (journalResult.status === 'fulfilled') {
        const journalCount = journalResult.value.count || 0;
        activitiesCompleted += journalCount;
        totalMinutes += journalCount * 10;
      }

      const badgeCount = badgeResult.status === 'fulfilled' ? (badgeResult.value.data?.length || 0) : 0;
      const messageCount = messageResult.status === 'fulfilled' ? (messageResult.value.data?.length || 0) : 0;
      const streak = streakResult.status === 'fulfilled' ? (streakResult.value.data?.current_streak || 0) : 0;

      setStats({
        checkInsThisWeek: checkInCount,
        activitiesCompleted,
        currentStreak: streak,
        totalMinutesEngaged: totalMinutes,
        badgesEarned: badgeCount,
        messagesSent: messageCount,
        lastActiveAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching engagement stats:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchEngagementStats();
  }, [fetchEngagementStats]);

  const handleQuickCheckIn = async () => {
    if (!user?.id || checkingIn) return;
    setCheckingIn(true);

    try {
      // Insert a daily check-in
      const { error: checkInError } = await supabase
        .from('daily_check_ins')
        .insert({ user_id: user.id, mood_score: 5 });

      if (checkInError) throw checkInError;

      // Update or create streak
      const today = new Date().toISOString().split('T')[0];
      const { data: existingStreak } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .eq('streak_type', 'check_in')
        .maybeSingle();

      if (existingStreak) {
        const lastDate = existingStreak.last_activity_date;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = lastDate === yesterday ? (existingStreak.current_streak || 0) + 1 
                        : lastDate === today ? existingStreak.current_streak 
                        : 1;
        const longestStreak = Math.max(newStreak, existingStreak.longest_streak || 0);

        await supabase
          .from('user_streaks')
          .update({ 
            current_streak: newStreak, 
            longest_streak: longestStreak, 
            last_activity_date: today 
          })
          .eq('id', existingStreak.id);
      } else {
        await supabase
          .from('user_streaks')
          .insert({ 
            user_id: user.id, 
            streak_type: 'check_in', 
            current_streak: 1, 
            longest_streak: 1, 
            last_activity_date: today 
          });
      }

      toast({
        title: "Check-in recorded",
        description: "Great job showing up for yourself today!",
      });

      // Refresh stats
      await fetchEngagementStats();
    } catch (error) {
      console.error('Error during check-in:', error);
      toast({
        title: "Check-in failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckingIn(false);
    }
  };

  const metrics = [
    { icon: Flame, label: 'Current Streak', value: stats.currentStreak, suffix: 'days', color: 'text-orange-400', bgColor: 'from-orange-500/20 to-red-500/20' },
    { icon: Calendar, label: 'Check-ins This Week', value: stats.checkInsThisWeek, suffix: '', color: 'text-blue-400', bgColor: 'from-blue-500/20 to-indigo-500/20' },
    { icon: Activity, label: 'Activities Done', value: stats.activitiesCompleted, suffix: '', color: 'text-emerald-400', bgColor: 'from-emerald-500/20 to-teal-500/20' },
    { icon: Clock, label: 'Minutes Engaged', value: stats.totalMinutesEngaged, suffix: 'min', color: 'text-purple-400', bgColor: 'from-purple-500/20 to-violet-500/20' },
    { icon: Star, label: 'Badges Earned', value: stats.badgesEarned, suffix: '', color: 'text-amber-400', bgColor: 'from-amber-500/20 to-yellow-500/20' },
    { icon: MessageCircle, label: 'Messages with Henry', value: stats.messagesSent, suffix: '', color: 'text-[#D4AF37]', bgColor: 'from-[#D4AF37]/20 to-[#B87333]/20' },
  ];

  if (loading) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            Your Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-muted/30 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          <span className="bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
            Your Engagement
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-4 rounded-xl bg-gradient-to-br ${metric.bgColor} border border-white/5 hover:border-white/10 transition-all group cursor-default`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg bg-background/50 ${metric.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </span>
                  {metric.suffix && (
                    <span className="text-xs text-muted-foreground">{metric.suffix}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {metric.label}
                </p>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-700" />
              </motion.div>
            );
          })}
        </div>

        {/* Check-in button + encouragement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex items-center gap-3"
        >
          <Button
            onClick={handleQuickCheckIn}
            disabled={checkingIn}
            variant="outline"
            size="sm"
            className="border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] text-[#D4AF37] shrink-0"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {checkingIn ? 'Checking in...' : 'Quick Check-in'}
          </Button>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex-1">
            <Heart className="w-4 h-4 text-[#D4AF37] shrink-0" fill="currentColor" />
            <p className="text-sm text-muted-foreground">
              {stats.currentStreak >= 7 
                ? "You're on fire! A whole week of showing up for yourself."
                : stats.currentStreak >= 3
                  ? "You're building momentum. Keep going!"
                  : stats.checkInsThisWeek > 0
                    ? "Every check-in matters. You're doing great."
                    : "Start your wellness journey today with a quick check-in."}
            </p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetricsWidget;
