import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Page from "@/components/Page";
import { Brain, Heart, Zap, AlertCircle, BookOpen, MessageCircle, TrendingDown, Target, Sparkles } from "lucide-react";
import { miniSessionSchema } from "@/lib/validations";

const MiniSession: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [urgeLevel, setUrgeLevel] = useState(0);
  const [focus, setFocus] = useState<string>('');
  const [userTextPrimary, setUserTextPrimary] = useState('');
  const [userTextSecondary, setUserTextSecondary] = useState('');
  const [coaching, setCoaching] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const focusAreas = [
    { id: 'racing_thoughts', label: 'Racing Thoughts', icon: Brain, color: 'bg-blue-500' },
    { id: 'conflict', label: 'Process a Conflict', icon: MessageCircle, color: 'bg-purple-500' },
    { id: 'low_mood', label: 'Low Mood', icon: TrendingDown, color: 'bg-indigo-500' },
    { id: 'urge', label: 'Managing Urges', icon: AlertCircle, color: 'bg-red-500' },
    { id: 'process_therapy', label: 'Process Therapy Session', icon: BookOpen, color: 'bg-green-500' }
  ];

  const handleGenerate = async () => {
    // Validate input
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
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('mini-session', {
        body: validation.data
      });

      if (error) throw error;

      setCoaching(data.coaching);
      setSummary(data.summary);

      // Save to database
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from('mini_sessions').insert({
          user_id: user.id,
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
        title: "Error",
        description: "Failed to generate coaching. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Ground & Scan</h2>
              <p className="text-gray-400">Let's check in with how you're feeling right now</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 rounded-lg">
                      <Heart className="w-6 h-6 text-rose-400" />
                    </div>
                    <span className="text-white font-semibold text-lg">Mood</span>
                  </div>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">{mood}/10</span>
                </div>
                <Slider 
                  value={[mood]} 
                  onValueChange={(v) => setMood(v[0])} 
                  min={1} 
                  max={10} 
                  step={1}
                  className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:bg-gradient-to-br [&_[role=slider]]:from-rose-400 [&_[role=slider]]:to-pink-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Brain className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="text-white font-semibold text-lg">Anxiety</span>
                  </div>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">{anxiety}/10</span>
                </div>
                <Slider 
                  value={[anxiety]} 
                  onValueChange={(v) => setAnxiety(v[0])} 
                  min={1} 
                  max={10} 
                  step={1}
                  className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:bg-gradient-to-br [&_[role=slider]]:from-amber-400 [&_[role=slider]]:to-orange-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                    <span className="text-white font-semibold text-lg">Energy</span>
                  </div>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">{energy}/10</span>
                </div>
                <Slider 
                  value={[energy]} 
                  onValueChange={(v) => setEnergy(v[0])} 
                  min={1} 
                  max={10} 
                  step={1}
                  className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:bg-gradient-to-br [&_[role=slider]]:from-yellow-400 [&_[role=slider]]:to-amber-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg"
                />
              </div>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] text-lg"
              size="lg"
            >
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">What brings you here today?</h2>
            <p className="text-muted-foreground">Choose the area you'd like support with.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <Card
                    key={area.id}
                    className={`p-6 cursor-pointer transition-all hover:scale-105 ${focus === area.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setFocus(area.id)}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className={`p-3 rounded-full ${area.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-medium text-foreground">{area.label}</span>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={() => setStep(3)} disabled={!focus} className="flex-1">Continue</Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Tell me more</h2>
            
            {focus === 'urge' && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Urge Intensity: {urgeLevel}/10
                </label>
                <Slider value={[urgeLevel]} onValueChange={(v) => setUrgeLevel(v[0])} min={0} max={10} step={1} />
                {urgeLevel > 7 && (
                  <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                    <p className="text-red-500 font-medium">If you're in crisis, please reach out to 988 or emergency services immediately.</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-foreground font-medium">
                {focus === 'racing_thoughts' && "What thoughts are coming up?"}
                {focus === 'conflict' && "What happened?"}
                {focus === 'low_mood' && "What's on your mind?"}
                {focus === 'urge' && "What are you noticing?"}
                {focus === 'process_therapy' && "What came up in your session?"}
              </label>
              <Textarea
                value={userTextPrimary}
                onChange={(e) => setUserTextPrimary(e.target.value)}
                rows={6}
                placeholder="Share what's on your mind..."
                className="bg-card"
              />
            </div>

            {focus === 'conflict' && (
              <div className="space-y-2">
                <label className="text-foreground font-medium">What do you wish you had said?</label>
                <Textarea
                  value={userTextSecondary}
                  onChange={(e) => setUserTextSecondary(e.target.value)}
                  rows={4}
                  placeholder="If you could go back..."
                  className="bg-card"
                />
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
              <Button onClick={handleGenerate} disabled={!userTextPrimary || isLoading} className="flex-1">
                {isLoading ? "Generating..." : "Get Support"}
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Your Support</h2>
            </div>
            
            <Card className="p-6 bg-card/50">
              <p className="text-foreground whitespace-pre-wrap">{coaching}</p>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/mini-session/history')} className="flex-1">
                View History
              </Button>
              <Button onClick={() => {
                setStep(1);
                setFocus('');
                setUserTextPrimary('');
                setUserTextSecondary('');
                setCoaching('');
              }} className="flex-1">
                New Session
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10 py-12">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/40">
              Mental Health Core
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              Between-Session Companion
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed drop-shadow-lg max-w-2xl mx-auto">
              AI-powered support to help you process thoughts and emotions between therapy sessions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border-purple-500/20 shadow-2xl">
            {renderStep()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MiniSession;
