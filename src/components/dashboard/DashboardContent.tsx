
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  
  // State to track which sections are open
  const [openSections, setOpenSections] = useState({
    challenges: true,
    specializedPrograms: true,
    gratitude: true,
    appointments: true,
    quizzes: true,
    workshops: true,
    keyFeatures: true
  });
  
  // Toggle section visibility
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
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

  // Section header component with collapse/expand button
  const SectionHeader = ({ 
    title, 
    section, 
    icon: Icon,
    iconColor, 
    gradientClasses 
  }: {
    title: string;
    section: keyof typeof openSections;
    icon: React.ElementType;
    iconColor: string;
    gradientClasses: string;
  }) => (
    <div className={`flex justify-between items-center mb-2 px-4 py-3 rounded-lg ${gradientClasses}`}>
      <div className="flex items-center">
        <div className={`bg-white/20 p-2 rounded-full mr-3`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className="text-base sm:text-xl font-semibold text-white">{title}</span>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="p-1.5 h-auto bg-white/10 hover:bg-white/20 text-white"
        onClick={() => toggleSection(section)}
      >
        {openSections[section] ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
        <span className="sr-only">
          {openSections[section] ? translations.collapse : translations.expand}
        </span>
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 relative z-10">
      {/* Daily Wellness Challenges */}
      <div className="mb-8">
        <SectionHeader
          title={translations.dailyChallenges}
          section="challenges"
          icon={Calendar}
          iconColor="text-white"
          gradientClasses="bg-gradient-to-r from-[#8D65C5]/80 to-[#6C85DD]/80"
        />
        
        {openSections.challenges && (
          <div className="mt-4">
            <DailyWellnessChallenges />
          </div>
        )}
      </div>
      
      {/* Specialized Programs */}
      <div className="mb-8">
        <SectionHeader
          title={translations.specializedPrograms}
          section="specializedPrograms"
          icon={Sparkles}
          iconColor="text-[#B87333]"
          gradientClasses="bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80"
        />
        
        {openSections.specializedPrograms && (
          <div className="mt-4">
            <SpecializedPrograms />
          </div>
        )}
      </div>
      
      {/* Gratitude Visualizer */}
      <div className="mb-8">
        <SectionHeader
          title={translations.gratitudeJournal}
          section="gratitude"
          icon={Heart}
          iconColor="text-white"
          gradientClasses="bg-gradient-to-r from-[#F97316]/80 to-[#FB923C]/80"
        />
        
        {openSections.gratitude && (
          <div className="mt-4">
            <GratitudeVisualizer />
          </div>
        )}
      </div>
      
      {/* Appointments and Quizzes */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div>
          <SectionHeader
            title={translations.upcomingAppointments}
            section="appointments"
            icon={Calendar}
            iconColor="text-white"
            gradientClasses="bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80"
          />
          
          {openSections.appointments && (
            <div className="mt-4">
              <UpcomingAppointments />
            </div>
          )}
        </div>
        
        <div>
          <SectionHeader
            title={translations.mentalHealthQuizzes}
            section="quizzes"
            icon={HelpCircle}
            iconColor="text-white"
            gradientClasses="bg-gradient-to-r from-[#6C85DD]/80 to-[#8D65C5]/80"
          />
          
          {openSections.quizzes && (
            <div className="mt-4">
              <QuizzesSection />
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Workshops */}
      <div className="mb-8">
        <SectionHeader
          title={translations.featuredWorkshops}
          section="workshops"
          icon={Calendar}
          iconColor="text-white"
          gradientClasses="bg-gradient-to-r from-[#8D65C5]/80 to-[#6C85DD]/80"
        />
        
        {openSections.workshops && (
          <div className="mt-4">
            <FeaturedWorkshops 
              navigate={navigate} 
              onWorkshopClick={onWorkshopClick}
            />
          </div>
        )}
      </div>

      {/* Key Features */}
      <div>
        <SectionHeader
          title={translations.keyFeatures}
          section="keyFeatures"
          icon={Heart}
          iconColor="text-[#9b87f5]"
          gradientClasses="bg-gradient-to-r from-[#9b87f5]/80 to-[#ffffff]/10"
        />
        
        {openSections.keyFeatures && (
          <div className="mt-4">
            <KeyFeatures 
              navigateToFeature={handleFeatureClick}
              selectedQualities={selectedQualities}
              selectedGoals={selectedGoals}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
