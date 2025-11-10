import React from "react";
import FeatureCard from "./FeatureCard";
import { Heart, Brain, Sparkles, Shield, Users as UsersIcon, Phone } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface ParentWellnessTabProps {
  onFeatureClick: (path: string) => void;
}

const ParentWellnessTab: React.FC<ParentWellnessTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();

  const features = [
    {
      title: isSpanish ? "Manejo del Estrés" : "Stress Management",
      description: isSpanish 
        ? "Herramientas y técnicas para manejar el estrés diario"
        : "Tools and techniques for managing daily stress",
      icon: Brain,
      color: "bg-blue-500",
      path: "mental-wellness"
    },
    {
      title: isSpanish ? "Prevención del Agotamiento" : "Burnout Prevention",
      description: isSpanish 
        ? "Evaluación y estrategias para prevenir el agotamiento"
        : "Assessment and strategies to prevent burnout",
      icon: Shield,
      color: "bg-purple-500",
      path: "single-parents-assessments/burnout"
    },
    {
      title: isSpanish ? "Estrategias de Autocuidado" : "Self-Care Strategies",
      description: isSpanish 
        ? "Prácticas guiadas para el cuidado personal"
        : "Guided practices for personal care",
      icon: Heart,
      color: "bg-rose-500",
      path: "guided-practice/self-care"
    },
    {
      title: isSpanish ? "Resiliencia Emocional" : "Emotional Resilience",
      description: isSpanish 
        ? "Desarrollo de fortaleza emocional y adaptabilidad"
        : "Build emotional strength and adaptability",
      icon: Sparkles,
      color: "bg-indigo-500",
      path: "workshops"
    },
    {
      title: isSpanish ? "Citas y Relaciones" : "Dating & Relationships",
      description: isSpanish 
        ? "Navegando nuevas relaciones como padre soltero"
        : "Navigating new relationships as a single parent",
      icon: UsersIcon,
      color: "bg-pink-500",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Apoyo en Crisis" : "Crisis Support",
      description: isSpanish 
        ? "Recursos inmediatos para momentos difíciles"
        : "Immediate resources for difficult moments",
      icon: Phone,
      color: "bg-red-500",
      path: "crisis-support"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isSpanish ? "Bienestar del Padre" : "Parent Wellness"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Cuida de ti mismo para que puedas cuidar mejor a tus hijos"
            : "Take care of yourself so you can better care for your children"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.path}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
            onClick={() => onFeatureClick(feature.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentWellnessTab;
