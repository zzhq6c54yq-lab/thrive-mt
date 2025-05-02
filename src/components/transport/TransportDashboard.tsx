
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Clock, Route, Heart, Brain, ActivitySquare, ArrowRight, CalendarRange } from "lucide-react";

const TransportDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample data for wellbeing metrics
  const wellbeingData = [
    { name: 'Sleep Quality', value: 65 },
    { name: 'Stress Level', value: 75 },
    { name: 'Physical Health', value: 60 },
    { name: 'Mental Wellbeing', value: 70 }
  ];
  
  // Sample data for road stress factors
  const roadStressData = [
    { name: 'Traffic', value: 85 },
    { name: 'Tight Schedules', value: 78 },
    { name: 'Weather Conditions', value: 65 },
    { name: 'Long Hours', value: 90 },
    { name: 'Vehicle Issues', value: 45 }
  ];

  // Sample data for weekly mood tracking
  const moodData = [
    { name: 'Mon', mood: 7 },
    { name: 'Tue', mood: 6 },
    { name: 'Wed', mood: 5 },
    { name: 'Thu', mood: 7 },
    { name: 'Fri', mood: 8 },
    { name: 'Sat', mood: 9 },
    { name: 'Sun', mood: 8 },
  ];
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Upcoming events
  const upcomingEvents = [
    { title: "Road Wellness Workshop", date: "May 12, 2025", time: "7:00 PM EST" },
    { title: "Sleep Hygiene Webinar", date: "May 15, 2025", time: "8:30 PM EST" },
    { title: "Virtual Support Group", date: "May 18, 2025", time: "6:00 PM EST" }
  ];
  
  // Quick resources
  const quickResources = [
    { title: "5-Minute Meditation", icon: Brain, path: "/transport-practice/quick-meditation" },
    { title: "Stretches for Drivers", icon: ActivitySquare, path: "/transport-practice/stretches" },
    { title: "Sleep Tips", icon: Clock, path: "/transport-resources/sleep-tips" },
    { title: "Route Planning", icon: Route, path: "/transport-resources/route-planning" }
  ];
  
  const navigateToPath = (path: string) => {
    navigate(path, {
      state: {
        stayInPortal: true,
        preventTutorial: true,
        portalPath: "/transport-portal"
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wellbeing Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Heart className="mr-2 h-5 w-5 text-blue-500" />
              Your Wellbeing Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wellbeingData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => navigateToPath("/transport-assessments/wellbeing")}
            >
              Take Wellbeing Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Road Stress Factors */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Road Stress Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={roadStressData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => navigateToPath("/transport-assessments/stress")}
            >
              Take Stress Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Resources */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickResources.map((resource, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center text-center border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                  onClick={() => navigateToPath(resource.path)}
                >
                  <resource.icon className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm">{resource.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <CalendarRange className="mr-2 h-5 w-5 text-blue-500" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg border border-blue-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                  onClick={() => navigateToPath("/transport-workshops")}
                >
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Weekly Mood Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Brain className="mr-2 h-5 w-5 text-blue-500" />
            Weekly Mood Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={moodData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="mood" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-center mt-2 text-gray-500">Your mood trend for this week (scale: 1-10)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportDashboard;
