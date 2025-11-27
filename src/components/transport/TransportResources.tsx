
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Book, FileText, Clock, Brain, Utensils, Smartphone, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TransportResources: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleResourceClick = (path: string, title: string) => {
    toast({
      title: "Loading Resource",
      description: `Opening ${title}...`,
      duration: 1500,
    });
    navigate(path, {
      state: {
        stayInPortal: true,
        preventTutorial: true,
        portalPath: "/transport-portal",
        fromPortal: true,
        portalType: "transport"
      }
    });
  };

  const videos = [
    {
      title: "Stretches You Can Do in Your Cab",
      duration: "8 min",
      icon: Heart,
      path: "/transport-practice/stretches",
      thumbnail: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Simple stretches to relieve tension during long drives"
    },
    {
      title: "5-Minute Cab Meditation",
      duration: "5 min",
      icon: Brain,
      path: "/transport-practice/quick-meditation",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Quick meditation you can do during breaks"
    },
    {
      title: "Sleep Hygiene for Irregular Schedules",
      duration: "12 min",
      icon: Clock,
      path: "/transport-practice/sleep-hygiene",
      thumbnail: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Techniques for better sleep on the road"
    },
    {
      title: "Healthy Eating on the Road",
      duration: "10 min",
      icon: Utensils,
      path: "/transport-practice/healthy-eating",
      thumbnail: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Finding nutritious options at truck stops"
    }
  ];

  const articles = [
    {
      title: "Managing Fatigue on Long Hauls",
      readTime: "7 min read",
      icon: FileText,
      path: "/transport-resources/fatigue-management",
      description: "Strategies to recognize and combat driver fatigue"
    },
    {
      title: "Staying Connected with Family",
      readTime: "5 min read",
      icon: Smartphone,
      path: "/transport-resources/family-connection",
      description: "Tips for maintaining relationships while on the road"
    },
    {
      title: "Dealing with Road Rage",
      readTime: "6 min read",
      icon: FileText,
      path: "/transport-resources/road-rage",
      description: "Understanding triggers and maintaining calm behind the wheel"
    },
    {
      title: "Creating Routines on the Road",
      readTime: "8 min read",
      icon: FileText,
      path: "/transport-resources/routines",
      description: "Building stability with consistent daily practices"
    },
    {
      title: "Using Tech for Mental Wellness",
      readTime: "5 min read",
      icon: Smartphone,
      path: "/transport-resources/tech-wellness",
      description: "Apps and tools to support your wellbeing journey"
    },
    {
      title: "Financial Wellness for Drivers",
      readTime: "9 min read",
      icon: FileText,
      path: "/transport-resources/financial-wellness",
      description: "Budgeting and financial planning for transportation workers"
    }
  ];
  
  const audioGuides = [
    {
      title: "Stress Relief During Traffic Jams",
      duration: "10 min",
      icon: PlayCircle,
      path: "/transport-practice/traffic-stress",
      description: "Audio guide for staying calm in heavy traffic"
    },
    {
      title: "Evening Wind-Down Routine",
      duration: "15 min",
      icon: PlayCircle,
      path: "/transport-practice/evening-routine",
      description: "Relaxation audio for ending your day"
    },
    {
      title: "Morning Energy Boost",
      duration: "8 min",
      icon: PlayCircle,
      path: "/transport-practice/morning-energy",
      description: "Audio motivation to start your day positively"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Transport Industry Mental Health Resources</h2>
        <p className="text-white/70">
          Practical tools and information specifically designed for truck drivers and transportation workers
        </p>
      </div>
      
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            <span>Video Guides</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span>Articles</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            <span>Audio Guides</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <video.icon className="h-5 w-5 text-blue-500" />
                    {video.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-white/60">{video.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => handleResourceClick(video.path, video.title)}
                  >
                    Watch Video <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {articles.map((article, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-shadow hover:border-blue-200 cursor-pointer"
                onClick={() => handleResourceClick(article.path, article.title)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <article.icon className="h-5 w-5 text-blue-500" />
                      {article.title}
                    </CardTitle>
                  </div>
                  <CardDescription>{article.readTime}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/60">{article.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="audio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audioGuides.map((guide, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-shadow hover:border-blue-200 cursor-pointer"
                onClick={() => handleResourceClick(guide.path, guide.title)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <guide.icon className="h-5 w-5 text-blue-500" />
                      {guide.title}
                    </CardTitle>
                  </div>
                  <CardDescription>{guide.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/60">{guide.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Listen Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">Need Something Specific?</h3>
        <p className="text-white/70 text-sm mb-4">
          If you're looking for resources on a particular topic related to mental health in the transportation industry, 
          our team can help create custom guidance for your needs.
        </p>
        <Button 
          onClick={() => handleResourceClick("/transport-contact", "Resource Request")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Request a Resource
        </Button>
      </div>
    </div>
  );
};

export default TransportResources;
