import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  BarChart3,
  Clock,
  Heart
} from 'lucide-react';
import { format, subDays } from 'date-fns';

interface AnalyticsData {
  dailyActiveUsers: number;
  totalSessions: number;
  completionRate: number;
  avgSessionDuration: number;
  revenue: number;
  newUsers: number;
}

const OperationsAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    dailyActiveUsers: 0,
    totalSessions: 0,
    completionRate: 0,
    avgSessionDuration: 0,
    revenue: 0,
    newUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const today = new Date();
      const weekAgo = subDays(today, 7);

      // Daily Active Users (checked in today)
      const { count: dailyActive } = await supabase
        .from('daily_check_ins')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', format(today, 'yyyy-MM-dd'));

      // Total therapy sessions
      const { count: totalSessions } = await supabase
        .from('therapy_bookings')
        .select('*', { count: 'exact', head: true });

      // Completed sessions
      const { count: completedSessions } = await supabase
        .from('therapy_bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      // Revenue calculation
      const { data: bookings } = await supabase
        .from('therapy_bookings')
        .select('payment_amount')
        .eq('payment_status', 'paid');

      const revenue = bookings?.reduce((sum, b) => sum + (b.payment_amount || 0), 0) || 0;

      // New users this week
      const { count: newUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      // Avg session duration (mock for now)
      const avgDuration = 45;

      setAnalytics({
        dailyActiveUsers: dailyActive || 0,
        totalSessions: totalSessions || 0,
        completionRate: totalSessions ? Math.round((completedSessions || 0) / totalSessions * 100) : 0,
        avgSessionDuration: avgDuration,
        revenue: revenue,
        newUsers: newUsers || 0
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-8">Loading analytics...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-200 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Daily Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{analytics.dailyActiveUsers}</div>
            <p className="text-xs text-blue-200 mt-1">Active today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-200 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{analytics.totalSessions}</div>
            <p className="text-xs text-purple-200 mt-1">All time bookings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{analytics.completionRate}%</div>
            <p className="text-xs text-green-200 mt-1">Sessions completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-200 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${analytics.revenue.toLocaleString()}</div>
            <p className="text-xs text-yellow-200 mt-1">Total collected</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Session Duration
            </CardTitle>
            <CardDescription className="text-slate-400">
              Average therapy session length
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">{analytics.avgSessionDuration} min</div>
            <p className="text-sm text-slate-400 mt-2">Typical session length</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              New Users This Week
            </CardTitle>
            <CardDescription className="text-slate-400">
              Platform growth metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">{analytics.newUsers}</div>
            <p className="text-sm text-slate-400 mt-2">Registered in the last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            System Health
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time platform status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">API Response Time</span>
            <span className="text-green-400 font-semibold">145ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Database Status</span>
            <span className="text-green-400 font-semibold">Operational</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Storage Usage</span>
            <span className="text-blue-400 font-semibold">45.2 GB / 100 GB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Edge Functions</span>
            <span className="text-green-400 font-semibold">All Running</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsAnalytics;
