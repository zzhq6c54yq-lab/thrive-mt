
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Brain, HeartPulse, Users, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const FeatureCard = ({ title, description, icon: Icon, color, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col h-full`}
  >
    <div className={`p-3 rounded-full ${color} mb-4 inline-flex self-start`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm flex-grow">{description}</p>
  </div>
);

const CollegePortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para estudiantes universitarios" : "Accessing specific resources for college students",
      duration: 2000
    });
    
    navigate(`/${feature}`);
  };

  const collegeFeatures = [
    {
      title: isSpanish ? "Manejo del Estrés Académico" : "Academic Stress Management",
      description: isSpanish 
        ? "Herramientas y técnicas para manejar la presión de exámenes, plazos y carga de trabajo" 
        : "Tools and techniques for managing exam pressure, deadlines, and workload",
      icon: BookOpen,
      color: "bg-blue-600",
      path: "workshops"
    },
    {
      title: isSpanish ? "Equilibrio de Vida" : "Life Balance", 
      description: isSpanish 
        ? "Estrategias para equilibrar los estudios, la vida social, el trabajo y el autocuidado" 
        : "Strategies for balancing studies, social life, work, and self-care",
      icon: Coffee,
      color: "bg-purple-600",
      path: "wellness-challenges"
    },
    {
      title: isSpanish ? "Bienestar Mental" : "Mental Wellbeing",
      description: isSpanish 
        ? "Recursos para la ansiedad, depresión y otros desafíos comunes de salud mental" 
        : "Resources for anxiety, depression, and other common mental health challenges",
      icon: Brain,
      color: "bg-emerald-600",
      path: "mental-wellness"
    },
    {
      title: isSpanish ? "Apoyo Entre Pares" : "Peer Support",
      description: isSpanish 
        ? "Conéctate con otros estudiantes para compartir experiencias y consejos" 
        : "Connect with other students to share experiences and advice",
      icon: Users,
      color: "bg-amber-600",
      path: "community-support"
    },
    {
      title: isSpanish ? "Hábitos Saludables" : "Healthy Habits",
      description: isSpanish 
        ? "Consejos para dormir, nutrición y ejercicio adaptados a la vida universitaria" 
        : "Sleep, nutrition, and exercise tips tailored for college life",
      icon: HeartPulse,
      color: "bg-rose-600",
      path: "holistic-wellness"
    },
    {
      title: isSpanish ? "Éxito Académico" : "Academic Success",
      description: isSpanish 
        ? "Técnicas de estudio, gestión del tiempo y estrategias para mejorar el rendimiento" 
        : "Study techniques, time management, and strategies to improve performance",
      icon: GraduationCap,
      color: "bg-cyan-600",
      path: "resource-library"
    }
  ];

  return (
    <Page title={isSpanish ? "La Experiencia Universitaria" : "The College Experience"} returnToMain>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#8B5CF6]/30 to-[#6366F1]/30 p-6 rounded-xl backdrop-blur-md border border-purple-500/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <GraduationCap className="h-10 w-10 text-[#8B5CF6]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Bienestar Mental para Estudiantes Universitarios" : "Mental Wellness for College Students"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados para ayudarte a navegar los desafíos únicos de la vida universitaria mientras priorizas tu salud mental y bienestar."
                  : "Specialized resources to help you navigate the unique challenges of college life while prioritizing your mental health and wellbeing."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collegeFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              onClick={() => handleFeatureClick(feature.path)}
            />
          ))}
        </div>
      </div>
    </Page>
  );
};

export default CollegePortal;
