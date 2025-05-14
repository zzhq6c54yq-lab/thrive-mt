
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface EscapeHatchManagerProps {
  screenState: string;
  setScreenState: (state: any) => void;
}

// This component provides an escape hatch for users who might get stuck
// in the onboarding flow due to bugs, errors, or other issues
const EscapeHatchManager: React.FC<EscapeHatchManagerProps> = ({
  screenState,
  setScreenState
}) => {
  const [showEscapeHatch, setShowEscapeHatch] = useState(false);
  
  // Monitor for potential stuck states
  useEffect(() => {
    let escapeHatchTimeout: ReturnType<typeof setTimeout>;
    
    // If the user has been on the same screen for over 60 seconds, show escape hatch
    if (screenState !== 'main') {
      escapeHatchTimeout = setTimeout(() => {
        setShowEscapeHatch(true);
        
        toast({
          title: "Need help?",
          description: "It looks like you might be stuck. Do you want to skip to the main dashboard?",
          duration: 10000,
          action: {
            label: "Skip to Dashboard",
            onClick: () => setScreenState('main'),
            altText: "Skip to main dashboard",
          },
        });
      }, 60000); // 60 second timeout
    }
    
    return () => {
      clearTimeout(escapeHatchTimeout);
    };
  }, [screenState, setScreenState]);

  // This component doesn't render anything visible
  // It just sets up the timeout to show the toast
  return null;
};

export default EscapeHatchManager;
