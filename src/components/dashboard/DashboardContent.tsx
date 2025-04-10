
import React, { useState } from "react";
import DailyWellnessChallenges from "@/components/dashboard/DailyWellnessChallenges";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
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
    featuredWorkshops: isSpanish ? "Talleres Destacados" : "Featured Workshops",
    keyFeatures: isSpanish ? "Características Principales" : "Key Features",
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

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 relative z-10">
      <Accordion type="multiple" defaultValue={["dailyChallenges", "specializedPrograms", "appointments", "quizzes", "workshops", "keyFeatures"]} className="space-y-6">
        {/* Daily Wellness Challenges */}
        <AccordionItem value="dailyChallenges" className="border-none">
          <div className="bg-gradient-to-r from-[#8D65C5]/80 to-[#6C85DD]/80 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-semibold text-white">{translations.dailyChallenges}</span>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="mt-4 pb-6">
            <DailyWellnessChallenges />
          </AccordionContent>
        </AccordionItem>
        
        {/* Specialized Programs */}
        <AccordionItem value="specializedPrograms" className="border-none">
          <div className="bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-semibold text-white">{translations.specializedPrograms}</span>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="mt-4 pb-6">
            <SpecializedPrograms />
          </AccordionContent>
        </AccordionItem>
        
        {/* Appointments and Quizzes */}
        <div className="grid grid-cols-1 gap-6">
          {/* Upcoming Appointments */}
          <AccordionItem value="appointments" className="border-none">
            <div className="bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base sm:text-xl font-semibold text-white">{translations.upcomingAppointments}</span>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="mt-4 pb-6">
              <UpcomingAppointments />
            </AccordionContent>
          </AccordionItem>
          
          {/* Mental Health Quizzes */}
          <AccordionItem value="quizzes" className="border-none">
            <div className="bg-gradient-to-r from-[#6C85DD]/80 to-[#8D65C5]/80 rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <HelpCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base sm:text-xl font-semibold text-white">{translations.mentalHealthQuizzes}</span>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="mt-4 pb-6">
              <QuizzesSection />
            </AccordionContent>
          </AccordionItem>
        </div>
        
        {/* Featured Workshops */}
        <AccordionItem value="workshops" className="border-none">
          <div className="bg-gradient-to-r from-[#8D65C5]/80 to-[#6C85DD]/80 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-semibold text-white">{translations.featuredWorkshops}</span>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="mt-4 pb-6">
            <FeaturedWorkshops 
              navigate={navigate} 
              onWorkshopClick={onWorkshopClick}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Key Features */}
        <AccordionItem value="keyFeatures" className="border-none">
          <div className="bg-gradient-to-r from-[#9b87f5]/80 to-[#ffffff]/10 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-semibold text-white">{translations.keyFeatures}</span>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent className="mt-4 pb-6">
            <KeyFeatures 
              navigateToFeature={handleFeatureClick}
              selectedQualities={selectedQualities}
              selectedGoals={selectedGoals}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DashboardContent;
