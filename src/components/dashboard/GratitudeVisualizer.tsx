
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
        title: "Empty Gratitude",
        description: "Please enter something you're grateful for.",
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
      title: "Gratitude Saved",
      description: "Your gratitude reminder has been saved.",
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
      title: "Gratitude Reset",
      description: "Your gratitude reminder has been reset.",
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
        title: "Image Uploaded",
        description: "Your custom background has been set.",
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
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A9E] via-[#F6416C] to-[#FECFEF] tracking-tight">
            Gratitude Visualizer
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
            Take a moment to reflect on something you're grateful for today. Your note will be displayed as a beautiful visual reminder.
          </p>
          
          <div className="mb-6">
            <textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#FF9A9E] focus:border-transparent resize-none text-lg shadow-inner"
              placeholder="I am grateful for..."
              rows={3}
            />
          </div>
          
          <div className="mb-8">
            <p className="text-white/90 mb-3 font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-[#FECFEF]" />
              Choose a background:
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
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="bg-white/20 rounded-full p-1">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          <Button 
            onClick={saveGratitude}
            className="bg-gradient-to-r from-[#FF9A9E] to-[#F6416C] hover:from-[#F6416C] hover:to-[#FF9A9E] text-white rounded-xl px-6 py-3 font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[rgba(255,154,158,0.25)] w-full sm:w-auto relative overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Sparkles className="h-5 w-5 mr-2 animate-pulse" style={{animationDuration: '3s'}} />
            <span className="text-lg">Save My Gratitude</span>
          </Button>
        </div>
      ) : (
        <div 
          className={cn(
            "rounded-2xl p-10 shadow-2xl overflow-hidden relative min-h-[280px] flex flex-col justify-center items-center text-center transform transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(255,154,158,0.4)]",
            currentBackgroundClass
          )}
          style={currentBackgroundStyle}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-[2px]"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
            <div className="absolute top-0 left-[10%] w-16 h-16 rounded-full bg-white/10 animate-float" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-[30%] right-[5%] w-20 h-20 rounded-full bg-white/10 animate-float" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-[10%] left-[20%] w-12 h-12 rounded-full bg-white/10 animate-float" style={{animationDelay: '2.5s'}}></div>
            <div className="absolute top-[15%] right-[15%] w-10 h-10">
              <Stars className="text-white/30 animate-pulse" style={{animationDuration: '5s'}} />
            </div>
            <div className="absolute bottom-[20%] right-[10%] w-8 h-8">
              <Flower className="text-white/30 animate-float" style={{animationDuration: '7s'}} />
            </div>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] opacity-20 blur-md"></div>
              <Heart className="h-16 w-16 text-white/90 drop-shadow-lg animate-pulse" style={{animationDuration: '4s'}} />
            </div>
            <h3 className="text-4xl font-light text-white mb-6 tracking-wide drop-shadow-md" style={{textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>Today I'm grateful for...</h3>
            <p className="text-2xl font-medium text-white mb-8 leading-relaxed drop-shadow-md animate-float" style={{textShadow: '0 2px 10px rgba(0,0,0,0.3)', animationDuration: '5s'}}>{savedGratitude}</p>
            
            <div className="flex justify-center space-x-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm rounded-xl shadow-lg font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                onClick={handleReset}
              >
                <div className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                <span>Reset Gratitude</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeVisualizer;
