
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface WelcomeTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ isOpen, onClose }) => {
  // Check if we're using Spanish
  const isSpanish = localStorage.getItem('preferredLanguage') === 'Español';
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Tutorial content
  const tutorialSlides = [
    {
      title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
      description: isSpanish 
        ? "Tu plataforma personal para el bienestar mental y emocional. Descubre cómo navegar por todas las herramientas y recursos disponibles para ti."
        : "Your personal platform for mental and emotional wellbeing. Discover how to navigate all the tools and resources available to you.",
      image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
    },
    {
      title: isSpanish ? "Panel Principal" : "Main Dashboard",
      description: isSpanish 
        ? "Tu centro de control personal. Aquí encontrarás todas las características principales, desafíos de bienestar, programas especializados y más."
        : "Your personal control center. Here you'll find all the main features, wellness challenges, specialized programs, and more.",
      image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png"
    },
    {
      title: isSpanish ? "Desafíos Diarios" : "Daily Challenges",
      description: isSpanish 
        ? "Completa desafíos diarios para mejorar tu bienestar mental y ganar créditos de copago que pueden reducir el costo de tus servicios."
        : "Complete daily challenges to improve your mental wellbeing and earn co-pay credits that can reduce the cost of your services.",
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png"
    },
    {
      title: isSpanish ? "Programas Especializados" : "Specialized Programs",
      description: isSpanish 
        ? "Accede a programas diseñados para necesidades específicas como apoyo militar, bienestar corporativo y recursos para estudiantes."
        : "Access programs designed for specific needs like military support, corporate wellness, and student resources.",
      image: "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png"
    },
    {
      title: isSpanish ? "Visualizador de Gratitud" : "Gratitude Visualizer",
      description: isSpanish 
        ? "Registra momentos de gratitud para mejorar tu bienestar emocional y crear un registro visual de experiencias positivas."
        : "Record moments of gratitude to improve your emotional wellbeing and create a visual record of positive experiences.",
      image: "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png"
    },
    {
      title: isSpanish ? "Conoce a Henry" : "Meet Henry",
      description: isSpanish 
        ? "Tu asistente personal de bienestar. Henry está aquí para guiarte, responder preguntas y proporcionarte apoyo en tu jornada."
        : "Your personal wellness assistant. Henry is here to guide you, answer questions, and provide support on your journey.",
      image: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png"
    }
  ];
  
  // Total number of slides
  const totalSlides = tutorialSlides.length;
  
  // Reset to first slide when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);
  
  // Log when this component renders with its open state
  useEffect(() => {
    console.log("WelcomeTutorial rendered with isOpen:", isOpen);
  }, [isOpen]);

  const goToNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentContent = tutorialSlides[currentSlide];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-3">
            {/* Animated Thrive MT Logo */}
            <div className="relative h-12 w-12 group">
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-[#B87333]/40 to-[#E5C5A1]/40 blur-lg animate-pulse"></div>
              <div className="absolute inset-[-15px] rounded-full border border-[#B87333]/30 animate-spin" style={{animationDuration: '15s'}}></div>
              <div className="absolute inset-[-10px] rounded-full border border-[#E5C5A1]/20 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center">
                <div className="text-white font-bold text-base leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[6px] opacity-80 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
            </div>
            
            <div>
              <DialogTitle className="text-xl text-white">
                {isSpanish ? "Tutorial de Thrive MT" : "Thrive MT Tutorial"}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {isSpanish ? "Aprende a usar la aplicación Thrive MT" : "Learn how to use the Thrive MT application"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-400">
              {isSpanish ? "Página" : "Page"} {currentSlide + 1} {isSpanish ? "de" : "of"} {totalSlides}
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "w-6 bg-[#B87333]" 
                      : "w-2 bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </div>
            
          <div className="bg-black/30 rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
              <Sparkles className="h-5 w-5 text-[#B87333] mr-2" />
              {currentContent.title}
            </h3>
            
            <div className="mb-4 rounded-lg overflow-hidden border border-[#3a3a4c] shadow-lg">
              <img 
                src={currentContent.image}
                alt={currentContent.title}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <p className="text-gray-300 text-sm">
              {currentContent.description}
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToPrevSlide}
            className="border-[#3a3a4c] text-gray-300 hover:bg-[#3a3a4c] hover:text-white"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {isSpanish ? "Anterior" : "Previous"}
          </Button>
          
          <div className="flex-1 text-center text-xs text-gray-400">
            {isSpanish ? "Desliza para descubrir más" : "Swipe to discover more"}
          </div>
          
          <Button 
            variant="default"
            size="sm"
            onClick={goToNextSlide}
            className="bg-[#B87333] hover:bg-[#9e6229] text-white"
          >
            {currentSlide < totalSlides - 1 ? (
              <>
                {isSpanish ? "Siguiente" : "Next"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              isSpanish ? "Comenzar" : "Get Started"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTutorial;
