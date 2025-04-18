
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, GraduationCap, Briefcase, Sparkles, ChevronRight, Users } from "lucide-react";
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

  // Working image URLs with fallbacks
  const getImageUrl = (imagePath: string) => {
    // If the image URL starts with https, use it directly
    if (imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Otherwise, use a placeholder
    return "https://images.unsplash.com/photo-1506726446959-adfa26e7aea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
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
      imagePath: getImageUrl("https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80")
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
      imagePath: getImageUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80")
    },
    {
      title: isSpanish ? "Pequeñas Empresas" : "Small Business",
      description: isSpanish 
        ? "Recursos de salud mental para emprendedores y dueños de pequeñas empresas" 
        : "Mental health resources for entrepreneurs and small business owners",
      icon: Briefcase,
      path: "/small-business-selection",  // Updated path to selection screen
      gradient: "from-[#F97316]/80 to-[#FB923C]/80",
      borderColor: "#F97316",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80")
    },
    {
      title: isSpanish ? "La Experiencia Adolescente" : "Adolescent Experience",
      description: isSpanish 
        ? "Apoyo de salud mental adaptado para niños y adolescentes de diferentes edades" 
        : "Age-appropriate mental health support for children and teens",
      icon: Users,
      path: "/adolescent-selection",
      gradient: "from-[#D946EF]/80 to-[#EC4899]/80",
      borderColor: "#D946EF",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80")
    },
    {
      title: isSpanish ? "Los Años Dorados" : "The Golden Years",
      description: isSpanish 
        ? "Recursos de bienestar mental para adultos mayores y personas de la tercera edad" 
        : "Mental wellness resources for seniors and elderly adults",
      icon: Sparkles,
      path: "/golden-years-welcome",
      gradient: "from-[#D4AF37]/80 to-[#B8860B]/80",
      borderColor: "#FFC000",
      imagePath: getImageUrl("https://images.unsplash.com/photo-1540778324650-529f9f961133?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80") // Updated to show socially active senior citizens
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
    
    // Updated to include directToAssessment flag to indicate we want to go directly to assessment
    navigate(path, { 
      state: { 
        fromMainMenu: true,
        preventTutorial: true,
        directToAssessment: true
      }
    });
  };

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {specializedPrograms.map((program, index) => (
          <div 
            key={index}
            onClick={() => handleFeatureClick(program.path)}
            className="relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 group h-80"
          >
            {/* Background image - covers about 70% of card height */}
            <div className="absolute inset-0 h-[70%] z-0">
              <img 
                src={program.imagePath} 
                alt={program.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If image fails to load, replace with fallback
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506726446959-adfa26e7aea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Bottom color section - 30% of card height */}
            <div className={`absolute bottom-0 left-0 right-0 h-[30%] ${
              program.title === "The Golden Years" || program.title === "Los Años Dorados"
                ? "bg-gradient-to-br from-amber-500/90 via-amber-600/90 to-amber-700/90 shadow-inner"
                : `bg-gradient-to-br ${program.gradient}`
            } flex items-center justify-center`}>
              <h3 className="text-xl font-semibold text-white truncate text-center w-full px-4">
                {program.title}
              </h3>
            </div>
            
            <div className="relative z-10 p-4 flex flex-col h-full">
              <div className="mb-auto">
                <div className={`p-3 rounded-full ${
                  program.title === "The Golden Years" || program.title === "Los Años Dorados"
                    ? "bg-amber-400/30 backdrop-blur-sm"
                    : "bg-white/20 backdrop-blur-sm"
                } inline-flex`}>
                  <program.icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Enhanced metallic gold effect for Golden Years */}
            {(program.title === "The Golden Years" || program.title === "Los Años Dorados") && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-amber-200/15 via-yellow-100/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-amber-500/10 rounded-full blur-lg"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tl from-yellow-200/20 to-amber-500/10 rounded-full blur-lg"></div>
              </>
            )}
            
            {/* Subtle highlight effect on hover */}
            <div 
              className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ 
                borderColor: (program.title === "The Golden Years" || program.title === "Los Años Dorados") 
                  ? "#FFC000" 
                  : program.borderColor 
              }}  
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializedPrograms;
