
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TutorialButton from "./tutorials/TutorialButton";
import ThriveButton from "./ThriveButton";
import useTranslation from "@/hooks/useTranslation";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  fullWidth?: boolean;
  returnToMain?: boolean;
  featureId?: string;
}

const Page: React.FC<PageProps> = ({ 
  title, 
  children, 
  showBackButton = true,
  onBackClick,
  fullWidth = false,
  returnToMain = false,
  featureId
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSpanish, getTranslatedText } = useTranslation();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Listen for language changes to trigger re-render
    const handleLanguageChange = () => {
      // Force component to re-render
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  // Force update state to re-render when language changes
  const [forceUpdate, setForceUpdate] = useState(0);
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (location.state?.previousPath) {
      navigate(location.state.previousPath);
    } else {
      // Always navigate to main dashboard for key features
      navigate('/app/dashboard');
    }
  };
  
  // Determine if this is one of the excluded pages
  const isExcludedPage = 
    location.pathname === "/" && 
    (location.state?.screenState === 'intro' || 
     location.state?.screenState === 'mood' ||
     location.state?.screenState === 'register' ||
     location.state?.screenState === 'subscription' ||
     location.state?.screenState === 'visionBoard' ||
     location.state?.screenState === 'main');

  // Determine if this is the main dashboard page
  const isMainDashboard = location.pathname === "/" && 
    location.state && location.state.screenState === 'main';

  // Translation function for back button
  const getTranslation = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'back': {
        'English': 'Back',
        'Español': 'Atrás'
      },
      'comingSoon': {
        'English': 'Coming soon! This feature is under development.',
        'Español': '¡Próximamente! Esta función está en desarrollo.'
      }
    };
    
    return isSpanish ? translations[key]['Español'] : translations[key]['English'];
  };

  // Determine the feature ID based on the current path if not provided
  const currentFeatureId = featureId || location.pathname.split('/')[1] || 'dashboard';
  
  // Determine whether to show the THRIVE button
  const shouldShowThriveButton = !isExcludedPage;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-1 px-1 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className={`${fullWidth ? 'w-full max-w-none' : 'max-w-5xl mx-auto'} bg-white/5 backdrop-blur-md rounded-xl p-2 shadow-md relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        {/* Title in Header with navigation controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-1">
          <div className="flex items-center gap-1">
            {/* Standard back button in top left */}
            {showBackButton && (
              <Button
                variant="outline"
                size="sm"
                className="mr-2 bg-white/5 hover:bg-white/15 border-white/10 text-white/90 text-xs h-7 p-1"
                onClick={handleBackClick}
                title={getTranslation('back')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            
            <h1 className="text-lg md:text-xl font-light tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#ffffff] to-[#ffffff] drop-shadow-sm">{title}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Add THRIVE button if appropriate */}
            {shouldShowThriveButton && <ThriveButton />}
            
            {/* Add tutorial button if featureId is provided */}
            {currentFeatureId && (
              <TutorialButton featureId={currentFeatureId} />
            )}
          </div>
        </div>
        
        <div className="w-full">
          {children || (
            <div className="p-3 rounded-lg bg-white/5 text-center backdrop-blur-sm">
              <p className="text-sm text-gray-300">
                {getTranslation('comingSoon')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
