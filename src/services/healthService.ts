/**
 * Health Service for Apple Health & Google Health Connect Integration
 * 
 * Uses @capgo/capacitor-health plugin for unified access to:
 * - Apple HealthKit (iOS)
 * - Health Connect (Android)
 * 
 * On web, gracefully degrades with mock data for demo purposes.
 */

import { Capacitor } from '@capacitor/core';
import type { HealthDataType as PluginHealthDataType } from '@capgo/capacitor-health';

// Our app's health data types
export type HealthDataType = 
  | 'steps'
  | 'sleep'
  | 'heart_rate'
  | 'active_calories'
  | 'distance'
  | 'weight'
  | 'height';

export interface HealthDataPoint {
  type: HealthDataType;
  value: number;
  unit: string;
  timestamp: string;
  source?: string;
}

export interface HealthSyncResult {
  success: boolean;
  data: HealthDataPoint[];
  error?: string;
}

// Map our app types to the plugin's HealthDataType
const PLUGIN_TYPE_MAP: Record<HealthDataType, PluginHealthDataType | null> = {
  steps: 'steps',
  sleep: 'sleep',
  heart_rate: 'heartRate',
  active_calories: 'calories',
  distance: 'distance',
  weight: 'weight',
  height: null, // Not supported by plugin
};

const UNIT_MAP: Record<HealthDataType, string> = {
  steps: 'count',
  sleep: 'hours',
  heart_rate: 'bpm',
  active_calories: 'kcal',
  distance: 'km',
  weight: 'kg',
  height: 'cm',
};

// Platform detection
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const getPlatform = (): 'ios' | 'android' | 'web' => {
  const platform = Capacitor.getPlatform();
  if (platform === 'ios') return 'ios';
  if (platform === 'android') return 'android';
  return 'web';
};

// Lazily load the plugin only on native platforms
const getHealthPlugin = async () => {
  if (!isNativePlatform()) return null;
  try {
    const mod = await import('@capgo/capacitor-health');
    return mod.Health;
  } catch (error) {
    console.error('Failed to load Capacitor Health plugin:', error);
    return null;
  }
};

// Check if health data is available on this platform
export const isHealthAvailable = async (): Promise<boolean> => {
  const plugin = await getHealthPlugin();
  if (!plugin) return false;

  try {
    const result = await plugin.isAvailable();
    return result.available;
  } catch (error) {
    console.error('Error checking health availability:', error);
    return false;
  }
};

// Request health permissions from the user
export const requestHealthPermissions = async (): Promise<boolean> => {
  const plugin = await getHealthPlugin();
  if (!plugin) {
    console.warn('Health plugin not available on this platform');
    return false;
  }

  try {
    const readTypes: PluginHealthDataType[] = ['steps', 'sleep', 'heartRate', 'calories', 'distance', 'weight'];

    await plugin.requestAuthorization({
      read: readTypes,
      write: [],
    });

    return true;
  } catch (error) {
    console.error('Error requesting health permissions:', error);
    return false;
  }
};

// Fetch health data from native health stores
export const fetchHealthData = async (
  types: HealthDataType[],
  startDate: Date,
  endDate: Date
): Promise<HealthSyncResult> => {
  const plugin = await getHealthPlugin();

  // Web fallback: return mock data
  if (!plugin) {
    return {
      success: true,
      data: generateMockHealthData(types, startDate, endDate),
    };
  }

  try {
    const allData: HealthDataPoint[] = [];
    const platform = getPlatform();
    const sourceName = platform === 'ios' ? 'Apple Health' : 'Health Connect';

    for (const type of types) {
      const pluginType = PLUGIN_TYPE_MAP[type];
      if (!pluginType) continue;

      try {
        const result = await plugin.queryAggregated({
          dataType: pluginType,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          bucket: 'day',
        });

        if (result?.samples) {
          for (const sample of result.samples) {
            allData.push({
              type,
              value: sample.value ?? 0,
              unit: UNIT_MAP[type],
              timestamp: sample.startDate,
              source: sourceName,
            });
          }
        }
      } catch (typeError) {
        // Some data types may not be available; continue with others
        console.warn(`Could not fetch ${type} data:`, typeError);
      }
    }

    return {
      success: true,
      data: allData,
    };
  } catch (error: any) {
    console.error('Error fetching health data:', error);
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch health data',
    };
  }
};

