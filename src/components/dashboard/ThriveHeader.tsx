
import React, { useState } from "react";
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
    <div className="w-full relative overflow-hidden py-6 z-10 mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0d29] via-[#221530] to-[#1a0d29]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/25 to-[#B87333]/15 transform -skew-y-3 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-[#E5C5A1]/10 via-[#B87333]/15 to-[#E5C5A1]/10 transform skew-y-2 animate-pulse" style={{animationDuration: '12s', animationDelay: '0.5s'}}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%220.5%22 fill=%22%23ffffff%22 fill-opacity=%220.3%22/></svg>')]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/20 to-[#B87333]/15 transform -skew-y-2 animate-pulse" style={{animationDuration: '10s'}}></div>
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center justify-center pt-10 pb-10 px-6">
          <div className="flex flex-col items-center gap-6 mb-6">
            <div className="relative group">
              {/* Enhanced logo with deeper colors and more 3D-like animations */}
              <div className="absolute inset-[-30px] rounded-full bg-gradient-to-r from-[#B87333]/90 to-[#E5C5A1]/90 blur-lg animate-pulse" style={{animationDuration: '3s'}}></div>
              <div className="absolute inset-[-45px] rounded-full border-2 border-[#B87333]/80 animate-spin" style={{animationDuration: '15s'}}></div>
              <div className="absolute inset-[-40px] rounded-full border-2 border-[#E5C5A1]/70 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
              <div className="absolute inset-[-35px] rounded-full border-[3px] border-[#B87333]/60 animate-spin" style={{animationDuration: '20s', animationDelay: '1s'}}></div>
              <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1]/80 blur-md animate-pulse" style={{animationDuration: '4s'}}></div>
              
              {/* Larger logo with deeper colors and stronger glow */}
              <img 
                src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                alt="Thrive MT Logo" 
                className="relative h-[120px] w-[120px] object-contain filter drop-shadow-[0_0_30px_rgba(184,115,51,1)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(184,115,51,1)]"
              />
              
              {/* Additional 3D-like glow effects */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333]/50 via-transparent to-[#B87333]/50 animate-pulse" style={{animationDuration: '5s'}}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] bg-[#B87333]/20 rounded-full blur-xl animate-ping" style={{animationDuration: '4s', animationIterationCount: 'infinite'}}></div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
                  {getTranslatedText('welcome')} {displayName}!
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1] via-[#B87333] to-[#E5C5A1] animate-gradient-x" style={{backgroundSize: '200% auto', animationDelay: '0.5s'}}>
                  Thrive MT
                </span>
              </h1>
              <p className="mt-3 text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1]/90 to-[#B87333]/90">
                {isSpanish 
                  ? "Trabajemos en tu viaje de salud mental"
                  : "Let's work on your mental health journey"
                }
              </p>
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
