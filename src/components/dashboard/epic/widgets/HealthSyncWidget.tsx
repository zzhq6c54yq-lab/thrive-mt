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
    try {
      setSyncing(providerId);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to connect health providers',
          variant: 'destructive',
        });
        return;
      }

      // For native health providers, request permissions
      if (providerId === 'apple_health' || providerId === 'google_fit') {
        if (!isNativePlatform()) {
          toast({
            title: 'Native App Required',
            description: `${providerId === 'apple_health' ? 'Apple Health' : 'Google Fit'} requires the mobile app. Download from App Store or Google Play.`,
            variant: 'destructive',
          });
          return;
        }

        const permissionGranted = await requestHealthPermissions();
        if (!permissionGranted) {
          toast({
            title: 'Permission Denied',
            description: 'Health data access was not granted. Please enable it in your device settings.',
            variant: 'destructive',
          });
          return;
        }
      }

      // Create connection record
      const { error } = await supabase
        .from('user_health_connections')
        .insert([{
          user_id: user.id,
          provider: providerId as 'apple_health' | 'google_fit' | 'fitbit',
          enabled: true,
          last_sync_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      // Perform initial sync
      await performSync(providerId);

      toast({
        title: 'Connected!',
        description: `Successfully connected to ${providers.find(p => p.id === providerId)?.name}`,
      });

      loadConnections();
    } catch (error: any) {
      toast({
        title: 'Connection failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSyncing(null);
    }
  };

  const performSync = async (providerId: string): Promise<HealthDataPoint[]> => {
    let result;
    
    switch (providerId) {
      case 'apple_health':
        result = await syncFromAppleHealth(7);
        break;
      case 'google_fit':
        result = await syncFromGoogleFit(7);
        break;
      case 'fitbit':
        result = await syncFromFitbit(7);
        break;
      default:
        return [];
    }

    if (!result.success) {
      throw new Error(result.error || 'Sync failed');
    }

    // Send data to backend
    if (result.data.length > 0) {
      await supabase.functions.invoke('sync-health-data', {
        body: {
          provider: providerId,
          healthData: result.data.map(d => ({
            type: d.type,
            value: d.value,
            unit: d.unit,
            timestamp: d.timestamp,
          })),
        },
      });
    }

    return result.data;
  };

  const handleSync = async (connection: HealthConnection) => {
    try {
      setSyncing(connection.provider);

      const data = await performSync(connection.provider);

      // Update last sync time
      await supabase
        .from('user_health_connections')
        .update({ last_sync_at: new Date().toISOString() })
        .eq('id', connection.id);

      toast({
        title: 'Synced!',
        description: `Synced ${data.length} health records from ${providers.find(p => p.id === connection.provider)?.name}`,
      });

      loadConnections();
    } catch (error: any) {
      toast({
        title: 'Sync failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSyncing(null);
    }
  };

  const isConnected = (providerId: string) =>
    connections.some(c => c.provider === providerId && c.enabled);

  const getConnection = (providerId: string) =>
    connections.find(c => c.provider === providerId && c.enabled);

  const isProviderAvailable = (provider: typeof providers[0]) => {
    // Fitbit is always available (OAuth-based)
    if (provider.id === 'fitbit') return true;
    // Native health providers only on their respective platforms
    return provider.platforms.includes(platform);
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

        {/* Platform indicator */}
        <div className="flex items-center gap-2 mb-4">
          {isNativePlatform() ? (
            <Badge variant="outline" className="text-green-400 border-green-400/50">
              <Wifi className="w-3 h-3 mr-1" />
              {platform === 'ios' ? 'iOS' : 'Android'} - Native
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground border-muted-foreground/50">
              <WifiOff className="w-3 h-3 mr-1" />
              Web - Limited Features
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          {providers.map((provider) => {
            const connection = getConnection(provider.id);
            const connected = isConnected(provider.id);
            const available = isProviderAvailable(provider);
            const Icon = provider.icon;

            return (
              <motion.div
                key={provider.id}
                whileHover={{ scale: available ? 1.02 : 1 }}
                className={`flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30 ${
                  !available ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${available ? provider.color : 'text-muted-foreground'}`} />
                  <div>
                    <div className="font-medium text-foreground">{provider.name}</div>
                    {!available && (
                      <div className="text-xs text-muted-foreground">
                        {provider.id === 'apple_health' ? 'iOS only' : 'Android only'}
                      </div>
                    )}
                    {connection?.last_sync_at && (
                      <div className="text-xs text-muted-foreground">
                        Last sync: {new Date(connection.last_sync_at).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>

                {connected ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => connection && handleSync(connection)}
                      disabled={syncing === provider.id}
                    >
                      {syncing === provider.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleConnect(provider.id)}
                    disabled={syncing === provider.id || !available}
                  >
                    {syncing === provider.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Connect'
                    )}
                  </Button>
                )}
              </motion.div>
            );
          })}
        </div>

        {!isNativePlatform() && (
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Download the mobile app for full health integration
          </p>
        )}
      </Card>
    </motion.div>
  );
};

export default HealthSyncWidget;
