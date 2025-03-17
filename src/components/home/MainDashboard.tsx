import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Library, Users, Heart, GraduationCap, CalendarRange, LeafyGreen, Moon, HandHeart, ListChecks, FlameKindling, Footprints, Play, Pause, Volume2, Volume, ExternalLink, WalletCards, Landmark, Handshake, Calendar, Puzzle, HeartHandshake, Shield, Briefcase, Building, Star, Award, Sparkles, Zap, Target, Leaf, Bird, Smile, Coffee, Lightbulb, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { workshopData } from "@/data/workshopData";
import { Link, useNavigate } from "react-router-dom";
import HelpNavButton from "@/components/help/HelpNavButton";
import Header from "@/components/layout/Header";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import InsightsSection from "@/components/dashboard/InsightsSection";
import QuizzesSection from "@/components/dashboard/QuizzesSection";

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
      title: "Games & Quizzes",
      description: "Fun and therapeutic games and quizzes to boost mental wellbeing",
      icon: Puzzle,
      path: "/games-and-quizzes"
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
      title: "My N.A/A.A Sponsor",
      description: "Access your digital sponsor and recovery support resources",
      icon: HeartHandshake,
      path: "/my-sponsor"
    },
    {
      title: "Lifestyle Integration",
      description: "Seamlessly blend mental wellness practices into your daily routine",
      icon: Puzzle,
      path: "/lifestyle-integration"
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

  const specializedPrograms = [
    {
      title: "Department of Defense",
      description: "Resources and support for military personnel and veterans",
      icon: Shield,
      path: "/department-of-defense",
      gradient: "from-[#0EA5E9]/80 to-[#2563EB]/80",
      borderColor: "#0EA5E9"
    },
    {
      title: "The College Experience",
      description: "Mental health support for students navigating campus life",
      icon: GraduationCap,
      path: "/college-portal",
      gradient: "from-[#8B5CF6]/80 to-[#6366F1]/80",
      borderColor: "#8B5CF6"
    },
    {
      title: "Small Business",
      description: "Mental health resources for entrepreneurs and small business owners",
      icon: Briefcase,
      path: "/small-business",
      gradient: "from-[#F97316]/80 to-[#FB923C]/80",
      borderColor: "#F97316"
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
      description: "Taking you to the workshop content",
      duration: 1500,
    });
    
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a20] via-[#252535] to-[#2d2d3d] text-white pt-6 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.03%22/></svg>')] opacity-20"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#B87333]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#9b87f5]/5 to-transparent blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#B87333]/3 via-[#E5C5A1]/5 to-[#B87333]/3 transform -skew-y-3"></div>
        <div className="absolute top-10 left-0 right-0 h-32 bg-gradient-to-r from-[#E5C5A1]/2 via-[#B87333]/4 to-[#E5C5A1]/2 transform skew-y-2" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-r from-[#B87333]/3 via-[#E5C5A1]/5 to-[#B87333]/3 transform -skew-y-2"></div>
      </div>
      
      <Header />
      
      <div className="w-full relative overflow-hidden py-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/25 to-[#B87333]/15 transform -skew-y-3 animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-[#E5C5A1]/10 via-[#B87333]/15 to-[#E5C5A1]/10 transform skew-y-2 animate-pulse" style={{animationDuration: '12s', animationDelay: '0.5s'}}></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%220.5%22 fill=%22%23ffffff%22 fill-opacity=%220.3%22/></svg>')] opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/20 to-[#B87333]/15 transform -skew-y-2 animate-pulse" style={{animationDuration: '10s'}}></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center pt-12 pb-16 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              <div className="flex items-center gap-8 mb-6 md:mb-0">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333]/40 to-[#E5C5A1]/40 blur-xl animate-pulse"></div>
                  <div className="absolute inset-[-8px] rounded-full border-2 border-[#B87333]/30 animate-spin" style={{animationDuration: '20s'}}></div>
                  <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#B87333]/50 to-[#E5C5A1]/30 blur-sm"></div>
                  <img 
                    src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                    alt="Thrive MT Logo" 
                    className="relative h-28 w-28 object-contain filter drop-shadow-[0_0_8px_rgba(184,115,51,0.7)] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center md:text-left">
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
              <div>
                <Button 
                  onClick={onHenryToggle}
                  variant="outline"
                  className="relative px-10 py-3 bg-gradient-to-b from-[#222] to-[#111] border-[#B87333]/50 hover:border-[#B87333] group overflow-hidden"
                >
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#B87333]/80 rounded-b-md"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 rounded-full border border-[#B87333]/40"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full border border-[#B87333]/40"></div>
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-[#B87333]/20 rounded-r-full"></div>
                  <div className="flex items-center gap-2">
                    <Footprints className="h-5 w-5 text-[#B87333] group-hover:scale-110 transition-transform" />
                    <span className="relative z-10 text-white">
                      {showHenry ? "Hide Henry" : "Meet Henry"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-[#f8f8fa] via-[#f3f3f7] to-[#f8f8fa] border-y border-gray-200/60 py-4 px-4 shadow-sm relative z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 20 L40 20%22 stroke=%22%23B87333%22 stroke-opacity=%220.03%22 stroke-width=%221%22/></svg>')] opacity-30"></div>
        <div className="container mx-auto max-w-6xl relative">
          <h3 className="text-base font-semibold text-gray-800 mb-3">New Features</h3>
          <div className="flex flex-wrap justify-center sm:justify-between gap-4">
            <Button 
              variant="bronze"
              className="flex items-center gap-2 px-6 py-2 rounded-md"
              onClick={() => navigate("/barter-system")}
            >
              <Handshake className="h-4 w-4" />
              <span>Barter System</span>
            </Button>
            
            <Button 
              variant="bronze"
              className="flex items-center gap-2 px-6 py-2 rounded-md"
              onClick={() => navigate("/subscription-plans")}
            >
              <Award className="h-4 w-4" />
              <span>Upgrade my plan</span>
            </Button>
            
            <Button 
              variant="bronze"
              className="flex items-center gap-2 px-6 py-2 rounded-md"
              onClick={() => navigate("/copay-credits")}
            >
              <WalletCards className="h-4 w-4" />
              <span>Co-Pay Credits</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6 relative z-10">
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Star className="h-5 w-5 text-[#D946EF] mr-2" />
            <span>Specialized Programs</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specializedPrograms.map((program, index) => (
              <div 
                key={index}
                onClick={() => handleFeatureClick(program.path)}
                className="relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-90`}></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="relative z-10 p-5 flex flex-col h-full min-h-[180px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm">
                      <program.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{program.title}</h3>
                  </div>
                  
                  <p className="text-white/90 mb-4 flex-grow">{program.description}</p>
                  
                  <Button 
                    className="mt-auto self-start bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFeatureClick(program.path);
                    }}
                  >
                    Explore Program
                  </Button>
                </div>
                
                <div 
                  className="absolute inset-0 border-2 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ borderColor: program.borderColor }}  
                ></div>
                
                <div className="absolute top-0 right-0 h-20 w-20 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <UpcomingAppointments />
          <InsightsSection />
          <QuizzesSection />
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Monthly Featured Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorkshops.map((workshop, index) => {
              const colorClass = workshop.color.split(' ')[0];
              const accentColor = colorClass.includes('bg-[') 
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

        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E2D]/50 to-[#2D2D3D]/50 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#B87333]/20 via-[#E5C5A1]/30 to-[#B87333]/20 transform -skew-y-3"></div>
              <div className="absolute top-40 left-0 right-0 h-32 bg-gradient-to-r from-[#8B5CF6]/20 via-[#D946EF]/30 to-[#8B5CF6]/20 transform skew-y-3"></div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-[#0EA5E9]/20 via-[#2563EB]/30 to-[#0EA5E9]/20 transform -skew-y-3"></div>
            </div>
            <div className="absolute inset-0 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative z-10 px-4 pt-12 pb-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-gradient-x" style={{backgroundSize: '200% auto'}}>
                  Key Features
                </h2>
                <p className="text-gray-300 mt-2">Tools and resources designed for your mental wellness journey</p>
              </div>
              <div className="hidden md:block">
                <Sparkles className="h-12 w-12 text-[#E5C5A1] opacity-60 animate-pulse" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {keyFeatures.slice(0, 9).map((feature, index) => {
                const gradients = [
                  "from-[#9333EA]/80 to-[#D946EF]/30",
                  "from-[#0EA5E9]/80 to-[#2563EB]/30",
                  "from-[#F97316]/80 to-[#F59E0B]/30",
                  "from-[#10B981]/80 to-[#34D399]/30",
                  "from-[#EC4899]/80 to-[#F472B6]/30",
                  "from-[#6366F1]/80 to-[#A5B4FC]/30",
                  "from-[#84CC16]/80 to-[#BEF264]/20",
                  "from-[#EF4444]/80 to-[#FCA5A5]/30",
                  "from-[#B87333]/80 to-[#E5C5A1]/30",
                ];
                
                const borderColors = [
                  "#9333EA",
                  "#0EA5E9",
                  "#F97316",
                  "#10B981",
                  "#EC4899",
                  "#6366F1",
                  "#84CC16",
                  "#EF4444",
                  "#B87333",
                ];
                
                const iconColors = [
                  "#D946EF",
                  "#2563EB",
                  "#F59E0B",
                  "#34D399",
                  "#F472B6",
                  "#A5B4FC",
                  "#BEF264",
                  "#FCA5A5",
                  "#E5C5A1",
                ];
                
                const gradientIndex = index % gradients.length;
                const borderColor = borderColors[gradientIndex];
                const iconColor = iconColors[gradientIndex];
                
                const IconComponent = feature.icon;
                
                const CornerIcons = [Sparkles, Star, Lightbulb, Target, Zap, Bird, Leaf, Smile, Coffee];
                const CornerIcon = CornerIcons[index % CornerIcons.length];
                
                return (
                  <div 
                    key={index}
                    onClick={() => handleFeatureClick(feature.path)}
                    className="relative group cursor-pointer overflow-hidden rounded-xl backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} opacity-90`}></div>
                    
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                    
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-80 transition-opacity">
                      <CornerIcon className="h-5 w-5" style={{ color: iconColor }} />
                    </div>
                    
                    <div className="relative p-7 flex flex-col h-full min-h-[220px]">
                      <div className="flex items-start gap-4 mb-4">
                        <div 
                          className="p-3 rounded-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3"
                          style={{ 
                            background: `${iconColor}30`,
                            border: `1px solid ${iconColor}50`,
                            boxShadow: `0 0 20px ${iconColor}30`
                          }}
                        >
                          <IconComponent className="h-6 w-6" style={{ color: iconColor }} />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {feature.title}
                        </h3>
                      </div>
                      
                      <p className="text-white/80 mb-6 text-sm">
                        {feature.description}
                      </p>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <Button 
                          className="group/btn flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeatureClick(feature.path);
                          }}
                        >
                          <span className="text-white">Explore</span>
                          <ArrowRight className="h-4 w-4 text-white transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                        
                        <div 
                          className="h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: `${iconColor}30` }}
                        >
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className="absolute inset-0 border-2 border-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    ></div>
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {keyFeatures.slice(9).map((feature, index) => {
                const gradients = [
                  "from-[#9333EA]/60 to-[#D946EF]/20",
                  "from-[#0EA5E9]/60 to-[#2563EB]/20",
                  "from-[#F97316]/60 to-[#F59E0B]/20",
                  "from-[#10B981]/60 to-[#34D399]/20",
                  "from-[#EC4899]/60 to-[#F472B6]/20",
                  "from-[#6366F1]/60 to-[#A5B4FC]/20",
                  "from-[#84CC16]/60 to-[#BEF264]/20",
                  "from-[#EF4444]/60 to-[#FCA5A5]/20",
                  "from-[#B87333]/60 to-[#E5C5A1]/20",
                ];
                
                const iconColors = [
                  "#D946EF",
                  "#2563EB",
                  "#F59E0B",
                  "#34D399",
                  "#F472B6",
                  "#A5B4FC",
                  "#BEF264",
                  "#FCA5A5",
                  "#E5C5A1",
                ];
                
                const gradientIndex = index % gradients.length;
                const color = iconColors[gradientIndex];
                
                return (
                  <div 
                    key={index + 9}
                    onClick={() => handleFeatureClick(feature.path)}
                    className="relative group cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br bg-black/40 backdrop-blur-md opacity-90 rounded-lg"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradientIndex]} opacity-40 rounded-lg group-hover:opacity-60 transition-opacity`}></div>
                    
                    <div className="flex items-center p-4 relative">
                      <div 
                        className="mr-4 p-2.5 rounded-md transition-all duration-300 group-hover:scale-125 group-hover:rotate-3"
                        style={{ 
                          background: `${color}20`,
                          border: `1px solid ${color}40` 
                        }}
                      >
                        <feature.icon className="h-5 w-5" style={{ color }} />
                      </div>
                      <div>
                        <h3 className="font-medium text-white group-hover:text-white/90">{feature.title}</h3>
                        <p className="text-xs text-white/70">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
