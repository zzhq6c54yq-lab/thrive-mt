
import React from "react";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge, BarChart3, Lightbulb, CalendarClock, ClipboardList } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "@/components/golden-years/ResourceCard";
import BackButton from "@/components/navigation/BackButton";

const PolicePortal: React.FC = () => {
  const { isSpanish } = useTranslation();
  
  // Sample placeholder function for resource clicks
  const handleResourceClick = (resource: string) => {
    console.log(`${resource} clicked`);
  };

  return (
    <Page 
      title={isSpanish ? "Portal de Fuerzas de Seguridad" : "Law Enforcement Portal"}
      className="bg-gradient-to-br from-[#1E3A8A]/10 to-[#1E40AF]/5"
      showBackButton={false}
    >
      {/* Custom header with back button */}
      <div className="mb-6 flex items-center">
        <BackButton 
          onCustomBack={() => window.history.back()}
          className="mr-3"
        />
        <div className="flex items-center">
          <div className="p-2 bg-[#1E3A8A]/20 rounded-full mr-3">
            <Badge className="h-6 w-6 text-[#1E3A8A]" />
          </div>
          <h1 className="text-2xl font-bold">
            {isSpanish ? "Portal de Fuerzas de Seguridad" : "Law Enforcement Portal"}
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg">
          {isSpanish 
            ? "Bienvenido al portal de recursos para oficiales de policía y personal de seguridad. Aquí encontrarás herramientas específicas para manejar los desafíos únicos que enfrentas."
            : "Welcome to the resource portal for police officers and security personnel. Here you'll find tools specifically for handling the unique challenges you face."}
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
              <Badge className="mr-2 h-4 w-4" />
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
              title={isSpanish ? "Estrés Operativo" : "Operational Stress"}
              description={isSpanish ? "Manejo del estrés relacionado con situaciones de alto riesgo y toma de decisiones" : "Managing stress related to high-risk situations and decision making"}
              icon={<Lightbulb className="h-5 w-5 text-blue-200" />}
              onResourceClick={() => handleResourceClick("Operational Stress")}
              buttonText={isSpanish ? "Explorar" : "Explore"}
            />
            <ResourceCard
              title={isSpanish ? "Resiliencia Policial" : "Police Resilience"}
              description={isSpanish ? "Técnicas para mantener el equilibrio mental en la línea de deber" : "Techniques for maintaining mental balance in the line of duty"}
              icon={<Badge className="h-5 w-5 text-blue-200" />}
              onResourceClick={() => handleResourceClick("Police Resilience")}
              buttonText={isSpanish ? "Explorar" : "Explore"}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="statistics" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#1E3A8A]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#1E3A8A]">
              {isSpanish ? "Estadísticas de Salud Mental en Fuerzas del Orden" : "Mental Health Statistics in Law Enforcement"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Los datos muestran los desafíos únicos de salud mental que enfrentan los oficiales de policía y personal de seguridad."
                : "Data shows the unique mental health challenges faced by police officers and security personnel."}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="support" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#1E3A8A]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#1E3A8A]">
              {isSpanish ? "Recursos de Apoyo" : "Support Resources"}
            </h3>
            <p className="mb-4">
              {isSpanish 
                ? "Programas confidenciales diseñados específicamente para personal de fuerzas del orden."
                : "Confidential programs specifically designed for law enforcement personnel."}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#1E3A8A]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#1E3A8A]">
              {isSpanish ? "Evaluaciones para Fuerzas del Orden" : "Assessments for Law Enforcement"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Estas evaluaciones confidenciales están diseñadas específicamente para las necesidades de los profesionales de la seguridad."
                : "These confidential assessments are specifically designed for the needs of law enforcement professionals."}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  );
};

export default PolicePortal;
