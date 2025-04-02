
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, ChevronLeft, Handshake, WalletCards, Crown, CheckCircle,
  Shield, Heart, Brain, Briefcase, GraduationCap, Sparkles, X,
  CalendarRange, LineChart, Users, Library, PlusCircle, Video, 
  Headphones, Moon, Book, UserCircle, Target, Compass, HandHeart,
  ListChecks, MessageSquare, BarChart, Leaf, Flower, Tablet, Stethoscope,
  Clock, Zap, BookOpen, HeartPulse, HelpCircle, Bell
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkip: () => void;
  onStartTutorial: () => void;
  translatedText: (key: string) => string;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({
  open,
  onOpenChange,
  onSkip,
  onStartTutorial,
  translatedText
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const isSpanish = translatedText('welcomeTitle').includes('Bienvenido');
  
  // Reset to first step when opened
  React.useEffect(() => {
    if (open) {
      setStepIndex(0);
    }
  }, [open]);

  const handleNext = () => {
    if (stepIndex < tutorialSteps.length - 1) {
      setStepIndex(prevStep => prevStep + 1);
    } else {
      onStartTutorial();
    }
  };

  const handlePrevious = () => {
    if (stepIndex > 0) {
      setStepIndex(prevStep => prevStep - 1);
    }
  };

  const tutorialSteps = [
    // Welcome Step
    {
      id: "welcome",
      title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
      content: (
        <div className="flex flex-col items-center">
          <div className="relative my-4 group">
            {/* Animated logo with floating rings similar to ThriveHeader */}
            <div className="absolute inset-[-45px] rounded-full bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 blur-xl animate-pulse" style={{animationDuration: '3s'}}></div>
            <div className="absolute inset-[-60px] rounded-full border-2 border-[#B87333]/60 animate-spin" style={{animationDuration: '15s'}}></div>
            <div className="absolute inset-[-35px] rounded-full border border-[#E5C5A1]/70 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
            <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-[#B87333]/90 to-[#E5C5A1]/60 blur-sm animate-pulse" style={{animationDuration: '4s'}}></div>
            
            {/* Enhanced sparkling effect */}
            <div className="absolute top-[-20px] left-[35px] w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '1.8s', animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-[-12px] right-[45px] w-3.5 h-3.5 bg-white rounded-full animate-ping" style={{animationDuration: '1.5s', animationDelay: '1s'}}></div>
            <div className="absolute top-[45px] right-[-25px] w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '2.1s'}}></div>
            <div className="absolute bottom-[40px] left-[-15px] w-3 h-3 bg-white rounded-full animate-ping" style={{animationDuration: '2.4s', animationDelay: '0.7s'}}></div>
            
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Thrive MT Logo" 
              className="relative h-[112px] w-[112px] object-contain filter drop-shadow-[0_0_35px_rgba(184,115,51,1)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_45px_rgba(184,115,51,1)]"
            />
            
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333]/40 via-transparent to-[#B87333]/40 animate-pulse" style={{animationDuration: '5s'}}></div>
            <div className="absolute inset-[-10px] border-4 border-[#B87333]/30 rounded-full animate-ping" style={{animationDuration: '3.5s'}}></div>
            <div className="absolute inset-[-25px] border-2 border-[#E5C5A1]/30 rounded-full animate-ping" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}></div>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mt-4">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
              {isSpanish ? "Bienvenido a" : "Welcome to"}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1] via-[#B87333] to-[#E5C5A1] animate-gradient-x" style={{backgroundSize: '200% auto', animationDelay: '0.5s'}}>
              Thrive MT
            </span>
          </h1>
          
          <p className="text-gray-300 mt-6 text-center max-w-md">
            {isSpanish 
              ? "Vamos a explorar juntos las características principales de Thrive MT para ayudarte a comenzar tu viaje de bienestar mental." 
              : "Let's explore the main features of Thrive MT together to help you start your mental wellness journey."}
          </p>
          
          <div className="mt-4 text-center">
            <p className="text-amber-300 font-medium">
              {isSpanish 
                ? "Este tutorial te guiará a través de:" 
                : "This tutorial will guide you through:"}
            </p>
            <ul className="mt-2 text-sm text-gray-300 flex flex-col gap-1">
              <li>• {isSpanish ? "Nuevas características" : "New Features"}</li>
              <li>• {isSpanish ? "Desafíos diarios de bienestar" : "Daily Wellness Challenges"}</li>
              <li>• {isSpanish ? "Programas especializados" : "Specialized Programs"}</li>
              <li>• {isSpanish ? "Visualizador de gratitud" : "Gratitude Visualizer"}</li>
              <li>• {isSpanish ? "Y más..." : "And more..."}</li>
            </ul>
          </div>
        </div>
      )
    },
    
    // New Features: Barter System, Co-Pay Credits, and Upgrade Plan
    {
      id: "new-features",
      title: isSpanish ? "Nuevas Características" : "New Features",
      content: (
        <div>
          <div className="bg-gradient-to-r from-[#1c2e4a] to-[#2d3748] border border-[#B87333]/20 py-4 px-3 rounded-lg shadow-lg relative mb-4">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.05%22 stroke-width=%221%22/></svg>')] opacity-40 rounded-lg"></div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Sparkles className="h-5 w-5 text-[#B87333] mr-2" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333]">
                {isSpanish ? "Nuevas Características" : "New Features"}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#1A2436]/80 p-3 rounded-lg border border-[#B87333]/20 flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#B87333]/20 mb-2">
                  <Handshake className="h-5 w-5 text-[#E5C5A1]" />
                </div>
                <span className="font-medium text-center">{isSpanish ? "Sistema de Intercambio" : "Barter System"}</span>
              </div>
              
              <div className="bg-[#1A2436]/80 p-3 rounded-lg border border-[#B87333]/20 flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#B87333]/20 mb-2">
                  <WalletCards className="h-5 w-5 text-[#E5C5A1]" />
                </div>
                <span className="font-medium text-center">{isSpanish ? "Créditos de Copago" : "Co-Pay Credits"}</span>
              </div>
              
              <div className="bg-[#1A2436]/80 p-3 rounded-lg border border-[#B87333]/20 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] opacity-20 background-animate"></div>
                <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm mb-2 z-10">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-center z-10">{isSpanish ? "Plan Premium" : "Premium Plan"}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <Handshake className="h-5 w-5 text-[#B87333] mr-2" />
              {isSpanish ? "Sistema de Intercambio" : "Barter System"}
            </h4>
            <p>
              {isSpanish 
                ? "Intercambia servicios de salud mental con otras personas. Ofrece tus habilidades a cambio de servicios que necesitas, creando una comunidad de apoyo mutuo." 
                : "Exchange mental health services with others. Offer your skills in exchange for services you need, creating a community of mutual support."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <WalletCards className="h-5 w-5 text-[#B87333] mr-2" />
              {isSpanish ? "Créditos de Copago" : "Co-Pay Credits"}
            </h4>
            <p>
              {isSpanish 
                ? "Gana créditos al completar desafíos diarios, participar en talleres y contribuir a la comunidad. Estos créditos pueden usarse para reducir el costo de tus copagos de terapia." 
                : "Earn credits by completing daily challenges, participating in workshops, and contributing to the community. These credits can be used to reduce the cost of your therapy co-payments."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Crown className="h-5 w-5 text-[#B87333] mr-2" />
              {isSpanish ? "Plan Premium" : "Premium Plan"}
            </h4>
            <p>
              {isSpanish 
                ? "Actualiza tu membresía para acceder a herramientas premium, sesiones exclusivas con especialistas y funciones avanzadas para mejorar tu viaje de bienestar." 
                : "Upgrade your membership to access premium tools, exclusive sessions with specialists, and advanced features to enhance your wellness journey."}
            </p>
          </div>
        </div>
      )
    },
    
    // Daily Wellness Challenges
    {
      id: "daily-challenges",
      title: isSpanish ? "Desafíos Diarios de Bienestar" : "Daily Wellness Challenges",
      content: (
        <div>
          <div className="bg-gradient-to-br from-[#2A2C3F] to-[#1F2133] rounded-lg border border-indigo-900/30 p-4 mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-600/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-600/20 rounded-full blur-xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span>{isSpanish ? "Desafíos de Hoy" : "Today's Challenges"}</span>
              </h3>
              <span className="text-xs bg-green-500/20 text-green-300 py-1 px-2 rounded-full">
                +25 {isSpanish ? "Puntos" : "Points"}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <span className="text-xs text-blue-300">1</span>
                  </div>
                  <span className="text-sm">{isSpanish ? "Meditación matutina" : "Morning meditation"}</span>
                </div>
                <span className="text-xs text-green-300">+5 pts</span>
              </div>
              
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <span className="text-xs text-purple-300">2</span>
                  </div>
                  <span className="text-sm">{isSpanish ? "Escribir 3 gratitudes" : "Write 3 gratitudes"}</span>
                </div>
                <span className="text-xs text-green-300">+10 pts</span>
              </div>
              
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                    <span className="text-xs text-amber-300">3</span>
                  </div>
                  <span className="text-sm">{isSpanish ? "Caminata consciente" : "Mindful walking"}</span>
                </div>
                <span className="text-xs text-green-300">+10 pts</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white">
              {isSpanish ? "¿Qué son los Desafíos de Bienestar?" : "What are Wellness Challenges?"}
            </h4>
            <p>
              {isSpanish 
                ? "Los desafíos diarios son actividades simples diseñadas para mejorar tu bienestar mental. Cada desafío está basado en prácticas respaldadas científicamente que pueden mejorar tu estado de ánimo y salud mental." 
                : "Daily challenges are simple activities designed to improve your mental wellbeing. Each challenge is based on scientifically-backed practices that can improve your mood and mental health."}
            </p>
            
            <h4 className="font-medium text-white">
              {isSpanish ? "Ganando Créditos de Copago" : "Earning Co-Pay Credits"}
            </h4>
            <p>
              {isSpanish 
                ? "Cada desafío completado te otorga puntos. Estos puntos se convierten en Créditos de Copago que puedes usar para reducir el costo de tus sesiones de terapia. ¡Cuantos más desafíos completes, más ahorrarás!" 
                : "Each completed challenge earns you points. These points convert into Co-Pay Credits that you can use to reduce the cost of your therapy sessions. The more challenges you complete, the more you save!"}
            </p>
          </div>
        </div>
      )
    },
    
    // Specialized Programs
    {
      id: "specialized-programs",
      title: isSpanish ? "Programas Especializados" : "Specialized Programs",
      content: (
        <div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#1A202C] to-[#2D3748] border border-blue-900/30 rounded-lg p-4 relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-xl group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="p-3 rounded-full bg-blue-600/20 mb-2">
                  <Shield className="h-6 w-6 text-blue-300" />
                </div>
                <h4 className="font-semibold text-white mb-1">
                  {isSpanish ? "Programa DoD" : "DoD Program"}
                </h4>
                <p className="text-xs text-gray-300">
                  {isSpanish ? "Para personal militar y sus familias" : "For military personnel and their families"}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1A202C] to-[#2D3748] border border-purple-900/30 rounded-lg p-4 relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-xl group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="p-3 rounded-full bg-purple-600/20 mb-2">
                  <GraduationCap className="h-6 w-6 text-purple-300" />
                </div>
                <h4 className="font-semibold text-white mb-1">
                  {isSpanish ? "Portal Universitario" : "College Portal"}
                </h4>
                <p className="text-xs text-gray-300">
                  {isSpanish ? "Apoyo para estudiantes universitarios" : "Support for college students"}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1A202C] to-[#2D3748] border border-amber-900/30 rounded-lg p-4 relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/10 rounded-full blur-xl group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="p-3 rounded-full bg-amber-600/20 mb-2">
                  <Briefcase className="h-6 w-6 text-amber-300" />
                </div>
                <h4 className="font-semibold text-white mb-1">
                  {isSpanish ? "Pequeñas Empresas" : "Small Business"}
                </h4>
                <p className="text-xs text-gray-300">
                  {isSpanish ? "Para emprendedores y sus empleados" : "For entrepreneurs and their employees"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <Shield className="h-5 w-5 text-blue-400 mr-2" />
              {isSpanish ? "Programa del Departamento de Defensa (DoD)" : "Department of Defense (DoD) Program"}
            </h4>
            <p>
              {isSpanish 
                ? "Recursos especializados para personal militar activo, veteranos y sus familias. Incluye apoyo para TEPT, reintegración a la vida civil, y recursos específicos para los desafíos únicos que enfrentan." 
                : "Specialized resources for active military personnel, veterans, and their families. Includes support for PTSD, reintegration to civilian life, and resources specific to the unique challenges they face."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <GraduationCap className="h-5 w-5 text-purple-400 mr-2" />
              {isSpanish ? "Portal Universitario" : "College Portal"}
            </h4>
            <p>
              {isSpanish 
                ? "Diseñado para estudiantes universitarios que enfrentan estrés académico, ansiedad social, y presiones financieras. Incluye talleres para manejo del tiempo y balance entre vida y estudios." 
                : "Designed for college students facing academic stress, social anxiety, and financial pressures. Includes workshops for time management and work-life balance."}
            </p>
          </div>
        </div>
      )
    },
    
    // Conclusion Step
    {
      id: "conclusion",
      title: isSpanish ? "Comienza Tu Viaje" : "Start Your Journey",
      content: (
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full bg-gradient-to-r from-[#B87333]/30 to-[#E5C5A1]/30 mb-6">
            <Sparkles className="h-12 w-12 text-[#E5C5A1]" />
          </div>
          
          <h3 className="text-2xl font-semibold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333]">
              {isSpanish ? "¡Estás listo para empezar!" : "You're Ready to Begin!"}
            </span>
          </h3>
          
          <p className="text-gray-300 text-center mb-6 max-w-md">
            {isSpanish 
              ? "Ahora que conoces las características principales de Thrive MT, estás listo para comenzar tu viaje hacia una mejor salud mental y bienestar." 
              : "Now that you know the main features of Thrive MT, you're ready to begin your journey toward better mental health and wellbeing."}
          </p>
          
          <p className="text-xs text-gray-400 text-center max-w-md">
            {isSpanish 
              ? "Recuerda: puedes acceder a este tutorial en cualquier momento haciendo clic en el botón 'Cómo usar esta función' en cada sección." 
              : "Remember: you can access tutorials at any time by clicking the 'How to use this feature' button in each section."}
          </p>
        </div>
      )
    }
  ];
  
  const currentTutorialStep = tutorialSteps[stepIndex];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-[#1A1F2C] border-[#3a3a4c] text-white">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[#B87333]/20">
              {currentTutorialStep.id === 'welcome' && <Sparkles className="h-5 w-5 text-[#E5C5A1]" />}
              {currentTutorialStep.id === 'new-features' && <Handshake className="h-5 w-5 text-[#E5C5A1]" />}
              {currentTutorialStep.id === 'daily-challenges' && <CheckCircle className="h-5 w-5 text-green-400" />}
              {currentTutorialStep.id === 'specialized-programs' && <Shield className="h-5 w-5 text-blue-400" />}
              {currentTutorialStep.id === 'conclusion' && <Sparkles className="h-5 w-5 text-[#E5C5A1]" />}
            </div>
            <h2 className="text-xl font-semibold">{currentTutorialStep.title}</h2>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onSkip} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="max-h-[60vh] pr-4 -mr-4">
          <div className="py-2">
            {currentTutorialStep.content}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex justify-between space-x-2 pt-4 border-t border-gray-700">
          <div>
            {stepIndex > 0 && (
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
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {tutorialSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    stepIndex === index 
                      ? 'bg-[#B87333]' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              onClick={handleNext}
              className="bg-[#B87333] hover:bg-[#B87333]/80 text-white"
            >
              {stepIndex < tutorialSteps.length - 1 ? (
                <>
                  {isSpanish ? "Siguiente" : "Next"}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </>
              ) : (
                isSpanish ? "Finalizar" : "Finish"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
