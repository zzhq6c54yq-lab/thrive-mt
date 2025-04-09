
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Footprints } from "lucide-react";
import HenryIntroDialog from "../henry/HenryIntroDialog";
import HelpDialog from "../help/HelpDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useTranslation from "@/hooks/useTranslation";

interface ThriveHeaderProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
}

const ThriveHeader: React.FC<ThriveHeaderProps> = ({
  userName,
  showHenry,
  onHenryToggle
}) => {
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const { isSpanish, getTranslatedText } = useTranslation();
  const displayName = userName || "Friend";
  
  const handleHenryButtonClick = () => {
    // Always show the intro dialog when the button is clicked
    setShowIntroDialog(true);
  };

  const handleIntroContinue = () => {
    // Close the intro dialog and open the chat dialog
    setShowIntroDialog(false);
    setShowChatDialog(true);
    // Only toggle Henry on if he's not already visible
    if (!showHenry) {
      onHenryToggle();
    }
  };
  
  return (
    <div className="w-full relative overflow-hidden py-0 z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/25 to-[#B87333]/15 transform -skew-y-3 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-[#E5C5A1]/10 via-[#B87333]/15 to-[#E5C5A1]/10 transform skew-y-2 animate-pulse" style={{animationDuration: '12s', animationDelay: '0.5s'}}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%220.5%22 fill=%22%23ffffff%22 fill-opacity=%220.3%22/></svg>')]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/20 to-[#B87333]/15 transform -skew-y-2 animate-pulse" style={{animationDuration: '10s'}}></div>
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center pt-12 pb-16 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <div className="flex items-center gap-8 mb-6 md:mb-0">
              <div className="relative group">
                {/* Enhanced logo animations with stronger effects and larger size */}
                <div className="absolute inset-[-45px] rounded-full bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 blur-xl animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute inset-[-60px] rounded-full border-2 border-[#B87333]/60 animate-spin" style={{animationDuration: '15s'}}></div>
                <div className="absolute inset-[-35px] rounded-full border border-[#E5C5A1]/70 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-[#B87333]/90 to-[#E5C5A1]/60 blur-sm animate-pulse" style={{animationDuration: '4s'}}></div>
                
                {/* Enhanced sparkling effect */}
                <div className="absolute top-[-20px] left-[35px] w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '1.8s', animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-[-12px] right-[45px] w-3.5 h-3.5 bg-white rounded-full animate-ping" style={{animationDuration: '1.5s', animationDelay: '1s'}}></div>
                <div className="absolute top-[45px] right-[-25px] w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '2.1s'}}></div>
                <div className="absolute bottom-[40px] left-[-15px] w-3 h-3 bg-white rounded-full animate-ping" style={{animationDuration: '2.4s', animationDelay: '0.7s'}}></div>
                
                {/* Larger logo with deeper colors and stronger glow - DOUBLED SIZE */}
                <img 
                  src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                  alt="Thrive MT Logo" 
                  className="relative h-[112px] w-[112px] object-contain filter drop-shadow-[0_0_35px_rgba(184,115,51,1)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_45px_rgba(184,115,51,1)]"
                />
                
                {/* Additional glow effects */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333]/40 via-transparent to-[#B87333]/40 animate-pulse" style={{animationDuration: '5s'}}></div>
                
                {/* Enhanced rotating halo effect */}
                <div className="absolute inset-[-10px] border-4 border-[#B87333]/30 rounded-full animate-ping" style={{animationDuration: '3.5s'}}></div>
                <div className="absolute inset-[-25px] border-2 border-[#E5C5A1]/30 rounded-full animate-ping" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
                    {getTranslatedText('welcome')}
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1] via-[#B87333] to-[#E5C5A1] animate-gradient-x" style={{backgroundSize: '200% auto', animationDelay: '0.5s'}}>
                    Thrive MT
                  </span>
                </h1>
                <p className="mt-3 text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1]/90 to-[#B87333]/90">
                  {isSpanish ? `¡Hola ${displayName}! Trabajemos en tu viaje de salud mental` : `Hey ${displayName}! Let's work on your mental health journey`}
                </p>
              </div>
            </div>
            <div>
              <Button 
                onClick={handleHenryButtonClick}
                variant="outline"
                className="relative px-10 py-3 bg-gradient-to-b from-[#222] to-[#111] border-[#B87333]/50 hover:border-[#B87333] group overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#B87333]/80 rounded-b-md"></div>
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full border border-[#B87333]/40"></div>
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full border border-[#B87333]/40"></div>
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-[#B87333]/20 rounded-r-full"></div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border border-[#B87333]/30">
                    <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                    <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white text-xs">H</AvatarFallback>
                  </Avatar>
                  <span className="relative z-10 text-white">
                    {getTranslatedText('meetHenry')}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Henry Introduction Dialog */}
      <HenryIntroDialog 
        open={showIntroDialog} 
        onOpenChange={setShowIntroDialog} 
        onContinue={handleIntroContinue}
      />
      
      {/* Henry Chat Dialog */}
      <HelpDialog 
        isOpen={showChatDialog} 
        onOpenChange={setShowChatDialog} 
      />
    </div>
  );
};

export default ThriveHeader;
