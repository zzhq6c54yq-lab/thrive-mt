
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { 
  ArrowLeft, TrendingUp, Calendar, Award, Target, 
  CheckCircle2, Activity, Zap, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Sample data for charts
const moodData = [
  { day: "Mon", mood: 6, anxiety: 4 },
  { day: "Tue", mood: 7, anxiety: 3 },
  { day: "Wed", mood: 5, anxiety: 5 },
  { day: "Thu", mood: 8, anxiety: 2 },
  { day: "Fri", mood: 7, anxiety: 3 },
  { day: "Sat", mood: 9, anxiety: 1 },
  { day: "Sun", mood: 8, anxiety: 2 }
];

const activeMinutesData = [
  { week: "Week 1", minutes: 120 },
  { week: "Week 2", minutes: 145 },
  { week: "Week 3", minutes: 130 },
  { week: "Week 4", minutes: 160 }
];

const goalsData = [
  { name: "Daily Meditation", completion: 80 },
  { name: "Journaling", completion: 65 },
  { name: "Exercise", completion: 50 },
  { name: "Reading", completion: 90 },
  { name: "Social Connection", completion: 70 }
];

const achievementsData = [
  { 
    id: 1,
    title: "30-Day Streak",
    description: "Completed wellness activities for 30 consecutive days",
    icon: <Award className="h-10 w-10 text-amber-400" />,
    date: "Mar 15, 2025",
    gradient: "from-amber-400 to-yellow-600"
  },
  { 
    id: 2,
    title: "Mindfulness Master",
    description: "Completed 50 mindfulness sessions",
    icon: <Zap className="h-10 w-10 text-purple-500" />,
    date: "Feb 28, 2025", 
    gradient: "from-purple-500 to-indigo-600"
  },
  { 
    id: 3,
    title: "Goal Getter",
    description: "Achieved 5 personal wellness goals",
    icon: <Target className="h-10 w-10 text-blue-500" />,
    date: "Feb 10, 2025",
    gradient: "from-blue-500 to-cyan-500" 
  },
  { 
    id: 4,
    title: "Journaling Journey",
    description: "Created 25 journal entries",
    icon: <CheckCircle2 className="h-10 w-10 text-green-500" />,
    date: "Jan 25, 2025",
    gradient: "from-green-500 to-emerald-600" 
  },
];

const ProgressReports: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [activePeriod, setActivePeriod] = useState("week");
  const [showAchievementDetails, setShowAchievementDetails] = useState<number | null>(null);

  const handleGoBack = () => {
    navigate('/home');
  };

  const handlePeriodChange = (period: string) => {
    setActivePeriod(period);
    toast({
      title: `Showing ${period} data`,
      description: `Viewing your progress over the last ${period}`,
      duration: 1500,
    });
  };

  const handleShareProgress = () => {
    toast({
      title: "Progress Shared",
      description: "Your progress report has been shared with your support network",
      duration: 2000,
    });
  };

  // Animation variants for framer-motion
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
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white pb-12">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#1a1a1f] to-[#272730] py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <Activity className="inline mr-2 h-6 w-6 text-[#9b87f5]" /> 
                Progress Dashboard
              </h1>
              <p className="text-gray-300 text-sm md:text-base">
                Track your journey and celebrate your achievements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-white/5 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              Goals
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Period Selector */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-4">
                {["week", "month", "3 months", "year"].map((period) => (
                  <Button
                    key={period}
                    onClick={() => handlePeriodChange(period)}
                    variant={activePeriod === period ? "default" : "outline"}
                    className={activePeriod === period 
                      ? "bg-[#9b87f5] hover:bg-[#8a76e4]" 
                      : "bg-white/5 hover:bg-white/10 text-white"}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Button>
                ))}
              </motion.div>

              {/* Summary Stats Row */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">89%</div>
                    <p className="text-gray-300 text-sm">Wellness Score</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">24</div>
                    <p className="text-gray-300 text-sm">Active Days</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">8</div>
                    <p className="text-gray-300 text-sm">Achievements</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">67%</div>
                    <p className="text-gray-300 text-sm">Goals Met</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Mood Tracking Chart */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#9b87f5]" />
                      Mood & Anxiety Tracking
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      How you've been feeling over the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={moodData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="day" stroke="#aaa" />
                          <YAxis stroke="#aaa" domain={[0, 10]} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#2a2a35', borderColor: '#444', color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="mood" 
                            stroke="#9b87f5" 
                            strokeWidth={3}
                            dot={{ stroke: '#9b87f5', strokeWidth: 2, r: 4, fill: '#9b87f5' }}
                            activeDot={{ stroke: '#9b87f5', strokeWidth: 2, r: 6, fill: '#9b87f5' }}
                            name="Mood (1-10)"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="anxiety" 
                            stroke="#f87171" 
                            strokeWidth={3}
                            dot={{ stroke: '#f87171', strokeWidth: 2, r: 4, fill: '#f87171' }}
                            activeDot={{ stroke: '#f87171', strokeWidth: 2, r: 6, fill: '#f87171' }}
                            name="Anxiety (1-10)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Activity Minutes Chart */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-[#6C85DD]" />
                      Active Minutes
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Time spent on mental wellness activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activeMinutesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="week" stroke="#aaa" />
                          <YAxis stroke="#aaa" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#2a2a35', borderColor: '#444', color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="minutes" 
                            stroke="#6C85DD" 
                            fill="url(#colorMinutes)" 
                            strokeWidth={2}
                            name="Active Minutes"
                          />
                          <defs>
                            <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6C85DD" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#6C85DD" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Progress on Goals */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">Goal Progress</h2>
                      <p className="text-sm text-gray-400">Your current goals and completion rates</p>
                    </div>
                    <Button className="bg-[#9b87f5] hover:bg-[#8a76e4]">
                      Add New Goal
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {goalsData.map((goal) => (
                      <div key={goal.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">{goal.name}</span>
                          <span className="text-sm text-gray-300">{goal.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${goal.completion}%`,
                              background: `linear-gradient(to right, #9b87f5, #6C85DD)`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Goal Completion Chart */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-[#D946EF]" />
                      Goal Completion Rate
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Visualize your progress on each goal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={goalsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="name" stroke="#aaa" />
                          <YAxis stroke="#aaa" domain={[0, 100]} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#2a2a35', borderColor: '#444', color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Bar 
                            dataKey="completion" 
                            name="Completion %" 
                            radius={[4, 4, 0, 0]}
                          >
                            {goalsData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={index % 2 === 0 ? '#9b87f5' : '#D946EF'} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievementsData.map((achievement) => (
                  <Card 
                    key={achievement.id}
                    className="bg-white/10 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative"
                    onClick={() => setShowAchievementDetails(achievement.id === showAchievementDetails ? null : achievement.id)}
                  >
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${achievement.gradient.split(' ')[1]} 0%, transparent 60%)`,
                        zIndex: 0
                      }}
                    ></div>

                    <CardContent className="p-4 flex items-start space-x-4 relative z-10 cursor-pointer">
                      <div className="p-3 rounded-lg bg-white/10">
                        {achievement.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg text-white mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-300">{achievement.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge
                            className={`bg-gradient-to-r ${achievement.gradient} text-white`}
                            variant="outline"
                          >
                            {achievement.date}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-gray-400"
                          >
                            <ChevronRight 
                              className={`h-5 w-5 transition-all ${showAchievementDetails === achievement.id ? 'rotate-90' : ''}`}
                            />
                          </Button>
                        </div>
                      </div>
                    </CardContent>

                    {showAchievementDetails === achievement.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-4"
                      >
                        <div className="border-t border-white/10 pt-3 mt-2">
                          <p className="text-sm text-gray-400 mb-3">
                            Achieving this milestone shows your dedication to improving your mental wellness.
                            Keep up the great work!
                          </p>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="text-white border-white/20 hover:bg-white/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareProgress();
                            }}
                          >
                            Share Achievement
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Zap className="h-5 w-5 text-[#9b87f5] mr-2" />
                    Wellness Insights
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-2">Your Best Days</h3>
                      <p className="text-sm text-gray-300">
                        Based on your mood tracking, <span className="text-[#9b87f5] font-medium">Saturdays</span> are 
                        your most positive days. Consider what activities you typically do then and try 
                        to incorporate them throughout your week.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-2">Activity Impact</h3>
                      <p className="text-sm text-gray-300">
                        Your mood scores increase by an average of <span className="text-green-400 font-medium">32%</span> on 
                        days when you complete mindfulness exercises. We recommend prioritizing this activity.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-2">Improvement Areas</h3>
                      <p className="text-sm text-gray-300">
                        You could benefit from more regular journaling. Users who journal at least 
                        3 times per week report <span className="text-blue-400 font-medium">40% lower</span> anxiety scores.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-2">Weekly Challenge</h3>
                      <p className="text-sm text-gray-300">
                        Try adding a 5-minute breathing exercise to your morning routine. 
                        This simple addition has shown to reduce stress levels throughout the day.
                      </p>
                      <Button className="mt-3 bg-[#9b87f5] hover:bg-[#8a76e4]">
                        Start Challenge
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressReports;
