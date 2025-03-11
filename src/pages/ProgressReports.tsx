
import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Calendar, TrendingUp, Award, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProgressReports = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/");
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-gradient-to-br from-[#F7FBFD] to-[#F0F5FD] border-[#B87333]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-[#B87333]" />
                        Wellness Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#B87333]">78%</div>
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
                      <div className="text-3xl font-bold text-[#B87333]">7</div>
                      <p className="text-xs text-muted-foreground">3 new this month</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Mood Tracking</CardTitle>
                    <CardDescription>Your emotional journey over the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart className="h-10 w-10 mx-auto mb-2 text-[#B87333]/50" />
                      <p>Your mood chart visualization will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Completed Activities</CardTitle>
                    <CardDescription>Your recent mental wellness activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">Stress Management Workshop</p>
                          <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
                        </div>
                        <div className="text-[#B87333] font-semibold">45 min</div>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">Guided Meditation</p>
                          <p className="text-sm text-muted-foreground">Completed 4 days ago</p>
                        </div>
                        <div className="text-[#B87333] font-semibold">15 min</div>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">Therapy Session</p>
                          <p className="text-sm text-muted-foreground">Completed 1 week ago</p>
                        </div>
                        <div className="text-[#B87333] font-semibold">60 min</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Activities</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="goals" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Wellness Goals</CardTitle>
                    <CardDescription>Progress towards your mental wellness objectives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Reduce Anxiety</span>
                          <span className="text-sm font-medium text-[#B87333]">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#B87333] h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Improve Sleep</span>
                          <span className="text-sm font-medium text-[#B87333]">40%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#B87333] h-2 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Build Resilience</span>
                          <span className="text-sm font-medium text-[#B87333]">80%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#B87333] h-2 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Add New Goal</Button>
                    <Button>Update Progress</Button>
                  </CardFooter>
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
