
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
  
  const userName = localStorage.getItem('userName') || "Friend";
  const selectedQualities = location.state?.qualities || [];
  const selectedGoals = location.state?.goals || [];
  
  const navigateToFeature = (path: string) => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Cargando recurso solicitado" : "Loading requested resource",
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
    <Page title="Home" showBackButton={false}>
      <MainDashboard 
        userName={userName}
        showHenry={true} // Changed to true to show Henry by default
        onHenryToggle={() => {}}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        navigateToFeature={navigateToFeature}
      />
    </Page>
  );
};

export default Home;
