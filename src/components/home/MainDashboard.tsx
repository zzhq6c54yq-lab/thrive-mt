
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import NewFeatures from "@/components/dashboard/NewFeatures";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardTutorial from "@/components/dashboard/DashboardTutorial";
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
  const [showTutorial, setShowTutorial] = useState(false);
  const { handleWorkshopClick } = useWorkshopNavigation();
  
  // Check if coming from onboarding screens and show tutorial if needed
  useEffect(() => {
    // Check if coming from onboarding screens
    const prevScreenState = localStorage.getItem('prevScreenState');
    const dashboardTutorialShown = localStorage.getItem('dashboardTutorialShown') === 'true';
    const comingFromOnboarding = prevScreenState === 'visionBoard' || 
                              prevScreenState === 'subscription' || 
                              prevScreenState === 'moodResponse' || 
                              prevScreenState === 'mood' || 
                              prevScreenState === 'register';
    
    // Only show tutorial if coming from onboarding and it hasn't been shown before
    if (comingFromOnboarding && !dashboardTutorialShown) {
      console.log("Showing dashboard tutorial for first-time onboarding completion");
      setShowTutorial(true);
    }
  }, []);
  
  const handleTutorialClose = () => {
    setShowTutorial(false);
    localStorage.setItem('dashboardTutorialShown', 'true');
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
      />
      
      <DashboardTutorial 
        showTutorial={showTutorial}
        userName={userName}
        onClose={handleTutorialClose}
      />
    </DashboardBackground>
  );
};

export default MainDashboard;
