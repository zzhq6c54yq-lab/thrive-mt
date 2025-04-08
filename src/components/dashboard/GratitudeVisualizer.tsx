import React, { useState, useEffect } from "react";
import { Heart, Image, RefreshCw, Sparkles, Stars, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface GratitudeVisualizerProps {
  onReset?: () => void;
}

const GratitudeVisualizer: React.FC<GratitudeVisualizerProps> = ({ onReset }) => {
  const [gratitude, setGratitude] = useState<string>("");
  const [savedGratitude, setSavedGratitude] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<number>(0);
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const { toast } = useToast();
  
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  const translations = {
    title: isSpanish ? "Visualizador de Gratitud" : "Gratitude Visualizer",
    instruction: isSpanish ? "Tómate un momento para reflexionar sobre algo por lo que estás agradecido hoy. Tu nota se mostrará como un hermoso recordatorio visual." : "Take a moment to reflect on something you're grateful for today. Your note will be displayed as a beautiful visual reminder.",
    placeholder: isSpanish ? "Estoy agradecido por..." : "I am grateful for...",
    chooseBackground: isSpanish ? "Elige un fondo:" : "Choose a background:",
    saveGratitude: isSpanish ? "Guardar Gratitud" : "Save Gratitude",
    resetGratitude: isSpanish ? "Reiniciar" : "Reset",
    todayGratitude: isSpanish ? "Mi Gratitud de Hoy" : "My Gratitude Today",
    changeBackground: isSpanish ? "Cambiar Fondo" : "Change Background",
    emptyTitle: isSpanish ? "Gratitud Vacía" : "Empty Gratitude",
    emptyDescription: isSpanish ? "Por favor ingresa algo por lo que estés agradecido." : "Please enter something you're grateful for.",
    savedTitle: isSpanish ? "Gratitud Guardada" : "Gratitude Saved",
    savedDescription: isSpanish ? "Tu recordatorio de gratitud ha sido guardado." : "Your gratitude reminder has been saved.",
    resetTitle: isSpanish ? "Gratitud Reiniciada" : "Gratitude Reset",
    resetDescription: isSpanish ? "Tu recordatorio de gratitud ha sido reiniciado." : "Your gratitude reminder has been reset.",
    imageTitle: isSpanish ? "Imagen Subida" : "Image Uploaded",
    imageDescription: isSpanish ? "Tu fondo personalizado ha sido establecido." : "Your custom background has been set."
  };
  
  const backgrounds = [
    "bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF]", // Soft pink gradient
    "bg-gradient-to-r from-[#667EEA] to-[#764BA2]", // Purple-blue gradient
    "bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB]", // Sky blue gradient
    "bg-gradient-to-r from-[#0BA360] to-[#3CBA92]", // Green gradient
    "bg-gradient-to-r from-[#FF9A9E] via-[#F6416C] to-[#FFA99F]", // Pink-red gradient
  ];
  
  useEffect(() => {
    const savedValue = localStorage.getItem("gratitude");
    const savedBg = localStorage.getItem("gratitudeBg");
    const savedCustomBg = localStorage.getItem("gratitudeCustomBg");
    
    if (savedValue) setSavedGratitude(savedValue);
    if (savedBg) setSelectedBackground(parseInt(savedBg));
    if (savedCustomBg) setCustomBackground(savedCustomBg);
  }, []);
  
  const saveGratitude = () => {
    if (!gratitude.trim()) {
      toast({
        title: translations.emptyTitle,
        description: translations.emptyDescription,
        variant: "destructive"
      });
      return;
    }
    
    setSavedGratitude(gratitude);
    localStorage.setItem("gratitude", gratitude);
    localStorage.setItem("gratitudeBg", selectedBackground.toString());
    if (customBackground) {
      localStorage.setItem("gratitudeCustomBg", customBackground);
    }
    
    toast({
      title: translations.savedTitle,
      description: translations.savedDescription,
    });
    
    setGratitude("");
  };
  
  const handleReset = () => {
    setSavedGratitude(null);
    setSelectedBackground(0);
    setCustomBackground(null);
    localStorage.removeItem("gratitude");
    localStorage.removeItem("gratitudeBg");
    localStorage.removeItem("gratitudeCustomBg");
    
    toast({
      title: translations.resetTitle,
      description: translations.resetDescription,
    });
    
    if (onReset) onReset();
  };
  
  const selectBackground = (index: number) => {
    setSelectedBackground(index);
    setCustomBackground(null);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setCustomBackground(result);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: translations.imageTitle,
        description: translations.imageDescription,
      });
    }
  };
  
  const currentBackgroundStyle = customBackground
    ? { backgroundImage: `url(${customBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};
  
  const currentBackgroundClass = customBackground ? "" : backgrounds[selectedBackground];
  
  return (
    <div className="mb-6 transform transition-all duration-500 hover:scale-[1.01]">
      {!savedGratitude ? (
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-white/20 transform transition-all duration-500 hover:shadow-[0_10px_40px_-15px_rgba(255,154,158,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FF9A9E]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#FECFEF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10">
            <Stars className="w-full h-full" />
          </div>
          
          <p className="text-gray-700 mb-6 text-lg">
            {translations.instruction}
          </p>
          
          <div className="mb-6">
            <textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#FF9A9E] focus:border-transparent resize-none text-lg shadow-inner"
              placeholder={translations.placeholder}
              rows={3}
            />
          </div>
          
          <div className="mb-8">
            <p className="text-gray-700 mb-3 font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-[#FECFEF]" />
              {translations.chooseBackground}
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => selectBackground(index)}
                  className={cn(
                    bg, 
                    "w-16 h-16 rounded-xl border-2 transition-all duration-300 relative overflow-hidden",
                    selectedBackground === index && !customBackground
                      ? "border-gray-700 scale-110 shadow-lg shadow-[rgba(255,154,158,0.3)]" 
                      : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                  )}
                >
                  {selectedBackground === index && !customBackground && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="bg-white/20 rounded-full p-1">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
              
              <label className={cn(
                "w-16 h-16 rounded-xl border-2 flex items-center justify-center cursor-pointer bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-105 relative overflow-hidden",
                customBackground ? "border-gray-700 scale-110 shadow-lg shadow-[rgba(255,154,158,0.3)]" : "border-transparent opacity-70"
              )}>
                <Image size={24} className="text-gray-700" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {customBackground && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="bg-white/20 rounded-full p-1">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </label>
            </div>
            
            <Button
              onClick={saveGratitude}
              className="w-full bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] hover:from-[#FF8A8E] hover:to-[#FEBFDF] text-white shadow-md shadow-[rgba(255,154,158,0.3)] hover:shadow-lg transition-all duration-300"
            >
              {translations.saveGratitude}
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className={cn(
            "rounded-2xl p-8 shadow-xl border border-white/20 transform transition-all duration-500 hover:shadow-[0_10px_40px_-15px_rgba(255,154,158,0.3)] relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]",
            currentBackgroundClass
          )}
          style={currentBackgroundStyle}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 text-center max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
              {translations.todayGratitude}
            </h3>
            
            <p className="text-white text-xl font-semibold leading-relaxed mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              "{savedGratitude}"
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={handleReset}
                size="sm"
                variant="outline"
                className="bg-white/30 border-white/60 text-white hover:bg-white/40 transition-all duration-300 backdrop-blur-md shadow-md"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {translations.resetGratitude}
              </Button>
              
              <Button
                onClick={() => setSavedGratitude(null)}
                size="sm"
                variant="outline"
                className="bg-white/30 border-white/60 text-white hover:bg-white/40 transition-all duration-300 backdrop-blur-md shadow-md"
              >
                <Image className="mr-2 h-4 w-4" />
                {translations.changeBackground}
              </Button>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 opacity-50">
            <Heart className="h-6 w-6 text-white drop-shadow-lg" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-50">
            <Sparkles className="h-6 w-6 text-white drop-shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeVisualizer;
