
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronLeft, ChevronRight, X, Award, Bell, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  highlight?: string;
}

interface FeatureTutorialProps {
  featureId: string;
  onClose: () => void;
  embedded?: boolean;
}

const FeatureTutorial: React.FC<FeatureTutorialProps> = ({ 
  featureId, 
  onClose,
  embedded = false
}) => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialSteps, setTutorialSteps] = useState<TutorialStep[]>([]);
  const location = useLocation();
  const { toast } = useToast();

  // Get the preferred language for translations
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';

  // Load tutorial steps based on the feature
  useEffect(() => {
    const getTutorialForFeature = () => {
      // Default tutorial steps for any feature
      const defaultSteps: TutorialStep[] = [
        {
          title: getTranslatedText('welcomeTitle', featureId),
          description: getTranslatedText('introDescription', featureId),
          image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
        }
      ];

      // Feature-specific tutorial steps
      switch (featureId) {
        case "wellness-challenges":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "challenges-overview"
            },
            {
              title: getTranslatedText('pointsTitle', featureId),
              description: getTranslatedText('pointsDescription', featureId),
              highlight: "points-system"
            },
            {
              title: getTranslatedText('categoriesTitle', featureId),
              description: getTranslatedText('categoriesDescription', featureId),
              highlight: "challenge-categories"
            },
            {
              title: getTranslatedText('completingTitle', featureId),
              description: getTranslatedText('completingDescription', featureId),
              highlight: "complete-challenge"
            },
            {
              title: getTranslatedText('redeemingTitle', featureId),
              description: getTranslatedText('redeemingDescription', featureId),
              highlight: "redeem-points"
            },
            {
              title: getTranslatedText('remindersTitle', featureId),
              description: getTranslatedText('remindersDescription', featureId),
              highlight: "reminders"
            }
          ];
        case "copay-credits":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "credits-overview"
            },
            {
              title: getTranslatedText('earningTitle', featureId),
              description: getTranslatedText('earningDescription', featureId),
              highlight: "earning-credits"
            },
            {
              title: getTranslatedText('usingTitle', featureId),
              description: getTranslatedText('usingDescription', featureId),
              highlight: "using-credits"
            }
          ];
        case "real-time-therapy":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "therapy-overview"
            },
            {
              title: getTranslatedText('sessionTitle', featureId),
              description: getTranslatedText('sessionDescription', featureId),
              highlight: "booking-session"
            },
            {
              title: getTranslatedText('paymentTitle', featureId),
              description: getTranslatedText('paymentDescription', featureId),
              highlight: "payment-options"
            }
          ];
        case "community-support":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "community-overview"
            },
            {
              title: getTranslatedText('groupsTitle', featureId),
              description: getTranslatedText('groupsDescription', featureId),
              highlight: "support-groups"
            },
            {
              title: getTranslatedText('postingTitle', featureId),
              description: getTranslatedText('postingDescription', featureId),
              highlight: "posting-guidelines"
            }
          ];
        case "resource-library":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "resources-overview"
            },
            {
              title: getTranslatedText('searchingTitle', featureId),
              description: getTranslatedText('searchingDescription', featureId),
              highlight: "search-filter"
            },
            {
              title: getTranslatedText('savingTitle', featureId),
              description: getTranslatedText('savingDescription', featureId),
              highlight: "save-resources"
            }
          ];
        case "dashboard":
          return [
            ...defaultSteps,
            {
              title: getTranslatedText('featureTitle', featureId),
              description: getTranslatedText('mainDescription', featureId),
              highlight: "dashboard-overview"
            },
            {
              title: getTranslatedText('widgetsTitle', featureId),
              description: getTranslatedText('widgetsDescription', featureId),
              highlight: "dashboard-widgets"
            },
            {
              title: getTranslatedText('navigationTitle', featureId),
              description: getTranslatedText('navigationDescription', featureId),
              highlight: "navigation"
            }
          ];
        // Add more features as needed
        default:
          return defaultSteps;
      }
    };

    setTutorialSteps(getTutorialForFeature());
  }, [featureId, preferredLanguage]);

  const getTranslatedText = (type: string, feature: string) => {
    // For brevity, we'll just handle a few key translations for the main features
    // A full implementation would have more comprehensive translations
    const translations: Record<string, Record<string, Record<string, string>>> = {
      'welcomeTitle': {
        'wellness-challenges': {
          'English': 'Welcome to Wellness Challenges',
          'Español': 'Bienvenido a los Desafíos de Bienestar',
          'Français': 'Bienvenue aux Défis de Bien-être',
          'Deutsch': 'Willkommen bei den Wellness-Herausforderungen',
          '中文': '欢迎来到健康挑战',
          'العربية': 'مرحبًا بك في تحديات العافية'
        },
        'copay-credits': {
          'English': 'Welcome to Co-Pay Credits',
          'Español': 'Bienvenido a Créditos de Copago',
          'Français': 'Bienvenue aux Crédits de Quote-part',
          'Deutsch': 'Willkommen bei den Zuzahlungsguthaben',
          '中文': '欢迎来到共付额积分',
          'العربية': 'مرحبًا بك في ائتمانات الدفع المشترك'
        },
        'dashboard': {
          'English': 'Welcome to Your Dashboard',
          'Español': 'Bienvenido a tu Panel',
          'Français': 'Bienvenue sur Votre Tableau de Bord',
          'Deutsch': 'Willkommen in Ihrem Dashboard',
          '中文': '欢迎来到您的仪表板',
          'العربية': 'مرحبًا بك في لوحة التحكم الخاصة بك'
        }
      },
      'introDescription': {
        'wellness-challenges': {
          'English': "I'm Henry, and I'll guide you through the Wellness Challenges feature.",
          'Español': "Soy Henry, y te guiaré a través de la función de Desafíos de Bienestar.",
          'Français': "Je suis Henry, et je vous guiderai à travers la fonctionnalité Défis de Bien-être.",
          'Deutsch': "Ich bin Henry und führe Sie durch die Wellness-Herausforderungen.",
          '中文': "我是亨利，我将指导您了解健康挑战功能。",
          'العربية': "أنا هنري، وسأرشدك خلال ميزة تحديات العافية."
        },
        'dashboard': {
          'English': "I'm Henry, and I'll guide you through your personalized dashboard.",
          'Español': "Soy Henry, y te guiaré a través de tu panel personalizado.",
          'Français': "Je suis Henry, et je vous guiderai à travers votre tableau de bord personnalisé.",
          'Deutsch': "Ich bin Henry und führe Sie durch Ihr personalisiertes Dashboard.",
          '中文': "我是亨利，我将指导您了解您的个性化仪表板。",
          'العربية': "أنا هنري، وسأرشدك خلال لوحة التحكم المخصصة لك."
        }
      },
      'featureTitle': {
        'wellness-challenges': {
          'English': 'Wellness Challenges',
          'Español': 'Desafíos de Bienestar',
          'Français': 'Défis de Bien-être',
          'Deutsch': 'Wellness-Herausforderungen',
          '中文': '健康挑战',
          'العربية': 'تحديات العافية'
        }
      },
      'mainDescription': {
        'wellness-challenges': {
          'English': 'Complete daily challenges to improve your mental health and earn points towards co-pay credits.',
          'Español': 'Completa desafíos diarios para mejorar tu salud mental y ganar puntos para créditos de copago.',
          'Français': 'Complétez des défis quotidiens pour améliorer votre santé mentale et gagner des points pour des crédits de quote-part.',
          'Deutsch': 'Absolvieren Sie tägliche Herausforderungen, um Ihre psychische Gesundheit zu verbessern und Punkte für Zuzahlungsguthaben zu sammeln.',
          '中文': '完成每日挑战，改善您的心理健康并获取积分兑换共付额积分。',
          'العربية': 'أكمل التحديات اليومية لتحسين صحتك العقلية وكسب النقاط نحو ائتمانات الدفع المشترك.'
        }
      },
      'next': {
        'English': 'Next',
        'Español': 'Siguiente',
        'Français': 'Suivant',
        'Deutsch': 'Weiter',
        '中文': '下一个',
        'العربية': 'التالي'
      },
      'previous': {
        'English': 'Previous',
        'Español': 'Anterior',
        'Français': 'Précédent',
        'Deutsch': 'Zurück',
        '中文': '上一个',
        'العربية': 'السابق'
      },
      'finish': {
        'English': 'Finish',
        'Español': 'Finalizar',
        'Français': 'Terminer',
        'Deutsch': 'Beenden',
        '中文': '完成',
        'العربية': 'إنهاء'
      },
      'tutorialClosed': {
        'English': 'Tutorial Closed',
        'Español': 'Tutorial Cerrado',
        'Français': 'Tutoriel Fermé',
        'Deutsch': 'Tutorial Geschlossen',
        '中文': '教程已关闭',
        'العربية': 'تم إغلاق البرنامج التعليمي'
      },
      'restartHelp': {
        'English': 'You can restart the tutorial anytime by clicking \'Help\' in the menu.',
        'Español': 'Puedes reiniciar el tutorial en cualquier momento haciendo clic en \'Ayuda\' en el menú.',
        'Français': 'Vous pouvez redémarrer le tutoriel à tout moment en cliquant sur \'Aide\' dans le menu.',
        'Deutsch': 'Sie können das Tutorial jederzeit neu starten, indem Sie im Menü auf \'Hilfe\' klicken.',
        '中文': '您可以随时通过单击菜单中的\'帮助\'重新启动教程。',
        'العربية': 'يمكنك إعادة تشغيل البرنامج التعليمي في أي وقت بالنقر على \'مساعدة\' في القائمة.'
      }
    };
    
    // Default to English if translation not found
    if (!translations[type] || !translations[type][feature]) {
      return type === 'next' ? 'Next' : 
             type === 'previous' ? 'Previous' : 
             type === 'finish' ? 'Finish' : 
             'No translation available';
    }
    
    return translations[type][feature][preferredLanguage] || translations[type][feature]['English'];
  };

  const handleClose = () => {
    if (!embedded) {
      setOpen(false);
      onClose();
      
      toast({
        title: getTranslatedText('tutorialClosed', featureId),
        description: getTranslatedText('restartHelp', featureId),
      });
    }
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIcon = () => {
    const step = tutorialSteps[currentStep];
    if (step.highlight === "points-system" || step.highlight === "earning-credits") {
      return <Award className="h-12 w-12 text-amber-400 mb-2" />;
    } else if (step.highlight === "reminders") {
      return <Bell className="h-12 w-12 text-indigo-400 mb-2" />;
    } else if (step.highlight === "complete-challenge") {
      return <CheckCircle className="h-12 w-12 text-green-400 mb-2" />;
    } else {
      return <Lightbulb className="h-12 w-12 text-amber-400 mb-2" />;
    }
  };

  // If embedded mode, just render the content without dialog
  if (embedded) {
    return (
      <div className="bg-[#2a2a3c]/60 border border-[#3a3a4c] rounded-lg overflow-hidden">
        {tutorialSteps.length > 0 && (
          <div className="py-4 text-center px-4">
            {renderStepIcon()}
            <h3 className="text-lg font-medium text-white mb-2">
              {tutorialSteps[currentStep].title}
            </h3>
            <p className="text-gray-300">
              {tutorialSteps[currentStep].description}
            </p>
            
            {tutorialSteps[currentStep].image && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img 
                  src={tutorialSteps[currentStep].image} 
                  alt={tutorialSteps[currentStep].title} 
                  className="w-full"
                />
              </div>
            )}
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {getTranslatedText('previous', featureId)}
              </Button>
              
              <Button 
                variant="default" 
                size="sm"
                onClick={handleNext}
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                {currentStep < tutorialSteps.length - 1 ? (
                  <>
                    {getTranslatedText('next', featureId)}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  getTranslatedText('finish', featureId)
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular dialog mode
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" 
              alt="Henry" 
              className="w-8 h-8 mr-3 rounded-full"
            />
            <DialogTitle className="text-xl text-white">Feature Tutorial</DialogTitle>
          </div>
          <DialogDescription className="text-gray-300">
            Step {currentStep + 1} of {tutorialSteps.length}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          {tutorialSteps.length > 0 && (
            <div className="py-4 text-center">
              {renderStepIcon()}
              <h3 className="text-lg font-medium text-white mb-2">
                {tutorialSteps[currentStep].title}
              </h3>
              <p className="text-gray-300">
                {tutorialSteps[currentStep].description}
              </p>
              
              {tutorialSteps[currentStep].image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img 
                    src={tutorialSteps[currentStep].image} 
                    alt={tutorialSteps[currentStep].title} 
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {getTranslatedText('previous', featureId)}
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={handleNext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {currentStep < tutorialSteps.length - 1 ? (
                <>
                  {getTranslatedText('next', featureId)}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                getTranslatedText('finish', featureId)
              )}
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureTutorial;
