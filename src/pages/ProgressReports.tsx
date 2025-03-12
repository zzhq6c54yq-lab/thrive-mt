
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Calendar, TrendingUp, Award, BarChart, Brain, Heart, Moon, ArrowUpRight, ClipboardList, BookOpen, CheckCircle, LineChart, PieChart, ListChecks, BookOpen as BookOpenIcon, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { workshopData } from "@/data/workshopData";
import { BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, LineChart as RechartsLineChart, Line, CartesianGrid, Area, AreaChart } from "recharts";

// Sample mood data for visualization
const moodData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 4 },
  { day: 'Wed', mood: 2 },
  { day: 'Thu', mood: 5 },
  { day: 'Fri', mood: 3 },
  { day: 'Sat', mood: 4 },
  { day: 'Sun', mood: 4 },
];

// Sample sleep data for visualization
const sleepData = [
  { day: 'Mon', hours: 6.5 },
  { day: 'Tue', hours: 7.2 },
  { day: 'Wed', hours: 5.8 },
  { day: 'Thu', hours: 8.0 },
  { day: 'Fri', hours: 6.7 },
  { day: 'Sat', hours: 7.5 },
  { day: 'Sun', hours: 7.9 },
];

// Sample activity data
const activityData = [
  { name: 'Meditation', minutes: 120, sessions: 5 },
  { name: 'Journaling', minutes: 45, sessions: 3 },
  { name: 'Workshops', minutes: 90, sessions: 2 },
  { name: 'Therapy', minutes: 60, sessions: 1 },
  { name: 'Exercise', minutes: 150, sessions: 4 },
];

// Sample assessment data
const assessmentData = [
  { category: 'Anxiety', score: 62, change: -8 },
  { category: 'Depression', score: 35, change: -12 },
  { category: 'Stress', score: 58, change: -15 },
  { category: 'Sleep Quality', score: 72, change: +6 },
  { category: 'Social Connection', score: 68, change: +10 },
];

// Sample goals data
const goals = [
  { id: 1, title: 'Reduce Anxiety', progress: 65, target: 'Reduce anxiety score by 20 points' },
  { id: 2, title: 'Improve Sleep', progress: 40, target: 'Achieve consistent 7+ hours of sleep' },
  { id: 3, title: 'Build Resilience', progress: 80, target: 'Complete resilience training program' },
  { id: 4, title: 'Mindfulness Practice', progress: 55, target: 'Practice mindfulness 10 minutes daily' },
];

// Sample achievements data
const achievements = [
  { id: 1, title: 'Consistency Champion', description: 'Completed activities 7 days in a row', date: '2023-06-15', icon: Trophy },
  { id: 2, title: 'Workshop Master', description: 'Completed all exercises in a workshop', date: '2023-06-10', icon: BookOpenIcon },
  { id: 3, title: 'Reflection Expert', description: 'Created 10 journal entries', date: '2023-06-05', icon: ClipboardList },
  { id: 4, title: 'Mindfulness Beginner', description: 'Completed 5 meditation sessions', date: '2023-05-28', icon: Brain },
  { id: 5, title: 'Sleep Improver', description: 'Increased average sleep by 1 hour', date: '2023-05-20', icon: Moon },
  { id: 6, title: 'Goal Setter', description: 'Created and started tracking 3 goals', date: '2023-05-15', icon: Target },
  { id: 7, title: 'Progress Tracker', description: 'Logged mood data for 14 consecutive days', date: '2023-05-10', icon: Activity },
];

