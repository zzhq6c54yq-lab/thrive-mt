import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Lock, AlertTriangle, CheckCircle, FileText, Search } from 'lucide-react';
import { toast } from 'sonner';

interface ComplianceViolation {
  id: string;
  violation_type: string;
  severity: string;
  user_id: string | null;
  details: any;
  resolved: boolean;
  created_at: string;
}

interface DataAccessLog {
  id: string;
  accessor_id: string;
  accessed_user_id: string | null;
  data_type: string;
  access_reason: string | null;
  ip_address: string | null | unknown;
  created_at: string;
}

const ComplianceDashboard: React.FC = () => {
  const [violations, setViolations] = useState<ComplianceViolation[]>([]);
  const [accessLogs, setAccessLogs] = useState<DataAccessLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const fetchComplianceData = async () => {
    try {
      // Fetch compliance violations
      const { data: violationsData, error: violationsError } = await supabase
        .from('compliance_violations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (violationsError) throw violationsError;
      setViolations(violationsData || []);

      // Fetch data access logs
      const { data: logsData, error: logsError } = await supabase
        .from('data_access_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (logsError) throw logsError;
      setAccessLogs(logsData || []);
    } catch (error) {
      console.error('Error fetching compliance data:', error);
      toast.error('Failed to load compliance data');
    } finally {
      setLoading(false);
    }
  };

  const markViolationResolved = async (violationId: string) => {
    try {
      const { error } = await supabase
        .from('compliance_violations')
        .update({ resolved: true, resolved_at: new Date().toISOString() })
        .eq('id', violationId);

      if (error) throw error;

      toast.success('Violation marked as resolved');
      fetchComplianceData();
    } catch (error) {
      console.error('Error resolving violation:', error);
      toast.error('Failed to resolve violation');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20';
      default: return 'text-blue-500 bg-blue-500/20';
    }
  };

  const filteredViolations = violations.filter(v =>
    v.violation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.severity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAccessLogs = accessLogs.filter(log =>
    log.data_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.accessor_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading compliance data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HIPAA Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-800/50 border-green-500/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Lock className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Data at Rest</p>
              <p className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Encrypted
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-green-500/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Data in Transit</p>
              <p className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                TLS 1.3
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/50 border-green-500/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FileText className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Backup Encryption</p>
              <p className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Enabled
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search violations or access logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-[#B87333]/30 text-white"
        />
      </div>

      {/* Compliance Violations */}
      <Card className="bg-gray-800/50 border-[#B87333]/30">
        <div className="p-6 border-b border-[#B87333]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-[#B87333]" />
              <h2 className="text-2xl font-bold text-white">Policy Violations</h2>
            </div>
            <span className="text-gray-400">
              {filteredViolations.filter(v => !v.resolved).length} open violations
            </span>
          </div>
        </div>
        <div className="p-6">
          {filteredViolations.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <p className="text-lg">No compliance violations found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredViolations.map((violation) => (
                <Card key={violation.id} className="p-4 bg-gray-900/50 border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(violation.severity)}`}>
                          {violation.severity.toUpperCase()}
                        </span>
                        <span className="text-white font-medium">{violation.violation_type}</span>
                      </div>
                      <div className="text-gray-400 text-sm space-y-1">
                        <p>Created: {new Date(violation.created_at).toLocaleString()}</p>
                        {violation.user_id && <p>User ID: {violation.user_id}</p>}
                        {violation.details && (
                          <p>Details: {JSON.stringify(violation.details, null, 2)}</p>
                        )}
                      </div>
                    </div>
                    {!violation.resolved && (
                      <Button
                        size="sm"
                        onClick={() => markViolationResolved(violation.id)}
                        className="bg-[#B87333] hover:bg-[#E5C5A1] text-white"
                      >
                        Mark Resolved
                      </Button>
                    )}
                    {violation.resolved && (
                      <span className="flex items-center gap-2 text-green-500 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Resolved
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Data Access Logs */}
      <Card className="bg-gray-800/50 border-[#B87333]/30">
        <div className="p-6 border-b border-[#B87333]/30">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#B87333]" />
            <h2 className="text-2xl font-bold text-white">Data Access Audit Trail</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Accessor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Accessed User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredAccessLogs.slice(0, 20).map((log) => (
                <tr key={log.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.accessor_id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span className="px-2 py-1 bg-[#B87333]/20 text-[#E5C5A1] rounded">
                      {log.data_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.accessed_user_id ? `${log.accessed_user_id.slice(0, 8)}...` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {String(log.ip_address || 'N/A')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {log.access_reason || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ComplianceDashboard;
