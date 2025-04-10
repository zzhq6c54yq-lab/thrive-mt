
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, GraduationCap, Briefcase, Sparkles, ChevronRight } from "lucide-react";
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
      borderColor: "#0EA5E9",
      imagePath: "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: isSpanish ? "La Experiencia Universitaria" : "The College Experience",
      description: isSpanish 
        ? "Apoyo de salud mental para estudiantes en la vida universitaria" 
        : "Mental health support for students navigating campus life",
      icon: GraduationCap,
      path: "/college-welcome",
      gradient: "from-[#8B5CF6]/80 to-[#6366F1]/80",
      borderColor: "#8B5CF6",
      imagePath: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: isSpanish ? "Pequeñas Empresas" : "Small Business",
      description: isSpanish 
        ? "Recursos de salud mental para emprendedores y dueños de pequeñas empresas" 
        : "Mental health resources for entrepreneurs and small business owners",
      icon: Briefcase,
      path: "/small-business-welcome",
      gradient: "from-[#F97316]/80 to-[#FB923C]/80",
      borderColor: "#F97316",
      imagePath: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
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
            className="relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 group h-56"
          >
            {/* Background image - covers about 80% of card height now */}
            <div className="absolute inset-0 h-[80%] z-0">
              <img 
                src={program.imagePath} 
                alt={program.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Bottom color section - reduced to 20% of card height, just for the name */}
            <div className={`absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-br ${program.gradient}`}></div>
            
            <div className="relative z-10 p-4 flex flex-col h-full">
              <div className="mb-auto">
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm inline-flex">
                  <program.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="mt-auto flex items-center justify-between h-[20%] px-3">
                <h3 className="text-xl font-semibold text-white truncate text-center w-full">
                  {program.title}
                </h3>
              </div>
            </div>
            
            {/* Subtle highlight effect on hover */}
            <div 
              className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ borderColor: program.borderColor }}  
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializedPrograms;
