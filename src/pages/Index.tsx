import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, ArrowLeft, Annoyed, HeartCrack, Angry, HeartHandshake, Bot, Video, Clock, Users, Bell, BellRing, Crown, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import SponsorChatbot from "@/components/SponsorChatbot";
import { generateTodayClasses, VirtualClass } from "@/data/toolCategories";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import SubscriptionCard from "@/components/SubscriptionCard";

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
    title: "Virtual Classes",
    description: "Join live sessions and meetings facilitated by mental health experts.",
    icon: Video,
    path: "/virtual-classes"
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

const subscriptionPlans = [
  {
    title: "Free",
    price: "$0",
    coPayCredit: "5%",
    features: [
      { text: "Basic mental wellness tools" },
      { text: "Limited AI sponsor assistance" },
      { text: "Access to community support forums" },
      { text: "Daily mood tracking" }
    ],
    buttonVariant: "outline",
    buttonText: "Current Plan"
  },
  {
    title: "Gold",
    price: "$5",
    coPayCredit: "15%",
    features: [
      { text: "All Free features" },
      { text: "Advanced mental wellness tools" },
      { text: "Enhanced AI sponsor capabilities" },
      { text: "Guided meditation library" },
      { text: "Priority community support" }
    ],
    recommended: true,
    buttonVariant: "bronze"
  },
  {
    title: "Platinum",
    price: "$10",
    coPayCredit: "25%",
    features: [
      { text: "All Gold features" },
      { text: "Premium mental wellness tools" },
      { text: "Advanced emotional intelligence training" },
      { text: "Personalized wellness plan" },
      { text: "1-on-1 coaching sessions" },
      { text: "24/7 crisis support" }
    ],
    buttonVariant: "animated_bronze"
  }
];

