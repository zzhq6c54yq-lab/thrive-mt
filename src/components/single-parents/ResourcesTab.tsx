import React from "react";
import FeatureCard from "./FeatureCard";
import { DollarSign, Scale, Baby, GraduationCap, Heart, Phone } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface ResourcesTabProps {
  onFeatureClick: (path: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();

  const features = [
    {
      title: isSpanish ? "Asistencia Financiera" : "Financial Assistance Programs",
      description: isSpanish 
        ? "Acceso a recursos y programas de apoyo financiero"
        : "Access to financial support resources and programs",
      icon: DollarSign,
      color: "bg-green-500",
      path: "financial-assistance"
    },
    {
      title: isSpanish ? "Recursos Legales" : "Legal Resources",
      description: isSpanish 
        ? "Guía y apoyo para asuntos legales de custodia"
        : "Guidance and support for custody legal matters",
      icon: Scale,
      color: "bg-blue-500",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Soluciones de Cuidado Infantil" : "Childcare Solutions",
      description: isSpanish 
        ? "Encontrar y evaluar opciones de cuidado infantil"
        : "Find and evaluate childcare options",
      icon: Baby,
      color: "bg-purple-500",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Apoyo Educativo" : "Educational Support",
      description: isSpanish 
        ? "Recursos para el éxito académico de tus hijos"
        : "Resources for your children's academic success",
      icon: GraduationCap,
      color: "bg-indigo-500",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Navegación de Salud" : "Healthcare Navigation",
      description: isSpanish 
        ? "Ayuda para encontrar y acceder a servicios de salud"
        : "Help finding and accessing healthcare services",
      icon: Heart,
      color: "bg-rose-500",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Recursos de Emergencia" : "Emergency Resources",
      description: isSpanish 
        ? "Acceso rápido a ayuda en situaciones de emergencia"
        : "Quick access to help in emergency situations",
      icon: Phone,
      color: "bg-red-500",
      path: "crisis-support"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isSpanish ? "Recursos y Apoyo" : "Resources & Support"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Accede a recursos comunitarios y apoyo"
            : "Access community resources and support"}
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

export default ResourcesTab;
