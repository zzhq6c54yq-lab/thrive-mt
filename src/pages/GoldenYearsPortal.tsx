
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavigationBar from "@/components/navigation/NavigationBar";
import PortalHeader from "@/components/golden-years/PortalHeader";
import FeaturedContent from "@/components/golden-years/FeaturedContent";
import ResourcesSection from "@/components/golden-years/ResourcesSection";
import CalendarSection from "@/components/golden-years/CalendarSection";
import SupportResources from "@/components/golden-years/SupportResources";
import useTranslation from "@/hooks/useTranslation";
import useFeatureActions from "@/hooks/useFeatureActions";

const GoldenYearsPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { getTranslatedText } = useTranslation();
  const { handleActionClick } = useFeatureActions();
  
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

    // Show a toast notification about the feature
    toast({
      title: `${getTranslatedText('accessing')} ${feature}`,
      description: getTranslatedText('loadingContent'),
      duration: 2000
    });

    // Navigate to the appropriate path with correct state
    navigate(featurePaths[feature] || `/golden-years-${feature.toLowerCase().replace(/\s+/g, '-')}`, {
      state: { 
        stayInPortal: true,
        preventTutorial: true,
        portalPath: '/golden-years-portal',
        featureName: feature
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242424] via-[#2A2420] to-[#362F2A] text-white relative">
      {/* Classic background with subtle texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zm-16 4h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm-16 4h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z%22 fill=%22%23C8C8C9%22 fill-opacity=%220.05%22/></svg>')] opacity-20 z-0"></div>
      
      {/* Elegant metallic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 z-0"></div>
      
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10%] w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-[shimmer_12s_ease-in-out_infinite] opacity-20"></div>
      </div>
      
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
        
        {/* Featured Content - Legacy Journal with enhanced visibility */}
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
