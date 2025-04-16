
import React from "react";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BarChart3, Lightbulb, CalendarClock, ClipboardList } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useLocation } from "react-router-dom";
import ResourceCard from "@/components/golden-years/ResourceCard";
import BackButton from "@/components/navigation/BackButton";

const MentalHealthPortal: React.FC = () => {
  const { isSpanish } = useTranslation();
  const location = useLocation();
  
  // Sample resources for mental health (anxiety & depression)
  const resources = [
    {
      title: isSpanish ? "Entendiendo la Ansiedad" : "Understanding Anxiety",
      description: isSpanish 
        ? "Información sobre los diferentes tipos de trastornos de ansiedad y sus síntomas" 
        : "Information about different types of anxiety disorders and their symptoms",
      icon: <Brain className="h-5 w-5 text-purple-200" />,
      onResourceClick: () => console.log("Understanding Anxiety clicked")
    },
    {
      title: isSpanish ? "Manejo de la Depresión" : "Managing Depression",
      description: isSpanish 
        ? "Recursos y técnicas para manejar los síntomas de la depresión" 
        : "Resources and techniques for managing depression symptoms",
      icon: <Lightbulb className="h-5 w-5 text-purple-200" />,
      onResourceClick: () => console.log("Managing Depression clicked")
    },
    {
      title: isSpanish ? "Técnicas de Afrontamiento" : "Coping Techniques",
      description: isSpanish 
        ? "Estrategias prácticas para momentos de crisis, pánico o pensamientos intrusivos" 
        : "Practical strategies for moments of crisis, panic, or intrusive thoughts",
      icon: <Lightbulb className="h-5 w-5 text-purple-200" />,
      onResourceClick: () => console.log("Coping Techniques clicked")
    },
    {
      title: isSpanish ? "Terapias Efectivas" : "Effective Therapies",
      description: isSpanish 
        ? "Información sobre terapias basadas en evidencia para la ansiedad y depresión" 
        : "Information on evidence-based therapies for anxiety and depression",
      icon: <CalendarClock className="h-5 w-5 text-purple-200" />,
      onResourceClick: () => console.log("Effective Therapies clicked")
    },
    {
      title: isSpanish ? "Apoyo Médico" : "Medical Support",
      description: isSpanish 
        ? "Guía sobre cuándo y cómo buscar ayuda profesional y opciones de tratamiento" 
        : "Guidance on when and how to seek professional help and treatment options",
      icon: <Brain className="h-5 w-5 text-purple-200" />,
      onResourceClick: () => console.log("Medical Support clicked")
    },
    {
      title: isSpanish ? "Herramientas de Evaluación" : "Assessment Tools",
      description: isSpanish 
        ? "Evaluaciones para identificar y monitorear síntomas de ansiedad y depresión" 
        : "Assessments to identify and monitor anxiety and depression symptoms",
      icon: <ClipboardList className="h-5 w-5 text-purple-200" />,
      onResourceClick: () => console.log("Assessment Tools clicked")
    }
  ];

  return (
    <Page 
      title={isSpanish ? "Portal de Ansiedad y Depresión" : "Anxiety & Depression Portal"}
      className="bg-gradient-to-br from-[#9b87f5]/10 to-[#6E59A5]/5"
      showBackButton={false}
    >
      {/* Custom header with back button */}
      <div className="mb-6 flex items-center">
        <BackButton 
          onCustomBack={() => window.history.back()}
          className="mr-3"
        />
        <div className="flex items-center">
          <div className="p-2 bg-[#9b87f5]/20 rounded-full mr-3">
            <Brain className="h-6 w-6 text-[#9b87f5]" />
          </div>
          <h1 className="text-2xl font-bold">
            {isSpanish ? "Portal de Ansiedad y Depresión" : "Anxiety & Depression Portal"}
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg">
          {isSpanish 
            ? "Bienvenido al portal de recursos para comprender y manejar la ansiedad y la depresión."
            : "Welcome to the resource portal for understanding and managing anxiety and depression."}
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
          <TabsTrigger value="community">
            <span className="flex items-center">
              <Brain className="mr-2 h-4 w-4" />
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
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                onResourceClick={resource.onResourceClick}
                buttonText={isSpanish ? "Explorar" : "Explore"}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="statistics" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#9b87f5]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              {isSpanish ? "Estadísticas de Ansiedad y Depresión" : "Anxiety & Depression Statistics"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="p-1 bg-[#9b87f5]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#9b87f5] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "Aproximadamente 280 millones de personas en el mundo sufren de depresión, según la OMS."
                    : "Approximately 280 million people worldwide suffer from depression, according to the WHO."}
                </p>
              </li>
              <li className="flex items-start">
                <div className="p-1 bg-[#9b87f5]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#9b87f5] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "Los trastornos de ansiedad afectan a 301 millones de personas a nivel global."
                    : "Anxiety disorders affect 301 million people globally."}
                </p>
              </li>
              <li className="flex items-start">
                <div className="p-1 bg-[#9b87f5]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#9b87f5] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "Solo el 35% de las personas con depresión reciben tratamiento adecuado."
                    : "Only 35% of people with depression receive adequate treatment."}
                </p>
              </li>
              <li className="flex items-start">
                <div className="p-1 bg-[#9b87f5]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#9b87f5] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "La terapia cognitivo-conductual muestra una tasa de eficacia del 70% en el tratamiento de la ansiedad."
                    : "Cognitive-behavioral therapy shows a 70% effectiveness rate in treating anxiety."}
                </p>
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="community" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#9b87f5]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              {isSpanish ? "Grupos de Apoyo" : "Support Groups"}
            </h3>
            <p className="mb-4">
              {isSpanish 
                ? "Conéctate con otros que comprenden lo que estás experimentando a través de nuestros grupos de apoyo."
                : "Connect with others who understand what you're going through via our support groups."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Apoyo para la Depresión" : "Depression Support"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Grupo facilitado por terapeutas para personas que luchan contra la depresión."
                    : "Therapist-facilitated group for people struggling with depression."}
                </p>
                <span className="text-xs text-[#9b87f5]">{isSpanish ? "Martes, 7PM ET" : "Tuesdays, 7PM ET"}</span>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Manejo de la Ansiedad" : "Anxiety Management"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Aprende técnicas prácticas para manejar los síntomas de ansiedad en tiempo real."
                    : "Learn practical techniques to manage anxiety symptoms in real-time."}
                </p>
                <span className="text-xs text-[#9b87f5]">{isSpanish ? "Jueves, 6PM ET" : "Thursdays, 6PM ET"}</span>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Grupo de Recuperación" : "Recovery Group"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Para aquellos en proceso de recuperación de episodios graves de ansiedad o depresión."
                    : "For those in the process of recovery from severe anxiety or depression episodes."}
                </p>
                <span className="text-xs text-[#9b87f5]">{isSpanish ? "Sábados, 11AM ET" : "Saturdays, 11AM ET"}</span>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Mindfulness y Meditación" : "Mindfulness & Meditation"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Sesiones guiadas de mindfulness para reducir la ansiedad y mejorar el estado de ánimo."
                    : "Guided mindfulness sessions to reduce anxiety and improve mood."}
                </p>
                <span className="text-xs text-[#9b87f5]">{isSpanish ? "Lunes y Viernes, 8AM ET" : "Mondays & Fridays, 8AM ET"}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#9b87f5]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#9b87f5]">
              {isSpanish ? "Evaluaciones de Salud Mental" : "Mental Health Assessments"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Estas evaluaciones pueden ayudar a identificar síntomas de ansiedad y depresión. Los resultados son confidenciales y solo para uso informativo, no constituyen un diagnóstico médico."
                : "These assessments can help identify symptoms of anxiety and depression. Results are confidential and for informational use only, not a medical diagnosis."}
            </p>
            <div className="space-y-4">
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Cuestionario de Salud del Paciente (PHQ-9)" : "Patient Health Questionnaire (PHQ-9)"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Evaluación estándar para detectar y medir la severidad de síntomas de depresión."
                    : "Standard assessment to screen for and measure severity of depression symptoms."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#9b87f5] hover:underline">
                    {isSpanish ? "Comenzar evaluación" : "Start assessment"}
                  </button>
                </div>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Trastorno de Ansiedad Generalizada (GAD-7)" : "Generalized Anxiety Disorder (GAD-7)"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Herramienta de detección para el trastorno de ansiedad generalizada."
                    : "Screening tool for generalized anxiety disorder."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#9b87f5] hover:underline">
                    {isSpanish ? "Comenzar evaluación" : "Start assessment"}
                  </button>
                </div>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Evaluación de Pensamientos Automáticos" : "Automatic Thoughts Assessment"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Identifica patrones de pensamiento negativo que pueden contribuir a la ansiedad y depresión."
                    : "Identifies negative thought patterns that may contribute to anxiety and depression."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#9b87f5] hover:underline">
                    {isSpanish ? "Comenzar evaluación" : "Start assessment"}
                  </button>
                </div>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#9b87f5]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Trastorno de Pánico (PDSS)" : "Panic Disorder Severity Scale (PDSS)"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Evalúa la presencia y severidad de los síntomas del trastorno de pánico."
                    : "Assesses the presence and severity of panic disorder symptoms."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#9b87f5] hover:underline">
                    {isSpanish ? "Comenzar evaluación" : "Start assessment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Page>
  );
};

export default MentalHealthPortal;
