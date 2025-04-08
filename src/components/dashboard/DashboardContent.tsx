
import React from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms, { SpecializedProgramsProps } from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import { Brain, Trophy, Sparkles } from "lucide-react";

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
      <div className="space-y-8">
        {/* Specialized Programs - Now first under New Features banner */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3 pl-2">
            <div className="p-2 rounded-full bg-[#F6D9A7]/60 shadow-lg">
              <Sparkles className="h-6 w-6 text-[#B87333]" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1] via-[#B87333] to-[#E5C5A1] border-b-2 border-[#F6D9A7]/60 pb-1">
              Specialized Programs
            </span>
          </h2>
          <SpecializedPrograms navigateToFeature={navigateToFeature} />
        </div>
        
        {/* Gratitude Visualizer */}
        <GratitudeVisualizer />
        
        {/* Upcoming Appointments */}
        <UpcomingAppointments />
        
        {/* Daily Wellness Challenges - Updated colors */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3 pl-2">
            <div className="p-2 rounded-full bg-[#F6D9A7]/60 shadow-lg">
              <Trophy className="h-6 w-6 text-[#B87333]" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] border-b-2 border-[#F6D9A7]/60 pb-1">
              Daily Wellness Challenges
            </span>
          </h2>
          <DailyWellnessChallenges />
        </div>
        
        {/* Featured Workshops */}
        <FeaturedWorkshops 
          navigate={navigate}
          onWorkshopClick={onWorkshopClick}
        />
        
        {/* Brain Games & Quizzes */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3 pl-2">
            <div className="p-2 rounded-full bg-[#F6D9A7]/60 shadow-lg">
              <Brain className="h-6 w-6 text-[#B87333]" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] border-b-2 border-[#F6D9A7]/60 pb-1">
              Brain Games & Assessments
            </span>
          </h2>
          <QuizzesSection />
        </div>
        
        {/* Key Features - moved to the last section */}
        <KeyFeatures 
          navigateToFeature={navigateToFeature}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
