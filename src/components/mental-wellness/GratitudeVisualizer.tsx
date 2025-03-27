
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Camera, X, Download, Share2, Heart, RefreshCw, Palette, Type, ArrowLeft, ArrowRight, ImagePlus } from "lucide-react";

// Available background images
const backgroundOptions = [
  "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png",
  "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png",
  "/lovable-uploads/11170587-bb45-4563-93d6-add9916cea87.png",
  "/lovable-uploads/10d9c6f1-9335-46e4-8942-4d4c198d3f5b.png",
];

// Warm color background gradients
const gradientBackgrounds = [
  "bg-gradient-to-br from-amber-200 to-yellow-400",
  "bg-gradient-to-br from-orange-200 to-rose-300",
  "bg-gradient-to-br from-pink-300 to-red-400",
  "bg-gradient-to-br from-amber-300 to-orange-500",
  "bg-gradient-to-br from-yellow-200 to-orange-300",
  "bg-gradient-to-br from-rose-200 to-pink-400",
];

const fontOptions = [
  { name: "Serif", class: "font-serif" },
  { name: "Sans", class: "font-sans" },
  { name: "Mono", class: "font-mono" },
  { name: "Cursive", class: "font-['Segoe_Script','Brush_Script_MT',cursive]" },
];

const fontSizeOptions = [
  { name: "Small", class: "text-sm" },
  { name: "Medium", class: "text-base" },
  { name: "Large", class: "text-lg" },
  { name: "XL", class: "text-xl" },
  { name: "2XL", class: "text-2xl" },
  { name: "3XL", class: "text-3xl" },
];

const colorOptions = [
  { name: "White", class: "text-white" },
  { name: "Black", class: "text-black" },
  { name: "Amber", class: "text-amber-500" },
  { name: "Emerald", class: "text-emerald-500" },
  { name: "Sky", class: "text-sky-500" },
  { name: "Rose", class: "text-rose-500" },
  { name: "Violet", class: "text-violet-500" },
  { name: "Gold", class: "text-amber-300" },
];

interface GratitudeVisualizerProps {
  onClose: () => void;
}

