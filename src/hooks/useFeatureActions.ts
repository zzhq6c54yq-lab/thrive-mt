
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Type definitions for action buttons
export interface ActionButtonConfig {
  type: 'workshop' | 'assessment' | 'download' | 'practice' | 'discussion' | 
        'hangout' | 'join' | 'redeem' | 'record' | 'view' | 'other';
  id?: string;
  title: string;
  path?: string; // Optional path if navigating to a specific route
  action?: () => void; // Optional custom action function
  state?: Record<string, any>; // Add state type to pass to router
}

export const useFeatureActions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Helper function to detect if we're in a specialized portal
  const isInSpecializedPortal = () => {
    const path = location.pathname;
    return (
      path.includes("golden-years") || 
      path.includes("adolescent") ||
      path.includes("dod-portal") ||
      path.includes("college-portal") ||
      path.includes("small-business") ||
      path.includes("law-enforcement") ||
      path.includes("first-responders") ||
      path.includes("educators") ||
      path.includes("hospitality") ||
      path.includes("transport") ||
      path.includes("chronic-illness")
    );
  };
  
  // Get the base portal path for the current specialized portal
  const getPortalBasePath = () => {
    const path = location.pathname;
    
    if (path.includes("golden-years")) return "/app/golden-years-portal";
    if (path.includes("adolescent")) {
      // Get the selected age group to maintain it
      const ageGroup = location.state?.ageGroup || "adolescence";
      return "/app/adolescent-portal";
    }
    if (path.includes("dod")) return "/app/dod-portal";
    if (path.includes("college")) return "/app/college-portal";
    if (path.includes("small-business")) return "/app/small-business-portal";
    if (path.includes("law-enforcement")) return "/app/law-enforcement-portal";
    if (path.includes("first-responders")) return "/app/first-responders-portal";
    if (path.includes("educators")) return "/app/educators-portal";
    if (path.includes("hospitality")) return "/app/hospitality-portal";
    if (path.includes("transport")) return "/app/transport-portal";
    if (path.includes("chronic-illness")) return "/app/chronic-illness-portal";
    
    // Default to main app dashboard
    return "/app/dashboard";
  };

  // Generic function to handle action button clicks
  const handleActionClick = (config: ActionButtonConfig) => {
    const { type, id, title, path, action, state } = config;
    
    // Display toast notification for the action
    toast({
      title: `Starting ${title}`,
      description: `Loading ${type}...`,
      duration: 1500,
    });
    
    // If custom action is provided, execute it
    if (action) {
      action();
      return;
    }
    
    // Check if we're in a specialized portal
    const inPortal = isInSpecializedPortal();
    const portalPath = getPortalBasePath();
    const portalPrefix = portalPath.replace('/', '').replace('-portal', '');
    
    // Important fix: Always maintain portal context
    const stateParams = {
      ...(inPortal ? {
        ...location.state,
        stayInPortal: true,
        preventTutorial: true,
        portalPath,
        fromPortal: true,
        portalType: portalPath.replace('/', '').replace('-portal', '')
      } : {
        preventTutorial: true,
        fromFeature: location.pathname,
        returnToFeature: true
      }),
      // Merge any custom state that was passed
      ...(state || {})
    };
    
    // If path is provided directly, use it instead of constructing from type
    let navigationPath = path;

    // Handle navigation based on action type if no specific path provided
    if (!navigationPath) {
      switch (type) {
        case 'workshop':
          // Navigate to specific workshop - keep in portal context if needed
          navigationPath = inPortal ? `/${portalPrefix}-workshops/${id || ''}` : `/app/workshop/${id}`;
          break;
          
        case 'assessment':
          // Navigate directly to assessment - keep in portal context if needed
          navigationPath = inPortal ? `/${portalPrefix}-assessments/${id || ''}` : `/app/mental-wellness/assessments/${id || ''}`;
          break;
          
        case 'practice':
          // Navigate to guided practice
          navigationPath = inPortal ? `/${portalPrefix}-practice/${id || ''}` : `/app/guided-practice/${id || ''}`;
          break;
          
        case 'discussion':
          // Navigate to community discussions - keep in portal context if needed
          navigationPath = inPortal ? `/${portalPrefix}-community` : `/app/community-support`;
          break;
          
        case 'join':
          // Join virtual meeting or group - keep in portal context if needed
          navigationPath = inPortal ? `/${portalPrefix}-meetings` : `/app/virtual-meetings`;
          break;
          
        case 'redeem':
          // Navigate to redemption page
          navigationPath = `/app/copay-credits`;
          break;
          
        case 'record':
          // For video diary recording
          navigationPath = `/app/video-diary/record`;
          break;
      }
    }
    
    // Special state parameters for assessments
    if (type === 'assessment') {
      stateParams.startAssessment = true;
      stateParams.directToAssessment = true;
      stateParams.assessmentTitle = title;
    }
    
    // Special state parameters for practice
    if (type === 'practice') {
      stateParams.practiceTitle = title;
    }
    
    // If we have a path to navigate to, go there
    if (navigationPath) {
      navigate(navigationPath, { state: stateParams });
    } else {
      // Handle other action types that don't require navigation
      switch (type) {
        case 'download':
          // Simulate download (in a real app, this would trigger actual download)
          setTimeout(() => {
            toast({
              title: "Download Complete",
              description: `${title} has been downloaded successfully.`,
              duration: 3000,
            });
          }, 1500);
          break;
          
        default:
          console.warn("No path or action provided for this button type:", type);
      }
    }
  };
  
  // Function for standardized back button navigation
  const handleBackNavigation = () => {
    const currentPath = location.pathname;
    const state = location.state as any;
    
    // Special handling for specialized portals
    if (isInSpecializedPortal()) {
      const portalPath = getPortalBasePath();
      
      navigate(portalPath, {
        state: {
          stayInPortal: true,
          fromFeature: currentPath,
          preventTutorial: true
        }
      });
      return;
    }
    
    // Check if we should stay in a portal context
    if (state?.stayInPortal && state?.returnToPortal) {
      navigate(state.returnToPortal, {
        state: {
          stayInPortal: true,
          fromFeature: currentPath,
          preventTutorial: true
        }
      });
      return;
    }
    
    // Always return to main dashboard, never to intro screen
    localStorage.setItem('hasCompletedOnboarding', 'true');
    navigate('/app/dashboard', { 
      state: { 
        screenState: 'main',
        returnToMain: true,
        fromPath: currentPath,
        preserveState: true,
        preventIntroRedirect: true,
        preventTutorial: true
      } 
    });
  };

  return { handleActionClick, handleBackNavigation };
};

export default useFeatureActions;
