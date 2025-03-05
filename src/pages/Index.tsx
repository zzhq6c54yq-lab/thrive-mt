import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, ArrowLeft, Annoyed, HeartCrack, Angry, HeartHandshake } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";

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

const Index = () => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'register' | 'visionBoard' | 'main'>('intro');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
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

  return (
    <>
      <CoPayCreditPopup open={showCoPayCredit} onOpenChange={setShowCoPayCredit} />

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
            <p className="mb-8 text-lg" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '1s'}}>
              You're not alone. Help is available, and reaching out is a sign of strength.
            </p>
            <Button 
              className="group bg-[#ea384c] hover:bg-[#ea384c]/90 hero-button"
              onClick={() => setScreenState('register')}
            >
              Continue to Register
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] to-[#2a2a3f] text-white animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          <div className="w-full max-w-md mx-auto px-4 z-10">
            <div className="text-center mb-8" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0}}>
              <h2 className="text-4xl font-light text-white mb-2">Join <span className="gradient-heading">Thrive</span><span className="text-white">MT</span></h2>
              <p className="text-gray-300">Create your account to continue your journey</p>
            </div>
            
            <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 transition-all duration-300 hover:border-[#B87333]/30 hover:shadow-lg" style={{
              boxShadow: '0 0 20px rgba(184, 115, 51, 0.1)',
              animation: 'fadeInText 1s ease-out forwards',
              opacity: 0,
              animationDelay: '0.3s'
            }}>
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
                      className="pl-10 w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent transition-all duration-300"
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
                      className="pl-10 w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent transition-all duration-300"
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
                      className="pl-10 w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:border-transparent transition-all duration-300"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/80 text-white py-2 rounded-md transition-colors hero-button"
                >
                  Register & Continue
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <button 
                    onClick={() => setScreenState('visionBoard')} 
                    className="text-[#B87333] hover:underline transition-all duration-300 hover:text-[#B87333]/80"
                  >
                    Skip for now
                  </button>
                </p>
              </div>
            </Card>
            <div className="text-center mt-6" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.6s'}}>
              <Button 
                className="group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2 hero-button"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            </div>
          </div>
        </div>
      )}

      {screenState === 'visionBoard' && (
        <div className="min-h-screen py-12 bg-gradient-to-b from-[#1a1a1f] to-[#2a2a3f] text-white animate-fade-in overflow-auto relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.02%22/></svg>')] opacity-20 fixed"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-5xl text-center mb-6 font-light gradient-heading">
              My Vision Board
            </h1>
            <p className="text-lg md:text-xl text-center mb-10 text-gray-300" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.3s'}}>
              The future version of myself that I am choosing now will be:
            </p>
            
            <div className="mb-12" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.5s'}}>
              <h2 className="text-2xl mb-6 text-[#B87333]">Qualities I Want to Embrace</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {visionBoardQualities.map((quality, index) => (
                  <button
                    key={quality.id}
                    onClick={() => toggleQuality(quality.id)}
                    className={`p-3 rounded-lg transition-all duration-300 text-lg vision-board-item ${
                      selectedQualities.includes(quality.id)
                        ? 'bg-[#B87333] text-white shadow-[0_0_15px_rgba(184,115,51,0.3)]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {quality.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-12" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.7s'}}>
              <h2 className="text-2xl mb-6 text-[#B87333]">Goals I Want to Achieve</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {visionBoardGoals.map((goal, index) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-3 rounded-lg transition-all duration-300 text-left vision-board-item ${
                      selectedGoals.includes(goal.id)
                        ? 'bg-[#B87333] text-white shadow-[0_0_15px_rgba(184,115,51,0.3)]'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-12" style={{animation: 'fadeInText 1s ease-out forwards', opacity: 0, animationDelay: '0.9s'}}>
              <p className="text-gray-300 mb-6">
                {selectedQualities.length > 0 || selectedGoals.length > 0 
                  ? `You've selected ${selectedQualities.length} qualities and ${selectedGoals.length} goals.`
                  : "Select at least one quality or goal to help tailor your therapy and mental health resources."}
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  className="group bg-[#B87333] hover:bg-[#B87333]/80 text-white hero-button"
                  onClick={() => setScreenState('main')}
                >
                  Continue to Thrive MT
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333]/20 hover:bg-[#B87333]/30 flex items-center gap-2"
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
        </div>
      )}

      {screenState === 'main' && (
        <div className="min-h-screen bg-white app-content relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.02%22/></svg>')] opacity-30 fixed"></div>
          
          {/* Hero Section */}
          <section className="container px-4 pt-32 pb-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <span className="px-3 py-1 text-sm font-medium tracking-wider rounded-full bg-primary/10 text-primary inline-block mb-4 uppercase">
                Welcome to Thrive MT
              </span>
              <h1 className="text-4xl sm:text-5xl tracking-tight mb-6 gradient-heading">
                Your Mental Health Journey Starts Here
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Access professional therapy and mental wellness tools from anywhere. 
                Get the support you need, when you need it.
              </p>
              <Button className="group hero-button">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                className="ml-4 group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2 hero-button"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            </div>
          </section>

          {/* Features Section */}
          <section className="container px-4 py-20 bg-muted/30 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card 
                    key={index}
                    className="p-6 backdrop-blur-sm bg-background/50 border border-border/50 hover:border-primary/50 transition-colors duration-300 cursor-pointer feature-card"
                    onClick={() => {
                      if (feature.path === "/mental-wellness-tools") {
                        navigate(feature.path, {
                          state: { qualities: selectedQualities, goals: selectedGoals }
                        });
                      } else {
                        navigate(feature.path);
                      }
                    }}
                    style={{
                      animation: 'fadeInText 0.6s ease-out forwards',
                      opacity: 0,
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    <feature.icon className="h-8 w-8 mb-4 text-[#B87333]" />
                    <h3 className="text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="container px-4 py-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl mb-6 gradient-heading">Ready to Take the First Step?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands who have found their path to better mental health with Thrive MT. 
                Our licensed therapists are here to support you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  className="group hero-button"
                  onClick={() => navigate("/real-time-therapy")}
                >
                  Connect with a Therapist
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="group border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hero-button"
                  onClick={() => navigate("/mental-wellness-tools", {
                    state: { qualities: selectedQualities, goals: selectedGoals }
                  })}
                >
                  Explore Resources
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  className="group bg-[#B87333] hover:bg-[#B87333]/80 flex items-center gap-2 hero-button"
                  onClick={handlePrevious}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Index;
