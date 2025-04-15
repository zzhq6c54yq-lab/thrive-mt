import {
  Activity, BookOpen, Brain, BarChart3, Video, Calendar, Headphones,
  BookText, Sparkles, MessageCircle, Leaf, Rocket, Globe, Heart, Users, HandHeart, UserPlus
} from "lucide-react";
import React from "react";
import { getImageUrl } from "./featureUtils";

export interface Feature {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  description: string;
  image: string;
}

export const getFeatures = (isSpanish: boolean): Feature[] => {
  return [
    {
      id: "user-lead",
      title: isSpanish ? "Usuario Líder" : "User Lead",
      icon: <UserPlus className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/user-lead",
      color: "from-[#9b87f5] to-[#6E59A5]",
      description: isSpanish ? "Crea y comparte tus propias actividades" : "Create and share your own activities",
      image: getImageUrl("https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "progress-reports",
      title: isSpanish ? "Informes de Progreso" : "Progress Reports",
      icon: <BarChart3 className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/progress-reports",
      color: "from-purple-600 to-blue-600",
      description: isSpanish ? "Seguimiento de tu bienestar mental" : "Track your mental wellness journey",
      image: getImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "family-resources",
      title: isSpanish ? "Recursos Familiares" : "Family Resources",
      icon: <HandHeart className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/family-resources",
      color: "from-pink-600 to-purple-600",
      description: isSpanish ? "Apoyo para ti y tus seres queridos" : "Support for you and your loved ones",
      image: getImageUrl("https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "mental-wellness",
      title: isSpanish ? "Bienestar Mental" : "Mental Wellness",
      icon: <BookOpen className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/mental-wellness",
      color: "from-blue-600 to-indigo-600",
      description: isSpanish ? "Herramientas y evaluaciones para tu bienestar" : "Tools and assessments for your wellbeing",
      image: getImageUrl("https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "games",
      title: isSpanish ? "Juegos Mentales" : "Brain Games",
      icon: <Brain className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/games-and-quizzes",
      color: "from-orange-600 to-red-600",
      description: isSpanish ? "Actividades divertidas para ejercitar tu mente" : "Fun activities to engage your mind",
      image: getImageUrl("https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "video-diary",
      title: isSpanish ? "Diario en Video" : "Video Diary",
      icon: <Video className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/video-diary",
      color: "from-amber-500 to-orange-600",
      description: isSpanish ? "Graba y reflexiona sobre tu proceso" : "Record and reflect on your journey",
      image: getImageUrl("https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "wellness-challenges",
      title: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
      icon: <Activity className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/wellness-challenges",
      color: "from-emerald-600 to-green-600",
      description: isSpanish ? "Retos diarios para mejorar tu bienestar" : "Daily challenges to boost wellbeing",
      image: getImageUrl("https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "resource-library",
      title: isSpanish ? "Biblioteca de Recursos" : "Resource Library",
      icon: <BookText className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/resource-library",
      color: "from-cyan-600 to-blue-600",
      description: isSpanish ? "Extensa colección de materiales útiles" : "Extensive collection of helpful materials",
      image: getImageUrl("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "sponsor-alternative",
      title: isSpanish ? "Mi Patrocinador" : "My Sponsor",
      icon: <Users className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/my-sponsor",
      color: "from-rose-600 to-pink-600",
      description: isSpanish ? "Apoyo para tu proceso de recuperación" : "Support for your recovery journey",
      image: getImageUrl("https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "binaural-beats",
      title: isSpanish ? "Tonos Binaurales" : "Binaural Beats",
      icon: <Headphones className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/binaural-beats",
      color: "from-violet-600 to-purple-600",
      description: isSpanish ? "Terapia de audio para relajación" : "Audio therapy for relaxation",
      image: getImageUrl("https://images.unsplash.com/photo-1595534005229-688989c4bf82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "workshops",
      title: isSpanish ? "Talleres" : "Workshops",
      icon: <Calendar className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/workshops",
      color: "from-emerald-600 to-teal-600",
      description: isSpanish ? "Sesiones interactivas con profesionales" : "Interactive sessions with professionals",
      image: getImageUrl("https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "journaling",
      title: isSpanish ? "Diario Personal" : "Journaling",
      icon: <BookText className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/journaling",
      color: "from-blue-600 to-cyan-600",
      description: isSpanish ? "Expresa pensamientos y registra emociones" : "Express thoughts and track emotions",
      image: getImageUrl("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "mindfulness",
      title: isSpanish ? "Mindfulness y Sueño" : "Mindfulness & Sleep",
      icon: <Sparkles className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/mindfulness-sleep",
      color: "from-violet-600 to-indigo-600",
      description: isSpanish ? "Prácticas para mejor descanso y conciencia" : "Practices for better rest and awareness",
      image: getImageUrl("https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "real-time-therapy",
      title: isSpanish ? "Terapia en Tiempo Real" : "Real-Time Therapy",
      icon: <MessageCircle className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/real-time-therapy",
      color: "from-red-600 to-rose-600",
      description: isSpanish ? "Conecta con terapeutas al instante" : "Connect with therapists instantly",
      image: getImageUrl("https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "holistic-wellness",
      title: isSpanish ? "Bienestar Holístico" : "Holistic Wellness",
      icon: <Leaf className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/holistic-wellness",
      color: "from-green-600 to-lime-600",
      description: isSpanish ? "Enfoque integral para tu bienestar" : "Whole-person approach to wellbeing",
      image: getImageUrl("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "alternative-therapies",
      title: isSpanish ? "Terapias Alternativas" : "Alternative Therapies",
      icon: <Rocket className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/alternative-therapies",
      color: "from-teal-600 to-cyan-600",
      description: isSpanish ? "Explora métodos innovadores de sanación" : "Explore innovative healing methods",
      image: getImageUrl("https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
    {
      id: "community-support",
      title: isSpanish ? "Apoyo Comunitario" : "Community Support",
      icon: <Globe className="h-4 w-4 text-white drop-shadow-sm" />,
      path: "/community-support",
      color: "from-blue-600 to-indigo-600",
      description: isSpanish ? "Conecta con otros en caminos similares" : "Connect with others on similar journeys",
      image: getImageUrl("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")
    },
  ];
};
