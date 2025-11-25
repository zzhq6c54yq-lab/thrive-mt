import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, TrendingDown, Minus, Clock, Flame, CheckCircle, StickyNote, Save } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MiniWinDialog } from './MiniWinDialog';

interface MoodPulseWidgetProps {
  moodData?: { date: string; score: number }[];
}

export function MoodPulseWidget({ moodData = [] }: MoodPulseWidgetProps) {
  const navigate = useNavigate();
  const last7Days = moodData.slice(-7);
  const avgMood = last7Days.length > 0 
    ? last7Days.reduce((sum, d) => sum + d.score, 0) / last7Days.length 
    : 0;
  
  const trend = last7Days.length >= 2
    ? last7Days[last7Days.length - 1].score - last7Days[0].score
    : 0;

  const getTrendText = () => {
    if (trend > 0.5) return '↑ rising';
    if (trend < -0.5) return '↓ slightly this week';
    return '→ steady';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-[#D4AF37]/5 to-background border border-[#D4AF37]/30 rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-[#D4AF37]" />
        <h3 className="text-2xl font-bold text-shadow">Mood Pulse</h3>
      </div>
      
      <div className="h-32 mb-3">
        {last7Days.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7Days}>
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No mood data yet
          </div>
        )}
      </div>

      <div className="text-center mb-3">
        <p className="text-sm text-foreground">
          7-day avg: <span className="font-bold">{avgMood.toFixed(1)}</span> / 5 · Trending: {getTrendText()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Common tags on low days: 'Tired', 'Overwhelmed'
        </p>
      </div>

      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate('/progress-analytics')}
        >
          See Insights
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate('/weekly-goals')}
        >
          Set a Focus Goal
        </Button>
      </div>
    </motion.div>
  );
}

interface StreakProtectorWidgetProps {
  streak: number;
}

export function StreakProtectorWidget({ streak }: StreakProtectorWidgetProps) {
  const [showMiniWinDialog, setShowMiniWinDialog] = useState(false);
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const hoursLeft = Math.floor((midnight.getTime() - now.getTime()) / (1000 * 60 * 60));
  const isAtRisk = hoursLeft <= 3;
  const bestStreak = 7; // TODO: Get from user data
  const daysToRecord = Math.max(0, bestStreak - streak);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-[#D4AF37]/5 to-background border border-[#D4AF37]/30 rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-[#D4AF37]" />
        <h3 className="text-2xl font-bold text-shadow">Streak Protector</h3>
      </div>
      
      <div className="text-center mb-4">
        <motion.div
          animate={{ 
            scale: isAtRisk ? [1, 1.1, 1] : 1,
          }}
          transition={{ 
            duration: 1, 
            repeat: isAtRisk ? Infinity : 0,
            repeatDelay: 2
          }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 mb-2">
            <Flame className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <p className="text-3xl font-bold mb-2">
            {streak}-day streak
          </p>
        </motion.div>
        
        {daysToRecord > 0 && (
          <p className="text-sm text-muted-foreground mb-2">
            You're {daysToRecord} days away from your best streak ever ({bestStreak} days)
          </p>
        )}
        
        {isAtRisk && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <p className="text-xs text-[#D4AF37]">
              You have {hoursLeft}h left to keep your streak
            </p>
          </motion.div>
        )}
      </div>

      <Button 
        variant="gold" 
        className="w-full" 
        size="sm"
        onClick={() => setShowMiniWinDialog(true)}
      >
        Capture a mini win
      </Button>
      
      <div className="mt-3 text-xs text-muted-foreground text-center">
        Quick options: 1-question check-in · 30-sec breathing · Write one sentence
      </div>

      <MiniWinDialog 
        open={showMiniWinDialog} 
        onOpenChange={setShowMiniWinDialog}
      />
    </motion.div>
  );
}

interface ProgressRingWidgetProps {
  completed: number;
  total: number;
}

export function ProgressRingWidget({ completed, total }: ProgressRingWidgetProps) {
  const navigate = useNavigate();
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 cursor-pointer hover:bg-card/70 transition-colors" onClick={() => navigate('/weekly-goals')}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Today's Goal
        </h4>
      </div>
      
      <div className="flex items-center justify-center">
        {total === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-3">No goals set yet</p>
            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate('/weekly-goals'); }}>
              Set Goals
            </Button>
          </div>
        ) : (
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
        )}
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
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-4 relative z-10">
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
        className="w-full relative z-20"
        variant="secondary"
      >
        <Save className="w-3 h-3 mr-2" />
        {saving ? 'Saving...' : 'Save Note'}
      </Button>
    </Card>
  );
}
