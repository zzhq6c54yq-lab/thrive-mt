import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Watch, Zap, Check, Loader2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  isNativePlatform, 
  getPlatform, 
  isHealthAvailable,
  requestHealthPermissions,
  syncFromAppleHealth,
  syncFromGoogleFit,
  syncFromFitbit,
  HealthDataPoint
} from '@/services/healthService';

interface HealthConnection {
  id: string;
  provider: 'apple_health' | 'google_fit' | 'fitbit';
  enabled: boolean;
  last_sync_at: string | null;
}

const HealthSyncWidget: React.FC = () => {
  const [connections, setConnections] = useState<HealthConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web'>('web');
  const [healthAvailable, setHealthAvailable] = useState(false);
  const { toast } = useToast();

  const providers = [
    { id: 'apple_health', name: 'Apple Health', icon: Smartphone, color: 'text-pink-400', platforms: ['ios'] },
    { id: 'google_fit', name: 'Google Fit', icon: Watch, color: 'text-blue-400', platforms: ['android'] },
    { id: 'fitbit', name: 'Fitbit', icon: Zap, color: 'text-green-400', platforms: ['ios', 'android', 'web'] },
  ];

  useEffect(() => {
    initializeHealth();
    loadConnections();
  }, []);

  const initializeHealth = async () => {
    const currentPlatform = getPlatform();
    setPlatform(currentPlatform);
    
    const available = await isHealthAvailable();
    setHealthAvailable(available);
    
    console.log(`Health Service initialized - Platform: ${currentPlatform}, Available: ${available}`);
  };

  const loadConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('user_health_connections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConnections((data as HealthConnection[]) || []);
    } catch (error) {
      console.error('Error loading health connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (providerId: string) => {
    toast({
      title: 'Coming Soon in v2.0',
      description: `${providers.find(p => p.id === providerId)?.name} integration will be available in a future update.`,
    });
  };

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:border-[#D4AF37]/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">Health Integrations</h3>
            <p className="text-sm text-muted-foreground">Sync your health data</p>
          </div>
          <Watch className="w-8 h-8 text-[#D4AF37]" />
        </div>

        <Badge variant="outline" className="text-muted-foreground border-muted-foreground/50 mb-4">
          Coming Soon — v2.0
        </Badge>

        <div className="space-y-3">
          {providers.map((provider) => {
            const Icon = provider.icon;

            return (
              <div
                key={provider.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 text-muted-foreground`} />
                  <div>
                    <div className="font-medium text-foreground">{provider.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {provider.id === 'apple_health' ? 'iOS only' : provider.id === 'google_fit' ? 'Android only' : 'All platforms'}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleConnect(provider.id)}
                  className="opacity-70"
                >
                  Coming Soon
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Health integrations will be available in version 2.0
        </p>
      </Card>
    </motion.div>
  );
};

export default HealthSyncWidget;
