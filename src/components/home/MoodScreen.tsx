import React, { useState } from "react";
import { Smile, Meh, Frown, HeartCrack, Angry, Brain, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog";
import { PhoneCall, MessageSquare, LifeBuoy, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect }) => {
  // Use the translation hook
  const { isSpanish } = useTranslation();
  
  // State for mood selection and dialogs
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showResourcesDialog, setShowResourcesDialog] = useState(false);
  
  // Translations
  const translations = {
    title: isSpanish ? "¿Cómo te sientes hoy?" : "How are you feeling today?",
    subtitle: isSpanish ? "Selecciona la emoción que mejor describa cómo te sientes" : "Select the emotion that best describes how you're feeling",
    happy: isSpanish ? "Feliz" : "Happy",
    justOk: isSpanish ? "Más o Menos" : "Just Ok",
    neutral: isSpanish ? "Neutral" : "Neutral",
    down: isSpanish ? "Decaído" : "Feeling Down",
    sad: isSpanish ? "Triste" : "Sad",
    overwhelmed: isSpanish ? "Abrumado" : "Overwhelmed",
    continueText: isSpanish ? "Continuar" : "Continue",
    emergencyResources: isSpanish ? "Recursos de apoyo" : "Support resources",
    warningText: isSpanish ? "Pareces estar pasando por un momento difícil" : "You seem to be going through a difficult time",
    helpAvailable: isSpanish ? "Hay ayuda disponible" : "Help is available",
    callNow: isSpanish ? "Llamar ahora" : "Call now",
    textLine: isSpanish ? "Línea de texto" : "Text line",
    crisisSupport: isSpanish ? "Apoyo en crisis" : "Crisis support",
    emergencyHelp: isSpanish ? "Ayuda de emergencia" : "Emergency help",
    needHelp: isSpanish ? "¿Necesitas ayuda?" : "Need help?",
    getSupport: isSpanish ? "Obtener apoyo" : "Get support",
    reflectPrompt: isSpanish ? "Tómate un momento para reflexionar" : "Take a moment to reflect",
  };
  
  // Mood data with the same golden gradient for all icons
  const moods = [
    {
      id: 'happy',
      label: translations.happy,
      icon: <Smile className="w-full h-full" />,
      message: isSpanish 
        ? "Tu alegría es un regalo para el mundo. Cada sonrisa que compartes tiene el poder de iluminar el día de alguien más."
        : "Your joy is a gift to the world. Each smile you share has the power to brighten someone else's day."
    },
    {
      id: 'ok',
      label: translations.justOk,
      icon: <Brain className="w-full h-full" />,
      message: isSpanish 
        ? "Estar 'más o menos' es un lugar de auténtica sabiduría. No todo tiene que ser extraordinario para ser valioso."
        : "Being 'just okay' is a place of genuine wisdom. Not everything needs to be extraordinary to be valuable."
    },
    {
      id: 'neutral',
      label: translations.neutral,
      icon: <Meh className="w-full h-full" />,
      message: isSpanish 
        ? "La neutralidad es un lienzo en blanco lleno de posibilidades. Desde este espacio equilibrado, puedes elegir conscientemente hacia dónde dirigir tu energía."
        : "Neutrality is a blank canvas full of possibilities. From this balanced space, you can consciously choose where to direct your energy."
    },
    {
      id: 'down',
      label: translations.down,
      icon: <HeartCrack className="w-full h-full" />,
      message: isSpanish 
        ? "Sentirse decaído no es un signo de debilidad, sino de humanidad. Tus emociones, incluso las difíciles, te enseñan sobre ti mismo y lo que necesitas."
        : "Feeling down isn't a sign of weakness, but of humanity. Your emotions, even the difficult ones, teach you about yourself and what you need."
    },
    {
      id: 'sad',
      icon: <Frown className="w-full h-full" />,
      label: translations.sad,
      message: isSpanish 
        ? "Tu tristeza habla de tu profunda capacidad para sentir. En estos momentos vulnerables, recuerda que no estás solo, aunque el camino se sienta solitario."
        : "Your sadness speaks to your deep capacity to feel. In these vulnerable moments, remember you are not alone, even when the path feels solitary."
    },
    {
      id: 'overwhelmed',
      icon: <Angry className="w-full h-full" />,
      label: translations.overwhelmed,
      message: isSpanish 
        ? "Cuando todo se siente demasiado, recuerda respirar. No necesitas cargar el peso del mundo en tus hombros. Da un pequeño paso, solo uno, y luego el siguiente."
        : "When everything feels too much, remember to breathe. You don't need to carry the weight of the world on your shoulders. Take one small step, just one, and then the next."
    }
  ];

  // Emergency resources content
  const emergencyResources = [
    {
      icon: <PhoneCall className="h-5 w-5" />,
      title: isSpanish ? "Línea Nacional de Prevención del Suicidio" : "National Suicide Prevention Lifeline",
      description: isSpanish ? "Apoyo gratuito 24/7 para personas en crisis" : "Free 24/7 support for people in crisis",
      contact: "988",
      action: translations.callNow
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: isSpanish ? "Línea de Texto de Crisis" : "Crisis Text Line",
      description: isSpanish ? "Apoyo por mensaje de texto las 24 horas" : "24/7 text message support",
      contact: "Text HOME to 741741",
      action: translations.textLine
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: isSpanish ? "Línea de Ayuda SAMHSA" : "SAMHSA's Helpline",
      description: isSpanish ? "Tratamiento para trastornos de salud mental" : "Treatment for mental health disorders",
      contact: "1-800-662-4357",
      action: translations.crisisSupport
    },
    {
      icon: <LifeBuoy className="h-5 w-5" />,
      title: isSpanish ? "Servicios de Emergencia" : "Emergency Services",
      description: isSpanish ? "Para situaciones que amenazan la vida" : "For life-threatening situations",
      contact: "911",
      action: translations.emergencyHelp
    }
  ];

  // Handle mood selection - Show resources for sad/overwhelmed immediately
  const handleMoodClick = (mood: any) => {
    console.log(`[MoodScreen] User selected mood: ${mood.id}`);
    setSelectedMood(mood.id);
    
    // For sad/overwhelmed moods, show resources first
    if (mood.id === 'sad' || mood.id === 'overwhelmed') {
      setShowResourcesDialog(true);
    } else if (mood.id) {
      // For other moods, proceed directly
      console.log(`[MoodScreen] Calling onMoodSelect with mood: ${mood.id}`);
      onMoodSelect(mood.id as any);
    }
  };
  
  // Handle final continue after resources
  const handleResourcesContinue = () => {
    setShowResourcesDialog(false);
    if (selectedMood) {
      console.log(`[MoodScreen] Continuing after resources dialog with mood: ${selectedMood}`);
      onMoodSelect(selectedMood as any);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B87333]/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B87333]/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-10 flex-1 flex flex-col">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block mb-8"
          >
            {/* Replace the head outline logo with MT letters */}
            <div className="h-20 w-20 mx-auto flex items-center justify-center">
              <div className="relative h-full w-full flex items-center justify-center">
                {/* Gold gradient background for the letters */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/20 backdrop-blur-sm"></div>
                
                {/* MT letters with gold gradient */}
                <div className="relative z-10 flex items-center justify-center text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#B87333] to-[#E5C5A1]">MT</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-light mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B87333] leading-[1.2] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {translations.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto font-light mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            {translations.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 bg-white/5 backdrop-blur-sm max-w-lg mx-auto rounded-lg p-4 border border-white/10"
          >
            <p className="text-white/80 italic leading-relaxed">{translations.reflectPrompt}</p>
          </motion.div>
        </motion.div>
        
        {/* Mood Grid with elegant animations */}
        <div className="flex-1 flex items-center justify-center max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {moods.map((mood, index) => (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.5, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleMoodClick(mood)}
                  className="w-full h-full flex flex-col items-center justify-center rounded-xl p-6 transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B87333]/30 backdrop-blur-sm shadow-lg min-h-[140px]"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
                    {mood.icon}
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-lg font-medium leading-relaxed">{mood.label}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Support Resources Dialog (only for sad/overwhelmed) */}
        <AlertDialog open={showResourcesDialog} onOpenChange={setShowResourcesDialog}>
          <AlertDialogContent className="bg-[#1a1a1f]/95 backdrop-blur-xl border-2 border-red-500/50 text-white max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold flex items-center gap-3 text-red-400">
                <AlertTriangle className="h-7 w-7 text-red-400" />
                {translations.needHelp}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/90 text-lg">
                {translations.warningText}
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="mt-6">
              <h4 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-400" />
                {translations.emergencyResources}
              </h4>
              
              <div className="grid grid-cols-1 gap-4 max-h-[40vh] overflow-y-auto pr-2 pb-2">
                {emergencyResources.map((resource, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="bg-red-950/20 border border-red-500/20 backdrop-blur-sm rounded-lg p-4 hover:bg-red-900/20 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-red-500/20 rounded-full text-red-400">
                        {resource.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-lg mb-1">{resource.title}</h5>
                        <p className="text-white/70 mb-2">{resource.description}</p>
                        <p className="text-red-400 font-bold text-lg">{resource.contact}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <AlertDialogFooter className="mt-6">
              <AlertDialogAction 
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-4 rounded-lg"
                onClick={handleResourcesContinue}
              >
                {translations.continueText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MoodScreen;
