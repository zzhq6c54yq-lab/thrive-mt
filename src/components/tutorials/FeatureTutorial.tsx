
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
  const isSpanish = preferredLanguage === 'Español';

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
    // For brevity, we'll handle translations for the main features
    const translations: Record<string, Record<string, Record<string, string>>> = {
      'welcomeTitle': {
        'wellness-challenges': {
          'English': 'Welcome to Wellness Challenges',
          'Español': 'Bienvenido a los Desafíos de Bienestar'
        },
        'copay-credits': {
          'English': 'Welcome to Co-Pay Credits',
          'Español': 'Bienvenido a Créditos de Copago'
        },
        'dashboard': {
          'English': 'Welcome to Your Dashboard',
          'Español': 'Bienvenido a tu Panel'
        },
        'real-time-therapy': {
          'English': 'Welcome to Real-Time Therapy',
          'Español': 'Bienvenido a Terapia en Tiempo Real'
        },
        'community-support': {
          'English': 'Welcome to Community Support',
          'Español': 'Bienvenido a Apoyo Comunitario'
        },
        'resource-library': {
          'English': 'Welcome to Resource Library',
          'Español': 'Bienvenido a la Biblioteca de Recursos'
        }
      },
      'introDescription': {
        'wellness-challenges': {
          'English': "I'm Henry, and I'll guide you through the Wellness Challenges feature.",
          'Español': "Soy Henry, y te guiaré a través de la función de Desafíos de Bienestar."
        },
        'dashboard': {
          'English': "I'm Henry, and I'll guide you through your personalized dashboard.",
          'Español': "Soy Henry, y te guiaré a través de tu panel personalizado."
        },
        'real-time-therapy': {
          'English': "I'm Henry, and I'll guide you through the Real-Time Therapy options.",
          'Español': "Soy Henry, y te guiaré a través de las opciones de Terapia en Tiempo Real."
        },
        'community-support': {
          'English': "I'm Henry, and I'll guide you through our Community Support features.",
          'Español': "Soy Henry, y te guiaré a través de nuestras características de Apoyo Comunitario."
        },
        'resource-library': {
          'English': "I'm Henry, and I'll guide you through our Resource Library.",
          'Español': "Soy Henry, y te guiaré a través de nuestra Biblioteca de Recursos."
        },
        'copay-credits': {
          'English': "I'm Henry, and I'll guide you through the Co-Pay Credits system.",
          'Español': "Soy Henry, y te guiaré a través del sistema de Créditos de Copago."
        }
      },
      'featureTitle': {
        'wellness-challenges': {
          'English': 'Wellness Challenges',
          'Español': 'Desafíos de Bienestar'
        },
        'copay-credits': {
          'English': 'Co-Pay Credits System',
          'Español': 'Sistema de Créditos de Copago'
        },
        'dashboard': {
          'English': 'Your Dashboard',
          'Español': 'Tu Panel'
        },
        'real-time-therapy': {
          'English': 'Real-Time Therapy',
          'Español': 'Terapia en Tiempo Real'
        },
        'community-support': {
          'English': 'Community Support',
          'Español': 'Apoyo Comunitario'
        },
        'resource-library': {
          'English': 'Resource Library',
          'Español': 'Biblioteca de Recursos'
        }
      },
      'mainDescription': {
        'wellness-challenges': {
          'English': 'Complete daily challenges to improve your mental health and earn points towards co-pay credits.',
          'Español': 'Completa desafíos diarios para mejorar tu salud mental y ganar puntos para créditos de copago.'
        },
        'copay-credits': {
          'English': 'Earn and use credits to reduce the cost of your therapy sessions.',
          'Español': 'Gana y usa créditos para reducir el costo de tus sesiones de terapia.'
        },
        'dashboard': {
          'English': 'Your dashboard provides a quick overview of your progress and upcoming appointments.',
          'Español': 'Tu panel proporciona una visión rápida de tu progreso y próximas citas.'
        },
        'real-time-therapy': {
          'English': 'Connect with licensed therapists instantly when you need support.',
          'Español': 'Conéctate con terapeutas licenciados al instante cuando necesites apoyo.'
        },
        'community-support': {
          'English': 'Connect with others facing similar challenges in a safe, moderated environment.',
          'Español': 'Conéctate con otros que enfrentan desafíos similares en un entorno seguro y moderado.'
        },
        'resource-library': {
          'English': 'Access a wide range of mental health resources, articles, and tools.',
          'Español': 'Accede a una amplia gama de recursos, artículos y herramientas de salud mental.'
        }
      },
      'pointsTitle': {
        'wellness-challenges': {
          'English': 'Points System',
          'Español': 'Sistema de Puntos'
        }
      },
      'pointsDescription': {
        'wellness-challenges': {
          'English': 'Earn points for completing challenges, which can be redeemed for co-pay credits.',
          'Español': 'Gana puntos por completar desafíos, que pueden canjearse por créditos de copago.'
        }
      },
      'categoriesTitle': {
        'wellness-challenges': {
          'English': 'Challenge Categories',
          'Español': 'Categorías de Desafíos'
        }
      },
      'categoriesDescription': {
        'wellness-challenges': {
          'English': 'Challenges are organized by category to target different aspects of mental wellness.',
          'Español': 'Los desafíos están organizados por categoría para apuntar a diferentes aspectos del bienestar mental.'
        }
      },
      'completingTitle': {
        'wellness-challenges': {
          'English': 'Completing Challenges',
          'Español': 'Completando Desafíos'
        }
      },
      'completingDescription': {
        'wellness-challenges': {
          'English': 'Mark challenges as complete to earn points and track your progress.',
          'Español': 'Marca los desafíos como completados para ganar puntos y seguir tu progreso.'
        }
      },
      'redeemingTitle': {
        'wellness-challenges': {
          'English': 'Redeeming Points',
          'Español': 'Canjeando Puntos'
        }
      },
      'redeemingDescription': {
        'wellness-challenges': {
          'English': 'Use your earned points to receive discounts on therapy sessions.',
          'Español': 'Usa tus puntos ganados para recibir descuentos en sesiones de terapia.'
        }
      },
      'remindersTitle': {
        'wellness-challenges': {
          'English': 'Setting Reminders',
          'Español': 'Configurando Recordatorios'
        }
      },
      'remindersDescription': {
        'wellness-challenges': {
          'English': 'Set reminders to help you stay on track with your daily challenges.',
          'Español': 'Configura recordatorios para ayudarte a mantenerte al día con tus desafíos diarios.'
        }
      },
      'earningTitle': {
        'copay-credits': {
          'English': 'Earning Credits',
          'Español': 'Ganando Créditos'
        }
      },
      'earningDescription': {
        'copay-credits': {
          'English': 'Complete wellness challenges and activities to earn co-pay credits.',
          'Español': 'Completa desafíos de bienestar y actividades para ganar créditos de copago.'
        }
      },
      'usingTitle': {
        'copay-credits': {
          'English': 'Using Credits',
          'Español': 'Usando Créditos'
        }
      },
      'usingDescription': {
        'copay-credits': {
          'English': 'Apply your credits to reduce the cost of therapy sessions at checkout.',
          'Español': 'Aplica tus créditos para reducir el costo de las sesiones de terapia al pagar.'
        }
      },
      'sessionTitle': {
        'real-time-therapy': {
          'English': 'Booking a Session',
          'Español': 'Reservando una Sesión'
        }
      },
      'sessionDescription': {
        'real-time-therapy': {
          'English': 'Schedule appointments with therapists based on your availability.',
          'Español': 'Programa citas con terapeutas según tu disponibilidad.'
        }
      },
      'paymentTitle': {
        'real-time-therapy': {
          'English': 'Payment Options',
          'Español': 'Opciones de Pago'
        }
      },
      'paymentDescription': {
        'real-time-therapy': {
          'English': 'Use insurance, co-pay credits, or direct payment for your sessions.',
          'Español': 'Usa seguro, créditos de copago o pago directo para tus sesiones.'
        }
      },
      'groupsTitle': {
        'community-support': {
          'English': 'Support Groups',
          'Español': 'Grupos de Apoyo'
        }
      },
      'groupsDescription': {
        'community-support': {
          'English': 'Join virtual support groups led by qualified facilitators.',
          'Español': 'Únete a grupos de apoyo virtuales dirigidos por facilitadores calificados.'
        }
      },
      'postingTitle': {
        'community-support': {
          'English': 'Posting Guidelines',
          'Español': 'Pautas para Publicar'
        }
      },
      'postingDescription': {
        'community-support': {
          'English': 'Learn about our community guidelines for respectful communication.',
          'Español': 'Aprende sobre nuestras pautas comunitarias para una comunicación respetuosa.'
        }
      },
      'searchingTitle': {
        'resource-library': {
          'English': 'Searching Resources',
          'Español': 'Buscando Recursos'
        }
      },
      'searchingDescription': {
        'resource-library': {
          'English': 'Use filters and keywords to find relevant mental health resources.',
          'Español': 'Usa filtros y palabras clave para encontrar recursos relevantes de salud mental.'
        }
      },
      'savingTitle': {
        'resource-library': {
          'English': 'Saving Resources',
          'Español': 'Guardando Recursos'
        }
      },
      'savingDescription': {
        'resource-library': {
          'English': 'Save your favorite resources for quick access later.',
          'Español': 'Guarda tus recursos favoritos para acceder rápidamente más tarde.'
        }
      },
      'widgetsTitle': {
        'dashboard': {
          'English': 'Dashboard Widgets',
          'Español': 'Widgets del Panel'
        }
      },
      'widgetsDescription': {
        'dashboard': {
          'English': 'Each widget on your dashboard provides valuable information and quick access to features.',
          'Español': 'Cada widget en tu panel proporciona información valiosa y acceso rápido a las funciones.'
        }
      },
      'navigationTitle': {
        'dashboard': {
          'English': 'Navigation',
          'Español': 'Navegación'
        }
      },
      'navigationDescription': {
        'dashboard': {
          'English': 'Access all app features from your dashboard through the menu and feature cards.',
          'Español': 'Accede a todas las funciones de la aplicación desde tu panel a través del menú y las tarjetas de funciones.'
        }
      }
    };
    
    // Common button/navigation translations that should be available for all features
    const commonTranslations: Record<string, Record<string, string>> = {
      'next': {
        'English': 'Next',
        'Español': 'Siguiente'
      },
      'previous': {
        'English': 'Previous',
        'Español': 'Anterior'
      },
      'finish': {
        'English': 'Finish',
        'Español': 'Finalizar'
      },
      'tutorialClosed': {
        'English': 'Tutorial Closed',
        'Español': 'Tutorial Cerrado'
      },
      'restartHelp': {
        'English': 'You can restart the tutorial anytime by clicking \'Help\' in the menu.',
        'Español': 'Puedes reiniciar el tutorial en cualquier momento haciendo clic en \'Ayuda\' en el menú.'
      }
    };
    
    // Check if the requested translation is a common UI element
    if (commonTranslations[type]) {
      return commonTranslations[type][preferredLanguage] || commonTranslations[type]['English'];
    }
    
    // Check if the feature-specific translation exists
    if (!translations[type] || !translations[type][feature] || !translations[type][feature][preferredLanguage]) {
      return type === 'next' ? 'Next' : 
             type === 'previous' ? 'Previous' : 
             type === 'finish' ? 'Finish' : 
             'No translation available';
    }
    
    return translations[type][feature][preferredLanguage];
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
            <DialogTitle className="text-xl text-white">{isSpanish ? "Tutorial de Características" : "Feature Tutorial"}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-300">
            {isSpanish ? `Paso ${currentStep + 1} de ${tutorialSteps.length}` : `Step ${currentStep + 1} of ${tutorialSteps.length}`}
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