const ProgressReports = () => {
  const navigate = useNavigate();
  const [workshopProgress, setWorkshopProgress] = useState<{[key: string]: number}>({});
  
  // Calculate workshop progress from localStorage
  useEffect(() => {
    const progressData: {[key: string]: number} = {};
    
    workshopData.forEach(workshop => {
      const savedProgress = localStorage.getItem(`workshop-progress-${workshop.id}`);
      if (savedProgress) {
        const completedExercises = JSON.parse(savedProgress).length;
        const totalExercises = workshop.sections.reduce(
          (count, section) => count + section.exercises.length, 0
        );
        if (totalExercises > 0) {
          progressData[workshop.id] = Math.round((completedExercises / totalExercises) * 100);
        } else {
          progressData[workshop.id] = 0;
        }
      } else {
        progressData[workshop.id] = 0;
      }
    });
    
    setWorkshopProgress(progressData);
  }, []);
  
  const handleBack = () => {
    navigate("/");
  };

  // Calculate overall wellness score based on various metrics
  const calculateWellnessScore = () => {
    // Average of all metrics - in a real app this would use actual user data
    const avgWorkshopProgress = Object.values(workshopProgress).reduce((sum, val) => sum + val, 0) / 
                              Math.max(Object.values(workshopProgress).length, 1);
    
    const moodAvg = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length;
    const moodScore = (moodAvg / 5) * 100; // Convert to percentage
    
    const sleepAvg = sleepData.reduce((sum, day) => sum + day.hours, 0) / sleepData.length;
    const sleepScore = Math.min((sleepAvg / 8) * 100, 100); // Target is 8 hours
    
    const assessmentAvg = assessmentData.reduce((sum, item) => {
      // Invert anxiety, depression, stress scores (lower is better)
      if (['Anxiety', 'Depression', 'Stress'].includes(item.category)) {
        return sum + (100 - item.score);
      }
      return sum + item.score;
    }, 0) / assessmentData.length;
    
    // Weighted average
    return Math.round((avgWorkshopProgress * 0.3) + (moodScore * 0.3) + (sleepScore * 0.2) + (assessmentAvg * 0.2));
  };

  const wellnessScore = calculateWellnessScore();

  const handleGoalUpdate = (goalId: number) => {
    // In a real app, this would open a dialog to update goal progress
    console.log("Updating goal:", goalId);
  };

  const navigateToWorkshop = (workshopId: string) => {
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <Page title="Progress Reports" showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Mental Wellness Journey</CardTitle>
            <CardDescription>Track your progress and see how far you've come</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workshops">Workshops</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-gradient-to-br from-[#F7FBFD] to-[#F0F5FD] border-[#B87333]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-[#B87333]" />
                        Wellness Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#B87333]">{wellnessScore}%</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-[#F7FBFD] to-[#F0F5FD] border-[#B87333]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-[#B87333]" />
                        Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#B87333]">14 days</div>
                      <p className="text-xs text-muted-foreground">Your longest streak: 21 days</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-[#F7FBFD] to-[#F0F5FD] border-[#B87333]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Award className="mr-2 h-4 w-4 text-[#B87333]" />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#B87333]">{achievements.length}</div>
                      <p className="text-xs text-muted-foreground">3 new this month</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Mood Tracking</CardTitle>
                    <CardDescription>Your emotional journey over the past 7 days</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={moodData}>
                        <defs>
                          <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B87333" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#B87333" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" />
                        <YAxis domain={[0, 5]} tickCount={6} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Area 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#B87333" 
                          fillOpacity={1} 
                          fill="url(#moodGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500 justify-end">
                    Scale: 1 (Low) to 5 (High)
                  </CardFooter>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activities</CardTitle>
                      <CardDescription>Your latest wellness activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activityData.slice(0, 3).map((activity, index) => (
                          <div key={index} className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">{activity.name}</p>
                              <p className="text-sm text-muted-foreground">{activity.sessions} sessions</p>
                            </div>
                            <div className="text-[#B87333] font-semibold">{activity.minutes} min</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View All Activities</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sleep Tracking</CardTitle>
                      <CardDescription>Your sleep patterns this week</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={sleepData}>
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Bar dataKey="hours" fill="#B87333" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </CardContent>
                    <CardFooter className="text-xs text-gray-500 justify-end">
                      Hours of sleep per night
                    </CardFooter>
                  </Card>
                </div>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Achievements</CardTitle>
                    <CardDescription>Milestones in your wellness journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-start gap-3 pb-3 border-b">
                          <div className="bg-[#B87333]/10 p-2 rounded-full">
                            <achievement.icon className="h-5 w-5 text-[#B87333]" />
                          </div>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/achievements")}>
                      View All Achievements
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="workshops" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workshop Progress</CardTitle>
                    <CardDescription>Track your completion of mental wellness workshops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {workshopData.map((workshop) => {
                        const progress = workshopProgress[workshop.id] || 0;
                        // Extract color for styling
                        const colorClass = workshop.color.split(' ')[0];
                        const accentColor = colorClass.includes('bg-[#') 
                          ? colorClass.replace('bg-[', '').replace(']/10', '') 
                          : '#9b87f5';
                          
                        return (
                          <div key={workshop.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-full" style={{ backgroundColor: `${accentColor}20` }}>
                                  <workshop.icon className="h-4 w-4" style={{ color: accentColor }} />
                                </div>
                                <span className="font-medium">{workshop.title}</span>
                              </div>
                              <span className="text-sm font-medium" style={{ color: accentColor }}>
                                {progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 flex">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ width: `${progress}%`, backgroundColor: accentColor }}
                              ></div>
                            </div>
                            <div className="flex justify-end pt-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-xs flex items-center gap-1"
                                onClick={() => navigateToWorkshop(workshop.id)}
                              >
                                {progress > 0 ? "Continue Workshop" : "Start Workshop"} 
                                <ArrowUpRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Activity Breakdown</CardTitle>
                    <CardDescription>Time spent on different wellness activities</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={activityData} layout="vertical">
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={100}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="minutes" name="Minutes Spent" fill="#B87333" />
                        <Bar dataKey="sessions" name="Sessions" fill="#E5C5A1" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="goals" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Wellness Goals</CardTitle>
                    <CardDescription>Progress towards your mental wellness objectives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {goals.map((goal) => (
                        <div key={goal.id} className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{goal.title}</span>
                            <span className="text-sm font-medium text-[#B87333]">{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div 
                              className="bg-[#B87333] h-2 rounded-full" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-gray-400 mt-0.5" />
                            <span className="text-sm text-gray-600">{goal.target}</span>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleGoalUpdate(goal.id)}
                            >
                              Update Progress
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Add New Goal</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                    <CardDescription>Recognize your progress milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {achievements.slice(0, 4).map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className="bg-white rounded-lg border border-gray-200 p-3 flex items-start gap-3"
                        >
                          <div className="bg-[#B87333]/10 p-2 rounded-full">
                            <achievement.icon className="h-5 w-5 text-[#B87333]" />
                          </div>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Achievements</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mental Health Assessment</CardTitle>
                    <CardDescription>Your latest assessment results and changes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {assessmentData.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{item.category}</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium">{item.score}</span>
                              <span className={`text-xs ml-2 flex items-center ${item.change > 0 ? 
                                  (item.category === 'Anxiety' || item.category === 'Depression' || item.category === 'Stress' ? 
                                  'text-red-500' : 'text-green-500') : 
                                  (item.category === 'Anxiety' || item.category === 'Depression' || item.category === 'Stress' ? 
                                  'text-green-500' : 'text-red-500')
                                }`}>
                                {item.change > 0 ? '+' : ''}{item.change}%
                                {item.change > 0 ? 
                                  <ArrowUpRight className="h-3 w-3 ml-0.5" /> : 
                                  <TrendingUp className="h-3 w-3 ml-0.5 rotate-180" />
                                }
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                item.category === 'Anxiety' || item.category === 'Depression' || item.category === 'Stress' 
                                  ? 'bg-amber-500' 
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Wellness Score Trend</CardTitle>
                      <CardDescription>Your progress over the past 6 months</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart
                          data={[
                            { month: 'Jan', score: 52 },
                            { month: 'Feb', score: 58 },
                            { month: 'Mar', score: 61 },
                            { month: 'Apr', score: 65 },
                            { month: 'May', score: 68 },
                            { month: 'Jun', score: 78 },
                          ]}
                        >
                          <XAxis dataKey="month" />
                          <YAxis domain={[45, 85]} />
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#B87333" 
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Activity Distribution</CardTitle>
                      <CardDescription>Your holistic wellness activities</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={[
                            { category: 'Mental', minutes: 215 },
                            { category: 'Physical', minutes: 150 },
                            { category: 'Social', minutes: 90 },
                            { category: 'Spiritual', minutes: 60 },
                            { category: 'Creative', minutes: 45 },
                          ]}
                        >
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="minutes" 
                            fill="#B87333" 
                            radius={[4, 4, 0, 0]}
                            name="Minutes"
                          />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Assessment History</CardTitle>
                    <CardDescription>View your mental health assessment trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">View Detailed Assessment Reports</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default ProgressReports;
