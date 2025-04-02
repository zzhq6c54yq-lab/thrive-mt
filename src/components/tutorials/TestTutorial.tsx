
import React, { useState, useEffect } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TestTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestTutorial: React.FC<TestTutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Reset step when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      console.log("TestTutorial - Dialog opened, resetting to step 0");
    }
  }, [isOpen]);

  const steps = [
    {
      title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
      content: isSpanish 
        ? "Thrive MT es tu asistente personal de bienestar mental. Esta breve introducción te mostrará cómo aprovechar al máximo nuestra plataforma."
        : "Thrive MT is your personal mental wellness assistant. This brief introduction will show you how to make the most of our platform."
    },
    {
      title: isSpanish ? "Tablero Principal" : "Main Dashboard",
      content: isSpanish 
        ? "Tu tablero está personalizado según tus preferencias y necesidades. Aquí encontrarás desafíos diarios, insights personalizados y acceso a todas las herramientas."
        : "Your dashboard is personalized to your preferences and needs. Here you'll find daily challenges, personalized insights, and access to all tools."
    },
    {
      title: isSpanish ? "Asistente Henry" : "Henry Assistant",
      content: isSpanish 
        ? "Henry, tu asistente personal, está siempre disponible para ayudarte. Haz clic en su icono para buscar recursos, hacer preguntas o recibir apoyo."
        : "Henry, your personal assistant, is always available to help. Click on his icon to search for resources, ask questions, or get support."
    },
    {
      title: isSpanish ? "Herramientas de Bienestar" : "Wellness Tools",
      content: isSpanish 
        ? "Explora todas nuestras herramientas de bienestar mental: terapia en tiempo real, aplicación de mindfulness, talleres guiados y más. ¡Todas diseñadas para tu viaje de bienestar!"
        : "Explore all our mental wellness tools: real-time therapy, mindfulness application, guided workshops, and more. All designed for your wellness journey!"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => {
      console.log("TestTutorial dialog open state changing to:", open);
      if (!open) onClose();
    }}>
      <AlertDialogContent className="bg-[#2a2a3c] border-[#3a3a4c] text-white max-w-md max-h-[80vh] relative z-[9999]">
        {/* Close button (X) in the top-right corner */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 z-50"
          onClick={() => {
            console.log("Close button clicked in TestTutorial");
            onClose();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {/* Dimensional logo in dialog */}
            <div className="relative h-10 w-10 group">
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-[#B87333]/40 to-[#E5C5A1]/40 blur-lg animate-pulse"></div>
              <div className="absolute inset-[-12px] rounded-full border border-[#B87333]/30 animate-spin" style={{animationDuration: '15s'}}></div>
              <div className="absolute inset-[-8px] rounded-full border border-[#E5C5A1]/20 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-base leading-none tracking-tighter flex flex-col items-center">
                  <span className="text-[6px] opacity-80 mb-0.5">THRIVE</span>
                  <span>MT</span>
                </div>
              </div>
            </div>
            
            <div>
              <AlertDialogTitle className="text-xl text-white">
                {isSpanish ? "Tutorial de Thrive" : "Thrive Tutorial"}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                {isSpanish ? "Paso" : "Step"} {currentStep + 1} {isSpanish ? "de" : "of"} {steps.length}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        <ScrollArea className="max-h-[50vh] pr-4 mt-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">{steps[currentStep].title}</h3>
            <p className="text-gray-300">{steps[currentStep].content}</p>
          </div>
        </ScrollArea>
        
        <div className="mt-6 flex justify-between">
          <div className="flex-1">
            {currentStep > 0 && (
              <Button 
                variant="outline"
                onClick={handlePrevious}
                className="border-[#3a3a4c] text-gray-300 hover:bg-[#3a3a4c] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {isSpanish ? "Anterior" : "Previous"}
              </Button>
            )}
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-[#B87333] hover:bg-[#9e6229] text-white"
          >
            {currentStep < steps.length - 1 ? (
              <>
                {isSpanish ? "Siguiente" : "Next"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              isSpanish ? "Completar" : "Complete"
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TestTutorial;
