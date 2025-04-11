
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, Brain, BookOpen, FileText, ChartBar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import BackButton from "@/components/navigation/BackButton";
import HomeButton from "@/components/HomeButton";

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("wellness");

  const handleFeatureClick = (path: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating",
      description: isSpanish 
        ? "Accediendo a recursos específicos" 
        : "Accessing specific resources",
      duration: 2000
    });
    
    navigate(`/${path}`, { 
      state: { 
        fromEmployeeDashboard: true, 
        preventTutorial: true,
        returnToPortal: "/employee-dashboard"
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#283052] via-[#2b3658] to-[#1f2942] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              {isSpanish ? "Portal para Empleados" : "Employee Portal"}
            </h1>
          </div>
          <HomeButton />
        </div>
        
        <div className="mb-8 bg-blue-900/20 backdrop-blur-md p-6 rounded-xl border border-blue-700/30">
          <h2 className="text-xl font-semibold mb-3 text-blue-200">
            {isSpanish 
              ? "Bienestar en el Trabajo para Empleados de Pequeñas Empresas" 
              : "Workplace Wellness for Small Business Employees"}
          </h2>
          <p className="text-white/80 mb-4">
            {isSpanish 
              ? "Recursos diseñados específicamente para apoyar tu bienestar mental en el entorno único de una pequeña empresa."
              : "Resources specifically designed to support your mental wellbeing in the unique small business environment."}
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-blue-800/30 px-3 py-1 rounded-full text-sm text-blue-200 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" />
              <span>{isSpanish ? "Manejo del Estrés" : "Stress Management"}</span>
            </div>
            <div className="bg-indigo-800/30 px-3 py-1 rounded-full text-sm text-indigo-200 flex items-center gap-1">
              <ChartBar className="w-3.5 h-3.5" />
              <span>{isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance"}</span>
            </div>
            <div className="bg-purple-800/30 px-3 py-1 rounded-full text-sm text-purple-200 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{isSpanish ? "Apoyo Comunitario" : "Community Support"}</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="wellness" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-blue-900/20 border border-blue-800/30">
            <TabsTrigger value="wellness" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              <div className="flex flex-col items-center gap-1 py-1">
                <Building className="h-5 w-5" />
                <span>{isSpanish ? "Bienestar" : "Wellness"}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              <div className="flex flex-col items-center gap-1 py-1">
                <BookOpen className="h-5 w-5" />
                <span>{isSpanish ? "Recursos" : "Resources"}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              <div className="flex flex-col items-center gap-1 py-1">
                <Users className="h-5 w-5" />
                <span>{isSpanish ? "Comunidad" : "Community"}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="assessments" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              <div className="flex flex-col items-center gap-1 py-1">
                <FileText className="h-5 w-5" />
                <span>{isSpanish ? "Evaluaciones" : "Assessments"}</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wellness" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Manejo del Estrés" : "Stress Management"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Técnicas adaptadas al entorno de pequeñas empresas" 
                      : "Techniques tailored to small business environments"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Herramientas prácticas para manejar los factores de estrés específicos de trabajar en equipos pequeños con múltiples responsabilidades"
                      : "Practical tools to handle the specific stressors of working in small teams with multiple responsibilities"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600/50 text-blue-300 hover:bg-blue-800/30"
                    onClick={() => handleFeatureClick("mental-wellness")}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <ChartBar className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Estableciendo límites saludables" 
                      : "Establishing healthy boundaries"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Estrategias para mantener separación entre el trabajo y la vida personal cuando los roles a menudo se superponen en pequeñas empresas"
                      : "Strategies for maintaining separation between work and personal life when roles often overlap in small businesses"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-indigo-600/50 text-indigo-300 hover:bg-indigo-800/30"
                    onClick={() => handleFeatureClick("wellness-challenges")}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-purple-600 to-blue-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Bienestar en el Trabajo" : "Workplace Wellness"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Crear un entorno de trabajo saludable" 
                      : "Creating a healthy work environment"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Consejos prácticos para fomentar un espacio de trabajo que apoye el bienestar mental en empresas con recursos limitados"
                      : "Practical tips for fostering a workspace that supports mental wellbeing in companies with limited resources"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-600/50 text-purple-300 hover:bg-purple-800/30"
                    onClick={() => handleFeatureClick("employee-readiness")}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-green-600 to-teal-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Biblioteca de Recursos" : "Resource Library"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Guías y artículos especializados" 
                      : "Specialized guides and articles"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Accede a una colección de recursos sobre salud mental en el contexto laboral de pequeñas empresas"
                      : "Access a collection of resources about mental health in the small business workplace context"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600/50 text-green-300 hover:bg-green-800/30"
                    onClick={() => handleFeatureClick("resource-library")}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-amber-600 to-orange-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Desarrollo Profesional" : "Professional Development"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Crecimiento profesional y bienestar" 
                      : "Career growth and wellbeing"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Recursos para equilibrar el avance profesional mientras mantienes tu salud mental como prioridad"
                      : "Resources for balancing career advancement while keeping your mental health a priority"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-600/50 text-amber-300 hover:bg-amber-800/30"
                    onClick={() => handleFeatureClick("workshops")}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-red-600 to-pink-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Técnicas de Mindfulness" : "Mindfulness Techniques"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Prácticas para el trabajo diario" 
                      : "Practices for daily work"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Ejercicios de mindfulness que puedes integrar en tu rutina laboral, incluso en un ambiente ocupado"
                      : "Mindfulness exercises you can integrate into your work routine, even in a busy environment"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-600/50 text-red-300 hover:bg-red-800/30"
                    onClick={() => handleFeatureClick("mindfulness-sleep")}
                  >
                    {isSpanish ? "Explorar" : "Explore"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-purple-600 to-pink-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Grupos de Apoyo" : "Support Groups"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Conéctate con personas en situaciones similares" 
                      : "Connect with people in similar situations"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Grupos de apoyo donde puedes compartir experiencias y consejos con otros empleados de pequeñas empresas"
                      : "Support groups where you can share experiences and advice with other small business employees"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-600/50 text-purple-300 hover:bg-purple-800/30"
                    onClick={() => handleFeatureClick("community-support")}
                  >
                    {isSpanish ? "Unirse" : "Join"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-cyan-600 to-blue-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Talleres Colaborativos" : "Collaborative Workshops"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Aprende y comparte con colegas" 
                      : "Learn and share with colleagues"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Talleres interactivos donde puedes desarrollar habilidades junto a otros profesionales en pequeñas empresas"
                      : "Interactive workshops where you can develop skills alongside other small business professionals"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-cyan-600/50 text-cyan-300 hover:bg-cyan-800/30"
                    onClick={() => handleFeatureClick("workshops")}
                  >
                    {isSpanish ? "Participar" : "Participate"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="assessments" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-indigo-600 to-blue-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Evaluación de Estrés Laboral" : "Workplace Stress Assessment"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Mide tus niveles de estrés en el trabajo" 
                      : "Measure your stress levels at work"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Una evaluación personalizada para identificar los principales factores de estrés en tu entorno laboral actual"
                      : "A personalized assessment to identify the main stressors in your current work environment"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-indigo-600/50 text-indigo-300 hover:bg-indigo-800/30"
                    onClick={() => handleFeatureClick("mental-wellness/assessments")}
                  >
                    {isSpanish ? "Comenzar" : "Start"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-emerald-600 to-green-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Evalúa la integración de tu vida laboral y personal" 
                      : "Assess your work and personal life integration"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Una evaluación que te ayuda a identificar áreas donde podrías necesitar establecer mejores límites entre el trabajo y la vida personal"
                      : "An assessment that helps you identify areas where you might need to establish better boundaries between work and personal life"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-emerald-600/50 text-emerald-300 hover:bg-emerald-800/30"
                    onClick={() => handleFeatureClick("mental-wellness/assessments")}
                  >
                    {isSpanish ? "Comenzar" : "Start"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-blue-900/20 border-blue-800/30">
                <CardHeader>
                  <div className="bg-gradient-to-br from-amber-600 to-orange-800 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{isSpanish ? "Satisfacción Laboral" : "Job Satisfaction"}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isSpanish 
                      ? "Mide tu nivel de satisfacción profesional" 
                      : "Measure your professional satisfaction level"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    {isSpanish 
                      ? "Evalúa diversos aspectos de tu satisfacción laboral para identificar áreas que podrían estar afectando tu bienestar mental"
                      : "Evaluate various aspects of your job satisfaction to identify areas that might be affecting your mental wellbeing"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-600/50 text-amber-300 hover:bg-amber-800/30"
                    onClick={() => handleFeatureClick("mental-wellness/assessments")}
                  >
                    {isSpanish ? "Comenzar" : "Start"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
