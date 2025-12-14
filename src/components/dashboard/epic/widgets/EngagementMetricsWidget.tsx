import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, Flame, Star, TrendingUp, Clock, MessageCircle, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

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

  useEffect(() => {
    const fetchEngagementStats = async () => {
      if (!user?.id) return;

      try {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Fetch check-ins this week
        const { count: checkInCount } = await supabase
          .from('daily_check_ins')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', weekAgo.toISOString());

        // Fetch completed activities
        const { data: planData } = await supabase
          .from('daily_plans')
          .select('activities')
          .eq('user_id', user.id)
          .order('plan_date', { ascending: false })
          .limit(7);

        let activitiesCompleted = 0;
        let totalMinutes = 0;
        if (planData) {
          planData.forEach((plan: any) => {
            const activities = Array.isArray(plan.activities) ? plan.activities : [];
            activities.forEach((a: any) => {
              if (a.completed) {
                activitiesCompleted++;
                totalMinutes += a.estimated_minutes || 5;
              }
            });
          });
        }

        // Fetch badges earned - use RPC or direct count
        let badgeCount = 0;
        try {
          const { data: achievements } = await supabase
            .from('user_achievements' as any)
            .select('id')
            .eq('user_id', user.id);
          badgeCount = achievements?.length || 0;
        } catch {
          // Table might not exist, fallback to 0
          badgeCount = 0;
        }

        // Fetch messages sent
        let messageCount = 0;
        try {
          const { data: messages } = await supabase
            .from('henry_messages')
            .select('id')
            .eq('role', 'user')
            .limit(100);
          messageCount = messages?.length || 0;
        } catch {
          messageCount = 0;
        }

        // Calculate streak from check-ins
        const { data: streakData } = await supabase
          .from('daily_check_ins')
          .select('created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(30);

        let streak = 0;
        if (streakData && streakData.length > 0) {
          const dates = streakData.map(d => new Date(d.created_at).toDateString());
          const uniqueDates = [...new Set(dates)];
          const today = new Date().toDateString();
          
          if (uniqueDates[0] === today) {
            streak = 1;
            for (let i = 1; i < uniqueDates.length; i++) {
              const expectedDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toDateString();
              if (uniqueDates[i] === expectedDate) {
                streak++;
              } else {
                break;
              }
            }
          }
        }

        setStats({
          checkInsThisWeek: checkInCount || 0,
          activitiesCompleted,
          currentStreak: streak,
          totalMinutesEngaged: totalMinutes,
          badgesEarned: badgeCount || 0,
          messagesSent: messageCount || 0,
          lastActiveAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error fetching engagement stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagementStats();
  }, [user?.id]);

  const metrics = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: stats.currentStreak,
      suffix: 'days',
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: Calendar,
      label: 'Check-ins This Week',
      value: stats.checkInsThisWeek,
      suffix: '',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-indigo-500/20'
    },
    {
      icon: Activity,
      label: 'Activities Done',
      value: stats.activitiesCompleted,
      suffix: '',
      color: 'text-emerald-400',
      bgColor: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      icon: Clock,
      label: 'Minutes Engaged',
      value: stats.totalMinutesEngaged,
      suffix: 'min',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-violet-500/20'
    },
    {
      icon: Star,
      label: 'Badges Earned',
      value: stats.badgesEarned,
      suffix: '',
      color: 'text-amber-400',
      bgColor: 'from-amber-500/20 to-yellow-500/20'
    },
    {
      icon: MessageCircle,
      label: 'Messages with Henry',
      value: stats.messagesSent,
      suffix: '',
      color: 'text-[#D4AF37]',
      bgColor: 'from-[#D4AF37]/20 to-[#B87333]/20'
    }
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
                
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-700" />
              </motion.div>
            );
          })}
        </div>

        {/* Encouragement message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20"
        >
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#D4AF37]" fill="currentColor" />
            <p className="text-sm text-muted-foreground">
              {stats.currentStreak >= 7 
                ? "You're on fire! A whole week of showing up for yourself. 🎉"
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
