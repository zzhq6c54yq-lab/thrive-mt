
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Stethoscope, PieChart, Book, CalendarCheck, ClipboardCheck } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const HealthcareWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleContinue = () => {
    toast({
      title: isSpanish ? "Entrando al portal" : "Entering portal",
      description: isSpanish ? "Cargando recursos para trabajadores de salud" : "Loading healthcare worker resources",
      duration: 1500,
    });
    
    navigate("/healthcare-portal", {
      state: { 
        fromWelcome: true,
        preventTutorial: true
      }
    });
  };
  
  return (
    <Page title={isSpanish ? "Trabajadores de Salud" : "Healthcare Workers"} className="bg-gradient-to-br from-[#16A34A]/10 to-[#15803D]/5">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-[#16A34A]/20 mb-4">
            <Stethoscope size={40} className="text-[#16A34A]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isSpanish ? "Bienvenido a Trabajadores de Salud" : "Welcome to Healthcare Workers"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {isSpanish 
              ? "Un espacio dedicado al bienestar de los profesionales de la salud que enfrentan estrés, agotamiento y trauma indirecto."
              : "A dedicated space for the wellbeing of healthcare professionals facing stress, burnout, and vicarious trauma."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#16A34A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#16A34A]/20">
                <PieChart className="h-6 w-6 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Estadísticas" : "Statistics"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Datos sobre el agotamiento, el estrés traumático secundario y los desafíos de salud mental en los trabajadores de la salud."
                    : "Data on burnout, secondary traumatic stress, and mental health challenges among healthcare workers."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#16A34A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#16A34A]/20">
                <Book className="h-6 w-6 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Recursos" : "Resources"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Herramientas para el autocuidado, manejo del estrés y prevención del agotamiento para profesionales de la salud."
                    : "Tools for self-care, stress management, and burnout prevention for healthcare professionals."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#16A34A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#16A34A]/20">
                <CalendarCheck className="h-6 w-6 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Talleres" : "Workshops"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Sesiones diseñadas específicamente para profesionales de la salud sobre equilibrio trabajo-vida, resiliencia y manejo del trauma."
                    : "Sessions specifically designed for healthcare professionals on work-life balance, resilience, and trauma management."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#16A34A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#16A34A]/20">
                <ClipboardCheck className="h-6 w-6 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Evaluaciones" : "Assessments"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Herramientas para evaluar el agotamiento profesional, el trauma secundario y la satisfacción laboral."
                    : "Tools to assess professional burnout, secondary trauma, and job satisfaction."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="bg-[#16A34A] hover:bg-[#15803D] text-white py-2 px-8 rounded-lg text-lg"
          >
            {isSpanish ? "Continuar al Portal" : "Continue to Portal"}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default HealthcareWelcome;
