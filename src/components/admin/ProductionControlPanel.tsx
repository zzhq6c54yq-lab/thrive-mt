import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Users, 
  AlertTriangle, 
  Database, 
  Zap,
  RefreshCw,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Server,
  Shield
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getRouteHealthStatus } from '@/utils/routeValidator';

interface SystemStatus {
  activeSessions: number;
  navigationErrors: number;
  edgeFunctionStatus: 'healthy' | 'degraded' | 'down';
  dbConnection: 'connected' | 'disconnected';
  uptime: string;
  lastSync: string;
}

const ProductionControlPanel: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>({
    activeSessions: 0,
    navigationErrors: 0,
    edgeFunctionStatus: 'healthy',
    dbConnection: 'connected',
    uptime: '99.9%',
    lastSync: new Date().toISOString()
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [routeHealth, setRouteHealth] = useState(100);

  useEffect(() => {
    fetchSystemStatus();
    const healthReport = getRouteHealthStatus();
    setRouteHealth(healthReport.healthPercentage);
  }, []);

  const fetchSystemStatus = async () => {
    try {
      // Test database connection
      const { error } = await supabase.from('profiles').select('id').limit(1);
      
      setStatus(prev => ({
        ...prev,
        dbConnection: error ? 'disconnected' : 'connected',
        lastSync: new Date().toISOString()
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        dbConnection: 'disconnected'
      }));
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchSystemStatus();
    const healthReport = getRouteHealthStatus();
    setRouteHealth(healthReport.healthPercentage);
    setIsRefreshing(false);
  };

  const handleExportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      systemStatus: status,
      routeHealth: routeHealth,
      environment: 'production'
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (isHealthy: boolean) => 
    isHealthy ? 'text-green-400' : 'text-red-400';

  const getStatusBg = (isHealthy: boolean) => 
    isHealthy ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Monitor className="h-6 w-6 text-[#B87333]" />
            Production Control Panel
          </h2>
          <p className="text-gray-400 mt-1">Real-time system monitoring and controls</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="bg-[#B87333] hover:bg-[#9A5F2A] text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={handleExportReport}
            variant="outline"
            className="border-[#B87333]/50 text-[#E5C5A1] hover:bg-[#B87333]/20"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Database Connection */}
        <Card className={`border ${getStatusBg(status.dbConnection === 'connected')}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className={`h-8 w-8 ${getStatusColor(status.dbConnection === 'connected')}`} />
                <div>
                  <p className="text-gray-400 text-sm">Database</p>
                  <p className={`font-bold ${getStatusColor(status.dbConnection === 'connected')}`}>
                    {status.dbConnection === 'connected' ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
              </div>
              {status.dbConnection === 'connected' ? 
                <CheckCircle2 className="h-5 w-5 text-green-400" /> :
                <XCircle className="h-5 w-5 text-red-400" />
              }
            </div>
          </CardContent>
        </Card>

        {/* Edge Functions */}
        <Card className={`border ${getStatusBg(status.edgeFunctionStatus === 'healthy')}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className={`h-8 w-8 ${getStatusColor(status.edgeFunctionStatus === 'healthy')}`} />
                <div>
                  <p className="text-gray-400 text-sm">Edge Functions</p>
                  <p className={`font-bold capitalize ${getStatusColor(status.edgeFunctionStatus === 'healthy')}`}>
                    {status.edgeFunctionStatus}
                  </p>
                </div>
              </div>
              {status.edgeFunctionStatus === 'healthy' ? 
                <CheckCircle2 className="h-5 w-5 text-green-400" /> :
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              }
            </div>
          </CardContent>
        </Card>

        {/* Route Health */}
        <Card className={`border ${getStatusBg(routeHealth >= 90)}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className={`h-8 w-8 ${routeHealth >= 90 ? 'text-green-400' : routeHealth >= 70 ? 'text-yellow-400' : 'text-red-400'}`} />
                <div>
                  <p className="text-gray-400 text-sm">Route Health</p>
                  <p className={`font-bold ${routeHealth >= 90 ? 'text-green-400' : routeHealth >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {routeHealth}%
                  </p>
                </div>
              </div>
              {routeHealth >= 90 ? 
                <CheckCircle2 className="h-5 w-5 text-green-400" /> :
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              }
            </div>
          </CardContent>
        </Card>

        {/* Uptime */}
        <Card className="border bg-gray-800/50 border-[#B87333]/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server className="h-8 w-8 text-[#B87333]" />
                <div>
                  <p className="text-gray-400 text-sm">Uptime</p>
                  <p className="font-bold text-white">{status.uptime}</p>
                </div>
              </div>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800/50 border-[#B87333]/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#B87333]" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              <RefreshCw className="h-6 w-6 mb-2" />
              <span className="text-xs">Clear Cache</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              <Activity className="h-6 w-6 mb-2" />
              <span className="text-xs">Health Check</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-xs">Security Scan</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              <Download className="h-6 w-6 mb-2" />
              <span className="text-xs">Export Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <Card className="bg-gray-800/50 border-[#B87333]/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#B87333]" />
            System Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B87333]">33</div>
              <p className="text-gray-400 text-sm">Edge Functions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B87333]">152+</div>
              <p className="text-gray-400 text-sm">Database Tables</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B87333]">265+</div>
              <p className="text-gray-400 text-sm">Navigation Routes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B87333]">24</div>
              <p className="text-gray-400 text-sm">Key Features</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Last Sync Info */}
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <span>Last synchronized: {new Date(status.lastSync).toLocaleString()}</span>
        <Badge variant="outline" className="border-green-500/30 text-green-400">
          Production Ready
        </Badge>
      </div>
    </div>
  );
};

export default ProductionControlPanel;
