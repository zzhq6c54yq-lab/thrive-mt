import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.25e197f73b3a47f4b16c7a0d41e6434e',
  appName: 'thrive-mt',
  webDir: 'dist',
  server: {
    url: 'https://25e197f7-3b3a-47f4-b16c-7a0d41e6434e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    // Health plugin configuration
    CapacitorHealth: {
      // iOS HealthKit data types to request
      readTypes: [
        'stepCount',
        'sleepAnalysis', 
        'heartRate',
        'activeEnergyBurned',
        'distanceWalkingRunning',
        'weight',
        'height'
      ],
      // Android Google Fit data types
      androidReadTypes: [
        'com.google.step_count.delta',
        'com.google.sleep.segment',
        'com.google.heart_rate.bpm',
        'com.google.calories.expended',
        'com.google.distance.delta',
        'com.google.weight',
        'com.google.height'
      ]
    }
  }
};

export default config;
