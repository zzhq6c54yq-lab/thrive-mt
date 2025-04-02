import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Annoyed } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onPrevious: () => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect, onPrevious }) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // State for hover effects and mood dialog
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  
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
    continueText: isSpanish ? "Continuar" : "Continue",
    inspirationalMessage: isSpanish ? "Mensaje Inspiracional" : "Inspirational Message",
    emergencyResources: isSpanish ? "Recursos de Emergencia" : "Emergency Resources",
    closeDialog: isSpanish ? "Cerrar" : "Close",
  };
  
  // Mood data with inspirational messages
  const moods = [
    {
      id: 'happy',
      label: translations.happy,
      icon: <Smile className="w-full h-full" />,
      gradient: "bg-gradient-to-br from-yellow-300 to-amber-400",
      shadowColor: "shadow-amber-200/50",
      textColor: "text-amber-700",
      iconGradient: "bg-gradient-to-br from-yellow-200 to-amber-300",
      accentColor: "amber-400",
      message: isSpanish 
        ? "¡Tu alegría ilumina todo a tu alrededor! Hoy es un día para celebrar los pequeños momentos de felicidad y compartir tu energía positiva con los demás. Recuerda que tu sonrisa puede cambiar el día de alguien más."
        : "Your joy brightens everything around you! Today is a day to celebrate the small moments of happiness and share your positive energy with others. Remember that your smile can change someone else's day."
    },
    {
      id: 'ok',
      label: translations.justOk,
      icon: <Annoyed className="w-full h-full" />,
      gradient: "bg-gradient-to-br from-blue-300 to-sky-400",
      shadowColor: "shadow-sky-200/50",
      textColor: "text-sky-700",
      iconGradient: "bg-gradient-to-br from-blue-200 to-sky-300",
      accentColor: "sky-400",
      message: isSpanish 
        ? "Estar 'más o menos' es perfectamente normal. A veces los días son así, ni demasiado altos ni demasiado bajos. En estos momentos, date permiso para simplemente existir y observar lo que necesitas hoy."
        : "Feeling 'just ok' is perfectly normal. Sometimes days are like this - neither too high nor too low. In these moments, give yourself permission to simply exist and observe what you need today."
    },
    {
      id: 'neutral',
      label: translations.neutral,
      icon: <Meh className="w-full h-full" />,
      gradient: "bg-gradient-to-br from-gray-300 to-gray-400",
      shadowColor: "shadow-gray-200/50",
      textColor: "text-gray-700",
      iconGradient: "bg-gradient-to-br from-gray-200 to-gray-300",
      accentColor: "gray-400",
      message: isSpanish 
        ? "La neutralidad es un espacio de calma y equilibrio. Desde este lugar centrado, puedes observar tus pensamientos y sentimientos sin juicio. Es una base sólida desde la cual puedes elegir conscientemente tu próximo paso."
        : "Neutrality is a space of calm and balance. From this centered place, you can observe your thoughts and feelings without judgment. It's a solid foundation from which you can consciously choose your next step."
    },
    {
      id: 'down',
      label: translations.down,
      icon: <HeartCrack className="w-full h-full" />,
      gradient: "bg-gradient-to-br from-indigo-300 to-indigo-400",
      shadowColor: "shadow-indigo-200/50",
      textColor: "text-indigo-700",
      iconGradient: "bg-gradient-to-br from-indigo-200 to-indigo-300",
      accentColor: "indigo-400",
      message: isSpanish 
        ? "Sentirse decaído es parte del viaje humano. Recuerda que tus sentimientos son válidos y temporales. Sé amable contigo mismo hoy, como lo serías con un buen amigo que está pasando por un momento difícil."
        : "Feeling down is part of the human journey. Remember that your feelings are valid and temporary. Be gentle with yourself today, just as you would be with a good friend going through a tough time."
    },
    {
      id: 'sad',
      label: translations.sad,
      icon: <Frown className="w-full h-full" />,
      gradient: "bg-gradient-to-br from-purple-300 to-purple-400",
      shadowColor: "shadow-purple-200/50",
      textColor: "text-purple-700",
      iconGradient: "bg-gradient-to-br from-purple-200 to-purple-300",
      accentColor: "purple-400",
      message: isSpanish 
        ? "Tu tristeza habla de tu capacidad para sentir profundamente. Está bien no estar bien a veces. Date el espacio para procesar estos sentimientos y recuerda que no estás solo en tu experiencia. Hay apoyo disponible cuando lo necesites."
        : "Your sadness speaks to your capacity to feel deeply. It's okay to not be okay sometimes. Give yourself the space to process these feelings, and remember that you're not alone in your experience. Support is available when you need it."
    },
    {
      id: 'overwhelmed',
      label: translations.overwhelmed,
      icon: <Angry className="w-full h-full" />,
      gradient: "bg-gradient-to-br from-orange-300 to-orange-400",
      shadowColor: "shadow-orange-200/50",
      textColor: "text-orange-700",
      iconGradient: "bg-gradient-to-br from-orange-200 to-orange-300",
      accentColor: "orange-400",
      message: isSpanish 
        ? "Sentirse abrumado es una señal de que necesitas cuidarte. Respira profundamente y recuerda que no tienes que hacerlo todo a la vez. Está bien establecer límites y pedir ayuda. Un paso a la vez es todo lo que necesitas dar ahora."
        : "Feeling overwhelmed is a signal that you need self-care. Take a deep breath and remember that you don't have to do it all at once. It's okay to set boundaries and ask for help. One step at a time is all you need to take right now."
    }
  ];

  // Emergency resources content
  const emergencyResources = [
    {
      title: isSpanish ? "Línea Nacional de Prevención del Suicidio" : "National Suicide Prevention Lifeline",
      description: isSpanish ? "Disponible 24/7" : "Available 24/7",
      phone: "988",
    },
    {
      title: isSpanish ? "Línea de Texto de Crisis" : "Crisis Text Line",
      description: isSpanish ? "Envía HOME al 741741" : "Text HOME to 741741",
      phone: "741741",
    },
    {
      title: isSpanish ? "Línea Nacional de Violencia Doméstica" : "National Domestic Violence Hotline",
      description: isSpanish ? "Ayuda confidencial 24/7" : "Confidential help 24/7",
      phone: "1-800-799-7233",
    },
    {
      title: isSpanish ? "Servicios de Emergencia" : "Emergency Services",
      description: isSpanish ? "Para emergencias inmediatas" : "For immediate emergencies",
      phone: "911",
    }
  ];

  // Animation variants
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

  // Handle mood selection
  const handleMoodClick = (mood: any) => {
    setSelectedMood(mood.id);
    setShowMoodDialog(true);
  };

  // Handle continuing after showing message
  const handleContinue = () => {
    setShowMoodDialog(false);
    if (selectedMood) {
      onMoodSelect(selectedMood as any);
    }
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
                onClick={() => handleMoodClick(mood)}
                className="w-full h-full flex flex-col items-center overflow-hidden transition-all duration-300 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl"
                style={{
                  transform: hoveredMood === mood.id ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
                aria-label={mood.label}
              >
                {/* Top section with icon */}
                <div className={`w-full p-6 text-center ${mood.gradient} bg-opacity-90`}>
                  <div className={`w-20 h-20 mx-auto rounded-full p-4 ${mood.iconGradient} shadow-lg ${mood.shadowColor} text-white`}>
                    {mood.icon}
                  </div>
                </div>
                
                {/* Content section */}
                <div className="w-full bg-white/10 backdrop-blur-md p-5 flex-1 flex flex-col justify-between">
                  <h3 className={`text-xl font-medium text-white mb-2`}>
                    {mood.label}
                  </h3>
                  <div className="mt-4 w-full">
                    <div className={`h-1 w-1/3 bg-${mood.accentColor} rounded-full mx-auto opacity-70`}></div>
                  </div>
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
      
      {/* Inspirational Message Dialog */}
      <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
        <DialogContent className="bg-[#1a1a1f] border-[#B87333]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {translations.inspirationalMessage}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {selectedMood && moods.find(m => m.id === selectedMood) && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full p-2 ${moods.find(m => m.id === selectedMood)?.iconGradient} flex items-center justify-center`}>
                    {moods.find(m => m.id === selectedMood)?.icon}
                  </div>
                  <h3 className="text-lg font-medium">
                    {moods.find(m => m.id === selectedMood)?.label}
                  </h3>
                </div>
                
                <p className="text-white/90 leading-relaxed">
                  {moods.find(m => m.id === selectedMood)?.message}
                </p>
                
                {/* Show emergency resources for sad and overwhelmed moods */}
                {(selectedMood === 'sad' || selectedMood === 'overwhelmed') && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <h4 className="text-white font-bold mb-3">{translations.emergencyResources}</h4>
                    <div className="space-y-3">
                      {emergencyResources.map((resource, index) => (
                        <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/10">
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-white/70">{resource.description}</div>
                          <div className="text-[#B87333] font-bold mt-1">{resource.phone}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              className="bg-[#B87333] hover:bg-[#B87333]/80 text-white w-full"
              onClick={handleContinue}
            >
              {translations.continueText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodScreen;
