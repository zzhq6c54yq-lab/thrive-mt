
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Brain, Leaf, FileText, Heart, ArrowLeft, BookOpen, 
  Check, BarChart4, Clipboard, Sparkles, Puzzle,
  Smile, MessageSquare, ArrowRight, ChevronRight, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

// Import sub-components
import AssessmentsTab from "@/components/mental-wellness/AssessmentsTab";
import SelfCareTab from "@/components/mental-wellness/SelfCareTab";
import ResourcesTab from "@/components/mental-wellness/ResourcesTab";

interface LocationState {
  activeTab?: string;
  quizId?: string;
}

const MentalWellnessTools: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("tools");
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Access location state for any incoming parameters (like from quizzes)
  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.state]);
  
  // Daily skill rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % dailySkills.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const dailySkills = [
    {
      title: "Deep Breathing",
      description: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8.",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      category: "Relaxation"
    },
    {
      title: "Positive Affirmation",
      description: 'Repeat to yourself: "I am capable of handling whatever comes my way today."',
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      category: "Positive Thinking"
    },
    {
      title: "Mindful Observation",
      description: "Take 2 minutes to focus on one object. Notice everything about it without judgment.",
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      category: "Mindfulness"
    },
    {
      title: "Gratitude Practice",
      description: "Write down three specific things you're grateful for right now.",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      category: "Well-being"
    }
  ];
  
  const quickTools = [
    {
      title: "Breathing Exercise",
      description: "Interactive guided breathing to reduce anxiety in minutes",
      icon: <Leaf className="h-6 w-6 text-green-500" />,
      action: () => navigate("/app/mental-wellness-tools/breathing"),
      color: "from-green-50 to-emerald-50 border-green-100",
      iconBg: "bg-green-100"
    },
    {
      title: "Thought Reframing",
      description: "Transform negative thoughts with this guided exercise",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      action: () => navigate("/app/mental-wellness-tools/reframing"),
      color: "from-purple-50 to-violet-50 border-purple-100",
      iconBg: "bg-purple-100"
    },
    {
      title: "Quick Mood Boost",
      description: "Science-backed activities to lift your spirits in minutes",
      icon: <Smile className="h-6 w-6 text-yellow-500" />,
      action: () => navigate("/app/mental-wellness-tools/mood-boost"),
      color: "from-yellow-50 to-amber-50 border-yellow-100",
      iconBg: "bg-yellow-100"
    },
    {
      title: "Stress Relief Games",
      description: "Fun interactive games designed to reduce stress",
      icon: <Puzzle className="h-6 w-6 text-blue-500" />,
      action: () => navigate("/app/games-and-quizzes"),
      color: "from-blue-50 to-sky-50 border-blue-100",
      iconBg: "bg-blue-100"
    }
  ];
  
  const featureCards = [
    {
      title: "Mental Health Tracking",
      description: "Monitor moods, symptoms, and progress over time with visual charts and insights",
      icon: <BarChart4 className="h-6 w-6 text-[#9b87f5]" />,
      path: "/app/progress-reports"
    },
    {
      title: "Therapy Integration",
      description: "Tools to support your therapy work between sessions",
      icon: <Clipboard className="h-6 w-6 text-blue-500" />,
      path: "/app/mental-wellness-tools/therapy-support"
    },
    {
      title: "Journal Prompts",
      description: "Guided journaling exercises for reflection and growth",
      icon: <FileText className="h-6 w-6 text-amber-500" />,
      path: "/app/journaling"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Lighter, more welcoming header */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm py-8 px-4 relative overflow-hidden border-b border-border/50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary transition-colors p-0 flex items-center"
              onClick={() => navigate("/app/home")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center justify-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Mental Wellness Hub
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Personalized tools, assessments, and resources to support your mental health journey
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Daily Skill Card - Redesigned */}
      <div className="max-w-7xl mx-auto px-4 relative z-10 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="glass-morphism rounded-2xl border-2 border-primary/20 p-6 md:p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 -z-10"></div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-sm uppercase text-muted-foreground tracking-wider mb-3 flex items-center gap-2 font-semibold">
                  <Activity className="h-5 w-5 text-primary" /> 
                  Today's Wellness Practice
                </h3>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                        {dailySkills[currentSkill].icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-1">{dailySkills[currentSkill].title}</h2>
                        <span className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                          {dailySkills[currentSkill].category}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">{dailySkills[currentSkill].description}</p>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex gap-3 mt-4">
                  <Button onClick={() => {
                    const routes: Record<string, string> = {
                      "Box Breathing": "/mental-wellness-tools/breathing",
                      "Thought Reframing": "/mental-wellness-tools/reframing",
                      "Mindful Meditation": "/mental-wellness-tools/meditation",
                      "Quick Mood Boost": "/mental-wellness-tools/mood-boost"
                    };
                    navigate(routes[dailySkills[currentSkill].title] || "/app/mental-wellness-tools");
                  }}>Try Now</Button>
                  <Button variant="outline" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>View All</Button>
                </div>
                <div className="flex gap-2 mt-4">
                  {dailySkills.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentSkill ? "bg-primary w-8" : "bg-muted w-1.5"
                      }`}
                      onClick={() => setCurrentSkill(index)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:items-start">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary/30 hover:bg-primary/5"
                  size="lg"
                >
                  View All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Quick Access Tools - Bento Grid Style */}
      <div className="max-w-7xl mx-auto px-4 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Quick Access
            </h2>
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80" 
              onClick={() => setActiveTab("tools")}
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTools.map((tool, index) => (
              <motion.button
                key={index}
                onClick={tool.action}
                className="group relative p-6 rounded-2xl glass-morphism border-2 border-border/50 text-left h-full transition-all hover:shadow-2xl hover:border-primary/30 flex flex-col overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{tool.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow leading-relaxed">{tool.description}</p>
                <div className="flex justify-end mt-4">
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Featured Resources - Improved Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Featured Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                className="group rounded-2xl overflow-hidden border-2 border-border/50 glass-morphism transition-all hover:shadow-2xl hover:border-primary/30 cursor-pointer"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onClick={() => navigate(feature.path)}
              >
                <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                        <span>Explore</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Main Tabs Content - Modernized */}
      <div className="bg-card/30 backdrop-blur-sm border-y border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <div className="flex justify-center mb-10">
              <TabsList className="inline-flex bg-card/80 backdrop-blur-sm border-2 border-border/50 p-1.5 rounded-2xl shadow-lg">
                <TabsTrigger 
                  value="tools" 
                  className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="font-semibold">Wellness Tools</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 data-[state=active]:bg-primary-foreground/20">12</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="assessments" 
                  className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  <Clipboard className="h-4 w-4 mr-2" />
                  <span className="font-semibold">Assessments</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 data-[state=active]:bg-primary-foreground/20">4</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  className="rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="font-semibold">Resources</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/20 data-[state=active]:bg-primary-foreground/20">8</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Loading state */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-20"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-primary border-r-primary/60 border-b-primary/30 border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-muted-foreground font-medium">Loading your personalized content...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Tab Content with smooth transitions */}
            <AnimatePresence mode="wait">
              {!isLoading && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="tools" className="focus:outline-none mt-0">
                    <SelfCareTab />
                  </TabsContent>
                  
                  <TabsContent value="assessments" className="focus:outline-none mt-0">
                    <AssessmentsTab />
                  </TabsContent>
                  
                  <TabsContent value="resources" className="focus:outline-none mt-0">
                    <ResourcesTab />
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
      
      {/* Get Help Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 mb-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] rounded-xl text-white p-8 relative overflow-hidden">
            <motion.div 
              className="absolute top-[-50%] right-[-10%] w-[60%] h-[200%] bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl"
              animate={{ 
                rotate: [0, 180],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            />
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Need additional support?</h2>
              <p className="text-gray-300 mb-6">
                While these tools can help support your mental wellness journey, they're not a replacement for professional care. 
                If you're experiencing a mental health crisis or need immediate help, please reach out to a qualified professional.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-gray-900 hover:bg-white/90"
                  onClick={() => navigate("/crisis-support")}
                >
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  Crisis Resources
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/50 text-white hover:bg-white/10"
                  onClick={() => navigate("/real-time-therapy")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Find a Therapist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Users = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

export default MentalWellnessTools;
