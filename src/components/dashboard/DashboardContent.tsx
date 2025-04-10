
import React, { useState } from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import InsightsSection from "@/components/dashboard/InsightsSection";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import { NavigateFunction } from "react-router-dom";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar, HelpCircle, ChevronUp, ChevronDown, Sparkles, Award, Users, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface DashboardContentProps {
  navigate: NavigateFunction;
  onWorkshopClick: (workshopId: string, workshopTitle: string) => void;
  navigateToFeature?: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
  navigate, 
  onWorkshopClick,
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = []
}) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  const { toast } = useToast();
  
  // Translations
  const translations = {
    dailyChallenges: isSpanish ? "Desafíos Diarios" : "Daily Challenges",
    upcomingAppointments: isSpanish ? "Próximas Citas" : "Upcoming Appointments",
    mentalHealthQuizzes: isSpanish ? "Cuestionarios de Salud Mental" : "Mental Health Quizzes",
    specializedPrograms: isSpanish ? "Programas Especializados" : "Specialized Programs",
    gratitudeJournal: isSpanish ? "Diario de Gratitud" : "Gratitude Journal",
    featuredWorkshops: isSpanish ? "Talleres Destacados" : "Featured Workshops",
    keyFeatures: isSpanish ? "Características Principales" : "Key Features",
    collapse: isSpanish ? "Colapsar" : "Collapse",
    expand: isSpanish ? "Expandir" : "Expand"
  };

  // Create a function that uses navigate if navigateToFeature is not provided
  const handleFeatureClick = (path: string) => {
    if (navigateToFeature) {
      navigateToFeature(path);
    } else {
      // Add state to navigation to ensure proper back navigation
      toast({
        title: isSpanish ? "Navegando..." : "Navigating...",
        description: isSpanish ? "Cargando recurso solicitado" : "Loading requested resource",
        duration: 1500,
      });
      
      navigate(path, { 
        state: { 
          fromMainMenu: true,
          preventTutorial: true 
        } 
      });
    }
  };

  // Collapsible section component that properly integrates the header with the content
  const CollapsibleSection = ({ 
    title, 
    gradientClasses,
    icon: Icon,
    children,
    defaultOpen = true
  }: {
    title: string;
    gradientClasses: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="mb-8"
      >
        <div className={`${gradientClasses} rounded-lg overflow-hidden`}>
          <CollapsibleTrigger className="w-full flex justify-between items-center px-4 py-3 focus:outline-none">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-base sm:text-xl font-semibold text-white">{title}</span>
            </div>
            
            <div className="p-1.5 h-auto bg-white/10 hover:bg-white/20 text-white rounded flex items-center">
              <span className="mr-1 text-xs font-medium">
                {isOpen ? translations.collapse : translations.expand}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-4">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 relative z-10">
      {/* Daily Wellness Challenges */}
      <CollapsibleSection
        title={translations.dailyChallenges}
        icon={Calendar}
        gradientClasses="bg-gradient-to-r from-[#8D65C5]/80 to-[#6C85DD]/80"
      >
        <DailyWellnessChallenges />
      </CollapsibleSection>
      
      {/* Specialized Programs */}
      <CollapsibleSection
        title={translations.specializedPrograms}
        icon={Sparkles}
        gradientClasses="bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80"
      >
        <SpecializedPrograms />
      </CollapsibleSection>
      
      {/* Gratitude Visualizer */}
      <CollapsibleSection
        title={translations.gratitudeJournal}
        icon={Heart}
        gradientClasses="bg-gradient-to-r from-[#F97316]/80 to-[#FB923C]/80"
      >
        <GratitudeVisualizer />
      </CollapsibleSection>
      
      {/* Appointments and Quizzes */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <CollapsibleSection
          title={translations.upcomingAppointments}
          icon={Calendar}
          gradientClasses="bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80"
        >
          <UpcomingAppointments />
        </CollapsibleSection>
        
        <CollapsibleSection
          title={translations.mentalHealthQuizzes}
          icon={HelpCircle}
          gradientClasses="bg-gradient-to-r from-[#6C85DD]/80 to-[#8D65C5]/80"
        >
          <QuizzesSection />
        </CollapsibleSection>
      </div>
      
      {/* Featured Workshops */}
      <CollapsibleSection
        title={translations.featuredWorkshops}
        icon={Calendar}
        gradientClasses="bg-gradient-to-r from-[#8D65C5]/80 to-[#6C85DD]/80"
      >
        <FeaturedWorkshops 
          navigate={navigate} 
          onWorkshopClick={onWorkshopClick}
        />
      </CollapsibleSection>

      {/* Key Features */}
      <CollapsibleSection
        title={translations.keyFeatures}
        icon={Heart}
        gradientClasses="bg-gradient-to-r from-[#9b87f5]/80 to-[#ffffff]/10"
      >
        <KeyFeatures 
          navigateToFeature={handleFeatureClick}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
        />
      </CollapsibleSection>
    </div>
  );
};

export default DashboardContent;
