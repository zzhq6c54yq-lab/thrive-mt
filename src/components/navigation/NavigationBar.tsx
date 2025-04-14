
import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ThriveButton from "@/components/navigation/ThriveButton";
import PortalBackButton from "@/components/navigation/PortalBackButton";

interface NavigationBarProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showThriveButton?: boolean;
  title?: string;
  portalMode?: boolean;
  portalPath?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  showBackButton = true,
  showHomeButton = true,
  showThriveButton = true,
  title,
  portalMode = false,
  portalPath
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleHome = () => {
    toast({
      title: "Returning Home",
      description: "Taking you to the home page",
      duration: 1500,
    });
    
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        {showBackButton && <PortalBackButton returnPath={portalPath} />}
        {showHomeButton && (
          <Button
            variant="outline"
            size="sm"
            className="bg-white/5 hover:bg-white/15 border-white/10 text-white/90"
            onClick={handleHome}
          >
            <Home className="h-4 w-4" />
          </Button>
        )}
        {title && <h1 className="text-lg font-medium text-white ml-2">{title}</h1>}
      </div>
      
      <div>
        {showThriveButton && <ThriveButton size="sm" />}
      </div>
    </div>
  );
};

export default NavigationBar;
