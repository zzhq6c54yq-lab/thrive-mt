
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Siren, PieChart, Book, CalendarCheck, ClipboardCheck } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const FirstResponderWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleContinue = () => {
    toast({
      title: isSpanish ? "Entrando al portal" : "Entering portal",
      description: isSpanish ? "Cargando recursos para primeros respondedores" : "Loading first responder resources",
      duration: 1500,
    });
    
    navigate("/first-responder-portal", {
      state: { 
        fromWelcome: true,
        preventTutorial: true
      }
    });
  };
  
  return (
    <Page title={isSpanish ? "Primeros Respondedores" : "First Responders"} className="bg-gradient-to-br from-[#DC2626]/10 to-[#B91C1C]/5">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-[#DC2626]/20 mb-4">
            <Siren size={40} className="text-[#DC2626]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isSpanish ? "Bienvenido a Primeros Respondedores" : "Welcome to First Responders"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {isSpanish 
              ? "Un espacio dedicado al bienestar mental de bomberos, paramédicos y profesionales de emergencias que enfrentan situaciones traumáticas."
              : "A dedicated space for the mental wellbeing of firefighters, paramedics, and emergency professionals who face traumatic situations."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#DC2626]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#DC2626]/20">
                <PieChart className="h-6 w-6 text-[#DC2626]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Estadísticas" : "Statistics"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Datos sobre el TEPT, el estrés traumático y los desafíos de salud mental entre los primeros respondedores."
                    : "Data on PTSD, traumatic stress, and mental health challenges among first responders."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#DC2626]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#DC2626]/20">
                <Book className="h-6 w-6 text-[#DC2626]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Recursos" : "Resources"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Recursos para el manejo del estrés crítico, procesamiento de traumas y resiliencia para socorristas."
                    : "Resources for critical stress management, trauma processing, and resilience for first responders."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#DC2626]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#DC2626]/20">
                <CalendarCheck className="h-6 w-6 text-[#DC2626]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Talleres" : "Workshops"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Sesiones especializadas sobre manejo de crisis, descompresión después de incidentes y autocuidado."
                    : "Specialized sessions on crisis management, post-incident decompression, and self-care."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#DC2626]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#DC2626]/20">
                <ClipboardCheck className="h-6 w-6 text-[#DC2626]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Evaluaciones" : "Assessments"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Herramientas de evaluación para el TEPT, la fatiga por compasión y la resiliencia adaptadas para primeros respondedores."
                    : "Assessment tools for PTSD, compassion fatigue, and resilience tailored for first responders."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white py-2 px-8 rounded-lg text-lg"
          >
            {isSpanish ? "Continuar al Portal" : "Continue to Portal"}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default FirstResponderWelcome;
