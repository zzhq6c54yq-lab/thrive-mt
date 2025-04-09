import React, { useState, useEffect } from "react";
import { Heart, Image, X, RefreshCw, Sparkles, Stars, Flower } from "lucide-react";
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
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
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
  
  // Enhanced background gradients
  const backgrounds = [
    "bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF]", // Soft pink gradient
    "bg-gradient-to-r from-[#667EEA] to-[#764BA2]", // Purple-blue gradient
    "bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB]", // Sky blue gradient
    "bg-gradient-to-r from-[#0BA360] to-[#3CBA92]", // Green gradient
    "bg-gradient-to-r from-[#FF9A9E] via-[#F6416C] to-[#FFA99F]", // Pink-red gradient
  ];
  
  // Load saved gratitude from localStorage on component mount
  useEffect(() => {
    const savedValue = localStorage.getItem("gratitude");
    const savedBg = localStorage.getItem("gratitudeBg");
    const savedCustomBg = localStorage.getItem("gratitudeCustomBg");
    
    if (savedValue) setSavedGratitude(savedValue);
    if (savedBg) setSelectedBackground(parseInt(savedBg));
    if (savedCustomBg) setCustomBackground(savedCustomBg);
  }, []);
  
  // Save gratitude to localStorage
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
  
  // Reset gratitude
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
  
  // Handle background selection
  const selectBackground = (index: number) => {
    setSelectedBackground(index);
    setCustomBackground(null);
  };
  
  // Handle custom image upload
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
  
  // Determine current background style
  const currentBackgroundStyle = customBackground
    ? { backgroundImage: `url(${customBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};
  
  const currentBackgroundClass = customBackground ? "" : backgrounds[selectedBackground];
  
  return (
    <div className="mb-12 transform transition-all duration-500 hover:scale-[1.01]">
      <div className="mb-8 relative">
        <h2 className="text-3xl font-bold inline-flex items-center gap-3 relative">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] opacity-20 animate-pulse"></div>
            <Heart className="h-7 w-7 text-[#FF9A9E] absolute inset-0 m-auto animate-pulse" style={{animationDuration: '2s'}} />
            <div className="absolute -right-1 -top-1 w-4 h-4">
              <Sparkles className="h-full w-full text-[#FECFEF] animate-pulse" style={{animationDuration: '3s', animationDelay: '0.5s'}} />
            </div>
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A9E] via-[#ffffff] to-[#ffffff] tracking-tight">
            {translations.title}
          </span>
        </h2>
        <div className="absolute -bottom-2 left-0 w-64 h-[3px] bg-gradient-to-r from-[#FF9A9E] via-[#F6416C] to-transparent rounded-full"></div>
      </div>
      
      {!savedGratitude ? (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 transform transition-all duration-500 hover:shadow-[0_10px_40px_-15px_rgba(255,154,158,0.3)] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FF9A9E]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#FECFEF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10">
            <Stars className="w-full h-full" />
          </div>
          
          <p className="text-white/80 mb-6 text-lg">
            {translations.instruction}
          </p>
          
          <div className="mb-6">
            <textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#FF9A9E] focus:border-transparent resize-none text-lg shadow-inner"
              placeholder={translations.placeholder}
              rows={3}
            />
          </div>
          
          <div className="mb-8">
            <p className="text-white/90 mb-3 font-medium flex items-center">
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
                      ? "border-white scale-110 shadow-lg shadow-[rgba(255,154,158,0.3)]" 
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
                "w-16 h-16 rounded-xl border-2 flex items-center justify-center cursor-pointer bg-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105 relative overflow-hidden",
                customBackground ? "border-white scale-110 shadow-lg shadow-[rgba(255,154,158,0.3)]" : "border-transparent opacity-70"
              )}>
                <Image size={24} className="text-white" />
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
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 text-center max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
              {translations.todayGratitude}
            </h3>
            
            <p className="text-white text-xl font-medium leading-relaxed mb-6 drop-shadow-md">
              "{savedGratitude}"
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={handleReset}
                size="sm"
                variant="outline"
                className="bg-white/10 border-white/40 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {translations.resetGratitude}
              </Button>
              
              <Button
                onClick={() => setSavedGratitude(null)}
                size="sm"
                variant="outline"
                className="bg-white/10 border-white/40 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
              >
                <Image className="mr-2 h-4 w-4" />
                {translations.changeBackground}
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
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
