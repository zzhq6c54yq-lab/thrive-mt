
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UsersRound, PieChart, Book, CalendarCheck, ClipboardCheck } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

const SocialWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleContinue = () => {
    toast({
      title: isSpanish ? "Entrando al portal" : "Entering portal",
      description: isSpanish ? "Cargando recursos sociales" : "Loading social resources",
      duration: 1500,
    });
    
    navigate("/social-portal", {
      state: { 
        fromWelcome: true,
        preventTutorial: true
      }
    });
  };
  
  return (
    <Page title={isSpanish ? "Socialización y Conexión" : "Social Connection"} className="bg-gradient-to-br from-[#06B6D4]/10 to-[#0891B2]/5">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-[#06B6D4]/20 mb-4">
            <UsersRound size={40} className="text-[#06B6D4]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {isSpanish ? "Bienvenido a Socialización y Conexión" : "Welcome to Social Connection"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {isSpanish 
              ? "Un espacio dedicado para construir habilidades sociales, mejorar conexiones personales y fortalecer tu red de apoyo."
              : "A dedicated space to build social skills, improve personal connections, and strengthen your support network."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#06B6D4]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#06B6D4]/20">
                <PieChart className="h-6 w-6 text-[#06B6D4]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Estadísticas" : "Statistics"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Datos sobre el impacto del aislamiento social y los beneficios de las conexiones sociales en la salud mental."
                    : "Data on the impact of social isolation and the benefits of social connections on mental health."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#06B6D4]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#06B6D4]/20">
                <Book className="h-6 w-6 text-[#06B6D4]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Recursos" : "Resources"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Guías sobre habilidades sociales, actividades comunitarias y apoyo para superar la ansiedad social."
                    : "Guides on social skills, community activities, and support for overcoming social anxiety."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#06B6D4]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#06B6D4]/20">
                <CalendarCheck className="h-6 w-6 text-[#06B6D4]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Talleres" : "Workshops"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Sesiones interactivas sobre comunicación efectiva, creación de conexiones significativas y superación del aislamiento."
                    : "Interactive sessions on effective communication, building meaningful connections, and overcoming isolation."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#06B6D4]/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#06B6D4]/20">
                <ClipboardCheck className="h-6 w-6 text-[#06B6D4]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{isSpanish ? "Evaluaciones" : "Assessments"}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isSpanish 
                    ? "Herramientas para evaluar tus habilidades sociales, niveles de conexión y áreas para mejorar."
                    : "Tools to assess your social skills, connection levels, and areas for improvement."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleContinue}
            className="bg-[#06B6D4] hover:bg-[#0891B2] text-white py-2 px-8 rounded-lg text-lg"
          >
            {isSpanish ? "Continuar al Portal" : "Continue to Portal"}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default SocialWelcome;
