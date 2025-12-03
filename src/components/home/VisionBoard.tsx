
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Sparkles, Heart, Brain, Target, Star, Lightbulb, ArrowRight, Smile, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface VisionBoardProps {
  selectedQualities: string[];
  selectedGoals: string[];
  onQualityToggle: (id: string) => void;
  onGoalToggle: (id: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const VisionBoard: React.FC<VisionBoardProps> = ({
  selectedQualities,
  selectedGoals,
  onQualityToggle,
  onGoalToggle,
  onContinue,
  onPrevious,
  onSkip
}) => {
  const [activeTab, setActiveTab] = useState<'qualities' | 'goals'>('qualities');
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);
  const [showInspirationMsg, setShowInspirationMsg] = useState(false);
  const [inspirationMessages, setInspirationMessages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    title: isSpanish ? "Crea Tu Tablero de Visión" : "Create Your Vision Board",
    subtitle: isSpanish 
      ? "Selecciona las cualidades que quieres encarnar y las metas que quieres lograr en tu viaje de bienestar mental. ¡Haz que este tablero de visión sea tu propio mapa personal hacia la transformación!"
      : "Select the qualities you want to embody and goals you want to achieve on your mental wellness journey. Make this vision board your own personal roadmap to transformation!",
    qualitiesTab: isSpanish ? "Cualidades" : "Qualities",
    goalsTab: isSpanish ? "Metas" : "Goals",
    qualitiesSelected: isSpanish ? "cualidades seleccionadas" : "qualities selected",
    goalsSelected: isSpanish ? "metas seleccionadas" : "goals selected",
    previous: isSpanish ? "Anterior" : "Previous",
    skip: isSpanish ? "Omitir" : "Skip",
    continue: isSpanish ? "Continuar" : "Continue",
    personalizedRecs: isSpanish ? "Ver Tus Recomendaciones Personalizadas" : "See Your Personalized Recommendations",
    personalizedSubtitle: isSpanish ? "Hemos creado contenido único basado en tus selecciones" : "We've crafted unique content based on your selections",
    visitPersonalized: isSpanish ? "Visitar Contenido Personalizado" : "Visit Personalized Content",
    of: isSpanish ? "de" : "of"
  };
  
  // Inspiration messages
  const inspirations = isSpanish 
    ? [
        "¡Tu tablero de visión es un mapa hacia tu futuro yo!",
        "Cada cualidad que eliges planta una semilla de crecimiento.",
        "Estas metas no son solo sueños - son tu destino.",
        "¡Tu futuro yo te está animando ahora mismo!",
        "Cada selección es un paso hacia la persona en la que te estás convirtiendo.",
        "Estás diseñando tu vida con intención - ¡qué poderoso!",
        "Pequeñas elecciones hoy crean grandes cambios mañana.",
        "Tu tablero de visión es tan único como tu huella digital.",
        "Las cualidades que seleccionas hoy dan forma a quién serás mañana.",
        "Tu viaje es solo tuyo - ¡hazlo magnífico!"
      ]
    : [
        "Your vision board is a map to your future self!",
        "Each quality you choose plants a seed of growth.",
        "These goals aren't just dreams - they're your destination.",
        "Your future self is cheering you on right now!",
        "Every selection is a step toward the person you're becoming.",
        "You're designing your life with intention - how powerful!",
        "Small choices today create big changes tomorrow.",
        "Your vision board is as unique as your fingerprint.",
        "The qualities you select today shape who you'll be tomorrow.",
        "Your journey is yours alone - make it magnificent!"
      ];

  // Quality items
  const qualities = [
    { 
      id: "peaceful", 
      label: isSpanish ? "Tranquilo" : "Peaceful", 
      icon: "🕊️", 
      description: isSpanish ? "Encontrar calma interior en medio de las tormentas de la vida" : "Finding inner calm amidst life's storms" 
    },
    { 
      id: "mindful", 
      label: isSpanish ? "Consciente" : "Mindful", 
      icon: "🧠", 
      description: isSpanish ? "Presente en cada momento, consciente de tus pensamientos" : "Present in each moment, aware of your thoughts" 
    },
    { 
      id: "resilient", 
      label: isSpanish ? "Resiliente" : "Resilient", 
      icon: "🌱", 
      description: isSpanish ? "Recuperándote más fuerte después de los desafíos" : "Bouncing back stronger from challenges" 
    },
    { 
      id: "grateful", 
      label: isSpanish ? "Agradecido" : "Grateful", 
      icon: "🙏", 
      description: isSpanish ? "Apreciando los regalos en tu vida" : "Appreciating the gifts in your life" 
    },
    { 
      id: "balanced", 
      label: isSpanish ? "Equilibrado" : "Balanced", 
      icon: "⚖️", 
      description: isSpanish ? "Encontrando armonía en todas las dimensiones de la vida" : "Finding harmony in all life dimensions" 
    },
    { 
      id: "creative", 
      label: isSpanish ? "Creativo" : "Creative", 
      icon: "🎨", 
      description: isSpanish ? "Expresándote de maneras únicas" : "Expressing yourself in unique ways" 
    },
    { 
      id: "empathetic", 
      label: isSpanish ? "Empático" : "Empathetic", 
      icon: "💗", 
      description: isSpanish ? "Comprendiendo a otros con compasión" : "Understanding others with compassion" 
    },
    { 
      id: "focused", 
      label: isSpanish ? "Enfocado" : "Focused", 
      icon: <Target className="w-6 h-6 text-[#D4AF37]" />, 
      description: isSpanish ? "Dirigiendo tu energía con intención" : "Directing your energy with intention" 
    },
    { 
      id: "present", 
      label: isSpanish ? "Presente" : "Present", 
      icon: "⏱️", 
      description: isSpanish ? "Completamente involucrado en el aquí y ahora" : "Fully engaged in the here and now" 
    },
    { 
      id: "joyful", 
      label: isSpanish ? "Alegre" : "Joyful", 
      icon: <Smile className="w-6 h-6 text-[#D4AF37]" />, 
      description: isSpanish ? "Encontrando deleite en los momentos cotidianos" : "Finding delight in everyday moments" 
    },
    { 
      id: "energetic", 
      label: isSpanish ? "Energético" : "Energetic", 
      icon: "⚡", 
      description: isSpanish ? "Viviendo con vibración y entusiasmo" : "Living with vibrance and enthusiasm" 
    }
  ];

  // Goal items
  const goals = [
    { 
      id: "reducing-anxiety", 
      label: isSpanish ? "Reducir Ansiedad" : "Reducing Anxiety", 
      icon: "🌈", 
      description: isSpanish ? "Encontrar paz cuando la preocupación se instala" : "Finding peace when worry creeps in" 
    },
    { 
      id: "managing-stress", 
      label: isSpanish ? "Manejar el Estrés" : "Managing Stress", 
      icon: "🌊", 
      description: isSpanish ? "Fluyendo con los puntos de presión de la vida" : "Flowing with life's pressure points" 
    },
    { 
      id: "improving-sleep", 
      label: isSpanish ? "Mejorar el Sueño" : "Improving Sleep", 
      icon: "💤", 
      description: isSpanish ? "Noches de descanso para días con energía" : "Restful nights for energized days" 
    },
    { 
      id: "emotional-regulation", 
      label: isSpanish ? "Regulación Emocional" : "Emotional Regulation", 
      icon: "🎭", 
      description: isSpanish ? "Dominar tus respuestas emocionales" : "Mastering your emotional responses" 
    },
    { 
      id: "better-relationships", 
      label: isSpanish ? "Mejores Relaciones" : "Better Relationships", 
      icon: <Users className="w-6 h-6 text-[#D4AF37]" />, 
      description: isSpanish ? "Nutriendo conexiones que importan" : "Nurturing connections that matter" 
    },
    { 
      id: "work-life-balance", 
      label: isSpanish ? "Equilibrio Trabajo-Vida" : "Work-Life Balance", 
      icon: "⚖️", 
      description: isSpanish ? "Armonía entre ambición y bienestar" : "Harmony between ambition and wellbeing" 
    },
    { 
      id: "finding-purpose", 
      label: isSpanish ? "Encontrar Propósito" : "Finding Purpose", 
      icon: "🧭", 
      description: isSpanish ? "Descubriendo lo que hace cantar a tu alma" : "Discovering what makes your soul sing" 
    },
    { 
      id: "building-confidence", 
      label: isSpanish ? "Construir Confianza" : "Building Confidence", 
      icon: <Zap className="w-6 h-6 text-[#D4AF37]" />, 
      description: isSpanish ? "Fortaleciendo tu autoconfianza" : "Strengthening your self-belief" 
    },
    { 
      id: "setting-boundaries", 
      label: isSpanish ? "Establecer Límites" : "Setting Boundaries", 
      icon: "🛡️", 
      description: isSpanish ? "Protegiendo tu energía y valores" : "Protecting your energy and values" 
    },
    { 
      id: "career-growth", 
      label: isSpanish ? "Crecimiento Profesional" : "Career Growth", 
      icon: "📈", 
      description: isSpanish ? "Avanzando en tu viaje profesional" : "Advancing your professional journey" 
    },
    { 
      id: "health-wellness", 
      label: isSpanish ? "Salud y Bienestar" : "Health & Wellness", 
      icon: "🌿", 
      description: isSpanish ? "Nutriendo tu cuerpo y mente" : "Nurturing your body and mind" 
    },
    { 
      id: "overcoming-trauma", 
      label: isSpanish ? "Superar Trauma" : "Overcoming Trauma", 
      icon: "🌄", 
      description: isSpanish ? "Sanando heridas pasadas para el crecimiento futuro" : "Healing past wounds for future growth" 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomMessage = inspirations[Math.floor(Math.random() * inspirations.length)];
        if (!inspirationMessages.includes(randomMessage)) {
          setInspirationMessages(prev => [randomMessage, ...prev].slice(0, 3));
          setShowInspirationMsg(true);
          setTimeout(() => setShowInspirationMsg(false), 4000);
        }
      }
    }, 8000);
    
    return () => clearInterval(timer);
  }, [inspirationMessages, inspirations]);

  // Use a debounced toggle function to prevent rapid firing of state changes
  const handleToggle = (id: string, type: 'quality' | 'goal') => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setAnimatingCard(id);
    
    // Implement a slight delay to avoid rapid state changes
    setTimeout(() => {
      if (type === 'quality') {
        onQualityToggle(id);
      } else {
        onGoalToggle(id);
      }
      
      // Clear animation state after a delay
      setTimeout(() => {
        setAnimatingCard(null);
        setIsProcessing(false);
      }, 300);
    }, 100);
  };

  const navToPersonalized = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      navigate("/app/personalized-content", { state: { qualities: selectedQualities, goals: selectedGoals } });
      setIsProcessing(false);
    }, 500);
  };

  const handleContinue = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      onContinue();
      setIsProcessing(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      onPrevious();
      setIsProcessing(false);
    }, 300);
  };

  const handleSkip = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      onSkip();
      setIsProcessing(false);
    }, 300);
  };

  const getCardClasses = (id: string, selectedItems: string[]) => {
    const isSelected = selectedItems.includes(id);
    const isAnimating = animatingCard === id;
    
    let classes = "relative rounded-xl border p-4 transition-all duration-300 cursor-pointer transform shadow-sm ";
    
    if (isAnimating && isSelected) {
      classes += "scale-110 shadow-lg animate-pulse ";
    } else if (isSelected) {
      classes += "bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/20 border-[#B87333] scale-105 shadow-md ";
    } else {
      classes += "hover:scale-105 hover:shadow-md bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 ";
    }
    
    return classes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#32325e] to-[#16213e] py-10 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-50 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-[#B87333]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[30%] w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] right-[25%] w-40 h-40 bg-[#B87333]/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-pulse">
            {translations.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {translations.subtitle}
          </p>
          
          <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#B87333]/90 to-[#E5C5A1]/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-md transition-all duration-500 z-50 max-w-md ${showInspirationMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <p className="text-white font-medium text-sm">{inspirationMessages[0]}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl mb-8 p-1 flex gap-1 max-w-xs mx-auto">
          <button
            onClick={() => !isProcessing && setActiveTab('qualities')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'qualities' 
                ? 'bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white shadow-md' 
                : 'text-white/70 hover:bg-white/10'
            }`}
            disabled={isProcessing}
          >
            <Star className={`h-4 w-4 ${activeTab === 'qualities' ? 'text-white' : 'text-[#B87333]'}`} />
            <span className="font-medium">{translations.qualitiesTab}</span>
          </button>
          <button
            onClick={() => !isProcessing && setActiveTab('goals')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'goals' 
                ? 'bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white shadow-md' 
                : 'text-white/70 hover:bg-white/10'
            }`}
            disabled={isProcessing}
          >
            <Target className={`h-4 w-4 ${activeTab === 'goals' ? 'text-white' : 'text-[#B87333]'}`} />
            <span className="font-medium">{translations.goalsTab}</span>
          </button>
        </div>

        <div className="mb-6 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
            <span className="font-medium">
              {activeTab === 'qualities' 
                ? `${selectedQualities.length} ${translations.of} ${qualities.length} ${translations.qualitiesSelected}` 
                : `${selectedGoals.length} ${translations.of} ${goals.length} ${translations.goalsSelected}`}
            </span>
          </div>
        </div>

        {activeTab === 'qualities' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 overflow-visible">
              {qualities.map((quality) => (
                <div 
                  key={quality.id}
                  onClick={() => handleToggle(quality.id, 'quality')}
                  className={getCardClasses(quality.id, selectedQualities)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{quality.icon}</div>
                    <h3 className={`text-lg font-medium mb-1 ${
                      selectedQualities.includes(quality.id) ? "text-[#B87333]" : "text-white/90"
                    }`}>
                      {quality.label}
                    </h3>
                    <p className="text-xs text-white/60">{quality.description}</p>
                  </div>
                  
                  {selectedQualities.includes(quality.id) && (
                    <div className="absolute -top-2 -right-2 bg-[#B87333] rounded-full p-1 shadow-lg">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 overflow-visible">
              {goals.map((goal) => (
                <div 
                  key={goal.id}
                  onClick={() => handleToggle(goal.id, 'goal')}
                  className={getCardClasses(goal.id, selectedGoals)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{goal.icon}</div>
                    <h3 className={`text-lg font-medium mb-1 ${
                      selectedGoals.includes(goal.id) ? "text-[#B87333]" : "text-white/90"
                    }`}>
                      {goal.label}
                    </h3>
                    <p className="text-xs text-white/60">{goal.description}</p>
                  </div>
                  
                  {selectedGoals.includes(goal.id) && (
                    <div className="absolute -top-2 -right-2 bg-[#B87333] rounded-full p-1 shadow-lg">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-between mt-12 gap-4">
          <Button 
            onClick={handlePrevious} 
            variant="outline" 
            className="bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
            disabled={isProcessing}
          >
            {translations.previous}
          </Button>
          
          <Button 
            onClick={handleSkip} 
            variant="ghost" 
            className="text-white/60 hover:text-white hover:bg-white/5"
            disabled={isProcessing}
          >
            {translations.skip}
          </Button>
          
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isProcessing}
          >
            {translations.continue}
          </Button>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#1a1a2e]/60 to-[#32325e]/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl animate-pulse">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] p-3 rounded-full shadow-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">{translations.personalizedRecs}</h3>
                <p className="text-white/70">{translations.personalizedSubtitle}</p>
              </div>
            </div>
            <Button 
              onClick={navToPersonalized}
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] shadow-lg group transition-all duration-300"
              disabled={isProcessing}
            >
              {translations.visitPersonalized}
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
