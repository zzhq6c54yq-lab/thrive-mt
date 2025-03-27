
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle, IceCream } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";
import { toolCategories } from "@/data/toolCategories";

// Import our new components
import CakeDecorationGame from "@/components/mental-wellness/CakeDecorationGame";
import CategorySelector from "@/components/mental-wellness/CategorySelector";
import PersonalizedSection from "@/components/mental-wellness/PersonalizedSection";
import PersonalizedRecommendations from "@/components/mental-wellness/PersonalizedRecommendations";
import ToolsList from "@/components/mental-wellness/ToolsList";
import ActivitiesTab from "@/components/mental-wellness/ActivitiesTab";
import ResourcesTab from "@/components/mental-wellness/ResourcesTab";
import HelpDialog from "@/components/mental-wellness/HelpDialog";

const MentalWellnessTools: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showPersonalized, setShowPersonalized] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("discover");
  const [showIcingGame, setShowIcingGame] = useState<boolean>(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (location.state) {
      const { qualities, goals } = location.state as { qualities?: string[], goals?: string[] };
      if (qualities) setSelectedQualities(qualities);
      if (goals) setSelectedGoals(goals);
    }
  }, [location]);

  // Category keyword mapping for filtering
  const categoryMapping: Record<string, string[]> = {
    "Mindfulness & Meditation": ["peaceful", "mindful", "present", "focused"],
    "Anxiety Relief": ["reducing-anxiety", "managing-stress", "emotional-regulation"],
    "Better Sleep": ["improving-sleep", "peaceful", "balanced"],
    "Healthy Relationships": ["better-relationships", "setting-boundaries", "empathetic"],
    "Daily Wellness Practices": ["health-wellness", "balanced", "joyful", "grateful"],
    "Self-Discovery": ["finding-purpose", "building-confidence", "creative", "resilient"]
  };

  // Generate personalized recommendations based on user qualities and goals
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
    
    toast({
      title: "Icing Game Started!",
      description: "Decorate the cake by clicking and dragging! Have fun!",
      duration: 5000,
    });
  };

  // Filter tools based on current selections
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
              <CakeDecorationGame onClose={() => setShowIcingGame(false)} />
            )}
            
            <CategorySelector 
              activeCategory={activeCategory} 
              onCategorySelect={handleCategorySelect} 
            />

            <PersonalizedSection 
              selectedQualities={selectedQualities}
              onGetRecommendations={handleGetPersonalizedRecs}
            />

            <PersonalizedRecommendations
              showPersonalized={showPersonalized}
              recommendations={recommendations}
              selectedQualities={selectedQualities}
              onToolSelect={handleToolSelect}
            />

            <ToolsList 
              filteredTools={filteredTools}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              recommendations={recommendations}
              onToolSelect={handleToolSelect}
            />
          </TabsContent>
          
          <TabsContent value="activities" className="space-y-6">
            <ActivitiesTab
              onStartIcingGame={handleStartIcingGame}
              onToolSelect={handleToolSelect}
            />
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <ResourcesTab />
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
      <HelpDialog isOpen={isHelpDialogOpen} onClose={() => setIsHelpDialogOpen(false)} />
    </div>
  );
};

// Define missing icon components
const Sparkles = ({ className }: { className?: string }) => (
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
    <path d="M12 3l1.2 2.4L15.6 6l-2.4 1.2L12 9l-1.2-1.8L8.4 6l2.4-1.2z" />
    <path d="M19 9l.7 1.3.9.4-.9.5-.8 1.8-.8-1.8-.9-.5.9-.4z" />
    <path d="M5 13l.7 1.3.9.4-.9.5-.8 1.8-.8-1.8-.9-.5.9-.4z" />
  </svg>
);

const Play = ({ className }: { className?: string }) => (
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
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
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
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export default MentalWellnessTools;
