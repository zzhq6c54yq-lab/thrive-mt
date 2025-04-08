
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Handshake, Award, WalletCards, Sparkles, Crown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const NewFeatures: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish, getTranslatedText } = useTranslation();
  
  const handleNavigation = (path: string, title: string) => {
    toast({
      title: `${isSpanish ? 'Navegando a' : 'Navigating to'} ${title}`,
      description: isSpanish ? 'Cargando la función solicitada...' : 'Loading your requested feature...',
      duration: 2000
    });
    
    navigate(path);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#1c2e4a] to-[#2d3748] border-y border-[#B87333]/30 py-8 px-4 shadow-xl relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.08%22 stroke-width=%221%22/></svg>')] opacity-40"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><circle cx=%2230%22 cy=%2230%22 r=%222%22 fill=%22%23B87333%22 fill-opacity=%220.08%22/></svg>')] opacity-50"></div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B87333]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '15s'}}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '18s'}}></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
          <Sparkles className="h-6 w-6 text-[#B87333] mr-3 animate-pulse" style={{animationDuration: '3s'}} />
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] tracking-wide">
            {getTranslatedText('newFeatures')}
          </span>
        </h3>
        
        <div className="flex flex-wrap justify-center sm:justify-between gap-8">
          <Button 
            variant="bronze"
            className="flex items-center gap-3 px-7 py-7 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] group relative overflow-hidden"
            onClick={() => handleNavigation("/barter-system", getTranslatedText('barterSystem'))}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B87333]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-2.5 rounded-full bg-[#B87333]/20 group-hover:bg-[#B87333]/40 transition-colors duration-500">
              <Handshake className="h-6 w-6 text-[#E5C5A1] group-hover:text-white transition-colors duration-500" />
            </div>
            <span className="font-medium text-lg">{getTranslatedText('barterSystem')}</span>
          </Button>
          
          <Button 
            variant="gold"
            className="flex items-center gap-3 px-7 py-7 rounded-xl transform transition-all duration-500 hover:scale-105 shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(184,115,51,0.4)] group relative overflow-hidden"
            onClick={() => handleNavigation("/subscription-plans", getTranslatedText('upgradePlan'))}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] opacity-100 background-animate" style={{backgroundSize: '200% auto'}}></div>
            
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-white/90 animate-ping" style={{animationDuration: '2.5s'}}></div>
              <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full bg-white/90 animate-ping" style={{animationDuration: '1.8s'}}></div>
              <div className="absolute top-2/4 left-3/4 w-1.5 h-1.5 rounded-full bg-white/90 animate-ping" style={{animationDuration: '3.2s'}}></div>
              <div className="absolute top-1/3 right-1/2 w-1 h-1 rounded-full bg-white/80 animate-ping" style={{animationDuration: '2s'}}></div>
            </div>
            
            <div className="p-2.5 rounded-full bg-black/30 backdrop-blur-sm z-10 group-hover:bg-black/40 transition-colors duration-500">
              <Crown className="h-6 w-6 text-white group-hover:text-white transition-colors" />
            </div>
            <div className="z-10 flex flex-col items-start">
              <span className="font-bold text-black text-base">{getTranslatedText('upgradePlan')}</span>
              <span className="text-sm text-black/80">{getTranslatedText('premiumTools')}</span>
            </div>
            
            <Zap className="h-6 w-6 ml-2 text-black group-hover:translate-x-2 transition-transform duration-500 z-10" />
          </Button>
          
          <Button 
            variant="bronze"
            className="flex items-center gap-3 px-7 py-7 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] group relative overflow-hidden"
            onClick={() => handleNavigation("/copay-credits", getTranslatedText('coPayCredits'))}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B87333]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-2.5 rounded-full bg-[#B87333]/20 group-hover:bg-[#B87333]/40 transition-colors duration-500">
              <WalletCards className="h-6 w-6 text-[#E5C5A1] group-hover:text-white transition-colors duration-500" />
            </div>
            <span className="font-medium text-lg">{getTranslatedText('coPayCredits')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFeatures;
