import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, ArrowLeft, Annoyed, HeartCrack, Angry, HeartHandshake, UserRound, Play, Clock, Users, Check, Package, BadgeDollarSign, BadgePercent, Trophy, Gem, Gamepad, FileText, Activity, Star, Book, MessagesSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
    title: "Personalized Content",
    description: "Tailored articles, videos, and exercises based on your preferences and progress.",
    icon: Star,
    path: "/personalized-content"
  },
  {
    title: "Community Support",
    description: "Forums and chat groups where you can connect and share experiences with others.",
    icon: MessagesSquare,
    path: "/community-support"
  },
  {
    title: "Resource Library",
    description: "Access to helpful resources such as hotlines, articles, and self-help guides.",
    icon: Book,
    path: "/resource-library"
  },
  {
    title: "Feedback & Progress",
    description: "Regular updates on your progress and insights based on your activities.",
    icon: Activity,
    path: "/progress-reports"
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
    id: "stress-management",
    title: "Stress Management",
    description: "Learn effective techniques to manage daily stress and build resilience.",
    time: "45 minutes",
    icon: Brain,
    color: "bg-[#9b87f5]/10 border-[#9b87f5]/30 text-[#9b87f5]",
    accentColor: "#9b87f5"
  },
  {
    id: "mindful-communication",
    title: "Mindful Communication",
    description: "Develop mindfulness skills for healthier relationships and conversations.",
    time: "45 minutes",
    icon: MessageCircle,
    color: "bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]",
    accentColor: "#F97316"
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation",
    description: "Discover tools to understand and regulate your emotional responses.",
    time: "45 minutes",
    icon: HeartHandshake,
    color: "bg-[#0EA5E9]/10 border-[#0EA5E9]/30 text-[#0EA5E9]",
    accentColor: "#0EA5E9"
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
      setShowHenry(false);
    }
  }, [screenState]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (showHenry && henryRef.current) {
      const henryWidth = henryRef.current.offsetWidth;
      const henryHeight = henryRef.current.offsetHeight;
      
      const targetX = Math.max(20, Math.min(mousePosition.x - henryWidth/2, window.innerWidth - henryWidth - 20));
      const targetY = Math.max(20, Math.min(mousePosition.y + 100, window.innerHeight - henryHeight - 20));
      
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
      
      setHenryPosition(prev => ({
        x: lerp(prev.x, targetX, 0.05),
        y: lerp(prev.y, targetY, 0.05)
      }));
    }
  }, [mousePosition, showHenry]);

  const toggleHenry = () => {
    setShowHenry(prev => !prev);
  };

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
      
      {showHenry && (
        <HenryButton 
          isOpen={showHenry} 
          onOpenChange={setShowHenry}
          userName={userInfo.name}
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

      {screenState === 'moodResponse' && selectedMood === 'sad' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#221F26] text-white animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ea384c%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Frown className="w-20 h-20 mx-auto mb-8 text-[#ea384c] filter drop-shadow-lg" style={{animation: 'pulseGlow 2s infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8 text-white">When Sadness Feels Heavy</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light">
                Your feelings are valid, and it's okay to not be okay sometimes.
              </p>
              <p className="text-xl md:text-2xl font-light">
                Sadness is a natural response to life's challenges, not a failure.
              </p>
              <p className="text-xl md:text-2xl font-light">
                Reaching out for support is a sign of strength, not weakness.
              </p>
            </div>
            <div className="bg-black/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#ea384c]">Emergency Resources</h3>
              <ul className="space-y-3 text-left">
                {emergencyResources.map((resource, index) => (
                  <li key={index} className="flex flex-col">
                    <span className="font-medium">{resource.name}</span>
                    <span className="text-white/80">{resource.contact} - {resource.description}</span>
                  </li>
                ))}
              </ul>
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

      {screenState === 'moodResponse' && selectedMood === 'overwhelmed' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1e1c24] text-white animate-fade-in">
          <div className="text-center max-w-2xl mx-auto px-4">
            <Angry className="w-20 h-20 mx-auto mb-8 text-[#B87333]" />
            <h2 className="text-3xl md:text-4xl mb-8">When It All Feels Too Much</h2>
            <div className="space-y-6 mb-10">
              <div className="bg-white/5 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-2">Breathe</h3>
                <p className="text-lg">Take 5 deep breaths, in through your nose for 4 counts, hold for 4, out through your mouth for 6.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-2">Ground Yourself</h3>
                <p className="text-lg">Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-2">One Thing at a Time</h3>
                <p className="text-lg">Focus on just one small, manageable task that you can accomplish right now.</p>
              </div>
            </div>
            <Button 
              className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
              onClick={() => setScreenState('register')}
            >
              Continue When Ready
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

      {screenState === 'register' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] animate-fade-in">
          <div className="max-w-md w-full mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
              <p className="text-gray-600">Join Thrive MT to start your mental wellness journey</p>
            </div>
            <form onSubmit={handleRegister} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input 
                    type="password"
                    id="password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleUserInfoChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="pt-2">
                <Button 
                  type="submit"
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                >
                  Register
                </Button>
              </div>
            </form>
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                variant="outline"
                onClick={handleSkip}
              >
                Skip for Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'subscription' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] to-[#2a2a35] text-white animate-fade-in py-10">
          <div className="max-w-5xl w-full mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Choose Your Plan</h2>
              <p className="text-xl text-gray-300">Select the subscription that best fits your mental wellness needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {subscriptionPlans.map((plan) => (
                <div 
                  key={plan.title}
                  className={`${plan.color} rounded-xl overflow-hidden transition-all duration-300 transform ${selectedPlan === plan.title ? 'scale-105 ring-2 ring-[#B87333]' : 'hover:scale-102'}`}
                  onClick={() => handleSubscriptionSelect(plan.title)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{plan.title}</h3>
                        <p className="text-xl font-semibold">{plan.price}</p>
                      </div>
                      <plan.icon className="h-8 w-8" />
                    </div>
                    <p className="mb-4 text-sm">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`p-4 border-t ${plan.recommended ? 'bg-[#B87333]/20 border-[#B87333]/30' : 'bg-black/5 border-gray-700/20'}`}>
                    <Button 
                      className={`w-full ${selectedPlan === plan.title ? 'bg-[#B87333] hover:bg-[#B87333]/90' : 'bg-black/30 hover:bg-black/40'}`}
                      onClick={() => handleSubscriptionSelect(plan.title)}
                    >
                      {selectedPlan === plan.title ? 'Selected' : 'Select Plan'}
                    </Button>
                  </div>
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-[#B87333] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Recommended
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <Button 
                variant="outline"
                className="border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                className="bg-[#B87333] hover:bg-[#B87333]/90 flex items-center gap-2"
                onClick={handleSubscriptionContinue}
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost"
                onClick={handleSkip}
              >
                Skip for Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'visionBoard' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] animate-fade-in py-10">
          <div className="max-w-4xl w-full mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1a1a1f]">Create Your Vision Board</h2>
              <p className="text-xl text-gray-600">Select qualities you want to embody and goals you want to achieve</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-[#B87333]">Qualities I Want to Embody</h3>
                <div className="flex flex-wrap gap-3">
                  {visionBoardQualities.map((quality) => (
                    <button
                      key={quality.id}
                      onClick={() => toggleQuality(quality.id)}
                      className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                        selectedQualities.includes(quality.id)
                          ? 'bg-[#B87333] text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {quality.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-[#B87333]">Goals I Want to Achieve</h3>
                <div className="flex flex-wrap gap-3">
                  {visionBoardGoals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${
                        selectedGoals.includes(goal.id)
                          ? 'bg-[#B87333] text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <Button 
                variant="outline"
                className="border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                className="bg-[#B87333] hover:bg-[#B87333]/90 flex items-center gap-2"
                onClick={handleVisionBoardContinue}
              >
                Create My Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost"
                onClick={handleSkip}
              >
                Skip for Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'main' && (
        <div className="min-h-screen animate-fade-in">
          <div className="bg-black py-8 border-b border-[#B87333]/30">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <img 
                    src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                    alt="Thrive MT Logo" 
                    className="h-16 mr-3 filter drop-shadow-[0_0_3px_rgba(184,115,51,0.4)] intro-logo-icon"
                  />
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                      <span className="gradient-heading">Thrive MT</span>
                    </h1>
                    <p className="gradient-heading text-sm md:text-base font-light">
                      Your personalized mental wellness journey begins here
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowHenry(true)}
                  variant="henry"
                  className="group flex items-center gap-2"
                >
                  <div className="h-6 w-6 rounded-full overflow-hidden border border-[#B87333]/50 group-hover:border-[#B87333] transition-all">
                    <img src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-white group-hover:text-[#B87333]/90 transition-colors">Meet Henry</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white py-10">
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                  <Calendar className="mr-2 h-6 w-6 text-[#B87333]" />
                  Monthly Featured Workshops
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {workshops.map((workshop) => (
                    <Card key={workshop.id} className={`overflow-hidden hover:shadow-md transition-shadow duration-300 border-2 ${workshop.color}`}>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg font-semibold">{workshop.title}</CardTitle>
                            <CardDescription className="mt-2">{workshop.description}</CardDescription>
                          </div>
                          <div className={`p-2 rounded-full ${workshop.color}`}>
                            <workshop.icon className="h-6 w-6" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock className="mr-2 h-4 w-4" />
                          {workshop.time}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 justify-end">
                        <Button
                          className={`text-white`}
                          style={{ backgroundColor: workshop.accentColor }}
                          onClick={() => navigate(`/workshop/${workshop.id}`)}
                        >
                          Join Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                <Gem className="mr-2 h-6 w-6 text-[#B87333]" />
                Mental Wellness Features
              </h2>
              
              <Tabs defaultValue="all" className="mb-12">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Features</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended For You</TabsTrigger>
                  <TabsTrigger value="popular">Most Popular</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                      <Card 
                        key={index}
                        className="overflow-hidden hover:shadow-md transition-all duration-300 hover:border-[#B87333]/50 cursor-pointer h-full"
                        onClick={() => navigateToFeature(feature.path)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{feature.title}</CardTitle>
                              <CardDescription className="mt-2">{feature.description}</CardDescription>
                            </div>
                            <div className="bg-[#B87333]/10 p-2 rounded-full">
                              <feature.icon className="h-6 w-6 text-[#B87333]" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardFooter className="pt-0 flex justify-end">
                          <Button 
                            variant="ghost" 
                            className="text-[#B87333] hover:text-[#B87333] hover:bg-[#B87333]/10"
                            onClick={() => navigateToFeature(feature.path)}
                          >
                            Explore
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="recommended">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.slice(0, 6).map((feature, index) => (
                      <Card 
                        key={index}
                        className="overflow-hidden hover:shadow-md transition-all duration-300 hover:border-[#B87333]/50 cursor-pointer"
                        onClick={() => navigateToFeature(feature.path)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{feature.title}</CardTitle>
                              <CardDescription className="mt-2">{feature.description}</CardDescription>
                            </div>
                            <div className="bg-[#B87333]/10 p-2 rounded-full">
                              <feature.icon className="h-6 w-6 text-[#B87333]" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardFooter className="pt-0 flex justify-end">
                          <Button 
                            variant="ghost" 
                            className="text-[#B87333] hover:text-[#B87333] hover:bg-[#B87333]/10"
                            onClick={() => navigateToFeature(feature.path)}
                          >
                            Explore
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="popular">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.slice(3, 9).map((feature, index) => (
                      <Card 
                        key={index}
                        className="overflow-hidden hover:shadow-md transition-all duration-300 hover:border-[#B87333]/50 cursor-pointer"
                        onClick={() => navigateToFeature(feature.path)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{feature.title}</CardTitle>
                              <CardDescription className="mt-2">{feature.description}</CardDescription>
                            </div>
                            <div className="bg-[#B87333]/10 p-2 rounded-full">
                              <feature.icon className="h-6 w-6 text-[#B87333]" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardFooter className="pt-0 flex justify-end">
                          <Button 
                            variant="ghost" 
                            className="text-[#B87333] hover:text-[#B87333] hover:bg-[#B87333]/10"
                            onClick={() => navigateToFeature(feature.path)}
                          >
                            Explore
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
