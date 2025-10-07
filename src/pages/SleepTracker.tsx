
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Moon, Sun, BarChart3, Target, TrendingUp, Bed, Coffee, Smartphone, Eye } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";
import HomeButton from "@/components/HomeButton";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SleepEntry {
  id: string;
  date: string;
  bedTime: string;
  sleepTime: string;
  wakeTime: string;
  quality: number;
  duration: number;
  notes: string;
  factors: string[];
}

const SleepTracker: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("log");
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [selectedPeriod, setSelectedPeriod] = useState<'7days' | '30days' | 'all'>('7days');
  const [newEntry, setNewEntry] = useState({
    bedTime: "",
    sleepTime: "",
    wakeTime: "",
    quality: 5,
    notes: "",
    factors: [] as string[]
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('sleepEntries');
    const savedGoal = localStorage.getItem('sleepGoal');
    
    if (savedEntries) {
      setSleepEntries(JSON.parse(savedEntries));
    } else {
      // Initial sample data
      const sampleData: SleepEntry[] = [
        {
          id: "1",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          bedTime: "23:00",
          sleepTime: "23:30",
          wakeTime: "07:00",
          quality: 8,
          duration: 7.5,
          notes: "Felt refreshed",
          factors: ["exercise", "no-caffeine"]
        },
        {
          id: "2", 
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          bedTime: "23:30",
          sleepTime: "00:15",
          wakeTime: "07:30",
          quality: 6,
          duration: 7.25,
          notes: "Had trouble falling asleep",
          factors: ["screen-time", "caffeine"]
        }
      ];
      setSleepEntries(sampleData);
      localStorage.setItem('sleepEntries', JSON.stringify(sampleData));
    }
    
    if (savedGoal) {
      setSleepGoal(parseInt(savedGoal));
    }
  }, []);

  const sleepFactors = [
    { id: "exercise", label: "Exercise", icon: "🏃" },
    { id: "caffeine", label: "Caffeine", icon: "☕" },
    { id: "alcohol", label: "Alcohol", icon: "🍷" },
    { id: "screen-time", label: "Screen Time", icon: "📱" },
    { id: "stress", label: "Stress", icon: "😰" },
    { id: "no-caffeine", label: "No Caffeine", icon: "🚫☕" },
    { id: "meditation", label: "Meditation", icon: "🧘" },
    { id: "reading", label: "Reading", icon: "📚" }
  ];

  const handleSaveEntry = () => {
    if (!newEntry.bedTime || !newEntry.wakeTime) {
      toast({
        title: "Missing Information",
        description: "Please enter bed time and wake time",
        variant: "destructive"
      });
      return;
    }

    const duration = calculateDuration(newEntry.sleepTime || newEntry.bedTime, newEntry.wakeTime);
    const entry: SleepEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      bedTime: newEntry.bedTime,
      sleepTime: newEntry.sleepTime || newEntry.bedTime,
      wakeTime: newEntry.wakeTime,
      quality: newEntry.quality,
      duration,
      notes: newEntry.notes,
      factors: newEntry.factors
    };

    const updatedEntries = [entry, ...sleepEntries];
    setSleepEntries(updatedEntries);
    localStorage.setItem('sleepEntries', JSON.stringify(updatedEntries));
    
    setNewEntry({
      bedTime: "",
      sleepTime: "",
      wakeTime: "",
      quality: 5,
      notes: "",
      factors: []
    });

    toast({
      title: "Sleep Entry Saved",
      description: "Your sleep data has been recorded successfully"
    });
    
    setActiveTab("history");
  };

  const calculateDuration = (sleepTime: string, wakeTime: string): number => {
    const sleep = new Date(`2000-01-01 ${sleepTime}`);
    let wake = new Date(`2000-01-01 ${wakeTime}`);
    
    // If wake time is earlier than sleep time, it's the next day
    if (wake < sleep) {
      wake = new Date(`2000-01-02 ${wakeTime}`);
    }
    
    return (wake.getTime() - sleep.getTime()) / (1000 * 60 * 60);
  };

  const getAverageSleep = () => {
    if (sleepEntries.length === 0) return 0;
    const total = sleepEntries.reduce((sum, entry) => sum + entry.duration, 0);
    return total / sleepEntries.length;
  };

  const getAverageQuality = () => {
    if (sleepEntries.length === 0) return 0;
    const total = sleepEntries.reduce((sum, entry) => sum + entry.quality, 0);
    return total / sleepEntries.length;
  };

  const getSleepGoalProgress = () => {
    const average = getAverageSleep();
    return Math.min((average / sleepGoal) * 100, 100);
  };

  const getSleepScore = () => {
    // Calculate a comprehensive sleep score based on duration, quality, and consistency
    const avgDuration = getAverageSleep();
    const avgQuality = getAverageQuality();
    
    // Score components
    const durationScore = Math.min((avgDuration / sleepGoal) * 40, 40);
    const qualityScore = (avgQuality / 10) * 40;
    const consistencyScore = 20; // Simplified for now
    
    return Math.round(durationScore + qualityScore + consistencyScore);
  };

  const getBestSleepFactors = () => {
    const factorQualityMap: { [key: string]: number[] } = {};
    
    sleepEntries.forEach(entry => {
      entry.factors.forEach(factor => {
        if (!factorQualityMap[factor]) {
          factorQualityMap[factor] = [];
        }
        factorQualityMap[factor].push(entry.quality);
      });
    });
    
    return Object.entries(factorQualityMap)
      .map(([factor, qualities]) => ({
        factor,
        avgQuality: qualities.reduce((a, b) => a + b, 0) / qualities.length
      }))
      .sort((a, b) => b.avgQuality - a.avgQuality)
      .slice(0, 3);
  };

  const getFilteredEntries = () => {
    const now = Date.now();
    switch (selectedPeriod) {
      case '7days':
        return sleepEntries.filter(e => new Date(e.date).getTime() > now - 7 * 24 * 60 * 60 * 1000);
      case '30days':
        return sleepEntries.filter(e => new Date(e.date).getTime() > now - 30 * 24 * 60 * 60 * 1000);
      default:
        return sleepEntries;
    }
  };

  const chartData = getFilteredEntries().slice(-14).reverse().map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    duration: entry.duration,
    quality: entry.quality
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">
                  Sleep Tracker
                </span>
              </h1>
              <p className="text-white/70">Monitor and improve your sleep patterns</p>
            </div>
          </div>
          <HomeButton />
        </div>

        {/* Hero Sleep Score Section */}
        <div className="mb-8 relative">
          <Card className="bg-gradient-to-br from-[#6366f1]/20 via-[#8b5cf6]/20 to-[#06b6d4]/20 backdrop-blur-xl border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%224%22 cy=%224%22 r=%222%22 fill=%22%23fff%22 fill-opacity=%220.03%22/></svg>')] opacity-50"></div>
            <CardContent className="p-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]">
                      {getSleepScore()}
                    </div>
                    <div className="text-white/60 text-sm mt-2">Sleep Score</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span className="flex items-center gap-1"><Moon className="h-3 w-3" />Duration</span>
                      <span>{getAverageSleep().toFixed(1)}h / {sleepGoal}h</span>
                    </div>
                    <Progress value={(getAverageSleep() / sleepGoal) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" />Quality</span>
                      <span>{getAverageQuality().toFixed(1)} / 10</span>
                    </div>
                    <Progress value={(getAverageQuality() / 10) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-white/70 mb-1">
                      <span className="flex items-center gap-1"><Target className="h-3 w-3" />Goal Progress</span>
                      <span>{getSleepGoalProgress().toFixed(0)}%</span>
                    </div>
                    <Progress value={getSleepGoalProgress()} className="h-2" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">{sleepEntries.length}</div>
                    <div className="text-xs text-white/60">Total Nights</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">
                      {sleepEntries.filter(e => e.quality >= 7).length}
                    </div>
                    <div className="text-xs text-white/60">Great Nights</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg p-3 col-span-2">
                    <div className="text-lg font-bold text-white">
                      {sleepEntries.length > 0 ? 
                        Math.round((sleepEntries.filter(e => e.quality >= 7).length / sleepEntries.length) * 100) : 0}%
                    </div>
                    <div className="text-xs text-white/60">Success Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/5">
          <Tabs defaultValue="log" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 gap-2 bg-black/30 mb-8 p-1 rounded-lg">
              <TabsTrigger value="log" className="data-[state=active]:bg-[#6366f1]/90">Log Sleep</TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-[#6366f1]/90">History</TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-[#6366f1]/90">Trends</TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-[#6366f1]/90">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="log" className="animate-fade-in">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white/90 flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    Log Today's Sleep
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Record your sleep schedule and quality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white/90">Bed Time</Label>
                      <Input
                        type="time"
                        value={newEntry.bedTime}
                        onChange={(e) => setNewEntry({...newEntry, bedTime: e.target.value})}
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-white/90">Sleep Time (optional)</Label>
                      <Input
                        type="time"
                        value={newEntry.sleepTime}
                        onChange={(e) => setNewEntry({...newEntry, sleepTime: e.target.value})}
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-white/90">Wake Time</Label>
                      <Input
                        type="time"
                        value={newEntry.wakeTime}
                        onChange={(e) => setNewEntry({...newEntry, wakeTime: e.target.value})}
                        className="bg-white/10 border-white/20 text-white mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/90">Sleep Quality (1-10)</Label>
                    <Select 
                      value={newEntry.quality.toString()} 
                      onValueChange={(value) => setNewEntry({...newEntry, quality: parseInt(value)})}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} - {i + 1 <= 3 ? 'Poor' : i + 1 <= 6 ? 'Fair' : i + 1 <= 8 ? 'Good' : 'Excellent'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white/90">Sleep Factors</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {sleepFactors.map((factor) => (
                        <Button
                          key={factor.id}
                          variant={newEntry.factors.includes(factor.id) ? "default" : "outline"}
                          size="sm"
                          className={`justify-start ${
                            newEntry.factors.includes(factor.id)
                              ? "bg-[#6366f1] hover:bg-[#6366f1]/90"
                              : "bg-white/10 hover:bg-white/20 border-white/20"
                          }`}
                          onClick={() => {
                            const factors = newEntry.factors.includes(factor.id)
                              ? newEntry.factors.filter(f => f !== factor.id)
                              : [...newEntry.factors, factor.id];
                            setNewEntry({...newEntry, factors});
                          }}
                        >
                          <span className="mr-2">{factor.icon}</span>
                          {factor.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/90">Notes</Label>
                    <Textarea
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                      placeholder="How did you feel? Any observations?"
                      className="bg-white/10 border-white/20 text-white mt-1"
                    />
                  </div>

                  <Button 
                    onClick={handleSaveEntry}
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#6366f1]/90 hover:to-[#8b5cf6]/90"
                  >
                    Save Sleep Entry
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="animate-fade-in">
              <div className="space-y-4">
                {sleepEntries.map((entry) => (
                  <Card key={entry.id} className="bg-black/20 backdrop-blur-sm border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#6366f1]" />
                          <span className="text-white/90 font-medium">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge variant="secondary" className="bg-[#6366f1]/20 text-[#6366f1]">
                          {entry.quality}/10
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/70">
                        <div>
                          <span className="text-white/50">Bed Time:</span>
                          <div className="text-white/90">{entry.bedTime}</div>
                        </div>
                        <div>
                          <span className="text-white/50">Wake Time:</span>
                          <div className="text-white/90">{entry.wakeTime}</div>
                        </div>
                        <div>
                          <span className="text-white/50">Duration:</span>
                          <div className="text-white/90">{entry.duration.toFixed(1)} hours</div>
                        </div>
                        <div>
                          <span className="text-white/50">Quality:</span>
                          <div className="text-white/90">{entry.quality}/10</div>
                        </div>
                      </div>

                      {entry.factors.length > 0 && (
                        <div className="mt-3">
                          <span className="text-white/50 text-sm">Factors:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {entry.factors.map((factorId) => {
                              const factor = sleepFactors.find(f => f.id === factorId);
                              return factor ? (
                                <Badge key={factorId} variant="outline" className="text-xs border-white/20">
                                  {factor.icon} {factor.label}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}

                      {entry.notes && (
                        <div className="mt-3">
                          <span className="text-white/50 text-sm">Notes:</span>
                          <p className="text-white/70 text-sm mt-1">{entry.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="animate-fade-in">
              <div className="space-y-6">
                <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white/90">Sleep Duration Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                          <YAxis stroke="rgba(255,255,255,0.7)" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)', 
                              border: '1px solid rgba(255,255,255,0.2)',
                              color: 'white'
                            }} 
                          />
                          <Line type="monotone" dataKey="duration" stroke="#6366f1" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white/90">Sleep Quality Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                          <YAxis stroke="rgba(255,255,255,0.7)" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)', 
                              border: '1px solid rgba(255,255,255,0.2)',
                              color: 'white'
                            }} 
                          />
                          <Bar dataKey="quality" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white/90 flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Sleep Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-[#6366f1]/20 rounded-lg border border-[#6366f1]/30">
                      <p className="text-white/90 text-sm">
                        <strong>Optimal Sleep Time:</strong> Your best sleep quality ({Math.max(...sleepEntries.map(e => e.quality))}/10) 
                        occurred when you got {sleepEntries.find(e => e.quality === Math.max(...sleepEntries.map(e => e.quality)))?.duration.toFixed(1)} hours of sleep.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-[#8b5cf6]/20 rounded-lg border border-[#8b5cf6]/30">
                      <p className="text-white/90 text-sm">
                        <strong>Consistency:</strong> Try to maintain regular sleep and wake times. 
                        Your current average bedtime varies by about 30 minutes.
                      </p>
                    </div>

                    <div className="p-3 bg-[#10b981]/20 rounded-lg border border-[#10b981]/30">
                      <p className="text-white/90 text-sm">
                        <strong>Progress:</strong> You're averaging {getAverageSleep().toFixed(1)} hours per night. 
                        Aim for 7-9 hours for optimal health.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white/90 flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      Sleep Hygiene Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Avoid caffeine 6 hours before bedtime",
                      "Keep your bedroom cool (60-67°F)",
                      "Limit screen time 1 hour before bed",
                      "Exercise regularly, but not late in the evening",
                      "Create a consistent bedtime routine",
                      "Use blackout curtains or an eye mask"
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <div className="w-2 h-2 bg-[#6366f1] rounded-full mt-2"></div>
                        <p className="text-white/80 text-sm">{tip}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;
