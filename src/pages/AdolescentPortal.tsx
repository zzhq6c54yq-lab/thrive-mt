import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";
import { 
  BookOpen, FileText, Users, Heart, Calendar, Star, 
  Video, Gamepad, Sparkles, BookMarked, MessageCircle, 
  Award, Activity, Gift, Smile
} from "lucide-react";

type AgeGroupMascot = {
  name: string;
  greeting: string;
  image: string;
};

type AgeGroupResource = {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  color: string;
  action: {
    type: "workshop" | "assessment" | "download" | "practice" | "discussion" | 
           "hangout" | "join" | "redeem" | "record" | "view" | "other";
    id?: string;
    title: string;
    path: string;
  };
  stars?: number;
};

type AgeGroupGame = {
  title: string;
  description: string;
  image: string;
  color: string;
  path: string;
  stars?: number;
};

type AgeGroupVideo = {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  path: string;
};

type AgeGroupSupport = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
};

type AgeGroup = {
  title: string;
  ageRange: string;
  description: string;
  gradient: string;
  mascot?: AgeGroupMascot;
  resources: AgeGroupResource[];
  games: AgeGroupGame[];
  videos: AgeGroupVideo[];
  support: AgeGroupSupport[];
};

type AgeGroups = {
  [key: string]: AgeGroup;
};

