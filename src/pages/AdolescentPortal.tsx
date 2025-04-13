
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFeatureActions, ActionButtonConfig } from "@/hooks/useFeatureActions";
import { Book, Gamepad2, Film, HeartHandshake, MessagesSquare, BookOpen, PenTool, BrainCircuit, Heart, Music, Sparkles, Play } from "lucide-react";

const AdolescentPortal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleActionClick } = useFeatureActions();
  const [ageGroup, setAgeGroup] = useState<string>("early-childhood");
  const [activeTab, setActiveTab] = useState<string>("resources");

  useEffect(() => {
    // Get the age group from location state
    if (location.state && location.state.ageGroup) {
      setAgeGroup(location.state.ageGroup);
    }
    
    // Check URL params for tab
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  // Helper function to handle age-specific content
  const getAgeSpecificContent = () => {
    switch (ageGroup) {
      case "early-childhood":
        return earlyChildhoodContent;
      case "middle-childhood":
        return middleChildhoodContent;
      case "adolescence":
        return adolescenceContent;
      default:
        return earlyChildhoodContent;
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`?tab=${value}`, { replace: true });
  };

  // Early childhood content (Ages 2-7)
  const earlyChildhoodContent = {
    title: "Early Childhood Portal",
    ageRange: "Ages 2-7",
    description: "Playful resources designed to help young children understand emotions through stories, games, and creative activities.",
    gradient: "from-pink-400 to-purple-500",
    resources: [
      {
        title: "Emotion Stories",
        description: "Illustrated stories that help children recognize and name different feelings",
        icon: <Book className="h-6 w-6" />,
        tag: "Reading",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        action: {
          type: 'workshop',
          id: 'emotion-stories',
          title: 'Emotion Stories'
        }
      },
      {
        title: "Feelings Friends",
        description: "Colorful characters that each represent different emotions children experience",
        icon: <Heart className="h-6 w-6" />,
        tag: "Interactive",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        action: {
          type: 'workshop',
          id: 'feelings-friends',
          title: 'Feelings Friends'
        }
      },
      {
        title: "Calm Down Corner",
        description: "Guided activities to help children manage big emotions and find calm",
        icon: <Sparkles className="h-6 w-6" />,
        tag: "Self-Regulation",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        action: {
          type: 'practice',
          id: 'calm-corner',
          title: 'Calm Down Corner'
        }
      },
      {
        title: "Music & Movement",
        description: "Songs and movement activities that help express emotions through the body",
        icon: <Music className="h-6 w-6" />,
        tag: "Activity",
        color: "bg-green-100 text-green-800 border-green-200",
        action: {
          type: 'practice',
          id: 'music-movement',
          title: 'Music & Movement'
        }
      }
    ],
    games: [
      {
        title: "Emotion Matching",
        description: "Match facial expressions to feeling words in this simple game",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Game",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        action: {
          type: 'other',
          path: '/games/emotion-matching',
          title: 'Emotion Matching Game'
        }
      },
      {
        title: "Feeling Bubbles",
        description: "Pop bubbles that match how you're feeling today",
        icon: <Play className="h-6 w-6" />,
        tag: "Interactive",
        color: "bg-teal-100 text-teal-800 border-teal-200",
        action: {
          type: 'other',
          path: '/games/feeling-bubbles',
          title: 'Feeling Bubbles Game'
        }
      },
      {
        title: "Color Your Mood",
        description: "Interactive coloring activities based on different emotions",
        icon: <PenTool className="h-6 w-6" />,
        tag: "Creative",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        action: {
          type: 'other',
          path: '/games/color-mood',
          title: 'Color Your Mood'
        }
      }
    ],
    videos: [
      {
        title: "Calm Breathing",
        description: "Simple animated breathing exercises for young children",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-red-100 text-red-800 border-red-200",
        action: {
          type: 'other',
          path: '/videos/calm-breathing',
          title: 'Calm Breathing Videos'
        }
      },
      {
        title: "Emotion Stories",
        description: "Animated stories about different feelings and how to manage them",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        action: {
          type: 'other',
          path: '/videos/emotion-stories',
          title: 'Emotion Stories Videos'
        }
      }
    ],
    support: [
      {
        title: "Parent Corner",
        description: "Resources for parents to support emotional development at this age",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "For Parents",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        action: {
          type: 'other',
          path: '/parent-resources/early-childhood',
          title: 'Parent Corner'
        }
      },
      {
        title: "Ask an Expert",
        description: "Common questions about emotional development for ages 2-7",
        icon: <MessagesSquare className="h-6 w-6" />,
        tag: "Q&A",
        color: "bg-cyan-100 text-cyan-800 border-cyan-200", 
        action: {
          type: 'other',
          path: '/expert-advice/early-childhood',
          title: 'Ask an Expert'
        }
      }
    ]
  };

  // Middle childhood content (Ages 8-13)
  const middleChildhoodContent = {
    title: "Middle Childhood Portal",
    ageRange: "Ages 8-13",
    description: "Interactive tools and resources to help school-age children build social skills, emotional awareness, and healthy coping strategies.",
    gradient: "from-purple-500 to-indigo-500",
    resources: [
      {
        title: "Feelings Journal",
        description: "Interactive digital journal with prompts for emotional expression",
        icon: <BookOpen className="h-6 w-6" />,
        tag: "Self-Expression",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        action: {
          type: 'other',
          path: '/journaling',
          title: 'Feelings Journal'
        }
      },
      {
        title: "Friendship Workshop",
        description: "Activities to help navigate social situations and build strong friendships",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "Social Skills",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        action: {
          type: 'workshop',
          id: 'friendship-workshop',
          title: 'Friendship Workshop'
        }
      },
      {
        title: "Worry Warriors",
        description: "Tools and techniques to help manage anxiety and build courage",
        icon: <BrainCircuit className="h-6 w-6" />,
        tag: "Anxiety",
        color: "bg-teal-100 text-teal-800 border-teal-200",
        action: {
          type: 'practice',
          id: 'worry-warriors',
          title: 'Worry Warriors'
        }
      },
      {
        title: "Body Confidence",
        description: "Activities promoting positive body image and self-acceptance",
        icon: <Heart className="h-6 w-6" />,
        tag: "Self-Esteem",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        action: {
          type: 'workshop',
          id: 'body-confidence',
          title: 'Body Confidence'
        }
      }
    ],
    games: [
      {
        title: "Emotion Detective",
        description: "Solve mysteries by identifying emotions in different scenarios",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Game",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        action: {
          type: 'other',
          path: '/games/emotion-detective',
          title: 'Emotion Detective Game'
        }
      },
      {
        title: "Mindfulness Quest",
        description: "A game-based journey through mindfulness techniques and challenges",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Interactive",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        action: {
          type: 'other',
          path: '/games/mindfulness-quest',
          title: 'Mindfulness Quest'
        }
      },
      {
        title: "Social Skills Builder",
        description: "Practice social scenarios and communication in a safe environment",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Social",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        action: {
          type: 'other',
          path: '/games/social-skills',
          title: 'Social Skills Builder'
        }
      }
    ],
    videos: [
      {
        title: "Coping Strategies",
        description: "Videos showing practical coping techniques for common challenges",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-red-100 text-red-800 border-red-200",
        action: {
          type: 'other',
          path: '/videos/coping-strategies',
          title: 'Coping Strategies Videos'
        }
      },
      {
        title: "Kid Stories",
        description: "Real children sharing their experiences with emotions and challenges",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        action: {
          type: 'other',
          path: '/videos/kid-stories',
          title: 'Kid Stories Videos'
        }
      }
    ],
    support: [
      {
        title: "Family Resources",
        description: "Tools for families to support social-emotional learning at home",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "For Families",
        color: "bg-cyan-100 text-cyan-800 border-cyan-200",
        action: {
          type: 'other',
          path: '/family-resources/middle-childhood',
          title: 'Family Resources'
        }
      },
      {
        title: "School Connection",
        description: "Resources that connect with school-based social emotional learning",
        icon: <BookOpen className="h-6 w-6" />,
        tag: "Education",
        color: "bg-violet-100 text-violet-800 border-violet-200",
        action: {
          type: 'other',
          path: '/school-resources',
          title: 'School Connection'
        }
      }
    ]
  };

  // Adolescence content (Ages 14+)
  const adolescenceContent = {
    title: "Adolescent Portal",
    ageRange: "Ages 14+",
    description: "Resources designed to support teenagers through the challenges of adolescence, identity development, and increasing independence.",
    gradient: "from-blue-500 to-cyan-500",
    resources: [
      {
        title: "Identity & Self",
        description: "Explore questions of identity and self-discovery in a supportive space",
        icon: <Heart className="h-6 w-6" />,
        tag: "Self-Development",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        action: {
          type: 'workshop',
          id: 'identity-self',
          title: 'Identity & Self'
        }
      },
      {
        title: "Stress Management",
        description: "Practical techniques for managing academic, social, and emotional stress",
        icon: <BrainCircuit className="h-6 w-6" />,
        tag: "Mental Health",
        color: "bg-teal-100 text-teal-800 border-teal-200",
        action: {
          type: 'practice',
          id: 'stress-management',
          title: 'Stress Management'
        }
      },
      {
        title: "Relationship Skills",
        description: "Navigate friendships, romantic relationships, and family dynamics",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "Social",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        action: {
          type: 'workshop',
          id: 'relationship-skills',
          title: 'Relationship Skills'
        }
      },
      {
        title: "Future Planning",
        description: "Tools for thinking about the future while managing current pressures",
        icon: <Sparkles className="h-6 w-6" />,
        tag: "Planning",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        action: {
          type: 'workshop',
          id: 'future-planning',
          title: 'Future Planning'
        }
      }
    ],
    games: [
      {
        title: "Decision Maker",
        description: "Interactive scenarios to practice decision-making skills",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Game",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        action: {
          type: 'other',
          path: '/games/decision-maker',
          title: 'Decision Maker Game'
        }
      },
      {
        title: "Mood Tracker",
        description: "Game-based mood tracking with insights and suggestions",
        icon: <Gamepad2 className="h-6 w-6" />,
        tag: "Interactive",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        action: {
          type: 'other',
          path: '/games/mood-tracker',
          title: 'Mood Tracker Game'
        }
      },
      {
        title: "Mindfulness Challenge",
        description: "Daily mindfulness challenges designed specifically for teens",
        icon: <BrainCircuit className="h-6 w-6" />,
        tag: "Challenge",
        color: "bg-cyan-100 text-cyan-800 border-cyan-200",
        action: {
          type: 'other',
          path: '/games/mindfulness-challenge',
          title: 'Mindfulness Challenge'
        }
      }
    ],
    videos: [
      {
        title: "Teen Talks",
        description: "Teens sharing their experiences with mental health and wellbeing",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-red-100 text-red-800 border-red-200",
        action: {
          type: 'other',
          path: '/videos/teen-talks',
          title: 'Teen Talks Videos'
        }
      },
      {
        title: "Expert Insights",
        description: "Mental health professionals discuss common teen challenges",
        icon: <Film className="h-6 w-6" />,
        tag: "Video",
        color: "bg-violet-100 text-violet-800 border-violet-200",
        action: {
          type: 'other',
          path: '/videos/expert-insights',
          title: 'Expert Insights Videos'
        }
      }
    ],
    support: [
      {
        title: "Crisis Resources",
        description: "Immediate support resources for teens in crisis",
        icon: <HeartHandshake className="h-6 w-6" />,
        tag: "Support",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        action: {
          type: 'other',
          path: '/crisis-support',
          title: 'Crisis Resources'
        }
      },
      {
        title: "Teen Community",
        description: "Moderated forum for teens to connect and support each other",
        icon: <MessagesSquare className="h-6 w-6" />,
        tag: "Community",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        action: {
          type: 'discussion',
          id: 'teen-community',
          title: 'Teen Community'
        }
      }
    ]
  };

  // Get the content for the selected age group
  const content = getAgeSpecificContent();

  // Handle action button clicks
  const handleResourceClick = (config: ActionButtonConfig) => {
    handleActionClick(config);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] pb-20">
      {/* Hero section with background gradient */}
      <div className={`w-full bg-gradient-to-r ${content.gradient} py-12 px-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.1%22/></svg>')] opacity-20"></div>
        
        <div className="max-w-5xl mx-auto flex items-start">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm py-1.5">
                {content.ageRange}
              </Badge>
            </div>
            <p className="text-white/80 text-lg max-w-3xl">
              {content.description}
            </p>
          </div>
          <div className="mt-2">
            <HomeButton />
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <Tabs 
          defaultValue={activeTab} 
          className="w-full" 
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="games">Interactive Games</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.resources.map((resource, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-md ${resource.color}`}>
                        {resource.icon}
                      </div>
                      <Badge variant="outline" className={resource.color}>
                        {resource.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-white mt-4">{resource.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      onClick={() => handleResourceClick(resource.action)}
                    >
                      Explore Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Games Tab */}
          <TabsContent value="games" className="space-y-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Interactive Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.games.map((game, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-md ${game.color}`}>
                        {game.icon}
                      </div>
                      <Badge variant="outline" className={game.color}>
                        {game.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-white mt-4">{game.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      onClick={() => handleResourceClick(game.action)}
                    >
                      Play Game
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Video Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.videos.map((video, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-md ${video.color}`}>
                        {video.icon}
                      </div>
                      <Badge variant="outline" className={video.color}>
                        {video.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-white mt-4">{video.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      onClick={() => handleResourceClick(video.action)}
                    >
                      Watch Videos
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Support Tab */}
          <TabsContent value="support" className="space-y-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Support Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.support.map((item, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-md ${item.color}`}>
                        {item.icon}
                      </div>
                      <Badge variant="outline" className={item.color}>
                        {item.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-white mt-4">{item.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      onClick={() => handleResourceClick(item.action)}
                    >
                      Access Support
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdolescentPortal;
