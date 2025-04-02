
import React from "react";
import { Button } from "@/components/ui/button";
import { Handshake, Award, WalletCards, Sparkles, Crown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const NewFeatures: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    newFeatures: isSpanish ? "Nuevas Características" : "New Features",
    barterSystem: isSpanish ? "Sistema de Trueque" : "Barter System",
    upgradePlan: isSpanish ? "Mejorar Plan" : "Upgrade Plan",
    premiumTools: isSpanish ? "Herramientas premium" : "Premium tools",
    coPayCredits: isSpanish ? "Créditos de Copago" : "Co-Pay Credits",
    navigating: isSpanish ? "Navegando a" : "Navigating to",
    loading: isSpanish ? "Cargando la función solicitada..." : "Loading your requested feature..."
  };

  const handleNavigation = (path: string, title: string) => {
    toast({
      title: `${translations.navigating} ${title}`,
      description: translations.loading,
      duration: 2000
    });
    
    // Special case for upgrade plan - now navigate to the dedicated page
    if (path === "/subscription-plans") {
      navigate("/subscription-plans");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#1c2e4a] to-[#2d3748] border-y border-[#B87333]/20 py-6 px-4 shadow-lg relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.05%22 stroke-width=%221%22/></svg>')] opacity-40"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><circle cx=%2230%22 cy=%2230%22 r=%222%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-30"></div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B87333]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Sparkles className="h-5 w-5 text-[#B87333] mr-2" />
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333]">
            {translations.newFeatures}
          </span>
        </h3>
        
        <div className="flex flex-wrap justify-center sm:justify-between gap-6">
          <Button 
            variant="bronze"
            className="flex items-center gap-2 px-6 py-6 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group"
            onClick={() => handleNavigation("/barter-system", translations.barterSystem)}
          >
            <div className="p-2 rounded-full bg-[#B87333]/20 group-hover:bg-[#B87333]/30 transition-colors">
              <Handshake className="h-5 w-5 text-[#E5C5A1] group-hover:text-white transition-colors" />
            </div>
            <span className="font-medium">{translations.barterSystem}</span>
          </Button>
          
          <Button 
            variant="gold"
            className="flex items-center gap-2 px-5 py-5 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group relative overflow-hidden"
            onClick={() => handleNavigation("/subscription-plans", translations.upgradePlan)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] opacity-100 background-animate" style={{backgroundSize: '200% auto'}}></div>
            
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white/80 animate-ping" style={{animationDuration: '3s'}}></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full bg-white/80 animate-ping" style={{animationDuration: '2s'}}></div>
              <div className="absolute top-2/4 left-3/4 w-1 h-1 rounded-full bg-white/80 animate-ping" style={{animationDuration: '4s'}}></div>
            </div>
            
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm z-10 group-hover:bg-black/40 transition-colors">
              <Crown className="h-5 w-5 text-white group-hover:text-white transition-colors" />
            </div>
            <div className="z-10 flex flex-col items-start">
              <span className="font-bold text-black text-sm">{translations.upgradePlan}</span>
              <span className="text-xs text-black/80">{translations.premiumTools}</span>
            </div>
            
            <Zap className="h-5 w-5 ml-1 text-black group-hover:translate-x-1 transition-transform z-10" />
          </Button>
          
          <Button 
            variant="bronze"
            className="flex items-center gap-2 px-6 py-6 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group"
            onClick={() => handleNavigation("/copay-credits", translations.coPayCredits)}
          >
            <div className="p-2 rounded-full bg-[#B87333]/20 group-hover:bg-[#B87333]/30 transition-colors">
              <WalletCards className="h-5 w-5 text-[#E5C5A1] group-hover:text-white transition-colors" />
            </div>
            <span className="font-medium">{translations.coPayCredits}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFeatures;
