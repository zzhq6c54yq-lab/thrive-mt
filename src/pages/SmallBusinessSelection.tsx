
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/navigation/BackButton";
import HomeButton from "@/components/HomeButton";
import useTranslation from "@/hooks/useTranslation";

const SmallBusinessSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish, getTranslatedText } = useTranslation();
  
  const handleSelection = (userType: 'owner' | 'employee') => {
    toast({
      title: isSpanish ? "Selección realizada" : "Selection made",
      description: isSpanish 
        ? "Cargando recursos personalizados..." 
        : "Loading customized resources...",
      duration: 1500,
    });
    
    if (userType === 'owner') {
      navigate("/small-business-welcome", { 
        state: { 
          userType: 'owner',
          returnToMain: true,
          preventTutorial: true
        } 
      });
    } else {
      navigate("/employee-welcome", { 
        state: { 
          userType: 'employee',
          returnToMain: true,
          preventTutorial: true
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
                  {isSpanish ? "Portal de Pequeñas Empresas" : "Small Business Portal"}
                </span>
              </h1>
              <p className="text-white/70">
                {isSpanish 
                  ? "Seleccione la perspectiva que más se adapte a sus necesidades" 
                  : "Select the perspective that best fits your needs"}
              </p>
            </div>
          </div>
          <HomeButton />
        </div>
        
        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Business Owner Card */}
          <div 
            onClick={() => handleSelection('owner')}
            className="bg-gradient-to-br from-amber-900/30 to-orange-800/30 rounded-2xl overflow-hidden border border-amber-500/20 p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-amber-500/40 hover:scale-[1.02] h-96 flex flex-col relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-amber-200">
              {isSpanish ? "Dueño de Negocio" : "Business Owner"}
            </h2>
            
            <p className="text-white/80 mb-6 flex-grow">
              {isSpanish
                ? "Recursos para manejar el estrés de dirigir un negocio, equilibrar las exigencias laborales y personales, y crear una cultura laboral saludable."
                : "Resources for managing the stress of running a business, balancing work and personal demands, and creating a healthy workplace culture."}
            </p>
            
            <div className="mt-auto">
              <Button 
                variant="outline"
                className="border-amber-500/40 text-amber-200 hover:bg-amber-800/30 gap-2 group-hover:border-amber-500/60"
              >
                {isSpanish ? "Continuar" : "Continue"}
                <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Employee Card */}
          <div 
            onClick={() => handleSelection('employee')}
            className="bg-gradient-to-br from-blue-900/30 to-purple-800/30 rounded-2xl overflow-hidden border border-blue-500/20 p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-500/40 hover:scale-[1.02] h-96 flex flex-col relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">
              {isSpanish ? "Empleado" : "Employee"}
            </h2>
            
            <p className="text-white/80 mb-6 flex-grow">
              {isSpanish
                ? "Apoyo para el bienestar mental en un entorno de pequeña empresa, estrategias para mantener límites saludables entre el trabajo y la vida personal, y técnicas de manejo del estrés."
                : "Support for mental wellbeing in a small business environment, strategies for maintaining healthy boundaries between work and personal life, and stress management techniques."}
            </p>
            
            <div className="mt-auto">
              <Button 
                variant="outline"
                className="border-blue-500/40 text-blue-200 hover:bg-blue-800/30 gap-2 group-hover:border-blue-500/60"
              >
                {isSpanish ? "Continuar" : "Continue"}
                <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallBusinessSelection;
