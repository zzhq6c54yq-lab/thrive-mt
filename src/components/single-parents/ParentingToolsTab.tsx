import React from "react";
import FeatureCard from "./FeatureCard";
import { Baby, MessageCircle, Users, TrendingUp, Zap, Heart, BookOpen, Shield, Gamepad2 } from "lucide-react";
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
      coverImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
      path: "family-resources"
    },
    {
      title: isSpanish ? "Disciplina Positiva" : "Positive Discipline Strategies",
      description: isSpanish 
        ? "Técnicas efectivas para guiar el comportamiento"
        : "Effective techniques for guiding behavior",
      icon: Heart,
      color: "bg-green-500",
      coverImage: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Comunicación Co-Parental" : "Co-Parenting Communication",
      description: isSpanish 
        ? "Herramientas para una comunicación efectiva"
        : "Tools for effective communication",
      icon: MessageCircle,
      color: "bg-blue-500",
      coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Manejo de Transiciones" : "Managing Transitions",
      description: isSpanish 
        ? "Apoyo durante cambios y nuevas rutinas"
        : "Support during changes and new routines",
      icon: TrendingUp,
      color: "bg-purple-500",
      coverImage: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
      path: "workshops"
    },
    {
      title: isSpanish ? "Desafíos Adolescentes" : "Teen Challenges",
      description: isSpanish 
        ? "Navegando la adolescencia como padre soltero"
        : "Navigating adolescence as a single parent",
      icon: Zap,
      color: "bg-orange-500",
      coverImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      path: "adolescent-welcome"
    },
    {
      title: isSpanish ? "Apoyo para Necesidades Especiales" : "Special Needs Support",
      description: isSpanish 
        ? "Recursos para niños con necesidades especiales"
        : "Resources for children with special needs",
      icon: Users,
      color: "bg-indigo-500",
      coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Límites Saludables" : "Healthy Boundaries",
      description: isSpanish 
        ? "Establecer límites sanos con los hijos y la familia extendida"
        : "Setting healthy boundaries with children and extended family",
      icon: Shield,
      color: "bg-rose-500",
      coverImage: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&w=800&q=80",
      path: "workshops"
    },
    {
      title: isSpanish ? "Lectura Guiada" : "Guided Reading Resources",
      description: isSpanish 
        ? "Libros y artículos recomendados para crianza consciente"
        : "Recommended books and articles for mindful parenting",
      icon: BookOpen,
      color: "bg-amber-500",
      coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Juegos Familiares" : "Family Bonding Games",
      description: isSpanish 
        ? "Actividades divertidas para fortalecer el vínculo familiar"
        : "Fun activities to strengthen the family bond",
      icon: Gamepad2,
      color: "bg-pink-500",
      coverImage: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&w=800&q=80",
      path: "games-and-quizzes"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
            coverImage={feature.coverImage}
            onClick={() => onFeatureClick(feature.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentingToolsTab;
