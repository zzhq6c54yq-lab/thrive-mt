
import React from "react";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersRound, BarChart3, Lightbulb, CalendarClock, ClipboardList } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useLocation } from "react-router-dom";
import ResourceCard from "@/components/golden-years/ResourceCard";
import BackButton from "@/components/navigation/BackButton";

const SocialPortal: React.FC = () => {
  const { isSpanish } = useTranslation();
  const location = useLocation();
  
  // Sample resources for social connection
  const resources = [
    {
      title: isSpanish ? "Apoyo para Ansiedad Social" : "Social Anxiety Support",
      description: isSpanish 
        ? "Recursos para manejar la ansiedad en situaciones sociales y desarrollar confianza" 
        : "Resources for managing anxiety in social situations and building confidence",
      icon: <Lightbulb className="h-5 w-5 text-cyan-200" />,
      onResourceClick: () => console.log("Social Anxiety Support clicked")
    },
    {
      title: isSpanish ? "Conexiones Comunitarias" : "Community Connections",
      description: isSpanish 
        ? "Encuentre grupos locales, eventos y actividades para conocer a otros" 
        : "Find local groups, events, and activities to meet others",
      icon: <UsersRound className="h-5 w-5 text-cyan-200" />,
      onResourceClick: () => console.log("Community Connections clicked")
    },
    {
      title: isSpanish ? "Habilidades de Comunicación" : "Communication Skills",
      description: isSpanish 
        ? "Mejore su capacidad para conectarse con los demás a través de una comunicación efectiva" 
        : "Improve your ability to connect with others through effective communication",
      icon: <Lightbulb className="h-5 w-5 text-cyan-200" />,
      onResourceClick: () => console.log("Communication Skills clicked")
    },
    {
      title: isSpanish ? "Actividades de Grupo" : "Group Activities",
      description: isSpanish 
        ? "Experiencias estructuradas para practicar habilidades sociales en un entorno seguro" 
        : "Structured experiences to practice social skills in a safe environment",
      icon: <CalendarClock className="h-5 w-5 text-cyan-200" />,
      onResourceClick: () => console.log("Group Activities clicked")
    },
    {
      title: isSpanish ? "Relaciones Saludables" : "Healthy Relationships",
      description: isSpanish 
        ? "Guías para construir y mantener relaciones significativas y saludables" 
        : "Guides to building and maintaining meaningful, healthy relationships",
      icon: <UsersRound className="h-5 w-5 text-cyan-200" />,
      onResourceClick: () => console.log("Healthy Relationships clicked")
    },
    {
      title: isSpanish ? "Evaluaciones Sociales" : "Social Assessments",
      description: isSpanish 
        ? "Evaluaciones para medir sus habilidades sociales e identificar áreas de crecimiento" 
        : "Assessments to measure your social skills and identify areas for growth",
      icon: <ClipboardList className="h-5 w-5 text-cyan-200" />,
      onResourceClick: () => console.log("Social Assessments clicked")
    }
  ];

  return (
    <Page 
      title={isSpanish ? "Portal de Socialización" : "Social Connection Portal"}
      className="bg-gradient-to-br from-[#06B6D4]/10 to-[#0891B2]/5"
      showBackButton={false}
    >
      {/* Custom header with back button */}
      <div className="mb-6 flex items-center">
        <BackButton 
          onCustomBack={() => window.history.back()}
          className="mr-3"
        />
        <div className="flex items-center">
          <div className="p-2 bg-[#06B6D4]/20 rounded-full mr-3">
            <UsersRound className="h-6 w-6 text-[#06B6D4]" />
          </div>
          <h1 className="text-2xl font-bold">
            {isSpanish ? "Portal de Socialización y Conexión" : "Social Connection Portal"}
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg">
          {isSpanish 
            ? "Bienvenido al portal de recursos para mejorar tus habilidades sociales y construir conexiones significativas."
            : "Welcome to the resource portal for improving your social skills and building meaningful connections."}
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
              <UsersRound className="mr-2 h-4 w-4" />
              {isSpanish ? "Comunidad" : "Community"}
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
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#06B6D4]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#06B6D4]">
              {isSpanish ? "Estadísticas de Conexión Social" : "Social Connection Statistics"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="p-1 bg-[#06B6D4]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "Las personas con fuertes conexiones sociales tienen un 50% más de probabilidades de vivir más tiempo que aquellos con pocos vínculos sociales."
                    : "People with strong social connections are 50% more likely to live longer than those with few social ties."}
                </p>
              </li>
              <li className="flex items-start">
                <div className="p-1 bg-[#06B6D4]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "El aislamiento social aumenta el riesgo de depresión en un 64% y de ansiedad en un 45%."
                    : "Social isolation increases the risk of depression by 64% and anxiety by 45%."}
                </p>
              </li>
              <li className="flex items-start">
                <div className="p-1 bg-[#06B6D4]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "Participar en actividades sociales regulares puede reducir el riesgo de deterioro cognitivo en un 70%."
                    : "Engaging in regular social activities can reduce the risk of cognitive decline by 70%."}
                </p>
              </li>
              <li className="flex items-start">
                <div className="p-1 bg-[#06B6D4]/20 rounded-full mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
                </div>
                <p>
                  {isSpanish 
                    ? "El 72% de los adultos reporta que mejorar sus habilidades sociales aumentó significativamente su calidad de vida."
                    : "72% of adults report that improving their social skills significantly increased their quality of life."}
                </p>
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="community" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#06B6D4]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#06B6D4]">
              {isSpanish ? "Comunidades y Grupos" : "Communities & Groups"}
            </h3>
            <p className="mb-4">
              {isSpanish 
                ? "Conéctate con otros en situaciones similares a través de nuestros grupos de apoyo y comunidades."
                : "Connect with others in similar situations through our support groups and communities."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Grupo de Práctica de Habilidades Sociales" : "Social Skills Practice Group"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Reuniones semanales para practicar interacciones sociales en un ambiente seguro y de apoyo."
                    : "Weekly meetings to practice social interactions in a safe, supportive environment."}
                </p>
                <span className="text-xs text-[#06B6D4]">{isSpanish ? "Miércoles, 7PM ET" : "Wednesdays, 7PM ET"}</span>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Café y Conversación" : "Coffee & Conversation"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Charlas informales para construir confianza en situaciones sociales cotidianas."
                    : "Casual chats to build confidence in everyday social situations."}
                </p>
                <span className="text-xs text-[#06B6D4]">{isSpanish ? "Sábados, 10AM ET" : "Saturdays, 10AM ET"}</span>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Superando la Ansiedad Social" : "Overcoming Social Anxiety"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Grupo de apoyo facilitado por terapeutas para manejar la ansiedad en situaciones sociales."
                    : "Therapist-facilitated support group for managing anxiety in social situations."}
                </p>
                <span className="text-xs text-[#06B6D4]">{isSpanish ? "Lunes, 6PM ET" : "Mondays, 6PM ET"}</span>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Actividades de Grupo" : "Group Activities"}</h4>
                <p className="text-sm mb-3">
                  {isSpanish 
                    ? "Eventos mensuales en persona y virtuales para practicar habilidades sociales mientras se divierte."
                    : "Monthly in-person and virtual events to practice social skills while having fun."}
                </p>
                <span className="text-xs text-[#06B6D4]">{isSpanish ? "Tercer viernes del mes" : "Third Friday of each month"}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="assessments" className="mt-0">
          <div className="bg-[#1e1e1e]/20 backdrop-blur-sm rounded-xl border border-[#06B6D4]/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#06B6D4]">
              {isSpanish ? "Evaluaciones de Habilidades Sociales" : "Social Skills Assessments"}
            </h3>
            <p className="mb-6">
              {isSpanish 
                ? "Estas evaluaciones te ayudarán a entender tus fortalezas y áreas de mejora en habilidades sociales y conexión interpersonal."
                : "These assessments will help you understand your strengths and areas for improvement in social skills and interpersonal connection."}
            </p>
            <div className="space-y-4">
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Evaluación de Habilidades Sociales" : "Social Skills Assessment"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Evalúa tu capacidad para comunicarte eficazmente y conectar con los demás."
                    : "Evaluates your ability to effectively communicate and connect with others."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#06B6D4] hover:underline">
                    {isSpanish ? "Comenzar evaluación" : "Start assessment"}
                  </button>
                </div>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Índice de Ansiedad Social" : "Social Anxiety Index"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Mide los niveles de ansiedad en diferentes situaciones sociales."
                    : "Measures anxiety levels in different social situations."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#06B6D4] hover:underline">
                    {isSpanish ? "Comenzar evaluación" : "Start assessment"}
                  </button>
                </div>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Evaluación de Redes Sociales" : "Social Network Assessment"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Analiza la fortaleza y diversidad de tus conexiones sociales actuales."
                    : "Analyzes the strength and diversity of your current social connections."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#06B6D4] hover:underline">
                    {isSpanish ? "Comenzar evaluación" : "Start assessment"}
                  </button>
                </div>
              </div>
              <div className="bg-[#1e1e1e]/30 p-4 rounded-lg border border-[#06B6D4]/10">
                <h4 className="font-medium mb-2">{isSpanish ? "Estilos de Comunicación" : "Communication Styles"}</h4>
                <p className="text-sm">
                  {isSpanish 
                    ? "Identifica tus patrones de comunicación y cómo afectan tus interacciones."
                    : "Identify your communication patterns and how they affect your interactions."}
                </p>
                <div className="mt-3 flex justify-end">
                  <button className="text-sm text-[#06B6D4] hover:underline">
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

export default SocialPortal;
