
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, LineChart, BarChart, PieChart, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnalyticsData } from "@/hooks/useAnalyticsData";

const ProgressAnalytics = () => {
  const { moodData, activityData, wellnessData } = useAnalyticsData();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-[#1a1510] to-gray-900 text-white py-16 border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/" 
              state={{ screenState: 'main', returnToMain: true }}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <HomeButton />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/40">
              Progress Tracking
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">Progress Analytics</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Track your mental health journey with detailed insights and visual analytics
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-500" />
                    Mood Tracker
                  </CardTitle>
                  <CardDescription>
                    Your mood progression over the past 8 weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={moodData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="mood" stroke="#D4AF37" strokeWidth={2} activeDot={{ r: 8 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                  {moodData.length > 0 && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C5A1]/5 rounded-lg border border-[#D4AF37]/30">
                      <p className="text-sm font-semibold text-[#D4AF37] mb-2">✨ Your Progress Insight</p>
                      <p className="text-sm text-muted-foreground">
                        Your mood improved by <span className="font-bold text-[#D4AF37]">125%</span> over the past 8 weeks. 
                        On days you meditated, your mood was <span className="font-bold text-[#D4AF37]">40% higher</span>.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-green-500" />
                    Activity Tracking
                  </CardTitle>
                  <CardDescription>
                    Minutes spent on wellness activities this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={activityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="minutes" fill="#D4AF37" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  {activityData.length > 0 && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C5A1]/5 rounded-lg border border-[#D4AF37]/30">
                      <p className="text-sm font-semibold text-[#D4AF37] mb-2">📊 Activity Pattern</p>
                      <p className="text-sm text-muted-foreground">
                        You're most active on weekends. Your consistency is building a strong foundation for lasting wellness.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-500" />
                  Wellness Components
                </CardTitle>
                <CardDescription>
                  Distribution of different aspects of your wellness routine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={wellnessData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {wellnessData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                {wellnessData.length > 0 && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C5A1]/5 rounded-lg border border-[#D4AF37]/30">
                    <p className="text-sm font-semibold text-[#D4AF37] mb-2">🌟 Balanced Approach</p>
                    <p className="text-sm text-muted-foreground">
                      You're exploring diverse wellness practices. This variety creates a resilient foundation for your mental health journey.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Long-Term Progress</CardTitle>
                <CardDescription>
                  View your mental health metrics over different time periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button variant="outline" size="sm">Last 30 Days</Button>
                  <Button variant="outline" size="sm">Last 3 Months</Button>
                  <Button variant="outline" size="sm">Last 6 Months</Button>
                  <Button variant="outline" size="sm">Last Year</Button>
                  <Button variant="outline" size="sm">Custom Range</Button>
                </div>
                <div className="p-8 bg-gradient-to-br from-[#D4AF37]/10 to-[#E5C5A1]/5 rounded-xl border border-[#D4AF37]/30">
                  <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Your Journey</h3>
                  <p className="text-muted-foreground mb-4">
                    Every step forward matters. Select a time period above to explore your detailed progress trends and celebrate how far you've come.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-background/50 p-4 rounded-lg border border-[#D4AF37]/20">
                      <p className="text-2xl font-bold text-[#D4AF37]">28</p>
                      <p className="text-sm text-muted-foreground">Days Active</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-[#D4AF37]/20">
                      <p className="text-2xl font-bold text-[#D4AF37]">12</p>
                      <p className="text-sm text-muted-foreground">Tools Explored</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border border-[#D4AF37]/20">
                      <p className="text-2xl font-bold text-[#D4AF37]">350</p>
                      <p className="text-sm text-muted-foreground">Minutes Invested</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Compare your progress with previous periods or with your goals.
                  </p>
                  <Button className="w-full">View Comparisons</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Identify recurring patterns and triggers in your mental health journey.
                  </p>
                  <Button className="w-full">Analyze Patterns</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Correlations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Discover relationships between different aspects of your wellness.
                  </p>
                  <Button className="w-full">Explore Correlations</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>
                  Detailed reports of your mental health progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Monthly Progress Summary</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Generated on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Therapy Session Insights</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Generated on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Wellness Activity Impact</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Generated on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate New Report</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Share with Your Care Team</CardTitle>
                <CardDescription>
                  Securely share your progress with therapists or other healthcare providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Select which reports you'd like to share and who you'd like to share them with.
                  All sharing is secure and complies with privacy regulations.
                </p>
                <Button className="w-full">Manage Sharing</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
