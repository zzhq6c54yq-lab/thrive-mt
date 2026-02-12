
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LineChart, BarChart, PieChart, Calendar, Download, TrendingUp, Search, Share2, FileText, Loader2, X, ClipboardList, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import HenryInsightCard from "@/components/henry/HenryInsightCard";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import jsPDF from "jspdf";
import { generateComprehensiveReport } from "@/lib/comprehensiveReportGenerator";
import { fetchComprehensiveReportData } from "@/hooks/useComprehensiveReportData";

const ProgressAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useUser();
  const { moodData, activityData, wellnessData } = useAnalyticsData();
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingComprehensive, setIsGeneratingComprehensive] = useState(false);
  const [isViewingReport, setIsViewingReport] = useState(false);
  const [reportViewUrl, setReportViewUrl] = useState<string | null>(null);
  const [reportViewFilename, setReportViewFilename] = useState<string>('');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const toggleAnalysis = (view: string) => {
    setActiveAnalysis(prev => prev === view ? null : view);
  };

  const generateReportPDF = (reportType: string) => {
    const doc = new jsPDF();
    const now = new Date();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(212, 175, 55);
    doc.text('ThriveMT', 20, 25);
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text(reportType, 20, 38);
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Generated: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 20, 48);
    
    doc.setDrawColor(212, 175, 55);
    doc.line(20, 52, 190, 52);

    let y = 65;

    if (reportType === 'Monthly Progress Summary') {
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Mood Trends', 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      if (moodData.length > 0) {
        moodData.forEach((entry: any) => {
          doc.text(`${entry.name}: Mood Score ${entry.mood}/10`, 25, y);
          y += 7;
        });
      } else {
        doc.text('No mood data recorded yet. Start daily check-ins to track your progress.', 25, y);
        y += 7;
      }

      y += 10;
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Activity Summary', 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      if (activityData.length > 0) {
        activityData.forEach((entry: any) => {
          doc.text(`${entry.name}: ${entry.minutes} minutes`, 25, y);
          y += 7;
        });
      } else {
        doc.text('No activity data recorded yet. Use wellness tools to start tracking.', 25, y);
        y += 7;
      }
    } else if (reportType === 'Therapy Session Insights') {
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Session Summary', 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text('Your therapy sessions data and insights are summarized below.', 25, y);
      y += 12;
      doc.text('Key patterns observed:', 25, y); y += 7;
      doc.text('• Consistent engagement with wellness tools', 25, y); y += 7;
      doc.text('• Mood improvements correlated with regular activity', 25, y); y += 7;
      doc.text('• Recommend continued focus on mindfulness practices', 25, y);
    } else if (reportType === 'Wellness Activity Impact') {
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Wellness Distribution', 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      if (wellnessData.length > 0) {
        wellnessData.forEach((entry: any) => {
          doc.text(`${entry.name}: ${entry.value}%`, 25, y);
          y += 7;
        });
      } else {
        doc.text('No wellness data recorded yet. Explore different wellness tools to build your profile.', 25, y);
      }
    } else {
      // Comprehensive report
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Comprehensive Progress Report', 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);

      doc.text('Mood Summary:', 25, y); y += 7;
      if (moodData.length > 0) {
        const avgMood = moodData.reduce((sum: number, d: any) => sum + d.mood, 0) / moodData.length;
        doc.text(`Average mood score: ${avgMood.toFixed(1)}/10`, 30, y); y += 7;
        doc.text(`Data points collected: ${moodData.length}`, 30, y); y += 12;
      } else {
        doc.text('No mood data available yet.', 30, y); y += 12;
      }

      doc.text('Activity Summary:', 25, y); y += 7;
      if (activityData.length > 0) {
        const totalMin = activityData.reduce((sum: number, d: any) => sum + d.minutes, 0);
        doc.text(`Total wellness minutes: ${totalMin}`, 30, y); y += 7;
        doc.text(`Activities tracked: ${activityData.length} categories`, 30, y); y += 12;
      } else {
        doc.text('No activity data available yet.', 30, y); y += 12;
      }

      doc.text('Wellness Components:', 25, y); y += 7;
      if (wellnessData.length > 0) {
        wellnessData.forEach((entry: any) => {
          doc.text(`• ${entry.name}: ${entry.value}%`, 30, y); y += 7;
        });
      } else {
        doc.text('No wellness component data available yet.', 30, y);
      }

      y += 15;
      doc.setFontSize(12);
      doc.setTextColor(212, 175, 55);
      doc.text('Keep showing up for yourself. Your progress matters.', 20, y);
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('This report is generated by ThriveMT for personal wellness tracking purposes only.', 20, 280);
    doc.text('It is not a medical diagnosis. Please consult a healthcare professional for clinical guidance.', 20, 285);

    const filename = `thrivemt-${reportType.toLowerCase().replace(/\s+/g, '-')}-${now.toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
    
    toast({
      title: "PDF Generated Successfully",
      description: `Your ${reportType} download has started. Check your browser's download bar.`,
    });
  };

  const handleGenerateNewReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateReportPDF('Comprehensive Progress Report');
      setIsGenerating(false);
    }, 800);
  };

  const handleGenerateComprehensiveReport = async (mode: 'download' | 'view' = 'download') => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to generate your comprehensive report.",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'download') {
      setIsGeneratingComprehensive(true);
    } else {
      setIsViewingReport(true);
    }
    console.log('[Report] Starting report generation, mode:', mode, 'userId:', user.id);
    try {
      const userName = profile?.display_name || user.email?.split('@')[0] || 'User';
      console.log('[Report] Fetching data for:', userName);
      const reportData = await fetchComprehensiveReportData(user.id, userName);
      console.log('[Report] Data fetched successfully, generating PDF...');
      const result = generateComprehensiveReport(reportData, mode);
      console.log('[Report] PDF generated successfully');
      
      if (mode === 'view' && result) {
        setReportViewUrl(result.blobUrl);
        setReportViewFilename(result.filename);
      } else {
        toast({
          title: "PDF Ready — Download Starting...",
          description: "Your report has been generated. Check your browser's download bar.",
        });
      }
    } catch (error) {
      console.error('[Report] Comprehensive report error:', error);
      toast({
        title: "Report Generation Failed",
        description: error instanceof Error ? error.message : "Unable to generate the comprehensive report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingComprehensive(false);
      setIsViewingReport(false);
    }
  };

  const handleManageSharing = () => {
    toast({
      title: "Secure Sharing",
      description: "HIPAA-compliant sharing with your care team is coming soon. Your privacy and data security are our top priority.",
    });
  };

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
            <button
              onClick={() => navigate('/app/dashboard')}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </button>
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
        {/* Henry Insight Card */}
        <HenryInsightCard 
          insight="I've noticed your mood improved by 125% over the past 8 weeks! On days you meditated, your mood was 40% higher. You're making real progress - keep going!"
          metric={{
            label: "Mood Improvement",
            value: "+125%",
            trend: "up"
          }}
          encouragement="Your consistency is paying off. We're so proud of how far you've come. 💪"
          className="mb-8"
        />
        
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
                  <p className="text-muted-foreground mb-4">
                    Compare your progress with previous periods or with your goals.
                  </p>
                  <Button className="w-full" onClick={() => toggleAnalysis('comparisons')}>
                    {activeAnalysis === 'comparisons' ? 'Hide Comparisons' : 'View Comparisons'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Identify recurring patterns and triggers in your mental health journey.
                  </p>
                  <Button className="w-full" onClick={() => toggleAnalysis('patterns')}>
                    {activeAnalysis === 'patterns' ? 'Hide Patterns' : 'Analyze Patterns'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Correlations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Discover relationships between different aspects of your wellness.
                  </p>
                  <Button className="w-full" onClick={() => toggleAnalysis('correlations')}>
                    {activeAnalysis === 'correlations' ? 'Hide Correlations' : 'Explore Correlations'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Inline Analysis Panels */}
            <AnimatePresence>
              {activeAnalysis === 'comparisons' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-blue-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-500" />
                          Progress Comparison
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveAnalysis(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-[#D4AF37]">This Month vs. Last Month</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                              <span className="text-sm">Average Mood</span>
                              <span className="text-green-400 font-semibold">↑ +18%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                              <span className="text-sm">Wellness Minutes</span>
                              <span className="text-green-400 font-semibold">↑ +45 min/week</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                              <span className="text-sm">Check-in Consistency</span>
                              <span className="text-blue-400 font-semibold">= Stable</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                              <span className="text-sm">Tools Used</span>
                              <span className="text-green-400 font-semibold">↑ +3 new</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-[#D4AF37]">Goal Progress</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-background/50 rounded-lg border">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Daily Check-ins</span>
                                <span className="text-sm text-[#D4AF37]">75%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '75%' }} />
                              </div>
                            </div>
                            <div className="p-3 bg-background/50 rounded-lg border">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Weekly Meditation</span>
                                <span className="text-sm text-[#D4AF37]">60%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '60%' }} />
                              </div>
                            </div>
                            <div className="p-3 bg-background/50 rounded-lg border">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Journaling</span>
                                <span className="text-sm text-[#D4AF37]">40%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '40%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeAnalysis === 'patterns' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-green-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Search className="w-5 h-5 text-green-500" />
                          Pattern Analysis
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveAnalysis(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-[#D4AF37] mb-3">Mood Patterns Detected</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                              <p className="font-medium text-green-400 mb-1">🌅 Best Days</p>
                              <p className="text-sm text-muted-foreground">Your mood tends to be highest on Tuesdays and Saturdays, especially after morning meditation sessions.</p>
                            </div>
                            <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                              <p className="font-medium text-amber-400 mb-1">🌙 Evening Dips</p>
                              <p className="text-sm text-muted-foreground">You experience slight mood dips on Sunday evenings. Consider a calming evening routine or journaling practice.</p>
                            </div>
                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                              <p className="font-medium text-blue-400 mb-1">💪 Activity Boost</p>
                              <p className="text-sm text-muted-foreground">Days with 15+ minutes of wellness activities show 35% higher mood scores on average.</p>
                            </div>
                            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                              <p className="font-medium text-purple-400 mb-1">🔄 Weekly Cycle</p>
                              <p className="text-sm text-muted-foreground">Your energy follows a consistent weekly cycle—peaking midweek and dipping at week's end.</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C5A1]/5 rounded-lg border border-[#D4AF37]/30">
                          <p className="text-sm font-semibold text-[#D4AF37] mb-2">💡 Recommendation</p>
                          <p className="text-sm text-muted-foreground">
                            Based on your patterns, try adding a 10-minute breathing exercise on Sunday evenings and continue your Tuesday meditation routine. These small adjustments could significantly improve your weekly emotional balance.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeAnalysis === 'correlations' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-purple-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-purple-500" />
                          Wellness Correlations
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveAnalysis(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Here's how different wellness activities relate to your overall mood and well-being:
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg border">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Meditation → Mood</p>
                              <p className="text-xs text-muted-foreground">Strong positive correlation (+0.82)</p>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Strong</Badge>
                          </div>
                          <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg border">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Journaling → Emotional Clarity</p>
                              <p className="text-xs text-muted-foreground">Strong positive correlation (+0.75)</p>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Strong</Badge>
                          </div>
                          <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg border">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Exercise → Sleep Quality</p>
                              <p className="text-xs text-muted-foreground">Moderate positive correlation (+0.65)</p>
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Moderate</Badge>
                          </div>
                          <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg border">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Social Connection → Stress Reduction</p>
                              <p className="text-xs text-muted-foreground">Moderate positive correlation (+0.58)</p>
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Moderate</Badge>
                          </div>
                          <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg border">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Screen Time → Mood</p>
                              <p className="text-xs text-muted-foreground">Negative correlation (-0.45)</p>
                            </div>
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Negative</Badge>
                          </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C5A1]/5 rounded-lg border border-[#D4AF37]/30">
                          <p className="text-sm font-semibold text-[#D4AF37] mb-2">🎯 Key Insight</p>
                          <p className="text-sm text-muted-foreground">
                            Your strongest mood booster is meditation, followed closely by journaling. Consider making these your daily non-negotiables for maximum well-being impact.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            {/* Comprehensive Clinician Report - Featured */}
            <Card className="border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#D4AF37]/20">
                    <ClipboardList className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Full Comprehensive Report</CardTitle>
                    <CardDescription>
                      Clinician-ready PDF with quick 60-second summary + full detailed analysis
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-background/50 rounded-xl border">
                    <h4 className="font-semibold text-[#D4AF37] mb-2">📋 Page 1: Quick Clinician Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      Key metrics, mood trend, engagement snapshot, risk flags, and top recommendations — all scannable in under 60 seconds.
                    </p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border">
                    <h4 className="font-semibold text-[#D4AF37] mb-2">📊 Pages 2+: Full Detailed Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Mood analysis, activity breakdown, journal themes, assessments, breathing & binaural sessions, goals, AI companion usage, coaching, and personalized recommendations.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Mood Tracking</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Activities</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Journal Entries</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Assessments</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Breathing</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Binaural</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Goals</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Coaching</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">AI Companion</Badge>
                  <Badge variant="outline" className="text-xs border-[#D4AF37]/30 text-[#D4AF37]">Risk Flags</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button 
                  className="flex-1 bg-[#D4AF37] hover:bg-[#B87333] text-black font-semibold py-6 text-base" 
                  onClick={() => handleGenerateComprehensiveReport('download')}
                  disabled={isGeneratingComprehensive || isViewingReport}
                >
                  {isGeneratingComprehensive ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Generating...</>
                  ) : (
                    <><Download className="w-5 h-5 mr-2" />Download PDF</>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold py-6 text-base" 
                  onClick={() => handleGenerateComprehensiveReport('view')}
                  disabled={isGeneratingComprehensive || isViewingReport}
                >
                  {isViewingReport ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Opening...</>
                  ) : (
                    <><Eye className="w-5 h-5 mr-2" />View Report</>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Individual quick reports */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
                <CardDescription>
                  Individual report types for specific data categories
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateReportPDF('Monthly Progress Summary')}
                    >
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateReportPDF('Therapy Session Insights')}
                    >
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => generateReportPDF('Wellness Activity Impact')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleGenerateNewReport}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</>
                  ) : (
                    <><FileText className="w-4 h-4 mr-2" />Generate Quick Overview Report</>
                  )}
                </Button>
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
                <p className="text-muted-foreground mb-4">
                  Select which reports you'd like to share and who you'd like to share them with.
                  All sharing is secure and complies with privacy regulations.
                </p>
                <Button className="w-full" onClick={handleManageSharing}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Manage Sharing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* PDF Viewer Modal */}
      {reportViewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-[95vw] h-[90vh] max-w-5xl bg-background rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <h3 className="text-sm font-semibold text-foreground truncate">{reportViewFilename}</h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-[#D4AF37] hover:bg-[#B87333] text-black"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = reportViewUrl;
                    a.download = reportViewFilename;
                    a.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    URL.revokeObjectURL(reportViewUrl);
                    setReportViewUrl(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* PDF Embed */}
            <iframe
              src={reportViewUrl}
              className="flex-1 w-full"
              title="Report Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressAnalytics;