const GratitudeVisualizer: React.FC<GratitudeVisualizerProps> = ({ onClose }) => {
  const [gratitudeText, setGratitudeText] = useState<string>("");
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundOptions[0]);
  const [selectedGradient, setSelectedGradient] = useState<string>(gradientBackgrounds[0]);
  const [useGradient, setUseGradient] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<string>(fontOptions[0].class);
  const [selectedFontSize, setSelectedFontSize] = useState<string>(fontSizeOptions[2].class);
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0].class);
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>("I'm grateful for...");
  const [saved, setSaved] = useState<boolean>(false);
  const [customGradient, setCustomGradient] = useState<string>("");
  const { toast } = useToast();

  // Pulse effect for the border
  const [pulseOpacity, setPulseOpacity] = useState(0.2);
  
  useEffect(() => {
    if (saved) {
      const interval = setInterval(() => {
        setPulseOpacity(prev => prev === 0.2 ? 0.6 : 0.2);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [saved]);

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
    setSaved(true);
  };

  const handleRandomize = () => {
    const randomBackground = useGradient 
      ? gradientBackgrounds[Math.floor(Math.random() * gradientBackgrounds.length)]
      : backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];
      
    const randomFont = fontOptions[Math.floor(Math.random() * fontOptions.length)].class;
    const randomFontSize = fontSizeOptions[Math.floor(Math.random() * fontSizeOptions.length)].class;
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)].class;
    
    if (useGradient) {
      setSelectedGradient(randomBackground as string);
    } else {
      setSelectedBackground(randomBackground as string);
    }
    
    setSelectedFont(randomFont);
    setSelectedFontSize(randomFontSize);
    setSelectedColor(randomColor);
    
    toast({
      title: "Randomized!",
      description: "Your visualization has a new look.",
    });
  };

  const handleReset = () => {
    setSaved(false);
    setStep(1);
    setGratitudeText("");
    setTitle("I'm grateful for...");
  };

  const handleDownload = () => {
    toast({
      title: "Downloading...",
      description: "Your visualization is being downloaded.",
    });
    // In a real app, this would trigger a download of the visualization
  };

  // Create a fixed string for the ring opacity class to avoid template literals with variables in JSX
  const getOpacityClass = () => {
    if (!saved) return "";
    return pulseOpacity === 0.2 ? "ring-4 ring-indigo-500 ring-opacity-20" : "ring-4 ring-indigo-500 ring-opacity-60";
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {!saved && step === 1 && (
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
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}

      {!saved && step === 2 && (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Background Type:</h3>
              <div className="flex space-x-2">
                <Button 
                  variant={useGradient ? "outline" : "default"}
                  size="sm"
                  onClick={() => setUseGradient(false)}
                >
                  <Camera className="h-4 w-4 mr-2" /> Image
                </Button>
                <Button 
                  variant={useGradient ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseGradient(true)}
                >
                  <Palette className="h-4 w-4 mr-2" /> Gradient
                </Button>
              </div>
            </div>
            
            {!useGradient && (
              <>
                <h3 className="text-sm font-medium">Choose a background image:</h3>
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
                <Button variant="outline" size="sm" className="w-full">
                  <ImagePlus className="h-4 w-4 mr-2" /> Upload Custom Image
                </Button>
              </>
            )}
            
            {useGradient && (
              <>
                <h3 className="text-sm font-medium">Choose a gradient background:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {gradientBackgrounds.map((bg, index) => (
                    <div
                      key={index}
                      className={`relative h-20 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedGradient === bg ? "border-primary" : "border-transparent hover:border-gray-300"
                      } ${bg}`}
                      onClick={() => setSelectedGradient(bg)}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <Input
                    placeholder="Custom gradient (e.g., from-pink-300 to-purple-500)"
                    value={customGradient}
                    onChange={(e) => {
                      setCustomGradient(e.target.value);
                      if (e.target.value) {
                        setSelectedGradient(`bg-gradient-to-br ${e.target.value}`);
                      }
                    }}
                    className="text-xs"
                  />
                </div>
              </>
            )}
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <Type className="h-4 w-4 mr-2" /> Text Options
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Font Style</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {fontOptions.map((font, index) => (
                        <div
                          key={index}
                          className={`relative p-2 rounded-md border text-center cursor-pointer transition-all ${
                            selectedFont === font.class ? "border-primary" : "border-gray-200 hover:border-gray-300"
                          } ${font.class}`}
                          onClick={() => setSelectedFont(font.class)}
                        >
                          Aa {font.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Font Size</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {fontSizeOptions.map((size, index) => (
                        <div
                          key={index}
                          className={`relative p-2 rounded-md border text-center cursor-pointer transition-all ${
                            selectedFontSize === size.class ? "border-primary" : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedFontSize(size.class)}
                        >
                          <span className={size.class}>Aa</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Text Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                            selectedColor === color.class ? "ring-2 ring-primary ring-offset-2" : ""
                          } ${color.class.replace('text-', 'bg-')}`}
                          onClick={() => setSelectedColor(color.class)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={handlePreviousStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNextStep}>
              Preview <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}

      {((!saved && step === 3) || saved) ? (
        <>
          <div 
            className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${getOpacityClass()}`}
            style={{ minHeight: "350px" }}
          >
            {!useGradient ? (
              <>
                <img 
                  src={selectedBackground} 
                  alt="Gratitude Background" 
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </>
            ) : (
              <div className={`absolute inset-0 ${selectedGradient}`}></div>
            )}
            
            <div className={`relative z-10 p-8 flex flex-col items-center justify-center h-full ${
              saved ? "bg-indigo-900/20 backdrop-blur-sm" : ""
            }`}>
              {title && (
                <h3 className={`mb-4 ${selectedFont} ${selectedFontSize} ${selectedColor} font-bold text-center`}>
                  {title}
                </h3>
              )}
              <p className={`${selectedFont} ${selectedFontSize} ${selectedColor} text-center max-w-md`}>
                {gratitudeText}
              </p>
            </div>
          </div>
          
          {!saved && (
            <>
              <div className="flex justify-center gap-2 pt-3">
                <Button variant="outline" size="icon" onClick={handleRandomize} title="Randomize">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleDownload} title="Download">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
                  <Heart className="mr-2 h-4 w-4" /> Save to Journal
                </Button>
              </div>
            </>
          )}
          
          {saved && (
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Create New
              </Button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default GratitudeVisualizer;
