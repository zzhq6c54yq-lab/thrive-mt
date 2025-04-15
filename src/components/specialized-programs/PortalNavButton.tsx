import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PortalNavButtonProps {
  className?: string;
  path: string;
  children: React.ReactNode;
  portalType?: string; // Optional portal type identifier
}

const PortalNavButton: React.FC<PortalNavButtonProps> = ({ 
  className = "", 
  path,
  children,
  portalType
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const handleNavigation = () => {
    toast({
      title: "Navigating",
      description: "Taking you to the selected page",
      duration: 1500,
    });
    
    // Detect if we're in a specific portal context
    const currentPath = location.pathname;
    const inPortal = currentPath.includes('portal') || 
                    currentPath.includes('golden-years') || 
                    currentPath.includes('adolescent') ||
                    currentPath.includes('dod') ||
                    currentPath.includes('college');
    
    // Determine portal type from current path or props
    let currentPortalType = portalType;
    if (!currentPortalType) {
      if (currentPath.includes('golden-years')) currentPortalType = 'golden-years';
      else if (currentPath.includes('adolescent')) currentPortalType = 'adolescent';
      else if (currentPath.includes('dod')) currentPortalType = 'dod';
      else if (currentPath.includes('college')) currentPortalType = 'college';
      else if (currentPath.includes('small-business')) currentPortalType = 'small-business';
    }
    
    // If we have a portal type and the path doesn't start with '/', 
    // prepend the portal type to keep within portal context
    let navigationPath = path;
    if (inPortal && currentPortalType && !path.startsWith('/')) {
      navigationPath = `/${currentPortalType}-${path}`;
    }
    
    navigate(navigationPath, { 
      state: { 
        stayInPortal: inPortal,
        preventTutorial: true,
        portalType: currentPortalType,
        portalPath: inPortal ? `/${currentPortalType}-portal` : undefined
      } 
    });
  };
  
  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleNavigation}
    >
      {children}
    </Button>
  );
};

export default PortalNavButton;
