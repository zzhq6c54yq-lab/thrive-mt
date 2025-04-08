
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

// Redesigned section headers with black to white gradient
const sectionHeaderClass = "bg-gradient-to-r from-[#E5C5A1] via-[#ffffff] to-[#B87333] bg-clip-text text-transparent font-semibold text-xl";
const sectionWrapperClass = "mb-8 overflow-hidden transition-all duration-700 transform hover:scale-[1.005] rounded-xl";
const sectionHeaderWrapperClass = "p-6 flex items-center justify-between cursor-pointer bg-gradient-to-r from-black/90 via-white/5 to-black/90 backdrop-blur-sm rounded-xl border border-white/5";

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
    <div className="container mx-auto px-6 pb-24 max-w-full lg:max-w-[1800px]">
      <div className="space-y-10">
        {/* Specialized Programs Section */}
        <div className={sectionWrapperClass}>
          <Collapsible 
            open={!sectionsCollapsed.programs}
            onOpenChange={() => toggleSection('programs')}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <div className={sectionHeaderWrapperClass}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#E5C5A1]/25 to-[#B87333]/15 shadow-inner border border-[#B87333]/30 rotate-12">
                    <Sparkles className="h-6 w-6 text-[#E5C5A1] -rotate-12" />
                  </div>
                  <span className={sectionHeaderClass}>Specialized Programs</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#c0c0c0]/40 group transition-all duration-500"
                >
                  {sectionsCollapsed.programs ? "Expand" : "Collapse"}
                  {sectionsCollapsed.programs ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-all" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-all" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm p-10 rounded-b-xl border-x border-b border-white/5 animate-in transition-all duration-700 ease-in-out">
              <SpecializedPrograms navigateToFeature={navigateToFeature} />
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Two column layout for appointments and wellness/gratitude */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-[#E5C5A1]/25 to-[#B87333]/15 shadow-inner border border-[#B87333]/30 -rotate-6">
                        <Calendar className="h-6 w-6 text-[#E5C5A1] rotate-6" />
                      </div>
                      <span className={sectionHeaderClass}>Schedule Center</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/5 border border-[#c0c0c0]/40 group transition-all duration-500"
                    >
                      {sectionsCollapsed.appointments ? "Expand" : "Collapse"}
                      {sectionsCollapsed.appointments ? 
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-all" /> : 
                        <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-all" />
                      }
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm p-10 rounded-b-xl border-x border-b border-white/5 animate-in transition-all duration-700 ease-in-out">
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
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-[#E5C5A1]/25 to-[#B87333]/15 shadow-inner border border-[#B87333]/30 rotate-6">
                        <Heart className="h-6 w-6 text-[#E5C5A1] -rotate-6" />
                      </div>
                      <span className={sectionHeaderClass}>Gratitude Visualizer</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/5 border border-[#c0c0c0]/40 group transition-all duration-500"
                    >
                      {sectionsCollapsed.gratitude ? "Expand" : "Collapse"}
                      {sectionsCollapsed.gratitude ? 
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-all" /> : 
                        <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-all" />
                      }
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm p-10 rounded-b-xl border-x border-b border-white/5 animate-in transition-all duration-700 ease-in-out">
                  <GratitudeVisualizer />
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Daily Wellness Challenges */}
            <div className={`${sectionWrapperClass} mt-10`}>
              <Collapsible 
                open={!sectionsCollapsed.wellness}
                onOpenChange={() => toggleSection('wellness')}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <div className={sectionHeaderWrapperClass}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gradient-to-br from-[#E5C5A1]/25 to-[#B87333]/15 shadow-inner border border-[#B87333]/30 -rotate-12">
                        <HeartPulse className="h-6 w-6 text-[#E5C5A1] rotate-12" />
                      </div>
                      <span className={sectionHeaderClass}>Wellness Center</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/5 border border-[#c0c0c0]/40 group transition-all duration-500"
                    >
                      {sectionsCollapsed.wellness ? "Expand" : "Collapse"}
                      {sectionsCollapsed.wellness ? 
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-all" /> : 
                        <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-all" />
                      }
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm p-10 rounded-b-xl border-x border-b border-white/5 animate-in transition-all duration-700 ease-in-out">
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
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#E5C5A1]/25 to-[#B87333]/15 shadow-inner border border-[#B87333]/30 rotate-3">
                    <Star className="h-6 w-6 text-[#E5C5A1] -rotate-3" />
                  </div>
                  <span className={sectionHeaderClass}>Monthly Featured Workshops</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#c0c0c0]/40 group transition-all duration-500"
                >
                  {sectionsCollapsed.workshops ? "Expand" : "Collapse"}
                  {sectionsCollapsed.workshops ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-all" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-all" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm p-10 rounded-b-xl border-x border-b border-white/5 animate-in transition-all duration-700 ease-in-out">
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
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#E5C5A1]/25 to-[#B87333]/15 shadow-inner border border-[#B87333]/30 -rotate-6">
                    <Brain className="h-6 w-6 text-[#E5C5A1] rotate-6" />
                  </div>
                  <span className={sectionHeaderClass}>Brain Games & Assessments</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#c0c0c0]/40 group transition-all duration-500"
                >
                  {sectionsCollapsed.brainGames ? "Expand" : "Collapse"}
                  {sectionsCollapsed.brainGames ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-all" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-all" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm p-10 rounded-b-xl border-x border-b border-white/5 animate-in transition-all duration-700 ease-in-out">
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
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#E5C5A1]/25 to-[#B87333]/15 shadow-inner border border-[#B87333]/30 rotate-12">
                    <Workflow className="h-6 w-6 text-[#E5C5A1] -rotate-12" />
                  </div>
                  <span className={sectionHeaderClass}>Key Features</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#c0c0c0]/40 group transition-all duration-500"
                >
                  {sectionsCollapsed.keyFeatures ? "Expand" : "Collapse"}
                  {sectionsCollapsed.keyFeatures ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-all" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-all" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm p-10 rounded-b-xl border-x border-b border-white/5 animate-in transition-all duration-700 ease-in-out">
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
