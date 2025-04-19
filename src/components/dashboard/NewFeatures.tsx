
import React from "react";
import { Button } from "@/components/ui/button";
import { Handshake, Award, WalletCards, Sparkles } from "lucide-react";
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
    <div className="w-full bg-gradient-to-r from-[#1c2e4a] to-[#2d3748] border-y border-[#B87333]/20 py-8 px-4 shadow-lg relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.05%22 stroke-width=%221%22/></svg>')] opacity-40"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><circle cx=%2230%22 cy=%2230%22 r=%222%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B87333]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <h3 className="text-xl font-semibold text-white mb-8 flex items-center">
          <Sparkles className="h-5 w-5 text-[#B87333] mr-2" />
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333]">
            {getTranslatedText('newFeatures')}
          </span>
        </h3>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Barter System - Dark theme with bronze accents */}
          <Button 
            variant="bronze"
            className="flex flex-col items-center justify-center p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-zinc-900 to-zinc-800 border-2 border-[#B87333]/30 hover:border-[#B87333] shadow-[0_8px_32px_rgba(184,115,51,0.2)] group backdrop-blur-sm"
            onClick={() => handleNavigation("/barter-system", "Barter System")}
          >
            <Handshake className="h-8 w-8 mb-3 text-[#B87333] group-hover:text-[#E5C5A1] transition-colors" />
            <span className="text-xl font-semibold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Barter</span>
            <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">System</span>
          </Button>
          
          {/* Plan Upgrade - Premium gold design */}
          <Button 
            variant="gold"
            className="flex flex-col items-center justify-center p-6 rounded-2xl transform transition-all duration-300 hover:scale-110 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] shadow-[0_8px_32px_rgba(184,115,51,0.4)] hover:shadow-[0_12px_40px_rgba(184,115,51,0.6)] group backdrop-blur-sm relative overflow-hidden"
            onClick={() => handleNavigation("/subscription-plans", "System Upgrade Plan")}
          >
            <Award className="h-8 w-8 mb-3 text-black group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-black mb-1">Plan</span>
            <span className="text-xl font-bold text-black">Upgrade</span>
          </Button>
          
          {/* Co-Pay Credits - Dark theme with bronze accents */}
          <Button 
            variant="bronze"
            className="flex flex-col items-center justify-center p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-[#B87333]/30 hover:border-[#B87333] shadow-[0_8px_32px_rgba(184,115,51,0.2)] group backdrop-blur-sm"
            onClick={() => handleNavigation("/copay-credits", "Co-Pay Credits")}
          >
            <WalletCards className="h-8 w-8 mb-3 text-[#B87333] group-hover:text-[#E5C5A1] transition-colors" />
            <span className="text-xl font-semibold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Co-Pay</span>
            <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Credits</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFeatures;