const Index = () => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'register' | 'visionBoard' | 'main'>('intro');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showHenryDialog, setShowHenryDialog] = useState<boolean>(false);
  const [henryDialogStep, setHenryDialogStep] = useState<number>(0);
  const [showHenryChatDialog, setShowHenryChatDialog] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; password: string; }>({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state) {
      const { returnToIntro, skipToMain } = location.state as { returnToIntro?: boolean, skipToMain?: boolean };
      if (returnToIntro) {
        setScreenState('intro');
      } else if (skipToMain) {
        setScreenState('main');
      }
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
    
    setScreenState('visionBoard');
  };

  const handlePrevious = () => {
    if (screenState === 'mood') {
      setScreenState('intro');
    } else if (screenState === 'moodResponse') {
      setScreenState('mood');
    } else if (screenState === 'register') {
      setScreenState('moodResponse');
    } else if (screenState === 'visionBoard') {
      setScreenState('register');
    } else if (screenState === 'main') {
      setScreenState('visionBoard');
    }
  };

  const handleSkip = () => {
    setScreenState('main');
  };

  const handleSkipRegistration = () => {
    setScreenState('visionBoard');
    
    toast({
      title: "Registration skipped",
      description: "You can register later to save your progress.",
    });
  };

  const getPersonalizedHenryMessage = () => {
    let message = "I'm here to support you on your mental health journey.";
    
    if (selectedMood) {
      switch (selectedMood) {
        case 'happy':
          message = "I'm glad you're feeling happy today! I'll help you maintain that positive energy.";
          break;
        case 'ok':
          message = "Even on just okay days, I'm here to listen and support you.";
          break;
        case 'neutral':
          message = "I'm here for you, whether your day is going well or you need some extra support.";
          break;
        case 'down':
          message = "On the days when you're feeling down, I'm here to remind you that you're not alone.";
          break;
        case 'sad':
          message = "I see you're having a difficult day. Remember, it's okay to not be okay, and I'm here to support you.";
          break;
        case 'overwhelmed':
          message = "When everything feels like too much, I'm here to help you find your center again.";
          break;
        default:
          break;
      }
    }
    
    if (selectedQualities.length > 0) {
      const qualityLabels = selectedQualities.map(id => 
        visionBoardQualities.find(q => q.id === id)?.label
      ).filter(Boolean);
      
      if (qualityLabels.length > 0) {
        message += ` I'll help you cultivate ${qualityLabels.join(', ')} in your daily life.`;
      }
    }
    
    return message;
  };

  const nextHenryStep = () => {
    if (henryDialogStep < 5) {
      setHenryDialogStep(henryDialogStep + 1);
    } else {
      setShowHenryDialog(false);
      setHenryDialogStep(0);
    }
  };

  const resetHenryDialog = () => {
    setHenryDialogStep(0);
  };

  return (
    <>
      <CoPayCreditPopup open={showCoPayCredit} onOpenChange={setShowCoPayCredit} />

      <Dialog open={showHenryDialog} onOpenChange={setShowHenryDialog}>
        <DialogContent className="sm:max-w-md" onCloseAutoFocus={() => resetHenryDialog()}>
          {henryDialogStep === 0 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Bot className="h-6 w-6 text-[#B87333]" /> 
                  <span>Meet <span className="text-[#B87333]">H.E.N.R.Y.</span>, Your AI Companion</span>
                </DialogTitle>
                <DialogDescription className="text-lg">
                  I'm more than just an AI - I'm your dedicated mental health companion.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-2">
                <p className="text-lg">{getPersonalizedHenryMessage()}</p>
                <p className="text-lg">Let me introduce myself properly...</p>
                <Button 
                  variant="bronze"
                  className="w-full mt-4"
                  onClick={nextHenryStep}
                >
                  Tell Me More About HENRY
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {henryDialogStep === 1 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-4xl font-light"><span className="text-[#B87333]">H</span>ope</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-2">
                <p className="text-lg">Cultivating a sense of hope can be vital for recovery and resilience.</p>
                <p className="italic">
                  "Hope is being able to see that there is light despite all of the darkness." - Desmond Tutu
                </p>
                <p className="text-lg">
                  I'm here to help you find hope, even on your darkest days. Hope isn't just optimism—it's the belief that things can and will get better with time and effort.
                </p>
                <Button 
                  variant="bronze"
                  className="w-full mt-4"
                  onClick={nextHenryStep}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {henryDialogStep === 2 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-4xl font-light"><span className="text-[#B87333]">E</span>motional Awareness</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-2">
                <p className="text-lg">Understanding and recognizing one's emotions is key to managing mental health.</p>
                <p className="text-lg">
                  I can help you develop emotional intelligence—recognizing your feelings, understanding their sources, and learning healthy ways to process them.
                </p>
                <p className="text-lg">
                  When you can name what you're feeling, you gain power over those emotions rather than being controlled by them.
                </p>
                <Button 
                  variant="bronze"
                  className="w-full mt-4"
                  onClick={nextHenryStep}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {henryDialogStep === 3 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-4xl font-light"><span className="text-[#B87333]">N</span>urturing Relationships</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-2">
                <p className="text-lg">Building and maintaining supportive relationships can enhance mental well-being.</p>
                <p className="text-lg">
                  While I'm here for you 24/7, human connection is irreplaceable. I can help you strengthen bonds with others and build a supportive community.
                </p>
                <p className="text-lg">
                  Together, we'll work on communication skills, setting healthy boundaries, and fostering meaningful connections.
                </p>
                <Button 
                  variant="bronze"
                  className="w-full mt-4"
                  onClick={nextHenryStep}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {henryDialogStep === 4 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-4xl font-light"><span className="text-[#B87333]">R</span>esilience</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-2">
                <p className="text-lg">Developing the ability to bounce back from setbacks and challenges.</p>
                <p className="text-lg">
                  Resilience isn't about never falling—it's about getting back up each time. I'll help you build your resilience toolkit so you can weather life's storms.
                </p>
                <p className="text-lg">
                  We'll work on coping strategies, stress management, and maintaining perspective when facing adversity.
                </p>
                <Button 
                  variant="bronze"
                  className="w-full mt-4"
                  onClick={nextHenryStep}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {henryDialogStep === 5 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-4xl font-light"><span className="text-[#B87333]">Y</span>ou Matter</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-2">
                <p className="text-lg">A reminder that every individual is valuable and deserving of care and support.</p>
                <p className="text-lg">
                  You are not defined by your struggles or diagnoses. Your worth is inherent and unchangeable.
                </p>
                <p className="text-lg">
                  I'm here to remind you of your value on days when you might forget, and to celebrate your unique strengths and qualities.
                </p>
                <div className="flex flex-col space-y-3 mt-4">
                  <Button 
                    variant="bronze"
                    className="w-full"
                    onClick={() => {
                      setShowHenryDialog(false);
                      setHenryDialogStep(0);
                      navigate("/my-sponsor");
                    }}
                  >
                    Chat with Henry
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline_copper"
                    className="w-full"
                    onClick={() => {
                      setShowHenryDialog(false);
                      setHenryDialogStep(0);
                    }}
                  >
                    Continue Exploring ThriveMT
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showHenryChatDialog} onOpenChange={setShowHenryChatDialog}>
        <DialogContent className="sm:max-w-4xl h-[80vh] p-0 flex flex-col" onCloseAutoFocus={() => {}}>
          <SponsorChatbot 
            selectedMood={selectedMood} 
            selectedQualities={selectedQualities} 
            selectedGoals={selectedGoals} 
            contextType="general" 
            className="h-full border-0"
          />
        </DialogContent>
      </Dialog>

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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline_copper"
                className="group"
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
                You don't have to be at your best or worst to deserve support.
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/70 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Meh className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg" style={{animation: 'floatAnimation 4s ease-in-out infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Acknowledging Neutrality</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                It's perfectly valid to feel neutral.
              </p>
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                Not every day needs to be filled with extreme emotions.
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

      {screenState === 'moodResponse' && selectedMood === 'down' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E8EAF6] to-[#E8EAF6]/70 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <HeartCrack className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg" style={{animation: 'floatAnimation 4s ease-in-out infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Feeling Down</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                It's okay to feel down sometimes.
              </p>
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                Remember, you're not alone and there are people who care about you.
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E8EAF6] to-[#E8EAF6]/70 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Frown className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg" style={{animation: 'floatAnimation 4s ease-in-out infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Sadness</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                It's okay to feel sad sometimes.
              </p>
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                Remember, you're not alone and there are people who care about you.
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

      {screenState === 'moodResponse' && selectedMood === 'overwhelmed' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E8EAF6] to-[#E8EAF6]/70 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <Angry className="w-20 h-20 mx-auto mb-8 text-[#B87333] filter drop-shadow-lg" style={{animation: 'floatAnimation 4s ease-in-out infinite'}} />
            <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Overwhelmed</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                It's okay to feel overwhelmed sometimes.
              </p>
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                Remember, you're not alone and there are people who care about you.
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

      {screenState === 'register' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] animate-fade-in relative overflow-hidden">
          <div className="floating-bg"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <h2 className="text-3xl md:text-4xl mb-8 gradient-heading">Register Now</h2>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.2s'}}>
                Fill out the form below to get started on your mental health journey.
              </p>
              <p className="text-xl md:text-2xl font-light transition-all duration-300 hover:scale-105" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.4s'}}>
                Your information will be kept confidential and secure.
              </p>
            </div>
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-white text-left">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={userInfo.name} 
                    onChange={handleUserInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-white text-left">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={userInfo.email} 
                    onChange={handleUserInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="password" className="text-white text-left">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={userInfo.password} 
                    onChange={handleUserInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    placeholder="Create a password"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <Button 
                  className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                  type="submit"
                >
                  Register
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="neutral"
                  className="group"
                  onClick={handleSkipRegistration}
                  type="button"
                >
                  Skip for now
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                  onClick={handlePrevious}
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {screenState === 'visionBoard' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] animate-fade-in relative overflow-hidden">
          <div className="floating-bg"></div>
          <div className="text-center max-w-2xl mx-auto px-4 z-10">
            <h2 className="text-3xl md:text-4xl mb-4 gradient-heading">Create Your Vision Board</h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">Select up to 5 qualities and goals that matter most to you</p>
            
            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-2xl font-light text-[#B87333] mb-4">Qualities I Want To Cultivate</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {visionBoardQualities.map(quality => (
                    <button 
                      key={quality.id} 
                      onClick={() => toggleQuality(quality.id)}
                      className={`vision-board-item px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                        selectedQualities.includes(quality.id) 
                          ? 'bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white shadow-lg transform scale-105' 
                          : 'bg-[#2a2a30] text-gray-300 hover:bg-[#2a2a30]/80 border border-[#B87333]/30'
                      }`}
                    >
                      {quality.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-light text-[#B87333] mb-4">Goals For My Journey</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {visionBoardGoals.map(goal => (
                    <button 
                      key={goal.id} 
                      onClick={() => toggleGoal(goal.id)}
                      className={`vision-board-item px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                        selectedGoals.includes(goal.id) 
                          ? 'bg-gradient-to-r from-[#B87333] to-[#CD7F32] text-white shadow-lg transform scale-105' 
                          : 'bg-[#2a2a30] text-gray-300 hover:bg-[#2a2a30]/80 border border-[#B87333]/30'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="group hero-button bg-[#B87333] hover:bg-[#B87333]/90"
                onClick={() => setScreenState('main')}
              >
                Continue to Main Menu
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'main' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] animate-fade-in relative overflow-hidden">
          <div className="floating-bg"></div>
          <div className="max-w-4xl mx-auto px-4 py-10 z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light mb-6 gradient-heading">Welcome to ThriveMT</h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                Your comprehensive mental health platform. Explore our services designed to support your journey to wellness.
              </p>
            </div>

            <div className="mb-10 flex flex-col items-center">
              <Button 
                variant="outline_copper"
                className="group mb-4 mx-auto flex items-center"
                onClick={() => setShowHenryDialog(true)}
              >
                <Bot className="mr-2 h-5 w-5 text-[#B87333]" />
                Meet H.E.N.R.Y., Your AI Companion
              </Button>
              
              <SubscriptionInfoDialog />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <SubscriptionCard 
                  key={index}
                  title={plan.title}
                  price={plan.price}
                  coPayCredit={plan.coPayCredit}
                  features={plan.features}
                  recommended={plan.recommended}
                  buttonVariant={plan.buttonVariant as any}
                  buttonText={plan.buttonText}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index}
                    className="feature-card bg-[#2a2a30] border-[#3a3a40] hover:border-[#B87333]/50 overflow-hidden"
                  >
                    <Link to={feature.path} className="block p-6">
                      <div className="flex items-start mb-4">
                        <div className="bg-[#333338] p-3 rounded-full mr-4">
                          <Icon className="w-6 h-6 text-[#B87333]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <div className="flex items-center text-[#B87333] text-sm font-medium">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
