import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Calendar,
  Heart,
  MessageSquare,
  Target,
  Zap,
  Clock,
  Award,
  Brain,
  BookOpen,
  Smile,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EngagementData {
  totalUsers: number;
  activeUsersToday: number;
  activeUsersWeek: number;
  activeUsersMonth: number;
  totalCheckIns: number;
  avgCheckInsPerUser: number;
  totalConversations: number;
  totalBreathingSessions: number;
  totalMeditations: number;
  totalJournalEntries: number;
  totalAssessments: number;
  crisisEventsToday: number;
  retentionRate7Day: number;
  retentionRate30Day: number;
  featureUsage: {
    henry: number;
    breathing: number;
    meditation: number;
    journaling: number;
    assessments: number;
    community: number;
    workshops: number;
  };
  topFeatures: { name: string; users: number; percentage: number }[];
  engagementTrend: { date: string; users: number }[];
}

const AdminEngagementMetrics: React.FC = () => {
  const [data, setData] = useState<EngagementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEngagementData();
  }, []);

  const fetchEngagementData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      // Fetch everything in parallel
      const [
        totalUsersRes,
        activeTodayRes,
        weeklyUsersRes,
        monthlyUsersRes,
        totalCheckInsRes,
        totalConversationsRes,
        breathingSessionsRes,
        binauralSessionsRes,
        meditationSessionsRes,
        journalEntriesRes,
        assessmentsRes,
        crisisTodayRes,
        henryUsersRes,
        breathingUsersRes,
        binauralUsersRes,
        meditationUsersRes,
        journalUsersRes,
        assessmentUsersRes,
        communityUsersRes,
        breathingMinutesRes,
        binauralMinutesRes,
        meditationMinutesRes,
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('daily_check_ins').select('user_id', { count: 'exact', head: true }).gte('created_at', today),
        supabase.from('daily_check_ins').select('user_id, created_at').gte('created_at', weekAgo),
        supabase.from('daily_check_ins').select('user_id').gte('created_at', monthAgo),
        supabase.from('daily_check_ins').select('*', { count: 'exact', head: true }),
        supabase.from('henry_conversations').select('*', { count: 'exact', head: true }),
        supabase.from('breathing_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('binaural_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('meditation_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('journal_entries').select('*', { count: 'exact', head: true }),
        supabase.from('assessment_results').select('*', { count: 'exact', head: true }),
        supabase.from('crisis_events').select('*', { count: 'exact', head: true }).gte('created_at', today),
        supabase.from('henry_conversations').select('user_id').gte('created_at', monthAgo),
        supabase.from('breathing_sessions').select('user_id').gte('created_at', monthAgo),
        supabase.from('binaural_sessions').select('user_id').gte('created_at', monthAgo),
        supabase.from('meditation_sessions').select('user_id').gte('created_at', monthAgo),
        supabase.from('journal_entries').select('user_id').gte('created_at', monthAgo),
        supabase.from('assessment_results').select('user_id').gte('created_at', monthAgo),
        supabase.from('community_group_messages').select('user_id').gte('created_at', monthAgo),
        supabase.from('breathing_sessions').select('duration_seconds').gte('created_at', monthAgo),
        supabase.from('binaural_sessions').select('duration_minutes').gte('created_at', monthAgo),
        supabase.from('meditation_sessions').select('duration_seconds').gte('created_at', monthAgo),
      ]);

      const total = totalUsersRes.count || 1;
      const uniqueWeeklyUsers = new Set(weeklyUsersRes.data?.map(u => u.user_id) || []).size;
      const uniqueMonthlyUsers = new Set(monthlyUsersRes.data?.map(u => u.user_id) || []).size;

      const uniqueHenryUsers = new Set(henryUsersRes.data?.map(u => u.user_id) || []).size;
      const uniqueBreathingUsers = new Set(breathingUsersRes.data?.map(u => u.user_id) || []).size;
      const uniqueBinauralUsers = new Set(binauralUsersRes.data?.map(u => u.user_id) || []).size;
      const uniqueMeditationUsers = new Set(meditationUsersRes.data?.map(u => u.user_id) || []).size;
      const uniqueJournalUsers = new Set(journalUsersRes.data?.map(u => u.user_id) || []).size;
      const uniqueAssessmentUsers = new Set(assessmentUsersRes.data?.map(u => u.user_id) || []).size;
      const uniqueCommunityUsers = new Set(communityUsersRes.data?.map(u => u.user_id) || []).size;

      // Calculate total platform minutes
      const breathingMins = (breathingMinutesRes.data || []).reduce((s, b) => s + Math.round((b.duration_seconds || 0) / 60), 0);
      const binauralMins = (binauralMinutesRes.data || []).reduce((s, b) => s + (b.duration_minutes || 0), 0);
      const meditationMins = (meditationMinutesRes.data || []).reduce((s, b) => s + Math.round((b.duration_seconds || 0) / 60), 0);
      const totalPlatformMinutes = breathingMins + binauralMins + meditationMins;

      const retentionRate7Day = total > 0 ? Math.round((uniqueWeeklyUsers / total) * 100) : 0;
      const retentionRate30Day = total > 0 ? Math.round((uniqueMonthlyUsers / total) * 100) : 0;

      const topFeatures = [
        { name: 'Daily Check-ins', users: uniqueMonthlyUsers, percentage: Math.round((uniqueMonthlyUsers / total) * 100) },
        { name: 'Henry AI', users: uniqueHenryUsers, percentage: Math.round((uniqueHenryUsers / total) * 100) },
        { name: 'Breathing', users: uniqueBreathingUsers, percentage: Math.round((uniqueBreathingUsers / total) * 100) },
        { name: 'Binaural Beats', users: uniqueBinauralUsers, percentage: Math.round((uniqueBinauralUsers / total) * 100) },
        { name: 'Meditation', users: uniqueMeditationUsers, percentage: Math.round((uniqueMeditationUsers / total) * 100) },
        { name: 'Journaling', users: uniqueJournalUsers, percentage: Math.round((uniqueJournalUsers / total) * 100) },
        { name: 'Assessments', users: uniqueAssessmentUsers, percentage: Math.round((uniqueAssessmentUsers / total) * 100) },
        { name: 'Community', users: uniqueCommunityUsers, percentage: Math.round((uniqueCommunityUsers / total) * 100) },
      ].sort((a, b) => b.users - a.users);

      // Build 7-day engagement trend
      const engagementTrend: { date: string; users: number }[] = [];
      const allWeeklyCheckIns = weeklyUsersRes.data || [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateStr = d.toISOString().split('T')[0];
        // This is approximate — check-in created_at starts with dateStr
        const dayUsers = new Set(
          allWeeklyCheckIns.filter(c => (c as any).created_at?.startsWith(dateStr)).map(c => c.user_id)
        ).size;
        engagementTrend.push({ date: dateStr, users: dayUsers });
      }

      setData({
        totalUsers: totalUsersRes.count || 0,
        activeUsersToday: activeTodayRes.count || 0,
        activeUsersWeek: uniqueWeeklyUsers,
        activeUsersMonth: uniqueMonthlyUsers,
        totalCheckIns: totalCheckInsRes.count || 0,
        avgCheckInsPerUser: total > 0 ? Math.round((totalCheckInsRes.count || 0) / total * 10) / 10 : 0,
        totalConversations: totalConversationsRes.count || 0,
        totalBreathingSessions: (breathingSessionsRes.count || 0) + (binauralSessionsRes.count || 0),
        totalMeditations: meditationSessionsRes.count || 0,
        totalJournalEntries: journalEntriesRes.count || 0,
        totalAssessments: assessmentsRes.count || 0,
        crisisEventsToday: crisisTodayRes.count || 0,
        retentionRate7Day,
        retentionRate30Day,
        featureUsage: {
          henry: uniqueHenryUsers,
          breathing: uniqueBreathingUsers,
          meditation: uniqueMeditationUsers,
          journaling: uniqueJournalUsers,
          assessments: uniqueAssessmentUsers,
          community: uniqueCommunityUsers,
          workshops: uniqueBinauralUsers,
        },
        topFeatures,
        engagementTrend,
      });
    } catch (error) {
      console.error('Error fetching engagement data:', error);
      toast.error('Failed to load engagement metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--bronze))]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Unable to load engagement metrics
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[hsl(var(--bronze))]/10 border-[hsl(var(--bronze))]/30">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-[hsl(var(--bronze))]" />
            <div className="text-3xl font-bold text-[hsl(var(--bronze))]">{data.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-3xl font-bold text-green-500">{data.activeUsersToday}</div>
            <div className="text-sm text-muted-foreground">Active Today</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-3xl font-bold text-blue-500">{data.activeUsersWeek}</div>
            <div className="text-sm text-muted-foreground">Active This Week</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-3xl font-bold text-purple-500">{data.activeUsersMonth}</div>
            <div className="text-sm text-muted-foreground">Active This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Retention & Crisis */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-background/50 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-[hsl(var(--bronze))]" />
              7-Day Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[hsl(var(--bronze))]">{data.retentionRate7Day}%</div>
            <Progress value={data.retentionRate7Day} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Users active in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              30-Day Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-500">{data.retentionRate30Day}%</div>
            <Progress value={data.retentionRate30Day} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Users active in last 30 days
            </p>
          </CardContent>
        </Card>

        <Card className={`border-border/50 ${data.crisisEventsToday > 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-background/50'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className={`h-5 w-5 ${data.crisisEventsToday > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
              Crisis Events Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${data.crisisEventsToday > 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {data.crisisEventsToday}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {data.crisisEventsToday === 0 ? 'No crisis events detected' : 'Requires attention'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Usage */}
      <Card className="bg-background/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[hsl(var(--bronze))]" />
            Feature Usage (Last 30 Days)
          </CardTitle>
          <CardDescription>Which features are users engaging with most</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {data.topFeatures.slice(0, 3).map((feature, idx) => (
                <div key={feature.name} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx === 0 ? 'bg-[hsl(var(--bronze))]/20 text-[hsl(var(--bronze))]' :
                    idx === 1 ? 'bg-gray-400/20 text-gray-400' :
                    'bg-amber-600/20 text-amber-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{feature.name}</span>
                      <span className="text-sm text-muted-foreground">{feature.users} users</span>
                    </div>
                    <Progress value={feature.percentage} className="h-2" />
                  </div>
                  <Badge variant="secondary">{feature.percentage}%</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {data.topFeatures.slice(3, 6).map((feature, idx) => (
                <div key={feature.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-slate-500/20 text-slate-400">
                    {idx + 4}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{feature.name}</span>
                      <span className="text-sm text-muted-foreground">{feature.users} users</span>
                    </div>
                    <Progress value={feature.percentage} className="h-2" />
                  </div>
                  <Badge variant="secondary">{feature.percentage}%</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Totals */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 text-center">
            <Smile className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{data.totalCheckIns.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Check-ins</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 text-center">
            <Brain className="h-5 w-5 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{data.totalConversations.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Henry Chats</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 text-center">
            <Heart className="h-5 w-5 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{data.totalBreathingSessions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Breathing + Binaural</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-2 text-indigo-500" />
            <div className="text-2xl font-bold">{data.totalMeditations.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Meditations</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-5 w-5 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{data.totalJournalEntries.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Journal Entries</div>
          </CardContent>
        </Card>
        <Card className="bg-background/50 border-border/50">
          <CardContent className="p-4 text-center">
            <Clock className="h-5 w-5 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{data.avgCheckInsPerUser}</div>
            <div className="text-xs text-muted-foreground">Avg Check-ins/User</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminEngagementMetrics;
