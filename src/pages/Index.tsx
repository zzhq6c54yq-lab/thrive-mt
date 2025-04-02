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
import { Lightbulb, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  // Removed showWelcomeTutorial state
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
    showMainTutorial,
    setShowMainTutorial,
    popupsShown,
    markTutorialCompleted
  } = usePopupManagement(screenState);

  useScreenHistory(screenState, setScreenState);

  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';

  // Function to get translated text based on the current language preference
  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'welcomeTitle': {
        'English': 'Welcome to Thrive MT!',
        'Español': '¡Bienvenido a Thrive MT!'
      },
      'tourQuestion': {
        'English': 'Would you like a guided tour of the app\'s features?',
        'Español': '¿Te gustaría un recorrido guiado por las funciones de la aplicación?'
      },
      'henryIntro': {
        'English': 'Hi, I\'m Henry, your mental wellness assistant! I can guide you through the app\'s features to help you get started.',
        'Español': 'Hola, soy Henry, ¡tu asistente de bienestar mental! Puedo guiarte a través de las funciones de la aplicación para ayudarte a comenzar.'
      },
      'tutorialAccess': {
        'English': 'Each feature has its own tutorial that you can access anytime by clicking the "How to use this feature" button.',
        'Español': 'Cada función tiene su propio tutorial al que puedes acceder en cualquier momento haciendo clic en el botón "Cómo usar esta función".'
      },
      'skipForNow': {
        'English': 'Skip for now',
        'Español': 'Omitir por ahora'
      },
      'showMeAround': {
        'English': 'Show me around',
        'Español': 'Muéstrame el lugar'
      }
    };
    
    return translations[key]?.[preferredLanguage] || translations[key]?.['English'] || key;
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setSelectedMood(prev => prev);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

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
        title: isSpanish ? "Error de Registro" : "Registration Error",
        description: isSpanish ? "Por favor completa todos los campos para continuar." : "Please fill in all fields to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isSpanish ? "Registro Exitoso" : "Registration Successful",
      description: isSpanish ? "¡Bienvenido a Thrive MT! Tu viaje hacia una mejor salud mental comienza ahora." : "Welcome to Thrive MT! Your journey to better mental health begins now.",
    });
    
    setScreenState('subscription');
  };

  const handleSubscriptionSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    toast({
      title: isSpanish ? `Plan ${planTitle} Seleccionado` : `${planTitle} Plan Selected`,
      description: isSpanish ? `Has seleccionado el plan de suscripción ${planTitle}.` : `You have selected the ${planTitle} subscription plan.`,
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
        title: isSpanish ? "Por Favor Selecciona un Plan" : "Please Select a Plan",
        description: isSpanish ? "Por favor selecciona un plan de suscripción para continuar." : "Please select a subscription plan to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isSpanish ? "Plan Confirmado" : "Plan Confirmed",
      description: isSpanish ? `Tu plan ${selectedPlan} ahora está activo. ¡Disfruta tus beneficios!` : `Your ${selectedPlan} plan is now active. Enjoy your benefits!`,
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
        title: isSpanish ? "Se Necesitan Más Selecciones" : "More Selections Needed",
        description: isSpanish ? "Por favor selecciona al menos 2 cualidades y 2 metas para continuar." : "Please select at least 2 qualities and 2 goals to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isSpanish ? "Tablero de Visión Creado" : "Vision Board Created",
      description: isSpanish ? "¡Tu viaje personalizado de bienestar mental está listo!" : "Your personalized mental wellness journey is ready!",
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
    setIsFirstVisit(false);
    // Removed setShowWelcomeTutorial(true);
    markTutorialCompleted();
  };

  const handleSkipTutorial = () => {
    setIsFirstVisit(false);
    markTutorialCompleted();
    toast({
      title: isSpanish ? "Tutorial Omitido" : "Tutorial Skipped",
      description: isSpanish ? "Puedes acceder a los tutoriales en cualquier momento a través del botón de Ayuda." : "You can access tutorials anytime through the Help button.",
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
              <DialogTitle className="text-xl text-white">
                {getTranslatedText('welcomeTitle')}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-300">
              {getTranslatedText('tourQuestion')}
            </DialogDescription>
          </DialogHeader>
        
          <div className="py-4 text-center">
            <Lightbulb className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <p className="text-white">
              {getTranslatedText('henryIntro')}
            </p>
            <p className="text-gray-300 mt-2">
              {getTranslatedText('tutorialAccess')}
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleSkipTutorial}
              className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {getTranslatedText('skipForNow')}
            </Button>
            <Button 
              onClick={handleStartTutorial}
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {getTranslatedText('showMeAround')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Removed WelcomeTutorial component */}
    </div>
  );
};

export default Index;
