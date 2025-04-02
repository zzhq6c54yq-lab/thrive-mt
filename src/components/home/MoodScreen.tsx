
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";
import { motion } from "framer-motion";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onPrevious: () => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect, onPrevious }) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // State for hover effects
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  
  // Translations
  const translations = {
    title: isSpanish ? "¿Cómo te sientes hoy?" : "How are you feeling today?",
    subtitle: isSpanish ? "Selecciona la emoción que mejor representa cómo te sientes" : "Select the emotion that best represents how you feel",
    happy: isSpanish ? "Feliz" : "Happy",
    justOk: isSpanish ? "Más o Menos" : "Just Ok",
    neutral: isSpanish ? "Neutral" : "Neutral",
    down: isSpanish ? "Decaído" : "Feeling Down",
    sad: isSpanish ? "Triste" : "Sad",
    overwhelmed: isSpanish ? "Abrumado" : "Overwhelmed",
    previous: isSpanish ? "Anterior" : "Previous",
    happyTooltip: isSpanish ? "Me siento alegre y optimista hoy" : "I feel joyful and optimistic about today!",
    justOkTooltip: isSpanish ? "Estoy bien, con altibajos hoy" : "I'm managing fine, with ups and downs today",
    neutralTooltip: isSpanish ? "Me siento equilibrado y estable hoy" : "I'm feeling balanced and steady today",
    downTooltip: isSpanish ? "Podría usar un poco de positividad hoy" : "I could use a little boost of positivity today",
    sadTooltip: isSpanish ? "Estoy experimentando emociones más fuertes hoy" : "I'm experiencing some heavier emotions today",
    overwhelmedTooltip: isSpanish ? "Las cosas se sienten intensas, pero busco equilibrio" : "Things feel intense, but I'm seeking balance"
  };

  // Mood data with additional styling information
  const moods = [
    {
      id: 'happy',
      label: translations.happy,
      icon: <Smile className="w-full h-full" />,
      tooltip: translations.happyTooltip,
      color: "from-yellow-300 to-amber-400",
      textColor: "text-amber-700",
      iconColor: "text-amber-500",
      bgLight: "bg-amber-100"
    },
    {
      id: 'ok',
      label: translations.justOk,
      icon: <Annoyed className="w-full h-full" />,
      tooltip: translations.justOkTooltip,
      color: "from-blue-300 to-sky-400",
      textColor: "text-sky-700",
      iconColor: "text-sky-500",
      bgLight: "bg-sky-100"
    },
    {
      id: 'neutral',
      label: translations.neutral,
      icon: <Meh className="w-full h-full" />,
      tooltip: translations.neutralTooltip,
      color: "from-gray-300 to-gray-400",
      textColor: "text-gray-700",
      iconColor: "text-gray-500",
      bgLight: "bg-gray-100"
    },
    {
      id: 'down',
      label: translations.down,
      icon: <HeartCrack className="w-full h-full" />,
      tooltip: translations.downTooltip,
      color: "from-indigo-300 to-indigo-400",
      textColor: "text-indigo-700",
      iconColor: "text-indigo-500",
      bgLight: "bg-indigo-100"
    },
    {
      id: 'sad',
      label: translations.sad,
      icon: <Frown className="w-full h-full" />,
      tooltip: translations.sadTooltip,
      color: "from-purple-300 to-purple-400",
      textColor: "text-purple-700",
      iconColor: "text-purple-500",
      bgLight: "bg-purple-100"
    },
    {
      id: 'overwhelmed',
      label: translations.overwhelmed,
      icon: <Angry className="w-full h-full" />,
      tooltip: translations.overwhelmedTooltip,
      color: "from-orange-300 to-orange-400",
      textColor: "text-orange-700",
      iconColor: "text-orange-500",
      bgLight: "bg-orange-100"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] to-[#2a2a35] animate-fade-in relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#B87333]/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="z-10 w-full max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {translations.title}
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            {translations.subtitle}
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
        >
          {moods.map((mood) => (
            <motion.div
              key={mood.id}
              variants={item}
              onHoverStart={() => setHoveredMood(mood.id)}
              onHoverEnd={() => setHoveredMood(null)}
              className="relative"
            >
              <button 
                onClick={() => onMoodSelect(mood.id as any)}
                className={`w-full h-full flex flex-col items-center rounded-2xl overflow-hidden transition-all duration-300 ${
                  hoveredMood === mood.id 
                    ? "scale-105 shadow-lg" 
                    : "scale-100 shadow"
                }`}
                aria-label={mood.label}
              >
                <div className={`w-full bg-gradient-to-br ${mood.color} p-6 flex justify-center`}>
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${mood.iconColor}`}>
                    {mood.icon}
                  </div>
                </div>
                <div className={`w-full ${mood.bgLight} p-4`}>
                  <h3 className={`text-lg font-medium ${mood.textColor}`}>{mood.label}</h3>
                  <p className={`text-sm ${mood.textColor}/70 mt-1`}>{mood.tooltip}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Button 
            className="bg-[#B87333] hover:bg-[#B87333]/80 text-white px-6 py-6 h-auto text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {translations.previous}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodScreen;
