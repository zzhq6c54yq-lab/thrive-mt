
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PenTool, Music, BarChart, Brain, Anchor, Scan, Clock, X } from "lucide-react";

interface ActivitiesTabProps {
  onStartIcingGame: () => void;
  onToolSelect: (toolTitle: string) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ onStartIcingGame, onToolSelect }) => {
  const { toast } = useToast();
  const [showTips, setShowTips] = useState<boolean>(false);
  const [activeTip, setActiveTip] = useState<number>(0);
  
  // Mindfulness tips
  const mindfulnessTips = [
    {
      title: "Deep Breathing",
      content: "Take 5 deep breaths. Inhale through your nose for 4 counts, hold for 2, exhale through your mouth for 6.",
      icon: <Brain className="h-8 w-8 text-blue-500 mr-3" />
    },
    {
      title: "Grounding Exercise",
      content: "Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      icon: <Anchor className="h-8 w-8 text-teal-500 mr-3" />
    },
    {
      title: "Body Scan",
      content: "Close your eyes and mentally scan your body from head to toe, noticing any tension and consciously relaxing each area.",
      icon: <Scan className="h-8 w-8 text-purple-400 mr-3" />
    },
    {
      title: "Mindful Minute",
      content: "Take just one minute to focus entirely on your present moment. What sensations do you notice?",
      icon: <Clock className="h-8 w-8 text-amber-500 mr-3" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#F8F9FA] rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Interactive Wellness Activities</h2>
        <p className="text-gray-600 mb-6">
          Engage with these interactive activities designed to boost your mental well-being through fun and creative exercises.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white hover:shadow-md transition-all border-2 border-pink-100 hover:border-pink-300">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
              <div className="rounded-full bg-pink-100 w-10 h-10 flex items-center justify-center mb-2">
                <PenTool className="h-5 w-5 text-pink-500" />
              </div>
              <CardTitle className="text-lg">Cake Decoration</CardTitle>
              <CardDescription>A relaxing creative activity</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-4">
                Practice mindfulness through the creative process of decorating a virtual cake. No pressure, just fun!
              </p>
              <Button 
                onClick={onStartIcingGame} 
                className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
              >
                Start Activity
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-all border-2 border-blue-100 hover:border-blue-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mb-2">
                <Music className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Breathing Exercises</CardTitle>
              <CardDescription>Guided breathing techniques</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-4">
                Follow along with our interactive breathing exercises to reduce stress and increase focus.
              </p>
              <Button 
                onClick={() => {
                  toast({
                    title: "Breathing Exercise",
                    description: "Loading your guided breathing session..."
                  });
                  onToolSelect("Meditation & Mindfulness");
                }} 
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
              >
                Start Breathing
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-all border-2 border-purple-100 hover:border-purple-300">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-white">
              <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mb-2">
                <BarChart className="h-5 w-5 text-purple-500" />
              </div>
              <CardTitle className="text-lg">Mood Tracker</CardTitle>
              <CardDescription>Monitor your emotional state</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-4">
                Track your mood over time to identify patterns and gain insights into your emotional wellbeing.
              </p>
              <Button 
                onClick={() => {
                  toast({
                    title: "Mood Tracker",
                    description: "Loading your personalized mood tracker..."
                  });
                  onToolSelect("Mood Tracking");
                }} 
                className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
              >
                Track Mood
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Info className="h-5 w-5 mr-2 text-[#B87333]" />
          Quick Mindfulness Tips
        </h2>
        
        <Card className="border-[#B87333]/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((tipIndex) => {
                let TipIcon;
                let tipTitle;
                
                if (tipIndex === 0) {
                  TipIcon = Brain;
                  tipTitle = "Deep Breathing";
                } else if (tipIndex === 1) {
                  TipIcon = Anchor;
                  tipTitle = "Grounding Exercise";
                } else if (tipIndex === 2) {
                  TipIcon = Scan;
                  tipTitle = "Body Scan";
                } else {
                  TipIcon = Clock;
                  tipTitle = "Mindful Minute";
                }
                
                return (
                  <Button
                    key={tipIndex}
                    variant="outline"
                    className="h-auto py-4 justify-start text-left border-[#B87333]/20 hover:border-[#B87333]/40 hover:bg-[#B87333]/5"
                    onClick={() => {
                      setActiveTip(tipIndex);
                      setShowTips(true);
                      toast({
                        title: "Mindfulness Tip",
                        description: "Take a moment for yourself with this quick exercise.",
                      });
                    }}
                  >
                    <div className="mr-3 flex-shrink-0">
                      <TipIcon className={`h-5 w-5 ${
                        tipIndex === 0 ? "text-blue-500" :
                        tipIndex === 1 ? "text-teal-500" :
                        tipIndex === 2 ? "text-purple-400" : "text-amber-500"
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium">{tipTitle}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {tipIndex === 0 && "A quick breathing exercise to calm your mind"}
                        {tipIndex === 1 && "Connect with your surroundings using your senses"}
                        {tipIndex === 2 && "Scan your body to release tension"}
                        {tipIndex === 3 && "Just one minute of focused attention"}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg p-6 mt-4 shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {mindfulnessTips[activeTip].icon}
                  <h3 className="text-xl font-semibold">
                    {mindfulnessTips[activeTip].title}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTips(false)}
                  className="text-gray-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-700 mb-4">
                {mindfulnessTips[activeTip].content}
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowTips(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowTips(false);
                    onToolSelect("Meditation & Mindfulness");
                    toast({
                      title: "Great job!",
                      description: "Explore more mindfulness exercises in our full collection.",
                    });
                  }}
                  className="bg-[#B87333] hover:bg-[#B87333]/90"
                >
                  Explore More Exercises
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Define missing icon component
const Info = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default ActivitiesTab;
