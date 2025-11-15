import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Ground & Scan</h2>
            <p className="text-muted-foreground">Let's start by checking in with how you're feeling right now.</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Mood: {mood}/10
                </label>
                <Slider value={[mood]} onValueChange={(v) => setMood(v[0])} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <Brain className="w-5 h-5 text-blue-500" />
                  Anxiety: {anxiety}/10
                </label>
                <Slider value={[anxiety]} onValueChange={(v) => setAnxiety(v[0])} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground font-medium">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Energy: {energy}/10
                </label>
                <Slider value={[energy]} onValueChange={(v) => setEnergy(v[0])} min={1} max={10} step={1} />
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full">Continue</Button>
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
    <Page title="Between-Session Companion" returnToMain>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Between-Session Companion</h1>
          <p className="text-muted-foreground">AI-powered support when you need it</p>
        </div>

        <Card className="p-8 bg-card">
          {renderStep()}
        </Card>
      </div>
    </Page>
  );
};

export default MiniSession;
