import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, ArrowLeft, Annoyed, HeartCrack, Angry, HeartHandshake, UserRound, Play, Clock, Users, Check, Package, BadgeDollarSign, BadgePercent, Trophy, Gem, Gamepad } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import HenryButton from "@/components/HenryButton";

const features = [
  {
    title: "Mental Wellness Tools", 
    description: "Access evidence-based resources and exercises for your mental health journey.",
    icon: Brain,
    path: "/mental-wellness-tools"
  },
  {
    title: "Real-Time Therapy",
    description: "Connect with licensed therapists instantly through secure video sessions.",
    icon: MessageCircle,
    path: "/real-time-therapy"
  },
  {
    title: "My Sponsor",
    description: "Access NA program resources and connect with a digital sponsor anytime.",
    icon: HeartHandshake,
    path: "/my-sponsor"
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
  {
    title: "Classes & Events",
    description: "Join live virtual classes, support groups and workshops for your wellbeing.",
    icon: Users,
    path: "/virtual-meetings"
  },
  {
    title: "Mental Health Games",
    description: "Engage with interactive games designed to boost cognitive skills and emotional intelligence.",
    icon: Gamepad,
    path: "/mental-health-games"
  }
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

const workshops = [
  {
    title: "Stress Management",
    description: "Learn effective techniques to manage daily stress and build resilience.",
    time: "45 minutes",
    icon: Brain,
    color: "bg-[#9b87f5]/10 border-[#9b87f5]/30 text-[#9b87f5]"
  },
  {
    title: "Mindful Communication",
    description: "Develop mindfulness skills for healthier relationships and conversations.",
    time: "45 minutes",
    icon: MessageCircle,
    color: "bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]"
  },
  {
    title: "Emotional Regulation",
    description: "Discover tools to understand and regulate your emotional responses.",
    time: "45 minutes",
    icon: HeartHandshake,
    color: "bg-[#0EA5E9]/10 border-[#0EA5E9]/30 text-[#0EA5E9]"
  }
];

const subscriptionPlans = [
  {
    title: "Basic",
    price: "Free",
    description: "Start your mental health journey with essential features",
    features: [
      "Access to essential mental wellness tools",
      "Join virtual meetings and classes",
      "Digital sponsor access",
      "Limited workshop access"
    ],
    icon: Package,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    recommended: false
  },
  {
    title: "Gold",
    price: "$5/month",
    description: "Enhanced features for a more personalized experience",
    features: [
      "5% bonus on all co-pay credits",
      "Access to all mental wellness tools",
      "Extended workshop library",
      "Priority access to virtual meetings",
      "Personalized wellness plan"
    ],
    icon: Trophy,
    color: "bg-[#FEF7CD] text-[#B87333] border-[#B87333]/30",
    recommended: true
  },
  {
    title: "Platinum",
    price: "$10/month",
    description: "Our most comprehensive mental health package",
    features: [
      "10% bonus on all co-pay credits",
      "Unlimited access to all platform features",
      "Premium workshop content",
      "Early access to new features",
      "Advanced analytics and insights",
      "Personalized wellness roadmap"
    ],
    icon: Gem,
    color: "bg-[#E5DEFF] text-[#7E69AB] border-[#7E69AB]/30",
    recommended: false
  }
];

const Index = () => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main'>('intro');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state && location.state.screenState) {
      setScreenState(location.state.screenState);
      window.history.replaceState({}, document.title);
    } else if (location.state && location.state.returnToIntro) {
      setScreenState('intro');
      window.history.replaceState({}, document.title);
    } else {
      const timer = setTimeout(() => {
        if (screenState === 'intro') {
          setScreenState('mood');
        }
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [location.state, screenState]);

  useEffect(() => {
    if (screenState === 'main') {
      setShowCoPayCredit(true);
    }
  }, [screenState]);

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
    
    setScreenState('subscription');
  };

  const handlePrevious = () => {
    if (screenState === 'mood') {
      setScreenState('intro');
    } else if (screenState === 'moodResponse') {
      setScreenState('mood');
    } else if (screenState === 'register') {
      setScreenState('moodResponse');
    } else if (screenState === 'subscription') {
      setScreenState('moodResponse'); 
    } else if (screenState === 'visionBoard') {
      setScreenState('subscription');
    } else if (screenState === 'main') {
      setScreenState('visionBoard');
    }
  };

  const handleSkip = () => {
    if (screenState === 'register' || screenState === 'moodResponse') {
      setScreenState('subscription');
    } else if (screenState === 'subscription') {
      setScreenState('visionBoard');
    } else {
      setScreenState('main');
    }
  };

  const handleSubscriptionSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    toast({
      title: `${planTitle} Plan Selected`,
      description: `You have selected the ${planTitle} subscription plan.`,
    });
  };

  const handleSubscriptionContinue = () => {
    if (!selectedPlan) {
      toast({
        title: "Please Select a Plan",
        description: "Please select a subscription plan to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Plan Confirmed",
      description: `Your ${selectedPlan} plan is now active. Enjoy your benefits!`,
    });
    
    setScreenState('visionBoard');
  };

  const handleVisionBoardContinue = () => {
    if (selectedQualities.length < 2 || selectedGoals.length < 2) {
      toast({
        title: "More Selections Needed",
        description: "Please select at least 2 qualities and 2 goals to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Vision Board Created",
      description: "Your personalized mental wellness journey is ready!",
    });
    
    setScreenState('main');
  };

  const navigateToFeature = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path, { state: { 
        qualities: selectedQualities, 
        goals: selectedGoals 
      }});
    }
  };

  return (
    <div className="relative">
      <CoPayCreditPopup open={showCoPayCredit} onOpenChange={setShowCoPayCredit} />
      
      {screenState !== 'intro' && (
        <HenryButton 
          className="fixed bottom-4 right-4 z-50" 
          isOpen={showHenry} 
          onOpenChange={setShowHenry}
        />
      )}

      {screenState === 'intro' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] overflow-hidden relative">
          <div className="floating-bg"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                alt="Copper Outline Logo" 
                className="w-40 md:w-48 mx-auto intro-logo-icon"
              />
            </div>
            <h1 className="intro-logo-text text-6xl md:text-8xl mb-8">
              <span className="text-white">Thrive</span>
              <span className="gradient-heading ml-2" style={{ 
                textShadow: '0 0 10px rgba(184, 115, 51, 0.8), 0 0 20px rgba(184, 115, 51, 0.4)' 
              }}>MT</span>
            </h1>
            <p className="intro-tagline text-xl md:text-2xl text-gray-300">
              because life should be more than just surviving
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button 
                className="group bg-[#B87333] hover:bg-[#B87333]/80 hero-button"
                onClick={() => setScreenState('mood')}
              >
                Begin Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                className="group bg-transparent border border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
                onClick={handleSkip}
              >
                Skip to Main
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'mood' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] animate-fade-in relative overflow-hidden">
          <div className="floating-bg"></div>
          <div className="text-center max-w-md mx-auto px-4 z-10">
            <h2 className="text-2xl md:text-3xl text-white mb-8 gradient-heading">
              How are you feeling today?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-4 mb-4">
              <button 
                onClick={() => {
                  setSelectedMood('happy');
                  setScreenState('moodResponse');
                }}
                className="mood-button group"
              >
                <Smile className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
                <span className="text-xs text-white mt-1 block">Happy</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedMood('ok');
                  setScreenState('moodResponse');
                }}
                className="mood-button group"
              >
                <Annoyed className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
                <span className="text-xs text-white mt-1 block">Just Ok</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedMood('neutral');
                  setScreenState('moodResponse');
                }}
                className="mood-button group"
              >
                <Meh className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
                <span className="text-xs text-white mt-1 block">Neutral</span>
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-4">
              <button 
                onClick={() => {
                  setSelectedMood('down');
                  setScreenState('moodResponse');
                }}
                className="mood-button group"
              >
                <HeartCrack className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
                <span className="text-xs text-white mt-1 block">Feeling Down</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedMood('sad');
                  setScreenState('moodResponse');
                }}
                className="mood-button group"
              >
                <Frown className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
                <span className="text-xs text-white mt-1 block">Sad</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedMood('overwhelmed');
                  setScreenState('moodResponse');
                }}
                className="mood-button group"
              >
                <Angry className="w-12 h-12 md:w-14 md:h-14 text-[#B87333] transition-all duration-300" />
                <span className="text-xs text-white mt-1 block">Overwhelmed</span>
              </button>
            </div>
            <div className="mt-10 flex justify-center gap-4">
              <Button 
                className="group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2 hero-button"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                className="group bg-transparent border border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
                onClick={handleSkip}
              >
                Skip to Main
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'moodResponse' && selectedMood === 'happy' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F2FCE2] to-[#F2FCE2]/70 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Smile className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg animate-pulse" />
            <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Positive Affirmations</h2>
            <div className="space-y-4 mb-10">
              {positiveAffirmations.map((affirmation, index) => (
                <p key={index} className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: 'fadeInText 1s ease-out forwards',
                  opacity: 0
                }}>
                  {affirmation}
                </p>
              ))}
            </div>
            <Button 
              className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
              onClick={() => setScreenState('register')}
            >
              Continue to Register
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </div>
        </div>
      )}

      {screenState === 'moodResponse' && selectedMood === 'ok' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F1F0FB] to-[#F1F0FB]/70 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Annoyed className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg" style={{animation: 'floatAnimation 4s ease-in-out infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">It's Okay to Just Be Okay</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                Some days are just "okay" - and that's perfectly fine.
              </p>
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                You don't have to be at your best or your worst. The middle ground is valid too.
              </p>
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.6s'}}>
                Embrace the ordinary moments - they're the ones that make up most of life.
              </p>
            </div>
            <Button 
              className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
              onClick={() => setScreenState('register')}
            >
              Continue to Register
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </div>
        </div>
      )}

      {screenState === 'moodResponse' && selectedMood === 'neutral' && (
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
              className="ml-4 group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </div>
        </div>
      )}

      {screenState === 'moodResponse' && selectedMood === 'down' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] animate-fade-in">
          <div className="text-center max-w-2xl mx-auto px-4">
            <HeartCrack className="w-20 h-20 mx-auto mb-8 text-[#B87333]" />
            <h2 className="text-3xl md:text-4xl mb-8">When You're Feeling Down</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light">
                It's natural to have low moments - they're part of everyone's experience.
              </p>
              <p className="text-xl md:text-2xl font-light">
                Be gentle with yourself today. Small acts of self-care can make a difference.
              </p>
              <p className="text-xl md:text-2xl font-light">
                Remember that this feeling will pass, even when it doesn't feel like it now.
              </p>
            </div>
            <Button 
              className="group"
              onClick={() => setScreenState('register')}
            >
              Continue to Register
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </div>
        </div>
      )}

      {screenState === 'moodResponse' && selectedMood === 'sad' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#221F26] text-white animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ea384c%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Angry className="w-20 h-20 mx-auto mb-8 text-[#ea384c] filter drop-shadow-lg" style={{animation: 'pulseGlow 2s infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8" style={{color: '#ea384c', textShadow: '0 0 10px rgba(234, 56, 76, 0.3)'}}>When It's All Too Much</h2>
            <p className="text-xl mb-6" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0}}>
              If you're feeling overwhelmed and struggling to cope, please consider these steps:
            </p>
            <div className="space-y-4 mb-8">
              <div className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10 emergency-card" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                <h3 className="text-xl font-medium">Take a Breath</h3>
                <p className="my-2">Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, exhale for 8.</p>
              </div>
              <div className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10 emergency-card" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                <h3 className="text-xl font-medium">Step Away</h3>
                <p className="my-2">If possible, step away from triggers temporarily to reset your system.</p>
              </div>
              <div className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10 emergency-card" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.6s'}}>
                <h3 className="text-xl font-medium">Reach Out</h3>
                <p className="my-2">Contact a trusted friend, family member, or mental health professional.</p>
              </div>
            </div>
            <div className="p-4 border-2 border-[#ea384c] rounded-lg bg-[#ea384c]/10 mb-8 emergency-card" style={{animation: 'pulseGlow 3s infinite'}}>
              <h3 className="text-xl font-bold">Crisis Resources</h3>
              <p className="text-2xl font-bold text-[#ea384c] my-2">988</p>
              <p className="opacity-80">National Suicide Prevention Lifeline - Available 24/7</p>
            </div>
            <Button 
              className="group bg-[#ea384c] hover:bg-[#ea384c]/90 hero-button"
              onClick={() => setScreenState('register')}
            >
              Continue When Ready
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </div>
        </div>
      )}

      {screenState === 'moodResponse' && selectedMood === 'overwhelmed' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#221F26] text-white animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ea384c%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Angry className="w-20 h-20 mx-auto mb-8 text-[#ea384c] filter drop-shadow-lg" style={{animation: 'pulseGlow 2s infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8" style={{color: '#ea384c', textShadow: '0 0 10px rgba(234, 56, 76, 0.3)'}}>When It's All Too Much</h2>
            <p className="text-xl mb-6" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0}}>
              If you're feeling overwhelmed and struggling to cope, please consider these steps:
            </p>
            <div className="space-y-4 mb-8">
              <div className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10 emergency-card" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                <h3 className="text-xl font-medium">Take a Breath</h3>
                <p className="my-2">Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, exhale for 8.</p>
              </div>
              <div className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10 emergency-card" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                <h3 className="text-xl font-medium">Step Away</h3>
                <p className="my-2">If possible, step away from triggers temporarily to reset your system.</p>
              </div>
              <div className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10 emergency-card" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.6s'}}>
                <h3 className="text-xl font-medium">Reach Out</h3>
                <p className="my-2">Contact a trusted friend, family member, or mental health professional.</p>
              </div>
            </div>
            <div className="p-4 border-2 border-[#ea384c] rounded-lg bg-[#ea384c]/10 mb-8 emergency-card" style={{animation: 'pulseGlow 3s infinite'}}>
              <h3 className="text-xl font-bold">Crisis Resources</h3>
              <p className="text-2xl font-bold text-[#ea384c] my-2">988</p>
              <p className="opacity-80">National Suicide Prevention Lifeline - Available 24/7</p>
            </div>
            <Button 
              className="group bg-[#ea384c] hover:bg-[#ea384c]/90 hero-button"
              onClick={() => setScreenState('register')}
            >
              Continue When Ready
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              className="ml-4 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          </div>
        </div>
      )}

      {screenState === 'register' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9] animate-fade-in">
          <div className="text-center max-w-md mx-auto px-4">
            <UserRound className="w-16 h-16 mx-auto mb-8 text-[#B87333]" />
            <h2 className="text-3xl md:text-4xl mb-8">Create Your Account</h2>
            <form onSubmit={handleRegister} className="space-y-4 text-left mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={userInfo.password}
                    onChange={handleUserInfoChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent"
                    placeholder="********"
                  />
                  <div className="text-xs text-gray-500 mt-1 ml-1">Your password is securely masked</div>
                </div>
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
              >
                Create Account
              </Button>
            </form>
            <div className="flex justify-center gap-4">
              <Button 
                className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                className="group bg-transparent text-[#B87333] hover:bg-[#B87333]/10"
                onClick={() => setScreenState('subscription')}
              >
                Skip for now
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'subscription' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9] animate-fade-in py-8">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl mb-2 font-bold text-gray-900">Choose Your Plan</h2>
              <p className="text-lg text-gray-600">Select the subscription level that works best for your mental wellness journey</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {subscriptionPlans.map((plan) => (
                <Card 
                  key={plan.title} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    selectedPlan === plan.title 
                      ? "border-[#B87333] shadow-md" 
                      : "border-transparent hover:border-[#B87333]/50"
                  } ${plan.color}`}
                  onClick={() => handleSubscriptionSelect(plan.title)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <plan.icon className="h-8 w-8" />
                      {plan.recommended && (
                        <span className="px-2 py-1 text-xs rounded-full bg-[#B87333]/10 text-[#B87333] font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                    <CardDescription className="text-xl font-bold mt-1">{plan.price}</CardDescription>
                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-[#B87333] shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        selectedPlan === plan.title 
                          ? "bg-[#B87333] hover:bg-[#B87333]/90 text-white" 
                          : "bg-transparent border border-[#B87333]/70 text-[#B87333] hover:bg-[#B87333]/10"
                      }`}
                      onClick={() => handleSubscriptionSelect(plan.title)}
                    >
                      {selectedPlan === plan.title ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                className="group bg-[#B87333] hover:bg-[#B87333]/90"
                onClick={handleSubscriptionContinue}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                className="group bg-transparent border border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
                onClick={() => setScreenState('visionBoard')}
              >
                Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'visionBoard' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f9f9f9] to-[#f0f0f0] animate-fade-in py-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4 text-center gradient-heading">Create Your Vision Board</h2>
              <p className="text-lg text-gray-600">Select at least 2 qualities you'd like to embody and 2 goals you're working toward</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#B87333]">I want to feel...</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {visionBoardQualities.map((quality) => (
                    <button
                      key={quality.id}
                      onClick={() => toggleQuality(quality.id)}
                      className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedQualities.includes(quality.id)
                          ? "bg-[#B87333] text-white shadow-md transform scale-105"
                          : "bg-white border border-gray-300 hover:border-[#B87333]/70 hover:bg-[#B87333]/10"
                      }`}
                    >
                      {quality.label}
                    </button>
                  ))}
                </div>
                {selectedQualities.length < 2 && (
                  <p className="text-amber-600 mt-2 text-sm">Please select at least 2 qualities</p>
                )}
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#B87333]">I'm working on...</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {visionBoardGoals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                        selectedGoals.includes(goal.id)
                          ? "bg-[#B87333] text-white shadow-md transform scale-105"
                          : "bg-white border border-gray-300 hover:border-[#B87333]/70 hover:bg-[#B87333]/10"
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
                {selectedGoals.length < 2 && (
                  <p className="text-amber-600 mt-2 text-sm">Please select at least 2 goals</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                className="group bg-[#B87333] hover:bg-[#B87333]/90"
                onClick={handleVisionBoardContinue}
              >
                Continue to Thrive
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'main' && (
        <div className="min-h-screen bg-[#f9f9f9] animate-fade-in">
          <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to <span className="gradient-heading">Thrive MT</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-xl">
                    Your personalized mental wellness journey begins here. 
                    Explore our tools, connect with therapists, and join our supportive community.
                  </p>
                </div>
                <img 
                  src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                  alt="Thrive MT Logo" 
                  className="w-40 md:w-48"
                />
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Monthly Feature</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {workshops.map((workshop, index) => (
                <Card 
                  key={index}
                  className={`border ${workshop.color} hover:shadow-lg transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <workshop.icon className={`h-10 w-10 ${workshop.color.split("border-")[1].split(" ")[0]}`} />
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{workshop.time}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{workshop.title}</CardTitle>
                    <CardDescription>{workshop.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full bg-white border hover:bg-gray-50">
                      <Link to="/workshops" className="flex items-center gap-2 w-full justify-center">
                        Join Now
                        <Play className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-[#B87333]/30 hover:border-[#B87333]"
                  onClick={() => navigateToFeature(feature.path)}
                >
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-[#B87333] mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#B87333]/10 hover:bg-[#B87333]/20 text-[#B87333]"
                      onClick={() => navigateToFeature(feature.path)}
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Your Vision Board</h2>
              <Card className="border-[#B87333]/30">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#B87333] mb-4">Qualities You Want to Embody</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedQualities.map((id) => {
                          const quality = visionBoardQualities.find(q => q.id === id);
                          return quality ? (
                            <span key={id} className="px-3 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full">
                              {quality.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#B87333] mb-4">Goals You're Working Toward</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedGoals.map((id) => {
                          const goal = visionBoardGoals.find(g => g.id === id);
                          return goal ? (
                            <span key={id} className="px-3 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full">
                              {goal.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#B87333]/10 hover:bg-[#B87333]/20 text-[#B87333]"
                    onClick={() => setScreenState('visionBoard')}
                  >
                    Update Vision Board
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <Button
                className="bg-[#B87333] hover:bg-[#B87333]/90"
                onClick={() => navigate('/virtual-meetings')}
              >
                View All Classes & Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