// Generate mock health data for web demo
const generateMockHealthData = (
  types: HealthDataType[],
  startDate: Date,
  endDate: Date
): HealthDataPoint[] => {
  const data: HealthDataPoint[] = [];
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    types.forEach(type => {
      data.push(generateMockDataPoint(type, date));
    });
  }

  return data;
};

const generateMockDataPoint = (type: HealthDataType, date: Date): HealthDataPoint => {
  const timestamp = date.toISOString();

  const generators: Record<HealthDataType, () => HealthDataPoint> = {
    steps: () => ({
      type: 'steps', value: Math.floor(5000 + Math.random() * 10000),
      unit: 'count', timestamp, source: 'Demo Data',
    }),
    sleep: () => ({
      type: 'sleep', value: Math.round((5 + Math.random() * 4) * 10) / 10,
      unit: 'hours', timestamp, source: 'Demo Data',
    }),
    heart_rate: () => ({
      type: 'heart_rate', value: Math.floor(60 + Math.random() * 40),
      unit: 'bpm', timestamp, source: 'Demo Data',
    }),
    active_calories: () => ({
      type: 'active_calories', value: Math.floor(200 + Math.random() * 500),
      unit: 'kcal', timestamp, source: 'Demo Data',
    }),
    distance: () => ({
      type: 'distance', value: Math.round((2 + Math.random() * 8) * 10) / 10,
      unit: 'km', timestamp, source: 'Demo Data',
    }),
    weight: () => ({
      type: 'weight', value: Math.round((70 + Math.random() * 2 - 1) * 10) / 10,
      unit: 'kg', timestamp, source: 'Demo Data',
    }),
    height: () => ({
      type: 'height', value: 170,
      unit: 'cm', timestamp, source: 'Demo Data',
    }),
  };

  return generators[type]();
};

// Provider-specific sync functions
export const syncFromAppleHealth = async (days: number = 7): Promise<HealthSyncResult> => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return fetchHealthData(
    ['steps', 'sleep', 'heart_rate', 'active_calories', 'distance'],
    startDate,
    endDate
  );
};

export const syncFromGoogleFit = async (days: number = 7): Promise<HealthSyncResult> => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return fetchHealthData(
    ['steps', 'sleep', 'heart_rate', 'active_calories', 'distance'],
    startDate,
    endDate
  );
};

export const syncFromFitbit = async (days: number = 7): Promise<HealthSyncResult> => {
  // Fitbit uses OAuth REST API — not available via native health plugins
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return fetchHealthData(
    ['steps', 'sleep', 'heart_rate'],
    startDate,
    endDate
  );
};

// Apple HealthKit type mapping (for reference)
export const mapToAppleHealthType = (type: HealthDataType): string => {
  const mapping: Record<HealthDataType, string> = {
    steps: 'HKQuantityTypeIdentifierStepCount',
    sleep: 'HKCategoryTypeIdentifierSleepAnalysis',
    heart_rate: 'HKQuantityTypeIdentifierHeartRate',
    active_calories: 'HKQuantityTypeIdentifierActiveEnergyBurned',
    distance: 'HKQuantityTypeIdentifierDistanceWalkingRunning',
    weight: 'HKQuantityTypeIdentifierBodyMass',
    height: 'HKQuantityTypeIdentifierHeight',
  };
  return mapping[type] || type;
};

// Google Health Connect type mapping (for reference)
export const mapToGoogleFitType = (type: HealthDataType): string => {
  const mapping: Record<HealthDataType, string> = {
    steps: 'com.google.step_count.delta',
    sleep: 'com.google.sleep.segment',
    heart_rate: 'com.google.heart_rate.bpm',
    active_calories: 'com.google.calories.expended',
    distance: 'com.google.distance.delta',
    weight: 'com.google.weight',
    height: 'com.google.height',
  };
  return mapping[type] || type;
};
