
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

const GoldenYearsPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { handleActionClick } = useFeatureActions();
  
  const handleFeatureClick = (feature: string) => {
    // If it's the Legacy Journal, navigate directly to the journal page
    if (feature === "Legacy Journal") {
      navigate("/golden-years-journal", {
        state: { 
          stayInPortal: true,
          preventTutorial: true,
          portalPath: '/golden-years-portal'
        }
      });
      return;
    }
    
    // For other features, use the ActionConfig with proper configuration
    const actionConfig: ActionButtonConfig = {
      type: 'other',
      title: feature,
      path: `golden-${feature.toLowerCase().replace(/\s+/g, '-')}` // This creates paths like "golden-wellness-resources"
    };

    // Show a toast notification about the feature
    toast({
      title: `Accessing ${feature}`,
      description: "Loading your specialized content...",
      duration: 2000
    });
    
    // Use handleActionClick from useFeatureActions for consistent navigation behavior
    handleActionClick(actionConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B6F1D] via-[#B89237] to-[#DAB258] text-white">
      {/* Navigation bar */}
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title="Golden Years Journey"
        portalMode={true}
        portalPath="/golden-years-welcome"
      />
      
      <div className="container mx-auto px-4 py-8 pt-16">
        <PortalHeader 
          title="Welcome to Your Golden Years Journey"
          subtitle="Explore resources designed to enhance your wellbeing, connect with others, and embrace this meaningful time of life."
        />
        
        {/* Featured Content */}
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
