import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, TrendingDown, Minus, Clock, Flame, CheckCircle, StickyNote, Save } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MoodPulseWidgetProps {
  moodData?: { date: string; score: number }[];
}

export function MoodPulseWidget({ moodData = [] }: MoodPulseWidgetProps) {
  const last7Days = moodData.slice(-7);
  const avgMood = last7Days.length > 0 
    ? last7Days.reduce((sum, d) => sum + d.score, 0) / last7Days.length 
    : 0;
  
  const trend = last7Days.length >= 2
    ? last7Days[last7Days.length - 1].score - last7Days[0].score
    : 0;

  const getTrendIcon = () => {
    if (trend > 0.5) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < -0.5) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500" />
          Mood Pulse
        </h4>
        {getTrendIcon()}
      </div>
      
      <div className="flex items-end gap-1 h-16 mb-2">
        {last7Days.map((day, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${(day.score / 5) * 100}%` }}
            transition={{ delay: i * 0.05 }}
            className="flex-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-t"
          />
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        7-day average: <span className="font-semibold text-foreground">{avgMood.toFixed(1)}</span>/5
      </div>
    </Card>
  );
}

interface StreakProtectorWidgetProps {
  streak: number;
}

export function StreakProtectorWidget({ streak }: StreakProtectorWidgetProps) {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const hoursLeft = Math.floor((midnight.getTime() - now.getTime()) / (1000 * 60 * 60));

  return (
    <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          Streak Protector
        </h4>
        <Clock className="w-4 h-4 text-orange-500" />
      </div>
      
      <div className="text-center mb-3">
        <div className="text-3xl font-bold text-orange-500">{streak}</div>
        <div className="text-xs text-muted-foreground">day streak</div>
      </div>

      {hoursLeft < 6 && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xs text-center text-orange-400"
        >
          ⏰ {hoursLeft}h left - Don't break your streak!
        </motion.div>
      )}
    </Card>
  );
}

interface ProgressRingWidgetProps {
  completed: number;
  total: number;
}

export function ProgressRingWidget({ completed, total }: ProgressRingWidgetProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Today's Goal
        </h4>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-700"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-foreground">{completed}</div>
            <div className="text-xs text-muted-foreground">/ {total}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function QuickNotesWidget() {
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!user || !note.trim()) return;

    try {
      setSaving(true);
      const { error } = await supabase.from('journal_entries').insert({
        user_id: user.id,
        mood: 'neutral',
        notes: note.trim()
      });

      if (error) throw error;

      toast({ title: 'Note saved', description: 'Your thought has been captured.' });
      setNote('');
    } catch (error) {
      console.error('Error saving note:', error);
      toast({ title: 'Error', description: 'Failed to save note', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-yellow-500" />
          Quick Notes
        </h4>
      </div>
      
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Jot down a quick thought..."
        className="min-h-[80px] mb-2 bg-background/50 border-border/50"
      />
      
      <Button
        onClick={handleSave}
        disabled={!note.trim() || saving}
        size="sm"
        className="w-full"
        variant="secondary"
      >
        <Save className="w-3 h-3 mr-2" />
        {saving ? 'Saving...' : 'Save Note'}
      </Button>
    </Card>
  );
}
