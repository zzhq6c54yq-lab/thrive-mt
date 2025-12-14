import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Download,
  Navigation,
  Globe,
  Shield,
  Building
} from 'lucide-react';
import { 
  getRouteHealthStatus, 
  exportRoutesAsCSV,
  RouteHealthReport,
  RouteStatus 
} from '@/utils/routeValidator';

const NavigationHealthChecker: React.FC = () => {
  const [report, setReport] = useState<RouteHealthReport | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [filter, setFilter] = useState<'all' | 'app' | 'marketing' | 'portal' | 'admin'>('all');

  useEffect(() => {
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setIsChecking(true);
    // Simulate async check
    await new Promise(resolve => setTimeout(resolve, 500));
    const healthReport = getRouteHealthStatus();
    setReport(healthReport);
    setIsChecking(false);
  };

  const handleExport = () => {
    if (!report) return;
    const csv = exportRoutesAsCSV(report.routes);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `route-health-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Warning</Badge>;
      case 'critical':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Critical</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'app':
        return <Navigation className="h-4 w-4 text-blue-400" />;
      case 'marketing':
        return <Globe className="h-4 w-4 text-purple-400" />;
      case 'portal':
        return <Building className="h-4 w-4 text-amber-400" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-red-400" />;
      default:
        return <Navigation className="h-4 w-4" />;
    }
  };

  const filteredRoutes = report?.routes.filter(route => 
    filter === 'all' || route.category === filter
  ) || [];

  const categoryStats = report ? {
    app: report.routes.filter(r => r.category === 'app').length,
    marketing: report.routes.filter(r => r.category === 'marketing').length,
    portal: report.routes.filter(r => r.category === 'portal').length,
    admin: report.routes.filter(r => r.category === 'admin').length,
  } : { app: 0, marketing: 0, portal: 0, admin: 0 };

  return (
    <div className="space-y-6">
      {/* Health Score Card */}
      <Card className="bg-gray-800/50 border-[#B87333]/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Navigation className="h-5 w-5 text-[#B87333]" />
            Navigation Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Overall Health */}
            <div className="col-span-2 md:col-span-1 bg-gray-900/50 rounded-lg p-4 text-center">
              <div className={`text-4xl font-bold ${
                (report?.healthPercentage || 0) >= 90 ? 'text-green-400' :
                (report?.healthPercentage || 0) >= 70 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {report?.healthPercentage || 0}%
              </div>
              <p className="text-gray-400 text-sm mt-1">Health Score</p>
            </div>

            {/* Stats */}
            <div className="bg-green-500/10 rounded-lg p-4 text-center border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{report?.healthyCount || 0}</div>
              <p className="text-gray-400 text-sm">Healthy</p>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-4 text-center border border-yellow-500/20">
              <div className="text-2xl font-bold text-yellow-400">{report?.warningCount || 0}</div>
              <p className="text-gray-400 text-sm">Warnings</p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-4 text-center border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">{report?.criticalCount || 0}</div>
              <p className="text-gray-400 text-sm">Critical</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{report?.totalRoutes || 0}</div>
              <p className="text-gray-400 text-sm">Total Routes</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={runHealthCheck} 
              disabled={isChecking}
              className="bg-[#B87333] hover:bg-[#9A5F2A] text-white"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Checking...' : 'Run Health Check'}
            </Button>
            <Button 
              onClick={handleExport} 
              variant="outline"
              className="border-[#B87333]/50 text-[#E5C5A1] hover:bg-[#B87333]/20"
              disabled={!report}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {report && (
            <p className="text-gray-500 text-sm mt-3">
              Last checked: {new Date(report.lastChecked).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Category Filters */}
      <Card className="bg-gray-800/50 border-[#B87333]/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">Route Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-[#B87333]' : 'border-gray-600 text-gray-300'}
            >
              All ({report?.totalRoutes || 0})
            </Button>
            <Button
              variant={filter === 'app' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('app')}
              className={filter === 'app' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
            >
              <Navigation className="h-3 w-3 mr-1" />
              App ({categoryStats.app})
            </Button>
            <Button
              variant={filter === 'marketing' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('marketing')}
              className={filter === 'marketing' ? 'bg-purple-600' : 'border-gray-600 text-gray-300'}
            >
              <Globe className="h-3 w-3 mr-1" />
              Marketing ({categoryStats.marketing})
            </Button>
            <Button
              variant={filter === 'portal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('portal')}
              className={filter === 'portal' ? 'bg-amber-600' : 'border-gray-600 text-gray-300'}
            >
              <Building className="h-3 w-3 mr-1" />
              Portals ({categoryStats.portal})
            </Button>
            <Button
              variant={filter === 'admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('admin')}
              className={filter === 'admin' ? 'bg-red-600' : 'border-gray-600 text-gray-300'}
            >
              <Shield className="h-3 w-3 mr-1" />
              Admin ({categoryStats.admin})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Routes List */}
      <Card className="bg-gray-800/50 border-[#B87333]/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">Route Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredRoutes.map((route, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    route.status === 'critical' ? 'bg-red-500/10 border border-red-500/20' :
                    route.status === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                    'bg-gray-900/50 border border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(route.status)}
                    {getCategoryIcon(route.category)}
                    <div>
                      <code className="text-sm text-white">{route.route}</code>
                      {route.issue && (
                        <p className="text-xs text-gray-400 mt-1">{route.issue}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {route.category}
                    </Badge>
                    {getStatusBadge(route.status)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationHealthChecker;
