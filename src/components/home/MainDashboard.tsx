import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import NewFeatures from "@/components/home/NewFeatures";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardMiniGamesGrid from "@/components/dashboard/DashboardMiniGamesGrid";
import { useWorkshopNavigation } from "@/components/dashboard/useWorkshopNavigation";
import useTranslation from "@/hooks/useTranslation";
import DashboardTutorial from "@/components/dashboard/DashboardTutorial";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
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
      // Store this in localStorage so it persists
      localStorage.setItem('dashboardTutorialShown', 'true');
      localStorage.removeItem('shouldShowDashboardTutorial');
      setShowTutorial(false);
    } else {
      // Only show tutorial if it's explicitly requested and hasn't been shown before
      setShowTutorial(!dashboardTutorialShown && shouldShow);
    }
    
    // Mark any tutorial as completed on load if needed
    if (markTutorialCompleted) {
      markTutorialCompleted();
    }
  }, [markTutorialCompleted, location.state]);
  
  const handleCloseTutorial = () => {
    setShowTutorial(false);
    if (markTutorialCompleted) {
      markTutorialCompleted();
    }
    // Always mark dashboard tutorial as shown to prevent duplicates
    localStorage.setItem('dashboardTutorialShown', 'true');
    localStorage.removeItem('shouldShowDashboardTutorial');
  };
  
  return (
    <DashboardBackground>
      <Header />
      
      <ThriveHeader 
        userName={userName}
        showHenry={showHenry}
        onHenryToggle={onHenryToggle}
      />

      {/* New Features section - shared component for both dashboard and home */}
      <NewFeatures />

      {/* Mini Games grid REMOVED from main dashboard. It will be in Key Features / features area now. */}
      
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
