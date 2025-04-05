
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import NewFeatures from "@/components/dashboard/NewFeatures";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useWorkshopNavigation } from "@/components/dashboard/useWorkshopNavigation";
import useTranslation from "@/hooks/useTranslation";
import DashboardTutorial from "@/components/dashboard/DashboardTutorial";

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
  const [showTutorial, setShowTutorial] = useState(false);
  
  useEffect(() => {
    // Check if the dashboard tutorial has been shown before
    const dashboardTutorialShown = localStorage.getItem('dashboardTutorialShown') === 'true';
    const shouldShow = localStorage.getItem('shouldShowDashboardTutorial') === 'true';
    
    // Check if tutorials should be prevented (from location state)
    const preventTutorial = location.state && location.state.preventTutorial === true;
    
    if (preventTutorial) {
      // Store this in sessionStorage so it persists across the current session
      sessionStorage.setItem('preventTutorial', 'true');
      setShowTutorial(false);
    } else {
      // Only show tutorial if it's explicitly requested and hasn't been shown before
      setShowTutorial(!dashboardTutorialShown && shouldShow);
    }
    
    // Mark any tutorial as completed on load
    // This prevents the automatic tutorial from showing again
    if (markTutorialCompleted) {
      markTutorialCompleted();
    }
    
    // Always mark dashboard tutorial as shown to prevent duplicates
    localStorage.setItem('dashboardTutorialShown', 'true');
    localStorage.removeItem('shouldShowDashboardTutorial');
  }, [markTutorialCompleted, location.state]);
  
  const handleCloseTutorial = () => {
    setShowTutorial(false);
    if (markTutorialCompleted) {
      markTutorialCompleted();
    }
  };
  
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
        navigateToFeature={navigateToFeature}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
      />
      
      <DashboardTutorial 
        showTutorial={showTutorial} 
        userName={userName}
        onClose={handleCloseTutorial}
      />
    </DashboardBackground>
  );
};

export default MainDashboard;
