
import {
  BarChart4,
  Brain,
  CalendarClock,
  Gamepad2,
  HeartHandshake,
  ListChecks,
  LucideIcon,
  MessageSquare,
  Settings,
  SlidersHorizontal,
  UserCog,
  Users2
} from "lucide-react";
import React from "react";

export interface FeatureItem {
  id: string;
  icon: React.ReactNode;   // ReactNode, not LucideIcon | string
  color: string;
  title: string;
  description: string;
  path: string;
  image: string;
  popular: boolean;
  comingSoon: boolean;
}

export function getFeatures(isSpanish: boolean): FeatureItem[] {
  return [
    {
      id: "mental-wellness",
      icon: <Brain className="h-5 w-5 text-violet-400" />,
      color: "purple",
      title: isSpanish ? "Bienestar mental" : "Mental Wellness",
      description: isSpanish
        ? "Herramientas y recursos para mejorar tu salud mental y emocional."
        : "Tools and resources to improve your mental and emotional health.",
      path: "/mental-wellness",
      image: "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png",
      popular: true,
      comingSoon: false,
    },
    {
      id: "community-support",
      icon: <Users2 className="h-5 w-5 text-sky-400" />,
      color: "sky",
      title: isSpanish ? "Apoyo comunitario" : "Community Support",
      description: isSpanish
        ? "Conéctate con otros, comparte experiencias y encuentra apoyo en nuestra comunidad."
        : "Connect with others, share experiences, and find support in our community.",
      path: "/community-support",
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
      popular: true,
      comingSoon: false,
    },
    {
      id: "progress-reports",
      icon: <BarChart4 className="h-5 w-5 text-emerald-400" />,
      color: "emerald",
      title: isSpanish ? "Informes de progreso" : "Progress Reports",
      description: isSpanish
        ? "Realiza un seguimiento de tu progreso y observa cómo estás mejorando con el tiempo."
        : "Track your progress and see how you're improving over time.",
      path: "/progress-reports",
      image: "/lovable-uploads/11170587-bb45-4563-93d6-add9916cea87.png",
      popular: true,
      comingSoon: false,
    },
    {
      id: "workshops",
      icon: <CalendarClock className="h-5 w-5 text-amber-400" />,
      color: "amber",
      title: isSpanish ? "Talleres" : "Workshops",
      description: isSpanish
        ? "Participa en talleres interactivos para aprender nuevas habilidades y estrategias."
        : "Participate in interactive workshops to learn new skills and strategies.",
      path: "/workshops",
      image: "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png",
      popular: true,
      comingSoon: false,
    },
    {
      id: "real-time-therapy",
      icon: <HeartHandshake className="h-5 w-5 text-rose-400" />,
      color: "rose",
      title: isSpanish ? "Terapia en tiempo real" : "Real-Time Therapy",
      description: isSpanish
        ? "Obtén apoyo personalizado de terapeutas licenciados en tiempo real."
        : "Get personalized support from licensed therapists in real-time.",
      path: "/real-time-therapy",
      image: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png",
      popular: false,
      comingSoon: false,
    },
    {
      id: "resource-library",
      icon: <ListChecks className="h-5 w-5 text-violet-400" />,
      color: "violet",
      title: isSpanish ? "Biblioteca de recursos" : "Resource Library",
      description: isSpanish
        ? "Accede a una amplia biblioteca de artículos, guías y herramientas útiles."
        : "Access a vast library of articles, guides, and helpful tools.",
      path: "/resource-library",
      image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png",
      popular: false,
      comingSoon: false,
    },
    {
      id: "settings",
      icon: <Settings className="h-5 w-5 text-zinc-400" />,
      color: "zinc",
      title: isSpanish ? "Ajustes" : "Settings",
      description: isSpanish
        ? "Configura tu perfil y preferencias para personalizar tu experiencia."
        : "Configure your profile and preferences to personalize your experience.",
      path: "/settings",
      image: "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png",
      popular: false,
      comingSoon: true,
    },
    {
      id: "admin-tools",
      icon: <UserCog className="h-5 w-5 text-stone-400" />,
      color: "stone",
      title: isSpanish ? "Herramientas de administrador" : "Admin Tools",
      description: isSpanish
        ? "Gestiona usuarios, contenido y configuraciones del sistema."
        : "Manage users, content, and system configurations.",
      path: "/admin-tools",
      image: "/lovable-uploads/10d9c6f1-9335-46e4-8942-4d4c198d3f5b.png",
      popular: false,
      comingSoon: true,
    },
    {
      id: "integrations",
      icon: <SlidersHorizontal className="h-5 w-5 text-orange-400" />,
      color: "orange",
      title: isSpanish ? "Integraciones" : "Integrations",
      description: isSpanish
        ? "Conecta Thrive con otras herramientas y plataformas que utilizas."
        : "Connect Thrive with other tools and platforms you use.",
      path: "/integrations",
      image: "/lovable-uploads/11170587-bb45-4563-93d6-add9916cea87.png",
      popular: false,
      comingSoon: true,
    },
    {
      id: "feedback",
      icon: <MessageSquare className="h-5 w-5 text-lime-400" />,
      color: "lime",
      title: isSpanish ? "Comentarios" : "Feedback",
      description: isSpanish
        ? "Envíanos tus comentarios y sugerencias para mejorar Thrive."
        : "Send us your feedback and suggestions to improve Thrive.",
      path: "/feedback",
      image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png",
      popular: false,
      comingSoon: true,
    },
    {
      id: "mini-games",
      icon: <Gamepad2 className="h-5 w-5 text-indigo-400" />,
      color: "indigo",
      title: isSpanish ? "Mini juegos" : "Mini Games",
      description: isSpanish
        ? "Entrena tu mente con divertidos mini juegos cognitivos y de destreza mental."
        : "Train your mind with fun mini games for cognitive and mental skill-building.",
      path: "/games-and-quizzes",
      image: "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png",
      popular: true,
      comingSoon: false,
    },
  ];
}
