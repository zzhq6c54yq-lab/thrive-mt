
import React, { useState, useEffect } from "react";
import { Heart, Image, X, RefreshCw } from "lucide-react";
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
  
  // Background gradients - warm mental health colors
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
    <div className="mb-12">
      <div className="mb-6 relative">
        <h2 className="text-3xl font-bold text-gray-800 inline-flex items-center gap-3 relative">
          <Heart className="h-6 w-6 text-[#B87333]" />
          <span className="gradient-heading text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] tracking-tight">
            Gratitude Visualizer
          </span>
        </h2>
        <div className="absolute -bottom-2 left-0 w-64 h-[2px] bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-transparent"></div>
      </div>
      
      {!savedGratitude ? (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
          <p className="text-white/80 mb-4">
            Take a moment to reflect on something you're grateful for today. Your note will be displayed until you reset it or log out.
          </p>
          
          <div className="mb-5">
            <textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 focus:ring-2 focus:ring-[#B87333] focus:border-transparent resize-none"
              placeholder="I am grateful for..."
              rows={3}
            />
          </div>
          
          <div className="mb-6">
            <p className="text-white/80 mb-2">Choose a background:</p>
            <div className="flex space-x-2 mb-3">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => selectBackground(index)}
                  className={cn(
                    bg, 
                    "w-12 h-12 rounded-lg border-2 transition-all",
                    selectedBackground === index && !customBackground
                      ? "border-white scale-110" 
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                />
              ))}
              
              <label className={cn(
                "w-12 h-12 rounded-lg border-2 flex items-center justify-center cursor-pointer bg-white/10 transition-all hover:bg-white/20",
                customBackground ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
              )}>
                <Image size={20} className="text-white" />
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
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#E5C5A1] hover:to-[#B87333] text-white rounded-lg px-4 py-2 transition-all"
          >
            Save Gratitude
          </Button>
        </div>
      ) : (
        <div 
          className={cn(
            "rounded-2xl p-8 shadow-xl overflow-hidden relative min-h-[200px] flex flex-col justify-center text-center transform transition-all hover:scale-[1.01]",
            currentBackgroundClass
          )}
          style={currentBackgroundStyle}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-light text-white mb-4">Today I'm grateful for...</h3>
            <p className="text-xl font-medium text-white mb-6">{savedGratitude}</p>
            
            <div className="flex justify-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeVisualizer;
