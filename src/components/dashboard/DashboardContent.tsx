
import React, { useState } from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms, { SpecializedProgramsProps } from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import { Brain, Sparkles, Calendar, HeartPulse, ChevronDown, ChevronUp } from "lucide-react";
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
  // State for collapsible sections
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    workshops: false,
    programs: false,
    appointments: false,
    wellness: false,
    brainGames: false
  });

  const toggleSection = (section: keyof typeof sectionsCollapsed) => {
    setSectionsCollapsed(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Reusable section header component
  const SectionHeader = ({ 
    title, 
    icon, 
    color, 
    section 
  }: { 
    title: string, 
    icon: React.ReactNode, 
    color: string, 
    section: keyof typeof sectionsCollapsed 
  }) => (
    <div 
      className="flex items-center justify-between mb-4 cursor-pointer group"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-full ${color}`}>
          {icon}
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7C3AED] border-b-2 border-[#9b87f5]/30 pb-1">
          {title}
        </h2>
      </div>
      <div className="p-1 rounded-full bg-[#9b87f5]/10 text-[#9b87f5] transition-transform group-hover:bg-[#9b87f5]/20">
        {sectionsCollapsed[section] ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="space-y-8">
        {/* Specialized Programs - with collapsible functionality */}
        <div className="mt-8">
          <SectionHeader 
            title="Specialized Programs" 
            icon={<Sparkles className="h-5 w-5 text-[#9b87f5]" />} 
            color="bg-[#9b87f5]/30"
            section="programs"
          />
          
          {!sectionsCollapsed.programs && (
            <div className="animate-fade-in">
              <SpecializedPrograms navigateToFeature={navigateToFeature} />
            </div>
          )}
        </div>
        
        {/* Two column layout for appointments and wellness/gratitude */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Upcoming Appointments */}
          <div className="lg:col-span-1">
            <div 
              className="mb-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("appointments")}
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-amber-100">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                  Schedule Center
                </h2>
              </div>
              <div className="p-1 rounded-full bg-amber-100/50 text-amber-600 hover:bg-amber-100">
                {sectionsCollapsed.appointments ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </div>
            </div>
            
            {!sectionsCollapsed.appointments && (
              <div className="animate-fade-in">
                <UpcomingAppointments />
              </div>
            )}
          </div>
          
          {/* Column 2-3: Wellness and Gratitude */}
          <div className="lg:col-span-2">
            <div 
              className="mb-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("wellness")}
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-emerald-100">
                  <HeartPulse className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                  Wellness Center
                </h2>
              </div>
              <div className="p-1 rounded-full bg-emerald-100/50 text-emerald-600 hover:bg-emerald-100">
                {sectionsCollapsed.wellness ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </div>
            </div>
            
            {!sectionsCollapsed.wellness && (
              <div className="space-y-6 animate-fade-in">
                {/* Gratitude Visualizer in a slightly redesigned card */}
                <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 hover:shadow-md transition-all">
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
            )}
          </div>
        </div>
        
        {/* Featured Workshops - with collapsible functionality */}
        <div>
          <div 
            className="mb-4 flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("workshops")}
          >
            <h2 className="text-xl md:text-2xl font-bold">Monthly Featured Workshops</h2>
            <div className="p-1 rounded-full bg-[#3d3d5c]/10 text-gray-300 hover:bg-[#3d3d5c]/20">
              {sectionsCollapsed.workshops ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </div>
          </div>
          
          {!sectionsCollapsed.workshops && (
            <div className="animate-fade-in">
              <FeaturedWorkshops 
                navigate={navigate}
                onWorkshopClick={onWorkshopClick}
              />
            </div>
          )}
        </div>
        
        {/* Brain Games & Quizzes - with collapsible functionality */}
        <div>
          <SectionHeader 
            title="Brain Games & Assessments" 
            icon={<Brain className="h-5 w-5 text-[#9b87f5]" />} 
            color="bg-[#9b87f5]/30"
            section="brainGames"
          />
          
          {!sectionsCollapsed.brainGames && (
            <div className="animate-fade-in">
              <QuizzesSection />
            </div>
          )}
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
