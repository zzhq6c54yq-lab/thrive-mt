import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Brain, Smile, Sparkles, ArrowRight } from "lucide-react";

interface HenryButtonProps {
  className?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HenryButton: React.FC<HenryButtonProps> = ({ 
  className = "", 
  isOpen,
  onOpenChange,
  userName
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const henryRef = useRef<HTMLDivElement>(null);
  const isMoving = useRef(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    if (isOpen) return;
    
    const targetX = Math.max(20, Math.min(cursorPosition.x + 20, window.innerWidth - 60));
    const targetY = Math.max(20, Math.min(cursorPosition.y - 50, window.innerHeight - 60));
    
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };
    
    if (!isMoving.current) {
      isMoving.current = true;
      
      const moveHenry = () => {
        setButtonPosition(prev => {
          const newX = lerp(prev.x, targetX, 0.08);
          const newY = lerp(prev.y, targetY, 0.08);
          
          const isCloseEnough = 
            Math.abs(newX - targetX) < 0.5 && 
            Math.abs(newY - targetY) < 0.5;
            
          if (isCloseEnough) {
            isMoving.current = false;
            return { x: targetX, y: targetY };
          }
          
          requestAnimationFrame(moveHenry);
          return { x: newX, y: newY };
        });
      };
      
      requestAnimationFrame(moveHenry);
    }
  }, [cursorPosition, isVisible, isOpen]);

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }, 5000);
    
    return () => clearInterval(glowInterval);
  }, []);

  const handleOpen = () => {
    onOpenChange(true);
  };

  const getGreeting = () => {
    if (userName) {
      return `Hi ${userName}! I'm Henry, your personal guide.`;
    }
    return "Hi there! I'm Henry, your personal guide.";
  };

  return (
    <>
      {isVisible && !isOpen && (
        <div 
          ref={henryRef}
          className="fixed z-50 transition-all duration-300"
          style={{ 
            transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          <div 
            onClick={handleOpen}
            className={`group cursor-pointer flex items-center gap-2 p-1.5 rounded-full bg-[#221F26]/80 backdrop-blur-md border border-[#B87333]/20 hover:border-[#B87333]/50 transition-all duration-300 ${
              isGlowing ? 'animate-pulse shadow-[0_0_15px_rgba(184,115,51,0.5)]' : ''
            } ${className}`}
          >
            <div className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-[#B87333] text-white group-hover:border-[#B87333] transition-all">
              <span className="text-md font-bold">H</span>
            </div>
            <span className="pr-2 text-xs font-medium text-white opacity-70 group-hover:opacity-100">
              Need help?
            </span>
          </div>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-black/85 backdrop-blur-md border border-[#B87333]/50">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="h-24 w-24 rounded-full flex items-center justify-center border-4 border-[#B87333]/50 bg-[#B87333] text-white">
                <span className="text-3xl font-bold">H</span>
              </div>
            </div>
            <DialogTitle className="text-2xl gradient-heading">Meet Henry</DialogTitle>
            <DialogDescription className="text-base text-white">
              {getGreeting()}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] overflow-auto pr-4">
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                I'm here to help you navigate your mental health journey and provide personalized support as you explore Thrive MT.
              </p>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-medium text-lg text-[#B87333] mb-2">My name stands for:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-[#B87333]" />
                    <span><span className="font-bold text-[#B87333]">H</span>elpful guidance through your mental health journey</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#B87333]" />
                    <span><span className="font-bold text-[#B87333]">E</span>vidence-based strategies for emotional wellbeing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Smile className="h-5 w-5 text-[#B87333]" />
                    <span><span className="font-bold text-[#B87333]">N</span>urturing support whenever you need it</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#B87333]" />
                    <span><span className="font-bold text-[#B87333]">R</span>eliable resources tailored to your needs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-[#B87333]" />
                    <span><span className="font-bold text-[#B87333]">Y</span>our companion on the path to mental wellness</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-[#B87333] mb-2">How I can help:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Navigate the app's features and resources</li>
                  <li>Provide personalized mental health guidance</li>
                  <li>Support you during difficult moments</li>
                  <li>Connect you with appropriate resources</li>
                  <li>Track your progress and celebrate wins</li>
                </ul>
              </div>
              
              <p className="italic text-gray-300 mt-2">
                I'll be following along as you navigate Thrive MT, always ready to help when you need me!
              </p>
            </div>
          </ScrollArea>
          
          <DialogFooter className="sm:justify-center mt-4">
            <Button 
              variant="gold"
              className="group w-full sm:w-auto"
              onClick={() => onOpenChange(false)}
            >
              Start Your Journey With Henry
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HenryButton;
