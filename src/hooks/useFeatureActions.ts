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
    
    // Handle navigation based on action type
    switch (type) {
      case 'workshop':
        // Navigate to specific workshop
        navigate(`/workshop/${id}`, { 
          state: { 
            preventTutorial: true,
            activeTab: "workshop",
            workshopTitle: title,
            fromFeature: location.pathname,
            returnToFeature: true
          } 
        });
        break;
        
      case 'assessment':
        // Navigate directly to assessment
        navigate(`/mental-wellness/assessments/${id || ''}`, {
          state: {
            preventTutorial: true,
            startAssessment: true,
            directToAssessment: true,
            assessmentTitle: title,
            fromFeature: location.pathname,
            returnToFeature: true
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
        navigate(`/guided-practice/${id || ''}`, {
          state: {
            preventTutorial: true,
            practiceTitle: title,
            fromFeature: location.pathname,
            returnToFeature: true
          }
        });
        break;
        
      case 'discussion':
        // Navigate to community discussions
        navigate(`/community-support`, {
          state: {
            preventTutorial: true,
            activeTab: "discussions",
            discussionTopic: title,
            fromFeature: location.pathname,
            returnToFeature: true
          }
        });
        break;
        
      case 'join':
        // Join virtual meeting or group
        navigate(`/virtual-meetings`, {
          state: {
            preventTutorial: true,
            meetingTitle: title,
            autoJoin: true,
            fromFeature: location.pathname,
            returnToFeature: true
          }
        });
        break;
        
      case 'redeem':
        // Navigate to redemption page
        navigate(`/copay-credits`, {
          state: {
            preventTutorial: true,
            redeemAction: title,
            fromFeature: location.pathname,
            returnToFeature: true
          }
        });
        break;
        
      case 'record':
        // For video diary recording
        navigate(`/video-diary/record`, {
          state: {
            preventTutorial: true,
            recordingType: title,
            fromFeature: location.pathname,
            returnToFeature: true
          }
        });
        break;
        
      default:
        // Default case: navigate to specified path or do nothing
        if (path) {
          navigate(path, {
            state: {
              preventTutorial: true,
              title,
              fromFeature: location.pathname,
              returnToFeature: true
            }
          });
        } else {
          console.warn("No path or action provided for this button");
        }
    }
  };
  
  // Function for standardized back button navigation
  const handleBackNavigation = () => {
    const { state } = location;
    
    // If we have fromFeature in state, navigate back to that feature
    if (state && state.fromFeature) {
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
          preventTutorial: true
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
