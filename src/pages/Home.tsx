import React from "react";
import Page from "@/components/Page";
import MainDashboard from "@/components/home/MainDashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const userName = localStorage.getItem('userName') || "User";
  const selectedQualities = location.state?.qualities || [];
  const selectedGoals = location.state?.goals || [];

  const navigateToFeature = (path: string) => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Cargando recurso solicitado" : "Loading requested resource",
      duration: 1500,
    });
    
    // Add directToAssessment flag for assessment-related paths
    const isAssessmentPath = path.includes('/mental-wellness') || path.includes('/games-and-quizzes');
    
    navigate(path, { 
      state: { 
        fromMainMenu: true,
        preventTutorial: true,
        directToAssessment: isAssessmentPath,
        startAssessment: isAssessmentPath
      } 
    });
  };

  // MainDashboard prop fix and doc
  return (
    <Page title="All Tools" showBackButton={true}>
      <MainDashboard 
        userName={userName}
        showHenry={false}
        onHenryToggle={() => {}}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        navigateToFeature={navigateToFeature}
      />
    </Page>
  );
};

export default Home;
