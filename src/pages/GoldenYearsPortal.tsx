
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/navigation/NavigationBar";
import useFeatureActions, { ActionButtonConfig } from "@/hooks/useFeatureActions";
import PortalHeader from "@/components/golden-years/PortalHeader";
import FeaturedContent from "@/components/golden-years/FeaturedContent";
import ResourcesSection from "@/components/golden-years/ResourcesSection";
import CalendarSection from "@/components/golden-years/CalendarSection";
import SupportResources from "@/components/golden-years/SupportResources";
import useTranslation from "@/hooks/useTranslation";

const GoldenYearsPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { handleActionClick } = useFeatureActions();
  const { getTranslatedText } = useTranslation();
  
  const handleFeatureClick = (feature: string) => {
    // Map of features to their respective paths
    const featurePaths: Record<string, string> = {
      "Legacy Journal": "/golden-years-journal",
      "Legacy Journal Guide": "/golden-years-guide",
      "Memory & Cognitive Health": "/golden-years-memory",
      "End of Life Planning": "/golden-years-planning",
      "Life Transitions": "/golden-years-transitions",
      "Community Connections": "/golden-years-community",
      "Family Connection Tools": "/golden-years-family",
      "Wellness Resources": "/golden-years-wellness",
      "Calendar": "/golden-years-calendar"
    };

    // Default path if not found in the map
    const path = featurePaths[feature] || `/golden-years-${feature.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Show a toast notification about the feature
    toast({
      title: `${getTranslatedText('accessing')} ${feature}`,
      description: getTranslatedText('loadingContent'),
      duration: 2000
    });

    // Navigate to the appropriate path with correct state
    navigate(path, {
      state: { 
        stayInPortal: true,
        preventTutorial: true,
        portalPath: '/golden-years-portal',
        featureName: feature
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B6F1D] via-[#B89237] to-[#DAB258] text-white relative">
      {/* Enhanced metallic gold background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700/20 via-amber-500/10 to-amber-800/20 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      {/* Navigation bar */}
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title={getTranslatedText('goldenTitle')}
        portalMode={true}
        portalPath="/golden-years-welcome"
      />
      
      <div className="container mx-auto px-4 py-8 pt-16 relative z-10">
        <PortalHeader 
          title={getTranslatedText('goldenYearsWelcome')}
          subtitle={getTranslatedText('goldenYearsSubtitle')}
        />
        
        {/* Featured Content - Legacy Journal */}
        <FeaturedContent onFeatureClick={handleFeatureClick} />
        
        {/* Main Resources */}
        <ResourcesSection onResourceClick={handleFeatureClick} />
        
        {/* Calendar/Upcoming Events */}
        <CalendarSection 
          onEventClick={handleFeatureClick}
          onViewAllClick={() => handleFeatureClick("Calendar")} 
        />
        
        {/* Support Resources */}
        <SupportResources onResourceClick={handleFeatureClick} />
      </div>
    </div>
  );
};

export default GoldenYearsPortal;
