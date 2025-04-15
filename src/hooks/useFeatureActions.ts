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
      path.includes("small-business")
    );
  };
  
  // Get the base portal path for the current specialized portal
  const getPortalBasePath = () => {
    const path = location.pathname;
    
    if (path.includes("golden-years")) return "/golden-years-portal";
    if (path.includes("adolescent")) {
      // Get the selected age group to maintain it
      const ageGroup = location.state?.ageGroup || "adolescence";
      return "/adolescent-portal";
    }
    if (path.includes("dod")) return "/dod-portal";
    if (path.includes("college")) return "/college-portal";
    if (path.includes("small-business")) return "/small-business-portal";
    
    // Default to main app
    return "/";
  };

  // Generic function to handle action button clicks
  const handleActionClick = (config: ActionButtonConfig) => {
    const { type, id, title, path, action } = config;
    
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
    
    // Important fix: Always maintain portal context
    const stateParams = inPortal ? 
      { 
        ...location.state,
        stayInPortal: true,
        preventTutorial: true,
        portalPath,
        fromPortal: true, // Add flag to indicate we're coming from a portal
        portalType: portalPath.replace('/', '').replace('-portal', '') // Store portal type (e.g. "golden-years")
      } : 
      {
        preventTutorial: true,
        fromFeature: location.pathname,
        returnToFeature: true
      };
    
    // If we're in a portal and the path doesn't specify a full path (doesn't start with '/')
    // Prepend the portal prefix to the path to keep navigation within the portal context
    let navigationPath = path;
    if (inPortal && path && !path.startsWith('/')) {
      // Extract the portal prefix (e.g., "golden-years" from "/golden-years-portal")
      const portalPrefix = portalPath.replace('/','').replace('-portal','');
      navigationPath = `/${portalPrefix}-${path}`;
    }
    // If it's a full path but we want to stay in portal, keep as is
    else if (inPortal && path) {
      navigationPath = path;
    }
    
    // Handle navigation based on action type
    switch (type) {
      case 'workshop':
        // Navigate to specific workshop - keep in portal context if needed
        const workshopPath = inPortal ? `/${portalPath.split('/')[1]}-workshops/${id || ''}` : `/workshop/${id}`;
        navigate(workshopPath, { state: stateParams });
        break;
        
      case 'assessment':
        // Navigate directly to assessment - keep in portal context if needed
        const assessmentPath = inPortal ? `/${portalPath.split('/')[1]}-assessments/${id || ''}` : `/mental-wellness/assessments/${id || ''}`;
        navigate(assessmentPath, {
          state: {
            ...stateParams,
            startAssessment: true,
            directToAssessment: true,
            assessmentTitle: title
          }
        });
        break;
        
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
        
      case 'practice':
        // Navigate to guided practice
        const practicePath = inPortal ? `/${portalPath.split('/')[1]}-practice/${id || ''}` : `/guided-practice/${id || ''}`;
        navigate(practicePath, {
          state: {
            ...stateParams,
            practiceTitle: title
          }
        });
        break;
        
      case 'discussion':
        // Navigate to community discussions - keep in portal context if needed
        const discussionPath = inPortal ? `/${portalPath.split('/')[1]}-community` : `/community-support`;
        navigate(discussionPath, {
          state: {
            ...stateParams,
            activeTab: "discussions",
            discussionTopic: title
          }
        });
        break;
        
      case 'join':
        // Join virtual meeting or group - keep in portal context if needed
        const meetingPath = inPortal ? `/${portalPath.split('/')[1]}-meetings` : `/virtual-meetings`;
        navigate(meetingPath, {
          state: {
            ...stateParams,
            meetingTitle: title,
            autoJoin: true
          }
        });
        break;
        
      case 'redeem':
        // Navigate to redemption page
        navigate(`/copay-credits`, {
          state: {
            ...stateParams,
            redeemAction: title
          }
        });
        break;
        
      case 'record':
        // For video diary recording
        navigate(`/video-diary/record`, {
          state: {
            ...stateParams,
            recordingType: title
          }
        });
        break;
        
      default:
        // Default case: navigate to specified path or do nothing
        if (navigationPath) {
          navigate(navigationPath, { state: stateParams });
        } else {
          console.warn("No path or action provided for this button");
        }
    }
  };
  
  // Function for standardized back button navigation
  const handleBackNavigation = () => {
    const { state } = location;
    
    // Check if we're in a specialized portal
    const inPortal = isInSpecializedPortal();
    const portalPath = getPortalBasePath();
    
    // If we're in a portal and have stayInPortal flag, navigate within the portal
    if (inPortal && state && state.stayInPortal) {
      // If we have a specific portal path to return to
      if (state.portalPath) {
        navigate(state.portalPath, {
          state: {
            ...state,
            stayInPortal: true,
            preventTutorial: true
          }
        });
      }
      // Otherwise go to the default portal path
      else {
        navigate(portalPath, {
          state: {
            ...state,
            stayInPortal: true,
            preventTutorial: true
          }
        });
      }
    }
    // If we have fromFeature in state, navigate back to that feature
    else if (state && state.fromFeature) {
      navigate(state.fromFeature, {
        state: {
          ...state,
          preventTutorial: true,
          returnToFeature: false
        }
      });
    } else if (state && state.returnToPortal) {
      // If returnToPortal is specified, return to that portal
      navigate(state.returnToPortal, {
        state: {
          ...state,
          preventTutorial: true,
          stayInPortal: true
        }
      });
    } else if (state && state.returnToMain) {
      // If returnToMain is true, return to main dashboard
      navigate("/", {
        state: {
          ...state,
          preventTutorial: true,
          screenState: 'main'
        }
      });
    } else {
      // Otherwise, just go back one step in history
      navigate(-1);
    }
  };

  return { handleActionClick, handleBackNavigation };
};

export default useFeatureActions;
