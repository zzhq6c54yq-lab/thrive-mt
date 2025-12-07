import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FacilityAnalytics {
  tenant_id: string;
  facility_name: string;
  total_users: number;
  active_users_7d: number;
  avg_mood_rating: number | null;
  crisis_events_30d: number;
  sessions_completed_30d: number;
}

export interface UserEngagement {
  date: string;
  active_users: number;
  check_ins: number;
  sessions: number;
}

export function useFacilityAnalytics(tenantId?: string) {
  const [analytics, setAnalytics] = useState<FacilityAnalytics | null>(null);
  const [engagement, setEngagement] = useState<UserEngagement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (tenantId) {
      fetchAnalytics();
    }
  }, [tenantId]);

  const fetchAnalytics = async () => {
    if (!tenantId) return;

    try {
      setLoading(true);

      // Fetch tenant info and aggregate stats
      const [tenantResult, usersResult, checkInsResult, crisisResult] = await Promise.all([
        supabase.from('tenants').select('id, name').eq('id', tenantId).single(),
        supabase.from('tenant_users').select('user_id', { count: 'exact' }).eq('tenant_id', tenantId),
        supabase.from('daily_check_ins')
          .select('user_id, created_at, mood_score')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('crisis_events')
          .select('id', { count: 'exact' })
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      const userIds = usersResult.data?.map(u => u.user_id) || [];
      
      // Filter check-ins by facility users
      const facilityCheckIns = checkInsResult.data?.filter(c => userIds.includes(c.user_id)) || [];
      const avgMood = facilityCheckIns.length > 0
        ? facilityCheckIns.reduce((sum, c) => sum + (c.mood_score || 0), 0) / facilityCheckIns.length
        : null;

      // Get active users in last 7 days
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const activeUsers = new Set(
        facilityCheckIns
          .filter(c => c.created_at >= sevenDaysAgo)
          .map(c => c.user_id)
      ).size;

      setAnalytics({
        tenant_id: tenantId,
        facility_name: tenantResult.data?.name || 'Unknown',
        total_users: usersResult.count || 0,
        active_users_7d: activeUsers,
        avg_mood_rating: avgMood,
        crisis_events_30d: crisisResult.count || 0,
        sessions_completed_30d: 0, // Would need therapy_bookings filtered
      });

      // Generate engagement trend data
      const engagementData: UserEngagement[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const dayCheckIns = facilityCheckIns.filter(c => 
          c.created_at.startsWith(dateStr)
        );
        engagementData.push({
          date: dateStr,
          active_users: new Set(dayCheckIns.map(c => c.user_id)).size,
          check_ins: dayCheckIns.length,
          sessions: 0,
        });
      }
      setEngagement(engagementData);

    } catch (error) {
      console.error('Error fetching facility analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to load facility analytics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    engagement,
    loading,
    fetchAnalytics,
  };
}
