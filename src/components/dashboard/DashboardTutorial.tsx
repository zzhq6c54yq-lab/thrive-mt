
import React from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTranslation from "@/hooks/useTranslation";

interface DashboardTutorialProps {
  showTutorial: boolean;
  userName: string;
  onClose: () => void;
}

const DashboardTutorial: React.FC<DashboardTutorialProps> = ({ 
  showTutorial,
  userName,
  onClose
}) => {
  const { isSpanish, getTranslatedText } = useTranslation();
  
  if (!showTutorial) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-full max-w-lg mx-4 relative">
        <Card className="w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
            aria-label={isSpanish ? "Cerrar" : "Close"}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{isSpanish ? "Cerrar" : "Close"}</span>
          </Button>

          <div className="w-full flex justify-center items-center py-6 border-b border-white/10 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Thrive MT Logo" 
              className="h-20 w-20 object-contain"
            />
          </div>
          
          <CardHeader>
            <CardTitle className="text-xl text-white">
              {isSpanish 
                ? `Bienvenido a Thrive MT, ${userName}!` 
                : `Welcome to Thrive MT, ${userName}!`}
            </CardTitle>
          </CardHeader>
          
          <ScrollArea className="h-[30vh]">
            <CardContent>
              <p className="text-white/90 mb-6">
                {isSpanish 
                  ? "Tu panel de bienestar mental personalizado está listo. Lo hemos diseñado para apoyar tu viaje hacia una mejor salud mental, centrándote en Horizontes Esperanzadores, Empoderamiento a través de la Educación, Conexiones Nutridas, Resiliencia y Recuperación, y asegurando que Tu Viaje Importa."
                  : "Your personalized mental wellness dashboard is ready. We've designed it to support your journey to better mental health, focusing on Hopeful Horizons, Empowerment through Education, Nurtured Connections, Resilience and Recovery, and ensuring Your Journey Matters."}
              </p>
              
              {/* Thrive Button Guidance */}
              <div className="flex flex-col items-center justify-center my-4 bg-black/30 rounded-lg p-4 border border-[#B87333]/30">
                <div className="relative w-12 h-12 mb-4">
                  {/* Button replica */}
                  <div className="w-full h-full rounded-full border-2 border-[#B87333] bg-gradient-to-br from-[#181820] to-[#1f1a25]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[#B87333] font-bold text-lg leading-none tracking-tighter flex flex-col items-center">
                      <span className="text-[5px] opacity-80 mb-0.5">THRIVE</span>
                      <span>MT</span>
                    </div>
                  </div>
                  
                  {/* Animated arrow pointing to the button */}
                  <div className="absolute -top-6 -right-6 transform rotate-45 animate-bounce">
                    <ArrowRight className="text-[#B87333] h-6 w-6" />
                  </div>
                </div>
                
                <p className="text-white text-center">
                  {isSpanish
                    ? "Busca este botón THRIVE MT en la esquina superior derecha para acceder al tutorial completo del sitio en cualquier momento"
                    : "Look for this THRIVE MT button in the top right corner to access the full site tutorial anytime"}
                </p>
              </div>
            </CardContent>
          </ScrollArea>
          
          <CardFooter className="flex justify-center py-4 border-t border-white/10">
            <Button 
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
              onClick={onClose}
            >
              <ArrowRight className="mr-2 h-4 w-4" /> {isSpanish ? "Continuar" : "Continue"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardTutorial;
