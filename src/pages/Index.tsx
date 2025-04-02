
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
import FeatureTutorial from "@/components/tutorials/FeatureTutorial";

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
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showMainTutorial, setShowMainTutorial] = useState(false);
  const [currentFeatureId, setCurrentFeatureId] = useState<string>("dashboard");
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [showTransitionTutorial, setShowTransitionTutorial] = useState(false);
  const [autoProgressTutorial, setAutoProgressTutorial] = useState(false);
  const [tutorialInterval, setTutorialInterval] = useState<NodeJS.Timeout | null>(null);

  const mousePosition = useMousePosition();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { 
    showCoPayCredit, 
    setShowCoPayCredit, 
    showHenry, 
    setShowHenry,
    popupsShown,
  } = usePopupManagement(screenState);

  useScreenHistory(screenState, setScreenState);

  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';

  useEffect(() => {
    // Add a listener for language changes
    const handleLanguageChange = () => {
      // Force component re-render to apply language changes
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

  // Show tutorial when transitioning to main screen from visionBoard or subscription
  useEffect(() => {
    if (screenState === 'main' && 
        (document.referrer.includes('visionBoard') || document.referrer.includes('subscription')) && 
        !tutorialCompleted) {
      setShowTransitionTutorial(true);
    }
  }, [screenState, tutorialCompleted]);

  // Automatically show the tutorial when transitioning to main from visionBoard or subscription
  useEffect(() => {
    const prevState = localStorage.getItem('prevScreenState');
    if (screenState === 'main' && 
        (prevState === 'visionBoard' || prevState === 'subscription') &&
        !tutorialCompleted && 
        !showMainTutorial) {
      setTimeout(() => {
        setShowMainTutorial(true);
        setCurrentFeatureId("dashboard");
        setTutorialStep(0);
        setAutoProgressTutorial(true);
      }, 800); // Slight delay to allow the main screen to render
    }
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState, tutorialCompleted, showMainTutorial]);

  // Auto-progress tutorial timer
  useEffect(() => {
    if (showMainTutorial && autoProgressTutorial) {
      // If already exists, clear it first
      if (tutorialInterval) {
        clearInterval(tutorialInterval);
      }
      
      // Set new interval for auto-progression (every 5 seconds)
      const interval = setInterval(() => {
        if (tutorialStep < mainFeatures.length - 1) {
          setTutorialStep(step => step + 1);
          setCurrentFeatureId(mainFeatures[tutorialStep + 1].id);
        } else {
          // End tutorial when reached the end
          handleFinishTutorial();
          clearInterval(interval);
        }
      }, 8000); // 8 seconds between steps
      
      setTutorialInterval(interval);
    }
    
    return () => {
      if (tutorialInterval) {
        clearInterval(tutorialInterval);
      }
    };
  }, [showMainTutorial, autoProgressTutorial, tutorialStep]);

  const mainFeatures = [
    { id: "dashboard", title: getTranslatedText('dashboardTitle'), description: getTranslatedText('dashboardDesc') },
    { id: "wellness-challenges", title: getTranslatedText('challengesTitle'), description: getTranslatedText('challengesDesc') },
    { id: "real-time-therapy", title: getTranslatedText('therapyTitle'), description: getTranslatedText('therapyDesc') },
    { id: "community-support", title: getTranslatedText('communityTitle'), description: getTranslatedText('communityDesc') },
    { id: "resource-library", title: getTranslatedText('resourcesTitle'), description: getTranslatedText('resourcesDesc') },
    { id: "copay-credits", title: getTranslatedText('coPayTitle'), description: getTranslatedText('coPayDesc') }
  ];

  function getTranslatedText(key: string) {
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
      },
      'next': {
        'English': 'Next',
        'Español': 'Siguiente'
      },
      'finish': {
        'English': 'Finish Tour',
        'Español': 'Finalizar recorrido'
      },
      'mainFeatures': {
        'English': 'Main Features',
        'Español': 'Características principales'
      },
      'dashboardTitle': {
        'English': 'Dashboard',
        'Español': 'Panel'
      },
      'dashboardDesc': {
        'English': 'Your personal mental health control center',
        'Español': 'Tu centro de control de salud mental personal'
      },
      'challengesTitle': {
        'English': 'Wellness Challenges',
        'Español': 'Desafíos de Bienestar'
      },
      'challengesDesc': {
        'English': 'Complete daily activities to improve your well-being',
        'Español': 'Completa actividades diarias para mejorar tu bienestar'
      },
      'therapyTitle': {
        'English': 'Real-Time Therapy',
        'Español': 'Terapia en Tiempo Real'
      },
      'therapyDesc': {
        'English': 'Connect with therapists when you need support',
        'Español': 'Conéctate con terapeutas cuando necesites apoyo'
      },
      'communityTitle': {
        'English': 'Community Support',
        'Español': 'Apoyo Comunitario'
      },
      'communityDesc': {
        'English': 'Join a community of individuals on similar journeys',
        'Español': 'Únete a una comunidad de personas en viajes similares'
      },
      'resourcesTitle': {
        'English': 'Resource Library',
        'Español': 'Biblioteca de Recursos'
      },
      'resourcesDesc': {
        'English': 'Access mental health articles, videos, and tools',
        'Español': 'Accede a artículos, videos y herramientas de salud mental'
      },
      'coPayTitle': {
        'English': 'Co-Pay Credits',
        'Español': 'Créditos de Copago'
      },
      'coPayDesc': {
        'English': 'Earn rewards for consistent engagement',
        'Español': 'Gana recompensas por una participación constante'
      }
    };
    
    return translations[key][preferredLanguage] || translations[key]['English'];
  }

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
    setShowMainTutorial(true);
    setTutorialStep(0);
    setCurrentFeatureId(mainFeatures[0].id);
    setAutoProgressTutorial(true);
  };

  const handleSkipTutorial = () => {
    setIsFirstVisit(false);
    setTutorialCompleted(true);
    toast({
      title: isSpanish ? "Tutorial Omitido" : "Tutorial Skipped",
      description: isSpanish ? "Puedes acceder a los tutoriales en cualquier momento a través del botón de Ayuda." : "You can access tutorials anytime through the Help button.",
    });
  };

  const handleNextFeatureTutorial = () => {
    if (tutorialStep < mainFeatures.length - 1) {
      setTutorialStep(tutorialStep + 1);
      setCurrentFeatureId(mainFeatures[tutorialStep + 1].id);
    } else {
      handleFinishTutorial();
    }
  };

  const handleFinishTutorial = () => {
    if (tutorialInterval) {
      clearInterval(tutorialInterval);
      setTutorialInterval(null);
    }
    
    setShowMainTutorial(false);
    setTutorialStep(0);
    setTutorialCompleted(true);
    setAutoProgressTutorial(false);
    
    toast({
      title: isSpanish ? "Tutorial Completado" : "Tutorial Completed",
      description: isSpanish ? "Siempre puedes acceder a los tutoriales haciendo clic en los botones 'Cómo usar esta función'." : "You can always access feature tutorials by clicking 'How to use this feature' buttons.",
    });
    
    setShowHenry(true);
  };

  const closeTutorialAndMarkCompleted = () => {
    if (tutorialInterval) {
      clearInterval(tutorialInterval);
      setTutorialInterval(null);
    }
    
    setShowMainTutorial(false);
    setTutorialCompleted(true);
    setAutoProgressTutorial(false);
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

      <Dialog open={showMainTutorial} onOpenChange={closeTutorialAndMarkCompleted}>
        <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-lg">
          <DialogHeader>
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
                alt="Henry" 
                className="w-10 h-10 mr-3 rounded-full"
              />
              <DialogTitle className="text-xl text-white">
                {getTranslatedText('mainFeatures')}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-300">
              {tutorialStep + 1} of {mainFeatures.length}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] overflow-auto pr-4">
            <div className="py-4">
              <div className="bg-white/10 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-white">{mainFeatures[tutorialStep].title}</h3>
                <p className="text-gray-300 mt-1">{mainFeatures[tutorialStep].description}</p>
              </div>
              
              {currentFeatureId && (
                <div className="mt-4">
                  <FeatureTutorial 
                    featureId={currentFeatureId} 
                    onClose={() => {}} 
                    embedded={true}
                  />
                </div>
              )}
            </div>
          </ScrollArea>
          
          <DialogFooter className="flex justify-between mt-4">
            <Button 
              variant="outline"
              onClick={() => {
                closeTutorialAndMarkCompleted();
                if (tutorialInterval) {
                  clearInterval(tutorialInterval);
                  setTutorialInterval(null);
                }
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {getTranslatedText('skipForNow')}
            </Button>
            
            <Button 
              onClick={() => {
                setAutoProgressTutorial(false);
                if (tutorialInterval) {
                  clearInterval(tutorialInterval);
                  setTutorialInterval(null);
                }
                handleNextFeatureTutorial();
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {tutorialStep < mainFeatures.length - 1 ? (
                <>
                  {getTranslatedText('next')}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                getTranslatedText('finish')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
