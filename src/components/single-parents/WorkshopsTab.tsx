import React from "react";
import FeatureCard from "./FeatureCard";
import { Briefcase, Users, DollarSign, Heart, Shield, Calendar } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface WorkshopsTabProps {
  onFeatureClick: (path: string) => void;
}

const WorkshopsTab: React.FC<WorkshopsTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();

  const features = [
    {
      title: isSpanish ? "Integración Trabajo-Vida" : "Work-Life Integration",
      description: isSpanish 
        ? "Estrategias para equilibrar carrera y familia"
        : "Strategies to balance career and family",
      icon: Briefcase,
      color: "bg-blue-500",
      path: "workshops"
    },
    {
      title: isSpanish ? "Construyendo tu Red de Apoyo" : "Building Your Support Network",
      description: isSpanish 
        ? "Crear y mantener conexiones significativas"
        : "Create and maintain meaningful connections",
      icon: Users,
      color: "bg-purple-500",
      path: "community-support"
    },
    {
      title: isSpanish ? "Planificación Financiera" : "Financial Planning",
      description: isSpanish 
        ? "Talleres sobre presupuesto y seguridad financiera"
        : "Workshops on budgeting and financial security",
      icon: DollarSign,
      color: "bg-green-500",
      path: "workshops"
    },
    {
      title: isSpanish ? "Autocompasión para Padres" : "Self-Compassion for Parents",
      description: isSpanish 
        ? "Prácticas para reducir la autocrítica"
        : "Practices to reduce self-criticism",
      icon: Heart,
      color: "bg-rose-500",
      path: "guided-practice/self-compassion"
    },
    {
      title: isSpanish ? "Manejo de Culpa Parental" : "Managing Parenting Guilt",
      description: isSpanish 
        ? "Herramientas para procesar y liberar la culpa"
        : "Tools to process and release guilt",
      icon: Shield,
      color: "bg-indigo-500",
      path: "workshops"
    },
    {
      title: isSpanish ? "Eventos en Vivo" : "Upcoming Live Events",
      description: isSpanish 
        ? "Únete a talleres y reuniones virtuales"
        : "Join virtual workshops and meetups",
      icon: Calendar,
      color: "bg-orange-500",
      path: "virtual-meetings"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isSpanish ? "Talleres y Eventos" : "Workshops & Events"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Aprende y conecta a través de talleres grupales"
            : "Learn and connect through group workshops"}
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

export default WorkshopsTab;
