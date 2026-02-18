import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Smile, Meh, Frown, Annoyed, Laugh } from 'lucide-react';
import { motion } from 'framer-motion';
import StreakFreezeButton from './StreakFreezeButton';

const moodOptions = [
  { score: 1, icon: Annoyed, label: 'Stressed', color: 'text-red-500' },
  { score: 2, icon: Frown, label: 'Low', color: 'text-orange-500' },
  { score: 3, icon: Meh, label: 'Okay', color: 'text-yellow-500' },
  { score: 4, icon: Smile, label: 'Good', color: 'text-green-500' },
  { score: 5, icon: Laugh, label: 'Great', color: 'text-blue-500' }
];

const tagOptions = ['Stressed', 'Tired', 'Anxious', 'Hopeful', 'Grateful', 'Energized', 'Calm', 'Focused'];

interface StreakRow {
  id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  freeze_credits: number;
  freeze_used_week_of: string | null;
}

export default function QuickCheckIn({ onCheckInComplete }: { onCheckInComplete?: () => void }) {
  const { user } = useUser();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [streak, setStreak] = useState<StreakRow | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const fetchStreak = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_streaks')
      .select('id, current_streak, longest_streak, last_activity_date, freeze_credits, freeze_used_week_of')
      .eq('user_id', user.id)
      .eq('streak_type', 'check_in')
      .maybeSingle();
    setStreak(data as StreakRow | null);
  }, [user]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  // Determine if the user missed yesterday (and hasn't checked in today)
  const missedYesterday =
    streak !== null &&
    streak.last_activity_date !== today &&
    streak.last_activity_date !== yesterday &&
    (streak.current_streak ?? 0) > 1;

  // Also show freeze banner if last activity was two+ days ago (streak broken scenario)
  const streakAtRisk =
    streak !== null &&
    streak.last_activity_date !== today &&
    streak.last_activity_date === yesterday;
  // Actually: show freeze when last_activity_date is NOT today and NOT yesterday (i.e. they missed)
  const showFreezeBanner =
    streak !== null &&
    streak.last_activity_date !== today &&
    streak.last_activity_date !== yesterday &&
    (streak.current_streak ?? 0) > 0;

  // Additionally show if already used this week (informational)
  const getMondayOfWeek = (date: Date): string => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d.toISOString().split('T')[0];
  };
  const thisMonday = getMondayOfWeek(new Date());
  const alreadyUsedThisWeek = streak?.freeze_used_week_of === thisMonday;
  const showFreezeSection = showFreezeBanner || alreadyUsedThisWeek;

  const handleSaveCheckIn = async () => {
    if (!user) return;

    try {
      setSaving(true);

      const moodLabel = moodOptions.find(m => m.score === selectedMood)?.label || '';

      const { error } = await supabase.from('daily_check_ins').insert({
        user_id: user.id,
        mood_score: selectedMood,
        mood_label: moodLabel,
        tags: selectedTags,
        note: note.trim() || null
      });

      if (error) throw error;

      // Update check-in streak
      const { data: existingStreak } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .eq('streak_type', 'check_in')
        .maybeSingle();

      if (existingStreak) {
        // Only update if this is a NEW day — never reset on same-day re-check-in
        if (existingStreak.last_activity_date !== today) {
          const newStreak = existingStreak.last_activity_date === yesterday
            ? existingStreak.current_streak + 1
            : 1;

          await supabase.from('user_streaks').update({
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, existingStreak.longest_streak),
            last_activity_date: today,
            updated_at: new Date().toISOString()
          }).eq('id', existingStreak.id);
        }
      } else {
        await supabase.from('user_streaks').insert({
          user_id: user.id,
          streak_type: 'check_in',
          current_streak: 1,
          longest_streak: 1,
          last_activity_date: today
        });
      }

      toast({
        title: "We see you",
        description: "Thank you for showing up today. That takes strength.",
      });

      // Reset form
      setSelectedMood(null);
      setSelectedTags([]);
      setNote('');
      await fetchStreak();

      if (onCheckInComplete) {
        onCheckInComplete();
      }
    } catch (error) {
      console.error('Error saving check-in:', error);
      toast({
        title: "Let's try that again",
        description: "Something didn't work. We're here when you're ready.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Get time-aware greeting
  const getTimeAwareGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return { text: "How are you holding up?", emoji: "🌙" };
    if (hour < 12) return { text: "Good morning! How are you feeling today?", emoji: "🌅" };
    if (hour < 17) return { text: "How's your day going?", emoji: "☀️" };
    if (hour < 21) return { text: "How has your evening been?", emoji: "🌆" };
    return { text: "Checking in before rest?", emoji: "✨" };
  };

  const greeting = getTimeAwareGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden relative">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <CardHeader className="relative z-10">
          <CardTitle className="text-xl">{greeting.emoji} {greeting.text}</CardTitle>
          <p className="text-sm text-muted-foreground">Share what's on your mind (completely optional)</p>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {/* Streak Freeze Banner */}
          {showFreezeSection && streak && (
            <StreakFreezeButton
              streakId={streak.id}
              currentStreak={streak.current_streak}
              freezeCredits={streak.freeze_credits}
              freezeUsedWeekOf={streak.freeze_used_week_of}
              onFreezeApplied={fetchStreak}
            />
          )}

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-2 block">What describes today?</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-sm font-medium mb-2 block">What's on your mind? (optional)</label>
            <Textarea
              placeholder="Sometimes it helps just to write it down..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="resize-none bg-background/50 backdrop-blur-sm"
            />
          </div>

          {/* Save Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              onClick={handleSaveCheckIn}
              disabled={saving}
              className="w-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333] transition-all duration-300"
            >
              {saving ? 'Saving your check-in...' : 'Check In'}
            </Button>
          </motion.div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Showing up counts. Even the smallest check-in matters.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
