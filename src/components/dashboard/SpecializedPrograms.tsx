
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import SpecializedProgramsGrid from "@/components/shared/SpecializedProgramsGrid";

const SpecializedPrograms: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const translations = {
    navigating: isSpanish ? "Navegando..." : "Navigating...",
    takingYou: isSpanish ? "Llevándote a la función seleccionada" : "Taking you to your selected feature"
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("Language changed, updating specialized programs");
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleFeatureClick = (path: string) => {
    // Map paths to existing routes to prevent 404 errors
    const pathMapping: Record<string, string> = {
      "/dod-welcome": "/dod-welcome",
      "/college-welcome": "/college-welcome", 
      "/small-business-welcome": "/small-business-welcome",
      "/golden-years-welcome": "/golden-years-welcome",
      "/adolescent-welcome": "/adolescent-welcome",
      "/first-responders-welcome": "/first-responders-welcome",
      "/hospitality-welcome": "/hospitality-welcome",
      "/transport-welcome": "/transport-welcome",
      "/law-enforcement-welcome": "/law-enforcement-welcome",
      "/educators-welcome": "/educators-welcome",
      "/chronic-illness-welcome": "/chronic-illness-welcome",
      "/cancer-support-welcome": "/cancer-support-welcome"
    };

    const finalPath = pathMapping[path] || path;
    
    toast({
      title: translations.navigating,
      description: translations.takingYou,
      duration: 1500,
    });
    
    navigate(finalPath, { 
      state: { 
        fromMainMenu: true,
        preventTutorial: true,
        directToAssessment: true
      }
    });
  };

  return <SpecializedProgramsGrid onProgramClick={handleFeatureClick} />;
};

export default SpecializedPrograms;
