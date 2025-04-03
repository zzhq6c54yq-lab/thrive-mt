
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
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

interface WelcomeTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ isOpen, onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Reset to first step when opened
  useEffect(() => {
    if (isOpen) {
      setStepIndex(0);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (stepIndex < tutorialSteps.length - 1) {
      setStepIndex(prevStep => prevStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (stepIndex > 0) {
      setStepIndex(prevStep => prevStep - 1);
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Feature navigation
  const navigateToFeature = (path: string) => {
    onClose();
    navigate(path);
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
            
            <div className="pt-2">
              <Button 
                variant="bronze"
                className="w-full"
                onClick={() => navigateToFeature("/barter-system")}
              >
                {isSpanish ? "Explorar Nuevas Características" : "Explore New Features"}
              </Button>
            </div>
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
            
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-3 rounded-lg border border-green-500/20 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">
                  {isSpanish ? "Cómo funciona:" : "How it works:"}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {isSpanish 
                  ? "100 puntos = 1 Crédito de Copago. Los créditos se aplican automáticamente a tus copagos de terapia cuando programas una sesión." 
                  : "100 points = 1 Co-Pay Credit. Credits are automatically applied to your therapy co-payments when you schedule a session."}
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full border-green-500/30 text-green-400 hover:bg-green-500/20"
                onClick={() => navigateToFeature("/wellness-challenges")}
              >
                {isSpanish ? "Ver Todos los Desafíos" : "View All Challenges"}
              </Button>
            </div>
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
            
            <h4 className="font-medium text-white flex items-center">
              <Briefcase className="h-5 w-5 text-amber-400 mr-2" />
              {isSpanish ? "Portal para Pequeñas Empresas" : "Small Business Portal"}
            </h4>
            <p>
              {isSpanish 
                ? "Ayuda para emprendedores y empleados de pequeñas empresas. Ofrece recursos para manejar el estrés de las operaciones comerciales, balance trabajo-vida, y bienestar en el lugar de trabajo." 
                : "Help for entrepreneurs and small business employees. Offers resources for managing the stress of business operations, work-life balance, and workplace wellness."}
            </p>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                onClick={() => navigateToFeature("/small-business-portal")}
              >
                {isSpanish ? "Explorar Programas Especializados" : "Explore Specialized Programs"}
              </Button>
            </div>
          </div>
        </div>
      )
    },
    
    // Gratitude Visualizer
    {
      id: "gratitude-visualizer",
      title: isSpanish ? "Visualizador de Gratitud" : "Gratitude Visualizer",
      content: (
        <div>
          <div className="bg-gradient-to-br from-[#2C1B47] to-[#1A1025] rounded-lg border border-purple-900/30 p-4 mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Heart className="h-5 w-5 text-pink-400 mr-2" />
                <span>{isSpanish ? "Momentos de Gratitud" : "Gratitude Moments"}</span>
              </h3>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-pink-300 hover:text-pink-200 hover:bg-pink-500/20">
                <PlusCircle className="h-3.5 w-3.5 mr-1" />
                {isSpanish ? "Añadir" : "Add"}
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 rounded-md border border-white/10 p-2 flex flex-col items-center justify-center aspect-square">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center mb-1">
                  <Sparkles className="h-4 w-4 text-pink-300" />
                </div>
                <span className="text-xs text-center text-gray-300">
                  {isSpanish ? "Familia" : "Family"}
                </span>
              </div>
              
              <div className="bg-white/5 rounded-md border border-white/10 p-2 flex flex-col items-center justify-center aspect-square">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/30 flex items-center justify-center mb-1">
                  <Sparkles className="h-4 w-4 text-blue-300" />
                </div>
                <span className="text-xs text-center text-gray-300">
                  {isSpanish ? "Naturaleza" : "Nature"}
                </span>
              </div>
              
              <div className="bg-white/5 rounded-md border border-white/10 p-2 flex flex-col items-center justify-center aspect-square">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/30 to-teal-500/30 flex items-center justify-center mb-1">
                  <Sparkles className="h-4 w-4 text-green-300" />
                </div>
                <span className="text-xs text-center text-gray-300">
                  {isSpanish ? "Logros" : "Achievements"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <Heart className="h-5 w-5 text-pink-400 mr-2" />
              {isSpanish ? "¿Qué es el Visualizador de Gratitud?" : "What is the Gratitude Visualizer?"}
            </h4>
            <p>
              {isSpanish 
                ? "El Visualizador de Gratitud es una herramienta interactiva que te permite registrar y visualizar cosas por las que estás agradecido. La práctica regular de la gratitud está científicamente demostrada que mejora el bienestar mental y la felicidad." 
                : "The Gratitude Visualizer is an interactive tool that allows you to record and visualize things you're grateful for. Regular gratitude practice is scientifically proven to improve mental wellbeing and happiness."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Brain className="h-5 w-5 text-pink-400 mr-2" />
              {isSpanish ? "Beneficios para la Salud Mental" : "Mental Health Benefits"}
            </h4>
            <p>
              {isSpanish 
                ? "Practicar la gratitud regularmente puede reducir el estrés, mejorar el sueño, aumentar la autoestima y fortalecer las relaciones. Al registrar visualmente tus gratitudes, puedes reconocer patrones positivos en tu vida." 
                : "Practicing gratitude regularly can reduce stress, improve sleep, increase self-esteem, and strengthen relationships. By visually recording your gratitudes, you can recognize positive patterns in your life."}
            </p>
            
            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-3 rounded-lg border border-pink-500/20 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-pink-400" />
                <span className="text-white font-medium">
                  {isSpanish ? "Cómo usarlo:" : "How to use it:"}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {isSpanish 
                  ? "Cada día, añade al menos una cosa por la que estés agradecido. Con el tiempo, verás crecer tu visualización, creando un poderoso recordatorio de las cosas positivas en tu vida." 
                  : "Each day, add at least one thing you're grateful for. Over time, you'll see your visualization grow, creating a powerful reminder of the positive things in your life."}
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full border-pink-500/30 text-pink-400 hover:bg-pink-500/20"
                onClick={() => navigateToFeature("/")}
              >
                {isSpanish ? "Abrir Visualizador de Gratitud" : "Open Gratitude Visualizer"}
              </Button>
            </div>
          </div>
        </div>
      )
    },
    
    // Upcoming Appointments
    {
      id: "appointments",
      title: isSpanish ? "Próximas Citas" : "Upcoming Appointments",
      content: (
        <div>
          <div className="bg-gradient-to-br from-[#1A3A5F] to-[#142538] rounded-lg border border-blue-800/30 p-4 mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <CalendarRange className="h-5 w-5 text-blue-400 mr-2" />
                <span>{isSpanish ? "Tus Próximas Citas" : "Your Upcoming Appointments"}</span>
              </h3>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-300 hover:text-blue-200 hover:bg-blue-500/20">
                <PlusCircle className="h-3.5 w-3.5 mr-1" />
                {isSpanish ? "Programar" : "Schedule"}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <span className="text-sm font-medium block">{isSpanish ? "Sesión de Terapia" : "Therapy Session"}</span>
                    <span className="text-xs text-gray-400">{isSpanish ? "Mañana, 3:00 PM" : "Tomorrow, 3:00 PM"}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  {isSpanish ? "Detalles" : "Details"}
                </Button>
              </div>
              
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <span className="text-sm font-medium block">{isSpanish ? "Grupo de Apoyo" : "Support Group"}</span>
                    <span className="text-xs text-gray-400">{isSpanish ? "Viernes, 5:30 PM" : "Friday, 5:30 PM"}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  {isSpanish ? "Detalles" : "Details"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <CalendarRange className="h-5 w-5 text-blue-400 mr-2" />
              {isSpanish ? "Gestión de Citas" : "Appointment Management"}
            </h4>
            <p>
              {isSpanish 
                ? "La sección de citas te muestra todas tus próximas sesiones programadas con terapeutas, grupos de apoyo, o talleres. Recibe recordatorios automáticos y accede fácilmente a tus citas virtuales." 
                : "The appointments section shows you all your upcoming scheduled sessions with therapists, support groups, or workshops. Get automatic reminders and easily access your virtual appointments."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Book className="h-5 w-5 text-blue-400 mr-2" />
              {isSpanish ? "Preparación para Sesiones" : "Session Preparation"}
            </h4>
            <p>
              {isSpanish 
                ? "Haz clic en cualquier cita para ver detalles, prepararte para la sesión, o acceder a material preliminar recomendado por tu terapeuta. También puedes completar evaluaciones previas a la sesión." 
                : "Click on any appointment to see details, prepare for the session, or access preliminary material recommended by your therapist. You can also complete pre-session assessments."}
            </p>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-3 rounded-lg border border-blue-500/20 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">
                  {isSpanish ? "Recordatorios:" : "Reminders:"}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {isSpanish 
                  ? "Recibirás recordatorios de tus citas 24 horas y 1 hora antes de cada sesión. Puedes personalizar estas notificaciones en la configuración." 
                  : "You'll receive reminders for your appointments 24 hours and 1 hour before each session. You can customize these notifications in settings."}
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                onClick={() => navigateToFeature("/appointments")}
              >
                {isSpanish ? "Ver Todas las Citas" : "View All Appointments"}
              </Button>
            </div>
          </div>
        </div>
      )
    },

    // Mood & Insights
    {
      id: "insights",
      title: isSpanish ? "Estado de Ánimo & Análisis" : "Mood & Insights",
      content: (
        <div>
          <div className="bg-gradient-to-br from-[#2D2A4A] to-[#1C1A30] rounded-lg border border-indigo-900/30 p-4 mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Brain className="h-5 w-5 text-indigo-400 mr-2" />
                <span>{isSpanish ? "Análisis de Bienestar" : "Wellness Insights"}</span>
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-md border border-white/10">
                <h4 className="text-sm font-medium text-indigo-300 mb-2 flex items-center">
                  <LineChart className="h-4 w-4 mr-1" />
                  {isSpanish ? "Patrones de Estado de Ánimo" : "Mood Patterns"}
                </h4>
                <div className="h-24 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-md flex items-end p-2">
                  <div className="flex-1 h-10 bg-blue-500/30 rounded-sm mx-0.5"></div>
                  <div className="flex-1 h-15 bg-blue-500/40 rounded-sm mx-0.5"></div>
                  <div className="flex-1 h-12 bg-purple-500/40 rounded-sm mx-0.5"></div>
                  <div className="flex-1 h-8 bg-purple-500/30 rounded-sm mx-0.5"></div>
                  <div className="flex-1 h-16 bg-pink-500/40 rounded-sm mx-0.5"></div>
                  <div className="flex-1 h-14 bg-pink-500/50 rounded-sm mx-0.5"></div>
                  <div className="flex-1 h-20 bg-indigo-500/50 rounded-sm mx-0.5"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <LineChart className="h-5 w-5 text-indigo-400 mr-2" />
              {isSpanish ? "Análisis Personalizados" : "Personalized Insights"}
            </h4>
            <p>
              {isSpanish 
                ? "La sección de análisis proporciona información personalizada basada en tus actividades, patrones de estado de ánimo y progreso en la aplicación. Estos análisis te ayudan a entender mejor tu bienestar mental." 
                : "The insights section provides personalized information based on your activities, mood patterns, and progress in the app. These insights help you better understand your mental wellbeing."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <BarChart className="h-5 w-5 text-indigo-400 mr-2" />
              {isSpanish ? "Seguimiento de Patrones" : "Pattern Tracking"}
            </h4>
            <p>
              {isSpanish 
                ? "Observa cómo cambian tus patrones de bienestar con el tiempo. Estos análisis se vuelven más precisos cuanto más utilices la aplicación, proporcionando una visión más profunda de tu salud mental." 
                : "See how your wellness patterns change over time. These insights become more accurate the more you use the app, providing deeper visibility into your mental health."}
            </p>
            
            <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 p-3 rounded-lg border border-indigo-500/20 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-indigo-400" />
                <span className="text-white font-medium">
                  {isSpanish ? "Recomendaciones Inteligentes:" : "Smart Recommendations:"}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {isSpanish 
                  ? "Basándose en tus análisis, recibirás recomendaciones personalizadas para mejorar tu bienestar mental y abordar áreas específicas de preocupación." 
                  : "Based on your insights, you'll receive personalized recommendations to improve your mental wellbeing and address specific areas of concern."}
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20"
                onClick={() => navigateToFeature("/insights")}
              >
                {isSpanish ? "Ver Todos los Análisis" : "View All Insights"}
              </Button>
            </div>
          </div>
        </div>
      )
    },

    // Featured Workshops
    {
      id: "workshops",
      title: isSpanish ? "Talleres Destacados" : "Featured Workshops",
      content: (
        <div>
          <div className="bg-gradient-to-br from-[#2A3B4D] to-[#1A232D] rounded-lg border border-blue-900/30 p-4 mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="h-5 w-5 text-teal-400 mr-2" />
                <span>{isSpanish ? "Talleres de Este Mes" : "This Month's Workshops"}</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-md border border-white/10 group hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center mr-2">
                    <Brain className="h-4 w-4 text-teal-300" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{isSpanish ? "Regulación Emocional" : "Emotional Regulation"}</span>
                  </div>
                  <div className="text-xs bg-teal-500/20 text-teal-300 py-0.5 px-2 rounded-full">
                    {isSpanish ? "Popular" : "Popular"}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {isSpanish ? "Técnicas para manejar emociones intensas" : "Techniques for managing intense emotions"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{isSpanish ? "Jun 15, 7PM" : "Jun 15, 7PM"}</span>
                  <Button variant="ghost" size="sm" className="h-6 text-xs text-teal-300 hover:text-teal-200 hover:bg-teal-500/20 px-2 py-0">
                    {isSpanish ? "Registrarse" : "Register"}
                  </Button>
                </div>
              </div>
              
              <div className="bg-white/5 p-3 rounded-md border border-white/10 group hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                    <Headphones className="h-4 w-4 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{isSpanish ? "Atención Plena" : "Mindfulness"}</span>
                  </div>
                  <div className="text-xs bg-blue-500/20 text-blue-300 py-0.5 px-2 rounded-full">
                    {isSpanish ? "Nuevo" : "New"}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {isSpanish ? "Prácticas diarias para reducir el estrés" : "Daily practices to reduce stress"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{isSpanish ? "Jun 18, 6PM" : "Jun 18, 6PM"}</span>
                  <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 px-2 py-0">
                    {isSpanish ? "Registrarse" : "Register"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <Users className="h-5 w-5 text-teal-400 mr-2" />
              {isSpanish ? "Talleres Interactivos" : "Interactive Workshops"}
            </h4>
            <p>
              {isSpanish 
                ? "Los talleres son sesiones educativas guiadas que cubren diversos temas de salud mental, desde técnicas de manejo del estrés hasta habilidades de comunicación. Están dirigidos por profesionales de salud mental." 
                : "Workshops are guided educational sessions covering various mental health topics, from stress management techniques to communication skills. They are led by mental health professionals."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Video className="h-5 w-5 text-teal-400 mr-2" />
              {isSpanish ? "Participación en Talleres" : "Workshop Participation"}
            </h4>
            <p>
              {isSpanish 
                ? "Haz clic en un taller para ver detalles, unirte a una sesión en vivo, o acceder a contenido grabado. Puedes interactuar con facilitadores y otros participantes para una experiencia de aprendizaje enriquecedora." 
                : "Click on a workshop to view details, join a live session, or access recorded content. You can interact with facilitators and other participants for an enriching learning experience."}
            </p>
            
            <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 p-3 rounded-lg border border-teal-500/20 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-teal-400" />
                <span className="text-white font-medium">
                  {isSpanish ? "Beneficios:" : "Benefits:"}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {isSpanish 
                  ? "Participar en talleres te permite aprender habilidades prácticas, conectar con otros en situaciones similares, y ganar créditos de copago para reducir el costo de las sesiones de terapia." 
                  : "Participating in workshops allows you to learn practical skills, connect with others in similar situations, and earn co-pay credits to reduce the cost of therapy sessions."}
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full border-teal-500/30 text-teal-400 hover:bg-teal-500/20"
                onClick={() => navigateToFeature("/workshops")}
              >
                {isSpanish ? "Ver Todos los Talleres" : "View All Workshops"}
              </Button>
            </div>
          </div>
        </div>
      )
    },

    // Key Features
    {
      id: "key-features",
      title: isSpanish ? "Características Principales" : "Key Features",
      content: (
        <div>
          <div className="bg-gradient-to-br from-[#2D2D3D] to-[#1D1D2D] rounded-lg border border-gray-700/30 p-4 mb-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B87333]/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E5C5A1]/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Sparkles className="h-5 w-5 text-[#E5C5A1] mr-2" />
                <span>{isSpanish ? "Características Destacadas" : "Featured Capabilities"}</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/20 flex items-center justify-center mb-2">
                  <Video className="h-5 w-5 text-[#E5C5A1]" />
                </div>
                <span className="text-xs font-medium">{isSpanish ? "Diario en Video" : "Video Diary"}</span>
              </div>
              
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-2">
                  <UserCircle className="h-5 w-5 text-blue-300" />
                </div>
                <span className="text-xs font-medium">{isSpanish ? "Contenido Personalizado" : "Personalized Content"}</span>
              </div>
              
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center mb-2">
                  <ListChecks className="h-5 w-5 text-green-300" />
                </div>
                <span className="text-xs font-medium">{isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges"}</span>
              </div>
              
              <div className="bg-white/5 p-3 rounded-md border border-white/10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-2">
                  <HelpCircle className="h-5 w-5 text-amber-300" />
                </div>
                <span className="text-xs font-medium">{isSpanish ? "Cuestionarios" : "Quizzes"}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <Video className="h-5 w-5 text-[#E5C5A1] mr-2" />
              {isSpanish ? "Diario en Video" : "Video Diary"}
            </h4>
            <p>
              {isSpanish 
                ? "Graba breves videos para documentar tu viaje de bienestar mental. Esta herramienta te permite expresarte de manera más personal y observar los cambios en tu estado emocional a lo largo del tiempo." 
                : "Record short videos to document your mental wellness journey. This tool allows you to express yourself more personally and observe changes in your emotional state over time."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Library className="h-5 w-5 text-blue-400 mr-2" />
              {isSpanish ? "Biblioteca de Recursos" : "Resource Library"}
            </h4>
            <p>
              {isSpanish 
                ? "Accede a una extensa colección de artículos, videos y herramientas sobre salud mental, desarrollados por expertos y organizados por temas para facilitar tu búsqueda." 
                : "Access an extensive collection of mental health articles, videos, and tools, developed by experts and organized by topic for easy searching."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Users className="h-5 w-5 text-purple-400 mr-2" />
              {isSpanish ? "Apoyo Comunitario" : "Community Support"}
            </h4>
            <p>
              {isSpanish 
                ? "Conéctate con personas que tienen experiencias similares en foros seguros y moderados. Comparte historias, consejos y encuentra comprensión en una comunidad de apoyo." 
                : "Connect with people who have similar experiences in safe, moderated forums. Share stories, tips, and find understanding in a supportive community."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Headphones className="h-5 w-5 text-green-400 mr-2" />
              {isSpanish ? "Tonos Binaurales" : "Binaural Beats"}
            </h4>
            <p>
              {isSpanish 
                ? "Auriculares binaurales especialmente diseñados para inducir estados mentales específicos como relajación, enfoque o sueño profundo. Utiliza esta herramienta para ayudar a tu cerebro a sintonizarse con diferentes estados de conciencia." 
                : "Specially designed binaural tones to induce specific mental states like relaxation, focus, or deep sleep. Use this tool to help your brain tune into different states of consciousness."}
            </p>

            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-[#B87333]/30 text-[#E5C5A1] hover:bg-[#B87333]/20"
                onClick={() => navigateToFeature("/video-diary")}
              >
                {isSpanish ? "Explorar Diario en Video" : "Explore Video Diary"}
              </Button>
              
              <Button 
                variant="outline" 
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                onClick={() => navigateToFeature("/resource-library")}
              >
                {isSpanish ? "Explorar Recursos" : "Explore Resources"}
              </Button>
            </div>
          </div>
        </div>
      )
    },

    // More Features
    {
      id: "more-features",
      title: isSpanish ? "Más Características" : "More Features",
      content: (
        <div>
          <div className="space-y-4 text-gray-300">
            <h4 className="font-medium text-white flex items-center">
              <Leaf className="h-5 w-5 text-green-400 mr-2" />
              {isSpanish ? "Integración de Estilo de Vida" : "Lifestyle Integration"}
            </h4>
            <p>
              {isSpanish 
                ? "Aprende cómo incorporar prácticas de bienestar mental en tu rutina diaria. Esta característica te proporciona sugerencias personalizadas para pequeños cambios que pueden tener un gran impacto en tu bienestar." 
                : "Learn how to incorporate mental wellness practices into your daily routine. This feature provides personalized suggestions for small changes that can make a big impact on your wellbeing."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <HandHeart className="h-5 w-5 text-pink-400 mr-2" />
              {isSpanish ? "Recursos Familiares" : "Family Resources"}
            </h4>
            <p>
              {isSpanish 
                ? "Herramientas y recursos para ayudar a las familias a navegar por los desafíos de salud mental juntos. Incluye guías para conversaciones difíciles y actividades para fomentar conexiones saludables." 
                : "Tools and resources to help families navigate mental health challenges together. Includes guides for difficult conversations and activities to foster healthy connections."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Flower className="h-5 w-5 text-purple-400 mr-2" />
              {isSpanish ? "Terapias Alternativas" : "Alternative Therapies"}
            </h4>
            <p>
              {isSpanish 
                ? "Explora enfoques complementarios para el bienestar mental, como arteterapia, musicoterapia, terapia asistida por animales y más. Descubre qué métodos podrían funcionar mejor para ti." 
                : "Explore complementary approaches to mental wellbeing, such as art therapy, music therapy, animal-assisted therapy, and more. Discover which methods might work best for you."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <Moon className="h-5 w-5 text-blue-400 mr-2" />
              {isSpanish ? "Herramientas para Dormir" : "Sleep Tools"}
            </h4>
            <p>
              {isSpanish 
                ? "Mejora tu sueño con sonidos relajantes, meditaciones guiadas para conciliar el sueño, y seguimiento de patrones de sueño. El buen sueño es fundamental para la salud mental." 
                : "Improve your sleep with relaxing sounds, guided sleep meditations, and tracking of sleep patterns. Good sleep is fundamental to mental health."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <MessageSquare className="h-5 w-5 text-amber-400 mr-2" />
              {isSpanish ? "Apoyo en Crisis" : "Crisis Support"}
            </h4>
            <p>
              {isSpanish 
                ? "Acceso a recursos de ayuda inmediata para momentos difíciles. Incluye líneas directas de crisis, técnicas de desescalada, y planes de seguridad personalizados para momentos de intensa angustia." 
                : "Access to immediate help resources for difficult moments. Includes crisis hotlines, de-escalation techniques, and customized safety plans for times of intense distress."}
            </p>
            
            <h4 className="font-medium text-white flex items-center">
              <BarChart className="h-5 w-5 text-green-400 mr-2" />
              {isSpanish ? "Análisis de Progreso" : "Progress Analytics"}
            </h4>
            <p>
              {isSpanish 
                ? "Visualiza tu progreso a lo largo del tiempo con estadísticas detalladas y representaciones gráficas. Identifica patrones, celebra logros y reconoce áreas para seguir mejorando." 
                : "Visualize your progress over time with detailed statistics and graphical representations. Identify patterns, celebrate achievements, and recognize areas for continued improvement."}
            </p>
            
            <div className="bg-gradient-to-r from-[#B87333]/10 to-[#E5C5A1]/10 p-3 rounded-lg border border-[#B87333]/20 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-[#E5C5A1]" />
                <span className="text-white font-medium">
                  {isSpanish ? "Personalización:" : "Personalization:"}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {isSpanish 
                  ? "Todas estas características se adaptan a tus necesidades específicas a medida que utilizas la aplicación. Cuanto más interactúes con Thrive MT, más personalizada será tu experiencia." 
                  : "All of these features adapt to your specific needs as you use the app. The more you interact with Thrive MT, the more personalized your experience will become."}
              </p>
            </div>
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
          
          <div className="grid grid-cols-2 gap-6 mb-6 w-full max-w-md">
            <Button 
              variant="outline" 
              className="border-[#B87333]/30 text-[#E5C5A1] hover:bg-[#B87333]/20"
              onClick={() => navigateToFeature("/wellness-challenges")}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isSpanish ? "Desafíos Diarios" : "Daily Challenges"}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#B87333]/30 text-[#E5C5A1] hover:bg-[#B87333]/20"
              onClick={() => navigateToFeature("/workshops")}
            >
              <Brain className="h-4 w-4 mr-2" />
              {isSpanish ? "Talleres" : "Workshops"}
            </Button>
          </div>
          
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-[#1A1F2C] border-[#3a3a4c] text-white">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[#B87333]/20">
              {currentTutorialStep.id === 'welcome' && <Sparkles className="h-5 w-5 text-[#E5C5A1]" />}
              {currentTutorialStep.id === 'new-features' && <Handshake className="h-5 w-5 text-[#E5C5A1]" />}
              {currentTutorialStep.id === 'daily-challenges' && <CheckCircle className="h-5 w-5 text-green-400" />}
              {currentTutorialStep.id === 'specialized-programs' && <Shield className="h-5 w-5 text-blue-400" />}
              {currentTutorialStep.id === 'gratitude-visualizer' && <Heart className="h-5 w-5 text-pink-400" />}
              {currentTutorialStep.id === 'appointments' && <CalendarRange className="h-5 w-5 text-blue-400" />}
              {currentTutorialStep.id === 'insights' && <Brain className="h-5 w-5 text-indigo-400" />}
              {currentTutorialStep.id === 'workshops' && <Users className="h-5 w-5 text-teal-400" />}
              {currentTutorialStep.id === 'key-features' && <Sparkles className="h-5 w-5 text-[#E5C5A1]" />}
              {currentTutorialStep.id === 'more-features' && <Library className="h-5 w-5 text-purple-400" />}
              {currentTutorialStep.id === 'conclusion' && <Sparkles className="h-5 w-5 text-[#E5C5A1]" />}
            </div>
            <h2 className="text-xl font-semibold">{currentTutorialStep.title}</h2>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-400 hover:text-white">
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

export default WelcomeTutorial;
