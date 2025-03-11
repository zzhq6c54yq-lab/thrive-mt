
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import HomeButton from "@/components/HomeButton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for progress tracking
const moodData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 59 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 76 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 90 },
];

const completedActivities = [
  { name: "Mindfulness Meditation", date: "2023-08-10", duration: "15 min" },
  { name: "Journaling", date: "2023-08-09", duration: "10 min" },
  { name: "Group Session", date: "2023-08-07", duration: "45 min" },
  { name: "Breathing Exercise", date: "2023-08-06", duration: "5 min" },
];

const achievements = [
  { title: "Consistency Champion", description: "Completed activities for 7 days in a row" },
  { title: "Mindfulness Master", description: "Completed 10 mindfulness sessions" },
  { title: "Journal Journey", description: "Wrote in your journal 5 times" },
];

const affirmations = [
  "You're making excellent progress on your journey.",
  "Every step you take is a step toward better mental health.",
  "Your commitment to self-improvement is inspiring.",
  "You have the strength to overcome challenges.",
];

const ProgressReports = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Progress Reports</h1>
        <HomeButton />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your wellness journey this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Mood Score</span>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Activities Completed</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Goals Achieved</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Affirmation</CardTitle>
                <CardDescription>Positive reinforcement for your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4">
                  {affirmations[Math.floor(Math.random() * affirmations.length)]}
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mood">
          <Card>
            <CardHeader>
              <CardTitle>Mood Tracking</CardTitle>
              <CardDescription>Your mood patterns over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      name="Mood Score" 
                      strokeWidth={2}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Insights</h3>
                <p className="text-gray-600">
                  Your mood has been steadily improving throughout the week! Whatever you did on Wednesday seems to have had a positive impact. Consider continuing those activities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Completed Activities</CardTitle>
              <CardDescription>Your recent wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedActivities.map((activity, index) => (
                  <div key={index} className="border-b pb-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{activity.name}</h3>
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">Duration: {activity.duration}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Weekly Summary</h3>
                <p className="text-gray-600">
                  You've completed 4 activities this week, with a total of 75 minutes dedicated to your mental wellness.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Milestones in your wellness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="bg-slate-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Next Milestones</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Workshop Expert (3/5)</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Meditation Guru (7/10)</span>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Separator className="my-6" />
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Your Mental Wellness Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Remember that progress isn't always linear. Some days may be harder than others, but every step you take is valuable. Keep going!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;
