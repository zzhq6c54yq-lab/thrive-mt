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
    CapacitorHealth: {
      // iOS: HealthKit data types to read
      readTypes: [
        'steps',
        'sleep',
        'heartRate',
        'calories',
        'distance',
        'weight'
      ],
      // Android: Health Connect permission rationale
      androidPermissionRationale: 'ThriveMT needs access to your health data to track your wellness journey and provide personalized insights.'
    }
  }
};

export default config;
