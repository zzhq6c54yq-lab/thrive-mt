import React from "react";
import FeatureCard from "./FeatureCard";
import { Baby, MessageCircle, Users, TrendingUp, Zap, Heart } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface ParentingToolsTabProps {
  onFeatureClick: (path: string) => void;
}

const ParentingToolsTab: React.FC<ParentingToolsTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();

  const features = [
    {
      title: isSpanish ? "Guía por Edad" : "Age-Appropriate Guidance",
      description: isSpanish 
        ? "Consejos específicos para cada etapa de desarrollo"
        : "Specific advice for each developmental stage",
      icon: Baby,
      color: "bg-cyan-500",
      path: "family-resources"
    },
    {
      title: isSpanish ? "Disciplina Positiva" : "Positive Discipline Strategies",
      description: isSpanish 
        ? "Técnicas efectivas para guiar el comportamiento"
        : "Effective techniques for guiding behavior",
      icon: Heart,
      color: "bg-green-500",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Comunicación Co-Parental" : "Co-Parenting Communication",
      description: isSpanish 
        ? "Herramientas para una comunicación efectiva"
        : "Tools for effective communication",
      icon: MessageCircle,
      color: "bg-blue-500",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Manejo de Transiciones" : "Managing Transitions",
      description: isSpanish 
        ? "Apoyo durante cambios y nuevas rutinas"
        : "Support during changes and new routines",
      icon: TrendingUp,
      color: "bg-purple-500",
      path: "workshops"
    },
    {
      title: isSpanish ? "Desafíos Adolescentes" : "Teen Challenges",
      description: isSpanish 
        ? "Navegando la adolescencia como padre soltero"
        : "Navigating adolescence as a single parent",
      icon: Zap,
      color: "bg-orange-500",
      path: "adolescent-welcome"
    },
    {
      title: isSpanish ? "Apoyo para Necesidades Especiales" : "Special Needs Support",
      description: isSpanish 
        ? "Recursos para niños con necesidades especiales"
        : "Resources for children with special needs",
      icon: Users,
      color: "bg-indigo-500",
      path: "resource-library"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isSpanish ? "Herramientas de Crianza" : "Parenting Tools"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Recursos prácticos para apoyar tu viaje de crianza"
            : "Practical resources to support your parenting journey"}
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

export default ParentingToolsTab;
