
import React from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";

interface DashboardContentProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
  navigateToFeature: (path: string) => void;
  selectedQualities: string[];
  selectedGoals: string[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  navigate,
  onWorkshopClick,
  navigateToFeature,
  selectedQualities,
  selectedGoals
}) => {
  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="space-y-6">
        {/* Key Features */}
        <KeyFeatures 
          navigateToFeature={navigateToFeature}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
        />
        
        {/* Featured Workshops */}
        <FeaturedWorkshops 
          navigate={navigate}
          onWorkshopClick={onWorkshopClick}
        />
        
        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailyWellnessChallenges />
          <SpecializedPrograms navigateToFeature={navigateToFeature} />
        </div>
        
        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GratitudeVisualizer />
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
