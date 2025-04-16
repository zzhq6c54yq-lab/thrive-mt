
import React from "react";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, BarChart3, Lightbulb, CalendarClock, ClipboardList } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useLocation } from "react-router-dom";
import ResourceCard from "@/components/golden-years/ResourceCard";
import BackButton from "@/components/navigation/BackButton";

const HealthcarePortal: React.FC = () => {
  const { isSpanish } = useTranslation();
  
  // Sample placeholder function for resource clicks
  const handleResourceClick = (resource: string) => {
    console.log(`${resource} clicked`);
  };

  return (
    <Page 
      title={isSpanish ? "Portal de Trabajadores de Salud" : "Healthcare Workers Portal"}
      className="bg-gradient-to-br from-[#16A34A]/10 to-[#15803D]/5"
      showBackButton={false}
    >
      {/* Custom header with back button */}
      <div className="mb-6 flex items-center">
        <BackButton 
          onCustomBack={() => window.history.back()}
          className="mr-3"
        />
        <div className="flex items-center">
          <div className="p-2 bg-[#16A34A]/20 rounded-full mr-3">
            <Stethoscope className="h-6 w-6 text-[#16A34A]" />
          </div>
          <h1 className="text-2xl font-bold">
            {isSpanish ? "Portal de Trabajadores de Salud" : "Healthcare Workers Portal"}
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg">
          {isSpanish 
            ? "Bienvenido al portal de recursos para profesionales de la salud. Aquí encontrarás herramientas para manejar el estrés, prevenir el agotamiento y cuidar tu bienestar."
            : "Welcome to the resource portal for healthcare professionals. Here you'll find tools to manage stress, prevent burnout, and care for your wellbeing."}
        </p>
      </div>

      <Tabs defaultValue="resources" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="resources">
            <span className="flex items-center">
              <Lightbulb className="mr-2 h-4 w-4" />
              {isSpanish ? "Recursos" : "Resources"}
            </span>
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <span className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              {isSpanish ? "Estadísticas" : "Statistics"}
            </span>
          </TabsTrigger>
          <TabsTrigger value="support">
            <span className="flex items-center">
              <Stethoscope className="mr-2 h-4 w-4" />
              {isSpanish ? "Apoyo" : "Support"}
            </span>
          </TabsTrigger>
          <TabsTrigger value="assessments">
            <span className="flex items-center">
              <ClipboardList className="mr-2 h-4 w-4" />
              {isSpanish ? "Evaluaciones" : "Assessments"}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample resource cards */}
            <ResourceCard
              title={isSpanish ? "Prevención del Agotamiento" : "Burnout Prevention"}
              description={isSpanish ? "Estrategias para identificar y abordar el agotamiento profesional" : "Strategies to identify and address professional burnout"}
              icon={<Lightbulb className="h-5 w-5 text-emerald-200" />}
              onResourceClick={() => handleResourceClick("Burnout Prevention")}
              buttonText={isSpanish ? "Explorar" : "Explore"}
            />
            <ResourceCard
              title={isSpanish ? "Trauma Secundario" : "Secondary Trauma"}
              description={isSpanish ? "Cómo manejar el trauma indirecto del trabajo con pacientes" : "How to handle vicarious trauma from working with patients"}
              icon={<Stethoscope className="h-5 w-5 text-emerald-200" />}
              onResourceClick={() => handleResourceClick("Secondary Trauma")}
              buttonText={isSpanish ? "Explorar" : "Explore"}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="statistics" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#16A34A]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#16A34A]">
              {isSpanish ? "Estadísticas de Salud Mental en Trabajadores de Salud" : "Mental Health Statistics in Healthcare Workers"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Los datos muestran que los trabajadores de la salud enfrentan desafíos significativos de salud mental relacionados con su profesión."
                : "Data shows that healthcare workers face significant mental health challenges related to their profession."}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="support" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#16A34A]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#16A34A]">
              {isSpanish ? "Grupos de Apoyo" : "Support Groups"}
            </h3>
            <p className="mb-4">
              {isSpanish 
                ? "Conéctate con otros profesionales de la salud que entienden tus desafíos."
                : "Connect with other healthcare professionals who understand your challenges."}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#16A34A]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#16A34A]">
              {isSpanish ? "Evaluaciones para Profesionales de la Salud" : "Assessments for Healthcare Professionals"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Estas evaluaciones confidenciales pueden ayudarte a identificar señales de agotamiento, estrés traumático secundario y fatiga por compasión."
                : "These confidential assessments can help you identify signs of burnout, secondary traumatic stress, and compassion fatigue."}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  );
};

export default HealthcarePortal;
