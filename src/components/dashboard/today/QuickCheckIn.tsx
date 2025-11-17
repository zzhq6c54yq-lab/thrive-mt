import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Smile, Meh, Frown, Annoyed, Laugh } from 'lucide-react';
import { motion } from 'framer-motion';

const moodOptions = [
  { score: 1, icon: Annoyed, label: 'Stressed', color: 'text-red-500' },
  { score: 2, icon: Frown, label: 'Low', color: 'text-orange-500' },
  { score: 3, icon: Meh, label: 'Okay', color: 'text-yellow-500' },
  { score: 4, icon: Smile, label: 'Good', color: 'text-green-500' },
  { score: 5, icon: Laugh, label: 'Great', color: 'text-blue-500' }
];

const tagOptions = ['Stressed', 'Tired', 'Anxious', 'Hopeful', 'Grateful', 'Energized', 'Calm', 'Focused'];

export default function QuickCheckIn({ onCheckInComplete }: { onCheckInComplete?: () => void }) {
  const { user } = useUser();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveCheckIn = async () => {
    if (!user || !selectedMood) return;

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
      const today = new Date().toISOString().split('T')[0];
      const { data: existingStreak } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .eq('streak_type', 'check_in')
        .maybeSingle();

      if (existingStreak) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = existingStreak.last_activity_date === yesterday 
          ? existingStreak.current_streak + 1 
          : 1;

        await supabase.from('user_streaks').update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, existingStreak.longest_streak),
          last_activity_date: today,
          updated_at: new Date().toISOString()
        }).eq('id', existingStreak.id);
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
        title: "Check-in saved",
        description: "Thanks for checking in. Showing up counts.",
      });

      // Reset form
      setSelectedMood(null);
      setSelectedTags([]);
      setNote('');

      if (onCheckInComplete) {
        onCheckInComplete();
      }
    } catch (error) {
      console.error('Error saving check-in:', error);
      toast({
        title: "Error",
        description: "Failed to save check-in. Please try again.",
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

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Good morning! 👋</CardTitle>
        <p className="text-sm text-muted-foreground">Let's do a 10-second check-in.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mood Selector */}
        <div>
          <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
          <div className="flex gap-3 justify-between">
            {moodOptions.map(({ score, icon: Icon, label, color }) => (
              <motion.button
                key={score}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(score)}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                  selectedMood === score
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Icon className={`w-6 h-6 ${selectedMood === score ? 'text-primary' : color}`} />
                <span className="text-xs">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium mb-2 block">What describes today? (optional)</label>
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
          <label className="text-sm font-medium mb-2 block">Anything you want to note? (optional)</label>
          <Textarea
            placeholder="How are you feeling today?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="resize-none"
          />
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSaveCheckIn} 
          disabled={!selectedMood || saving}
          className="w-full"
        >
          {saving ? 'Saving...' : 'Save Check-In'}
        </Button>
      </CardContent>
    </Card>
  );
}
