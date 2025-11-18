import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Sparkles, TrendingUp, Flame, CheckCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';

interface AIMessage {
  id: string;
  type: 'greeting' | 'streak' | 'mood_concern' | 'achievement' | 'suggestion';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon: React.ReactNode;
  color: string;
}

export default function AIContextualHelper() {
  const [currentMessage, setCurrentMessage] = useState<AIMessage | null>(null);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const { user } = useUser();
  const { dashboardData } = useTodayDashboard();

  useEffect(() => {
    // Don't show messages if already dismissed this session
    const sessionDismissed = sessionStorage.getItem('ai_dismissed_messages');
    if (sessionDismissed) {
      setDismissed(JSON.parse(sessionDismissed));
    }
  }, []);

  useEffect(() => {
    if (!dashboardData || !user) return;

    const messages: AIMessage[] = [];
    const now = new Date().getHours();

    // Morning greeting (before noon, only once per day)
    if (now < 12 && !dismissed.includes('morning_greeting')) {
      messages.push({
        id: 'morning_greeting',
        type: 'greeting',
        title: 'Good morning! ☀️',
        message: "Ready to start your day? I've prepared a personalized plan based on your goals.",
        icon: <Sparkles className="w-5 h-5" />,
        color: 'from-amber-500 to-orange-500',
        action: {
          label: "Let's go",
          onClick: () => {
            const element = document.getElementById('todays-focus');
            element?.scrollIntoView({ behavior: 'smooth' });
            handleDismiss('morning_greeting');
          }
        }
      });
    }

    // Streak milestone (every 7 days)
    if (dashboardData.checkInStreak && dashboardData.checkInStreak % 7 === 0 && dashboardData.checkInStreak > 0 && !dismissed.includes(`streak_${dashboardData.checkInStreak}`)) {
      messages.push({
        id: `streak_${dashboardData.checkInStreak}`,
        type: 'streak',
        title: '🔥 Incredible Streak!',
        message: `${dashboardData.checkInStreak} days in a row! You're building real momentum. This kind of consistency creates lasting change.`,
        icon: <Flame className="w-5 h-5" />,
        color: 'from-orange-500 to-red-500',
        action: {
          label: 'Keep it going',
          onClick: () => handleDismiss(`streak_${dashboardData.checkInStreak}`)
        }
      });
    }

    // Achievement unlocked (50 activities completed)
    if (dashboardData.weeklyStats.challengesCompleted >= 50 && !dismissed.includes('achievement_50')) {
      messages.push({
        id: 'achievement_50',
        type: 'achievement',
        title: '🎉 Milestone Unlocked!',
        message: "You've completed 50 activities! That's serious dedication. Your progress is inspiring.",
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'from-green-500 to-emerald-500',
        action: {
          label: 'View progress',
          onClick: () => {
            window.location.href = '/progress-analytics';
            handleDismiss('achievement_50');
          }
        }
      });
    }

    // Tool suggestion based on patterns
    if (dashboardData.latestInsight && !dismissed.includes('tool_suggestion')) {
      const insightText = typeof dashboardData.latestInsight === 'string' 
        ? dashboardData.latestInsight 
        : dashboardData.latestInsight.insight_text;
      
      messages.push({
        id: 'tool_suggestion',
        type: 'suggestion',
        title: 'Personalized Insight',
        message: insightText,
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'from-blue-500 to-purple-500',
        action: {
          label: 'Explore tools',
          onClick: () => {
            const element = document.getElementById('toolkit-section');
            element?.scrollIntoView({ behavior: 'smooth' });
            handleDismiss('tool_suggestion');
          }
        }
      });
    }

    // Show first non-dismissed message
    const nextMessage = messages.find(m => !dismissed.includes(m.id));
    if (nextMessage) {
      setCurrentMessage(nextMessage);
    } else {
      setCurrentMessage(null);
    }
  }, [dashboardData, user, dismissed]);

  const handleDismiss = (messageId: string) => {
    const newDismissed = [...dismissed, messageId];
    setDismissed(newDismissed);
    sessionStorage.setItem('ai_dismissed_messages', JSON.stringify(newDismissed));
    setCurrentMessage(null);
  };

  if (!currentMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed right-6 top-24 z-30 w-80"
      >
        <Card className={`bg-gradient-to-br ${currentMessage.color} p-1`}>
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  {currentMessage.icon}
                </div>
                <h4 className="font-semibold text-white">{currentMessage.title}</h4>
              </div>
              <button
                onClick={() => handleDismiss(currentMessage.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm text-gray-200 mb-4 leading-relaxed">
              {currentMessage.message}
            </p>

            {currentMessage.action && (
              <Button
                onClick={currentMessage.action.onClick}
                variant="secondary"
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {currentMessage.action.label}
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
