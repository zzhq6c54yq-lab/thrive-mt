
import React from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms, { SpecializedProgramsProps } from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import { Brain } from "lucide-react";

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
        
        {/* Brain Games & Quizzes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-[#9b87f5]/30">
              <Brain className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7C3AED]">
              Brain Games & Assessments
            </span>
          </h2>
          <QuizzesSection />
        </div>
        
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
