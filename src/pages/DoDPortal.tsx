
import React from "react";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Briefcase, Globe, BookOpen, HeartPulse } from "lucide-react";
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

const DoDPortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating", 
      description: isSpanish ? "Accediendo a recursos específicos para personal militar" : "Accessing specific resources for military personnel",
      duration: 2000
    });
    
    navigate(`/${feature}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  const dodFeatures = [
    {
      title: isSpanish ? "Apoyo para PTSD" : "PTSD Support",
      description: isSpanish 
        ? "Recursos especializados para el manejo del trastorno de estrés postraumático" 
        : "Specialized resources for managing post-traumatic stress disorder",
      icon: Shield,
      color: "bg-blue-600",
      path: "mental-wellness"
    },
    {
      title: isSpanish ? "Transición a la Vida Civil" : "Transition to Civilian Life", 
      description: isSpanish 
        ? "Apoyo para una transición exitosa a la vida después del servicio militar" 
        : "Support for a successful transition to life after military service",
      icon: Briefcase,
      color: "bg-purple-600",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Apoyo Familiar" : "Family Support",
      description: isSpanish 
        ? "Recursos para las familias de personal militar durante el despliegue y después" 
        : "Resources for military families during deployment and beyond",
      icon: HeartPulse,
      color: "bg-emerald-600",
      path: "family-resources"
    },
    {
      title: isSpanish ? "Comunidad de Veteranos" : "Veteran Community",
      description: isSpanish 
        ? "Conéctate con otros veteranos para compartir experiencias y apoyo" 
        : "Connect with other veterans for shared experiences and support",
      icon: Globe,
      color: "bg-amber-600",
      path: "community-support"
    },
    {
      title: isSpanish ? "Manejo del Estrés en Combate" : "Combat Stress Management",
      description: isSpanish 
        ? "Técnicas y herramientas específicas para el manejo del estrés en situaciones de combate" 
        : "Specific techniques and tools for managing stress in combat situations",
      icon: Sparkles,
      color: "bg-rose-600",
      path: "workshops"
    },
    {
      title: isSpanish ? "Educación y Entrenamiento" : "Education & Training",
      description: isSpanish 
        ? "Oportunidades educativas y de entrenamiento para personal militar y veteranos" 
        : "Educational and training opportunities for military personnel and veterans",
      icon: BookOpen,
      color: "bg-cyan-600",
      path: "resource-library"
    }
  ];

  return (
    <Page title={isSpanish ? "Departamento de Defensa" : "Department of Defense"} returnToMain>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#0EA5E9]/30 to-[#2563EB]/30 p-6 rounded-xl backdrop-blur-md border border-blue-500/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <Shield className="h-10 w-10 text-[#0EA5E9]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSpanish ? "Recursos para el Personal Militar y Veteranos" : "Resources for Military Personnel & Veterans"}
              </h2>
              <p className="text-white/80">
                {isSpanish 
                  ? "Recursos especializados de bienestar mental diseñados específicamente para miembros actuales y anteriores de las fuerzas armadas y sus familias."
                  : "Specialized mental wellness resources designed specifically for current and former members of the armed forces and their families."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dodFeatures.map((feature, index) => (
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

export default DoDPortal;
