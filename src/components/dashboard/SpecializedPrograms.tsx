
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
      // Language change handled silently
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleFeatureClick = (path: string) => {
    // Map paths to existing routes to prevent 404 errors
    const pathMapping: Record<string, string> = {
      "/app/dod-welcome": "/app/dod-welcome",
      "/app/college-welcome": "/app/college-welcome", 
      "/app/small-business-welcome": "/app/small-business-welcome",
      "/app/golden-years-welcome": "/app/golden-years-welcome",
      "/app/adolescent-welcome": "/app/adolescent-welcome",
      "/app/first-responders-welcome": "/app/first-responders-welcome",
      "/app/hospitality-welcome": "/app/hospitality-welcome",
      "/app/transport-welcome": "/app/transport-welcome",
      "/app/law-enforcement-welcome": "/app/law-enforcement-welcome",
      "/app/educators-welcome": "/app/educators-welcome",
      "/app/chronic-illness-welcome": "/app/chronic-illness-welcome",
      "/app/cancer-support-welcome": "/app/cancer-support-welcome"
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
