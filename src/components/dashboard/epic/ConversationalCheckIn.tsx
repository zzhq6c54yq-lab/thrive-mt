import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

type ConversationStep = 'question' | 'response' | 'insight';

const ConversationalCheckIn: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [step, setStep] = useState<ConversationStep>('question');
  const [moodScore, setMoodScore] = useState(5);
  const [note, setNote] = useState('');
  const [henryResponse, setHenryResponse] = useState('');
  const [saving, setSaving] = useState(false);

  const hour = new Date().getHours();
  const getContextQuestion = () => {
    if (hour >= 0 && hour < 6) {
      return "How did you sleep? Be honest with me.";
    }
    if (hour >= 6 && hour < 12) {
      return "How are you feeling this morning?";
    }
    if (hour >= 12 && hour < 17) {
      return "Scale of 1-10, how's your energy right now?";
    }
    if (hour >= 17 && hour < 21) {
      return "What's one thing that happened today - good or bad?";
    }
    return "How are you holding up today?";
  };

  const getHenryResponse = (score: number) => {
    if (score <= 3) {
      return "I hear you. That's hard. You don't have to carry this alone - I'm here with you.";
    }
    if (score <= 5) {
      return "Some days are just heavier than others. That's okay. Want to try something with me?";
    }
    if (score <= 7) {
      return "You're managing. That takes strength, even when it doesn't feel like it.";
    }
    if (score <= 9) {
      return "That's beautiful. What's behind the good vibes today?";
    }
    return "Look at you shining today. I love seeing this.";
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('daily_check_ins')
        .insert({
          user_id: user.id,
          mood_score: moodScore,
          note: note || null,
        });

      if (error) throw error;

      const response = getHenryResponse(moodScore);
      setHenryResponse(response);
      setStep('insight');

      setTimeout(() => {
        toast({
          title: "Check-in saved",
          description: "You showed up for yourself today. That matters.",
        });
        onComplete?.();
      }, 4000);

    } catch (error) {
      console.error('Error saving check-in:', error);
      toast({
        title: "Let's try that together again",
        description: "Something went wrong. Take a breath - we'll work through this.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const moodEmoji = moodScore <= 2 ? '😔' : moodScore <= 4 ? '😕' : moodScore <= 6 ? '😐' : moodScore <= 8 ? '🙂' : '😊';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 via-background/50 to-background/80 backdrop-blur-xl border border-border/50 p-6 shadow-xl">
      {/* Henry's presence - always visible */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-12 h-12"
        >
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-xl opacity-40" />
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Henry" 
              className="w-8 h-8 object-contain"
            />
          </div>
        </motion.div>
        <div>
          <p className="text-sm font-light text-muted-foreground">Henry</p>
          <p className="text-xs text-muted-foreground/60">Your companion</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Question */}
        {step === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-[#D4AF37]/10 rounded-xl p-4 border border-[#D4AF37]/20">
              <p className="text-lg font-light text-foreground">
                {getContextQuestion()}
              </p>
            </div>

            {/* Mood slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-light">How I'm feeling</span>
                <span className="text-4xl">{moodEmoji}</span>
              </div>
              <Slider
                value={[moodScore]}
                onValueChange={(value) => setMoodScore(value[0])}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground/60">
                <span>Struggling</span>
                <span>Thriving</span>
              </div>
            </div>

            {/* Optional note */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground font-light">
                Want to tell me more? (optional)
              </label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="I'm listening..."
                className="min-h-[100px] bg-background/50 border-border/50 font-light resize-none"
              />
            </div>

            <Button
              onClick={() => setStep('response')}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-background font-light transition-all duration-500"
            >
              Share with Henry
            </Button>
          </motion.div>
        )}

        {/* Step 2: Henry's Response */}
        {step === 'response' && (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-[#D4AF37]/10 rounded-xl p-6 border border-[#D4AF37]/20"
            >
              <p className="text-lg font-light text-foreground leading-relaxed">
                {getHenryResponse(moodScore)}
              </p>
            </motion.div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-background font-light transition-all duration-500"
            >
              {saving ? "Saving your moment..." : "Save this check-in"}
            </Button>
          </motion.div>
        )}

        {/* Step 3: Insight */}
        {step === 'insight' && (
          <motion.div
            key="insight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center py-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.6 }}
              className="text-6xl mb-4"
            >
              ✨
            </motion.div>
            <p className="text-xl font-light text-foreground">
              You showed up for yourself today
            </p>
            <p className="text-sm text-muted-foreground font-light">
              {henryResponse}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConversationalCheckIn;
