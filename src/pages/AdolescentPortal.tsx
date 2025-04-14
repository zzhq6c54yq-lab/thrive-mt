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
  mascot: AgeGroupMascot;
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
      image: "https://images.unsplash.com/photo-1559454403-b8fb88521675?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
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
        image: "https://images.unsplash.com/photo-1560800452-f2d475982b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
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
  const [activeTab, setActiveTab] = useState("resources");
  const location = useLocation();
  const [currentAgeGroup, setCurrentAgeGroup] = useState<string>("adolescence");
  
  useEffect(() => {
    if (location.state && location.state.ageGroup) {
      setCurrentAgeGroup(location.state.ageGroup);
    }
  }, [location.state]);
  
  const ageGroup = ageGroups[currentAgeGroup];

  const handleNavigate = (path: string) => {
    toast({
      title: "Navigating",
      description: `Taking you to ${path}`,
      duration: 1500,
    });
    
    navigate(path, { 
      state: { 
        ageGroup: currentAgeGroup,
        stayInPortal: true,
        preventTutorial: true 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white">
      <div className={`bg-gradient-to-r ${ageGroup.gradient} p-6 relative`}>
        <div className="absolute top-4 right-4 z-10">
          <HomeButton portalMode={true} portalPath="/adolescent-selection" />
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4 w-16 h-16 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-white">{ageGroup.title}</h1>
                <p className="text-white/90">{ageGroup.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img 
                src={ageGroup.mascot.image} 
                alt={ageGroup.mascot.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559454403-b8fb88521675?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-white mb-2">
                Hey there! I'm {ageGroup.mascot.name}
              </h2>
              <p className="text-white/80">
                {ageGroup.mascot.greeting}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <Tabs defaultValue="resources" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white/10 border border-white/20">
            <TabsTrigger value="resources" className="data-[state=active]:bg-white/20">
              <BookMarked className="h-4 w-4 mr-2" /> Resources
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-white/20">
              <Gamepad className="h-4 w-4 mr-2" /> Games
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-white/20">
              <Video className="h-4 w-4 mr-2" /> Videos
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-white/20">
              <Heart className="h-4 w-4 mr-2" /> Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ageGroup.resources.map((resource, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white/10 p-2 rounded-full">
                        {resource.icon}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${resource.color}`}>
                        {resource.tag}
                      </div>
                    </div>
                    
                    {resource.stars && (
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < (resource.stars || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                          />
                        ))}
                      </div>
                    )}
                    
                    <h3 className="text-lg font-medium text-white mb-2">{resource.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{resource.description}</p>
                    
                    <Button 
                      onClick={() => handleNavigate(resource.action.path)}
                      variant="outline" 
                      className="w-full bg-white/5 border-white/20 hover:bg-white/10"
                    >
                      {resource.action.title}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ageGroup.games.map((game, index) => (
                <div 
                  key={index}
                  className="rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className={`absolute inset-0 ${game.color} opacity-40`}></div>
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560421683-6856ea585c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      {game.stars && (
                        <div className="bg-black/50 rounded-full px-2 py-1 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < (game.stars || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/10 backdrop-blur-sm">
                    <h3 className="text-lg font-medium text-white mb-1">{game.title}</h3>
                    <p className="text-white/70 text-sm mb-3">{game.description}</p>
                    <Button 
                      onClick={() => handleNavigate(game.path)}
                      className="w-full bg-white/10 hover:bg-white/20 border-white/10"
                    >
                      Play Game
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ageGroup.videos.map((video, index) => (
                <div 
                  key={index}
                  className="bg-white/10 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-white mb-1">{video.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{video.description}</p>
                    <Button 
                      onClick={() => handleNavigate(video.path)}
                      variant="outline" 
                      className="w-full bg-white/5 border-white/20 hover:bg-white/10"
                    >
                      Watch Video
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ageGroup.support.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/10 rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-white/10">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-medium text-white">{item.title}</h3>
                  </div>
                  <p className="text-white/70 mb-6">{item.description}</p>
                  <Button 
                    onClick={() => handleNavigate(item.path)}
                    className="w-full bg-white/10 hover:bg-white/20 border-white/10"
                  >
                    Access Support
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdolescentPortal;
