
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  Brain, 
  BookOpen,
  Heart,
  Puzzle,
  Smile,
  Moon, 
  Dumbbell,
  MessageCircle, 
  Calendar,
  Sparkles,
  ListChecks,
  ArrowLeft,
  Filter,
  HandHeart,
  IceCream,
  Star,
  Zap,
  Cake,
  Download,
  Info,
  Play,
  Bookmark,
  RotateCcw,
  CheckCircle,
  BadgeCheck,
  MousePointer,
  Music,
  BarChart,
  Settings,
  PenTool
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toolCategories } from "@/data/toolCategories";
import Header from "@/components/layout/Header";
import HomeButton from "@/components/HomeButton";
import { useToast } from "@/hooks/use-toast";
import MessageList from "@/components/help/MessageList";

const MentalWellnessTools = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showPersonalized, setShowPersonalized] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("discover");
  
  // Interactive game states
  const [showIcingGame, setShowIcingGame] = useState<boolean>(false);
  const [icingColor, setIcingColor] = useState<string>("#FF88B7");
  const [icingPoints, setIcingPoints] = useState<{x: number, y: number}[]>([]);
  const [completedIcing, setCompletedIcing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [gameScore, setGameScore] = useState<number>(0);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [activeTip, setActiveTip] = useState<number>(0);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState<boolean>(false);
  const [helpMessages, setHelpMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "How can I help you with mental wellness tools today?", isUser: false }
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  // Mindfulness tips
  const mindfulnessTips = [
    {
      title: "Deep Breathing",
      content: "Take 5 deep breaths. Inhale through your nose for 4 counts, hold for 2, exhale through your mouth for 6.",
      icon: <Wind className="h-10 w-10 text-blue-400" />
    },
    {
      title: "Grounding Exercise",
      content: "Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      icon: <Anchor className="h-10 w-10 text-teal-500" />
    },
    {
      title: "Body Scan",
      content: "Close your eyes and mentally scan your body from head to toe, noticing any tension and consciously relaxing each area.",
      icon: <Scan className="h-10 w-10 text-purple-400" />
    },
    {
      title: "Mindful Minute",
      content: "Take just one minute to focus entirely on your present moment. What sensations do you notice?",
      icon: <Clock className="h-10 w-10 text-amber-500" />
    }
  ];

  useEffect(() => {
    if (location.state) {
      const { qualities, goals } = location.state as { qualities?: string[], goals?: string[] };
      if (qualities) setSelectedQualities(qualities);
      if (goals) setSelectedGoals(goals);
    }
  }, [location]);

  const addHelpMessage = (text: string, isUser: boolean) => {
    setHelpMessages(prev => [...prev, { text, isUser }]);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    addHelpMessage(currentMessage, true);
    setCurrentMessage("");
    
    // Simulate response based on keywords
    setTimeout(() => {
      let response = "";
      const lowerMsg = currentMessage.toLowerCase();
      
      if (lowerMsg.includes("meditation") || lowerMsg.includes("mindful")) {
        response = "Our meditation tools include guided sessions, breathing exercises, and mindfulness practices. You can access them in the Mindfulness & Meditation category.";
      } else if (lowerMsg.includes("anxiety") || lowerMsg.includes("stress")) {
        response = "For anxiety relief, I recommend checking out our breathing exercises, journaling tools, and guided relaxation sessions in the Anxiety Relief category.";
      } else if (lowerMsg.includes("sleep")) {
        response = "To improve your sleep, explore our sleep sounds, bedtime routines, and relaxation exercises in the Better Sleep category.";
      } else if (lowerMsg.includes("game") || lowerMsg.includes("fun")) {
        response = "You might enjoy our interactive icing game! It's a fun way to practice mindfulness through a creative activity. Click on 'Fun Zone' to try it out.";
      } else {
        response = "I'd be happy to help you find the right mental wellness tools. You can browse by category or tell me more specifically what you're looking for.";
      }
      
      addHelpMessage(response, false);
    }, 1000);
  };

  const generateRecommendations = () => {
    const allSelections = [...selectedQualities, ...selectedGoals];
    if (allSelections.length === 0) {
      return ["Meditation & Mindfulness", "Mood Tracking", "Self-Help Resources"];
    }

    const toolScores = toolCategories.map(tool => {
      const matchCount = tool.keywords.filter(keyword => 
        allSelections.includes(keyword)
      ).length;
      return { title: tool.title, score: matchCount };
    });

    const topTools = toolScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(tool => tool.title);

    return topTools;
  };

  const handleGetPersonalizedRecs = () => {
    setRecommendations(generateRecommendations());
    setShowPersonalized(true);
    
    toast({
      title: "Recommendations Ready",
      description: "We've selected tools that match your profile",
    });
  };

  const handleToolSelect = (toolTitle: string) => {
    const toolSlug = toolTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/mental-wellness-tools/${toolSlug}`);
    
    toast({
      title: `${toolTitle} Selected`,
      description: "Loading detailed resources and tools...",
    });
  };

  const handleCategorySelect = (categoryName: string) => {
    setActiveCategory(categoryName === activeCategory ? null : categoryName);
    
    if (categoryName !== activeCategory) {
      setCategoryFilter("category");
      setSearchTerm("");
    } else {
      setCategoryFilter("all");
    }
  };

  const handleStartIcingGame = () => {
    setShowIcingGame(true);
    setIcingPoints([]);
    setCompletedIcing(false);
    setGameScore(0);
    
    toast({
      title: "Icing Game Started!",
      description: "Decorate the cake by clicking and dragging! Have fun!",
      duration: 5000,
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showIcingGame || completedIcing) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIcingPoints(prev => [...prev, {x, y}]);
    setGameScore(prev => prev + 1);
    
    if (icingPoints.length > 25) {
      setCompletedIcing(true);
      toast({
        title: "Cake Decorated!",
        description: "Beautiful job! Your cake looks delicious!",
        duration: 3000,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showIcingGame || completedIcing || e.buttons !== 1) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const lastPoint = icingPoints[icingPoints.length - 1];
    if (lastPoint) {
      const distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
      if (distance > 5) {
        setIcingPoints(prev => [...prev, {x, y}]);
        setGameScore(prev => prev + 1);
      }
    } else {
      setIcingPoints(prev => [...prev, {x, y}]);
      setGameScore(prev => prev + 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Filter categories for display
  const wellnessCategories = [
    { name: "Mindfulness & Meditation", icon: Brain },
    { name: "Anxiety Relief", icon: Heart },
    { name: "Better Sleep", icon: Moon },
    { name: "Healthy Relationships", icon: MessageCircle },
    { name: "Daily Wellness Practices", icon: Calendar },
    { name: "Self-Discovery", icon: Sparkles }
  ];

  // Map for keyword category matching
  const categoryMapping: Record<string, string[]> = {
    "Mindfulness & Meditation": ["peaceful", "mindful", "present", "focused"],
    "Anxiety Relief": ["reducing-anxiety", "managing-stress", "emotional-regulation"],
    "Better Sleep": ["improving-sleep", "peaceful", "balanced"],
    "Healthy Relationships": ["better-relationships", "setting-boundaries", "empathetic"],
    "Daily Wellness Practices": ["health-wellness", "balanced", "joyful", "grateful"],
    "Self-Discovery": ["finding-purpose", "building-confidence", "creative", "resilient"]
  };

  // Define the filtered tools based on current filters
  const filteredTools = toolCategories.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory) {
      const matchesCategory = categoryMapping[activeCategory] && 
                             categoryMapping[activeCategory].some(keyword => 
                               tool.keywords.includes(keyword));
      
      const matchesRecommended = categoryFilter !== "recommended" || recommendations.includes(tool.title);
      
      return matchesSearch && matchesCategory && (categoryFilter !== "recommended" || matchesRecommended);
    }
    
    return matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "recommended", label: "Recommended For You" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
      <Header />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Link to="/" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-[#B87333] to-[#9b87f5] bg-clip-text text-transparent">
                Mental Wellness Tools
              </h1>
            </div>
            <p className="text-gray-600 mt-1">
              Engaging activities to improve your mental wellbeing while having fun
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search tools..." 
                className="pl-9 pr-4 w-full md:w-60" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsHelpDialogOpen(true)}
              variant="outline"
              className="border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>Ask Henry</span>
            </Button>
            {!showIcingGame && (
              <Button 
                onClick={handleStartIcingGame}
                className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 gap-1"
              >
                <IceCream className="h-4 w-4" />
                <span>Fun Zone</span>
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="discover" value={selectedTab} onValueChange={setSelectedTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto mb-8">
            <TabsTrigger value="discover" className="rounded-l-md">
              <Sparkles className="h-4 w-4 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="activities">
              <Play className="h-4 w-4 mr-2" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-r-md">
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="space-y-8">
            {showIcingGame && (
              <motion.div 
                className="mb-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#F9F5F3] to-[#F5EAE5] p-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white p-6 rounded-lg shadow-md text-center mb-4">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Cake Decoration Fun!</h2>
                  <p className="text-gray-600 mb-4">
                    Taking care of your mental health can be fun! Decorate this cake by clicking and dragging to add icing.
                  </p>
                  <div className="flex justify-center gap-4 mb-4">
                    <Button 
                      className="bg-[#FF88B7] hover:bg-[#FF67A0] h-10 w-10 rounded-full p-0"
                      onClick={() => setIcingColor("#FF88B7")}
                      variant={icingColor === "#FF88B7" ? "default" : "outline"}
                    />
                    <Button 
                      className="bg-[#88B7FF] hover:bg-[#67A0FF] h-10 w-10 rounded-full p-0"
                      onClick={() => setIcingColor("#88B7FF")}
                      variant={icingColor === "#88B7FF" ? "default" : "outline"}
                    />
                    <Button 
                      className="bg-[#B7FF88] hover:bg-[#A0FF67] h-10 w-10 rounded-full p-0"
                      onClick={() => setIcingColor("#B7FF88")}
                      variant={icingColor === "#B7FF88" ? "default" : "outline"}
                    />
                    <Button 
                      className="bg-[#FFDD88] hover:bg-[#FFCC67] h-10 w-10 rounded-full p-0"
                      onClick={() => setIcingColor("#FFDD88")}
                      variant={icingColor === "#FFDD88" ? "default" : "outline"}
                    />
                    <Button 
                      className="bg-[#D088FF] hover:bg-[#C067FF] h-10 w-10 rounded-full p-0"
                      onClick={() => setIcingColor("#D088FF")}
                      variant={icingColor === "#D088FF" ? "default" : "outline"}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-white/80 px-3 py-1 rounded-full flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-semibold text-gray-700">Your Score: {gameScore}</span>
                    </div>
                  </div>
                </div>
                
                <div 
                  ref={canvasRef}
                  className="relative h-[400px] bg-gradient-to-b from-[#FCEEF2] to-[#F9F5F3] rounded-xl shadow-xl overflow-hidden cursor-pointer"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                >
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <MousePointer className="h-4 w-4 text-[#B87333] inline mr-1" />
                    <span className="text-sm text-gray-700">Click and drag to decorate!</span>
                  </div>
                  
                  <div className="absolute left-1/2 bottom-20 transform -translate-x-1/2 w-[300px] h-[200px] bg-[#F7D3A5] rounded-xl shadow-md">
                    <div className="absolute top-0 left-0 right-0 h-[15px] bg-[#FFEAD5] rounded-t-xl"></div>
                  </div>
                  
                  <div className="absolute left-1/2 bottom-[170px] transform -translate-x-1/2 w-[250px] h-[100px] bg-[#F7D3A5] rounded-xl shadow-md">
                    <div className="absolute top-0 left-0 right-0 h-[10px] bg-[#FFEAD5] rounded-t-xl"></div>
                  </div>
                  
                  <div className="absolute left-1/2 bottom-[260px] transform -translate-x-1/2 w-[30px] h-[30px] bg-[#FF9B9B] rounded-full shadow-md flex items-center justify-center">
                    <Cake className="h-5 w-5 text-white" />
                  </div>
                  
                  {icingPoints.map((point, index) => (
                    <motion.div 
                      key={index}
                      className="absolute rounded-full"
                      style={{ 
                        left: point.x, 
                        top: point.y, 
                        backgroundColor: icingColor,
                        width: Math.random() * 10 + 10, 
                        height: Math.random() * 10 + 10,
                        zIndex: 10
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                  
                  {completedIcing && (
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl text-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <div className="mb-2 flex justify-center">
                        <Star className="h-16 w-16 text-yellow-500 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">Wonderful Job!</h3>
                      <p className="text-gray-600 mb-4">Your decorated cake looks amazing! Just like with this fun activity, mental wellness tools can bring joy and satisfaction into your life.</p>
                      <Button 
                        onClick={() => {
                          setShowIcingGame(false);
                          toast({
                            title: "You did great!",
                            description: "Now let's explore our mental wellness tools!"
                          });
                        }}
                        className="bg-gradient-to-r from-[#B87333] to-[#9b87f5] hover:from-[#A76323] hover:to-[#8b77e5]"
                      >
                        Explore Wellness Tools
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                  <p className="text-gray-600 text-center">
                    <span className="font-medium">Mental wellness can be fun and creative!</span> Just like decorating this cake, 
                    taking small, enjoyable steps each day can build toward better mental health.
                  </p>
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      onClick={() => setShowIcingGame(false)}
                      variant="outline"
                      className="mr-2"
                    >
                      Close Fun Zone
                    </Button>
                    <Button 
                      onClick={() => {
                        setIcingPoints([]);
                        setCompletedIcing(false);
                        setGameScore(0);
                        toast({
                          title: "Fresh Canvas",
                          description: "Start decorating your cake again!"
                        });
                      }}
                      className="bg-[#9b87f5] hover:bg-[#8b77e5]"
                    >
                      Reset Decoration
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#1a1a1f] flex items-center">
                <Heart className="w-6 h-6 mr-2 text-[#B87333]" />
                Wellness Categories
              </h2>
              
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {wellnessCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <Button
                      variant="outline"
                      className={`h-auto py-6 w-full flex flex-col items-center justify-center border transition-all duration-300 ${
                        activeCategory === category.name 
                          ? 'border-[#B87333] bg-[#B87333]/5 transform scale-105' 
                          : 'hover:border-[#B87333]/50 hover:scale-105'
                      }`}
                      onClick={() => handleCategorySelect(category.name)}
                    >
                      <category.icon className={`h-8 w-8 mb-2 ${
                        activeCategory === category.name ? 'text-[#B87333]' : 'text-gray-600'
                      }`} />
                      <span className="text-center text-sm">{category.name}</span>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mb-10 bg-gradient-to-r from-[#F1F0FB] to-[#F8E8DD] rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><rect x=\"0\" y=\"0\" width=\"40\" height=\"40\" fill=\"none\" stroke=\"%23B87333\" stroke-opacity=\"0.05\" stroke-width=\"1\" stroke-dasharray=\"1 4\"/></svg>')] opacity-20 z-0"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-light mb-4">Your Personalized Wellness Journey</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Based on your vision board selections, we can recommend tools that align with your goals and desired qualities.
                </p>
                <Button 
                  className="bg-[#B87333] hover:bg-[#B87333]/90 px-8 hero-button"
                  onClick={handleGetPersonalizedRecs}
                >
                  Get Personalized Recommendations
                </Button>
                
                {selectedQualities.length > 0 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-gray-600 mr-2">Based on your qualities:</span>
                    {selectedQualities.map((quality, i) => (
                      <span key={i} className="inline-block px-2 py-1 bg-[#B87333]/10 text-[#B87333] text-xs rounded-full">
                        {quality}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {showPersonalized && (
              <motion.div 
                className="mb-10 bg-[#F1F0FB] rounded-xl p-8 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B87333]/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#9b87f5]/10 to-transparent rounded-full blur-3xl"></div>
                
                <h2 className="text-3xl font-light mb-6 text-center bg-gradient-to-r from-[#B87333] to-[#9b87f5] bg-clip-text text-transparent">
                  Your Personalized Recommendations
                </h2>
                <p className="text-lg mb-8 text-center">
                  Based on your vision board selections, we recommend these tools for your wellness journey:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((toolTitle, index) => {
                    const tool = toolCategories.find(t => t.title === toolTitle);
                    if (!tool) return null;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <Card className="feature-card border-[#B87333]/30 bg-white/80 hover:shadow-md transition-all h-full flex flex-col">
                          <CardHeader className="pb-2">
                            <div className="rounded-full bg-[#B87333]/10 w-10 h-10 flex items-center justify-center mb-3">
                              <tool.icon className="h-5 w-5 text-[#B87333]" />
                            </div>
                            <CardTitle className="text-xl">{tool.title}</CardTitle>
                            <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <ul className="space-y-1 text-sm text-gray-600">
                              {tool.features.slice(0, 2).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <Zap className="h-3 w-3 mt-1 text-[#B87333]" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button 
                              className="w-full bg-[#B87333] hover:bg-[#B87333]/90 text-sm hero-button"
                              onClick={() => handleToolSelect(tool.title)}
                            >
                              {tool.cta}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B87333]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setCategoryFilter(category.id)}
                    variant={categoryFilter === category.id ? "default" : "outline"}
                    className={categoryFilter === category.id ? "bg-[#B87333] hover:bg-[#B87333]/90" : ""}
                    disabled={category.id === "recommended" && recommendations.length === 0}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredTools.map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredCardId(category.title)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className={`feature-card overflow-hidden border-border/50 hover:border-[#B87333]/50 transition-all hover:shadow-lg ${
                      recommendations.includes(category.title) ? "ring-2 ring-[#B87333]/30" : ""
                    }`}
                  >
                    <CardHeader className={`pb-4 transition-colors duration-500 ${
                      hoveredCardId === category.title ? 'bg-gradient-to-r from-white to-[#B87333]/5' : ''
                    }`}>
                      <div className="rounded-full bg-[#B87333]/10 w-12 h-12 flex items-center justify-center mb-4">
                        <category.icon className={`h-6 w-6 text-[#B87333] ${
                          hoveredCardId === category.title ? 'animate-bounce' : ''
                        }`} />
                      </div>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-base">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {category.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="text-[#B87333] mr-2 text-lg">•</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full bg-[#B87333] hover:bg-[#B87333]/90 hero-button"
                        onClick={() => handleToolSelect(category.title)}
                      >
                        {category.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No matching tools found. Try adjusting your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activities" className="space-y-6">
            <div className="bg-[#F8F9FA] rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Interactive Wellness Activities</h2>
              <p className="text-gray-600 mb-6">
                Engage with these interactive activities designed to boost your mental well-being through fun and creative exercises.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white hover:shadow-md transition-all border-2 border-pink-100 hover:border-pink-300">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                    <div className="rounded-full bg-pink-100 w-10 h-10 flex items-center justify-center mb-2">
                      <PenTool className="h-5 w-5 text-pink-500" />
                    </div>
                    <CardTitle className="text-lg">Cake Decoration</CardTitle>
                    <CardDescription>A relaxing creative activity</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Practice mindfulness through the creative process of decorating a virtual cake. No pressure, just fun!
                    </p>
                    <Button 
                      onClick={handleStartIcingGame} 
                      className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
                    >
                      Start Activity
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-all border-2 border-blue-100 hover:border-blue-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                    <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center mb-2">
                      <Music className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardTitle className="text-lg">Breathing Exercises</CardTitle>
                    <CardDescription>Guided breathing techniques</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Follow along with our interactive breathing exercises to reduce stress and increase focus.
                    </p>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Breathing Exercise",
                          description: "Loading your guided breathing session..."
                        });
                        handleToolSelect("Meditation & Mindfulness");
                      }} 
                      className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
                    >
                      Start Breathing
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-white hover:shadow-md transition-all border-2 border-purple-100 hover:border-purple-300">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-white">
                    <div className="rounded-full bg-purple-100 w-10 h-10 flex items-center justify-center mb-2">
                      <BarChart className="h-5 w-5 text-purple-500" />
                    </div>
                    <CardTitle className="text-lg">Mood Tracker</CardTitle>
                    <CardDescription>Monitor your emotional state</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      Track your mood over time to identify patterns and gain insights into your emotional wellbeing.
                    </p>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Mood Tracker",
                          description: "Loading your personalized mood tracker..."
                        });
                        handleToolSelect("Mood Tracking");
                      }} 
                      className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
                    >
                      Track Mood
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-[#B87333]" />
                Quick Mindfulness Tips
              </h2>
              
              <Card className="border-[#B87333]/20">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((tipIndex) => (
                      <Button
                        key={tipIndex}
                        variant="outline"
                        className="h-auto py-4 justify-start text-left border-[#B87333]/20 hover:border-[#B87333]/40 hover:bg-[#B87333]/5"
                        onClick={() => {
                          setActiveTip(tipIndex);
                          setShowTips(true);
                          toast({
                            title: "Mindfulness Tip",
                            description: "Take a moment for yourself with this quick exercise.",
                          });
                        }}
                      >
                        <div className="mr-3 flex-shrink-0">
                          {tipIndex === 0 && <Brain className="h-5 w-5 text-blue-500" />}
                          {tipIndex === 1 && <Anchor className="h-5 w-5 text-teal-500" />}
                          {tipIndex === 2 && <Scan className="h-5 w-5 text-purple-400" />}
                          {tipIndex === 3 && <Clock className="h-5 w-5 text-amber-500" />}
                        </div>
                        <div>
                          <div className="font-medium">
                            {tipIndex === 0 && "Deep Breathing"}
                            {tipIndex === 1 && "Grounding Exercise"}
                            {tipIndex === 2 && "Body Scan"}
                            {tipIndex === 3 && "Mindful Minute"}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {tipIndex === 0 && "A quick breathing exercise to calm your mind"}
                            {tipIndex === 1 && "Connect with your surroundings using your senses"}
                            {tipIndex === 2 && "Scan your body to release tension"}
                            {tipIndex === 3 && "Just one minute of focused attention"}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg p-6 mt-4 shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        {activeTip === 0 && <Brain className="h-8 w-8 text-blue-500 mr-3" />}
                        {activeTip === 1 && <Anchor className="h-8 w-8 text-teal-500 mr-3" />}
                        {activeTip === 2 && <Scan className="h-8 w-8 text-purple-400 mr-3" />}
                        {activeTip === 3 && <Clock className="h-8 w-8 text-amber-500 mr-3" />}
                        <h3 className="text-xl font-semibold">
                          {activeTip === 0 && "Deep Breathing"}
                          {activeTip === 1 && "Grounding Exercise"}
                          {activeTip === 2 && "Body Scan"}
                          {activeTip === 3 && "Mindful Minute"}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowTips(false)}
                        className="text-gray-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {activeTip === 0 && "Take 5 deep breaths. Inhale through your nose for 4 counts, hold for 2, exhale through your mouth for 6."}
                      {activeTip === 1 && "Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."}
                      {activeTip === 2 && "Close your eyes and mentally scan your body from head to toe, noticing any tension and consciously relaxing each area."}
                      {activeTip === 3 && "Take just one minute to focus entirely on your present moment. What sensations do you notice?"}
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowTips(false)}
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => {
                          setShowTips(false);
                          handleToolSelect("Meditation & Mindfulness");
                          toast({
                            title: "Great job!",
                            description: "Explore more mindfulness exercises in our full collection.",
                          });
                        }}
                        className="bg-[#B87333] hover:bg-[#B87333]/90"
                      >
                        Explore More Exercises
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <div className="bg-[#F8F9FA] rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Downloadable Resources</h2>
              <p className="text-gray-600 mb-6">
                Access these free resources to support your mental wellness journey offline.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-[#B87333]/20 hover:border-[#B87333]/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="bg-[#B87333]/10 rounded-lg p-3 inline-block mb-2">
                      <Download className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <CardTitle className="text-lg">Mindfulness Workbook</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">A comprehensive guide to mindfulness practices with exercises.</p>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Resource Downloaded",
                          description: "Your Mindfulness Workbook is being prepared for download."
                        });
                      }}
                      className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border border-[#B87333]/20 hover:border-[#B87333]/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="bg-[#B87333]/10 rounded-lg p-3 inline-block mb-2">
                      <Download className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <CardTitle className="text-lg">Anxiety Toolkit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Practical strategies and exercises to manage anxiety and stress.</p>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Resource Downloaded",
                          description: "Your Anxiety Toolkit is being prepared for download."
                        });
                      }}
                      className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border border-[#B87333]/20 hover:border-[#B87333]/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="bg-[#B87333]/10 rounded-lg p-3 inline-block mb-2">
                      <Download className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <CardTitle className="text-lg">Sleep Improvement Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Better sleep hygiene habits and relaxation techniques for restful nights.</p>
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Resource Downloaded",
                          description: "Your Sleep Improvement Guide is being prepared for download."
                        });
                      }}
                      className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#1E1E2D]/90 to-[#2D2D3D]/90 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-medium mb-4 text-white">Subscribe for Premium Resources</h2>
                <p className="text-white/80 mb-6 max-w-3xl mx-auto">
                  Get access to our complete library of premium resources, including extended worksheets, guided audio sessions, and expert-led videos.
                </p>
                <Button 
                  onClick={() => {
                    navigate("/subscription-plans");
                    toast({
                      title: "Subscription Options",
                      description: "Exploring premium resource access options."
                    });
                  }}
                  className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5] text-white px-8"
                >
                  View Subscription Options
                </Button>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-20 bg-gradient-to-r from-[#1E1E2D]/90 to-[#2D2D3D]/90 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-medium mb-4 text-white">See Your Personalized Recommendations</h2>
            <p className="text-white/80 mb-6 max-w-3xl mx-auto">
              Visit your Personalized Content section to discover mental wellness tools and resources specifically tailored to your preferences and goals.
            </p>
            <Button 
              onClick={() => navigate("/personalized-content", { 
                state: { 
                  qualities: selectedQualities, 
                  goals: selectedGoals 
                } 
              })}
              className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5] text-white px-8"
            >
              View Personalized Content
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Help Dialog */}
      {isHelpDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-[#221F26] p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center mr-2 border border-[#B87333]/30">
                  <img 
                    src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                    alt="Henry" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-white font-medium">Chat with Henry</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsHelpDialogOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 h-80">
              <MessageList 
                messages={helpMessages}
                className="h-64"
              />
              <div className="flex mt-4">
                <Input
                  placeholder="Ask about mental wellness tools..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 mr-2"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-[#B87333] hover:bg-[#B87333]/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Define Wind and other components needed for the tip section
const Wind = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);

const Anchor = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="5" r="3" />
    <line x1="12" y1="22" x2="12" y2="8" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
  </svg>
);

const Scan = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Send = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default MentalWellnessTools;
