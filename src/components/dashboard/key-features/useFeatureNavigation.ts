
import { useNavigate, useLocation } from "react-router-dom";

export const useFeatureNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    // Map old paths to new working paths
    const pathMapping: Record<string, string> = {
      "/mental-wellness": "/mental-wellness-tools",
      "/games-and-quizzes": "/games-and-quizzes",
      "/small-business-portal": "/small-business-welcome",
      "/employee-dashboard": "/employee-welcome",
      "/cancer-support": "/cancer-support-welcome",
      "/career-coaching": "/career-coaching",
      "/meditation-studio": "/meditation-studio",
      "/aa-sponsor": "/my-sponsor",
      "/real-time-therapy": "/real-time-therapy",
      "/holistic-wellness": "/holistic-wellness",
      "/community-support": "/community-support",
      "/binaural-beats": "/binaural-beats",
      "/journaling": "/journaling",
      "/mindfulness-sleep": "/mindfulness-sleep",
      "/video-diary": "/video-diary",
      "/resource-library": "/resource-library",
      "/wellness-challenges": "/wellness-challenges",
      "/workshops": "/workshops",
      "/progress-reports": "/progress-reports",
      "/family-resources": "/family-resources",
      "/alternative-therapies": "/alternative-therapies",
      "/virtual-meetings": "/virtual-meetings",
      "/sleep-tracker": "/sleep-tracker"
    };

    // Get the mapped path or use the original path
    const finalPath = pathMapping[path] || path;
    
    // Add directToAssessment flag for assessment-related features
    const isAssessmentRelated = 
      finalPath === "/mental-wellness-tools" || 
      finalPath === "/games-and-quizzes" ||
      finalPath.includes("assessment");
      
    // Special handling for small business paths
    const isSmallBusiness = finalPath === "/small-business-welcome";
    const isEmployee = finalPath === "/employee-welcome";
    
    // Get the current screen state for proper return navigation
    const currentState = location.state || {};
    const currentScreenState = currentState.screenState || 'main';
    
    // Store the current path to enable proper back navigation
    const currentPath = location.pathname;
    
    if (isAssessmentRelated) {
      navigate(finalPath, {
        state: {
          ...currentState,
          preventTutorial: true,
          directToAssessment: true,
          activeTab: "assessments",
          startAssessment: true,
          fromMainMenu: true,
          returnToMain: true,
          previousPath: currentPath
        }
      });
    } else if (isSmallBusiness) {
      // Navigate to selection screen instead
      navigate("/small-business-selection", {
        state: {
          ...currentState,
          preventTutorial: true,
          fromMainMenu: true,
          returnToMain: true,
          previousPath: currentPath
        }
      });
    } else if (isEmployee) {
      // Direct to employee welcome path
      navigate("/employee-welcome", {
        state: {
          ...currentState,
          preventTutorial: true,
          fromMainMenu: true,
          returnToMain: true,
          previousPath: currentPath
        }
      });
    } else {
      // For non-assessment features
      navigate(finalPath, { 
        state: { 
          ...currentState,
          fromMainMenu: true,
          screenState: currentScreenState,
          preventTutorial: true,
          returnToMain: true,
          previousPath: currentPath
        } 
      });
    }
  };

  return { handleNavigate };
};
