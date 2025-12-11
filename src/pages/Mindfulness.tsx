
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Moon, Sun, ArrowLeft, Play, Pause, Timer, 
  Heart, RefreshCw, Check, BookOpen, AlarmClock, BarChart4,
  Star, Sparkles, Bell, Calendar, Hourglass, Plus, ListChecks,
  Menu, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  image: string;
  audioFile?: string;
  guideType: "guided" | "unguided" | "music";
  level: "beginner" | "intermediate" | "advanced";
  popular: boolean;
  tags: string[];
}

interface SleepTip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface SleepLog {
  date: string;
  hoursSlept: number;
  quality: number; // 1-10
  notes?: string;
}

const Mindfulness = () => {
  const [activeTab, setActiveTab] = useState("meditation");
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [meditationElapsed, setMeditationElapsed] = useState(0);
  const [meditationCategoryFilter, setMeditationCategoryFilter] = useState("all");
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([]);
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [newSleepEntry, setNewSleepEntry] = useState<{
    hoursSlept: number;
    quality: number;
    notes: string;
  }>({
    hoursSlept: 7.5,
    quality: 7,
    notes: ""
  });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample meditation sessions
  const meditationSessions: MeditationSession[] = [
    {
      id: "morning-clarity",
      title: "Morning Clarity",
      description: "Start your day with a clear mind and focused intentions through gentle awareness.",
      duration: 10,
      category: "morning",
      image: "https://images.unsplash.com/photo-1623765589293-ccc0cffd494f?auto=format&fit=crop&w=500&q=80",
      guideType: "guided",
      level: "beginner",
      popular: true,
      tags: ["morning", "clarity", "intention-setting", "focus"]
    },
    {
      id: "stress-release",
      title: "Stress Release",
      description: "Release tension and find calm in the midst of a busy day.",
      duration: 15,
      category: "stress",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80",
      guideType: "guided",
      level: "beginner",
      popular: true,
      tags: ["stress", "relaxation", "tension-release", "calm"]
    },
    {
      id: "deep-sleep",
      title: "Deep Sleep Journey",
      description: "Gentle meditation to help you fall into a deep, restorative sleep.",
      duration: 20,
      category: "sleep",
      image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=500&q=80",
      guideType: "guided",
      level: "beginner",
      popular: true,
      tags: ["sleep", "relaxation", "nighttime", "rest"]
    },
    {
      id: "loving-kindness",
      title: "Loving Kindness",
      description: "Cultivate compassion for yourself and others through this heart-centered practice.",
      duration: 15,
      category: "emotions",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=500&q=80",
      guideType: "guided",
      level: "intermediate",
      popular: false,
      tags: ["compassion", "heart-centered", "loving-kindness", "emotional-wellness"]
    },
    {
      id: "body-scan",
      title: "Progressive Body Scan",
      description: "Bring awareness to each part of your body for deep relaxation and presence.",
      duration: 20,
      category: "body",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
      guideType: "guided",
      level: "beginner",
      popular: false,
      tags: ["body-awareness", "relaxation", "presence", "tension-release"]
    },
    {
      id: "gratitude-flow",
      title: "Gratitude Flow",
      description: "Cultivate a sense of appreciation and abundance through guided gratitude meditation.",
      duration: 10,
      category: "emotions",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=500&q=80",
      guideType: "guided",
      level: "beginner",
      popular: false,
      tags: ["gratitude", "abundance", "positivity", "emotional-wellness"]
    },
    {
      id: "5-minute-reset",
      title: "5-Minute Reset",
      description: "Quick meditation to reset your mind and refocus during a busy day.",
      duration: 5,
      category: "stress",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
      guideType: "guided",
      level: "beginner",
      popular: true,
      tags: ["quick", "reset", "focus", "stress"]
    },
    {
      id: "breath-awareness",
      title: "Breath Awareness",
      description: "Simple meditation focusing on the breath to anchor you in the present moment.",
      duration: 10,
      category: "breathing",
      image: "https://images.unsplash.com/photo-1498598457418-36ef20772c9e?auto=format&fit=crop&w=500&q=80",
      guideType: "unguided",
      level: "beginner",
      popular: false,
      tags: ["breathing", "presence", "mindfulness", "focus"]
    }
  ];
  
  // Sample sleep tips
  const sleepTips: SleepTip[] = [
    {
      id: "consistent-schedule",
      title: "Maintain a Consistent Schedule",
      description: "Go to bed and wake up at the same time daily, even on weekends, to regulate your body's clock.",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      category: "routine"
    },
    {
      id: "screen-time",
      title: "Limit Screen Time",
      description: "Avoid screens (phones, tablets, computers) at least 1 hour before bedtime as blue light disrupts melatonin production.",
      icon: <X className="h-5 w-5 text-red-500" />,
      category: "environment"
    },
    {
      id: "bedtime-ritual",
      title: "Create a Bedtime Ritual",
      description: "Develop calming pre-sleep activities like reading, gentle stretching, or meditation to signal your body it's time to wind down.",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      category: "routine"
    },
    {
      id: "sleep-environment",
      title: "Optimize Your Sleep Environment",
      description: "Keep your bedroom cool (65-68°F/18-20°C), dark, and quiet for optimal sleep conditions.",
      icon: <Moon className="h-5 w-5 text-indigo-500" />,
      category: "environment"
    },
    {
      id: "caffeine-alcohol",
      title: "Watch Caffeine and Alcohol",
      description: "Avoid caffeine 6+ hours before bed and limit alcohol, which disrupts REM sleep despite its initial sedative effect.",
      icon: <AlarmClock className="h-5 w-5 text-yellow-500" />,
      category: "nutrition"
    },
    {
      id: "daytime-exercise",
      title: "Exercise During the Day",
      description: "Regular physical activity promotes better sleep, but try to finish workouts at least 3 hours before bedtime.",
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      category: "activity"
    },
    {
      id: "worry-journal",
      title: "Use a Worry Journal",
      description: "Write down concerns before bed to prevent racing thoughts and anxiety while trying to fall asleep.",
      icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
      category: "relaxation"
    },
    {
      id: "limit-naps",
      title: "Limit Daytime Naps",
      description: "If you nap, keep it to 20-30 minutes and before 3pm to avoid interfering with nighttime sleep.",
      icon: <Hourglass className="h-5 w-5 text-orange-500" />,
      category: "routine"
    }
  ];
  
  // Load sleep logs from localStorage on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('sleep-logs');
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);
      setSleepLogs(parsedLogs);
      calculateStreak(parsedLogs);
    }
    
    return () => {
      // Clear any active timers when component unmounts
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Calculate streak based on consecutive days of sleep logging
  const calculateStreak = (logs: SleepLog[]) => {
    if (logs.length === 0) {
      setCurrentStreak(0);
      return;
    }
    
    // Sort logs by date (newest first)
    const sortedLogs = [...logs].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Check if there's a log for today or yesterday to maintain streak
    const latestLogDate = sortedLogs[0].date;
    if (latestLogDate !== today && latestLogDate !== yesterday) {
      setCurrentStreak(0);
      return;
    }
    
    // Count consecutive days
    let streak = 1;
    for (let i = 1; i < sortedLogs.length; i++) {
      const currentDate = new Date(sortedLogs[i-1].date);
      const prevDate = new Date(sortedLogs[i].date);
      
      // Check if dates are consecutive
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    setCurrentStreak(streak);
  };
  
  // Start or pause meditation timer
  const toggleMeditation = () => {
    if (!selectedMeditation) return;
    
    if (isPlaying) {
      // Pause the meditation
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Start or resume the meditation
      setIsPlaying(true);
      
      // Set up timer that increments elapsed time every second
      timerRef.current = window.setInterval(() => {
        setMeditationElapsed(prev => {
          // Check if meditation is complete
          if (prev >= selectedMeditation.duration * 60) {
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
            }
            setIsPlaying(false);
            toast({
              title: "Meditation Complete",
              description: `You've completed your ${selectedMeditation.title} session.`,
              duration: 5000,
            });
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };
  
  // Start a new meditation session
  const startMeditation = (session: MeditationSession) => {
    // Reset any existing session
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setSelectedMeditation(session);
    setMeditationElapsed(0);
    setIsPlaying(true);
    
    // Start the timer
    timerRef.current = window.setInterval(() => {
      setMeditationElapsed(prev => {
        // Check if meditation is complete
        if (prev >= session.duration * 60) {
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
          }
          setIsPlaying(false);
          toast({
            title: "Meditation Complete",
            description: `You've completed your ${session.title} session.`,
            duration: 5000,
          });
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    
    toast({
      title: "Meditation Started",
      description: `Starting ${session.title} session. Find a comfortable position.`,
      duration: 3000,
    });
  };
  
  // Reset current meditation
  const resetMeditation = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setMeditationElapsed(0);
    setIsPlaying(false);
  };
  
  // Complete current meditation
  const completeMeditation = () => {
    if (!selectedMeditation) return;
    
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setMeditationElapsed(selectedMeditation.duration * 60);
    setIsPlaying(false);
    
    toast({
      title: "Meditation Completed",
      description: "Great job! You've completed your meditation session.",
      duration: 3000,
    });
  };
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    if (!selectedMeditation) return 0;
    return (meditationElapsed / (selectedMeditation.duration * 60)) * 100;
  };
  
  // Filter meditation sessions by category
  const filteredMeditations = meditationSessions.filter(session => 
    meditationCategoryFilter === "all" || session.category === meditationCategoryFilter
  );
  
  // Group sleep tips by category
  const groupedSleepTips = sleepTips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, SleepTip[]>);
  
  // Add new sleep log entry
  const addSleepLogEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if today's entry already exists
    const existingEntryIndex = sleepLogs.findIndex(log => log.date === today);
    
    const newEntry: SleepLog = {
      date: today,
      hoursSlept: newSleepEntry.hoursSlept,
      quality: newSleepEntry.quality,
      notes: newSleepEntry.notes || undefined
    };
    
    let updatedLogs: SleepLog[];
    
    if (existingEntryIndex !== -1) {
      // Update existing entry
      updatedLogs = [...sleepLogs];
      updatedLogs[existingEntryIndex] = newEntry;
      
      toast({
        title: "Sleep Log Updated",
        description: "Your sleep log for today has been updated.",
        duration: 2000,
      });
    } else {
      // Add new entry
      updatedLogs = [newEntry, ...sleepLogs];
      
      toast({
        title: "Sleep Log Added",
        description: "Your sleep log has been recorded successfully.",
        duration: 2000,
      });
    }
    
    setSleepLogs(updatedLogs);
    localStorage.setItem('sleep-logs', JSON.stringify(updatedLogs));
    calculateStreak(updatedLogs);
    setShowSleepModal(false);
  };
  
  // Calculate average sleep metrics
  const calculateAverageSleep = () => {
    if (sleepLogs.length === 0) return { hours: 0, quality: 0 };
    
    const totalHours = sleepLogs.reduce((sum, log) => sum + log.hoursSlept, 0);
    const totalQuality = sleepLogs.reduce((sum, log) => sum + log.quality, 0);
    
    return {
      hours: Number((totalHours / sleepLogs.length).toFixed(1)),
      quality: Number((totalQuality / sleepLogs.length).toFixed(1))
    };
  };
  
  const averageSleep = calculateAverageSleep();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfdff] to-[#f7faff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3730a3] to-[#5b21b6] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ffffff%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#8B5CF6]/20 to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between mb-8">
            <Button 
              variant="link" 
              className="text-white hover:text-[#c4b5fd] transition-colors p-0 flex items-center"
              onClick={() => navigate("/app/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {activeTab === "meditation" ? (
                  <div className="relative">
                    <div className="absolute -inset-1 bg-[#c4b5fd] rounded-full blur opacity-60"></div>
                    <div className="relative">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute -inset-1 bg-[#c4b5fd] rounded-full blur opacity-60"></div>
                    <div className="relative">
                      <Moon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                )}
                <h1 className="text-4xl font-bold">{activeTab === "meditation" ? "Mindfulness Meditation" : "Sleep Better"}</h1>
              </div>
              <p className="text-xl text-indigo-200">
                {activeTab === "meditation" 
                  ? "Cultivate awareness and presence through guided practices" 
                  : "Improve your sleep quality with expert tips and tracking"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="meditation" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-8">
            <TabsList className="h-12">
              <TabsTrigger 
                value="meditation" 
                className="flex items-center gap-2 px-6 data-[state=active]:bg-[#8B5CF6]"
              >
                <Sparkles className="h-5 w-5" />
                Meditation
              </TabsTrigger>
              <TabsTrigger 
                value="sleep" 
                className="flex items-center gap-2 px-6 data-[state=active]:bg-[#8B5CF6]"
              >
                <Moon className="h-5 w-5" />
                Sleep
              </TabsTrigger>
            </TabsList>
            
            {activeTab === "sleep" && (
              <Button
                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
                onClick={() => setShowSleepModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Log Sleep
              </Button>
            )}
          </div>
          
          <TabsContent value="meditation" className="mt-0">
            {/* Current meditation display */}
            {selectedMeditation && (
              <Card className="mb-8 bg-gradient-to-r from-[#8B5CF6]/10 to-[#C4B5FD]/5 border-[#8B5CF6]/20">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-[#4C1D95]">
                      Current Session: {selectedMeditation.title}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedMeditation(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription className="text-[#6D28D9]/70">
                    {selectedMeditation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#6D28D9]">
                        {formatTime(meditationElapsed)}
                      </span>
                      <span className="text-sm font-medium text-[#6D28D9]">
                        {formatTime(selectedMeditation.duration * 60)}
                      </span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-[#8B5CF6]/50 text-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                      onClick={resetMeditation}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      variant="default"
                      size="icon"
                      className="h-16 w-16 rounded-full bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
                      onClick={toggleMeditation}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white ml-1" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-[#8B5CF6]/50 text-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                      onClick={completeMeditation}
                    >
                      <Check className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Meditation filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={meditationCategoryFilter === "all" ? "default" : "outline"}
                size="sm"
                className={meditationCategoryFilter === "all" ? "bg-[#8B5CF6]" : ""}
                onClick={() => setMeditationCategoryFilter("all")}
              >
                All Types
              </Button>
              
              <Button
                variant={meditationCategoryFilter === "morning" ? "default" : "outline"}
                size="sm"
                className={meditationCategoryFilter === "morning" ? "bg-[#8B5CF6]" : ""}
                onClick={() => setMeditationCategoryFilter("morning")}
              >
                <Sun className="h-4 w-4 mr-1" />
                Morning
              </Button>
              
              <Button
                variant={meditationCategoryFilter === "stress" ? "default" : "outline"}
                size="sm"
                className={meditationCategoryFilter === "stress" ? "bg-[#8B5CF6]" : ""}
                onClick={() => setMeditationCategoryFilter("stress")}
              >
                <Heart className="h-4 w-4 mr-1" />
                Stress Relief
              </Button>
              
              <Button
                variant={meditationCategoryFilter === "sleep" ? "default" : "outline"}
                size="sm"
                className={meditationCategoryFilter === "sleep" ? "bg-[#8B5CF6]" : ""}
                onClick={() => setMeditationCategoryFilter("sleep")}
              >
                <Moon className="h-4 w-4 mr-1" />
                Sleep
              </Button>
              
              <Button
                variant={meditationCategoryFilter === "breathing" ? "default" : "outline"}
                size="sm"
                className={meditationCategoryFilter === "breathing" ? "bg-[#8B5CF6]" : ""}
                onClick={() => setMeditationCategoryFilter("breathing")}
              >
                <Bell className="h-4 w-4 mr-1" />
                Breathing
              </Button>
              
              <Button
                variant={meditationCategoryFilter === "emotions" ? "default" : "outline"}
                size="sm"
                className={meditationCategoryFilter === "emotions" ? "bg-[#8B5CF6]" : ""}
                onClick={() => setMeditationCategoryFilter("emotions")}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Emotional
              </Button>
              
              <Button
                variant={meditationCategoryFilter === "body" ? "default" : "outline"}
                size="sm"
                className={meditationCategoryFilter === "body" ? "bg-[#8B5CF6]" : ""}
                onClick={() => setMeditationCategoryFilter("body")}
              >
                <ListChecks className="h-4 w-4 mr-1" />
                Body Scan
              </Button>
            </div>
            
            {/* Meditation grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeditations.length > 0 ? (
                filteredMeditations.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-all border-gray-200 cursor-pointer">
                      <div className="relative h-36 overflow-hidden">
                        <img 
                          src={session.image} 
                          alt={session.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between text-white">
                            <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                              <Timer className="h-3 w-3 mr-1" />
                              {session.duration} min
                            </div>
                            
                            <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs capitalize">
                              {session.guideType}
                            </div>
                          </div>
                        </div>
                        
                        {session.popular && (
                          <div className="absolute top-2 right-2 bg-[#8B5CF6] text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl group-hover:text-[#8B5CF6] transition-colors">
                          {session.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {session.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0 flex-grow">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {session.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-[#8B5CF6]/5 text-[#6D28D9] border-[#8B5CF6]/20"
                            >
                              {tag.replace(/-/g, ' ')}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 flex items-center gap-2"
                          onClick={() => startMeditation(session)}
                        >
                          <Play className="h-4 w-4" />
                          Start Session
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No meditations found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters to find the perfect meditation for you.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setMeditationCategoryFilter("all")}
                  >
                    Show All Meditations
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="sleep" className="mt-0">
            {/* Sleep statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-[#c7d2fe]/50 to-[#e0e7ff]/30 border-indigo-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-indigo-900 flex items-center">
                    <Moon className="h-5 w-5 mr-2 text-indigo-600" />
                    Average Sleep Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-indigo-800">
                    {averageSleep.hours}
                    <span className="text-xl font-normal text-indigo-600 ml-1">hours</span>
                  </div>
                  <p className="text-sm text-indigo-700 mt-1">
                    {averageSleep.hours >= 7 
                      ? "Great! You're getting enough sleep." 
                      : "Try to aim for 7-9 hours per night."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#ddd6fe]/50 to-[#ede9fe]/30 border-purple-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-purple-900 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-purple-600" />
                    Sleep Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-800">
                    {averageSleep.quality}
                    <span className="text-xl font-normal text-purple-600 ml-1">/ 10</span>
                  </div>
                  <p className="text-sm text-purple-700 mt-1">
                    {averageSleep.quality >= 7 
                      ? "Your sleep quality is good!" 
                      : "Tips below may help improve your sleep quality."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#c4b5fd]/50 to-[#ddd6fe]/30 border-violet-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-violet-900 flex items-center">
                    <BarChart4 className="h-5 w-5 mr-2 text-violet-600" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-violet-800">
                    {currentStreak}
                    <span className="text-xl font-normal text-violet-600 ml-1">days</span>
                  </div>
                  <p className="text-sm text-violet-700 mt-1">
                    {currentStreak > 0 
                      ? `Keep going! You're building consistency.` 
                      : "Start logging your sleep daily to build a streak!"}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Sleep tips */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Moon className="h-6 w-6 text-[#8B5CF6]" />
                Sleep Tips & Recommendations
              </h2>
              
              {Object.entries(groupedSleepTips).map(([category, tips], idx) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
                    {category} Tips
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tips.map((tip) => (
                      <Card key={tip.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center">
                            {tip.icon}
                            <span className="ml-2">{tip.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{tip.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Recent sleep logs */}
            {sleepLogs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-[#8B5CF6]" />
                  Recent Sleep Logs
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sleepLogs.slice(0, 9).map((log, index) => (
                    <motion.div
                      key={log.date}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="border-gray-200 hover:shadow-sm transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex justify-between items-center">
                            <span>{new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                            <Badge className="bg-[#8B5CF6]">{log.hoursSlept} hrs</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-1">Quality</p>
                            <div className="flex items-center gap-1">
                              {[...Array(10)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`h-1.5 w-3 rounded-full ${
                                    i < log.quality 
                                      ? 'bg-[#8B5CF6]' 
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">{log.quality}/10</span>
                            </div>
                          </div>
                          
                          {log.notes && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Notes</p>
                              <p className="text-sm text-gray-600 italic">"{log.notes}"</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sleep Log Modal */}
      {showSleepModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Moon className="h-6 w-6 text-[#8B5CF6]" />
              Log Your Sleep
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours Slept
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={newSleepEntry.hoursSlept}
                  onChange={(e) => setNewSleepEntry({
                    ...newSleepEntry,
                    hoursSlept: parseFloat(e.target.value)
                  })}
                  className="w-full"
                />
                <span className="ml-4 text-lg font-medium text-gray-800 min-w-[60px]">
                  {newSleepEntry.hoursSlept} hrs
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sleep Quality (1-10)
              </label>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-6 rounded-full cursor-pointer ${
                      i < newSleepEntry.quality
                        ? 'bg-[#8B5CF6]'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => setNewSleepEntry({
                      ...newSleepEntry,
                      quality: i + 1
                    })}
                  />
                ))}
                <span className="ml-2 text-lg font-medium text-gray-800">
                  {newSleepEntry.quality}/10
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                placeholder="How did you sleep? Any dreams or disturbances?"
                rows={3}
                value={newSleepEntry.notes}
                onChange={(e) => setNewSleepEntry({
                  ...newSleepEntry,
                  notes: e.target.value
                })}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSleepModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
                onClick={addSleepLogEntry}
              >
                Save Sleep Log
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Mindfulness;
