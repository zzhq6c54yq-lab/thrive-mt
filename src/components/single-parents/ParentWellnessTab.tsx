import React from "react";
import FeatureCard from "./FeatureCard";
import { Heart, Brain, Sparkles, Shield, Users as UsersIcon, Phone, Smile, BookOpen, Flower2 } from "lucide-react";
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
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      path: "mental-wellness"
    },
    {
      title: isSpanish ? "Prevención del Agotamiento" : "Burnout Prevention",
      description: isSpanish 
        ? "Evaluación y estrategias para prevenir el agotamiento"
        : "Assessment and strategies to prevent burnout",
      icon: Shield,
      color: "bg-purple-500",
      coverImage: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
      path: "single-parents-assessments/burnout"
    },
    {
      title: isSpanish ? "Estrategias de Autocuidado" : "Self-Care Strategies",
      description: isSpanish 
        ? "Prácticas guiadas para el cuidado personal"
        : "Guided practices for personal care",
      icon: Heart,
      color: "bg-rose-500",
      coverImage: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=800&q=80",
      path: "guided-practice/self-care"
    },
    {
      title: isSpanish ? "Resiliencia Emocional" : "Emotional Resilience",
      description: isSpanish 
        ? "Desarrollo de fortaleza emocional y adaptabilidad"
        : "Build emotional strength and adaptability",
      icon: Sparkles,
      color: "bg-indigo-500",
      coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
      path: "workshops"
    },
    {
      title: isSpanish ? "Citas y Relaciones" : "Dating & Relationships",
      description: isSpanish 
        ? "Navegando nuevas relaciones como padre soltero"
        : "Navigating new relationships as a single parent",
      icon: UsersIcon,
      color: "bg-pink-500",
      coverImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Apoyo en Crisis" : "Crisis Support",
      description: isSpanish 
        ? "Recursos inmediatos para momentos difíciles"
        : "Immediate resources for difficult moments",
      icon: Phone,
      color: "bg-red-500",
      coverImage: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80",
      path: "crisis-support"
    },
    {
      title: isSpanish ? "Meditación Guiada" : "Guided Meditation",
      description: isSpanish 
        ? "Sesiones de meditación diseñadas para padres ocupados"
        : "Meditation sessions designed for busy parents",
      icon: Flower2,
      color: "bg-cyan-500",
      coverImage: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
      path: "meditation-studio"
    },
    {
      title: isSpanish ? "Diario de Gratitud" : "Gratitude Journaling",
      description: isSpanish 
        ? "Reflexión diaria para cultivar positividad y esperanza"
        : "Daily reflection to cultivate positivity and hope",
      icon: BookOpen,
      color: "bg-amber-500",
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
      path: "journal"
    },
    {
      title: isSpanish ? "Impulso de Ánimo" : "Mood Boost Activities",
      description: isSpanish 
        ? "Actividades rápidas respaldadas por la ciencia para mejorar tu ánimo"
        : "Quick science-backed activities to lift your spirits",
      icon: Smile,
      color: "bg-orange-500",
      coverImage: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      path: "mental-wellness-tools/mood-boost"
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

export default ParentWellnessTab;
