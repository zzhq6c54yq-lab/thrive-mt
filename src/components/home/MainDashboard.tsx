import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen, Moon, HandHeart, ListChecks, FlameKindling } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { workshopData } from "@/data/workshopData";
import { Link } from "react-router-dom";

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

  const featuredWorkshops = workshopData.slice(0, 3);

  const keyFeatures = [
    {
      title: "Personalized Content",
      description: "Content tailored to your mental health journey and cultural background",
      icon: Brain,
      path: "/personalized-content"
    },
    {
      title: "Resource Library",
      description: "Comprehensive mental health resources and educational content",
      icon: Library,
      path: "/resource-library"
    },
    {
      title: "Community Support",
      description: "Connect with others and access culturally sensitive resources",
      icon: Users,
      path: "/community-support"
    },
    {
      title: "Mental Wellness Tools",
      description: "Track nutrition, sleep, exercise, and mental wellbeing",
      icon: LeafyGreen,
      path: "/mental-wellness-tools"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your mental health journey over time",
      icon: ListChecks,
      path: "/progress-reports"
    },
    {
      title: "Family Resources",
      description: "Support tools for families and caregivers",
      icon: HandHeart,
      path: "/family-support"
    },
    {
      title: "Alternative Therapies",
      description: "Explore art, music, and nature-based healing approaches",
      icon: FlameKindling,
      path: "/alternative-therapies"
    },
    {
      title: "Mindfulness & Sleep",
      description: "Diverse meditation practices and sleep tracking",
      icon: Moon,
      path: "/mindfulness"
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
    },
    {
      title: "Self-Help Resources",
      description: "Articles, videos, and tips on various mental health topics",
      icon: Library,
      path: "/self-help-resources"
    },
    {
      title: "Journaling",
      description: "Space for personal reflections and emotional expression",
      icon: Heart,
      path: "/journaling"
    },
    {
      title: "Crisis Support",
      description: "Immediate resources and hotlines for when you need help",
      icon: Heart,
      path: "/crisis-support"
    },
    {
      title: "Progress Analytics",
      description: "Track and analyze your mental wellness journey",
      icon: ListChecks,
      path: "/progress-analytics"
    },
    {
      title: "Holistic Wellness",
      description: "Comprehensive approach to physical, mental, and spiritual wellbeing",
      icon: LeafyGreen,
      path: "/holistic-wellness"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-0 px-0 flex flex-col">
      <div className="w-full bg-black py-4 px-6 shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img 
                src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                alt="Thrive MT Logo" 
                className="h-24 w-24 filter drop-shadow-[0_0_8px_rgba(184,115,51,0.7)]"
              />
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] tracking-tight">
                Welcome to Thrive MT, {displayName}!
              </h1>
            </div>
            <Button 
              onClick={onHenryToggle}
              variant="bronze"
              className="text-lg px-8 py-6"
            >
              {showHenry ? "Hide Henry" : "Meet Henry"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-8 flex-grow">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Monthly Featured Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorkshops.map((workshop) => {
              const colorClass = workshop.color.split(' ')[0];
              const accentColor = colorClass.includes('bg-[#') 
                ? colorClass.replace('bg-[', '').replace(']/10', '') 
                : '#9b87f5';
                
              return (
                <div 
                  key={workshop.id}
                  className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-[1.01] group"
                  style={{
                    background: `linear-gradient(135deg, #ffffff 0%, #f6f6f6 100%)`,
                    borderLeft: `4px solid ${accentColor}`
                  }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div 
                        className="p-3 rounded-full"
                        style={{ background: `${accentColor}15` }}
                      >
                        <workshop.icon className="h-6 w-6" style={{ color: accentColor }} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
                      {workshop.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 text-sm line-clamp-2">
                      {workshop.description}
                    </p>
                    
                    <Link 
                      to={`/workshop/${workshop.id}`} 
                      className="block"
                    >
                      <Button 
                        className="w-full flex items-center justify-center gap-2 hover:shadow-md"
                        style={{ 
                          backgroundColor: accentColor,
                          color: '#fff'
                        }}
                      >
                        Join Workshop
                      </Button>
                    </Link>
                  </div>
                  
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: accentColor }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {keyFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-[#B87333]/20 hover:border-[#B87333] transform hover:scale-[1.02]"
              onClick={() => navigateToFeature(feature.path)}
            >
              <CardHeader className="pb-2">
                <div className="rounded-full bg-[#B87333]/10 w-12 h-12 flex items-center justify-center mb-2 group-hover:bg-[#B87333]/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-[#B87333] group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-xl group-hover:text-[#B87333] transition-colors">{feature.title}</CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
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
      </div>

      <footer className="w-full bg-black py-6 px-6 mt-8">
        <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-2">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Thrive MT Logo" 
              className="h-16 w-16 filter drop-shadow-[0_0_5px_rgba(184,115,51,0.7)]"
            />
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333]">
                Thrive MT
              </h2>
              <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Your Mental Wellness Journey
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} Thrive MT. All rights reserved.</p>
        </div>
      </footer>

      <FloatingButton onClick={() => navigateToFeature("/")} />
    </div>
  );
};

export default MainDashboard;
