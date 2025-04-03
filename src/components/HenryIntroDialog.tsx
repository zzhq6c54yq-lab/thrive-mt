
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Brain, Smile, Sparkles, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HenryIntroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HenryIntroDialog: React.FC<HenryIntroDialogProps> = ({ open, onOpenChange }) => {
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/5 backdrop-blur-md border border-[#B87333]/20">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Avatar className="h-24 w-24 border-4 border-[#B87333]/50">
              <AvatarImage src="/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png" alt="Henry" />
              <AvatarFallback className="bg-[#B87333]/20 text-[#B87333] text-2xl">
                H
              </AvatarFallback>
            </Avatar>
          </div>
          <DialogTitle className="text-2xl gradient-heading">
            {isSpanish ? "Conoce a Henry" : "Meet Henry"}
          </DialogTitle>
          <DialogDescription className="text-base text-white">
            {isSpanish 
              ? "Tu especialista en salud mental personalizado" 
              : "Your personalized mental health specialist"}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] overflow-auto pr-4">
          <div className="space-y-4 text-white">
            <p className="leading-relaxed">
              {isSpanish 
                ? "¡Hola, soy Henry! Estoy aquí para ayudarte a navegar tu viaje de salud mental y brindarte apoyo personalizado mientras exploras Thrive MT."
                : "Hi, I'm Henry! I'm here to help you navigate your mental health journey and provide personalized support as you explore Thrive MT."}
            </p>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-[#B87333] mb-2">
                {isSpanish ? "Mi nombre significa:" : "My name stands for:"}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#B87333]" />
                  <span>
                    <span className="font-bold text-[#B87333]">H</span>
                    {isSpanish 
                      ? "orizontes esperanzadores: Abraza un futuro lleno de posibilidades y la creencia de que el cambio es posible" 
                      : "opeful Horizons: Embrace a future filled with possibilities and the belief that change is achievable"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#B87333]" />
                  <span>
                    <span className="font-bold text-[#B87333]">E</span>
                    {isSpanish 
                      ? "mpoderamiento a través de la educación: Equipa a las personas con conocimientos sobre la salud mental" 
                      : "mpowerment through Education: Equip individuals with knowledge about mental health, fostering autonomy"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-[#B87333]" />
                  <span>
                    <span className="font-bold text-[#B87333]">N</span>
                    {isSpanish 
                      ? "utridas conexiones: Prioriza la importancia de las relaciones de apoyo" 
                      : "urtured Connections: Prioritize the importance of supportive relationships"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#B87333]" />
                  <span>
                    <span className="font-bold text-[#B87333]">R</span>
                    {isSpanish 
                      ? "esiliencia y recuperación: Centrarse en desarrollar fortaleza para superar la adversidad" 
                      : "esilience and Recovery: Focus on building strength to overcome adversity"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#B87333]" />
                  <span>
                    <span className="font-bold text-[#B87333]">Y</span>
                    {isSpanish 
                      ? " tu viaje importa: Reconoce que la experiencia de cada persona es única y valiosa" 
                      : "our Journey Matters: Acknowledge that each person's experience is unique and valuable"}
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-[#B87333] mb-2">
                {isSpanish ? "Cómo puedo ayudar:" : "How I can help:"}
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  {isSpanish 
                    ? "Navegar por las funciones y recursos de la aplicación" 
                    : "Navigate the app's features and resources"}
                </li>
                <li>
                  {isSpanish 
                    ? "Proporcionar orientación personalizada sobre salud mental" 
                    : "Provide personalized mental health guidance"}
                </li>
                <li>
                  {isSpanish 
                    ? "Apoyarte durante momentos difíciles" 
                    : "Support you during difficult moments"}
                </li>
                <li>
                  {isSpanish 
                    ? "Conectarte con recursos apropiados" 
                    : "Connect you with appropriate resources"}
                </li>
                <li>
                  {isSpanish 
                    ? "Seguir tu progreso y celebrar logros" 
                    : "Track your progress and celebrate wins"}
                </li>
              </ul>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="sm:justify-center mt-4">
          <Button 
            className="group hero-button bg-[#B87333] hover:bg-[#B87333]/80"
            onClick={() => onOpenChange(false)}
          >
            {isSpanish 
              ? "Comienza Tu Viaje Con Henry" 
              : "Start Your Journey With Henry"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HenryIntroDialog;
