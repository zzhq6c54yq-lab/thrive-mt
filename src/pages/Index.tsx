
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, ArrowLeft, Annoyed, HeartCrack, Angry, HeartHandshake, UserRound, Play, Clock, Users, Check, Package, BadgeDollarSign, BadgePercent, Trophy, Gem } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import HenryIntroDialog from "@/components/HenryIntroDialog";

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
  const [showHenryIntro, setShowHenryIntro] = useState(false);
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
    if (location.state && location.state.returnToIntro) {
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
      setScreenState('register');
    } else if (screenState === 'visionBoard') {
      setScreenState('subscription');
    } else if (screenState === 'main') {
      setScreenState('visionBoard');
    }
  };

  const handleSkip = () => {
    setScreenState('main');
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
    if (selectedQualities.length === 0 && selectedGoals.length === 0) {
      toast({
        title: "Vision Board Empty",
        description: "Please select at least one quality or goal to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Vision Board Created",
      description: "Your personalized mental wellness journey is ready!",
    });
    
    setScreenState('main');
    
    // Show Henry intro after a short delay
    setTimeout(() => {
      setShowHenryIntro(true);
    }, 1500);
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
    <div>
      <CoPayCreditPopup open={showCoPayCredit} onOpenChange={setShowCoPayCredit} />
      <HenryIntroDialog open={showHenryIntro} onOpenChange={setShowHenryIntro} />

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
            <Frown className="w-20 h-20 mx-auto mb-8 text-[#ea384c] filter drop-shadow-lg" style={{animation: 'pulseGlow 2s infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8" style={{color: '#ea384c', textShadow: '0 0 10px rgba(234, 56, 76, 0.3)'}}>Emergency Resources</h2>
            <p className="text-xl mb-6" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0}}>
              If you're experiencing a mental health crisis, please reach out to one of these resources immediately:
            </p>
            <div className="space-y-6 mb-10">
              {emergencyResources.map((resource, index) => (
                <div key={index} className="p-4 border border-[#ea384c]/20 rounded-lg bg-[#ea384c]/10 emergency-card" style={{
                  animation: 'fadeInText 1s ease-out forwards',
                  opacity: 0,
                  animationDelay: `${index * 0.2}s`
                }}>
                  <h3 className="text-xl font-medium">{resource.name}</h3>
                  <p className="text-2xl font-bold text-[#ea384c] my-2">{resource.contact}</p>
                  <p className="text-sm opacity-80">{resource.description}</p>
                </div>
              ))}
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg z-10">
            <h2 className="text-3xl font-medium text-center mb-8">Create Your Account</h2>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#B87333] focus:border-[#B87333]"
                    placeholder="John Doe"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#B87333] focus:border-[#B87333]"
                    placeholder="john.doe@example.com"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#B87333] focus:border-[#B87333]"
                    placeholder="••••••••"
                    value={userInfo.password}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </div>
              <div>
                <Button 
                  type="submit"
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/90 hero-button"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            <div className="mt-6 flex justify-between">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-500 hover:text-[#B87333]"
                onClick={handleSkip}
              >
                Skip for Now
              </Button>
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      )}

      {screenState === 'subscription' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="max-w-4xl w-full mx-auto px-4 py-8 z-10">
            <h2 className="text-3xl font-medium text-center mb-4">Choose Your Subscription Plan</h2>
            <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto">
              Select the plan that best suits your mental wellness journey. You can upgrade or downgrade at any time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {subscriptionPlans.map((plan) => (
                <Card 
                  key={plan.title}
                  className={`border-2 transition-all duration-300 ${
                    selectedPlan === plan.title 
                      ? 'border-[#B87333] shadow-lg transform scale-105' 
                      : 'border-transparent hover:border-gray-300'
                  } ${plan.recommended ? 'relative' : ''}`}
                  onClick={() => handleSubscriptionSelect(plan.title)}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#B87333] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  <CardHeader className={`text-center pb-2 ${plan.color}`}>
                    <plan.icon className="h-10 w-10 mx-auto mb-2" />
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    <ul className="text-left space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#B87333] mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        selectedPlan === plan.title 
                          ? 'bg-[#B87333] hover:bg-[#B87333]/90' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                      onClick={() => handleSubscriptionSelect(plan.title)}
                    >
                      {selectedPlan === plan.title ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button 
                className="bg-[#B87333] hover:bg-[#B87333]/90 hero-button"
                onClick={handleSubscriptionContinue}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'visionBoard' && (
        <div className="min-h-screen flex flex-col items-center bg-[#F5F5F7] animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="max-w-4xl w-full mx-auto px-4 py-12 z-10">
            <h2 className="text-3xl font-medium text-center mb-4">Create Your Vision Board</h2>
            <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto">
              Select the qualities you want to cultivate and the goals you want to achieve on your mental wellness journey.
            </p>
            
            <div className="mb-10">
              <h3 className="text-xl font-medium mb-4">Qualities I Want to Cultivate</h3>
              <div className="flex flex-wrap gap-3">
                {visionBoardQualities.map((quality) => (
                  <Button
                    key={quality.id}
                    variant="outline"
                    className={`rounded-full transition-all ${
                      selectedQualities.includes(quality.id)
                        ? 'bg-[#B87333]/10 text-[#B87333] border-[#B87333]'
                        : 'hover:bg-[#B87333]/10 hover:text-[#B87333] hover:border-[#B87333]'
                    }`}
                    onClick={() => toggleQuality(quality.id)}
                  >
                    {quality.label}
                    {selectedQualities.includes(quality.id) && (
                      <Check className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-medium mb-4">Goals I Want to Achieve</h3>
              <div className="flex flex-wrap gap-3">
                {visionBoardGoals.map((goal) => (
                  <Button
                    key={goal.id}
                    variant="outline"
                    className={`rounded-full transition-all ${
                      selectedGoals.includes(goal.id)
                        ? 'bg-[#B87333]/10 text-[#B87333] border-[#B87333]'
                        : 'hover:bg-[#B87333]/10 hover:text-[#B87333] hover:border-[#B87333]'
                    }`}
                    onClick={() => toggleGoal(goal.id)}
                  >
                    {goal.label}
                    {selectedGoals.includes(goal.id) && (
                      <Check className="ml-1 h-4 w-4" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Featured Workshops</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workshops.map((workshop, index) => (
                  <Card key={index} className={`border ${workshop.color.split(' ')[0]} hover:shadow-md transition-all`}>
                    <CardHeader className="pb-2">
                      <div className={`p-2 rounded-lg ${workshop.color.split(' ').pop()} w-fit`}>
                        <workshop.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{workshop.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {workshop.time}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{workshop.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button 
                className="bg-[#B87333] hover:bg-[#B87333]/90 hero-button"
                onClick={handleVisionBoardContinue}
              >
                Create My Vision Board
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'main' && (
        <div className="min-h-screen flex flex-col bg-white">
          {/* Hero Section */}
          <div className="relative bg-[#1a1a1f] text-white py-16 overflow-hidden">
            <div className="floating-bg"></div>
            <div className="container px-4 max-w-6xl mx-auto relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-light mb-4">Welcome to <span className="gradient-heading">Thrive MT</span></h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Your personalized mental wellness platform designed to support your journey to better mental health.
                  </p>
                  <Button 
                    onClick={() => navigateToFeature("/mental-wellness-tools")}
                    className="bg-[#B87333] hover:bg-[#B87333]/80 hero-button"
                  >
                    Explore Wellness Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png" 
                    alt="Mental Wellness Illustration" 
                    className="w-full max-w-md mx-auto" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Section */}
          <div className="py-16 bg-[#F5F5F7]">
            <div className="container px-4 max-w-6xl mx-auto">
              <h2 className="text-3xl font-light text-center mb-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="feature-card bg-white border-none overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="mb-4">
                        <div className="bg-[#B87333]/10 w-12 h-12 rounded-lg flex items-center justify-center">
                          <feature.icon className="h-6 w-6 text-[#B87333]" />
                        </div>
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button 
                        onClick={() => navigateToFeature(feature.path)}
                        className="w-full bg-[#B87333] hover:bg-[#B87333]/90 mt-4"
                      >
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Upcoming Classes & Events */}
          <div className="py-16 bg-white">
            <div className="container px-4 max-w-6xl mx-auto">
              <h2 className="text-3xl font-light text-center mb-6">Upcoming Classes & Events</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Join live virtual classes, support group meetings, and workshops led by certified mental health professionals.
              </p>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium">Today's Schedule</h3>
                  <Button 
                    onClick={() => navigateToFeature("/virtual-meetings")}
                    variant="outline" 
                    className="text-[#B87333] border-[#B87333]"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium mb-2 bg-blue-100 text-blue-600">
                            Mental Health Class
                          </span>
                          <CardTitle className="text-lg">Mindfulness Meditation</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Today</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>2:00 PM - 2:30 PM</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>8 of 15 spots available</span>
                        </div>
                      </div>
                      <CardDescription className="mb-4">Learn practical mindfulness techniques for everyday life.</CardDescription>
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => navigateToFeature("/virtual-meetings")}
                        >
                          Join Meeting
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium mb-2 bg-purple-100 text-purple-600">
                            AA Meeting
                          </span>
                          <CardTitle className="text-lg">Serenity Group</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Today</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>6:00 PM - 7:00 PM</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>12 of 20 spots available</span>
                        </div>
                      </div>
                      <CardDescription className="mb-4">Share experiences, strength and hope in a supportive environment.</CardDescription>
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => navigateToFeature("/virtual-meetings")}
                        >
                          Join Meeting
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium mb-2 bg-green-100 text-green-600">
                            NA Meeting
                          </span>
                          <CardTitle className="text-lg">Recovery Path</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Today</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>7:00 PM - 8:00 PM</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>15 of 20 spots available</span>
                        </div>
                      </div>
                      <CardDescription className="mb-4">Discussion centered around daily living in sobriety.</CardDescription>
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => navigateToFeature("/virtual-meetings")}
                        >
                          Join Meeting
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          {/* Workshops Section */}
          <div className="py-16 bg-[#F5F5F7]">
            <div className="container px-4 max-w-6xl mx-auto">
              <h2 className="text-3xl font-light text-center mb-6">Featured Workshops</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Guided 45-minute sessions with Henry to improve your mental wellbeing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {workshops.map((workshop, index) => (
                  <Card key={index} className={`border ${workshop.color.split(' ')[0]} hover:shadow-md transition-all`}>
                    <CardHeader>
                      <div className={`p-2 rounded-lg ${workshop.color.split(' ').pop()} w-fit`}>
                        <workshop.icon className="h-5 w-5" />
                      </div>
                      <div className="mt-4">
                        <CardTitle>{workshop.title}</CardTitle>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {workshop.time}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{workshop.description}</p>
                      <Button 
                        className="w-full"
                        onClick={() => navigateToFeature("/workshops")}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Workshop
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="bg-white"
                  onClick={() => navigateToFeature("/workshops")}
                >
                  View All Workshops
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Find a Therapist CTA */}
          <div className="py-16 bg-[#1a1a1f] text-white">
            <div className="container px-4 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-light mb-4">Find Your Perfect Therapist Match</h2>
                  <p className="text-xl text-gray-300 mb-6">
                    Connect with licensed therapists who specialize in your unique needs. Our matching system helps you find the right fit.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-[#B87333] mr-2 mt-1" />
                      <span>Personalized matching based on your preferences</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-[#B87333] mr-2 mt-1" />
                      <span>Licensed professionals specialized in various areas</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-[#B87333] mr-2 mt-1" />
                      <span>Flexible scheduling with video, phone, or in-person options</span>
                    </div>
                  </div>
                  <Button 
                    className="bg-[#B87333] hover:bg-[#B87333]/90 hero-button"
                    onClick={() => navigateToFeature("/therapist-questionnaire")}
                  >
                    Take Matching Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="hidden lg:block">
                  <img 
                    src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
                    alt="Therapist Consultation" 
                    className="w-full rounded-lg shadow-2xl" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="bg-white py-12 border-t">
            <div className="container px-4 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center">
                    <img 
                      src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                      alt="Thrive MT Logo" 
                      className="w-10 h-10 mr-2" 
                    />
                    <span className="text-2xl font-medium">
                      Thrive<span className="text-[#B87333]">MT</span>
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Your journey to better mental health
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="ghost" className="text-gray-600 hover:text-[#B87333]">
                      Privacy
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-[#B87333]">
                      Terms
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-[#B87333]">
                      Help
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-[#B87333]">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Thrive MT. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
