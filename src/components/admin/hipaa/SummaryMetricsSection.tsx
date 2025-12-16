import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, FileCheck } from 'lucide-react';
import type { ComplianceMetrics } from '@/hooks/useHIPAACompliance';

interface SummaryMetricsSectionProps {
  metrics: ComplianceMetrics;
}

const SummaryMetricsSection: React.FC<SummaryMetricsSectionProps> = ({ metrics }) => {
  const getComplianceColor = (value: number) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getComplianceBg = (value: number) => {
    if (value >= 90) return 'bg-green-500/20 border-green-500/30';
    if (value >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Main Compliance Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${getComplianceBg(metrics.hipaaCompliance)} border`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#B87333]" />
              HIPAA Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getComplianceColor(metrics.hipaaCompliance)}`}>
              {metrics.hipaaCompliance}%
            </div>
            <Progress value={metrics.hipaaCompliance} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className={`${getComplianceBg(metrics.soc2Compliance)} border`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-400" />
              SOC 2 Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getComplianceColor(metrics.soc2Compliance)}`}>
              {metrics.soc2Compliance}%
            </div>
            <Progress value={metrics.soc2Compliance} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              SOC 2 Type 2 Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getComplianceColor(metrics.soc2ReadinessScore)}`}>
              {metrics.soc2ReadinessScore}%
            </div>
            <p className="text-xs text-gray-400 mt-1">Controls tested (6 months)</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Next Audit Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </div>
            <p className="text-xs text-gray-400 mt-1">Weekly audit cycle</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-900/20 border border-red-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              High Risk Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{metrics.highRiskOpen}</div>
            <p className="text-xs text-red-300/70 mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-900/20 border border-yellow-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Medium Risk Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{metrics.mediumRiskOpen}</div>
            <p className="text-xs text-yellow-300/70 mt-1">Review within 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-green-900/20 border border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Low Risk Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{metrics.lowRiskOpen}</div>
            <p className="text-xs text-green-300/70 mt-1">Track for completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Status Summary */}
      <Card className="bg-gray-800/50 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Current Week Audit Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{metrics.totalItems}</div>
              <p className="text-xs text-gray-400">Total Items</p>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{metrics.passedItems}</div>
              <p className="text-xs text-gray-400">Passed</p>
            </div>
            <div className="text-center p-4 bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{metrics.failedItems}</div>
              <p className="text-xs text-gray-400">Failed</p>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{metrics.pendingItems}</div>
              <p className="text-xs text-gray-400">Pending</p>
            </div>
          </div>

          {metrics.overdueRemediations > 0 && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-300">
                {metrics.overdueRemediations} overdue remediation{metrics.overdueRemediations !== 1 ? 's' : ''} require immediate attention
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryMetricsSection;
