
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Brain, Smile, Sparkles, ArrowRight } from "lucide-react";

interface HenryButtonProps {
  className?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HenryButton: React.FC<HenryButtonProps> = ({ 
  className = "", 
  isOpen,
  onOpenChange
}) => {
  return (
    <>
      <div className="relative flex flex-col items-center cursor-pointer" onClick={() => onOpenChange(true)}>
        <Avatar 
          className={`h-14 w-14 border-4 border-[#B87333]/50 transition-all hover:scale-110 ${className}`}
        >
          <AvatarImage src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" />
          <AvatarFallback className="bg-[#B87333]/20 text-[#B87333] text-2xl">
            H
          </AvatarFallback>
        </Avatar>
        <span className="mt-1 text-xs font-medium text-[#B87333] animate-pulse" 
          style={{ 
            textShadow: '0 0 5px rgba(184, 115, 51, 0.7), 0 0 10px rgba(184, 115, 51, 0.5)' 
          }}>
          Meet Henry
        </span>
      </div>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-white/5 backdrop-blur-md border border-[#B87333]/20">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Avatar className="h-24 w-24 border-4 border-[#B87333]/50">
                <AvatarImage src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" />
                <AvatarFallback className="bg-[#B87333]/20 text-[#B87333] text-2xl">
                  H
                </AvatarFallback>
              </Avatar>
            </div>
            <DialogTitle className="text-2xl gradient-heading">Meet Henry</DialogTitle>
            <DialogDescription className="text-base text-white">
              Your personalized mental health specialist
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] overflow-auto pr-4">
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Hi, I'm Henry! I'm here to help you navigate your mental health journey and provide personalized support as you explore Thrive MT.
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
            </div>
          </ScrollArea>
          
          <DialogFooter className="sm:justify-center mt-4">
            <Button 
              className="group hero-button bg-[#B87333] hover:bg-[#B87333]/80 w-full sm:w-auto"
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
