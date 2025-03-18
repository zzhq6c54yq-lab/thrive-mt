import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, ListChecks, MessageSquareHeart, Heart, Puzzle, CalendarDays, BookOpen, Play, AlarmClock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import HomeButton from "@/components/HomeButton";
import HenryButton from "@/components/henry/HenryButton";
import { Checkbox } from "@/components/ui/checkbox";

// Sample affirmations data
const affirmations = [
  "I am worthy of love and respect.",
  "I trust my journey and embrace change with an open heart.",
  "My potential to succeed is infinite.",
  "I possess the strength to overcome any challenge.",
  "Today, I choose joy and gratitude.",
  "I am in charge of how I feel and today I choose happiness.",
  "I am becoming a better version of myself every day.",
  "I radiate confidence, self-respect, and inner harmony.",
  "My mind is clear, focused, and ready for today's challenges.",
  "I breathe in courage and exhale fear."
];

// Sample self-care activities
const selfCareActivities = [
  { 
    id: "outdoor",
    category: "Outdoor", 
    activities: [
      "Take a 15-minute nature walk", 
      "Practice outdoor yoga", 
      "Have a picnic in the park",
      "Watch the sunset or sunrise"
    ] 
  },
  { 
    id: "creative",
    category: "Creative", 
    activities: [
      "Draw or paint for 20 minutes", 
      "Write in your journal", 
      "Play a musical instrument",
      "Try a new recipe"
    ] 
  },
  { 
    id: "relaxation",
    category: "Relaxation", 
    activities: [
      "Take a warm bath with essential oils", 
      "Practice deep breathing for 5 minutes", 
      "Listen to calming music",
      "Do a guided meditation session"
    ] 
  },
  { 
    id: "social",
    category: "Social", 
    activities: [
      "Call a friend or family member", 
      "Join a community event", 
      "Volunteer for a cause you care about",
      "Have a meaningful conversation"
    ] 
  }
];

// Sample routine templates
const routineTemplates = [
  {
    id: "morning",
    title: "Morning Wellness",
    description: "Start your day with mindfulness and positivity",
    activities: [
      { time: "06:30", description: "Wake up & hydrate", completed: false },
      { time: "06:45", description: "5-minute meditation", completed: false },
      { time: "07:00", description: "Journaling - 3 gratitudes", completed: false },
      { time: "07:15", description: "Light stretching or yoga", completed: false },
      { time: "07:45", description: "Nutritious breakfast", completed: false }
    ]
  },
  {
    id: "work",
    title: "Work-From-Home Balance",
    description: "Maintain wellness while working remotely",
    activities: [
      { time: "09:00", description: "Set daily intentions", completed: false },
      { time: "10:30", description: "Standing/stretching break (5 min)", completed: false },
      { time: "12:00", description: "Mindful lunch away from desk", completed: false },
      { time: "14:30", description: "Quick walk or fresh air break", completed: false },
      { time: "16:30", description: "End-of-day reflection", completed: false }
    ]
  },
  {
    id: "evening",
    title: "Evening Relaxation",
    description: "Wind down and prepare for restful sleep",
    activities: [
      { time: "19:00", description: "Digital sunset (reduce screen time)", completed: false },
      { time: "19:30", description: "Light physical activity", completed: false },
      { time: "20:15", description: "Relaxing bath or shower", completed: false },
      { time: "21:00", description: "Reading or calming activity", completed: false },
      { time: "21:45", description: "Bedtime meditation or breathing", completed: false }
    ]
  },
  {
    id: "weekend",
    title: "Weekend Recharge",
    description: "Reset and recharge for the week ahead",
    activities: [
      { time: "08:00", description: "Sleep in & wake naturally", completed: false },
      { time: "09:30", description: "Longer meditation session", completed: false },
      { time: "11:00", description: "Nature time (park, hike, garden)", completed: false },
      { time: "14:00", description: "Creative hobby time", completed: false },
      { time: "19:00", description: "Social connection time", completed: false }
    ]
  }
];

