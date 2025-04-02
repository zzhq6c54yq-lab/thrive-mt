
import React from "react";
import {
  Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen,
  Moon, HandHeart, ListChecks, FlameKindling, Footprints, ArrowRight,
  Sparkles, Star, Lightbulb, Target, Zap, Bird, Leaf, Smile, Coffee, Puzzle, HeartHandshake,
  Headphones, Music, Video
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const KeyFeatures: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    title: isSpanish ? "Características Principales" : "Key Features",
    subtitle: isSpanish ? "Herramientas y recursos diseñados para tu viaje de bienestar mental" : "Tools and resources designed for your mental wellness journey",
    navigating: isSpanish ? "Navegando..." : "Navigating...",
    takingTo: isSpanish ? "Llevándote a la función seleccionada" : "Taking you to your selected feature"
  };

  const keyFeatures = [
    {
      title: isSpanish ? "Diario en Video" : "Video Diary",
      description: isSpanish ? "Graba mensajes de video para ti mismo o para compartir con seres queridos" : "Record video messages for yourself or to share with loved ones",
      icon: Video,
      path: "/video-diary"
    },
    {
      title: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
      description: isSpanish ? "Completa desafíos diarios para mejorar tu bienestar mental y físico" : "Complete daily challenges to improve your mental and physical wellbeing",
      icon: ListChecks,
      path: "/wellness-challenges"
    },
    {
      title: isSpanish ? "Contenido Personalizado" : "Personalized Content",
      description: isSpanish ? "Contenido adaptado a tu viaje de salud mental y antecedentes culturales" : "Content tailored to your mental health journey and cultural background",
      icon: Brain,
      path: "/personalized-content"
    },
    {
      title: isSpanish ? "Juegos y Cuestionarios" : "Games & Quizzes",
      description: isSpanish ? "Juegos y cuestionarios divertidos y terapéuticos para mejorar el bienestar mental" : "Fun and therapeutic games and quizzes to boost mental wellbeing",
      icon: Puzzle,
      path: "/games-and-quizzes"
    },
    {
      title: isSpanish ? "Biblioteca de Recursos" : "Resource Library",
      description: isSpanish ? "Recursos completos de salud mental y contenido educativo" : "Comprehensive mental health resources and educational content",
      icon: Library,
      path: "/resource-library"
    },
    {
      title: isSpanish ? "Apoyo Comunitario" : "Community Support",
      description: isSpanish ? "Conéctate con otros y accede a recursos culturalmente sensibles" : "Connect with others and access culturally sensitive resources",
      icon: Users,
      path: "/community-support"
    },
    {
      title: isSpanish ? "Mi Patrocinador N.A/A.A" : "My N.A/A.A Sponsor",
      description: isSpanish ? "Accede a tu patrocinador digital y recursos de apoyo para la recuperación" : "Access your digital sponsor and recovery support resources",
      icon: HeartHandshake,
      path: "/my-sponsor"
    },
    {
      title: isSpanish ? "Ritmos Binaurales" : "Binaural Beats",
      description: isSpanish ? "Terapia de audio para estrés, ansiedad, sueño, meditación y equilibrio de chakras" : "Audio therapy for stress, anxiety, sleep, meditation and chakra balancing",
      icon: Headphones,
      path: "/binaural-beats"
    },
    {
      title: isSpanish ? "Integración del Estilo de Vida" : "Lifestyle Integration",
      description: isSpanish ? "Integra sin problemas prácticas de bienestar mental en tu rutina diaria" : "Seamlessly blend mental wellness practices into your daily routine",
      icon: Coffee,
      path: "/lifestyle-integration"
    },
    {
      title: isSpanish ? "Herramientas de Bienestar Mental" : "Mental Wellness Tools",
      description: isSpanish ? "Haz seguimiento de la nutrición, el sueño, el ejercicio y el bienestar mental" : "Track nutrition, sleep, exercise, and mental wellbeing",
      icon: LeafyGreen,
      path: "/mental-wellness-tools"
    },
    {
      title: isSpanish ? "Seguimiento de Progreso" : "Progress Tracking",
      description: isSpanish ? "Monitorea tu viaje de salud mental a lo largo del tiempo" : "Monitor your mental health journey over time",
      icon: ListChecks,
      path: "/progress-reports"
    },
    {
      title: isSpanish ? "Recursos Familiares" : "Family Resources",
      description: isSpanish ? "Herramientas de apoyo para familias y cuidadores" : "Support tools for families and caregivers",
      icon: HandHeart,
      path: "/family-support"
    },
    {
      title: isSpanish ? "Terapias Alternativas" : "Alternative Therapies",
      description: isSpanish ? "Explora enfoques de sanación basados en arte, música y naturaleza" : "Explore art, music, and nature-based healing approaches",
      icon: FlameKindling,
      path: "/therapist-questionnaire"  // Points to therapist questionnaire
    },
    {
      title: isSpanish ? "Mindfulness y Sueño" : "Mindfulness & Sleep",
      description: isSpanish ? "Diversas prácticas de meditación y seguimiento del sueño" : "Diverse meditation practices and sleep tracking",
      icon: Moon,
      path: "/mindfulness"
    },
    {
      title: isSpanish ? "Opciones de Terapia" : "Therapy Options",
      description: isSpanish ? "Conéctate con terapeutas licenciados" : "Connect with licensed therapists",
      icon: GraduationCap,
      path: "/real-time-therapy"  // Changed to direct to real-time therapy page
    },
    {
      title: isSpanish ? "Talleres" : "Workshops",
      description: isSpanish ? "Experiencias de aprendizaje interactivas" : "Interactive learning experiences",
      icon: CalendarRange,
      path: "/workshops"
    },
    {
      title: isSpanish ? "Recursos de Autoayuda" : "Self-Help Resources",
      description: isSpanish ? "Artículos, videos y consejos sobre diversos temas de salud mental" : "Articles, videos, and tips on various mental health topics",
      icon: Library,
      path: "/self-help-resources"
    },
    {
      title: isSpanish ? "Escritura de Diario" : "Journaling",
      description: isSpanish ? "Espacio para reflexiones personales y expresión emocional" : "Space for personal reflections and emotional expression",
      icon: Heart,
      path: "/journaling"
    },
    {
      title: isSpanish ? "Apoyo en Crisis" : "Crisis Support",
      description: isSpanish ? "Recursos inmediatos y líneas directas para cuando necesitas ayuda" : "Immediate resources and hotlines for when you need help",
      icon: Heart,
      path: "/crisis-support"
    },
    {
      title: isSpanish ? "Análisis de Progreso" : "Progress Analytics",
      description: isSpanish ? "Rastrea y analiza tu viaje de bienestar mental" : "Track and analyze your mental wellness journey",
      icon: ListChecks,
      path: "/progress-analytics"
    },
    {
      title: isSpanish ? "Bienestar Holístico" : "Holistic Wellness",
      description: isSpanish ? "Enfoque integral del bienestar físico, mental y espiritual" : "Comprehensive approach to physical, mental, and spiritual wellbeing",
      icon: LeafyGreen,
      path: "/therapist-questionnaire"  // Points to therapist questionnaire
    }
  ];

  const handleFeatureClick = (path: string) => {
    toast({
      title: translations.navigating,
      description: translations.takingTo,
      duration: 1500,
    });
    
    navigate(path);
  };

  return (
    <div className="mb-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E2D]/50 to-[#2D2D3D]/50 rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#B87333]/20 via-[#E5C5A1]/30 to-[#B87333]/20 transform -skew-y-3"></div>
          <div className="absolute top-40 left-0 right-0 h-32 bg-gradient-to-r from-[#8B5CF6]/20 via-[#D946EF]/30 to-[#8B5CF6]/20 transform skew-y-3"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-[#0EA5E9]/20 via-[#2563EB]/30 to-[#0EA5E9]/20 transform -skew-y-3"></div>
        </div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10 px-4 pt-12 pb-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
              {translations.title}
            </h2>
            <p className="text-gray-300 mt-2">{translations.subtitle}</p>
          </div>
          <div className="hidden md:block">
            <Sparkles className="h-12 w-12 text-[#E5C5A1] opacity-60 animate-pulse" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {keyFeatures.map((feature, index) => {
            const gradients = [
              "from-[#9333EA]/70 to-[#D946EF]/30",
              "from-[#0EA5E9]/70 to-[#2563EB]/30",
              "from-[#F97316]/70 to-[#F59E0B]/30",
              "from-[#10B981]/70 to-[#34D399]/30",
              "from-[#EC4899]/70 to-[#F472B6]/30",
              "from-[#6366F1]/70 to-[#A5B4FC]/30",
              "from-[#84CC16]/70 to-[#BEF264]/20",
              "from-[#EF4444]/70 to-[#FCA5A5]/30",
              "from-[#B87333]/70 to-[#E5C5A1]/30",
            ];
            
            const borderColors = [
              "#9333EA",
              "#0EA5E9",
              "#F97316",
              "#10B981",
              "#EC4899",
              "#6366F1",
              "#84CC16",
              "#EF4444",
              "#B87333",
            ];
            
            const iconColors = [
              "#D946EF",
              "#2563EB",
              "#F59E0B",
              "#34D399",
              "#F472B6",
              "#A5B4FC",
              "#BEF264",
              "#FCA5A5",
              "#E5C5A1",
            ];
            
            const gradientIndex = index % gradients.length;
            const borderColor = borderColors[gradientIndex];
            const iconColor = iconColors[gradientIndex];
            
            const IconComponent = feature.icon;
            
            const CornerIcons = [Sparkles, Star, Lightbulb, Target, Zap, Bird, Leaf, Smile, Coffee];
            const CornerIcon = CornerIcons[index % CornerIcons.length];
            
            return (
              <div 
                key={index}
                onClick={() => handleFeatureClick(feature.path)}
                className="relative group cursor-pointer overflow-hidden rounded-xl backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.01]"
                style={{ minHeight: "150px" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} opacity-80`}></div>
                
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-80 transition-opacity">
                  <CornerIcon className="h-5 w-5" style={{ color: iconColor }} />
                </div>
                
                <div className="relative p-4 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-2">
                    <div 
                      className="p-2 rounded-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        background: `${iconColor}30`,
                        border: `1px solid ${iconColor}50`,
                        boxShadow: `0 0 20px ${iconColor}30`
                      }}
                    >
                      <IconComponent className="h-5 w-5" style={{ color: iconColor }} />
                    </div>
                    <h3 className="text-md font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-white/80 mb-4 text-xs">
                    {feature.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div 
                      className="h-6 w-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                      style={{ background: `${iconColor}30` }}
                    >
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
                
                <div 
                  className="absolute inset-0 border-2 border-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
