import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Library, Users, Heart, GraduationCap, CalendarRange, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature
}) => {
  const { toast } = useToast();
  const displayName = userName || "Friend";

  const keyFeatures = [
    {
      title: "Personalized Content",
      description: "Content tailored to your mental health journey",
      icon: Brain,
      path: "/personalized-content"
    },
    {
      title: "Resource Library",
      description: "Extensive collection of mental health resources",
      icon: Library,
      path: "/resource-library"
    },
    {
      title: "Community Support",
      description: "Connect with others on similar journeys",
      icon: Users,
      path: "/community-support"
    },
    {
      title: "Mental Wellness Tools",
      description: "Tools and techniques for mental wellness",
      icon: Heart,
      path: "/mental-wellness-tools"
    },
    {
      title: "Therapy Options",
      description: "Connect with licensed therapists",
      icon: GraduationCap,
      path: "/therapist-matches"
    },
    {
      title: "Workshops",
      description: "Interactive learning experiences",
      icon: CalendarRange,
      path: "/workshops"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image className="h-12 w-12 text-[#B87333]" />
            <div>
              <h1 className="text-2xl font-bold text-[#B87333]">Thrive MT</h1>
              <p className="text-sm text-gray-600">Your Mental Wellness Journey</p>
            </div>
          </div>
          <Button 
            onClick={onHenryToggle}
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white px-6"
          >
            {showHenry ? "Hide Henry" : "Meet Henry"}
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Thrive MT, {displayName}!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized mental health platform designed to support your unique journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {keyFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-all duration-300 cursor-pointer border-[#B87333]/20 hover:border-[#B87333]"
              onClick={() => navigateToFeature(feature.path)}
            >
              <CardHeader className="pb-2">
                <div className="rounded-full bg-[#B87333]/10 w-12 h-12 flex items-center justify-center mb-2">
                  <feature.icon className="h-6 w-6 text-[#B87333]" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F]"
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedQualities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Qualities</h2>
            <div className="flex flex-wrap gap-2">
              {selectedQualities.map((quality, index) => (
                <span key={index} className="px-3 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full">
                  {quality.charAt(0).toUpperCase() + quality.slice(1).replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedGoals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
            <div className="flex flex-wrap gap-2">
              {selectedGoals.map((goal, index) => (
                <span key={index} className="px-3 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full">
                  {goal.charAt(0).toUpperCase() + goal.slice(1).replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            onClick={onHenryToggle}
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F]"
          >
            {showHenry ? "Hide Henry" : "Show Henry"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