const LifestyleIntegration = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedRoutine, setSelectedRoutine] = useState(routineTemplates[0]);
  const [customRoutine, setCustomRoutine] = useState<{time: string, description: string, completed: boolean}[]>([]);
  const [newActivity, setNewActivity] = useState({ time: "", description: "" });
  const [dailyAffirmation, setDailyAffirmation] = useState(affirmations[Math.floor(Math.random() * affirmations.length)]);
  const [selectedCategory, setSelectedCategory] = useState("outdoor");

  const handleAddActivity = () => {
    if (newActivity.time && newActivity.description) {
      setCustomRoutine([...customRoutine, { ...newActivity, completed: false }]);
      setNewActivity({ time: "", description: "" });
      
      toast({
        title: "Activity Added",
        description: `Added "${newActivity.description}" to your routine`,
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please enter both time and description",
        variant: "destructive"
      });
    }
  };

  const handleToggleComplete = (index: number, isTemplateRoutine: boolean) => {
    if (isTemplateRoutine) {
      const updatedRoutine = { ...selectedRoutine };
      updatedRoutine.activities[index].completed = !updatedRoutine.activities[index].completed;
      setSelectedRoutine(updatedRoutine);
    } else {
      const updatedRoutine = [...customRoutine];
      updatedRoutine[index].completed = !updatedRoutine[index].completed;
      setCustomRoutine(updatedRoutine);
    }
  };

  const handleSyncCalendar = () => {
    toast({
      title: "Calendar Sync",
      description: "Your activities have been synced with your calendar app",
    });
  };

  const handleSelectRoutineTemplate = (templateId: string) => {
    const template = routineTemplates.find(r => r.id === templateId);
    if (template) {
      setSelectedRoutine(template);
      toast({
        title: "Routine Template Selected",
        description: `You've selected the ${template.title} routine`,
      });
    }
  };

  const handleNewAffirmation = () => {
    let newAffirmation;
    do {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === dailyAffirmation);
    
    setDailyAffirmation(newAffirmation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <HomeButton />
            <div>
              <h1 className="text-3xl font-bold text-white">Lifestyle Integration</h1>
              <p className="text-gray-300">Seamlessly blend mental wellness into your daily routine</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Card className="mb-8 border border-gray-700 bg-gray-800 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-white">
              <MessageSquareHeart className="h-6 w-6" />
              Daily Affirmation
            </CardTitle>
            <CardDescription className="text-gray-200">
              Start your day with positivity
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-700/30 p-6 rounded-lg border border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <p className="text-xl text-center text-white italic font-light mb-4">{dailyAffirmation}</p>
              <div className="flex justify-center">
                <Button onClick={handleNewAffirmation} variant="gold" className="mt-2">
                  New Affirmation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border border-gray-700 bg-gray-800 shadow-xl h-full">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-cyan-700 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-white">
                <ListChecks className="h-6 w-6" />
                Routine Builder
              </CardTitle>
              <CardDescription className="text-gray-200">
                Create your personalized daily routine
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="templates" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="templates">Template Routines</TabsTrigger>
                  <TabsTrigger value="custom">Custom Routine</TabsTrigger>
                </TabsList>
                
                <TabsContent value="templates" className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {routineTemplates.map((template) => (
                      <Button 
                        key={template.id}
                        variant={selectedRoutine.id === template.id ? "gold" : "outline"}
                        className="justify-start text-left"
                        onClick={() => handleSelectRoutineTemplate(template.id)}
                      >
                        <div>
                          <div className="font-medium">{template.title}</div>
                          <div className="text-xs text-gray-400">{template.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="space-y-3 bg-gray-700/30 p-4 rounded-lg border border-blue-500/30">
                    <h3 className="text-lg font-semibold text-white mb-2">{selectedRoutine.title}</h3>
                    {selectedRoutine.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-md bg-gray-700/30">
                        <Checkbox 
                          id={`template-activity-${index}`}
                          checked={activity.completed}
                          onCheckedChange={() => handleToggleComplete(index, true)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-400" />
                            <span className="text-gray-300">{activity.time}</span>
                          </div>
                          <Label 
                            htmlFor={`template-activity-${index}`}
                            className={`text-sm font-medium ${activity.completed ? 'line-through text-gray-500' : 'text-white'}`}
                          >
                            {activity.description}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="gold" onClick={handleSyncCalendar} className="flex gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Sync with Calendar
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="custom" className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1">
                      <Label htmlFor="activity-time" className="text-gray-300 mb-1 block">Time</Label>
                      <Input
                        id="activity-time"
                        type="time"
                        value={newActivity.time}
                        onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                        className="border-gray-600 bg-gray-700 text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="activity-description" className="text-gray-300 mb-1 block">Activity</Label>
                      <div className="flex gap-2">
                        <Input
                          id="activity-description"
                          value={newActivity.description}
                          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                          placeholder="Enter activity"
                          className="border-gray-600 bg-gray-700 text-white"
                        />
                        <Button onClick={handleAddActivity} variant="bronze">Add</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 bg-gray-700/30 p-4 rounded-lg border border-blue-500/30">
                    <h3 className="text-lg font-semibold text-white mb-2">Your Custom Routine</h3>
                    {customRoutine.length === 0 ? (
                      <p className="text-gray-400 text-center py-4">Add activities to build your custom routine</p>
                    ) : (
                      customRoutine.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-md bg-gray-700/30">
                          <Checkbox 
                            id={`custom-activity-${index}`}
                            checked={activity.completed}
                            onCheckedChange={() => handleToggleComplete(index, false)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-400" />
                              <span className="text-gray-300">{activity.time}</span>
                            </div>
                            <Label 
                              htmlFor={`custom-activity-${index}`}
                              className={`text-sm font-medium ${activity.completed ? 'line-through text-gray-500' : 'text-white'}`}
                            >
                              {activity.description}
                            </Label>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {customRoutine.length > 0 && (
                    <div className="flex justify-center mt-4">
                      <Button variant="gold" onClick={handleSyncCalendar} className="flex gap-2">
                        <CalendarDays className="h-4 w-4" />
                        Sync with Calendar
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-700 bg-gray-800 shadow-xl h-full">
            <CardHeader className="bg-gradient-to-r from-green-700 to-emerald-700 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-white">
                <Heart className="h-6 w-6" />
                Self-Care Activities
              </CardTitle>
              <CardDescription className="text-gray-200">
                Suggestions to boost your mental wellbeing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-2 mb-6">
                {selfCareActivities.map((category) => (
                  <Button 
                    key={category.id}
                    variant={selectedCategory === category.id ? "gold" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="justify-start"
                  >
                    {category.category}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-4 bg-gray-700/30 p-4 rounded-lg border border-green-500/30">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {selfCareActivities.find(c => c.id === selectedCategory)?.category} Activities
                </h3>
                
                {selfCareActivities.find(c => c.id === selectedCategory)?.activities.map((activity, index) => (
                  <div key={index} className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-100">{activity}</p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 bg-gray-800/50 border-gray-600 hover:bg-gray-700"
                          onClick={() => {
                            setNewActivity({
                              time: format(new Date().setHours(new Date().getHours() + 1, 0, 0, 0), 'HH:mm'),
                              description: activity
                            });
                            toast({
                              title: "Activity Added",
                              description: `Added "${activity}" to your new activities`,
                            });
                          }}
                        >
                          <AlarmClock className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 bg-gray-800/50 border-gray-600 hover:bg-green-800/30"
                          onClick={() => {
                            toast({
                              title: "Starting Activity",
                              description: `"${activity}" - Let's get started!`,
                            });
                          }}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-2">Seasonal Recommendations</h3>
                <Card className="border border-green-500/20 bg-gray-700/30">
                  <CardContent className="p-4">
                    <p className="text-gray-200 mb-2">Based on the current season:</p>
                    {date && date.getMonth() >= 2 && date.getMonth() <= 4 && (
                      <p className="text-gray-300">🌸 Spring: Nature walks, outdoor meditation, gardening therapy</p>
                    )}
                    {date && date.getMonth() >= 5 && date.getMonth() <= 7 && (
                      <p className="text-gray-300">☀️ Summer: Early morning hikes, swimming, evening reflection</p>
                    )}
                    {date && date.getMonth() >= 8 && date.getMonth() <= 10 && (
                      <p className="text-gray-300">🍂 Fall: Forest bathing, gratitude journaling, cozy reading</p>
                    )}
                    {date && (date.getMonth() >= 11 || date.getMonth() <= 1) && (
                      <p className="text-gray-300">❄️ Winter: Indoor yoga, warm tea meditation, mood lighting</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8 border border-gray-700 bg-gray-800 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-amber-700 to-orange-700 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-white">
              <BookOpen className="h-6 w-6" />
              Integration Guide
            </CardTitle>
            <CardDescription className="text-gray-200">
              How to make mental wellness a natural part of your day
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-gray-700 bg-gray-700/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Morning Mindfulness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Start your day with intention by incorporating a 5-minute meditation, gratitude journaling, or gentle stretching before checking your devices.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-700 bg-gray-700/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Workday Wellness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Set reminders for short breathing breaks, posture checks, and hydration. Take a proper lunch break away from your workspace.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-700 bg-gray-700/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Evening Wind-Down</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Create a consistent sleep routine that includes reducing screen time, relaxation activities, and reflection on positive moments from your day.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-700/20 p-4 border-t border-gray-700">
            <p className="text-gray-300 text-sm">Remember: Small, consistent actions have a greater impact on mental health than occasional major efforts. The key is integration, not addition.</p>
          </CardFooter>
        </Card>
      </div>
      <HenryButton />
    </div>
  );
};

export default LifestyleIntegration;
