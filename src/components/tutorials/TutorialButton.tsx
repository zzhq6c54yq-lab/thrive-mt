
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useTranslation from "@/hooks/useTranslation";
import FeatureTutorial from "./FeatureTutorial";

interface TutorialButtonProps {
  featureId: string;
  className?: string;
  variant?: "default" | "logo" | "minimal";
  showAnimatedRings?: boolean;
}

const TutorialButton: React.FC<TutorialButtonProps> = ({ 
  featureId,
  className = "",
  variant = "default",
  showAnimatedRings = false
}) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { isSpanish, getTranslatedText } = useTranslation();
  const location = useLocation();
  
  // Check if we should show the tutorial button based on the current route
  const shouldShowTutorialButton = () => {
    // Only show logo variant on main dashboard
    const state = location.state as { screenState?: string } | null;
    const screenState = state?.screenState;
    
    // For logo variant, only show on main dashboard, not on emotional check-in or other initial screens
    if (variant === "logo") {
      return location.pathname === "/" && screenState === 'main';
    }
    
    // For default variant, show on all screens except emotional check-in
    return !(location.pathname === "/" && screenState !== 'main');
  };

  const handleOpenTutorial = () => {
    if (featureId === "dashboard" && variant === "logo") {
      // For logo variant on dashboard, open the full tutorial
      setShowTutorial(true);
    } else {
      // For other features, open the simple dialog
      setShowDialog(true);
    }
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  // Don't render if we shouldn't show the button
  if (!shouldShowTutorialButton()) {
    return null;
  }

  // Welcome message content
  const welcomeTitle = isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT";
  const welcomeMessage = isSpanish 
    ? "Bienvenido a Thrive MT, tu compañero de bienestar mental personalizado. Estamos aquí para apoyarte en tu viaje hacia un mejor bienestar mental."
    : "Welcome to Thrive MT, your personalized mental wellness companion. We're here to support your journey to better mental wellbeing.";

  // Feature-specific content based on featureId
  const getFeatureContent = () => {
    const featureContents = {
      "dashboard": {
        title: isSpanish ? "Tu Panel Principal" : "Your Dashboard",
        description: isSpanish 
          ? "Tu panel de control personalizado te ayuda a navegar por todas las herramientas y recursos disponibles. Explora las características y encuentra lo que necesitas fácilmente."
          : "Your personalized dashboard helps you navigate all available tools and resources. Explore features and easily find what you need."
      },
      "video-diary": {
        title: isSpanish ? "Diario en Video" : "Video Diary",
        description: isSpanish
          ? "Graba tus pensamientos y reflexiones en video. Esta herramienta te permite documentar tu viaje de salud mental de una manera más personal y expresiva."
          : "Record your thoughts and reflections on video. This tool allows you to document your mental health journey in a more personal and expressive way."
      },
      "wellness-challenges": {
        title: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
        description: isSpanish
          ? "Participa en desafíos diarios diseñados para mejorar tu bienestar. Completa actividades y gana recompensas mientras desarrollas hábitos saludables."
          : "Participate in daily challenges designed to improve your wellbeing. Complete activities and earn rewards while developing healthy habits."
      },
      "personalized-content": {
        title: isSpanish ? "Contenido Personalizado" : "Personalized Content",
        description: isSpanish
          ? "Disfruta de contenido adaptado específicamente para ti, basado en tus preferencias, objetivos y necesidades de salud mental."
          : "Enjoy content tailored specifically for you, based on your preferences, goals, and mental health needs."
      },
      "games-quizzes": {
        title: isSpanish ? "Juegos y Cuestionarios" : "Games & Quizzes",
        description: isSpanish
          ? "Participa en juegos interactivos y cuestionarios diseñados para ser tanto divertidos como beneficiosos para tu salud mental."
          : "Engage with interactive games and quizzes designed to be both fun and beneficial for your mental health."
      },
      "resource-library": {
        title: isSpanish ? "Biblioteca de Recursos" : "Resource Library",
        description: isSpanish
          ? "Accede a una amplia colección de artículos, videos y herramientas para apoyar tu bienestar mental y emocional."
          : "Access a comprehensive collection of articles, videos, and tools to support your mental and emotional wellbeing."
      },
      "community-support": {
        title: isSpanish ? "Apoyo Comunitario" : "Community Support",
        description: isSpanish
          ? "Conéctate con personas que comparten experiencias similares en un espacio seguro y de apoyo para compartir y crecer juntos."
          : "Connect with people who share similar experiences in a safe, supportive space to share and grow together."
      },
      "sponsor": {
        title: isSpanish ? "Mi Patrocinador N.A/A.A" : "My N.A/A.A Sponsor",
        description: isSpanish
          ? "Conecta con un patrocinador de N.A/A.A que puede guiarte en tu camino de recuperación con apoyo personalizado y dirección."
          : "Connect with an N.A/A.A sponsor who can guide you on your recovery journey with personalized support and direction."
      },
      "binaural-beats": {
        title: isSpanish ? "Ritmos Binaurales" : "Binaural Beats",
        description: isSpanish
          ? "Escucha ritmos binaurales específicamente diseñados para ayudar con la relajación, concentración, meditación y sueño."
          : "Listen to binaural beats specifically designed to help with relaxation, focus, meditation, and sleep."
      },
      "wellness-tools": {
        title: isSpanish ? "Herramientas de Bienestar Mental" : "Mental Wellness Tools",
        description: isSpanish
          ? "Accede a diversas herramientas diseñadas para ayudarte a gestionar el estrés, ansiedad y mantener un equilibrio emocional."
          : "Access various tools designed to help you manage stress, anxiety, and maintain emotional balance."
      },
      "progress-tracking": {
        title: isSpanish ? "Seguimiento de Progreso" : "Progress Tracking",
        description: isSpanish
          ? "Monitorea tu viaje de bienestar mental con herramientas para seguir tu progreso, establecer metas y celebrar hitos."
          : "Monitor your mental wellness journey with tools to track your progress, set goals, and celebrate milestones."
      },
      "family-resources": {
        title: isSpanish ? "Recursos Familiares" : "Family Resources",
        description: isSpanish
          ? "Encuentra recursos diseñados para apoyar no solo tu bienestar, sino también el de tu familia y seres queridos."
          : "Find resources designed to support not just your wellbeing, but also that of your family and loved ones."
      },
      "alternative-therapies": {
        title: isSpanish ? "Terapias Alternativas" : "Alternative Therapies",
        description: isSpanish
          ? "Explora enfoques complementarios para la salud mental, incluyendo terapias holísticas y técnicas alternativas."
          : "Explore complementary approaches to mental health, including holistic therapies and alternative techniques."
      },
      "mindfulness": {
        title: isSpanish ? "Mindfulness y Sueño" : "Mindfulness & Sleep",
        description: isSpanish
          ? "Accede a meditaciones guiadas, técnicas de mindfulness y herramientas para mejorar la calidad del sueño."
          : "Access guided meditations, mindfulness techniques, and tools to improve sleep quality."
      },
      "therapy-options": {
        title: isSpanish ? "Opciones de Terapia" : "Therapy Options",
        description: isSpanish
          ? "Explora diferentes tipos de terapia disponibles y encuentra el enfoque que mejor se adapte a tus necesidades."
          : "Explore different types of therapy available and find the approach that best suits your needs."
      },
      "workshops": {
        title: isSpanish ? "Talleres" : "Workshops",
        description: isSpanish
          ? "Participa en talleres interactivos diseñados para desarrollar habilidades y estrategias para mejorar tu salud mental."
          : "Participate in interactive workshops designed to develop skills and strategies to improve your mental health."
      },
      "journaling": {
        title: isSpanish ? "Escritura de Diario" : "Journaling",
        description: isSpanish
          ? "Utiliza herramientas de escritura de diario para procesar emociones, aumentar la autoconciencia y rastrear tu viaje de bienestar."
          : "Use journaling tools to process emotions, increase self-awareness, and track your wellness journey."
      },
    };
    
    // Return content for the specific feature, or default content
    return featureContents[featureId] || {
      title: isSpanish ? "Tutorial de Función" : "Feature Tutorial",
      description: isSpanish 
        ? "Esta función te ayuda en tu viaje de bienestar mental. Explora las diferentes herramientas disponibles."
        : "This feature helps you in your mental wellness journey. Explore the different tools available."
    };
  };

  const featureContent = getFeatureContent();
  
  // For minimal variant used in KeyFeatures component
  if (variant === "minimal") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`bg-white/10 hover:bg-white/20 border-white/5 text-white/80 hover:text-white text-[10px] p-1 h-auto ${className}`}
          >
            <div className="text-white/90 font-bold text-[8px] leading-none tracking-tighter flex flex-col items-center mr-1">
              <span className="text-[4px] opacity-90">THRIVE</span>
              <span>MT</span>
            </div>
            <span className="text-[9px]">{isSpanish ? "Guía" : "Guide"}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-[#1a1a1f]/95 backdrop-blur-md border-white/10 text-white p-4">
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium text-lg">{featureContent.title}</h4>
            <p className="text-sm text-white/80">{featureContent.description}</p>
            <Button 
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-full mt-2"
              size="sm"
            >
              {isSpanish ? "Entendido" : "Got it"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Render the appropriate button based on variant
  if (variant === "logo") {
    return (
      <>
        <Button
          variant="bronze"
          size="icon"
          onClick={handleOpenTutorial}
          className={`p-0 h-16 w-16 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(184,115,51,0.6)] relative ${className}`}
          aria-label={isSpanish ? "Abrir tutorial" : "Open tutorial"}
        >
          {showAnimatedRings && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-[#B87333]/30 animate-ping" style={{margin: '-2px'}}></div>
              <div className="absolute rounded-full border border-[#E5C5A1]/20 animate-pulse" style={{inset: '-6px'}}></div>
              <div className="absolute rounded-full border border-[#B87333]/40" style={{inset: '-3px', animationDelay: '0.5s'}}></div>
            </>
          )}
          <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1]">
            <div className="relative w-9 h-9 overflow-visible flex items-center justify-center">
              <div className="text-white font-bold text-xl leading-none tracking-tighter flex flex-col items-center">
                <span className="text-[8px] opacity-90 mb-0.5">THRIVE</span>
                <span>MT</span>
              </div>
            </div>
          </div>
        </Button>
        
        {/* Full featured tutorial for dashboard */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <FeatureTutorial 
              featureId={featureId}
              onClose={handleCloseTutorial}
              userName={localStorage.getItem('userName') || ''}
            />
          </div>
        )}
        
        {/* Simple Dialog for other scenarios */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-[#1a1a1f] border-[#3a3a4c] text-white max-w-md">
            <DialogHeader className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setShowDialog(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{isSpanish ? "Cerrar" : "Close"}</span>
              </Button>
              <DialogTitle className="text-xl text-white">
                {welcomeTitle}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center mb-4">
                <div className="text-white font-bold text-2xl leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[10px] opacity-90 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
              
              <p className="text-white/90 text-center mb-4">{welcomeMessage}</p>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={() => setShowDialog(false)}
                className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-full sm:w-auto"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                {isSpanish ? "Continuar" : "Continue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Default variant (smaller button for features)
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={`bg-white/5 hover:bg-white/15 border-white/10 text-white/90 backdrop-blur-sm shadow-md hover:shadow-lg text-xs ${className}`}
        onClick={handleOpenTutorial}
      >
        <div className="text-white/90 font-bold text-xs leading-none tracking-tighter flex flex-col items-center mr-1.5">
          <span className="text-[5px] opacity-90">THRIVE</span>
          <span>MT</span>
        </div>
        {isSpanish ? "Cómo usar esta función" : "How to use this feature"}
      </Button>
      
      {/* Simple Dialog for default variant */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#1a1a1f] border-[#3a3a4c] text-white max-w-md">
          <DialogHeader className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setShowDialog(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{isSpanish ? "Cerrar" : "Close"}</span>
            </Button>
            <DialogTitle className="text-xl text-white">
              {featureContent.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center mb-4">
              <div className="text-white font-bold text-xl leading-none tracking-tighter flex flex-col items-center">
                <span className="text-[8px] opacity-90 mb-0.5">THRIVE</span>
                <span>MT</span>
              </div>
            </div>
            
            <p className="text-white/90 text-center mb-4">{featureContent.description}</p>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setShowDialog(false)}
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-full sm:w-auto"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              {isSpanish ? "Continuar" : "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TutorialButton;
