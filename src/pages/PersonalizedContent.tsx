import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Film, Dumbbell, Star, Home, CheckCircle, Music, Brain, MessagesSquare, Clock, Calendar, Heart, Sparkles } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

type ContentItem = {
  id: string;
  title: string;
  type: "article" | "video" | "exercise" | "meditation" | "podcast" | "assessment";
  description: string;
  tags: string[];
  duration: string;
  completed: boolean;
  featured?: boolean;
  new?: boolean;
};

const PersonalizedContent = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.qualities && location.state?.goals) {
      setUserPreferences(location.state.qualities);
      setUserGoals(location.state.goals);
    } else {
      setUserPreferences(["peaceful", "mindful"]);
      setUserGoals(["reducing-anxiety", "managing-stress"]);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [location.state]);

  useEffect(() => {
    if (userPreferences.length > 0 && userGoals.length > 0) {
      generatePersonalizedContent();
    }
  }, [userPreferences, userGoals, isLoading]);

  const generatePersonalizedContent = () => {
    const contentLibrary: ContentItem[] = [
      {
        id: "article-1",
        title: "Finding Inner Peace Through Mindfulness",
        type: "article",
        description: "Learn how mindfulness practices can help you find peace in everyday moments.",
        tags: ["peaceful", "mindful", "reducing-anxiety"],
        duration: "5 min read",
        completed: false
      },
      {
        id: "video-1",
        title: "Guided Meditation for Stress Relief",
        type: "video",
        description: "Follow along with this calming guided meditation to reduce stress and anxiety.",
        tags: ["peaceful", "mindful", "managing-stress"],
        duration: "10 min video",
        completed: false
      },
      {
        id: "exercise-1",
        title: "Progressive Muscle Relaxation",
        type: "exercise",
        description: "A step-by-step technique to release tension and promote physical relaxation.",
        tags: ["reducing-anxiety", "managing-stress"],
        duration: "7 min activity",
        completed: false
      },
      {
        id: "article-2",
        title: "Building Emotional Resilience",
        type: "article",
        description: "Strategies to develop emotional strength when facing life's challenges.",
        tags: ["resilient", "emotional-regulation"],
        duration: "8 min read",
        completed: false
      },
      {
        id: "video-2",
        title: "Understanding Thought Patterns",
        type: "video",
        description: "Learn how to identify negative thought patterns and replace them with positive ones.",
        tags: ["mindful", "emotional-regulation", "reducing-anxiety"],
        duration: "15 min video",
        completed: false
      },
      {
        id: "exercise-2",
        title: "Gratitude Journaling Practice",
        type: "exercise",
        description: "A daily exercise to focus on positive experiences and cultivate gratitude.",
        tags: ["grateful", "joyful", "improving-sleep"],
        duration: "5 min activity",
        completed: false
      },
      {
        id: "article-3",
        title: "The Science of Sleep and Mental Health",
        type: "article",
        description: "Understanding how quality sleep impacts your emotional wellbeing.",
        tags: ["balanced", "improving-sleep"],
        duration: "10 min read",
        completed: false
      },
      {
        id: "video-3",
        title: "Yoga for Better Sleep",
        type: "video",
        description: "A gentle yoga sequence designed to prepare your body and mind for restful sleep.",
        tags: ["peaceful", "improving-sleep", "balanced"],
        duration: "20 min video",
        completed: false
      },
      {
        id: "exercise-3",
        title: "Boundary Setting Workshop",
        type: "exercise",
        description: "Interactive exercises to help you establish healthy boundaries in relationships.",
        tags: ["setting-boundaries", "work-life-balance"],
        duration: "15 min activity",
        completed: false
      },
      {
        id: "meditation-1",
        title: "Morning Mindfulness Meditation",
        type: "meditation",
        description: "Start your day with this calming 10-minute mindfulness meditation practice.",
        tags: ["peaceful", "mindful", "reducing-anxiety", "morning-routine"],
        duration: "10 min audio",
        completed: false,
        featured: true
      },
      {
        id: "meditation-2",
        title: "Sleep Wind-Down Meditation",
        type: "meditation",
        description: "Prepare your mind and body for restful sleep with this guided meditation.",
        tags: ["peaceful", "improving-sleep", "evening-routine"],
        duration: "15 min audio",
        completed: false
      },
      {
        id: "podcast-1",
        title: "Understanding Anxiety with Dr. Ellen Brown",
        type: "podcast",
        description: "Clinical psychologist Dr. Brown explains anxiety mechanisms and coping strategies.",
        tags: ["educational", "reducing-anxiety", "professional-insights"],
        duration: "45 min podcast",
        completed: false
      },
      {
        id: "podcast-2",
        title: "The Science of Happiness",
        type: "podcast",
        description: "Research-backed strategies to increase your happiness and life satisfaction.",
        tags: ["joyful", "science-based", "positive-psychology"],
        duration: "35 min podcast",
        completed: false,
        new: true
      },
      {
        id: "assessment-1",
        title: "Stress Vulnerability Assessment",
        type: "assessment",
        description: "Discover your stress triggers and resilience factors with this interactive assessment.",
        tags: ["managing-stress", "self-awareness", "resilient"],
        duration: "10 min activity",
        completed: false
      },
      {
        id: "video-4",
        title: "Anxiety Relief Breathing Techniques",
        type: "video",
        description: "Learn five evidence-based breathing exercises to manage anxiety in the moment.",
        tags: ["reducing-anxiety", "quick-tools", "mindful"],
        duration: "12 min video",
        completed: false,
        new: true
      },
      {
        id: "article-4",
        title: "Setting Healthy Digital Boundaries",
        type: "article",
        description: "How to create a healthier relationship with technology for better mental wellbeing.",
        tags: ["setting-boundaries", "digital-wellness", "work-life-balance"],
        duration: "8 min read",
        completed: false
      },
      {
        id: "exercise-4",
        title: "Values Clarification Workshop",
        type: "exercise",
        description: "Interactive exercises to help you identify and align with your core values.",
        tags: ["finding-purpose", "self-awareness", "focused"],
        duration: "20 min activity",
        completed: false,
        featured: true
      },
      {
        id: "exercise-5",
        title: "5-Minute Mood Boosters",
        type: "exercise",
        description: "Quick activities you can do anytime to lift your mood and energy.",
        tags: ["joyful", "energetic", "quick-tools"],
        duration: "5 min activity",
        completed: false
      }
    ];

    const filteredContent = contentLibrary.filter(item => {
      return item.tags.some(tag => 
        userPreferences.includes(tag) || userGoals.includes(tag)
      );
    });

    filteredContent.sort((a, b) => {
      const aRelevance = a.tags.filter(tag => 
        userPreferences.includes(tag) || userGoals.includes(tag)
      ).length;
      
      const bRelevance = b.tags.filter(tag => 
        userPreferences.includes(tag) || userGoals.includes(tag)
      ).length;
      
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      if (a.new && !b.new) return -1;
      if (!a.new && b.new) return 1;
      
      return bRelevance - aRelevance;
    });

    setContent(filteredContent);
  };

  const markAsCompleted = (id: string) => {
    setContent(prevContent => 
      prevContent.map(item => 
        item.id === id ? { ...item, completed: true } : item
      )
    );

    toast({
      title: "Content marked as completed",
      description: "Your progress has been updated",
    });
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <Film className="h-5 w-5" />;
      case "exercise":
        return <Dumbbell className="h-5 w-5" />;
      case "meditation":
        return <Brain className="h-5 w-5" />;
      case "podcast":
        return <Music className="h-5 w-5" />;
      case "assessment":
        return <Sparkles className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "text-blue-500";
      case "video":
        return "text-purple-500";
      case "exercise":
        return "text-green-500";
      case "meditation":
        return "text-[#B87333]";
      case "podcast":
        return "text-pink-500";
      case "assessment":
        return "text-teal-500";
      default:
        return "text-gray-500";
    }
  };

  const contentCategories = [
    { id: "mindfulness", name: "Mindfulness & Meditation", icon: Brain },
    { id: "anxiety-relief", name: "Anxiety Relief", icon: Heart },
    { id: "sleep", name: "Better Sleep", icon: Clock },
    { id: "relationships", name: "Healthy Relationships", icon: MessagesSquare },
    { id: "daily-practices", name: "Daily Wellness Practices", icon: Calendar },
    { id: "self-discovery", name: "Self-Discovery", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <HomeButton />
            <h1 className="text-3xl md:text-4xl font-bold ml-4">Personalized Content</h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl">
            Content tailored just for you based on your preferences and goals. 
            Discover articles, videos, exercises, meditations, and more to support your mental wellness journey.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#B87333] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg">Personalizing your content...</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#1a1a1f] flex items-center">
                <Star className="w-6 h-6 mr-2 text-[#B87333]" />
                Featured Content
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.filter(item => item.featured).slice(0, 3).map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-all duration-300 border-[#B87333]/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {getContentIcon(item.type)}
                          <span className={`text-sm font-medium ml-2 ${getContentTypeColor(item.type)}`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                        {item.new && (
                          <span className="px-2 py-0.5 bg-[#B87333] text-white text-xs rounded-full">New</span>
                        )}
                      </div>
                      <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.duration}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        className="bg-[#B87333]/10 hover:bg-[#B87333]/20 text-[#B87333]"
                        onClick={() => setSelectedCategory(item.type)}
                      >
                        View Similar
                      </Button>
                      <Button 
                        className="bg-[#B87333] hover:bg-[#B87333]/90"
                        onClick={() => markAsCompleted(item.id)}
                      >
                        Start Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#1a1a1f] flex items-center">
                <Heart className="w-6 h-6 mr-2 text-[#B87333]" />
                Wellness Categories
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {contentCategories.map(category => (
                  <Button
                    key={category.id}
                    variant="outline"
                    className={`h-auto py-6 flex flex-col items-center justify-center border ${selectedCategory === category.id ? 'border-[#B87333] bg-[#B87333]/5' : 'hover:border-[#B87333]/50'}`}
                    onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                  >
                    <category.icon className="h-8 w-8 mb-2 text-[#B87333]" />
                    <span className="text-center text-sm">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Tabs defaultValue="recommended" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-6 w-full justify-start max-w-md">
                <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
                <TabsTrigger value="articles" className="flex-1">Articles</TabsTrigger>
                <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
                <TabsTrigger value="exercises" className="flex-1">Exercises</TabsTrigger>
                <TabsTrigger value="meditations" className="flex-1">Meditations</TabsTrigger>
                <TabsTrigger value="podcasts" className="flex-1">Podcasts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommended">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.slice(0, 6).map((item) => (
                    <ContentCard 
                      key={item.id}
                      item={item}
                      markAsCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.filter(item => item.type === "article").map((item) => (
                    <ContentCard 
                      key={item.id}
                      item={item}
                      markAsCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.filter(item => item.type === "video").map((item) => (
                    <ContentCard 
                      key={item.id}
                      item={item}
                      markAsCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="exercises">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.filter(item => item.type === "exercise").map((item) => (
                    <ContentCard 
                      key={item.id}
                      item={item}
                      markAsCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="meditations">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.filter(item => item.type === "meditation").map((item) => (
                    <ContentCard 
                      key={item.id}
                      item={item}
                      markAsCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="podcasts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.filter(item => item.type === "podcast").map((item) => (
                    <ContentCard 
                      key={item.id}
                      item={item}
                      markAsCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Your Preferences</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {userPreferences.map((pref) => (
                  <span key={pref} className="px-3 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full">
                    {pref.charAt(0).toUpperCase() + pref.slice(1).replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {userGoals.map((goal) => (
                  <span key={goal} className="px-3 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full">
                    {goal.charAt(0).toUpperCase() + goal.slice(1).replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
              
              <Button 
                className="mt-4 bg-[#B87333] hover:bg-[#B87333]/90"
                onClick={() => navigate('/', { state: { screenState: 'visionBoard' } })}
              >
                Update Preferences
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ContentCardProps {
  item: ContentItem;
  markAsCompleted: (id: string) => void;
}

const ContentCard = ({ item, markAsCompleted }: ContentCardProps) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "article": return "Article";
      case "video": return "Video";
      case "exercise": return "Exercise";
      case "meditation": return "Meditation";
      case "podcast": return "Podcast";
      case "assessment": return "Assessment";
      default: return "Content";
    }
  };
  
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "article": return "bg-blue-50 border-blue-200";
      case "video": return "bg-purple-50 border-purple-200";
      case "exercise": return "bg-green-50 border-green-200";
      case "meditation": return "bg-[#B87333]/5 border-[#B87333]/20";
      case "podcast": return "bg-pink-50 border-pink-200";
      case "assessment": return "bg-teal-50 border-teal-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };
  
  return (
    <Card className={`hover:shadow-md transition-all duration-300 ${getBackgroundColor(item.type)} ${item.completed ? 'opacity-70' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {item.type === "article" && <BookOpen className="h-5 w-5 text-blue-500 mr-2" />}
            {item.type === "video" && <Film className="h-5 w-5 text-purple-500 mr-2" />}
            {item.type === "exercise" && <Dumbbell className="h-5 w-5 text-green-500 mr-2" />}
            {item.type === "meditation" && <Brain className="h-5 w-5 text-[#B87333] mr-2" />}
            {item.type === "podcast" && <Music className="h-5 w-5 text-pink-500 mr-2" />}
            {item.type === "assessment" && <Sparkles className="h-5 w-5 text-teal-500 mr-2" />}
            <span className="text-sm font-medium">{getTypeLabel(item.type)}</span>
          </div>
          <div className="flex items-center">
            {item.new && (
              <span className="px-2 py-0.5 bg-[#B87333] text-white text-xs rounded-full mr-2">New</span>
            )}
            <span className="text-xs text-gray-500">{item.duration}</span>
          </div>
        </div>
        <CardTitle className="text-xl">{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          className="bg-[#B87333]/10 hover:bg-[#B87333]/20 text-[#B87333]"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </Button>
        <Button 
          variant={item.completed ? "outline" : "default"}
          className={item.completed ? "bg-green-100 text-green-700 border-green-300" : "bg-[#B87333] hover:bg-[#B87333]/90"}
          onClick={() => markAsCompleted(item.id)}
          disabled={item.completed}
        >
          {item.completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </div>
          ) : "Mark Complete"}
        </Button>
      </CardFooter>
      {showDetails && (
        <div className="px-6 pb-6">
          <div className="p-4 bg-white rounded-lg shadow-inner">
            <h4 className="font-semibold mb-2">Full Content</h4>
            <p className="text-gray-700 mb-4">
              This is where the {item.type} content would be displayed. In a full implementation, 
              you would see the actual article text, video player, or interactive exercise here.
            </p>
            <p className="text-gray-700">
              This content has been specifically selected for you based on your preferences 
              for being {item.tags.slice(0, 2).join(' and ')} and your goals related 
              to {item.tags.slice(-1)[0].replace(/-/g, ' ')}.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PersonalizedContent;
