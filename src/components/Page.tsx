
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import HomeButton from "./HomeButton";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  fullWidth?: boolean;
  returnToMain?: boolean;
}

const Page: React.FC<PageProps> = ({ 
  title, 
  children, 
  showBackButton = true,
  onBackClick,
  fullWidth = false,
  returnToMain = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (returnToMain) {
      // Return to main dashboard page
      navigate("/");
    } else {
      // Default behavior: go back to previous page
      navigate(-1);
    }
  };
  
  const handleHomeClick = () => {
    // Always navigate to main dashboard when home button is clicked
    // Use state to ensure we go directly to the main screen
    navigate("/", { state: { screenState: 'main' } });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-1 px-1 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className={`${fullWidth ? 'w-full max-w-none' : 'max-w-5xl mx-auto'} bg-white/5 backdrop-blur-md rounded-xl p-2 shadow-md relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {/* Title in Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-1">
          <div className="flex items-center gap-1">
            {showBackButton && (
              <Button
                variant="outline"
                size="sm"
                className="mr-2 bg-white/5 hover:bg-white/15 border-white/10 text-white/90 text-xs h-7"
                onClick={handleBackClick}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="mr-2 bg-white/5 hover:bg-white/15 border-white/10 text-white/90 text-xs h-7"
              onClick={handleHomeClick}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            <h1 className="text-lg md:text-xl font-light tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1] drop-shadow-sm">{title}</span>
            </h1>
          </div>
        </div>
        
        <div className="w-full">
          {children || (
            <div className="p-3 rounded-lg bg-white/5 text-center backdrop-blur-sm">
              <p className="text-sm text-gray-300">Coming soon! This feature is under development.</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center mt-2">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
            alt="Thrive MT Logo" 
            className="h-5 opacity-60 hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_0_3px_rgba(184,115,51,0.4)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
