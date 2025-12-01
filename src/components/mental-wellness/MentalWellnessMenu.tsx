
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import {
  Brain,
  HeartPulse,
  Sparkles,
  Book,
  MessageSquare,
  CalendarDays,
  Activity,
  Feather,
  Leaf,
  Moon,
  CheckCircle,
  Headphones,
  FileText,
  Users
} from "lucide-react";

interface MentalWellnessMenuProps {
  onNavigate: (path: string) => void;
  showAssessmentTab?: boolean;
}

const MentalWellnessMenu: React.FC<MentalWellnessMenuProps> = ({ 
  onNavigate,
  showAssessmentTab = true
}) => {
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  const navigate = useNavigate();
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const handleFeatureClick = (path: string, name: string) => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? `Abriendo ${name}` : `Opening ${name}`,
      duration: 1500,
    });
    
    onNavigate(path);
  };

  const resources = [
    {
      id: "mindfulness",
      name: isSpanish ? "Meditación y Mindfulness" : "Meditation & Mindfulness",
      icon: <Brain className="h-5 w-5 text-violet-500" />,
      path: "/mindfulness-sleep",
      color: "from-violet-200/80 to-violet-100 hover:from-violet-300/80 hover:to-violet-200",
      textColor: "text-violet-800"
    },
    {
      id: "binaural",
      name: isSpanish ? "Tonos Binaurales" : "Binaural Beats",
      icon: <Headphones className="h-5 w-5 text-indigo-500" />,
      path: "/binaural-beats",
      color: "from-indigo-200/80 to-indigo-100 hover:from-indigo-300/80 hover:to-indigo-200",
      textColor: "text-indigo-800"
    },
    {
      id: "journaling",
      name: isSpanish ? "Diario Personal" : "Journaling",
      icon: <Book className="h-5 w-5 text-emerald-500" />,
      path: "/journaling",
      color: "from-emerald-200/80 to-emerald-100 hover:from-emerald-300/80 hover:to-emerald-200",
      textColor: "text-emerald-800"
    },
    {
      id: "alternative",
      name: isSpanish ? "Terapias Alternativas" : "Alternative Therapies",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      path: "/alternative-therapies",
      color: "from-green-200/80 to-green-100 hover:from-green-300/80 hover:to-green-200",
      textColor: "text-green-800"
    },
    {
      id: "sleep",
      name: isSpanish ? "Ayuda para Dormir" : "Sleep Support",
      icon: <Moon className="h-5 w-5 text-blue-500" />,
      path: "/mindfulness-sleep",
      color: "from-blue-200/80 to-blue-100 hover:from-blue-300/80 hover:to-blue-200",
      textColor: "text-blue-800"
    },
    {
      id: "video",
      name: isSpanish ? "Diario en Video" : "Video Diary",
      icon: <MessageSquare className="h-5 w-5 text-amber-500" />,
      path: "/video-diary",
      color: "from-amber-200/80 to-amber-100 hover:from-amber-300/80 hover:to-amber-200",
      textColor: "text-amber-800"
    }
  ];

  const assessments = [
    {
      id: "mental-health",
      name: isSpanish ? "Salud Mental General" : "General Mental Health",
      icon: <HeartPulse className="h-5 w-5 text-red-500" />,
      description: isSpanish ? "Evalúa tu bienestar general" : "Assess your overall wellbeing",
      color: "from-red-200/80 to-red-100 hover:from-red-300/80 hover:to-red-200",
      textColor: "text-red-800"
    },
    {
      id: "anxiety",
      name: isSpanish ? "Evaluación de Ansiedad" : "Anxiety Assessment",
      icon: <Activity className="h-5 w-5 text-orange-500" />,
      description: isSpanish ? "Mide tus niveles de ansiedad" : "Measure your anxiety levels",
      color: "from-orange-200/80 to-orange-100 hover:from-orange-300/80 hover:to-orange-200",
      textColor: "text-orange-800"
    },
    {
      id: "mood",
      name: isSpanish ? "Evaluación del Estado de Ánimo" : "Mood Assessment",
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      description: isSpanish ? "Rastrea tu estado de ánimo" : "Track your mood patterns",
      color: "from-amber-200/80 to-amber-100 hover:from-amber-300/80 hover:to-amber-200",
      textColor: "text-amber-800"
    },
    {
      id: "stress",
      name: isSpanish ? "Evaluación de Estrés" : "Stress Assessment",
      icon: <Feather className="h-5 w-5 text-teal-500" />,
      description: isSpanish ? "Identifica tus factores de estrés" : "Identify your stress factors",
      color: "from-teal-200/80 to-teal-100 hover:from-teal-300/80 hover:to-teal-200",
      textColor: "text-teal-800"
    }
  ];

  const programs = [
    {
      id: "wellness-challenge",
      name: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      path: "/wellness-challenges",
      color: "from-green-200/80 to-green-100 hover:from-green-300/80 hover:to-green-200",
      textColor: "text-green-800"
    },
    {
      id: "community-support",
      name: isSpanish ? "Grupos de Apoyo" : "Support Groups",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      path: "/community-support",
      color: "from-purple-200/80 to-purple-100 hover:from-purple-300/80 hover:to-purple-200",
      textColor: "text-purple-800"
    },
    {
      id: "workshops",
      name: isSpanish ? "Talleres de Bienestar" : "Wellness Workshops",
      icon: <CalendarDays className="h-5 w-5 text-blue-500" />,
      path: "/workshops",
      color: "from-blue-200/80 to-blue-100 hover:from-blue-300/80 hover:to-blue-200",
      textColor: "text-blue-800"
    },
    {
      id: "resources",
      name: isSpanish ? "Biblioteca de Recursos" : "Resource Library",
      icon: <FileText className="h-5 w-5 text-indigo-500" />,
      path: "/resource-library",
      color: "from-indigo-200/80 to-indigo-100 hover:from-indigo-300/80 hover:to-indigo-200",
      textColor: "text-indigo-800"
    }
  ];
  
  const handleAssessmentClick = (assessmentId: string, assessmentName: string) => {
    toast({
      title: isSpanish ? "Iniciando Evaluación" : "Starting Assessment",
      description: isSpanish ? `Preparando ${assessmentName}` : `Preparing ${assessmentName}`,
      duration: 1500,
    });
    
    // Navigate to mental wellness with assessment parameter
    navigate("/app/mental-wellness", {
      state: {
        activeTab: "assessments",
        startAssessment: true,
        assessmentId: assessmentId,
        preventTutorial: true
      }
    });
  };

  return (
    <Tabs defaultValue="resources" className="w-full">
      <TabsList className="grid grid-cols-2 sm:grid-cols-3 w-full bg-slate-100/30 backdrop-blur-sm mb-6 p-1 rounded-lg">
        <TabsTrigger value="resources" className="data-[state=active]:bg-white">
          <span className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            {isSpanish ? "Recursos" : "Resources"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger value="programs" className="data-[state=active]:bg-white">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {isSpanish ? "Programas" : "Programs"}
          </span>
        </TabsTrigger>
        
        {showAssessmentTab && (
          <TabsTrigger value="assessments" className="data-[state=active]:bg-white">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {isSpanish ? "Evaluaciones" : "Assessments"}
            </span>
          </TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="resources" className="mt-0">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {resources.map((resource) => (
            <motion.div key={resource.id} variants={item}>
              <Button
                variant="ghost"
                className={`w-full h-auto p-0 overflow-hidden block`}
                onClick={() => handleFeatureClick(resource.path, resource.name)}
              >
                <Card className={`w-full border-none overflow-hidden hover:shadow-md transition-all duration-200`}>
                  <CardContent className={`p-0`}>
                    <div className={`flex items-center gap-4 p-4 bg-gradient-to-br ${resource.color} transition-colors duration-300`}>
                      <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full">
                        {resource.icon}
                      </div>
                      <span className={`font-medium ${resource.textColor}`}>
                        {resource.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </TabsContent>
      
      <TabsContent value="programs" className="mt-0">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {programs.map((program) => (
            <motion.div key={program.id} variants={item}>
              <Button
                variant="ghost"
                className={`w-full h-auto p-0 overflow-hidden block`}
                onClick={() => handleFeatureClick(program.path, program.name)}
              >
                <Card className={`w-full border-none overflow-hidden hover:shadow-md transition-all duration-200`}>
                  <CardContent className={`p-0`}>
                    <div className={`flex items-center gap-4 p-4 bg-gradient-to-br ${program.color} transition-colors duration-300`}>
                      <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full">
                        {program.icon}
                      </div>
                      <span className={`font-medium ${program.textColor}`}>
                        {program.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </TabsContent>
      
      {showAssessmentTab && (
        <TabsContent value="assessments" className="mt-0">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {assessments.map((assessment) => (
              <motion.div key={assessment.id} variants={item}>
                <Button
                  variant="ghost"
                  className={`w-full h-auto p-0 overflow-hidden block`}
                  onClick={() => handleAssessmentClick(assessment.id, assessment.name)}
                >
                  <Card className={`w-full border-none overflow-hidden hover:shadow-md transition-all duration-200`}>
                    <CardContent className={`p-0`}>
                      <div className={`flex items-center gap-4 p-4 bg-gradient-to-br ${assessment.color} transition-colors duration-300`}>
                        <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full">
                          {assessment.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-medium ${assessment.textColor}`}>
                            {assessment.name}
                          </span>
                          <span className={`text-xs ${assessment.textColor}/70`}>
                            {assessment.description}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default MentalWellnessMenu;
