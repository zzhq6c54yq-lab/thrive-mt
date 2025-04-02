
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, ChevronLeft, ChevronRight, X, Award, Bell, CheckCircle,
  Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen,
  ListChecks, Video, Puzzle, HeartHandshake, Headphones, Coffee, Moon,
  HandHeart, Target, Shield, Compass, Book, Briefcase, Fingerprint,
  Sparkles, UserCircle, Laugh, PlusCircle, Settings, HelpCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Function to get feature tutorials based on the feature ID
  const getFeatureTutorials = () => {
    // This contains all the tutorial content organized by feature ID
    const tutorials = {
      'dashboard': {
        icon: <Sparkles className="text-[#B87333]" />,
        title: isSpanish ? "Panel Principal" : "Main Dashboard",
        steps: [
          {
            title: isSpanish ? "Bienvenido al Panel Principal" : "Welcome to your Dashboard",
            description: isSpanish 
              ? "Este es tu centro de control personal para tu viaje de bienestar mental. Aquí encontrarás una visión general de todas las características clave, desafíos, citas y insights."
              : "This is your personal control center for your mental wellness journey. Here you'll find an overview of all key features, challenges, appointments, and insights.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Menú de Navegación" : "Navigation Menu",
            description: isSpanish 
              ? "Usa los íconos en la parte superior derecha para acceder a tu perfil, configuración, y alternar el idioma. También puedes encontrar tutoriales para cada característica haciendo clic en el botón 'Cómo usar esta función'."
              : "Use the icons at the top right to access your profile, settings, and toggle language. You can also find tutorials for each feature by clicking the 'How to use this feature' button.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Personalización" : "Personalization",
            description: isSpanish 
              ? "Tu tablero está personalizado según las preferencias que seleccionaste durante la configuración. Puedes actualizar estas preferencias en cualquier momento a través de la configuración de perfil."
              : "Your dashboard is personalized based on the preferences you selected during setup. You can update these preferences anytime through profile settings.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
      'wellness-challenges': {
        icon: <CheckCircle className="text-green-500" />,
        title: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
        steps: [
          {
            title: isSpanish ? "Desafíos Diarios" : "Daily Challenges",
            description: isSpanish 
              ? "Los desafíos de bienestar son actividades pequeñas y efectivas diseñadas para mejorar tu salud mental y bienestar general cada día."
              : "Wellness challenges are small, effective activities designed to improve your mental health and overall wellbeing each day.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Completando Desafíos" : "Completing Challenges",
            description: isSpanish 
              ? "Marca los desafíos como completados para ganar créditos de copago y seguir tu progreso. Los desafíos completados construyen un historial de bienestar visible en tus análisis."
              : "Mark challenges as complete to earn co-pay credits and track your progress. Completed challenges build a wellness history visible in your analytics.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Desafíos Personalizados" : "Personalized Challenges",
            description: isSpanish 
              ? "Los desafíos se adaptan a tus necesidades específicas y objetivos de bienestar mental. Se vuelven más personalizados a medida que interactúas con la aplicación."
              : "Challenges are tailored to your specific needs and mental wellness goals. They become more personalized as you interact with the app.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
      'specialized-programs': {
        icon: <Shield className="text-blue-500" />,
        title: isSpanish ? "Programas Especializados" : "Specialized Programs",
        steps: [
          {
            title: isSpanish ? "Programas a Medida" : "Tailored Programs",
            description: isSpanish 
              ? "Los programas especializados ofrecen recursos y apoyo específicos para diferentes grupos, como personal militar, estudiantes universitarios y propietarios de pequeñas empresas."
              : "Specialized programs offer specific resources and support for different groups, like military personnel, college students, and small business owners.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Beneficios del Programa" : "Program Benefits",
            description: isSpanish 
              ? "Cada programa incluye recursos, talleres y herramientas específicamente diseñadas para abordar los desafíos únicos de salud mental que enfrentan estos grupos."
              : "Each program includes resources, workshops, and tools specifically designed to address the unique mental health challenges faced by these groups.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Accediendo a Programas" : "Accessing Programs",
            description: isSpanish 
              ? "Haz clic en cualquier programa para explorar su contenido completo. Puedes participar en múltiples programas simultáneamente según tus necesidades."
              : "Click on any program to explore its full content. You can participate in multiple programs simultaneously based on your needs.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          }
        ]
      },
      'gratitude-visualizer': {
        icon: <Heart className="text-red-500" />,
        title: isSpanish ? "Visualizador de Gratitud" : "Gratitude Visualizer",
        steps: [
          {
            title: isSpanish ? "Expresando Gratitud" : "Expressing Gratitude",
            description: isSpanish 
              ? "El visualizador de gratitud te ayuda a reconocer y apreciar los aspectos positivos de tu vida, lo que está científicamente demostrado que mejora el bienestar mental."
              : "The gratitude visualizer helps you acknowledge and appreciate the positive aspects of your life, which is scientifically proven to improve mental wellbeing.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Añadiendo Entradas" : "Adding Entries",
            description: isSpanish 
              ? "Añade nuevas entradas de gratitud haciendo clic en el botón '+'. Puedes incluir texto, imágenes o seleccionar de una lista de sugerencias."
              : "Add new gratitude entries by clicking the '+' button. You can include text, images, or select from a list of suggestions.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Visualizando Patrones" : "Visualizing Patterns",
            description: isSpanish 
              ? "Con el tiempo, podrás ver patrones en tus entradas de gratitud, revelando lo que valoras más y contribuyendo a una mejor autoconciencia."
              : "Over time, you'll see patterns in your gratitude entries, revealing what you value most and contributing to better self-awareness.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
      'appointments': {
        icon: <CalendarRange className="text-purple-500" />,
        title: isSpanish ? "Próximas Citas" : "Upcoming Appointments",
        steps: [
          {
            title: isSpanish ? "Gestión de Citas" : "Appointment Management",
            description: isSpanish 
              ? "La sección de citas te muestra todas tus próximas sesiones programadas con terapeutas, grupos de apoyo, o talleres."
              : "The appointments section shows you all your upcoming scheduled sessions with therapists, support groups, or workshops.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Preparación para Sesiones" : "Session Preparation",
            description: isSpanish 
              ? "Haz clic en cualquier cita para ver detalles, prepararte para la sesión, o acceder a material preliminar recomendado por tu terapeuta."
              : "Click on any appointment to see details, prepare for the session, or access preliminary material recommended by your therapist.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Programación" : "Scheduling",
            description: isSpanish 
              ? "Para programar nuevas citas, haz clic en 'Programar cita' o navega a la sección de Terapia en Tiempo Real en el menú principal."
              : "To schedule new appointments, click 'Schedule appointment' or navigate to the Real-Time Therapy section in the main menu.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
      'insights': {
        icon: <Brain className="text-indigo-500" />,
        title: isSpanish ? "Análisis" : "Insights",
        steps: [
          {
            title: isSpanish ? "Análisis Personalizados" : "Personalized Insights",
            description: isSpanish 
              ? "La sección de análisis proporciona información personalizada basada en tus actividades, patrones de estado de ánimo, y progreso en la aplicación."
              : "The insights section provides personalized information based on your activities, mood patterns, and progress in the app.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Seguimiento de Patrones" : "Pattern Tracking",
            description: isSpanish 
              ? "Observa cómo cambian tus patrones de bienestar con el tiempo. Estos análisis se vuelven más precisos cuanto más utilices la aplicación."
              : "See how your wellness patterns change over time. These insights become more accurate the more you use the app.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Recomendaciones Prácticas" : "Actionable Recommendations",
            description: isSpanish 
              ? "Basándose en tus análisis, recibirás recomendaciones prácticas para mejorar tu bienestar mental y abordar áreas específicas de preocupación."
              : "Based on your insights, you'll receive actionable recommendations to improve your mental wellbeing and address specific areas of concern.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
      'quizzes': {
        icon: <HelpCircle className="text-amber-500" />,
        title: isSpanish ? "Cuestionarios" : "Quizzes",
        steps: [
          {
            title: isSpanish ? "Cuestionarios Educativos" : "Educational Quizzes",
            description: isSpanish 
              ? "Los cuestionarios de salud mental son herramientas interactivas diseñadas para aumentar tu conocimiento y autoconciencia sobre varios aspectos de la salud mental."
              : "Mental health quizzes are interactive tools designed to increase your knowledge and self-awareness about various aspects of mental health.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Seguimiento de Progreso" : "Progress Tracking",
            description: isSpanish 
              ? "Cada cuestionario muestra tu progreso y puedes retomar donde lo dejaste. Completa cuestionarios para ganar créditos de copago."
              : "Each quiz shows your progress and you can pick up where you left off. Complete quizzes to earn co-pay credits.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Categorías de Cuestionarios" : "Quiz Categories",
            description: isSpanish 
              ? "Explora diferentes categorías de cuestionarios, desde conceptos básicos de salud mental hasta técnicas específicas como la atención plena y la regulación emocional."
              : "Explore different quiz categories, from mental health basics to specific techniques like mindfulness and emotional regulation.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
      'workshops': {
        icon: <Users className="text-green-600" />,
        title: isSpanish ? "Talleres Destacados" : "Featured Workshops",
        steps: [
          {
            title: isSpanish ? "Talleres Interactivos" : "Interactive Workshops",
            description: isSpanish 
              ? "Los talleres son sesiones educativas guiadas que cubren diversos temas de salud mental, desde técnicas de manejo del estrés hasta habilidades de comunicación."
              : "Workshops are guided educational sessions covering various mental health topics, from stress management techniques to communication skills.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Participación en Talleres" : "Workshop Participation",
            description: isSpanish 
              ? "Haz clic en un taller para ver detalles, unirte a una sesión en vivo, o acceder a contenido grabado. Puedes interactuar con facilitadores y otros participantes."
              : "Click on a workshop to view details, join a live session, or access recorded content. You can interact with facilitators and other participants.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Talleres Personalizados" : "Personalized Workshops",
            description: isSpanish 
              ? "Los talleres destacados se seleccionan en base a tus objetivos de bienestar y preferencias. Explora todos los talleres disponibles en la sección de Talleres."
              : "Featured workshops are selected based on your wellness goals and preferences. Explore all available workshops in the Workshops section.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
      'key-features': {
        icon: <Sparkles className="text-blue-400" />,
        title: isSpanish ? "Características Principales" : "Key Features",
        steps: [
          {
            title: isSpanish ? "Navegación Rápida" : "Quick Navigation",
            description: isSpanish 
              ? "Las características principales proporcionan acceso directo a las funcionalidades más utilizadas de Thrive MT, permitiéndote navegar rápidamente a donde necesitas ir."
              : "Key features provide direct access to Thrive MT's most-used functionalities, allowing you to quickly navigate to where you need to go.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          },
          {
            title: isSpanish ? "Exploración de Características" : "Feature Exploration",
            description: isSpanish 
              ? "Haz clic en cualquier característica para explorarla en profundidad. Cada una tiene su propio tutorial al que puedes acceder a través del botón 'Cómo usar esta función'."
              : "Click on any feature to explore it in depth. Each one has its own tutorial that you can access via the 'How to use this feature' button.",
            image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
          },
          {
            title: isSpanish ? "Personalización de Accesos" : "Customizing Access",
            description: isSpanish 
              ? "Puedes personalizar qué características aparecen en esta sección a través de la configuración de perfil, asegurando un acceso rápido a las herramientas que más utilizas."
              : "You can customize which features appear in this section through profile settings, ensuring quick access to the tools you use most.",
            image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          }
        ]
      },
    };
    
    return tutorials[featureId as keyof typeof tutorials] || {
      icon: <Lightbulb className="text-amber-500" />,
      title: isSpanish ? "Tutorial de Características" : "Feature Tutorial",
      steps: [
        {
          title: isSpanish ? "Características Próximamente" : "Features Coming Soon",
          description: isSpanish 
            ? "Esta característica está actualmente en desarrollo. ¡Vuelve pronto para ver actualizaciones!"
            : "This feature is currently under development. Check back soon for updates!",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        }
      ]
    };
  };
  
  const tutorial = getFeatureTutorials();
  const totalSteps = tutorial.steps.length;
  
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
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
  
  const currentTutorialStep = tutorial.steps[currentStep];
  
  const DialogComponent = embedded ? React.Fragment : DialogContent;
  
  return (
    <>
      {!embedded && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md bg-[#2a2a3c] border-[#3a3a4c] text-white">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/10">
                  {tutorial.icon}
                </div>
                <DialogTitle className="text-xl flex items-center">
                  {tutorial.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-gray-300">
                {isSpanish ? "Paso" : "Step"} {currentStep + 1} {isSpanish ? "de" : "of"} {totalSteps}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-white">{currentTutorialStep.title}</h3>
                
                {currentTutorialStep.image && (
                  <div className="flex justify-center">
                    <img 
                      src={currentTutorialStep.image} 
                      alt={currentTutorialStep.title}
                      className="max-h-40 object-contain rounded-lg border border-white/10"
                    />
                  </div>
                )}
                
                <p className="text-gray-300">{currentTutorialStep.description}</p>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between space-x-2">
              <div className="flex-1">
                {currentStep > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {isSpanish ? "Anterior" : "Previous"}
                  </Button>
                )}
              </div>
              
              <Button 
                onClick={handleNext}
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                {currentStep < totalSteps - 1 ? (
                  <>
                    {isSpanish ? "Siguiente" : "Next"}
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  isSpanish ? "Finalizar" : "Finish"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {embedded && (
        <div className="bg-[#2a2a3c] border border-[#3a3a4c] rounded-lg text-white overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/10">
                {tutorial.icon}
              </div>
              <h2 className="text-xl font-semibold">{tutorial.title}</h2>
            </div>
            <div className="text-gray-300 text-sm">
              {isSpanish ? "Paso" : "Step"} {currentStep + 1} {isSpanish ? "de" : "of"} {totalSteps}
            </div>
          </div>
          
          <div className="px-4 py-3">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-white">{currentTutorialStep.title}</h3>
              
              {currentTutorialStep.image && (
                <div className="flex justify-center">
                  <img 
                    src={currentTutorialStep.image} 
                    alt={currentTutorialStep.title}
                    className="max-h-40 object-contain rounded-lg border border-white/10"
                  />
                </div>
              )}
              
              <p className="text-gray-300">{currentTutorialStep.description}</p>
            </div>
          </div>
          
          <div className="p-4 flex justify-between border-t border-gray-700">
            <div className="flex-1">
              {currentStep > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {isSpanish ? "Anterior" : "Previous"}
                </Button>
              )}
            </div>
            
            <Button 
              onClick={handleNext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {currentStep < totalSteps - 1 ? (
                <>
                  {isSpanish ? "Siguiente" : "Next"}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </>
              ) : (
                isSpanish ? "Finalizar" : "Finish"
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureTutorial;
