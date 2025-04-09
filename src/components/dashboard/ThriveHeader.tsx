
import React, { useState } from "react";
import HenryIntroDialog from "../henry/HenryIntroDialog";
import HelpDialog from "../help/HelpDialog";
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
  
  // Array of affirmations to display in the background pattern
  const affirmations = [
    "I AM ENOUGH", "I AM WORTHY", "I'M ALLOWED TO HEAL", 
    "BE THE LOVE", "NEVER GIVE UP", "I BELIEVE IN ME",
    "FORGIVE MYSELF", "I MATTER", "I'M WORTH IT"
  ];
  
  return (
    <div className="w-full relative overflow-hidden py-6 z-10 mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#070707] to-black"></div>
      
      {/* Affirmations pattern background */}
      <div className="absolute inset-0 opacity-10">
        {affirmations.map((affirmation, index) => {
          const words = affirmation.split(' ');
          const highlightedText = words.map(word => {
            if (word.includes('HEAL') || word.includes('LOVE') || word.includes('NEVER') || 
                word.includes('ENOUGH') || word.includes('WORTHY')) {
              return `<span class="text-[#E5C5A1]">${word}</span>`;
            }
            return word;
          }).join(' ');
          
          const isCursive = index % 2 === 0;
          
          return (
            <div 
              key={index}
              className={`absolute text-white/20 whitespace-nowrap ${isCursive ? 'font-serif italic' : 'font-sans'}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                fontSize: `${Math.max(0.5, Math.random() * 0.8)}rem`,
                opacity: Math.max(0.1, Math.random() * 0.3)
              }}
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          );
        })}
      </div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/25 to-[#c0c0c0]/15 transform -skew-y-6 rotate-3 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-[#ffffff]/10 via-[#B87333]/15 to-[#c0c0c0]/10 transform skew-y-4 -rotate-2 animate-pulse" style={{animationDuration: '12s', animationDelay: '0.5s'}}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%220.5%22 fill=%22%23ffffff%22 fill-opacity=%220.3%22/></svg>')]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-[#c0c0c0]/15 via-[#E5C5A1]/20 to-[#ffffff]/15 transform -skew-y-4 rotate-1 animate-pulse" style={{animationDuration: '10s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center justify-center pt-10 pb-10 px-6">
          <div className="flex flex-col items-center gap-6 mb-6">
            <div className="relative group">
              {/* New black logo design with head outline logo inside */}
              <div className="absolute inset-[-60px] bg-gradient-to-r from-[#000] via-[#111] to-[#000] rounded-full blur-xl opacity-80"></div>
              
              {/* Elegant rotating rings with silver accent */}
              <div className="absolute inset-[-75px] rounded-full border border-[#B87333] animate-spin opacity-20" style={{animationDuration: '20s'}}></div>
              <div className="absolute inset-[-65px] rounded-full border border-[#c0c0c0] animate-spin opacity-20" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
              <div className="absolute inset-[-55px] rounded-full border-[1px] border-[#E5C5A1] animate-spin opacity-30" style={{animationDuration: '25s'}}></div>
              <div className="absolute inset-[-45px] rounded-full border-[1px] border-[#ffffff] animate-spin opacity-30" style={{animationDuration: '18s', animationDirection: 'reverse'}}></div>
              
              {/* Inner glow effect */}
              <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-[#B87333]/30 to-[#E5C5A1]/15 blur-lg animate-pulse" style={{animationDuration: '4s'}}></div>
              
              {/* Logo container with deep black interior and head outline logo */}
              <div className="relative w-[160px] h-[160px] rounded-full bg-black border-2 border-[#E5C5A1]/50 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
                {/* Circular text path for "THRIVE MT" */}
                <div className="absolute w-[140px] h-[140px] rounded-full border-2 border-[#E5C5A1]/30 flex items-center justify-center">
                  <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <path id="circlePath" 
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
                      fill="none"/>
                    <text>
                      <textPath xlinkHref="#circlePath" className="text-[#E5C5A1] text-xs font-bold tracking-[0.25em]" startOffset="0%">
                        THRIVE MT • THRIVE MT •
                      </textPath>
                    </text>
                  </svg>
                </div>
                
                {/* Diagonal gold accent bar */}
                <div className="absolute w-[200%] h-[40px] bg-gradient-to-r from-[#B87333]/20 via-[#E5C5A1]/40 to-[#B87333]/20 rotate-45 transform translate-y-[-10px] animate-pulse" style={{animationDuration: '5s'}}></div>
                
                {/* Head outline logo with metallic gold gradient */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="h-24 w-24 relative">
                    {/* Head outline with metallic gold gradient */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Define the metallic gold gradient */}
                      <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#E5C5A1" />
                          <stop offset="50%" stopColor="#FFF1C9" />
                          <stop offset="100%" stopColor="#B87333" />
                        </linearGradient>
                      </defs>
                      
                      {/* Head outline shape */}
                      <path 
                        d="M50,15 C30,15 20,30 20,50 C20,65 30,85 50,85 C70,85 80,65 80,50 C80,30 70,15 50,15 Z" 
                        fill="none" 
                        stroke="url(#goldGradient)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* Brain element */}
                      <path 
                        d="M35,40 C35,30 45,25 50,30 C55,25 65,30 65,40 C65,50 55,55 50,50 C45,55 35,50 35,40 Z" 
                        fill="none" 
                        stroke="url(#goldGradient)" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                      
                      {/* Heart element */}
                      <path 
                        d="M40,60 C40,55 45,55 50,60 C55,55 60,55 60,60 C60,65 55,70 50,65 C45,70 40,65 40,60 Z" 
                        fill="none" 
                        stroke="url(#goldGradient)" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                      
                      {/* Circular arrows */}
                      <path 
                        d="M25,50 A25,25 0 0,1 75,50" 
                        fill="none" 
                        stroke="url(#goldGradient)" 
                        strokeWidth="1.5" 
                        strokeDasharray="5,3"
                      >
                        <animateTransform 
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 50 50"
                          to="360 50 50"
                          dur="15s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path 
                        d="M75,50 A25,25 0 0,1 25,50" 
                        fill="none" 
                        stroke="url(#goldGradient)" 
                        strokeWidth="1.5" 
                        strokeDasharray="5,3"
                      >
                        <animateTransform 
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 50 50"
                          to="-360 50 50"
                          dur="12s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </div>
                </div>
                
                {/* Elegant accent lines */}
                <div className="absolute left-0 right-0 bottom-[25%] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff]/40 to-transparent"></div>
                <div className="absolute left-0 right-0 top-[25%] h-[1px] bg-gradient-to-r from-transparent via-[#E5C5A1]/40 to-transparent"></div>
              </div>

              {/* Subtle shine effects */}
              <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-white/80 rounded-full blur-sm animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-[#E5C5A1]/80 rounded-full blur-sm animate-ping" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {/* Added text shadow for black outline around the text */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1] via-[#ffffff] to-[#B87333] animate-gradient-x rotate-1 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" style={{backgroundSize: '200% auto'}}>
                  Hey {displayName}!
                </span>
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#ffffff] to-[#E5C5A1] animate-gradient-x -rotate-1 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" style={{backgroundSize: '200% auto', animationDelay: '0.5s'}}>
                  Thrive MT
                </span>
              </h1>
              <p className="mt-3 text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#c0c0c0]/90 to-[#E5C5A1]/90 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
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
