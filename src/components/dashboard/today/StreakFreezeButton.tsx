import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface StreakFreezeButtonProps {
  streakId: string;
  currentStreak: number;
  freezeCredits: number;
  freezeUsedWeekOf: string | null;
  onFreezeApplied: () => void;
}

/** Returns the ISO date string of the most recent Monday */
function getMondayOfWeek(date: Date): string {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().split('T')[0];
}

export default function StreakFreezeButton({
  streakId,
  currentStreak,
  freezeCredits,
  freezeUsedWeekOf,
  onFreezeApplied,
}: StreakFreezeButtonProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const thisMonday = getMondayOfWeek(new Date());
  const alreadyUsedThisWeek = freezeUsedWeekOf === thisMonday;
  const canFreeze = freezeCredits > 0 && !alreadyUsedThisWeek;

  const handleFreeze = async () => {
    if (!user || !canFreeze) return;
    setLoading(true);

    try {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      const { error } = await supabase
        .from('user_streaks')
        .update({
          // Preserve the streak but move last_activity_date to yesterday
          // so the streak isn't broken when the user checks in today
          last_activity_date: yesterday,
          freeze_credits: Math.max(0, freezeCredits - 1),
          freeze_used_week_of: thisMonday,
          updated_at: new Date().toISOString(),
        })
        .eq('id', streakId);

      if (error) throw error;

      toast({
        title: '❄️ Streak Freeze Applied',
        description: `Your ${currentStreak}-day streak is protected. Check in today to keep it going!`,
      });

      setShowConfirm(false);
      onFreezeApplied();
    } catch (err) {
      console.error('Freeze error:', err);
      toast({
        title: 'Freeze failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!canFreeze && !alreadyUsedThisWeek) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="rounded-xl border border-primary/30 bg-primary/10 p-4 space-y-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Snowflake className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {alreadyUsedThisWeek ? '❄️ Freeze Already Used This Week' : '❄️ Streak at Risk'}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {alreadyUsedThisWeek
                ? 'Your freeze protected your streak earlier this week. Check in today to keep it going!'
                : `You missed yesterday. Use a Streak Freeze to protect your ${currentStreak}-day streak.`}
            </p>
          </div>
        </div>

        {!alreadyUsedThisWeek && (
          <>
            {/* Credits indicator */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>{freezeCredits} freeze credit{freezeCredits !== 1 ? 's' : ''} available this week</span>
            </div>

            <AnimatePresence mode="wait">
              {!showConfirm ? (
                <motion.div key="button" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button
                    size="sm"
                    onClick={() => setShowConfirm(true)}
                    className="w-full bg-primary/80 hover:bg-primary text-primary-foreground border border-primary/40"
                  >
                    <Snowflake className="w-3.5 h-3.5" />
                    Use Streak Freeze
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-xs text-destructive">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>This uses your 1 weekly freeze. Are you sure?</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowConfirm(false)}
                      className="flex-1"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleFreeze}
                      disabled={loading}
                      className="flex-1 bg-primary/80 hover:bg-primary text-primary-foreground"
                    >
                      {loading ? 'Applying…' : '❄️ Confirm Freeze'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
