
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const features = [
  {
    title: "Real-Time Therapy",
    description: "Connect with licensed therapists instantly through secure video sessions.",
    icon: MessageCircle,
    path: "/real-time-therapy"
  },
  {
    title: "Mental Wellness Tools", 
    description: "Access evidence-based resources and exercises for your mental health journey.",
    icon: Brain,
    path: "/mental-wellness-tools"
  },
  {
    title: "Flexible Scheduling",
    description: "Book therapy sessions that fit your schedule, with 24/7 availability.",
    icon: Calendar,
    path: "/scheduling"
  },
  {
    title: "Private & Secure",
    description: "Your mental health journey, protected with end-to-end encryption.",
    icon: Shield,
    path: "/privacy-security"
  },
];

const positiveAffirmations = [
  "You are capable of amazing things.",
  "Every day is a new opportunity.",
  "You are strong, resilient, and worthy of happiness.",
  "Your potential is limitless.",
  "Small steps lead to big changes.",
];

const encouragementMessages = [
  "It's okay to have off days. Tomorrow is a new beginning.",
  "Remember to be kind to yourself today.",
  "You don't have to have everything figured out right now.",
  "Progress isn't always linear, and that's okay.",
  "You're doing better than you think you are.",
];

const emergencyResources = [
  { name: "National Suicide Prevention Lifeline", contact: "988", description: "Available 24/7" },
  { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "Available 24/7" },
  { name: "Emergency Services", contact: "911", description: "For immediate emergencies" },
  { name: "Crisis Line", contact: "1-800-273-8255", description: "Local support" },
];

const visionBoardQualities = [
  { id: "peaceful", label: "Peaceful" },
  { id: "confident", label: "Confident" },
  { id: "focused", label: "Focused" },
  { id: "joyful", label: "Joyful" },
  { id: "resilient", label: "Resilient" },
  { id: "balanced", label: "Balanced" },
  { id: "energetic", label: "Energetic" },
  { id: "mindful", label: "Mindful" },
  { id: "creative", label: "Creative" },
  { id: "grateful", label: "Grateful" },
  { id: "empathetic", label: "Empathetic" },
  { id: "present", label: "Present" },
];

const visionBoardGoals = [
  { id: "reducing-anxiety", label: "Reducing anxiety" },
  { id: "managing-stress", label: "Managing stress" },
  { id: "improving-sleep", label: "Improving sleep" },
  { id: "better-relationships", label: "Better relationships" },
  { id: "career-growth", label: "Career growth" },
  { id: "health-wellness", label: "Health & wellness" },
  { id: "emotional-regulation", label: "Emotional regulation" },
  { id: "setting-boundaries", label: "Setting boundaries" },
  { id: "overcoming-trauma", label: "Overcoming trauma" },
  { id: "finding-purpose", label: "Finding purpose" },
  { id: "building-confidence", label: "Building confidence" },
  { id: "work-life-balance", label: "Work-life balance" },
];