const ageGroups: AgeGroups = {
  "early-childhood": {
    title: "Early Childhood",
    ageRange: "Ages 2-7",
    description: "Fun activities to help young children understand feelings and make friends",
    gradient: "from-pink-400 to-purple-500",
    mascot: {
      name: "Buddy Bear",
      greeting: "Hi friend! Let's play and learn together!",
      image: "https://images.unsplash.com/photo-1613057389222-5ccb9bc64853?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    resources: [
      {
        title: "Feelings Flashcards",
        description: "Colorful cards to help identify and talk about emotions",
        icon: <Smile className="h-6 w-6 text-pink-500" />,
        tag: "Emotions",
        color: "bg-pink-100 text-pink-700",
        action: {
          type: "other",
          path: "/resource-library",
          title: "See Cards"
        },
        stars: 5
      },
      {
        title: "Storytime Videos",
        description: "Animated stories about friendship and feelings",
        icon: <Video className="h-6 w-6 text-purple-500" />,
        tag: "Stories",
        color: "bg-purple-100 text-purple-700",
        action: {
          type: "other",
          path: "/resource-library",
          title: "Watch Stories"
        },
        stars: 4
      },
      {
        title: "Parent Guide",
        description: "Tips for helping young children develop emotional skills",
        icon: <BookOpen className="h-6 w-6 text-blue-500" />,
        tag: "Parents",
        color: "bg-blue-100 text-blue-700",
        action: {
          type: "other",
          path: "/resource-library",
          title: "Read Guide"
        },
        stars: 5
      }
    ],
    games: [
      {
        title: "Feeling Friends",
        description: "Match the characters with their emotions",
        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-pink-400 to-purple-500",
        path: "/game-play/feeling-friends",
        stars: 4
      },
      {
        title: "Color My Mood",
        description: "A creative coloring activity about emotions",
        image: "https://images.unsplash.com/photo-1560421683-6856ea585c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-blue-400 to-purple-500",
        path: "/game-play/color-mood",
        stars: 5
      },
      {
        title: "Sharing Circle",
        description: "Learn about taking turns and sharing",
        image: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-purple-400 to-pink-500",
        path: "/game-play/sharing-circle",
        stars: 4
      }
    ],
    videos: [
      {
        title: "Meet Your Feelings",
        description: "Animated introduction to basic emotions for young children",
        thumbnail: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        duration: "3:24",
        path: "/resource-library"
      },
      {
        title: "Friendship Song",
        description: "Catchy tune about making and keeping friends",
        thumbnail: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        duration: "2:15",
        path: "/resource-library"
      }
    ],
    support: [
      {
        title: "Parent Corner",
        description: "Resources for parents to support their young child's emotional development",
        icon: <Users className="h-6 w-6 text-teal-500" />,
        path: "/family-resources"
      },
      {
        title: "Playdate Tips",
        description: "Help your child develop social skills through play",
        icon: <Heart className="h-6 w-6 text-pink-500" />,
        path: "/family-resources"
      }
    ]
  },
  "middle-childhood": {
    title: "Middle Childhood",
    ageRange: "Ages 8-13",
    description: "Interactive tools to help school-age children build resilience and social-emotional skills",
    gradient: "from-purple-400 to-blue-500",
    mascot: {
      name: "Wise Owl",
      greeting: "Hello there! Ready to explore and learn new things?",
      image: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    resources: [
      {
        title: "Friendship Guide",
        description: "Tips for making friends and handling conflicts",
        icon: <Users className="h-6 w-6 text-purple-500" />,
        tag: "Social Skills",
        color: "bg-purple-100 text-purple-700",
        action: {
          type: "view",
          id: "friendship-guide",
          title: "Read Guide",
          path: "/resource-library"
        }
      },
      {
        title: "Mindfulness for Kids",
        description: "Age-appropriate mindfulness practices for stress management",
        icon: <Heart className="h-6 w-6 text-blue-500" />,
        tag: "Wellness",
        color: "bg-blue-100 text-blue-700",
        action: {
          type: "practice",
          id: "kids-mindfulness",
          title: "Try Exercise",
          path: "/mindfulness-sleep"
        }
      },
      {
        title: "School Success",
        description: "Tools for managing homework and classroom challenges",
        icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
        tag: "Education",
        color: "bg-indigo-100 text-indigo-700",
        action: {
          type: "download",
          id: "school-success",
          title: "Get Toolkit",
          path: "/resource-library"
        }
      }
    ],
    games: [
      {
        title: "Mood Quest",
        description: "Adventure game teaching emotional regulation",
        image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-purple-400 to-blue-500",
        path: "/game-play/mood-quest"
      },
      {
        title: "Friend Finder",
        description: "Interactive scenarios about social skills",
        image: "https://images.unsplash.com/photo-1526934799676-3811489998ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-blue-400 to-indigo-500",
        path: "/game-play/friend-finder"
      },
      {
        title: "Brain Booster",
        description: "Fun puzzles to enhance focus and attention",
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-indigo-400 to-purple-500",
        path: "/game-play/brain-booster"
      }
    ],
    videos: [
      {
        title: "Handling Bullies",
        description: "Strategies for dealing with difficult social situations",
        thumbnail: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        duration: "5:12",
        path: "/resource-library"
      },
      {
        title: "Stress Busters",
        description: "Kid-friendly techniques for managing stress and worry",
        thumbnail: "https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        duration: "4:45",
        path: "/resource-library"
      }
    ],
    support: [
      {
        title: "Parent-Child Connection",
        description: "Activities to strengthen your bond with your school-age child",
        icon: <Heart className="h-6 w-6 text-purple-500" />,
        path: "/family-resources"
      },
      {
        title: "School Partnerships",
        description: "Resources for teachers and counselors to support student mental health",
        icon: <BookOpen className="h-6 w-6 text-blue-500" />,
        path: "/resource-library"
      }
    ]
  },
  "adolescence": {
    title: "Adolescence",
    ageRange: "Ages 14+",
    description: "Resources to support teenagers with identity, independence, and emotional well-being",
    gradient: "from-blue-400 to-teal-500",
    mascot: {
      name: "Nova",
      greeting: "Hey! I'm here to help you navigate the ups and downs of teen life.",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    resources: [
      {
        title: "Teen Identity Guide",
        description: "Understanding yourself during times of change",
        icon: <Users className="h-6 w-6 text-blue-500" />,
        tag: "Identity",
        color: "bg-blue-100 text-blue-700",
        action: {
          type: "view",
          id: "teen-identity",
          title: "Read Guide",
          path: "/resource-library"
        }
      },
      {
        title: "Stress Management",
        description: "Techniques for managing academic and social pressures",
        icon: <Heart className="h-6 w-6 text-teal-500" />,
        tag: "Wellness",
        color: "bg-teal-100 text-teal-700",
        action: {
          type: "practice",
          id: "teen-stress",
          title: "Try Exercises",
          path: "/mindfulness-sleep"
        }
      },
      {
        title: "Future Planning",
        description: "Tools for thinking about college, career, and beyond",
        icon: <Calendar className="h-6 w-6 text-indigo-500" />,
        tag: "Planning",
        color: "bg-indigo-100 text-indigo-700",
        action: {
          type: "download",
          id: "future-planning",
          title: "Get Toolkit",
          path: "/resource-library"
        }
      }
    ],
    games: [
      {
        title: "Life Choices",
        description: "Interactive scenarios about real-life decisions",
        image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-blue-400 to-teal-500",
        path: "/game-play/life-choices"
      },
      {
        title: "Mood Tracker",
        description: "Game-based approach to understanding emotions",
        image: "https://images.unsplash.com/photo-1560800452-f2d475982b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-teal-400 to-blue-500",
        path: "/game-play/mood-tracker"
      },
      {
        title: "Social Navigator",
        description: "Build skills for navigating complex social situations",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        color: "bg-gradient-to-br from-blue-400 to-indigo-500",
        path: "/game-play/social-navigator"
      }
    ],
    videos: [
      {
        title: "Finding Your Voice",
        description: "Teens discuss discovering their identity and passions",
        thumbnail: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        duration: "8:24",
        path: "/resource-library"
      },
      {
        title: "Healthy Relationships",
        description: "Understanding boundaries and communication in relationships",
        thumbnail: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        duration: "7:15",
        path: "/resource-library"
      }
    ],
    support: [
      {
        title: "Teen Support Group",
        description: "Connect with other teens in a safe, moderated environment",
        icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
        path: "/community-support"
      },
      {
        title: "Parents of Teens",
        description: "Resources for parents navigating the teenage years",
        icon: <Users className="h-6 w-6 text-teal-500" />,
        path: "/family-resources"
      }
    ]
  }
};

const AdolescentPortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("resources");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("early-childhood");

  useEffect(() => {
    if (location.state && location.state.ageGroup) {
      setSelectedAgeGroup(location.state.ageGroup);
    }
  }, [location]);

  const currentGroup = ageGroups[selectedAgeGroup as keyof typeof ageGroups];

  const handleAgeGroupChange = (ageGroup: string) => {
    setSelectedAgeGroup(ageGroup);
  };

  const handleNavigate = (path: string) => {
    toast({
      title: "Navigating",
      description: `Taking you to ${path}`,
      duration: 1500,
    });
    navigate(path);
  };

  const handleFunActivity = () => {
    toast({
      title: "Let's Play!",
      description: "Launching a fun activity for you!",
      duration: 1500,
    });
    
    setTimeout(() => {
      navigate("/mental-health-games");
    }, 500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${
      selectedAgeGroup === "early-childhood" 
        ? "from-pink-100 via-purple-50 to-pink-50" 
        : selectedAgeGroup === "middle-childhood"
          ? "from-purple-100 via-blue-50 to-purple-50"
          : "from-blue-100 via-teal-50 to-blue-50"
    }`}>
      <div className={`bg-gradient-to-r ${currentGroup.gradient} p-6 relative`}>
        <div className="absolute top-4 right-4 z-10">
          <HomeButton />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                {selectedAgeGroup === "early-childhood" ? (
                  <Smile className="h-8 w-8 text-white" />
                ) : selectedAgeGroup === "middle-childhood" ? (
                  <Gamepad className="h-8 w-8 text-white" />
                ) : (
                  <Users className="h-8 w-8 text-white" />
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-light text-white">{currentGroup.title}</h1>
                <p className="text-white/90">{currentGroup.ageRange}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => handleNavigate("/mental-health-games")}
                variant="outline"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20"
              >
                Play Games <Gamepad className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={() => handleNavigate("/family-resources")}
                variant="outline"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20"
              >
                Family Resources <Users className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-full p-1 shadow-md inline-flex">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedAgeGroup === "early-childhood" 
                ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white" 
                : "text-gray-700 hover:bg-white"
            }`}
            onClick={() => handleAgeGroupChange("early-childhood")}
          >
            Early Childhood (2-7)
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedAgeGroup === "middle-childhood" 
                ? "bg-gradient-to-r from-purple-400 to-blue-500 text-white" 
                : "text-gray-700 hover:bg-white"
            }`}
            onClick={() => handleAgeGroupChange("middle-childhood")}
          >
            Middle Childhood (8-13)
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedAgeGroup === "adolescence" 
                ? "bg-gradient-to-r from-blue-400 to-teal-500 text-white" 
                : "text-gray-700 hover:bg-white"
            }`}
            onClick={() => handleAgeGroupChange("adolescence")}
          >
            Adolescence (14+)
          </button>
        </div>
      </div>

      {selectedAgeGroup === "early-childhood" && currentGroup.mascot && (
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-pink-200 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-300 flex-shrink-0">
              <img 
                src={currentGroup.mascot.image} 
                alt={currentGroup.mascot.name}
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1613057389222-5ccb9bc64853?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                }}
              />
            </div>
            <div className="flex-1">
              <div className="bg-pink-100 rounded-lg p-4 relative">
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 rotate-45 w-4 h-4 bg-pink-100"></div>
                <h3 className="text-xl font-medium text-pink-600 mb-2">Hi! I'm {currentGroup.mascot.name}!</h3>
                <p className="text-gray-700">{currentGroup.mascot.greeting}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleFunActivity}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 transform transition-all hover:scale-105"
                >
                  Let's Play Something Fun! <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAgeGroup === "middle-childhood" || selectedAgeGroup === "adolescence" && currentGroup.mascot && (
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className={`bg-white rounded-xl p-6 shadow-md border-2 ${
            selectedAgeGroup === "middle-childhood" ? "border-purple-200" : "border-blue-200"
          } flex flex-col md:flex-row items-center gap-6 animate-fade-in`}>
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 ${
              selectedAgeGroup === "middle-childhood" ? "border-purple-300" : "border-blue-300"
            } flex-shrink-0`}>
              <img 
                src={currentGroup.mascot.image} 
                alt={currentGroup.mascot.name}
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedAgeGroup === "middle-childhood" 
                    ? "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    : "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                }}
              />
            </div>
            <div className="flex-1">
              <div className={`${
                selectedAgeGroup === "middle-childhood" ? "bg-purple-100" : "bg-blue-100"
              } rounded-lg p-4 relative`}>
                <div className={`absolute -left-4 top-1/2 transform -translate-y-1/2 rotate-45 w-4 h-4 ${
                  selectedAgeGroup === "middle-childhood" ? "bg-purple-100" : "bg-blue-100"
                }`}></div>
                <h3 className={`text-xl font-medium ${
                  selectedAgeGroup === "middle-childhood" ? "text-purple-600" : "text-blue-600"
                } mb-2`}>Meet {currentGroup.mascot.name}!</h3>
                <p className="text-gray-700">{currentGroup.mascot.greeting}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={() => navigate("/mental-health-games")}
                  className={`bg-gradient-to-r ${
                    selectedAgeGroup === "middle-childhood"
                      ? "from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500"
                      : "from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500"
                  } text-white transform transition-all hover:scale-105`}
                >
                  Explore Activities <Gamepad className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8">
          <p className="text-gray-800">{currentGroup.description}</p>
        </div>

        <Tabs defaultValue="resources" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white/50">
            <TabsTrigger value="resources">
              <BookMarked className="h-4 w-4 mr-2" /> Resources
            </TabsTrigger>
            <TabsTrigger value="games">
              <Gamepad className="h-4 w-4 mr-2" /> Games
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="h-4 w-4 mr-2" /> Videos
            </TabsTrigger>
            <TabsTrigger value="support">
              <Heart className="h-4 w-4 mr-2" /> Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentGroup.resources.map((resource, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden border ${
                    selectedAgeGroup === "early-childhood"
                      ? "border-pink-100"
                      : selectedAgeGroup === "middle-childhood"
                        ? "border-purple-100"
                        : "border-blue-100"
                  } hover:shadow-lg transition-all duration-300`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      {resource.icon}
                      <span className={`text-xs px-2 py-1 rounded-full ${resource.color}`}>{resource.tag}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                    {selectedAgeGroup === "early-childhood" && 'stars' in resource && (
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < (resource.stars as number) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => {
                        if ('action' in resource && resource.action) {
                          handleNavigate(resource.action.path);
                        }
                      }}
                      variant={selectedAgeGroup === "early-childhood" ? "default" : "outline"}
                      className={
                        selectedAgeGroup === "early-childhood"
                          ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600"
                          : selectedAgeGroup === "middle-childhood"
                            ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                            : "border-blue-300 text-blue-700 hover:bg-blue-50"
                      }
                    >
                      {'action' in resource && resource.action ? resource.action.title : "Learn More"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentGroup.games.map((game, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                    <div className={`absolute inset-0 opacity-70 ${game.color}`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-xl font-bold text-white">{game.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    
                    {selectedAgeGroup === "early-childhood" && 'stars' in game && (
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < (game.stars as number) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleNavigate(game.path)}
                      variant={selectedAgeGroup === "early-childhood" ? "default" : "outline"}
                      className={
                        selectedAgeGroup === "early-childhood"
                          ? "w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600"
                          : selectedAgeGroup === "middle-childhood"
                            ? "w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                            : "w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                      }
                    >
                      {selectedAgeGroup === "early-childhood" ? (
                        <>Play Now <Gamepad className="ml-2 h-4 w-4" /></>
                      ) : (
                        <>Play Game <Gamepad className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedAgeGroup === "early-childhood" && (
              <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 border border-pink-200 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/50 rounded-full">
                    <Gift className="h-8 w-8 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-purple-700">Collect Fun Stickers!</h3>
                    <p className="text-gray-700">Play more games to earn special stickers for your collection!</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center border-2 border-dashed border-pink-300">
                      <Sparkles className="h-6 w-6 text-pink-300" />
                    </div>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <div key={i+3} className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-pink-400">
                      <img 
                        src={`https://images.unsplash.com/photo-${1610270945356 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} 
                        alt="Sticker" 
                        className="w-12 h-12 object-cover rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentGroup.videos.map((video, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{video.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                    <Button 
                      onClick={() => handleNavigate(video.path)}
                      variant={selectedAgeGroup === "early-childhood" ? "default" : "outline"}
                      className={
                        selectedAgeGroup === "early-childhood"
                          ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600"
                          : selectedAgeGroup === "middle-childhood"
                            ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                            : "border-blue-300 text-blue-700 hover:bg-blue-50"
                      }
                    >
                      Watch Video <Video className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentGroup.support.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl p-6 shadow-md overflow-hidden border ${
                    selectedAgeGroup === "early-childhood"
                      ? "border-pink-100"
                      : selectedAgeGroup === "middle-childhood"
                        ? "border-purple-100"
                        : "border-blue-100"
                  } hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${
                      selectedAgeGroup === "early-childhood"
                        ? "bg-pink-100"
                        : selectedAgeGroup === "middle-childhood"
                          ? "bg-purple-100"
                          : "bg-blue-100"
                    }`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-medium text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <Button 
                    onClick={() => handleNavigate(item.path)}
                    variant={selectedAgeGroup === "early-childhood" ? "default" : "outline"}
                    className={
                      selectedAgeGroup === "early-childhood"
                        ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600"
                        : selectedAgeGroup === "middle-childhood"
                          ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                          : "border-blue-300 text-blue-700 hover:bg-blue-50"
                    }
                  >
                    {selectedAgeGroup === "early-childhood" ? (
                      <>Get Help <Heart className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Access Support <Heart className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              ))}
            </div>

            {selectedAgeGroup === "early-childhood" && (
              <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/50 rounded-full">
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-pink-700">Parent Helper Badge</h3>
                    <p className="text-gray-700">Parents! Complete these resources to earn your Helper Badge!</p>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-purple-300 p-2">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                      <Activity className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Button
                    onClick={() => handleNavigate("/family-resources")}
                    className="bg-white text-pink-700 hover:bg-pink-50"
                  >
                    Start Parent Training
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdolescentPortal;
