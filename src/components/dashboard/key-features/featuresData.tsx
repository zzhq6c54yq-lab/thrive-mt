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

export interface FeatureItem {
  id: string;
  icon: LucideIcon | string;
  color: string;
  title: string;
  description: string;
  link: string;
  popular: boolean;
  comingSoon: boolean;
}

export function getFeatures(isSpanish: boolean) {
  return [
    {
      id: "mental-wellness",
      icon: Brain,
      color: "purple",
      title: isSpanish ? "Bienestar mental" : "Mental Wellness",
      description: isSpanish
        ? "Herramientas y recursos para mejorar tu salud mental y emocional."
        : "Tools and resources to improve your mental and emotional health.",
      link: "/mental-wellness",
      popular: true,
      comingSoon: false,
    },
    {
      id: "community-support",
      icon: Users2,
      color: "sky",
      title: isSpanish ? "Apoyo comunitario" : "Community Support",
      description: isSpanish
        ? "Conéctate con otros, comparte experiencias y encuentra apoyo en nuestra comunidad."
        : "Connect with others, share experiences, and find support in our community.",
      link: "/community-support",
      popular: true,
      comingSoon: false,
    },
    {
      id: "progress-reports",
      icon: BarChart4,
      color: "emerald",
      title: isSpanish ? "Informes de progreso" : "Progress Reports",
      description: isSpanish
        ? "Realiza un seguimiento de tu progreso y observa cómo estás mejorando con el tiempo."
        : "Track your progress and see how you're improving over time.",
      link: "/progress-reports",
      popular: true,
      comingSoon: false,
    },
    {
      id: "workshops",
      icon: CalendarClock,
      color: "amber",
      title: isSpanish ? "Talleres" : "Workshops",
      description: isSpanish
        ? "Participa en talleres interactivos para aprender nuevas habilidades y estrategias."
        : "Participate in interactive workshops to learn new skills and strategies.",
      link: "/workshops",
      popular: true,
      comingSoon: false,
    },
    {
      id: "real-time-therapy",
      icon: HeartHandshake,
      color: "rose",
      title: isSpanish ? "Terapia en tiempo real" : "Real-Time Therapy",
      description: isSpanish
        ? "Obtén apoyo personalizado de terapeutas licenciados en tiempo real."
        : "Get personalized support from licensed therapists in real-time.",
      link: "/real-time-therapy",
      popular: false,
      comingSoon: false,
    },
    {
      id: "resource-library",
      icon: ListChecks,
      color: "violet",
      title: isSpanish ? "Biblioteca de recursos" : "Resource Library",
      description: isSpanish
        ? "Accede a una amplia biblioteca de artículos, guías y herramientas útiles."
        : "Access a vast library of articles, guides, and helpful tools.",
      link: "/resource-library",
      popular: false,
      comingSoon: false,
    },
    {
      id: "settings",
      icon: Settings,
      color: "zinc",
      title: isSpanish ? "Ajustes" : "Settings",
      description: isSpanish
        ? "Configura tu perfil y preferencias para personalizar tu experiencia."
        : "Configure your profile and preferences to personalize your experience.",
      link: "/settings",
      popular: false,
      comingSoon: true,
    },
    {
      id: "admin-tools",
      icon: UserCog,
      color: "stone",
      title: isSpanish ? "Herramientas de administrador" : "Admin Tools",
      description: isSpanish
        ? "Gestiona usuarios, contenido y configuraciones del sistema."
        : "Manage users, content, and system configurations.",
      link: "/admin-tools",
      popular: false,
      comingSoon: true,
    },
    {
      id: "integrations",
      icon: SlidersHorizontal,
      color: "orange",
      title: isSpanish ? "Integraciones" : "Integrations",
      description: isSpanish
        ? "Conecta Thrive con otras herramientas y plataformas que utilizas."
        : "Connect Thrive with other tools and platforms you use.",
      link: "/integrations",
      popular: false,
      comingSoon: true,
    },
    {
      id: "feedback",
      icon: MessageSquare,
      color: "lime",
      title: isSpanish ? "Comentarios" : "Feedback",
      description: isSpanish
        ? "Envíanos tus comentarios y sugerencias para mejorar Thrive."
        : "Send us your feedback and suggestions to improve Thrive.",
      link: "/feedback",
      popular: false,
      comingSoon: true,
    },
    {
      id: "mini-games",
      icon: "Gamepad2", // Use lucide-react gamepad icon
      color: "indigo",
      title: isSpanish ? "Mini juegos" : "Mini Games",
      description: isSpanish
        ? "Entrena tu mente con divertidos mini juegos cognitivos y de destreza mental."
        : "Train your mind with fun mini games for cognitive and mental skill-building.",
      link: "/games-and-quizzes",
      popular: true,
      comingSoon: false,
    },
  ];
}
