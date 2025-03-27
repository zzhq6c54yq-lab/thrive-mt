
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, X, Download, Share2, Heart, RefreshCw } from "lucide-react";

// Available background images
const backgroundOptions = [
  "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png",
  "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png",
  "/lovable-uploads/11170587-bb45-4563-93d6-add9916cea87.png",
  "/lovable-uploads/10d9c6f1-9335-46e4-8942-4d4c198d3f5b.png",
];

const fontOptions = [
  "font-serif",
  "font-sans",
  "font-mono",
  "font-cursive",
];

const colorOptions = [
  "text-white",
  "text-black",
  "text-amber-500",
  "text-emerald-500",
  "text-sky-500",
  "text-rose-500",
  "text-violet-500",
];

interface GratitudeVisualizerProps {
  onClose: () => void;
}

const GratitudeVisualizer: React.FC<GratitudeVisualizerProps> = ({ onClose }) => {
  const [gratitudeText, setGratitudeText] = useState<string>("");
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundOptions[0]);
  const [selectedFont, setSelectedFont] = useState<string>(fontOptions[0]);
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0]);
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>("I'm grateful for...");
  const { toast } = useToast();

  const handleNextStep = () => {
    if (step === 1 && !gratitudeText.trim()) {
      toast({
        title: "Required Field",
        description: "Please enter what you're grateful for today.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSave = () => {
    toast({
      title: "Gratitude Visualization Saved",
      description: "Your gratitude visualization has been saved to your journal.",
    });
    
    // In a real app, we would save this to a database
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleRandomize = () => {
    const randomBackground = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];
    const randomFont = fontOptions[Math.floor(Math.random() * fontOptions.length)];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    
    setSelectedBackground(randomBackground);
    setSelectedFont(randomFont);
    setSelectedColor(randomColor);
    
    toast({
      title: "Randomized!",
      description: "Your visualization has a new look.",
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {step === 1 && (
        <>
          <div className="space-y-4">
            <Input
              placeholder="Add a title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-dashed"
            />
            <Textarea
              placeholder="What are you grateful for today?"
              value={gratitudeText}
              onChange={(e) => setGratitudeText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleNextStep}>
              Continue
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Choose a background:</h3>
            <div className="grid grid-cols-2 gap-2">
              {backgroundOptions.map((bg, index) => (
                <div
                  key={index}
                  className={`relative rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedBackground === bg ? "border-primary" : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedBackground(bg)}
                >
                  <img src={bg} alt={`Background ${index + 1}`} className="w-full h-20 object-cover" />
                </div>
              ))}
            </div>
            
            <h3 className="text-sm font-medium">Choose a font:</h3>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map((font, index) => (
                <div
                  key={index}
                  className={`relative p-2 rounded-md border text-center cursor-pointer transition-all ${
                    selectedFont === font ? "border-primary" : "border-gray-200 hover:border-gray-300"
                  } ${font}`}
                  onClick={() => setSelectedFont(font)}
                >
                  Aa
                </div>
              ))}
            </div>
            
            <h3 className="text-sm font-medium">Choose a text color:</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full border cursor-pointer transition-all ${
                    selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                  } ${color.replace('text-', 'bg-')}`}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button onClick={handleNextStep}>
              Preview
            </Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ minHeight: "300px" }}>
            <img 
              src={selectedBackground} 
              alt="Gratitude Background" 
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
              {title && (
                <h3 className={`text-xl font-bold mb-2 ${selectedFont} ${selectedColor}`}>
                  {title}
                </h3>
              )}
              <p className={`text-lg text-center ${selectedFont} ${selectedColor}`}>
                {gratitudeText}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 pt-3">
            <Button variant="outline" size="icon" onClick={handleRandomize} title="Randomize">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Download">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Share">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={handlePreviousStep}>
              Edit
            </Button>
            <Button onClick={handleSave}>
              <Heart className="h-4 w-4 mr-2" /> Save to Journal
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GratitudeVisualizer;
