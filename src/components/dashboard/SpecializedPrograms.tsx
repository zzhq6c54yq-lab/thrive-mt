
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const SpecializedPrograms: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  // Translations
  const translations = {
    title: isSpanish ? "Programas Especializados" : "Specialized Programs",
    navigating: isSpanish ? "Navegando..." : "Navigating...",
    takingYou: isSpanish ? "Llevándote a la función seleccionada" : "Taking you to your selected feature",
    exploreProgram: isSpanish ? "Explorar Programa" : "Explore Program"
  };

  const specializedPrograms = [
    {
      title: isSpanish ? "Departamento de Defensa" : "Department of Defense",
      description: isSpanish 
        ? "Recursos y apoyo para personal militar y veteranos" 
        : "Resources and support for military personnel and veterans",
      icon: Shield,
      path: "/dod-welcome",
      gradient: "from-[#0EA5E9]/80 to-[#2563EB]/80",
      borderColor: "#0EA5E9"
    },
    {
      title: isSpanish ? "La Experiencia Universitaria" : "The College Experience",
      description: isSpanish 
        ? "Apoyo de salud mental para estudiantes en la vida universitaria" 
        : "Mental health support for students navigating campus life",
      icon: GraduationCap,
      path: "/college-welcome",
      gradient: "from-[#8B5CF6]/80 to-[#6366F1]/80",
      borderColor: "#8B5CF6"
    },
    {
      title: isSpanish ? "Pequeñas Empresas" : "Small Business",
      description: isSpanish 
        ? "Recursos de salud mental para emprendedores y dueños de pequeñas empresas" 
        : "Mental health resources for entrepreneurs and small business owners",
      icon: Briefcase,
      path: "/small-business-welcome",
      gradient: "from-[#F97316]/80 to-[#FB923C]/80",
      borderColor: "#F97316"
    }
  ];
  
  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // Force component to re-render when language changes
      console.log("Language changed, updating specialized programs");
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const handleFeatureClick = (path: string) => {
    toast({
      title: translations.navigating,
      description: translations.takingYou,
      duration: 1500,
    });
    
    navigate(path, { 
      state: { 
        fromMainMenu: true,
        preventTutorial: true 
      }
    });
  };

  return (
    <div className="mb-10">
      <div className="mb-6 relative">
        <h2 className="text-3xl font-bold inline-flex items-center gap-3 relative">
          <Sparkles className="h-6 w-6 text-[#B87333]" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#ffffff] to-[#ffffff] tracking-tight">
            {translations.title}
          </span>
        </h2>
        <div className="absolute -bottom-2 left-0 w-64 h-[2px] bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specializedPrograms.map((program, index) => (
          <div 
            key={index}
            onClick={() => handleFeatureClick(program.path)}
            className="relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-90`}></div>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div className="relative z-10 p-5 flex flex-col h-full min-h-[180px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm">
                  <program.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{program.title}</h3>
              </div>
              
              <p className="text-white/90 mb-4 flex-grow">{program.description}</p>
              
              <Button 
                className="mt-auto self-start bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeatureClick(program.path);
                }}
              >
                {translations.exploreProgram}
              </Button>
            </div>
            
            <div 
              className="absolute inset-0 border-2 opacity-50 group-hover:opacity-100 transition-opacity"
              style={{ borderColor: program.borderColor }}  
            ></div>
            
            <div className="absolute top-0 right-0 h-20 w-20 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializedPrograms;
