
import { useNavigate, useLocation } from "react-router-dom";

export const useFeatureNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    // Add directToAssessment flag for assessment-related features
    const isAssessmentRelated = 
      path === "/mental-wellness" || 
      path === "/games-and-quizzes" ||
      path.includes("assessment");
      
    // Get the current screen state for proper return navigation
    const currentState = location.state || {};
    const currentScreenState = currentState.screenState || 'main';
    
    // Store the current path to enable proper back navigation
    const currentPath = location.pathname;
    
    if (isAssessmentRelated) {
      navigate(path, {
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
    } else {
      // For non-assessment features
      navigate(path, { 
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
