
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
      }, 800); // Slight delay to allow the main screen to render
    }
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState, tutorialCompleted, showMainTutorial]);

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
        'Español': '¡Bienvenido a Thrive MT!',
        'Français': 'Bienvenue sur Thrive MT !',
        'Deutsch': 'Willkommen bei Thrive MT!',
        '中文': '欢迎来到 Thrive MT!',
        'العربية': 'مرحبًا بك في Thrive MT!'
      },
      'tourQuestion': {
        'English': 'Would you like a guided tour of the app\'s features?',
        'Español': '¿Te gustaría un recorrido guiado por las funciones de la aplicación?',
        'Français': 'Souhaitez-vous une visite guidée des fonctionnalités de l\'application ?',
        'Deutsch': 'Möchten Sie eine geführte Tour durch die Funktionen der App?',
        '中文': '您想要应用功能的导览吗？',
        'العربية': 'هل ترغب في جولة إرشادية لميزات التطبيق؟'
      },
      'henryIntro': {
        'English': 'Hi, I\'m Henry, your mental wellness assistant! I can guide you through the app\'s features to help you get started.',
        'Español': 'Hola, soy Henry, ¡tu asistente de bienestar mental! Puedo guiarte a través de las funciones de la aplicación para ayudarte a comenzar.',
        'Français': 'Bonjour, je suis Henry, votre assistant de bien-être mental ! Je peux vous guider à travers les fonctionnalités de l\'application pour vous aider à démarrer.',
        'Deutsch': 'Hallo, ich bin Henry, dein Assistent für mentales Wohlbefinden! Ich kann dich durch die Funktionen der App führen, um dir den Einstieg zu erleichtern.',
        '中文': '嗨，我是亨利，您的心理健康助手！我可以引导您了解应用程序的功能，帮助您入门。',
        'العربية': 'مرحبًا، أنا هنري، مساعدك للعافية النفسية! يمكنني إرشادك عبر ميزات التطبيق لمساعدتك على البدء.'
      },
      'tutorialAccess': {
        'English': 'Each feature has its own tutorial that you can access anytime by clicking the "How to use this feature" button.',
        'Español': 'Cada función tiene su propio tutorial al que puedes acceder en cualquier momento haciendo clic en el botón "Cómo usar esta función".',
        'Français': 'Chaque fonctionnalité possède son propre tutoriel auquel vous pouvez accéder à tout moment en cliquant sur le bouton "Comment utiliser cette fonctionnalité".',
        'Deutsch': 'Jede Funktion hat ihr eigenes Tutorial, auf das Sie jederzeit zugreifen können, indem Sie auf die Schaltfläche "Wie man diese Funktion verwendet" klicken.',
        '中文': '每个功能都有自己的教程，您可以随时通过单击"如何使用此功能"按钮访问。',
        'العربية': 'كل ميزة لها برنامجها التعليمي الخاص الذي يمكنك الوصول إليه في أي وقت بالنقر على زر "كيفية استخدام هذه الميزة".'
      },
      'skipForNow': {
        'English': 'Skip for now',
        'Español': 'Omitir por ahora',
        'Français': 'Ignorer pour l\'instant',
        'Deutsch': 'Vorerst überspringen',
        '中文': '暂时跳过',
        'العربية': 'تخطي في الوقت الحالي'
      },
      'showMeAround': {
        'English': 'Show me around',
        'Español': 'Muéstrame el lugar',
        'Français': 'Faites-moi visiter',
        'Deutsch': 'Zeig mir alles',
        '中文': '带我参观',
        'العربية': 'أرني المكان'
      },
      'next': {
        'English': 'Next',
        'Español': 'Siguiente',
        'Français': 'Suivant',
        'Deutsch': 'Weiter',
        '中文': '下一个',
        'العربية': 'التالي'
      },
      'finish': {
        'English': 'Finish Tour',
        'Español': 'Finalizar recorrido',
        'Français': 'Terminer la visite',
        'Deutsch': 'Tour beenden',
        '中文': '完成导览',
        'العربية': 'إنهاء الجولة'
      },
      'mainFeatures': {
        'English': 'Main Features',
        'Español': 'Características principales',
        'Français': 'Fonctionnalités principales',
        'Deutsch': 'Hauptfunktionen',
        '中文': '主要功能',
        'العربية': 'الميزات الرئيسية'
      },
      'dashboardTitle': {
        'English': 'Dashboard',
        'Español': 'Panel',
        'Français': 'Tableau de Bord',
        'Deutsch': 'Dashboard',
        '中文': '仪表板',
        'العربية': 'لوحة التحكم'
      },
      'dashboardDesc': {
        'English': 'Your personal mental health control center',
        'Español': 'Tu centro de control de salud mental personal',
        'Français': 'Votre centre de contrôle de santé mentale personnel',
        'Deutsch': 'Ihr persönliches Kontrollzentrum für psychische Gesundheit',
        '中文': '您的个人心理健康控制中心',
        'العربية': 'مركز التحكم في الصحة النفسية الشخصية الخاص بك'
      },
      'challengesTitle': {
        'English': 'Wellness Challenges',
        'Español': 'Desafíos de Bienestar',
        'Français': 'Défis de Bien-être',
        'Deutsch': 'Wellness-Herausforderungen',
        '中文': '健康挑战',
        'العربية': 'تحديات العافية'
      },
      'challengesDesc': {
        'English': 'Complete daily activities to improve your well-being',
        'Español': 'Completa actividades diarias para mejorar tu bienestar',
        'Français': 'Complétez des activités quotidiennes pour améliorer votre bien-être',
        'Deutsch': 'Absolvieren Sie tägliche Aktivitäten, um Ihr Wohlbefinden zu verbessern',
        '中文': '完成日常活动以改善您的健康状况',
        'العربية': 'أكمل الأنشطة اليومية لتحسين صحتك'
      },
      'therapyTitle': {
        'English': 'Real-Time Therapy',
        'Español': 'Terapia en Tiempo Real',
        'Français': 'Thérapie en Temps Réel',
        'Deutsch': 'Echtzeit-Therapie',
        '中文': '实时治疗',
        'العربية': 'العلاج في الوقت الحقيقي'
      },
      'therapyDesc': {
        'English': 'Connect with therapists when you need support',
        'Español': 'Conéctate con terapeutas cuando necesites apoyo',
        'Français': 'Connectez-vous avec des thérapeutes lorsque vous avez besoin de soutien',
        'Deutsch': 'Verbinden Sie sich mit Therapeuten, wenn Sie Unterstützung benötigen',
        '中文': '在您需要支持时与治疗师联系',
        'العربية': 'تواصل مع المعالجين عندما تحتاج إلى الدعم'
      },
      'communityTitle': {
        'English': 'Community Support',
        'Español': 'Apoyo Comunitario',
        'Français': 'Soutien Communautaire',
        'Deutsch': 'Gemeinschaftliche Unterstützung',
        '中文': '社区支持',
        'العربية': 'دعم المجتمع'
      },
      'communityDesc': {
        'English': 'Join a community of individuals on similar journeys',
        'Español': 'Únete a una comunidad de personas en viajes similares',
        'Français': 'Rejoignez une communauté de personnes aux parcours similaires',
        'Deutsch': 'Treten Sie einer Gemeinschaft von Personen auf ähnlichen Wegen bei',
        '中文': '加入一个有着相似经历的人的社区',
        'العربية': 'انضم إلى مجتمع من الأفراد في رحلات مماثلة'
      },
      'resourcesTitle': {
        'English': 'Resource Library',
        'Español': 'Biblioteca de Recursos',
        'Français': 'Bibliothèque de Ressources',
        'Deutsch': 'Ressourcen-Bibliothek',
        '中文': '资源库',
        'العربية': 'مكتبة الموارد'
      },
      'resourcesDesc': {
        'English': 'Access mental health articles, videos, and tools',
        'Español': 'Accede a artículos, videos y herramientas de salud mental',
        'Français': 'Accédez à des articles, vidéos et outils de santé mentale',
        'Deutsch': 'Zugriff auf Artikel, Videos und Tools zur psychischen Gesundheit',
        '中文': '获取心理健康文章、视频和工具',
        'العربية': 'الوصول إلى مقالات وفيديوهات وأدوات الصحة النفسية'
      },
      'coPayTitle': {
        'English': 'Co-Pay Credits',
        'Español': 'Créditos de Copago',
        'Français': 'Crédits de Quote-part',
        'Deutsch': 'Zuzahlungsguthaben',
        '中文': '共付额积分',
        'العربية': 'ائتمانات الدفع المشترك'
      },
      'coPayDesc': {
        'English': 'Earn rewards for consistent engagement',
        'Español': 'Gana recompensas por una participación constante',
        'Français': 'Gagnez des récompenses pour un engagement constant',
        'Deutsch': 'Verdienen Sie Belohnungen für konsequentes Engagement',
        '中文': '通过持续参与获得奖励',
        'العربية': 'اكسب المكافآت للمشاركة المستمرة'
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
    setIsFirstVisit(false);
    setShowMainTutorial(true);
    setTutorialStep(0);
    setCurrentFeatureId(mainFeatures[0].id);
  };

  const handleSkipTutorial = () => {
    setIsFirstVisit(false);
    setTutorialCompleted(true);
    toast({
      title: "Tutorial Skipped",
      description: "You can access tutorials anytime through the Help button.",
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
    setShowMainTutorial(false);
    setTutorialStep(0);
    setTutorialCompleted(true);
    
    toast({
      title: "Tutorial Completed",
      description: "You can always access feature tutorials by clicking 'How to use this feature' buttons.",
    });
    
    setShowHenry(true);
  };

  const closeTutorialAndMarkCompleted = () => {
    setShowMainTutorial(false);
    setTutorialCompleted(true);
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
              onClick={closeTutorialAndMarkCompleted}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {getTranslatedText('skipForNow')}
            </Button>
            
            <Button 
              onClick={handleNextFeatureTutorial}
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