const Index = () => {
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'visionBoard' | 'main'>('intro');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenState('mood');
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const toggleQuality = (id: string) => {
    setSelectedQualities(prev => 
      prev.includes(id) 
        ? prev.filter(q => q !== id) 
        : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) 
        ? prev.filter(g => g !== id) 
        : [...prev, id]
    );
  };

  if (screenState === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f]">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Copper Outline Logo" 
              className="w-40 md:w-48 mx-auto intro-logo-icon"
            />
          </div>
          <h1 className="intro-logo-text text-6xl md:text-8xl mb-8">
            <span className="text-white">Thrive</span>
            <span className="text-[#B87333] ml-2" style={{ 
              textShadow: '0 0 10px rgba(184, 115, 51, 0.8), 0 0 20px rgba(184, 115, 51, 0.4)' 
            }}>MT</span>
          </h1>
          <p className="intro-tagline text-xl md:text-2xl text-gray-300">
            because life should be more than just surviving
          </p>
        </div>
      </div>
    );
  }

  if (screenState === 'mood') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] animate-fade-in">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl text-white mb-12">
            How are you feeling today?
          </h2>
          <div className="flex justify-center gap-8 md:gap-16">
            <button 
              onClick={() => {
                setSelectedMood('happy');
                setScreenState('moodResponse');
              }}
              className="mood-button group"
            >
              <Smile className="w-16 h-16 md:w-20 md:h-20 text-[#B87333] transition-transform duration-300 group-hover:scale-110" />
            </button>
            <button 
              onClick={() => {
                setSelectedMood('neutral');
                setScreenState('moodResponse');
              }}
              className="mood-button group"
            >
              <Meh className="w-16 h-16 md:w-20 md:h-20 text-[#B87333] transition-transform duration-300 group-hover:scale-110" />
            </button>
            <button 
              onClick={() => {
                setSelectedMood('sad');
                setScreenState('moodResponse');
              }}
              className="mood-button group"
            >
              <Frown className="w-16 h-16 md:w-20 md:h-20 text-[#B87333] transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screenState === 'moodResponse') {
    // Content based on selected mood
    if (selectedMood === 'happy') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2FCE2] animate-fade-in">
          <div className="text-center max-w-2xl mx-auto px-4">
            <Smile className="w-20 h-20 mx-auto mb-8 text-[#B87333]" />
            <h2 className="text-3xl md:text-4xl mb-8">Positive Affirmations</h2>
            <div className="space-y-4 mb-10">
              {positiveAffirmations.map((affirmation, index) => (
                <p key={index} className="text-xl md:text-2xl font-light">
                  {affirmation}
                </p>
              ))}
            </div>
            <Button 
              className="group"
              onClick={() => setScreenState('visionBoard')}
            >
              Create Your Vision
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      );
    } else if (selectedMood === 'neutral') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F0FB] animate-fade-in">
          <div className="text-center max-w-2xl mx-auto px-4">
            <Meh className="w-20 h-20 mx-auto mb-8 text-[#B87333]" />
            <h2 className="text-3xl md:text-4xl mb-8">Words of Encouragement</h2>
            <div className="space-y-4 mb-10">
              {encouragementMessages.map((message, index) => (
                <p key={index} className="text-xl md:text-2xl font-light">
                  {message}
                </p>
              ))}
            </div>
            <Button 
              className="group"
              onClick={() => setScreenState('visionBoard')}
            >
              Create Your Vision
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      );
    } else if (selectedMood === 'sad') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#221F26] text-white animate-fade-in">
          <div className="text-center max-w-2xl mx-auto px-4">
            <Frown className="w-20 h-20 mx-auto mb-8 text-[#ea384c]" />
            <h2 className="text-3xl md:text-4xl mb-8">Emergency Resources</h2>
            <p className="text-xl mb-6">
              If you're experiencing a mental health crisis, please reach out to one of these resources immediately:
            </p>
            <div className="space-y-6 mb-10">
              {emergencyResources.map((resource, index) => (
                <div key={index} className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10">
                  <h3 className="text-xl font-medium">{resource.name}</h3>
                  <p className="text-2xl font-bold text-[#ea384c] my-2">{resource.contact}</p>
                  <p className="text-sm opacity-80">{resource.description}</p>
                </div>
              ))}
            </div>
            <p className="mb-8 text-lg">
              You're not alone. Help is available, and reaching out is a sign of strength.
            </p>
            <Button 
              className="group bg-[#ea384c] hover:bg-[#ea384c]/90"
              onClick={() => setScreenState('visionBoard')}
            >
              Create Your Vision
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      );
    }
  }

  if (screenState === 'visionBoard') {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-b from-[#1a1a1f] to-[#2a2a3f] text-white animate-fade-in overflow-auto">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl text-center mb-6 font-light">
            My Vision Board
          </h1>
          <p className="text-lg md:text-xl text-center mb-10 text-gray-300">
            The future version of myself that I am choosing now will be:
          </p>
          
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-[#B87333]">Qualities I Want to Embrace</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {visionBoardQualities.map((quality) => (
                <button
                  key={quality.id}
                  onClick={() => toggleQuality(quality.id)}
                  className={`p-3 rounded-lg transition-all duration-300 text-lg ${
                    selectedQualities.includes(quality.id)
                      ? 'bg-[#B87333] text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {quality.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-[#B87333]">Goals I Want to Achieve</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {visionBoardGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3 rounded-lg transition-all duration-300 text-left ${
                    selectedGoals.includes(goal.id)
                      ? 'bg-[#B87333] text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              {selectedQualities.length > 0 || selectedGoals.length > 0 
                ? `You've selected ${selectedQualities.length} qualities and ${selectedGoals.length} goals.`
                : "Select at least one quality or goal to help tailor your therapy and mental health resources."}
            </p>
            <Button 
              className="group bg-[#B87333] hover:bg-[#B87333]/80 text-white"
              onClick={() => setScreenState('main')}
              disabled={selectedQualities.length === 0 && selectedGoals.length === 0}
            >
              Continue to Thrive
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white app-content">
      {/* Hero Section */}
      <section className="container px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <span className="px-3 py-1 text-sm font-medium tracking-wider rounded-full bg-primary/10 text-primary inline-block mb-4 uppercase">
            Welcome to Thrive
          </span>
          <h1 className="text-4xl sm:text-5xl tracking-tight mb-6 bg-clip-text">
            Your Mental Health Journey Starts Here
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Access professional therapy and mental wellness tools from anywhere. 
            Get the support you need, when you need it.
          </p>
          <Button className="group">
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 backdrop-blur-sm bg-background/50 border border-border/50 hover:border-primary/50 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate(feature.path)}
              >
                <feature.icon className="h-8 w-8 mb-4 text-primary/80" />
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-6">Ready to Take the First Step?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands who have found their path to better mental health. 
            Our licensed therapists are here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              className="group"
              onClick={() => navigate("/real-time-therapy")}
            >
              Connect with a Therapist
              <MessageCircle className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="group">
              Explore Resources
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
