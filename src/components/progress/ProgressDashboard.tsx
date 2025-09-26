import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Calendar, Award, Brain, Heart, Activity, BookOpen } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';

interface ProgressMetrics {
  totalAssessmentsCompleted: number;
  totalWorkshopsAttended: number;
  journalEntriesCount: number;
  artTherapySessionsCount: number;
  moodTrend: number[];
  weeklyActivity: { name: string; value: number }[];
  goalProgress: { goal: string; progress: number; target: number }[];
  streakCount: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
  category: string;
}

const ProgressDashboard: React.FC = () => {
  const { user } = useUser();
  const [metrics, setMetrics] = useState<ProgressMetrics>({
    totalAssessmentsCompleted: 0,
    totalWorkshopsAttended: 0,
    journalEntriesCount: 0,
    artTherapySessionsCount: 0,
    moodTrend: [],
    weeklyActivity: [],
    goalProgress: [],
    streakCount: 0
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  // Define color palette for charts
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d'];

  useEffect(() => {
    if (user) {
      loadProgressData();
      loadAchievements();
    }
  }, [user]);

  const loadProgressData = async () => {
    try {
      // Load various metrics from database
      const { data: journalEntries } = await supabase.from('journal_entries').select('*').eq('user_id', user?.id);
      
      // Use local storage for other metrics until tables are created
      const assessmentData = { data: JSON.parse(localStorage.getItem('completedAssessments') || '[]') };
      const workshopProgress = { data: JSON.parse(localStorage.getItem('workshopProgress') || '[]') };

      // Calculate metrics from data
      const journalCount = journalEntries?.length || 0;
      const assessmentCount = assessmentData.data.length || 0;
      const workshopCount = workshopProgress.data.length || 0;

      // Generate sample mood trend data (would come from actual journal entries)
      const moodTrend = Array.from({ length: 7 }, (_, i) => Math.floor(Math.random() * 5) + 3);
      
      // Generate weekly activity data
      const weeklyActivity = [
        { name: 'Mon', value: Math.floor(Math.random() * 100) },
        { name: 'Tue', value: Math.floor(Math.random() * 100) },
        { name: 'Wed', value: Math.floor(Math.random() * 100) },
        { name: 'Thu', value: Math.floor(Math.random() * 100) },
        { name: 'Fri', value: Math.floor(Math.random() * 100) },
        { name: 'Sat', value: Math.floor(Math.random() * 100) },
        { name: 'Sun', value: Math.floor(Math.random() * 100) }
      ];

      // Generate goal progress data
      const goalProgress = [
        { goal: 'Daily Journal', progress: journalCount, target: 30 },
        { goal: 'Wellness Assessments', progress: assessmentCount, target: 10 },
        { goal: 'Workshop Attendance', progress: workshopCount, target: 5 },
        { goal: 'Mindfulness Sessions', progress: Math.floor(Math.random() * 20), target: 20 }
      ];

      setMetrics({
        totalAssessmentsCompleted: assessmentCount,
        totalWorkshopsAttended: workshopCount,
        journalEntriesCount: journalCount,
        artTherapySessionsCount: Math.floor(Math.random() * 10),
        moodTrend,
        weeklyActivity,
        goalProgress,
        streakCount: Math.floor(Math.random() * 14) + 1
      });
    } catch (error) {
      console.error('Error loading progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAchievements = () => {
    // Define available achievements
    const allAchievements: Achievement[] = [
      {
        id: 'first-journal',
        title: 'First Steps',
        description: 'Completed your first journal entry',
        icon: <BookOpen className="h-6 w-6" />,
        unlocked: metrics.journalEntriesCount > 0,
        category: 'Journaling'
      },
      {
        id: 'assessment-explorer',
        title: 'Self-Aware',
        description: 'Completed 3 wellness assessments',
        icon: <Brain className="h-6 w-6" />,
        unlocked: metrics.totalAssessmentsCompleted >= 3,
        category: 'Assessment'
      },
      {
        id: 'workshop-warrior',
        title: 'Learning Journey',
        description: 'Attended 5 workshops',
        icon: <Target className="h-6 w-6" />,
        unlocked: metrics.totalWorkshopsAttended >= 5,
        category: 'Workshops'
      },
      {
        id: 'mood-tracker',
        title: 'Consistent Tracker',
        description: 'Tracked mood for 7 consecutive days',
        icon: <Heart className="h-6 w-6" />,
        unlocked: metrics.streakCount >= 7,
        category: 'Consistency'
      },
      {
        id: 'wellness-champion',
        title: 'Wellness Champion',
        description: 'Achieved all your monthly goals',
        icon: <Award className="h-6 w-6" />,
        unlocked: metrics.goalProgress.every(goal => goal.progress >= goal.target),
        category: 'Goals'
      }
    ];

    setAchievements(allAchievements);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Your Wellness Journey</h1>
          <p className="text-muted-foreground text-lg">Track your progress and celebrate your achievements</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary font-medium">Assessments</p>
                  <p className="text-3xl font-bold">{metrics.totalAssessmentsCompleted}</p>
                </div>
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground font-medium">Journal Entries</p>
                  <p className="text-3xl font-bold">{metrics.journalEntriesCount}</p>
                </div>
                <BookOpen className="h-8 w-8 text-secondary-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground font-medium">Workshops</p>
                  <p className="text-3xl font-bold">{metrics.totalWorkshopsAttended}</p>
                </div>
                <Target className="h-8 w-8 text-accent-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 dark:text-green-400 font-medium">Current Streak</p>
                  <p className="text-3xl font-bold">{metrics.streakCount} days</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-700 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Mood Trend (7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={metrics.moodTrend.map((mood, index) => ({ day: `Day ${index + 1}`, mood }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[1, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Weekly Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={metrics.weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {metrics.goalProgress.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.goal}</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.progress}/{goal.target}
                      </span>
                    </div>
                    <Progress value={(goal.progress / goal.target) * 100} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.unlocked ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20' : 'opacity-60'}>
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${achievement.unlocked ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                      {achievement.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Most Active Day</h4>
                  <p>You're most active on {metrics.weeklyActivity.reduce((a, b) => a.value > b.value ? a : b).name}s. Keep up the great work!</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <h4 className="font-semibold text-secondary-foreground mb-2">Progress Trend</h4>
                  <p>You've completed {metrics.totalAssessmentsCompleted + metrics.journalEntriesCount} wellness activities this month. That's excellent progress!</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-accent-foreground mb-2">Recommendation</h4>
                  <p>Based on your activity, we recommend exploring our {metrics.totalWorkshopsAttended < 3 ? 'mindfulness workshops' : 'advanced therapy sessions'}.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressDashboard;