
import React from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms, { SpecializedProgramsProps } from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import { Brain, Sparkles, Calendar, HeartPulse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        {/* Specialized Programs - Now with visual separation */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-[#9b87f5]/30">
              <Sparkles className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7C3AED] border-b-2 border-[#9b87f5]/30 pb-1">
              Specialized Programs
            </span>
          </h2>
          <SpecializedPrograms navigateToFeature={navigateToFeature} />
        </div>
        
        {/* Two column layout for appointments and wellness/gratitude */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Upcoming Appointments */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-amber-100">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                Schedule Center
              </h2>
            </div>
            <UpcomingAppointments />
          </div>
          
          {/* Column 2-3: Wellness and Gratitude */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-emerald-100">
                <HeartPulse className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                Wellness Center
              </h2>
            </div>
            
            {/* Gratitude Visualizer in a slightly redesigned card */}
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 mb-6 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-800">Your Gratitude Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <GratitudeVisualizer />
              </CardContent>
            </Card>
            
            {/* Daily Wellness Challenges */}
            <DailyWellnessChallenges />
          </div>
        </div>
        
        {/* Featured Workshops */}
        <FeaturedWorkshops 
          navigate={navigate}
          onWorkshopClick={onWorkshopClick}
        />
        
        {/* Brain Games & Quizzes */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-[#9b87f5]/30">
              <Brain className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7C3AED] border-b-2 border-[#9b87f5]/30 pb-1">
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
