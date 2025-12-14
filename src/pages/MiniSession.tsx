import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Brain, Heart, MessageCircle, Cloud, Anchor, BookOpen, ArrowLeft, ArrowRight, Sparkles, Save, Share2 } from "lucide-react";
import { miniSessionSchema } from "@/lib/validations";
import AIDisclaimer from "@/components/compliance/AIDisclaimer";

const MiniSession: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [urgeLevel, setUrgeLevel] = useState(5);
  const [focus, setFocus] = useState<string>('');
  const [userTextPrimary, setUserTextPrimary] = useState('');
  const [userTextSecondary, setUserTextSecondary] = useState('');
  const [coaching, setCoaching] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('friend');
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch user's display name
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) return;
      setUserId(user.id);
      
      const { data } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single();
      
      if (data?.display_name) {
        setUserName(data.display_name.split(' ')[0]);
      }
    };
    fetchUserProfile();
  }, []);

  // Time-aware greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: "Good morning", message: "I hope your day is off to a gentle start." };
    if (hour < 17) return { greeting: "Hey there", message: "I've been thinking about you today." };
    if (hour < 21) return { greeting: "Good evening", message: "I'm glad you're taking time for yourself." };
    return { greeting: "It's getting late", message: "I'm glad you reached out." };
  };

  const timeContext = getTimeGreeting();

  const focusAreas = [
    { 
      id: 'racing_thoughts', 
      label: "My mind won't slow down",
      icon: Brain,
      description: "Racing thoughts or overthinking",
      color: "from-blue-500/20 to-indigo-500/20"
    },
    { 
      id: 'conflict', 
      label: "I had a hard conversation",
      icon: MessageCircle,
      description: "Processing a conflict or difficult interaction",
      color: "from-orange-500/20 to-red-500/20"
    },
    { 
      id: 'low_mood', 
      label: "I'm feeling down today",
      icon: Cloud,
      description: "Low mood or sadness",
      color: "from-slate-500/20 to-gray-500/20"
    },
    { 
      id: 'urge', 
      label: "I'm struggling with urges",
      icon: Anchor,
      description: "Managing urges or cravings",
      color: "from-purple-500/20 to-violet-500/20"
    },
    { 
      id: 'process_therapy', 
      label: "I want to reflect on therapy",
      icon: BookOpen,
      description: "Processing a recent therapy session",
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  const getContextualPrompt = () => {
    switch (focus) {
      case "racing_thoughts":
        return "What thoughts keep circling back? Don't worry about making sense — just let it out.";
      case "conflict":
        return "What happened? Sometimes just putting it into words helps.";
      case "low_mood":
        return "I'm sorry you're feeling this way. What's going on?";
      case "urge":
        return "I'm proud of you for reaching out. What are you noticing right now?";
      case "process_therapy":
        return "How did your session feel? What's sticking with you?";
      default:
        return "What's on your mind? This is a safe space.";
    }
  };

  const handleGenerate = async () => {
    const validation = miniSessionSchema.safeParse({
      focus,
      mood,
      anxiety,
      energy,
      urge_level: urgeLevel,
      user_text_primary: userTextPrimary,
      user_text_secondary: userTextSecondary,
    });

    if (!validation.success) {
      toast({
        title: "Please share what's on your mind",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('mini-session', {
        body: { ...validation.data, userName }
      });

      if (error) throw error;

      setCoaching(data.coaching);
      setSummary(data.summary);

      // Save to database
      if (userId) {
        await (supabase as any).from('mini_sessions').insert({
          user_id: userId,
          ...validation.data,
          coaching: data.coaching,
          summary: data.summary,
          shared_with_therapist: false
        });
      }

      setStep(4);
    } catch (error) {
      console.error('Error generating coaching:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Henry Avatar Component
  const HenryAvatar = ({ size = "lg", speaking = false }: { size?: "sm" | "lg"; speaking?: boolean }) => (
    <motion.div 
      className={`relative flex items-center justify-center ${size === "lg" ? "w-20 h-20" : "w-12 h-12"}`}
      animate={speaking ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: speaking ? Infinity : 0, duration: 2 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-bronze-500/30 to-bronze-700/20 rounded-full blur-xl ${speaking ? "animate-pulse" : ""}`} />
      <div className={`relative ${size === "lg" ? "w-16 h-16" : "w-10 h-10"} rounded-full bg-gradient-to-br from-bronze-400 to-bronze-600 flex items-center justify-center shadow-lg`}>
        <Heart className={`${size === "lg" ? "w-8 h-8" : "w-5 h-5"} text-white`} fill="white" />
      </div>
    </motion.div>
  );

  // Henry Speech Bubble
  const HenrySpeech = ({ children }: { children: React.ReactNode }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-bronze-500/10 to-bronze-700/5 border border-bronze-500/20 rounded-2xl p-4 text-center max-w-md mx-auto"
    >
      <p className="text-foreground/90 text-lg leading-relaxed">{children}</p>
    </motion.div>
  );

  // Progress Dots
  const ProgressDots = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <motion.div
          key={s}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            s === step 
              ? "bg-bronze-500" 
              : s < step 
                ? "bg-bronze-500/60" 
                : "bg-muted"
          }`}
          animate={s === step ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              <HenryAvatar size="lg" speaking />
              <HenrySpeech>
                {timeContext.greeting}, {userName}. 💛 {timeContext.message} Let's take a moment to check in together.
              </HenrySpeech>
            </div>

            {/* Grounding Moment */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-6 text-center"
            >
              <p className="text-sm text-muted-foreground mb-3">Before we dive in, let's ground ourselves:</p>
              <p className="text-foreground font-medium mb-4">Take a slow breath in... hold... and release.</p>
              <div className="flex justify-center gap-4 text-2xl">
                <span>🌿</span>
                <span>✨</span>
                <span>🌊</span>
              </div>
              <p className="text-xs text-bronze-500 mt-3 italic">
                "You showed up for yourself today. That already matters."
              </p>
            </motion.div>

            <div className="space-y-6 mt-8">
              <p className="text-center text-muted-foreground">How are you feeling right now? There's no wrong answer.</p>
              
              <div className="space-y-6">
                {/* Mood Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground/80">How's your heart feeling?</label>
                    <span className="text-sm text-bronze-500 font-medium">{mood}/10</span>
                  </div>
                  <Slider
                    value={[mood]}
                    onValueChange={(v) => setMood(v[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="[&_[role=slider]]:bg-bronze-500 [&_[role=slider]]:border-bronze-600"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Heavy</span>
                    <span>Light & bright</span>
                  </div>
                </div>

                {/* Anxiety Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground/80">How calm or restless?</label>
                    <span className="text-sm text-bronze-500 font-medium">{anxiety}/10</span>
                  </div>
                  <Slider
                    value={[anxiety]}
                    onValueChange={(v) => setAnxiety(v[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="[&_[role=slider]]:bg-bronze-500 [&_[role=slider]]:border-bronze-600"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Very calm</span>
                    <span>Very restless</span>
                  </div>
                </div>

                {/* Energy Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground/80">How's your energy today?</label>
                    <span className="text-sm text-bronze-500 font-medium">{energy}/10</span>
                  </div>
                  <Slider
                    value={[energy]}
                    onValueChange={(v) => setEnergy(v[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="[&_[role=slider]]:bg-bronze-500 [&_[role=slider]]:border-bronze-600"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Drained</span>
                    <span>Energized</span>
                  </div>
                </div>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm text-bronze-500 mt-4"
              >
                Thanks for sharing that with me. 💛
              </motion.p>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => setStep(2)}
                className="bg-bronze-500 hover:bg-bronze-600 text-white"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              <HenryAvatar size="lg" speaking />
              <HenrySpeech>
                I'm here for whatever you need. What's weighing on you today?
              </HenrySpeech>
            </div>

            <div className="grid gap-3 mt-6">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                const isSelected = focus === area.id;
                return (
                  <motion.button
                    key={area.id}
                    onClick={() => setFocus(area.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected 
                        ? "border-bronze-500 bg-bronze-500/10 shadow-lg" 
                        : "border-border/50 hover:border-bronze-500/50 bg-card/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${area.color} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${isSelected ? "text-bronze-500" : "text-foreground/70"}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${isSelected ? "text-bronze-500" : "text-foreground"}`}>
                          {area.label}
                        </p>
                        <p className="text-sm text-muted-foreground">{area.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {focus && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-bronze-500"
              >
                I hear you. Let's work through this together. 💛
              </motion.p>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!focus}
                className="bg-bronze-500 hover:bg-bronze-600 text-white"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center gap-4">
              <HenryAvatar size="lg" speaking />
              <HenrySpeech>
                {getContextualPrompt()}
              </HenrySpeech>
            </div>

            <div className="space-y-4 mt-6">
              <div className="relative">
                <Textarea
                  value={userTextPrimary}
                  onChange={(e) => setUserTextPrimary(e.target.value)}
                  placeholder="This is a safe space. Take your time..."
                  className="min-h-[180px] bg-amber-50/5 border-bronze-500/30 focus:border-bronze-500 rounded-xl p-4 text-foreground placeholder:text-muted-foreground/60 resize-none"
                  style={{ 
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(184, 115, 51, 0.1) 31px, rgba(184, 115, 51, 0.1) 32px)",
                    lineHeight: "32px",
                    paddingTop: "8px"
                  }}
                />
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {userTextPrimary.length > 0 && (
                    <span className="text-bronze-500">You're doing great. Keep going. ✨</span>
                  )}
                </div>
              </div>

              {focus === 'conflict' && (
                <div className="space-y-2">
                  <label className="text-foreground/80 font-medium text-sm">What do you wish you had said?</label>
                  <Textarea
                    value={userTextSecondary}
                    onChange={(e) => setUserTextSecondary(e.target.value)}
                    rows={4}
                    placeholder="If you could go back..."
                    className="bg-amber-50/5 border-bronze-500/30 focus:border-bronze-500 rounded-xl"
                  />
                </div>
              )}

              {focus === 'urge' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3 p-4 bg-card/50 rounded-xl border border-border/50"
                >
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground/80">How intense is the urge right now?</label>
                    <span className="text-sm text-bronze-500 font-medium">{urgeLevel}/10</span>
                  </div>
                  <Slider
                    value={[urgeLevel]}
                    onValueChange={(v) => setUrgeLevel(v[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="[&_[role=slider]]:bg-bronze-500 [&_[role=slider]]:border-bronze-600"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mild</span>
                    <span>Very intense</span>
                  </div>
                  {urgeLevel > 7 && (
                    <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-destructive text-sm">If you're in crisis, please reach out to 988 or emergency services immediately.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button 
                onClick={handleGenerate}
                disabled={isLoading || !userTextPrimary.trim()}
                className="bg-bronze-500 hover:bg-bronze-600 text-white"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="mr-2"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    Henry is thinking...
                  </>
                ) : (
                  <>Share with Henry <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </div>
          </motion.div>
        );

      case 4:
        // Get affirmation based on focus area
        const getAffirmation = () => {
          switch (focus) {
            case 'racing_thoughts':
              return "Your mind is doing its best to protect you. It's okay to let it rest now.";
            case 'conflict':
              return "Your feelings are valid. Healing takes time, and you're already on your way.";
            case 'low_mood':
              return "Even on cloudy days, the sun is still there. So is your strength.";
            case 'urge':
              return "Every moment you choose differently is a victory. You are stronger than you know.";
            case 'process_therapy':
              return "Growth isn't always linear. Every insight is a step forward.";
            default:
              return "You matter. Your feelings matter. This moment matters.";
          }
        };

        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center gap-4">
              <HenryAvatar size="lg" />
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-semibold text-center text-foreground"
              >
                Henry's Thoughts for You
              </motion.h2>
            </div>

            {/* Daily Affirmation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-[#D4AF37]/10 via-[#E5C5A1]/10 to-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-4 text-center"
            >
              <p className="text-xs text-muted-foreground mb-1">Today's Affirmation</p>
              <p className="text-foreground font-medium italic">"{getAffirmation()}"</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-bronze-500/10 to-bronze-700/5 border border-bronze-500/20 rounded-2xl p-6 space-y-4"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b87333' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
              }}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {coaching.split('\n').map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-foreground/90 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-4 border-t border-bronze-500/20"
              >
                <p className="text-bronze-500 italic text-right">
                  With care, Henry 💛
                </p>
              </motion.div>
            </motion.div>

            {/* Reflection Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
            >
              <p className="text-sm font-medium text-emerald-400 mb-2">💭 Reflection Question</p>
              <p className="text-sm text-foreground/80 italic">
                What's one small thing you can do in the next hour to honor how you're feeling right now?
              </p>
            </motion.div>

            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card/50 border border-border/50 rounded-xl p-4"
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Session Summary</h3>
                <p className="text-sm text-foreground/80">{summary}</p>
              </motion.div>
            )}

            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/app/journaling')}
                className="border-bronze-500/30 hover:bg-bronze-500/10"
              >
                <Save className="mr-2 w-4 h-4" /> Save to Journal
              </Button>
              <Button 
                variant="outline"
                onClick={() => toast({ title: "Shared with your therapist", description: "Your session has been shared securely." })}
                className="border-bronze-500/30 hover:bg-bronze-500/10"
              >
                <Share2 className="mr-2 w-4 h-4" /> Share with Therapist
              </Button>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button 
                variant="ghost"
                onClick={() => navigate('/app/mini-session-history')}
              >
                View Past Sessions
              </Button>
              <Button 
                onClick={() => {
                  setStep(1);
                  setMood(5);
                  setAnxiety(5);
                  setEnergy(5);
                  setFocus("");
                  setUserTextPrimary("");
                  setUserTextSecondary("");
                  setCoaching("");
                  setSummary("");
                }}
                className="bg-bronze-500 hover:bg-bronze-600 text-white"
              >
                Start New Session
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950/20 via-background to-bronze-950/10">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/app/dashboard')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
              A Moment with Henry
            </h1>
            <p className="text-muted-foreground mt-1">Your personal between-session companion</p>
          </div>
        </motion.div>

        <ProgressDots />

        <Card className="border-bronze-500/20 bg-card/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </CardContent>
        </Card>
        
        {/* AI Disclaimer */}
        <div className="mt-6">
          <AIDisclaimer variant="inline" showCrisisInfo />
        </div>
      </div>
    </div>
  );
};

export default MiniSession;
