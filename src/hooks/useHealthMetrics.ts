import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  fetchHealthData,
  isHealthAvailable,
  requestHealthPermissions,
  isNativePlatform,
  getPlatform,
  type HealthDataType,
  type HealthDataPoint,
} from '@/services/healthService';

export interface HealthMetric {
  id: string;
  user_id: string;
  metric_date: string;
  steps: number | null;
  heart_rate_avg: number | null;
  heart_rate_min: number | null;
  heart_rate_max: number | null;
  active_calories: number | null;
  distance_km: number | null;
  sleep_duration_hours: number | null;
  sleep_stages: {
    rem?: number;
    deep?: number;
    light?: number;
    awake?: number;
    core?: number;
    inBed?: number;
  };
  source: string;
  synced_at: string;
}

export const useHealthMetrics = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [healthAvailable, setHealthAvailable] = useState(false);
  const { toast } = useToast();

  const platform = getPlatform();
  const providerName = platform === 'ios' ? 'Apple Health' : platform === 'android' ? 'Health Connect' : 'Demo Data';

  // Check if health data is available on this device
  useEffect(() => {
    const checkAvailability = async () => {
      const available = await isHealthAvailable();
      setHealthAvailable(available || !isNativePlatform()); // web always "available" for demo
    };
    checkAvailability();
  }, []);

  // Fetch stored metrics from Supabase
  const fetchMetrics = useCallback(async (days = 30) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('user_health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .gte('metric_date', startDate.toISOString().split('T')[0])
        .order('metric_date', { ascending: false });

      if (error) throw error;

      setMetrics((data || []).map((d: any) => ({
        ...d,
        sleep_stages: (d.sleep_stages as any) || {},
      })));
      setIsConnected((data || []).length > 0);
    } catch (err) {
      console.error('Error fetching health metrics:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  // Connect to health provider and request permissions
  const connectHealth = async (): Promise<boolean> => {
    if (isNativePlatform()) {
      const granted = await requestHealthPermissions();
      if (!granted) {
        toast({ title: 'Permission Denied', description: 'Health data access was not granted.', variant: 'destructive' });
        return false;
      }
    }
    toast({ title: 'Connected', description: `Connected to ${providerName}.` });
    setIsConnected(true);
    return true;
  };

  // Sync health data from device to Supabase
  const syncHealthData = async (days = 7) => {
    setIsSyncing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const types: HealthDataType[] = ['steps', 'sleep', 'heart_rate', 'active_calories', 'distance'];
      const result = await fetchHealthData(types, startDate, endDate);

      if (!result.success) {
        toast({ title: 'Sync Failed', description: result.error || 'Could not fetch health data.', variant: 'destructive' });
        return;
      }

      // Group data by date
      const byDate = new Map<string, HealthDataPoint[]>();
      for (const point of result.data) {
        const date = point.timestamp.split('T')[0];
        if (!byDate.has(date)) byDate.set(date, []);
        byDate.get(date)!.push(point);
      }

      // Upsert aggregated records per day
      const records = Array.from(byDate.entries()).map(([date, points]) => {
        const steps = points.find(p => p.type === 'steps')?.value ?? null;
        const heartRate = points.find(p => p.type === 'heart_rate')?.value ?? null;
        const calories = points.find(p => p.type === 'active_calories')?.value ?? null;
        const distance = points.find(p => p.type === 'distance')?.value ?? null;
        const sleepPoint = points.find(p => p.type === 'sleep');
        const sleepHours = sleepPoint?.value ?? null;

        // Sleep stages – real data would come from granular queries;
        // for now, estimate breakdown from total sleep hours
        const sleepStages = sleepHours ? estimateSleepStages(sleepHours) : {};

        return {
          user_id: user.id,
          metric_date: date,
          steps,
          heart_rate_avg: heartRate,
          active_calories: calories,
          distance_km: distance,
          sleep_duration_hours: sleepHours,
          sleep_stages: sleepStages,
          source: providerName.toLowerCase().replace(/\s/g, '_'),
          synced_at: new Date().toISOString(),
        };
      });

      if (records.length > 0) {
        const { error } = await supabase
          .from('user_health_metrics')
          .upsert(records, { onConflict: 'user_id,metric_date,source' });

        if (error) throw error;
      }

      toast({
        title: 'Sync Complete',
        description: `Synced ${records.length} days of health data from ${providerName}.`,
      });

      await fetchMetrics();
    } catch (err: any) {
      console.error('Health sync error:', err);
      toast({ title: 'Sync Error', description: err.message || 'Failed to sync health data.', variant: 'destructive' });
    } finally {
      setIsSyncing(false);
    }
  };

  // Disconnect health (remove stored data)
  const disconnectHealth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('user_health_metrics')
        .delete()
        .eq('user_id', user.id);

      setMetrics([]);
      setIsConnected(false);
      toast({ title: 'Disconnected', description: 'Health data has been removed.' });
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  };

  // Get aggregated stats
  const getLatestMetric = () => metrics[0] ?? null;

  const getAverageSleep = (days = 7) => {
    const recent = metrics.slice(0, days).filter(m => m.sleep_duration_hours != null);
    if (recent.length === 0) return 0;
    return recent.reduce((s, m) => s + (m.sleep_duration_hours ?? 0), 0) / recent.length;
  };

  const getAverageSteps = (days = 7) => {
    const recent = metrics.slice(0, days).filter(m => m.steps != null);
    if (recent.length === 0) return 0;
    return Math.round(recent.reduce((s, m) => s + (m.steps ?? 0), 0) / recent.length);
  };

  const getAverageHeartRate = (days = 7) => {
    const recent = metrics.slice(0, days).filter(m => m.heart_rate_avg != null);
    if (recent.length === 0) return 0;
    return Math.round(recent.reduce((s, m) => s + (m.heart_rate_avg ?? 0), 0) / recent.length);
  };

  const getAggregatedSleepStages = (days = 7) => {
    const recent = metrics.slice(0, days).filter(m => m.sleep_stages && Object.keys(m.sleep_stages).length > 0);
    if (recent.length === 0) return { rem: 0, deep: 0, light: 0, awake: 0 };

    const totals = { rem: 0, deep: 0, light: 0, awake: 0 };
    recent.forEach(m => {
      totals.rem += m.sleep_stages.rem ?? 0;
      totals.deep += m.sleep_stages.deep ?? 0;
      totals.light += m.sleep_stages.light ?? 0;
      totals.awake += m.sleep_stages.awake ?? 0;
    });

    return {
      rem: Math.round(totals.rem / recent.length),
      deep: Math.round(totals.deep / recent.length),
      light: Math.round(totals.light / recent.length),
      awake: Math.round(totals.awake / recent.length),
    };
  };

  return {
    metrics,
    isLoading,
    isSyncing,
    isConnected,
    healthAvailable,
    platform,
    providerName,
    connectHealth,
    disconnectHealth,
    syncHealthData,
    fetchMetrics,
    getLatestMetric,
    getAverageSleep,
    getAverageSteps,
    getAverageHeartRate,
    getAggregatedSleepStages,
  };
};

/** Estimate sleep stage breakdown from total hours (used when granular data unavailable) */
function estimateSleepStages(totalHours: number) {
  // Typical adult sleep architecture percentages
  const totalMinutes = totalHours * 60;
  return {
    rem: Math.round(totalMinutes * 0.22),   // ~22% REM
    deep: Math.round(totalMinutes * 0.18),   // ~18% deep
    light: Math.round(totalMinutes * 0.50),  // ~50% light/core
    awake: Math.round(totalMinutes * 0.10),  // ~10% awake/transitions
  };
}
