import React from "react";
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
    <div className="w-full bg-gradient-to-r from-[#1c2e4a] to-[#2d3748] border-y border-[#B87333]/20 py-4 px-4 shadow-lg relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.05%22 stroke-width=%221%22/></svg>')] opacity-40"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><circle cx=%2230%22 cy=%2230%22 r=%222%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B87333]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Sparkles className="h-5 w-5 text-[#B87333] mr-2" />
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333]">
            {getTranslatedText('newFeatures')}
          </span>
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <Button 
            variant="bronze"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group"
            onClick={() => handleNavigation("/barter-system", "Barter System")}
          >
            <span className="text-xs font-medium">Barter System</span>
          </Button>
          
          <Button 
            variant="gold"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group relative overflow-hidden"
            onClick={() => handleNavigation("/subscription-plans", "System Upgrade Plan")}
          >
            <span className="text-xs font-bold text-black">System Upgrade Plan</span>
          </Button>
          
          <Button 
            variant="bronze"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group"
            onClick={() => handleNavigation("/copay-credits", "Co-Pay Credits")}
          >
            <span className="text-xs font-medium">Co-Pay Credits</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFeatures;
