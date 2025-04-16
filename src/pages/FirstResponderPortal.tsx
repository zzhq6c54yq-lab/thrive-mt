
import React from "react";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Siren, BarChart3, Lightbulb, CalendarClock, ClipboardList } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "@/components/golden-years/ResourceCard";
import BackButton from "@/components/navigation/BackButton";

const FirstResponderPortal: React.FC = () => {
  const { isSpanish } = useTranslation();
  
  // Sample placeholder function for resource clicks
  const handleResourceClick = (resource: string) => {
    console.log(`${resource} clicked`);
  };

  return (
    <Page 
      title={isSpanish ? "Portal de Primeros Respondedores" : "First Responders Portal"}
      className="bg-gradient-to-br from-[#DC2626]/10 to-[#B91C1C]/5"
      showBackButton={false}
    >
      {/* Custom header with back button */}
      <div className="mb-6 flex items-center">
        <BackButton 
          onCustomBack={() => window.history.back()}
          className="mr-3"
        />
        <div className="flex items-center">
          <div className="p-2 bg-[#DC2626]/20 rounded-full mr-3">
            <Siren className="h-6 w-6 text-[#DC2626]" />
          </div>
          <h1 className="text-2xl font-bold">
            {isSpanish ? "Portal de Primeros Respondedores" : "First Responders Portal"}
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg">
          {isSpanish 
            ? "Bienvenido al portal de recursos para bomberos, paramédicos y personal de emergencias. Aquí encontrarás herramientas específicas para manejar el estrés y el trauma relacionados con tu trabajo."
            : "Welcome to the resource portal for firefighters, paramedics, and emergency personnel. Here you'll find tools specifically for managing work-related stress and trauma."}
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
              <Siren className="mr-2 h-4 w-4" />
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
              title={isSpanish ? "Manejo del Estrés Crítico" : "Critical Stress Management"}
              description={isSpanish ? "Técnicas para manejar el estrés después de incidentes críticos" : "Techniques for managing stress after critical incidents"}
              icon={<Lightbulb className="h-5 w-5 text-red-200" />}
              onResourceClick={() => handleResourceClick("Critical Stress Management")}
              buttonText={isSpanish ? "Explorar" : "Explore"}
            />
            <ResourceCard
              title={isSpanish ? "Resiliencia en Crisis" : "Crisis Resilience"}
              description={isSpanish ? "Desarrollar fortaleza mental para situaciones de emergencia" : "Developing mental toughness for emergency situations"}
              icon={<Siren className="h-5 w-5 text-red-200" />}
              onResourceClick={() => handleResourceClick("Crisis Resilience")}
              buttonText={isSpanish ? "Explorar" : "Explore"}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="statistics" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#DC2626]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#DC2626]">
              {isSpanish ? "Estadísticas de Salud Mental en Primeros Respondedores" : "Mental Health Statistics in First Responders"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Los datos muestran que los primeros respondedores enfrentan tasas más altas de TEPT y otros desafíos de salud mental."
                : "Data shows that first responders face higher rates of PTSD and other mental health challenges."}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="support" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#DC2626]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#DC2626]">
              {isSpanish ? "Grupos de Apoyo" : "Support Groups"}
            </h3>
            <p className="mb-4">
              {isSpanish 
                ? "Conéctate con otros primeros respondedores que entienden las presiones únicas de tu trabajo."
                : "Connect with other first responders who understand the unique pressures of your job."}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#DC2626]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#DC2626]">
              {isSpanish ? "Evaluaciones para Primeros Respondedores" : "Assessments for First Responders"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Estas evaluaciones confidenciales pueden ayudarte a identificar señales de TEPT, estrés crítico y fatiga."
                : "These confidential assessments can help you identify signs of PTSD, critical stress, and fatigue."}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  );
};

export default FirstResponderPortal;
