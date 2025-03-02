import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, MonitorSmartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'register' | 'visionBoard' | 'main'>('intro');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast({
        title: "Registration Error",
        description: "Please fill in all fields to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registration Successful",
      description: "Welcome to Thrive MT! Your journey to better mental health begins now.",
    });
    
    setScreenState('visionBoard');
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
          <Button 
            className="mt-10 group bg-[#B87333] hover:bg-[#B87333]/80"
            onClick={() => setScreenState('mood')}
          >
            Begin Your Journey
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
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
          <Button 
            className="mt-10 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
            onClick={() => window.open('', '_blank')}
          >
            <MonitorSmartphone className="h-4 w-4" />
            Screen Mode
          </Button>
        </div>
      </div>
    );
  }

  if (screenState === 'moodResponse') {
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
              onClick={() => setScreenState('register')}
            >
              Continue to Register
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
              onClick={() => window.open('', '_blank')}
            >
              <MonitorSmartphone className="h-4 w-4" />
              Screen Mode
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
              onClick={() => setScreenState('register')}
            >
              Continue to Register
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
              onClick={() => window.open('', '_blank')}
            >
              <MonitorSmartphone className="h-4 w-4" />
              Screen Mode
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
              onClick={() => setScreenState('register')}
            >
              Continue to Register
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
              onClick={() => window.open('', '_blank')}
            >
              <MonitorSmartphone className="h-4 w-4" />
              Screen Mode
            </Button>
          </div>
        </div>
      );
    }
  }

  if (screenState === 'register') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] to-[#2a2a3f] text-white animate-fade-in">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-light text-white mb-2">Join <span className="text-[#B87333]">Thrive</span><span className="text-white">MT</span></h2>
            <p className="text-gray-300">Create your account to continue your journey</p>
          </div>
          
          <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    className="pl-10 w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    className="pl-10 w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleUserInfoChange}
                    className="pl-10 w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent"
                    placeholder="Create a password"
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#B87333] hover:bg-[#B87333]/80 text-white py-2 rounded-md transition-colors"
              >
                Register & Continue
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <button 
                  onClick={() => setScreenState('visionBoard')} 
                  className="text-[#B87333] hover:underline"
                >
                  Skip for now
                </button>
              </p>
            </div>
          </Card>
          <div className="text-center mt-6">
            <Button 
              className="group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
              onClick={() => window.open('', '_blank')}
            >
              <MonitorSmartphone className="h-4 w-4" />
              Screen Mode
            </Button>
          </div>
        </div>
      </div>
    );
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
              Continue to Thrive MT
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 mt-4 md:mt-0 group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
              onClick={() => window.open('', '_blank')}
            >
              <MonitorSmartphone className="h-4 w-4" />
              Screen Mode
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
            Welcome to Thrive MT
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
          <Button 
            className="ml-4 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
            onClick={() => window.open('', '_blank')}
          >
            <MonitorSmartphone className="h-4 w-4" />
            Screen Mode
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
                onClick={() => {
                  if (feature.path === "/mental-wellness-tools") {
                    navigate(feature.path, {
                      state: { qualities: selectedQualities, goals: selectedGoals }
                    });
                  } else {
                    navigate(feature.path);
                  }
                }}
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
            Join thousands who have found their path to better mental health with Thrive MT. 
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
            <Button 
              variant="outline" 
              className="group"
              onClick={() => navigate("/mental-wellness-tools", {
                state: { qualities: selectedQualities, goals: selectedGoals }
              })}
            >
              Explore Resources
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
              onClick={() => window.open('', '_blank')}
            >
              <MonitorSmartphone className="h-4 w-4" />
              Screen Mode
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
