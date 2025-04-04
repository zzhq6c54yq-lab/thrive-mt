
import React, { useState, useEffect } from "react";
import {
  Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen,
  Moon, HandHeart, ListChecks, FlameKindling, Footprints, ArrowRight,
  Sparkles, Video, Headphones, HeartHandshake
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface KeyFeaturesProps {
  navigateToFeature: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ 
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = [] 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSpanish, setIsSpanish] = useState<boolean>(false);
  
  // Check language preference and listen for changes
  useEffect(() => {
    const checkLanguage = () => {
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setIsSpanish(preferredLanguage === 'Español');
    };
    
    // Check initial language
    checkLanguage();
    
    // Listen for language change events
    window.addEventListener('languageChange', checkLanguage);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', checkLanguage);
    };
  }, []);
  
  // Translations
  const translations = {
    title: isSpanish ? "Características Principales" : "Key Features",
    navigating: isSpanish ? "Navegando..." : "Navigating...",
    takingTo: isSpanish ? "Llevándote a la función seleccionada" : "Taking you to your selected feature"
  };

  const keyFeatures = [
    {
      title: isSpanish ? "Diario en Video" : "Video Diary",
      icon: Video,
      path: "/video-diary"
    },
    {
      title: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
      icon: ListChecks,
      path: "/wellness-challenges"
    },
    {
      title: isSpanish ? "Contenido Personalizado" : "Personalized Content",
      icon: Brain,
      path: "/personalized-content"
    },
    {
      title: isSpanish ? "Juegos y Cuestionarios" : "Games & Quizzes",
      icon: Heart,
      path: "/games-and-quizzes"
    },
    {
      title: isSpanish ? "Biblioteca de Recursos" : "Resource Library",
      icon: Library,
      path: "/resource-library"
    },
    {
      title: isSpanish ? "Apoyo Comunitario" : "Community Support",
      icon: Users,
      path: "/community-support"
    },
    {
      title: isSpanish ? "Mi Patrocinador N.A/A.A" : "My N.A/A.A Sponsor",
      icon: HeartHandshake,
      path: "/my-sponsor"
    },
    {
      title: isSpanish ? "Ritmos Binaurales" : "Binaural Beats",
      icon: Headphones,
      path: "/binaural-beats"
    },
    {
      title: isSpanish ? "Herramientas de Bienestar Mental" : "Mental Wellness Tools",
      icon: LeafyGreen,
      path: "/mental-wellness-tools"
    },
    {
      title: isSpanish ? "Seguimiento de Progreso" : "Progress Tracking",
      icon: ListChecks,
      path: "/progress-reports"
    },
    {
      title: isSpanish ? "Recursos Familiares" : "Family Resources",
      icon: HandHeart,
      path: "/family-support"
    },
    {
      title: isSpanish ? "Terapias Alternativas" : "Alternative Therapies",
      icon: FlameKindling,
      path: "/therapist-questionnaire"
    },
    {
      title: isSpanish ? "Mindfulness y Sueño" : "Mindfulness & Sleep",
      icon: Moon,
      path: "/mindfulness"
    },
    {
      title: isSpanish ? "Opciones de Terapia" : "Therapy Options",
      icon: GraduationCap,
      path: "/real-time-therapy"
    },
    {
      title: isSpanish ? "Talleres" : "Workshops",
      icon: CalendarRange,
      path: "/workshops"
    },
    {
      title: isSpanish ? "Escritura de Diario" : "Journaling",
      icon: Heart,
      path: "/journaling"
    }
  ];

  const handleFeatureClick = (path: string) => {
    toast({
      title: translations.navigating,
      description: translations.takingTo,
      duration: 1500,
    });
    
    navigateToFeature(path);
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
      
      <div className="relative z-10 px-4 pt-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
              {translations.title}
            </h2>
          </div>
          <div className="hidden md:block">
            <Sparkles className="h-8 w-8 text-[#E5C5A1] opacity-60 animate-pulse" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
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
            const iconColor = iconColors[gradientIndex];
            
            const IconComponent = feature.icon;
            
            return (
              <div 
                key={index}
                onClick={() => handleFeatureClick(feature.path)}
                className="cursor-pointer overflow-hidden rounded-xl backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} opacity-80`}></div>
                
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                
                <div className="relative p-2 sm:p-3 flex flex-col items-center text-center h-full">
                  <div 
                    className="p-1.5 sm:p-2 rounded-lg transform transition-transform mb-1.5 sm:mb-2"
                    style={{ 
                      background: `${iconColor}30`,
                      border: `1px solid ${iconColor}50`
                    }}
                  >
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: iconColor }} />
                  </div>
                  
                  <h3 className="text-xs sm:text-sm font-medium text-white">
                    {feature.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
