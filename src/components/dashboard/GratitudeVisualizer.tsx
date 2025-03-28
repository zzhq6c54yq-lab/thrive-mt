
import React, { useState, useEffect } from "react";
import { Heart, Image, X, RefreshCw, Sparkles } from "lucide-react";
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
  
  // Background gradients - enhanced with more vibrant warm mental health colors
  const backgrounds = [
    "bg-gradient-to-r from-[#FFE29F] to-[#FFA99F]",
    "bg-gradient-to-r from-[#FFA99F] to-[#FF719A]",
    "bg-gradient-to-r from-[#FFC3A0] to-[#FFAFBD]",
    "bg-gradient-to-r from-[#ee9ca7] to-[#ffdde1]",
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
      <div className="mb-6 relative">
        <h2 className="text-3xl font-bold text-gray-800 inline-flex items-center gap-3 relative">
          <span className="relative">
            <Heart className="h-7 w-7 text-[#FF719A] animate-pulse" />
            <Sparkles className="h-4 w-4 text-[#FFE29F] absolute -right-2 -top-1 animate-pulse" style={{animationDelay: '0.5s'}} />
          </span>
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF719A] via-[#FFA99F] to-[#FFE29F] tracking-tight">
            Gratitude Visualizer
          </span>
        </h2>
        <div className="absolute -bottom-2 left-0 w-64 h-[3px] bg-gradient-to-r from-[#FF719A] via-[#FFA99F] to-transparent rounded-full"></div>
      </div>
      
      {!savedGratitude ? (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 transform transition-all duration-500 hover:shadow-[0_10px_40px_-15px_rgba(255,113,154,0.3)]">
          <p className="text-white/80 mb-6 text-lg">
            Take a moment to reflect on something you're grateful for today. Your note will be displayed as a beautiful visual reminder.
          </p>
          
          <div className="mb-6">
            <textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-5 text-white placeholder-white/50 focus:ring-2 focus:ring-[#FF719A] focus:border-transparent resize-none text-lg"
              placeholder="I am grateful for..."
              rows={3}
            />
          </div>
          
          <div className="mb-8">
            <p className="text-white/90 mb-3 font-medium">Choose a background:</p>
            <div className="flex flex-wrap gap-3 mb-4">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => selectBackground(index)}
                  className={cn(
                    bg, 
                    "w-16 h-16 rounded-xl border-2 transition-all duration-300",
                    selectedBackground === index && !customBackground
                      ? "border-white scale-110 shadow-lg shadow-[rgba(255,113,154,0.3)]" 
                      : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                  )}
                />
              ))}
              
              <label className={cn(
                "w-16 h-16 rounded-xl border-2 flex items-center justify-center cursor-pointer bg-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105",
                customBackground ? "border-white scale-110 shadow-lg shadow-[rgba(255,113,154,0.3)]" : "border-transparent opacity-70"
              )}>
                <Image size={24} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
          
          <Button 
            onClick={saveGratitude}
            className="bg-gradient-to-r from-[#FF719A] to-[#FFA99F] hover:from-[#FFA99F] hover:to-[#FF719A] text-white rounded-xl px-6 py-3 text-lg font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[rgba(255,113,154,0.25)] w-full sm:w-auto"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Save My Gratitude
          </Button>
        </div>
      ) : (
        <div 
          className={cn(
            "rounded-2xl p-10 shadow-2xl overflow-hidden relative min-h-[250px] flex flex-col justify-center items-center text-center transform transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(255,113,154,0.4)]",
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
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <Heart className="h-16 w-16 text-white/80 mx-auto mb-6 drop-shadow-lg animate-pulse" />
            <h3 className="text-4xl font-light text-white mb-6 tracking-wide drop-shadow-md">Today I'm grateful for...</h3>
            <p className="text-2xl font-medium text-white mb-8 leading-relaxed drop-shadow-md" style={{textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>{savedGratitude}</p>
            
            <div className="flex justify-center space-x-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm rounded-xl shadow-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={handleReset}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Reset Gratitude
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeVisualizer;
