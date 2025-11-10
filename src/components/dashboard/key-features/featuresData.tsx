
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
  Palette,
  Mail,
  CloudRain,
  Sparkles
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
    id: "mini-session",
    title: isSpanish ? "Compañero Entre Sesiones" : "Between-Session Companion",
    description: isSpanish ? "Apoyo terapéutico impulsado por IA entre sesiones de terapia." : "AI-powered therapeutic support between therapy sessions.",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80",
    path: "/mini-session",
    color: "purple",
    popular: true
  },
  {
    id: "progress-reports",
    title: isSpanish ? "Informes de Progreso" : "User-led Progress",
    description: isSpanish ? "Rastrea tu progreso y alcanza tus objetivos de bienestar." : "Track your progress and reach your wellness goals.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    path: "/progress-analytics",
    color: "blue"
  },
  {
    id: "family-resources",
    title: isSpanish ? "Recursos Familiares" : "Family Resources",
    description: isSpanish ? "Apoyo y recursos para toda la familia." : "Support and resources for the whole family.",
    icon: <Home className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
    path: "/family-resources",
    color: "green"
  },
  {
    id: "mental-wellness",
    title: isSpanish ? "Biblioteca de Bienestar Mental" : "Mental Wellness Library",
    description: isSpanish ? "Herramientas y recursos para el bienestar mental." : "Tools and resources for mental wellness.",
    icon: <Brain className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    path: "/mental-wellness-tools",
    color: "purple"
  },
  {
    id: "mirror-ai",
    title: isSpanish ? "MirrorAI Compañero" : "MirrorAI Companion",
    description: isSpanish ? "Tu compañero de IA informado sobre traumas para procesar emociones con compasión." : "Your trauma-informed AI companion for processing emotions with compassion.",
    icon: <Brain className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&w=800&q=80",
    path: "/mirror-ai",
    color: "purple",
    popular: true
  },
  {
    id: "lois-challenge",
    title: isSpanish ? "Desafío Lois" : "Lois Challenge",
    description: isSpanish ? "Participa en desafíos diarios de bienestar." : "Participate in daily wellness challenges.",
    icon: <Trophy className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    path: "/video-diary",
    color: "red"
  },
  {
    id: "real-time-therapy",
    title: isSpanish ? "Terapia en Tiempo Real" : "Real-time Therapy",
    description: isSpanish ? "Conecta con terapeutas profesionales al instante." : "Connect with professional therapists instantly.",
    icon: <MessageCircle className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80",
    path: "/real-time-therapy",
    color: "emerald"
  },
  {
    id: "holistic-wellness",
    title: isSpanish ? "Bienestar Holístico" : "Holistic Wellness",
    description: isSpanish ? "Enfoque integral del bienestar físico y mental." : "Comprehensive approach to physical and mental wellness.",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    path: "/holistic-wellness",
    color: "green"
  },
  {
    id: "alternative-therapy",
    title: isSpanish ? "Terapia Alternativa" : "Alternative Therapy",
    description: isSpanish ? "Explora terapias alternativas y complementarias." : "Explore alternative and complementary therapies.",
    icon: <Stethoscope className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80",
    path: "/alternative-therapies",
    color: "violet"
  },
  {
    id: "community-support",
    title: isSpanish ? "Apoyo Comunitario" : "Community Support",
    description: isSpanish ? "Conecta con una comunidad solidaria de apoyo." : "Connect with a supportive community network.",
    icon: <Users className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    path: "/community-support",
    color: "pink"
  },
  {
    id: "career-counseling",
    title: isSpanish ? "Orientación Profesional" : "Career Coaching",
    description: isSpanish ? "Orientación profesional y desarrollo de carrera." : "Professional guidance and career development.",
    icon: <CareerIcon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    path: "/career-coaching",
    color: "slate"
  },
  {
    id: "meditation",
    title: isSpanish ? "Estudio de Meditación" : "Meditation Studio",
    description: isSpanish ? "Estudio de meditación con prácticas guiadas." : "Comprehensive meditation studio with guided practices.",
    icon: <Flower2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
    path: "/meditation-studio",
    color: "cyan"
  },
  {
    id: "sleep-tracking",
    title: isSpanish ? "Seguimiento del Sueño" : "Sleep Tracker",
    description: isSpanish ? "Rastrea y mejora tus patrones de sueño." : "Track and improve your sleep patterns.",
    icon: <Moon className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=800&q=80",
    path: "/sleep-tracker",
    color: "indigo"
  },
  {
    id: "games-quizzes",
    title: isSpanish ? "Juegos y Cuestionarios" : "Brain Games & Quizzes",
    description: isSpanish ? "Juegos cognitivos y cuestionarios para el bienestar mental." : "Cognitive games and quizzes for mental wellness.",
    icon: <Brain className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    path: "/games-and-quizzes",
    color: "rose"
  },
  {
    id: "substance-abuse-sponsor",
    title: isSpanish ? "Mi Padrino de Recuperación" : "My Substance Abuse Sponsor",
    description: isSpanish ? "Apoyo estilo AA/NA con conexión de padrinos y seguimiento de sobriedad." : "AA/NA style support with sponsor connection and sobriety tracking.",
    icon: <Heart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    path: "/substance-abuse-sponsor",
    color: "emerald"
  },
  {
    id: "music-therapy",
    title: isSpanish ? "Terapia Musical" : "Music Therapy",
    description: isSpanish ? "Estudio musical completo con grabación, instrumentos y efectos terapéuticos." : "Complete music studio with recording, instruments and therapeutic effects.",
    icon: <Headphones className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
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
  },
  {
    id: "dear-henry",
    title: isSpanish ? "Querido Henry" : "Dear Henry",
    description: isSpanish 
      ? "Consejería compasiva y anónima de nuestro columnista de salud mental" 
      : "Compassionate, anonymous advice from our mental health columnist",
    icon: <Mail className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    path: "/dear-henry",
    color: "amber",
    popular: true
  },
  {
    id: "unburdened",
    title: isSpanish ? "Liberado" : "Unburdened",
    description: isSpanish 
      ? "Comparte pensamientos anónimamente y conecta con otros en un espacio seguro" 
      : "Share thoughts anonymously and connect with others in a safe space",
    icon: <CloudRain className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
    path: "/unburdened",
    color: "rose",
    popular: true
  }
];
