
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

// Common styling for all section headers with improved gold gradients
const sectionHeaderClass = "bg-gradient-to-r from-[#B87333] to-[#E5C5A1] bg-clip-text text-transparent font-semibold text-lg";
const sectionWrapperClass = "mb-8 overflow-hidden transition-all duration-300 transform hover:scale-[1.005] hover:shadow-lg rounded-xl";
const sectionHeaderWrapperClass = "p-5 flex items-center justify-between cursor-pointer bg-gradient-to-r from-[#1a0d29]/90 via-[#2d1a46]/90 to-[#1a0d29]/90 backdrop-blur-sm rounded-xl border border-[#B87333]/20";

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
    <div className="container mx-auto px-6 pb-24 max-w-7xl">
      <div className="space-y-8">
        {/* Specialized Programs Section */}
        <div className={sectionWrapperClass}>
          <Collapsible 
            open={!sectionsCollapsed.programs}
            onOpenChange={() => toggleSection('programs')}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <div className={sectionHeaderWrapperClass}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 shadow-inner border border-[#B87333]/20">
                    <Sparkles className="h-5 w-5 text-[#B87333]" />
                  </div>
                  <span className={sectionHeaderClass}>Specialized Programs</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#B87333]/30 group"
                >
                  {sectionsCollapsed.programs ? "Expand" : "Collapse"}
                  {sectionsCollapsed.programs ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-[#1a0d29]/50 backdrop-blur-sm p-8 rounded-b-xl border-x border-b border-[#B87333]/20 animate-in transition-all duration-300">
              <SpecializedPrograms navigateToFeature={navigateToFeature} />
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Two column layout for appointments and wellness/gratitude */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 shadow-inner border border-[#B87333]/20">
                        <Calendar className="h-5 w-5 text-[#B87333]" />
                      </div>
                      <span className={sectionHeaderClass}>Schedule Center</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/5 border border-[#B87333]/30 group"
                    >
                      {sectionsCollapsed.appointments ? "Expand" : "Collapse"}
                      {sectionsCollapsed.appointments ? 
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> : 
                        <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                      }
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-[#1a0d29]/50 backdrop-blur-sm p-8 rounded-b-xl border-x border-b border-[#B87333]/20 animate-in transition-all duration-300">
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
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 shadow-inner border border-[#B87333]/20">
                        <Heart className="h-5 w-5 text-[#B87333]" />
                      </div>
                      <span className={sectionHeaderClass}>Gratitude Visualizer</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/5 border border-[#B87333]/30 group"
                    >
                      {sectionsCollapsed.gratitude ? "Expand" : "Collapse"}
                      {sectionsCollapsed.gratitude ? 
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> : 
                        <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                      }
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-[#1a0d29]/50 backdrop-blur-sm p-8 rounded-b-xl border-x border-b border-[#B87333]/20 animate-in transition-all duration-300">
                  <GratitudeVisualizer />
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Daily Wellness Challenges */}
            <div className={`${sectionWrapperClass} mt-8`}>
              <Collapsible 
                open={!sectionsCollapsed.wellness}
                onOpenChange={() => toggleSection('wellness')}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <div className={sectionHeaderWrapperClass}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 shadow-inner border border-[#B87333]/20">
                        <HeartPulse className="h-5 w-5 text-[#B87333]" />
                      </div>
                      <span className={sectionHeaderClass}>Wellness Center</span>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/5 border border-[#B87333]/30 group"
                    >
                      {sectionsCollapsed.wellness ? "Expand" : "Collapse"}
                      {sectionsCollapsed.wellness ? 
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> : 
                        <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                      }
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-[#1a0d29]/50 backdrop-blur-sm p-8 rounded-b-xl border-x border-b border-[#B87333]/20 animate-in transition-all duration-300">
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
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 shadow-inner border border-[#B87333]/20">
                    <Star className="h-5 w-5 text-[#B87333]" />
                  </div>
                  <span className={sectionHeaderClass}>Monthly Featured Workshops</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#B87333]/30 group"
                >
                  {sectionsCollapsed.workshops ? "Expand" : "Collapse"}
                  {sectionsCollapsed.workshops ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-[#1a0d29]/50 backdrop-blur-sm p-8 rounded-b-xl border-x border-b border-[#B87333]/20 animate-in transition-all duration-300">
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
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 shadow-inner border border-[#B87333]/20">
                    <Brain className="h-5 w-5 text-[#B87333]" />
                  </div>
                  <span className={sectionHeaderClass}>Brain Games & Assessments</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#B87333]/30 group"
                >
                  {sectionsCollapsed.brainGames ? "Expand" : "Collapse"}
                  {sectionsCollapsed.brainGames ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-[#1a0d29]/50 backdrop-blur-sm p-8 rounded-b-xl border-x border-b border-[#B87333]/20 animate-in transition-all duration-300">
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
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 shadow-inner border border-[#B87333]/20">
                    <Workflow className="h-5 w-5 text-[#B87333]" />
                  </div>
                  <span className={sectionHeaderClass}>Key Features</span>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/5 border border-[#B87333]/30 group"
                >
                  {sectionsCollapsed.keyFeatures ? "Expand" : "Collapse"}
                  {sectionsCollapsed.keyFeatures ? 
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /> : 
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                  }
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-[#1a0d29]/50 backdrop-blur-sm p-8 rounded-b-xl border-x border-b border-[#B87333]/20 animate-in transition-all duration-300">
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
