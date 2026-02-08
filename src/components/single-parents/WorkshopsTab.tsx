import React from "react";
import FeatureCard from "./FeatureCard";
import { Briefcase, Users, DollarSign, Heart, Shield, Calendar, Mic, Video, BookOpen } from "lucide-react";
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
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      path: "workshops"
    },
    {
      title: isSpanish ? "Construyendo tu Red de Apoyo" : "Building Your Support Network",
      description: isSpanish 
        ? "Crear y mantener conexiones significativas"
        : "Create and maintain meaningful connections",
      icon: Users,
      color: "bg-purple-500",
      coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      path: "community-support"
    },
    {
      title: isSpanish ? "Planificación Financiera" : "Financial Planning",
      description: isSpanish 
        ? "Talleres sobre presupuesto y seguridad financiera"
        : "Workshops on budgeting and financial security",
      icon: DollarSign,
      color: "bg-green-500",
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
      path: "workshops"
    },
    {
      title: isSpanish ? "Autocompasión para Padres" : "Self-Compassion for Parents",
      description: isSpanish 
        ? "Prácticas para reducir la autocrítica"
        : "Practices to reduce self-criticism",
      icon: Heart,
      color: "bg-rose-500",
      coverImage: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=800&q=80",
      path: "guided-practice/self-compassion"
    },
    {
      title: isSpanish ? "Manejo de Culpa Parental" : "Managing Parenting Guilt",
      description: isSpanish 
        ? "Herramientas para procesar y liberar la culpa"
        : "Tools to process and release guilt",
      icon: Shield,
      color: "bg-indigo-500",
      coverImage: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=800&q=80",
      path: "workshops"
    },
    {
      title: isSpanish ? "Eventos en Vivo" : "Upcoming Live Events",
      description: isSpanish 
        ? "Únete a talleres y reuniones virtuales"
        : "Join virtual workshops and meetups",
      icon: Calendar,
      color: "bg-orange-500",
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      path: "virtual-meetings"
    },
    {
      title: isSpanish ? "Podcast de Bienestar" : "Wellness Podcast Series",
      description: isSpanish 
        ? "Escucha historias inspiradoras de otros padres solteros"
        : "Listen to inspiring stories from other single parents",
      icon: Mic,
      color: "bg-cyan-500",
      coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
    },
    {
      title: isSpanish ? "Talleres en Video" : "Video Workshop Library",
      description: isSpanish 
        ? "Biblioteca de talleres grabados para ver a tu ritmo"
        : "Library of recorded workshops to watch at your pace",
      icon: Video,
      color: "bg-pink-500",
      coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      path: "workshops"
    },
    {
      title: isSpanish ? "Guías de Lectura" : "Reading Guides & Book Club",
      description: isSpanish 
        ? "Club de lectura y guías para padres solteros"
        : "Book club and reading guides for single parents",
      icon: BookOpen,
      color: "bg-amber-500",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
      path: "resource-library"
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

export default WorkshopsTab;
