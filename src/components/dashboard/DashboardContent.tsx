
import React from "react";
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
import { Calendar, HelpCircle } from "lucide-react";

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
  
  // Translations
  const translations = {
    dailyChallenges: isSpanish ? "Desafíos Diarios" : "Daily Challenges",
    upcomingAppointments: isSpanish ? "Próximas Citas" : "Upcoming Appointments",
    mentalHealthQuizzes: isSpanish ? "Cuestionarios de Salud Mental" : "Mental Health Quizzes",
  };

  // Create a function that uses navigate if navigateToFeature is not provided
  const handleFeatureClick = (path: string) => {
    if (navigateToFeature) {
      navigateToFeature(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 relative z-10">
      <div className="mb-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="challenges" className="border-0 mb-4">
            <AccordionTrigger className="bg-gradient-to-r from-[#8D65C5]/80 to-[#6C85DD]/80 py-3 px-4 rounded-lg text-white hover:no-underline">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-semibold">{translations.dailyChallenges}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <DailyWellnessChallenges />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <SpecializedPrograms />
      
      <GratitudeVisualizer />
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="appointments" className="border-0 mb-4">
            <AccordionTrigger className="bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 py-3 px-4 rounded-lg text-white hover:no-underline">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-semibold">{translations.upcomingAppointments}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <UpcomingAppointments />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="quizzes" className="border-0">
            <AccordionTrigger className="bg-gradient-to-r from-[#6C85DD]/80 to-[#8D65C5]/80 py-3 px-4 rounded-lg text-white hover:no-underline">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-semibold">{translations.mentalHealthQuizzes}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <QuizzesSection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <FeaturedWorkshops 
        navigate={navigate} 
        onWorkshopClick={onWorkshopClick}
      />

      <KeyFeatures 
        navigateToFeature={handleFeatureClick}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
      />
    </div>
  );
};

export default DashboardContent;
