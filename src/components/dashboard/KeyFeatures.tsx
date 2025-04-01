import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, VideoIcon, Calendar, Book, Users, Activity, 
  Brain, Heart, Sparkles, Gamepad2, BarChart2, 
  DumbellIcon, Clock, Pill, Coffee, Dumbbell, Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KeyFeatures: React.FC<{ navigateToFeature: (path: string) => void }> = ({ navigateToFeature }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleFeatureClick = (path: string, title: string) => {
    toast({
      title: "Navigating...",
      description: `Taking you to ${title}`,
      duration: 1500,
    });
    
    navigateToFeature(path);
  };

  const features = [
    {
      title: "Wellness Features",
      description: "Access our complete suite of 10 mental wellness tools",
      icon: <Sparkles className="h-6 w-6 text-[#B87333]" />,
      path: "/wellness-features",
      gradient: "from-[#B87333] to-[#9b87f5]",
      isNew: true,
    },
    {
      title: "Real-Time Therapy",
      description: "Connect with licensed therapists for immediate support",
      icon: <VideoIcon className="h-6 w-6 text-[#6366F1]" />,
      path: "/real-time-therapy",
      gradient: "from-[#6366F1] to-[#8B5CF6]",
    },
    {
      title: "Community Support",
      description: "Join groups and forums to connect with others",
      icon: <Users className="h-6 w-6 text-[#34D399]" />,
      path: "/community-support",
      gradient: "from-[#34D399] to-[#10B981]",
    },
    {
      title: "Mental Health Games",
      description: "Engage with fun and therapeutic games",
      icon: <Gamepad2 className="h-6 w-6 text-[#F59E0B]" />,
      path: "/mental-health-games",
      gradient: "from-[#F59E0B] to-[#FACC15]",
    },
    {
      title: "Personalized Content",
      description: "Articles and resources tailored to your needs",
      icon: <Book className="h-6 w-6 text-[#EC4899]" />,
      path: "/personalized-content",
      gradient: "from-[#EC4899] to-[#DB2777]",
    },
    {
      title: "Progress Reports",
      description: "Track your mental wellness journey",
      icon: <BarChart2 className="h-6 w-6 text-[#06B6D4]" />,
      path: "/progress-reports",
      gradient: "from-[#06B6D4] to-[#22D3EE]",
    },
    {
      title: "Holistic Wellness",
      description: "Explore alternative therapies and mindfulness",
      icon: <Heart className="h-6 w-6 text-[#A855F7]" />,
      path: "/holistic-wellness",
      gradient: "from-[#A855F7] to-[#9333EA]",
    },
    {
      title: "Self-Help Resources",
      description: "Access guides and tools for self-improvement",
      icon: <Brain className="h-6 w-6 text-[#EA580C]" />,
      path: "/self-help-resources",
      gradient: "from-[#EA580C] to-[#F97316]",
    },
    {
      title: "Games and Quizzes",
      description: "Test your knowledge and have some fun",
      icon: <Gamepad2 className="h-6 w-6 text-[#6EE7B7]" />,
      path: "/games-and-quizzes",
      gradient: "from-[#6EE7B7] to-[#34D399]",
    },
    {
      title: "Lifestyle Integration",
      description: "Balance fitness, nutrition, and mental health",
      icon: <Dumbbell className="h-6 w-6 text-[#F472B6]" />,
      path: "/lifestyle-integration",
      gradient: "from-[#F472B6] to-[#EC4899]",
    },
    {
      title: "Scheduling",
      description: "Manage appointments and set reminders",
      icon: <Calendar className="h-6 w-6 text-[#67E8F9]" />,
      path: "/scheduling",
      gradient: "from-[#67E8F9] to-[#22D3EE]",
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-6">Explore Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handleFeatureClick(feature.path, feature.title)}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-opacity-20 transition-colors`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    {feature.isNew && (
                      <Badge className="bg-green-500 text-white">New</Badge>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
