import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, Activity, DollarSign, AlertTriangle, Stethoscope, Clock } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardMetrics {
  activeUsers: number;
  sessionCompletionRate: number;
  revenueToday: number;
  crisisEvents: number;
  therapistUtilization: number;
  avgResponseTime: number;
}

interface AlertItem {
  id: string;
  type: 'crisis' | 'payment' | 'compliance' | 'milestone';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
}

interface UserGrowthData {
  day: string;
  users: number;
}

interface TherapistSessionData {
  name: string;
  sessions: number;
}

const DashboardOverview: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeUsers: 0,
    sessionCompletionRate: 0,
    revenueToday: 0,
    crisisEvents: 0,
    therapistUtilization: 0,
    avgResponseTime: 0,
  });
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData[]>([]);
  const [therapistData, setTherapistData] = useState<TherapistSessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
    fetchAlerts();
    fetchUserGrowth();
    fetchTherapistSessions();
  }, []);

  const fetchMetrics = async () => {
    try {
      // Active users (logged in last 24h)
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_activity_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      // Session completion rate (last 7 days)
      const { data: sessions } = await supabase
        .from('therapy_sessions')
        .select('id')
        .gte('session_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      const { data: bookings } = await supabase
        .from('therapy_bookings')
        .select('id')
        .gte('appointment_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      const completionRate = bookings?.length ? ((sessions?.length || 0) / bookings.length) * 100 : 0;

      // Revenue today from therapy_bookings (count paid sessions * avg rate)
      const { count: paidBookingsCount } = await supabase
        .from('therapy_bookings')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'paid')
        .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());

      const revenueToday = (paidBookingsCount || 0) * 90; // Avg session rate

      // Crisis events (open)
      const { count: crisisCount } = await supabase
        .from('crisis_escalations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');

      // Therapist utilization
      const { data: therapists } = await supabase
        .from('therapists')
        .select('current_caseload, max_caseload')
        .eq('is_active', true);

      const utilization = therapists?.length
        ? (therapists.reduce((sum, t) => sum + (t.current_caseload || 0), 0) /
            therapists.reduce((sum, t) => sum + (t.max_caseload || 30), 0)) * 100
        : 0;

      // Calculate average response time from therapist_requests
      const { data: requests } = await supabase
        .from('therapist_requests')
        .select('created_at, updated_at')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(50);

      let avgResponseTime = 0;
      if (requests && requests.length > 0) {
        const totalHours = requests.reduce((sum, req) => {
          const created = new Date(req.created_at).getTime();
          const updated = new Date(req.updated_at).getTime();
          return sum + (updated - created) / (1000 * 60 * 60);
        }, 0);
        avgResponseTime = Math.round((totalHours / requests.length) * 10) / 10;
      }

      setMetrics({
        activeUsers: activeUsers || 0,
        sessionCompletionRate: Math.round(completionRate),
        revenueToday,
        crisisEvents: crisisCount || 0,
        therapistUtilization: Math.round(utilization),
        avgResponseTime: avgResponseTime || 0,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserGrowth = async () => {
    try {
      const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', fourWeeksAgo.toISOString())
        .order('created_at', { ascending: true });

      if (profiles) {
        // Group by week
        const weeks = [
          { start: 21, end: 28, label: 'Week 1' },
          { start: 14, end: 21, label: 'Week 2' },
          { start: 7, end: 14, label: 'Week 3' },
          { start: 0, end: 7, label: 'Week 4' },
        ];

        const weekData = weeks.map(week => {
          const startDate = new Date(Date.now() - week.end * 24 * 60 * 60 * 1000);
          const endDate = new Date(Date.now() - week.start * 24 * 60 * 60 * 1000);
          
          const count = profiles.filter(p => {
            const created = new Date(p.created_at);
            return created >= startDate && created < endDate;
          }).length;

          return { day: week.label, users: count };
        });

        // Accumulate to show growth
        let cumulative = 0;
        const cumulativeData = weekData.map(w => {
          cumulative += w.users;
          return { ...w, users: cumulative };
        });

        setUserGrowthData(cumulativeData);
      }
    } catch (error) {
      console.error('Error fetching user growth:', error);
    }
  };

  const fetchTherapistSessions = async () => {
    try {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      // Get therapist names and their session counts
      const { data: therapists } = await supabase
        .from('therapists')
        .select('id, name')
        .eq('is_active', true)
        .limit(5);

      if (therapists) {
        const sessionCounts = await Promise.all(
          therapists.map(async (therapist) => {
            const { count } = await supabase
              .from('therapy_sessions')
              .select('*', { count: 'exact', head: true })
              .eq('therapist_id', therapist.id)
              .gte('session_date', oneWeekAgo.toISOString());

            return {
              name: therapist.name.split(' ')[0] + ' ' + (therapist.name.split(' ')[1]?.[0] || '') + '.',
              sessions: count || 0,
            };
          })
        );

        // Sort by sessions and take top 4
        const sortedData = sessionCounts
          .sort((a, b) => b.sessions - a.sessions)
          .slice(0, 4);

        setTherapistData(sortedData);
      }
    } catch (error) {
      console.error('Error fetching therapist sessions:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const alertsList: AlertItem[] = [];

      // Crisis events
      const { data: crisisData } = await supabase
        .from('crisis_escalations')
        .select('id, severity, created_at, user_id')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(3);

      crisisData?.forEach((crisis) => {
        alertsList.push({
          id: crisis.id,
          type: 'crisis',
          severity: crisis.severity === 'critical' ? 'critical' : 'high',
          message: `Crisis escalation for user ${crisis.user_id?.slice(0, 8)}`,
          timestamp: crisis.created_at,
        });
      });

      // Compliance violations
      const { data: violations } = await supabase
        .from('compliance_violations')
        .select('id, severity, violation_type, created_at')
        .eq('resolved', false)
        .order('created_at', { ascending: false })
        .limit(3);

      violations?.forEach((violation) => {
        alertsList.push({
          id: violation.id,
          type: 'compliance',
          severity: violation.severity as 'critical' | 'high' | 'medium' | 'low',
          message: `Compliance: ${violation.violation_type}`,
          timestamp: violation.created_at,
        });
      });

      setAlerts(alertsList.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500';
      case 'high': return 'bg-orange-500/20 border-orange-500';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500';
      default: return 'bg-green-500/20 border-green-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Strip */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.slice(0, 3).map((alert) => (
            <Card key={alert.id} className={`p-4 border ${getAlertColor(alert.severity)} bg-gray-800/50`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{alert.message}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users Now</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics.activeUsers}</p>
              <p className="text-green-500 text-sm mt-1">Last 24 hours</p>
            </div>
            <Users className="w-12 h-12 text-[#B87333]" />
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Session Completion</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics.sessionCompletionRate}%</p>
              <p className="text-gray-400 text-sm mt-1">Last 7 days</p>
            </div>
            <Activity className="w-12 h-12 text-[#B87333]" />
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue Today</p>
              <p className="text-3xl font-bold text-white mt-2">${metrics.revenueToday.toFixed(2)}</p>
              <p className="text-gray-400 text-sm mt-1">Paid bookings</p>
            </div>
            <DollarSign className="w-12 h-12 text-[#B87333]" />
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Crisis Events</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics.crisisEvents}</p>
              <p className={`text-sm mt-1 ${metrics.crisisEvents > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {metrics.crisisEvents > 0 ? 'Requires attention' : 'All clear'}
              </p>
            </div>
            <AlertTriangle className={`w-12 h-12 ${metrics.crisisEvents > 0 ? 'text-red-500' : 'text-green-500'}`} />
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Therapist Utilization</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics.therapistUtilization}%</p>
              <p className="text-gray-400 text-sm mt-1">Current caseload</p>
            </div>
            <Stethoscope className="w-12 h-12 text-[#B87333]" />
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Response Time</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics.avgResponseTime}h</p>
              <p className="text-gray-400 text-sm mt-1">Therapist to client</p>
            </div>
            <Clock className="w-12 h-12 text-[#B87333]" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <h3 className="text-xl font-semibold text-white mb-4">User Growth Trend</h3>
          <div className="text-gray-400 text-sm mb-4">Last 30 days</div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={userGrowthData.length > 0 ? userGrowthData : [
              { day: 'Week 1', users: 0 },
              { day: 'Week 2', users: 0 },
              { day: 'Week 3', users: 0 },
              { day: 'Week 4', users: 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #B87333' }}
                labelStyle={{ color: '#E5C5A1' }}
              />
              <Area type="monotone" dataKey="users" stroke="#B87333" fill="#B87333" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-[#B87333]/30">
          <h3 className="text-xl font-semibold text-white mb-4">Session Completion by Therapist</h3>
          <div className="text-gray-400 text-sm mb-4">Top performers this week</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={therapistData.length > 0 ? therapistData : [
              { name: 'No data', sessions: 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #B87333' }}
                labelStyle={{ color: '#E5C5A1' }}
              />
              <Bar dataKey="sessions" fill="#B87333" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
