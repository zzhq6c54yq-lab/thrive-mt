
import React from "react";
import { 
  BarChart3, 
  Brain, 
  Heart, 
  BookOpen, 
  Headphones, 
  GraduationCap,
  Video,
  MessageCircle,
  Leaf,
  Stethoscope,
  Users,
  Briefcase,
  Smile,
  TrendingUp,
  Home,
  Trophy,
  Clock,
  Target,
  Award,
  Activity,
  Moon,
  Flower2,
  Shield,
  TrendingUp as CareerIcon,
  Palette
} from "lucide-react";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  path: string;
  color: string;
  comingSoon?: boolean;
  popular?: boolean;
}

export const getFeatures = (isSpanish: boolean): FeatureItem[] => [
  {
    id: "progress-reports",
    title: isSpanish ? "Informes de Progreso" : "User-led Progress",
    description: isSpanish ? "Rastrea tu progreso y alcanza tus objetivos de bienestar." : "Track your progress and reach your wellness goals.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    path: "/progress-analytics",
    color: "blue"
  },
  {
    id: "family-resources",
    title: isSpanish ? "Recursos Familiares" : "Family Resources",
    description: isSpanish ? "Apoyo y recursos para toda la familia." : "Support and resources for the whole family.",
    icon: <Home className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80",
    path: "/family-resources",
    color: "green"
  },
  {
    id: "mental-wellness",
    title: isSpanish ? "Biblioteca de Bienestar Mental" : "Mental Wellness Library",
    description: isSpanish ? "Herramientas y recursos para el bienestar mental." : "Tools and resources for mental wellness.",
    icon: <Brain className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    path: "/mental-wellness-tools",
    color: "purple"
  },
  {
    id: "mirror-ai",
    title: isSpanish ? "MirrorAI Compañero" : "MirrorAI Companion",
    description: isSpanish ? "Tu compañero de IA informado sobre traumas para procesar emociones con compasión." : "Your trauma-informed AI companion for processing emotions with compassion.",
    icon: <Brain className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    path: "/mirror-ai",
    color: "purple",
    popular: true
  },
  {
    id: "lois-challenge",
    title: isSpanish ? "Desafío Lois" : "Lois Challenge",
    description: isSpanish ? "Participa en desafíos diarios de bienestar." : "Participate in daily wellness challenges.",
    icon: <Trophy className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    path: "/wellness-challenges",
    color: "yellow",
    popular: true
  },
  {
    id: "journaling",
    title: isSpanish ? "Diario Personal" : "Journaling",
    description: isSpanish ? "Herramientas de diario para reflexión y crecimiento." : "Journaling tools for reflection and growth.",
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    path: "/journaling",
    color: "indigo"
  },
  {
    id: "binaural-beats",
    title: isSpanish ? "Ritmos Binaurales" : "Binaural Beats",
    description: isSpanish ? "Música terapéutica para relajación y concentración." : "Therapeutic music for relaxation and focus.",
    icon: <Headphones className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    path: "/binaural-beats",
    color: "teal"
  },
  {
    id: "workshops",
    title: isSpanish ? "Talleres" : "Workshops",
    description: isSpanish ? "Talleres interactivos sobre bienestar y crecimiento personal." : "Interactive workshops on wellness and personal growth.",
    icon: <GraduationCap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    path: "/workshops",
    color: "orange"
  },
  {
    id: "video-journaling",
    title: isSpanish ? "Diario en Video" : "Video Journaling",
    description: isSpanish ? "Crea entradas de diario en video personales." : "Create personal video diary entries.",
    icon: <Video className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
    path: "/video-diary",
    color: "red"
  },
  {
    id: "real-time-therapy",
    title: isSpanish ? "Terapia en Tiempo Real" : "Real-time Therapy",
    description: isSpanish ? "Conecta con terapeutas profesionales al instante." : "Connect with professional therapists instantly.",
    icon: <MessageCircle className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
    path: "/real-time-therapy",
    color: "emerald"
  },
  {
    id: "holistic-wellness",
    title: isSpanish ? "Bienestar Holístico" : "Holistic Wellness",
    description: isSpanish ? "Enfoque integral del bienestar físico y mental." : "Comprehensive approach to physical and mental wellness.",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    path: "/holistic-wellness",
    color: "green"
  },
  {
    id: "alternative-therapy",
    title: isSpanish ? "Terapia Alternativa" : "Alternative Therapy",
    description: isSpanish ? "Explora terapias alternativas y complementarias." : "Explore alternative and complementary therapies.",
    icon: <Stethoscope className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    path: "/alternative-therapies",
    color: "violet"
  },
  {
    id: "community-support",
    title: isSpanish ? "Apoyo Comunitario" : "Community Support",
    description: isSpanish ? "Conecta con una comunidad solidaria de apoyo." : "Connect with a supportive community network.",
    icon: <Users className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    path: "/community-support",
    color: "pink"
  },
  {
    id: "career-counseling",
    title: isSpanish ? "Orientación Profesional" : "Career Coaching",
    description: isSpanish ? "Orientación profesional y desarrollo de carrera." : "Professional guidance and career development.",
    icon: <CareerIcon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    path: "/career-coaching",
    color: "slate"
  },
  {
    id: "meditation",
    title: isSpanish ? "Meditación" : "Meditation Studio",
    description: isSpanish ? "Estudio de meditación con prácticas guiadas." : "Comprehensive meditation studio with guided practices.",
    icon: <Flower2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
    path: "/meditation-studio",
    color: "cyan"
  },
  {
    id: "sleep-tracking",
    title: isSpanish ? "Seguimiento del Sueño" : "Sleep Tracker",
    description: isSpanish ? "Rastrea y mejora tus patrones de sueño." : "Track and improve your sleep patterns.",
    icon: <Moon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    path: "/sleep-tracker",
    color: "indigo"
  },
  {
    id: "games-quizzes",
    title: isSpanish ? "Juegos y Cuestionarios" : "Brain Games & Quizzes",
    description: isSpanish ? "Juegos cognitivos y cuestionarios para el bienestar mental." : "Cognitive games and quizzes for mental wellness.",
    icon: <Brain className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af20df5?auto=format&fit=crop&w=800&q=80",
    path: "/games-and-quizzes",
    color: "rose"
  },
  {
    id: "substance-abuse-sponsor",
    title: isSpanish ? "Mi Padrino de Recuperación" : "My Substance Abuse Sponsor",
    description: isSpanish ? "Apoyo estilo AA/NA con conexión de padrinos y seguimiento de sobriedad." : "AA/NA style support with sponsor connection and sobriety tracking.",
    icon: <Heart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=800&q=80",
    path: "/substance-abuse-sponsor",
    color: "emerald"
  },
  {
    id: "music-therapy",
    title: isSpanish ? "Terapia Musical" : "Music Therapy",
    description: isSpanish ? "Estudio musical completo con grabación, instrumentos y efectos terapéuticos." : "Complete music studio with recording, instruments and therapeutic effects.",
    icon: <Headphones className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    path: "/music-therapy",
    color: "blue",
    popular: true
  },
  {
    id: "art-therapy",
    title: isSpanish ? "Terapia Artística" : "Art Therapy Studio",
    description: isSpanish ? "Estudio de arte terapéutico con dibujo libre, pintar por números, mandalas y reflexión guiada." : "Therapeutic art studio with free draw, paint-by-numbers, mandala coloring and guided reflection.",
    icon: <Palette className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    path: "/art-therapy",
    color: "rose",
    popular: true
  }
];
