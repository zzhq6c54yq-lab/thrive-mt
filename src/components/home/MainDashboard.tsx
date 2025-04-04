
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import NewFeatures from "@/components/dashboard/NewFeatures";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useWorkshopNavigation } from "@/components/dashboard/useWorkshopNavigation";
import useTranslation from "@/hooks/useTranslation";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
  markTutorialCompleted?: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature,
  markTutorialCompleted
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSpanish } = useTranslation();
  const { handleWorkshopClick } = useWorkshopNavigation();
  
  useEffect(() => {
    // Mark any tutorial as completed on load
    // This prevents the automatic tutorial from showing
    if (markTutorialCompleted) {
      markTutorialCompleted();
    }
    
    // Immediately mark dashboard tutorial as shown to prevent duplicates
    localStorage.setItem('dashboardTutorialShown', 'true');
    localStorage.removeItem('shouldShowDashboardTutorial');
  }, [markTutorialCompleted]);
  
  return (
    <DashboardBackground>
      <Header />
      
      <ThriveHeader 
        userName={userName}
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
      />

      <NewFeatures />
      
      <DashboardContent 
        navigate={navigate}
        onWorkshopClick={handleWorkshopClick}
      />
    </DashboardBackground>
  );
};

export default MainDashboard;
