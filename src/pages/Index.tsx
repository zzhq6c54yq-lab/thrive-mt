import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import useMousePosition from "@/hooks/useMousePosition";
import useScreenHistory from "@/hooks/useScreenHistory";
import usePopupManagement from "@/hooks/usePopupManagement";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const Index = () => {
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
  const [showFeatureTutorial, setShowFeatureTutorial] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const mousePosition = useMousePosition();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { 
    showCoPayCredit, 
    setShowCoPayCredit, 
    showHenry, 
    setShowHenry,
    popupsShown
  } = usePopupManagement(screenState);

  useScreenHistory(screenState, setScreenState);

  useEffect(() => {
    if (location.state && location.state.showHenry) {
      setShowHenry(true);
    }
  }, [location.state]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedThriveMT');
    if (!hasVisited && screenState === 'main') {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedThriveMT', 'true');
    }
  }, [screenState]);

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
      if (path === '/small-business-portal') {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals,
            fromMainMenu: true 
          }
        });
      } else {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals 
          }
        });
      }
    }
  };

  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    setSelectedMood(mood);
    setScreenState('moodResponse');
  };

  const handleStartTutorial = () => {
    setShowFeatureTutorial(true);
    setIsFirstVisit(false);
    
    setShowHenry(true);
  };

  const handleSkipTutorial = () => {
    setIsFirstVisit(false);
    toast({
      title: "Tutorial Skipped",
      description: "You can access tutorials anytime through the Help button.",
    });
  };

  return (
    <div className="relative">
      {showCoPayCredit && !popupsShown.coPayCredit && 
        <CoPayCreditPopup 
          open={showCoPayCredit} 
          onOpenChange={setShowCoPayCredit} 
        />
      }
      
      <IndexScreenManager
        screenState={screenState}
        selectedMood={selectedMood}
        userInfo={userInfo}
        selectedPlan={selectedPlan}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        showHenry={showHenry}
        onMoodSelect={handleMoodSelect}
        onUserInfoChange={handleUserInfoChange}
        onQualityToggle={toggleQuality}
        onGoalToggle={toggleGoal}
        onPlanSelect={handleSubscriptionSelect}
        onHenryToggle={toggleHenry}
        navigateToFeature={navigateToFeature}
        handleSubscriptionContinue={handleSubscriptionContinue}
        handleVisionBoardContinue={handleVisionBoardContinue}
        handleRegister={handleRegister}
        setScreenState={setScreenState}
      />
      
      <Dialog open={isFirstVisit} onOpenChange={setIsFirstVisit}>
        <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white">
          <DialogHeader>
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
                alt="Henry" 
                className="w-10 h-10 mr-3 rounded-full"
              />
              <DialogTitle className="text-xl text-white">Welcome to Thrive MT!</DialogTitle>
            </div>
            <DialogDescription className="text-gray-300">
              Would you like a guided tour of the app's features?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <Lightbulb className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <p className="text-white">
              Hi, I'm Henry, your mental wellness assistant! I can guide you through the app's features to help you get started.
            </p>
            <p className="text-gray-300 mt-2">
              Each feature has its own tutorial that you can access anytime by clicking the "How to use this feature" button.
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleSkipTutorial}
              className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Skip for now
            </Button>
            <Button 
              onClick={handleStartTutorial}
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Show me around
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
