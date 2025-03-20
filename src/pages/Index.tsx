
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionScreen from "@/components/home/SubscriptionScreen";
import MainDashboard from "@/components/home/MainDashboard";
import VisionBoard from "@/components/home/VisionBoard";
import HenryButton from "@/components/henry/HenryButton";

const Index = () => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [henryPosition, setHenryPosition] = useState({ x: 0, y: 0 });
  const henryRef = useRef<HTMLDivElement>(null);
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
  const [popupsShown, setPopupsShown] = useState({
    coPayCredit: false,
    henryIntro: false
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state && location.state.screenState) {
      setScreenState(location.state.screenState);
      
      if (location.state.returnToMain) {
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState, returnToMain: true }, 
          document.title
        );
      } else {
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState }, 
          document.title
        );
      }
    } else if (location.state && location.state.returnToIntro) {
      setScreenState('intro');
      
      window.history.replaceState(
        { ...window.history.state, screenState: 'intro' }, 
        document.title
      );
    } else {
      window.history.replaceState(
        { ...window.history.state, screenState: 'intro' }, 
        document.title
      );
      
      const timer = setTimeout(() => {
        if (screenState === 'intro') {
          setScreenState('mood');
          window.history.replaceState(
            { ...window.history.state, screenState: 'mood' }, 
            document.title
          );
        }
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [location.state, screenState]);

  useEffect(() => {
    window.history.replaceState(
      { ...window.history.state, screenState }, 
      document.title
    );
  }, [screenState]);

  useEffect(() => {
    // Only show popups during initial flow from vision board to main
    if (screenState === 'main' && !popupsShown.coPayCredit) {
      setShowCoPayCredit(true);
      setPopupsShown(prev => ({ ...prev, coPayCredit: true }));
      
      // Set a timer to show Henry after the co-pay credit popup is closed
      setTimeout(() => {
        if (!popupsShown.henryIntro) {
          setShowHenry(true);
          setPopupsShown(prev => ({ ...prev, henryIntro: true }));
        }
      }, 1500);
    }
  }, [screenState, popupsShown]);

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

  useEffect(() => {
    if (location.state && location.state.showHenry) {
      setShowHenry(true);
    }
  }, [location.state]);

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

  const handleSubscriptionSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    toast({
      title: `${planTitle} Plan Selected`,
      description: `You have selected the ${planTitle} subscription plan.`,
    });
  };

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

  const handlePrevious = () => {
    let newScreenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main' = 'intro';
    
    if (screenState === 'mood') {
      newScreenState = 'intro';
    } else if (screenState === 'moodResponse') {
      newScreenState = 'mood';
    } else if (screenState === 'register') {
      newScreenState = 'moodResponse';
    } else if (screenState === 'subscription') {
      newScreenState = 'register';
    } else if (screenState === 'visionBoard') {
      newScreenState = 'subscription';
    } else if (screenState === 'main') {
      newScreenState = 'visionBoard';
    }
    
    setScreenState(newScreenState);
  };

  const handleSkip = () => {
    setScreenState('main');
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
    
    if (location.state && location.state.returnToMain) {
      setScreenState('main');
      window.history.replaceState(
        { ...window.history.state, returnToMain: false }, 
        document.title
      );
    } else {
      setScreenState('visionBoard');
    }
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

  const shouldShowHenry = () => {
    return screenState === 'main';
  };

  const renderCurrentScreen = () => {
    switch (screenState) {
      case 'intro':
        return <IntroScreen onContinue={() => setScreenState('mood')} />;
      case 'mood':
        return (
          <MoodScreen
            onMoodSelect={(mood) => {
              setSelectedMood(mood);
              setScreenState('moodResponse');
            }}
            onPrevious={() => setScreenState('intro')}
          />
        );
      case 'moodResponse':
        return (
          <MoodResponse
            selectedMood={selectedMood}
            onContinue={() => setScreenState('register')}
            onPrevious={() => setScreenState('mood')}
          />
        );
      case 'register':
        return (
          <RegistrationScreen
            userInfo={userInfo}
            onUserInfoChange={handleUserInfoChange}
            onSubmit={handleRegister}
            onPrevious={() => setScreenState('moodResponse')}
            onSkip={() => setScreenState('subscription')}
          />
        );
      case 'subscription':
        return (
          <SubscriptionScreen
            selectedPlan={selectedPlan}
            onPlanSelect={handleSubscriptionSelect}
            onContinue={handleSubscriptionContinue}
            onPrevious={() => setScreenState('register')}
            onSkip={() => setScreenState('main')}
          />
        );
      case 'visionBoard':
        return (
          <VisionBoard
            selectedQualities={selectedQualities}
            selectedGoals={selectedGoals}
            onQualityToggle={toggleQuality}
            onGoalToggle={toggleGoal}
            onContinue={handleVisionBoardContinue}
            onPrevious={() => setScreenState('subscription')}
            onSkip={() => setScreenState('main')}
          />
        );
      case 'main':
        return (
          <MainDashboard
            userName={userInfo.name}
            showHenry={showHenry}
            onHenryToggle={toggleHenry}
            selectedQualities={selectedQualities}
            selectedGoals={selectedGoals}
            navigateToFeature={navigateToFeature}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Only show CoPayCredit popup during initial transition */}
      {showCoPayCredit && !popupsShown.coPayCredit && 
        <CoPayCreditPopup 
          open={showCoPayCredit} 
          onOpenChange={setShowCoPayCredit} 
        />
      }
      
      {renderCurrentScreen()}
      
      {screenState === 'main' && (
        <HenryButton 
          userName={userInfo.name}
          triggerInitialGreeting={showHenry && !popupsShown.henryIntro}
        />
      )}
    </div>
  );
};

export default Index;
