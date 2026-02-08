import React from "react";
import FeatureCard from "./FeatureCard";
import { DollarSign, Scale, Baby, GraduationCap, Heart, Phone, Home, Briefcase, FileText } from "lucide-react";
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
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
      path: "financial-assistance"
    },
    {
      title: isSpanish ? "Recursos Legales" : "Legal Resources",
      description: isSpanish 
        ? "Guía y apoyo para asuntos legales de custodia"
        : "Guidance and support for custody legal matters",
      icon: Scale,
      color: "bg-blue-500",
      coverImage: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Soluciones de Cuidado Infantil" : "Childcare Solutions",
      description: isSpanish 
        ? "Encontrar y evaluar opciones de cuidado infantil"
        : "Find and evaluate childcare options",
      icon: Baby,
      color: "bg-purple-500",
      coverImage: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Apoyo Educativo" : "Educational Support",
      description: isSpanish 
        ? "Recursos para el éxito académico de tus hijos"
        : "Resources for your children's academic success",
      icon: GraduationCap,
      color: "bg-indigo-500",
      coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Navegación de Salud" : "Healthcare Navigation",
      description: isSpanish 
        ? "Ayuda para encontrar y acceder a servicios de salud"
        : "Help finding and accessing healthcare services",
      icon: Heart,
      color: "bg-rose-500",
      coverImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Recursos de Emergencia" : "Emergency Resources",
      description: isSpanish 
        ? "Acceso rápido a ayuda en situaciones de emergencia"
        : "Quick access to help in emergency situations",
      icon: Phone,
      color: "bg-red-500",
      coverImage: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80",
      path: "crisis-support"
    },
    {
      title: isSpanish ? "Recursos de Vivienda" : "Housing Resources",
      description: isSpanish 
        ? "Programas de asistencia para vivienda y estabilidad del hogar"
        : "Housing assistance programs and home stability",
      icon: Home,
      color: "bg-amber-500",
      coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Desarrollo Profesional" : "Career Development",
      description: isSpanish 
        ? "Oportunidades de formación y desarrollo laboral"
        : "Training opportunities and career growth",
      icon: Briefcase,
      color: "bg-cyan-500",
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      path: "career-coaching"
    },
    {
      title: isSpanish ? "Documentos y Formularios" : "Documents & Forms",
      description: isSpanish 
        ? "Plantillas y formularios útiles para padres solteros"
        : "Helpful templates and forms for single parents",
      icon: FileText,
      color: "bg-orange-500",
      coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
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

export default ResourcesTab;
