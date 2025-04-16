
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, PieChart, Book, CalendarCheck, ClipboardCheck } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const MentalHealthWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleContinue = () => {
    toast({
      title: isSpanish ? "Entrando al portal" : "Entering portal",
      description: isSpanish ? "Cargando recursos de salud mental" : "Loading mental health resources",
      duration: 1500,
    });
    
    navigate("/mental-health-portal", {
      state: { 
        fromWelcome: true,
        preventTutorial: true
      }
    });
  };
  
  return (
    <Page title={isSpanish ? "Ansiedad y Depresión" : "Anxiety & Depression"} className="bg-gradient-to-br from-[#9b87f5]/10 to-[#6E59A5]/5">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-[#9b87f5]/20 mb-4">
            <Brain size={40} className="text-[#9b87f5]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isSpanish ? "Bienvenido a Ansiedad y Depresión" : "Welcome to Anxiety & Depression"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {isSpanish 
              ? "Un espacio dedicado para comprender, abordar y encontrar apoyo para los trastornos de ansiedad y depresión."
              : "A dedicated space to understand, address, and find support for anxiety and depression disorders."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <PieChart className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Estadísticas" : "Statistics"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Datos sobre la prevalencia de los trastornos de ansiedad y depresión y su impacto en el bienestar."
                    : "Data on the prevalence of anxiety and depression disorders and their impact on wellbeing."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <Book className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Recursos" : "Resources"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Guías, artículos y herramientas para entender y manejar los síntomas de ansiedad y depresión."
                    : "Guides, articles, and tools to understand and manage anxiety and depression symptoms."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <CalendarCheck className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Talleres" : "Workshops"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Sesiones interactivas sobre técnicas de afrontamiento, manejo del estrés y recuperación."
                    : "Interactive sessions on coping techniques, stress management, and recovery."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#9b87f5]/20">
                <ClipboardCheck className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Evaluaciones" : "Assessments"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Herramientas de evaluación para la ansiedad, depresión y trastornos relacionados."
                    : "Assessment tools for anxiety, depression, and related disorders."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="bg-[#9b87f5] hover:bg-[#6E59A5] text-white py-2 px-8 rounded-lg text-lg"
          >
            {isSpanish ? "Continuar al Portal" : "Continue to Portal"}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default MentalHealthWelcome;
