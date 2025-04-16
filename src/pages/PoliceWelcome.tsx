
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge, PieChart, Book, CalendarCheck, ClipboardCheck } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const PoliceWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleContinue = () => {
    toast({
      title: isSpanish ? "Entrando al portal" : "Entering portal",
      description: isSpanish ? "Cargando recursos para fuerzas de seguridad" : "Loading law enforcement resources",
      duration: 1500,
    });
    
    navigate("/police-portal", {
      state: { 
        fromWelcome: true,
        preventTutorial: true
      }
    });
  };
  
  return (
    <Page title={isSpanish ? "Fuerzas de Seguridad" : "Law Enforcement"} className="bg-gradient-to-br from-[#1E3A8A]/10 to-[#1E40AF]/5">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-[#1E3A8A]/20 mb-4">
            <Badge size={40} className="text-[#1E3A8A]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isSpanish ? "Bienvenido a Fuerzas de Seguridad" : "Welcome to Law Enforcement"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {isSpanish 
              ? "Un espacio dedicado al bienestar mental de oficiales de policía, agentes de seguridad y personal de fuerzas del orden."
              : "A dedicated space for the mental wellbeing of police officers, security personnel, and law enforcement staff."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <PieChart className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Estadísticas" : "Statistics"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Datos sobre el estrés ocupacional, trauma y desafíos de salud mental en las fuerzas del orden."
                    : "Data on occupational stress, trauma, and mental health challenges in law enforcement."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <Book className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Recursos" : "Resources"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Recursos confidenciales para el manejo del estrés, trauma y resiliencia adaptados para personal de seguridad."
                    : "Confidential resources for stress management, trauma, and resilience tailored for law enforcement personnel."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <CalendarCheck className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Talleres" : "Workshops"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Sesiones sobre manejo del estrés operativo, traumatología policial y habilidades de afrontamiento."
                    : "Sessions on operational stress management, police traumatology, and coping skills."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#1E3A8A]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1E3A8A]/20">
                <ClipboardCheck className="h-6 w-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Evaluaciones" : "Assessments"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Herramientas de autoevaluación seguras y confidenciales para el estrés operacional y la salud mental."
                    : "Safe, confidential self-assessment tools for operational stress and mental health."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-2 px-8 rounded-lg text-lg"
          >
            {isSpanish ? "Continuar al Portal" : "Continue to Portal"}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default PoliceWelcome;
