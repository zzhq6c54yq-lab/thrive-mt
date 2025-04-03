
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Brain, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog";
import { PhoneCall, MessageSquare, LifeBuoy, Heart, AlertTriangle } from "lucide-react";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onPrevious: () => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect, onPrevious }) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
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
    previous: isSpanish ? "Anterior" : "Previous",
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
    scrollDown: isSpanish ? "Desplázate para ver opciones" : "Scroll to see options",
  };
  
  // Mood data with simple icons and mental health colors
  const moods = [
    {
      id: 'happy',
      label: translations.happy,
      icon: <Smile className="w-full h-full" />,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      message: isSpanish 
        ? "Tu alegría es un regalo para el mundo. Cada sonrisa que compartes tiene el poder de iluminar el día de alguien más."
        : "Your joy is a gift to the world. Each smile you share has the power to brighten someone else's day."
    },
    {
      id: 'ok',
      label: translations.justOk,
      icon: <Brain className="w-full h-full" />,
      color: "bg-sky-500",
      textColor: "text-sky-600",
      message: isSpanish 
        ? "Estar 'más o menos' es un lugar de auténtica sabiduría. No todo tiene que ser extraordinario para ser valioso."
        : "Being 'just okay' is a place of genuine wisdom. Not everything needs to be extraordinary to be valuable."
    },
    {
      id: 'neutral',
      label: translations.neutral,
      icon: <Meh className="w-full h-full" />,
      color: "bg-slate-500",
      textColor: "text-slate-600",
      message: isSpanish 
        ? "La neutralidad es un lienzo en blanco lleno de posibilidades. Desde este espacio equilibrado, puedes elegir conscientemente hacia dónde dirigir tu energía."
        : "Neutrality is a blank canvas full of possibilities. From this balanced space, you can consciously choose where to direct your energy."
    },
    {
      id: 'down',
      label: translations.down,
      icon: <HeartCrack className="w-full h-full" />,
      color: "bg-violet-500",
      textColor: "text-violet-600",
      message: isSpanish 
        ? "Sentirse decaído no es un signo de debilidad, sino de humanidad. Tus emociones, incluso las difíciles, te enseñan sobre ti mismo y lo que necesitas."
        : "Feeling down isn't a sign of weakness, but of humanity. Your emotions, even the difficult ones, teach you about yourself and what you need."
    },
    {
      id: 'sad',
      icon: <Frown className="w-full h-full" />,
      label: translations.sad,
      color: "bg-indigo-600",
      textColor: "text-indigo-600",
      message: isSpanish 
        ? "Tu tristeza habla de tu profunda capacidad para sentir. En estos momentos vulnerables, recuerda que no estás solo, aunque el camino se sienta solitario."
        : "Your sadness speaks to your deep capacity to feel. In these vulnerable moments, remember you are not alone, even when the path feels solitary."
    },
    {
      id: 'overwhelmed',
      icon: <Angry className="w-full h-full" />,
      label: translations.overwhelmed,
      color: "bg-rose-600",
      textColor: "text-rose-600",
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
    setSelectedMood(mood.id);
    
    // For sad/overwhelmed moods, show resources first
    if (mood.id === 'sad' || mood.id === 'overwhelmed') {
      setShowResourcesDialog(true);
    } else if (mood.id) {
      // For other moods, proceed directly
      onMoodSelect(mood.id as any);
    }
  };
  
  // Handle final continue after resources
  const handleResourcesContinue = () => {
    setShowResourcesDialog(false);
    if (selectedMood) {
      onMoodSelect(selectedMood as any);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1a1a1f] to-[#2a2a35] text-white relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B87333]/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-10 flex-1 flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#B87333]/90">
            {translations.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {translations.subtitle}
          </p>
        </motion.div>
        
        {/* Mood Grid with larger spacing */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {moods.map((mood, index) => (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() => handleMoodClick(mood)}
                  className="w-full h-full flex flex-col items-center justify-center rounded-xl p-6 transition-all duration-300 bg-white/10 hover:bg-white/15 hover:scale-105 border-2 border-white/10 hover:border-white/20 shadow-xl"
                >
                  <div className={`w-20 h-20 ${mood.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                    {mood.icon}
                  </div>
                  <span className="text-white text-lg font-medium">{mood.label}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-4 mb-8 text-white/50 animate-bounce">
          <div className="flex flex-col items-center">
            <ChevronDown className="h-6 w-6" />
            <span className="text-sm">{translations.scrollDown}</span>
          </div>
        </div>
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 flex justify-center"
        >
          <Button
            onClick={onPrevious}
            variant="outline"
            className="border-[#B87333]/50 text-white hover:bg-[#B87333]/20 text-lg py-6 px-8"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {translations.previous}
          </Button>
        </motion.div>
      </div>
      
      {/* Support Resources Dialog (only for sad/overwhelmed) - Enhanced Alert */}
      <AlertDialog open={showResourcesDialog} onOpenChange={setShowResourcesDialog}>
        <AlertDialogContent className="bg-[#1a1a1f] border-2 border-red-500/50 text-white max-w-md">
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
            
            <div className="grid grid-cols-1 gap-4 max-h-[40vh] overflow-y-auto pr-2">
              {emergencyResources.map((resource, index) => (
                <div 
                  key={index} 
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
                </div>
              ))}
            </div>
            
            {/* Visual cue - up and down arrows */}
            <div className="flex justify-center my-4">
              <div className="text-red-400/60 animate-bounce">
                <ChevronDown className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <AlertDialogFooter className="mt-4">
            <AlertDialogAction 
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
              onClick={handleResourcesContinue}
            >
              {translations.continueText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MoodScreen;
