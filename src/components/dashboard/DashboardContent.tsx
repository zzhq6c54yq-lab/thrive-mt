
import React, { useState } from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms, { SpecializedProgramsProps } from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import { NavigateFunction } from "react-router-dom";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import { Brain, Sparkles, Calendar, HeartPulse, ChevronDown, ChevronUp, Star, Workflow, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface DashboardContentProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
  navigateToFeature: (path: string) => void;
  selectedQualities: string[];
  selectedGoals: string[];
}

// Common styling for all section headers with improved gradients
const sectionHeaderClass = "bg-gradient-to-r from-violet-300 via-purple-200 to-white bg-clip-text text-transparent font-semibold text-lg";
const sectionWrapperClass = "mb-8 overflow-hidden";
const sectionHeaderWrapperClass = "p-4 flex items-center justify-between cursor-pointer bg-gradient-to-r from-purple-900/90 via-[#2d1a46] to-purple-900/90 backdrop-blur-sm rounded-t-xl";

const DashboardContent: React.FC<DashboardContentProps> = ({
  navigate,
  onWorkshopClick,
  navigateToFeature,
  selectedQualities,
  selectedGoals
}) => {
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    workshops: false,
    programs: false,
    appointments: false,
    wellness: false,
    gratitude: false,
    brainGames: false,
    keyFeatures: false
  });

  const toggleSection = (section: keyof typeof sectionsCollapsed) => {
    setSectionsCollapsed(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="container mx-auto px-4 pb-24 max-w-full">
      <div className="space-y-6">
        {/* Specialized Programs Section */}
        <div className={sectionWrapperClass}>
          <Collapsible 
            open={!sectionsCollapsed.programs}
            onOpenChange={() => toggleSection('programs')}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <div className={sectionHeaderWrapperClass}>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-[#9b87f5]/20">
                    <Sparkles className="h-5 w-5 text-[#9b87f5]" />
                  </div>
                  <span className={sectionHeaderClass}>Specialized Programs</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  {sectionsCollapsed.programs ? "Expand" : "Collapse"}
                  {sectionsCollapsed.programs ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-b-xl">
              <SpecializedPrograms navigateToFeature={navigateToFeature} />
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Two column layout for appointments and wellness/gratitude */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Upcoming Appointments */}
          <div className="lg:col-span-1">
            <div className={sectionWrapperClass}>
              <Collapsible 
                open={!sectionsCollapsed.appointments}
                onOpenChange={() => toggleSection('appointments')}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <div className={sectionHeaderWrapperClass}>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-amber-100">
                        <Calendar className="h-5 w-5 text-amber-600" />
                      </div>
                      <span className={sectionHeaderClass}>Schedule Center</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 border border-white/20"
                    >
                      {sectionsCollapsed.appointments ? "Expand" : "Collapse"}
                      {sectionsCollapsed.appointments ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-b-xl">
                  <UpcomingAppointments />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          
          {/* Column 2-3: Wellness and Gratitude */}
          <div className="lg:col-span-2">
            {/* Gratitude Visualizer */}
            <div className={sectionWrapperClass}>
              <Collapsible 
                open={!sectionsCollapsed.gratitude}
                onOpenChange={() => toggleSection('gratitude')}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <div className={sectionHeaderWrapperClass}>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-pink-100">
                        <Heart className="h-5 w-5 text-pink-500" />
                      </div>
                      <span className={sectionHeaderClass}>Gratitude Visualizer</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 border border-white/20"
                    >
                      {sectionsCollapsed.gratitude ? "Expand" : "Collapse"}
                      {sectionsCollapsed.gratitude ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-b-xl">
                  <GratitudeVisualizer />
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Daily Wellness Challenges */}
            <div className={`${sectionWrapperClass} mt-6`}>
              <Collapsible 
                open={!sectionsCollapsed.wellness}
                onOpenChange={() => toggleSection('wellness')}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <div className={sectionHeaderWrapperClass}>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-emerald-100">
                        <HeartPulse className="h-5 w-5 text-emerald-600" />
                      </div>
                      <span className={sectionHeaderClass}>Wellness Center</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 border border-white/20"
                    >
                      {sectionsCollapsed.wellness ? "Expand" : "Collapse"}
                      {sectionsCollapsed.wellness ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-b-xl">
                  <DailyWellnessChallenges />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
        
        {/* Featured Workshops Section */}
        <div className={sectionWrapperClass}>
          <Collapsible 
            open={!sectionsCollapsed.workshops}
            onOpenChange={() => toggleSection('workshops')}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <div className={sectionHeaderWrapperClass}>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gray-200">
                    <Star className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className={sectionHeaderClass}>Monthly Featured Workshops</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  {sectionsCollapsed.workshops ? "Expand" : "Collapse"}
                  {sectionsCollapsed.workshops ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-b-xl">
              <FeaturedWorkshops 
                navigate={navigate}
                onWorkshopClick={onWorkshopClick}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Brain Games & Quizzes Section */}
        <div className={sectionWrapperClass}>
          <Collapsible 
            open={!sectionsCollapsed.brainGames}
            onOpenChange={() => toggleSection('brainGames')}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <div className={sectionHeaderWrapperClass}>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-purple-100">
                    <Brain className="h-5 w-5 text-[#D946EF]" />
                  </div>
                  <span className={sectionHeaderClass}>Brain Games & Assessments</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  {sectionsCollapsed.brainGames ? "Expand" : "Collapse"}
                  {sectionsCollapsed.brainGames ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-b-xl">
              <QuizzesSection />
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Key Features Section */}
        <div className={sectionWrapperClass}>
          <Collapsible 
            open={!sectionsCollapsed.keyFeatures}
            onOpenChange={() => toggleSection('keyFeatures')}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <div className={sectionHeaderWrapperClass}>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-blue-100">
                    <Workflow className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className={sectionHeaderClass}>Key Features</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 border border-white/20"
                >
                  {sectionsCollapsed.keyFeatures ? "Expand" : "Collapse"}
                  {sectionsCollapsed.keyFeatures ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-b-xl">
              <KeyFeatures 
                navigateToFeature={navigateToFeature}
                selectedQualities={selectedQualities}
                selectedGoals={selectedGoals}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
