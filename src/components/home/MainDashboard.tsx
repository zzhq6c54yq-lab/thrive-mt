
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen, Moon, HandHeart, ListChecks, FlameKindling, Footprints, Play, Pause, Volume2, Volume, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { workshopData } from "@/data/workshopData";
import { Link, useNavigate } from "react-router-dom";
import HelpNavButton from "@/components/help/HelpNavButton";

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
  const navigate = useNavigate();
  const displayName = userName || "Friend";

  const featuredWorkshops = workshopData.slice(0, 3);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

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
  
  const handleFeatureClick = (path: string) => {
    toast({
      title: "Navigating...",
      description: "Taking you to your selected feature",
      duration: 1500,
    });
    
    navigate(path);
  };

  const toggleVideo = (index: number) => {
    setActiveVideoIndex(activeVideoIndex === index ? null : index);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleWorkshopJoin = (workshopId: string) => {
    toast({
      title: "Joining Workshop",
      description: "Preparing your workshop experience...",
      duration: 1500,
    });
    
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-0 px-0 flex flex-col">
      {/* Modern Header with flowing animated design */}
      <div className="w-full relative overflow-hidden py-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]"></div>
        
        {/* Flowing animated wave elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#B87333]/10 via-[#E5C5A1]/20 to-[#B87333]/10 transform -skew-y-3"></div>
          <div className="absolute top-10 left-0 right-0 h-24 bg-gradient-to-r from-[#E5C5A1]/5 via-[#B87333]/10 to-[#E5C5A1]/5 transform skew-y-2" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B87333]/10 via-[#E5C5A1]/15 to-[#B87333]/10 transform -skew-y-2"></div>
        </div>
        
        {/* Logo and content container */}
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center pt-12 pb-16 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              {/* Logo and title section with enhanced natural look */}
              <div className="flex items-center gap-8 mb-6 md:mb-0">
                <div className="relative group">
                  {/* Pulsing glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333]/40 to-[#E5C5A1]/40 blur-xl animate-pulse"></div>
                  {/* Rotating halo effect */}
                  <div className="absolute inset-[-8px] rounded-full border-2 border-[#B87333]/30 animate-spin" style={{animationDuration: '20s'}}></div>
                  {/* Natural outline */}
                  <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#B87333]/50 to-[#E5C5A1]/30 blur-sm"></div>
                  {/* Logo */}
                  <img 
                    src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                    alt="Thrive MT Logo" 
                    className="relative h-28 w-28 object-contain filter drop-shadow-[0_0_8px_rgba(184,115,51,0.7)] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="text-center md:text-left">
                  {/* Multi-line flowing text with animated gradient */}
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
                      Welcome to
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1] via-[#B87333] to-[#E5C5A1] animate-gradient-x" style={{backgroundSize: '200% auto', animationDelay: '0.5s'}}>
                      Thrive MT
                    </span>
                  </h1>
                  
                  <p className="mt-3 text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#E5C5A1]/90 to-[#B87333]/90">
                    Hey {displayName}! Let's work on your mental health journey
                  </p>
                </div>
              </div>
              
              {/* Sneaker-design for "Meet Henry" button */}
              <div>
                <Button 
                  onClick={onHenryToggle}
                  variant="outline"
                  className="relative px-10 py-3 bg-gradient-to-b from-[#222] to-[#111] border-[#B87333]/50 hover:border-[#B87333] group overflow-hidden"
                >
                  {/* Sneaker sole design */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#B87333]/80 rounded-b-md"></div>
                  
                  {/* Sneaker pattern elements */}
                  <div className="absolute top-1 left-1 w-2 h-2 rounded-full border border-[#B87333]/40"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full border border-[#B87333]/40"></div>
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-[#B87333]/20 rounded-r-full"></div>
                  
                  {/* Icon and text */}
                  <div className="flex items-center gap-2">
                    <Footprints className="h-5 w-5 text-[#B87333] group-hover:scale-110 transition-transform" />
                    <span className="relative z-10 text-white">
                      {showHenry ? "Hide Henry" : "Meet Henry"}
                    </span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pt-8 flex-grow">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Monthly Featured Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorkshops.map((workshop, index) => {
              const colorClass = workshop.color.split(' ')[0];
              const accentColor = colorClass.includes('bg-[#') 
                ? colorClass.replace('bg-[', '').replace(']/10', '') 
                : '#9b87f5';
              const isActive = activeVideoIndex === index;
                
              return (
                <div 
                  key={workshop.id}
                  className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-[1.01] group h-full"
                  style={{
                    background: `linear-gradient(135deg, #ffffff 0%, #f6f6f6 100%)`,
                    borderLeft: `4px solid ${accentColor}`
                  }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div 
                        className="p-3 rounded-full"
                        style={{ background: `${accentColor}15` }}
                      >
                        <workshop.icon className="h-6 w-6" style={{ color: accentColor }} />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-gray-200/80"
                        onClick={() => toggleVideo(index)}
                      >
                        {isActive ? 
                          <Pause className="h-4 w-4 text-gray-700" /> : 
                          <Play className="h-4 w-4 text-gray-700" />
                        }
                      </Button>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
                      {workshop.title}
                    </h3>
                    
                    {isActive ? (
                      <div className="relative mb-4 flex-grow rounded-md overflow-hidden bg-black/5">
                        <div className="aspect-video rounded-md overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <video 
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted={isMuted}
                            poster={`https://picsum.photos/seed/${workshop.id}/640/360`}
                          >
                            {/* Using a sample video URL - in production you would use actual workshop videos */}
                            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMute();
                              }}
                            >
                              {isMuted ? 
                                <Volume className="h-4 w-4" /> : 
                                <Volume2 className="h-4 w-4" />
                              }
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`/workshop/${workshop.id}`, '_blank');
                              }}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Preview: {workshop.title} introduction</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 mb-4 text-sm flex-grow">
                        {workshop.description}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-2">
                      <Button 
                        className="w-full flex items-center justify-center gap-2 hover:shadow-md"
                        style={{ 
                          backgroundColor: accentColor,
                          color: '#fff'
                        }}
                        onClick={() => handleWorkshopJoin(workshop.id)}
                      >
                        Join Workshop
                      </Button>
                    </div>
                  </div>
                  
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: accentColor }}
                  ></div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <Button
              variant="outline" 
              className="border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
              onClick={() => navigate("/workshops")}
            >
              View All Workshops
            </Button>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {keyFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-[#B87333]/20 hover:border-[#B87333] transform hover:scale-[1.02]"
              onClick={() => handleFeatureClick(feature.path)}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(feature.path);
                  }}
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

      <HelpNavButton />
    </div>
  );
};

export default MainDashboard;
