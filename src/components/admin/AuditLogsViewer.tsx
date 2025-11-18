import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { ACTION_CATEGORIES, actionToCategory } from '@/constants/auditActions';

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  operator: string;
  details: any;
  created_at: string;
}

const AuditLogsViewer: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const logsPerPage = 50;

  useEffect(() => {
    fetchLogs();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('audit-logs-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'auth_user_audit',
        },
        (payload) => {
          setLogs((current) => [payload.new as AuditLog, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('auth_user_audit')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(log.details).toLowerCase().includes(searchQuery.toLowerCase());

    const category = actionToCategory[log.action];
    const matchesCategory = filterCategory === 'all' || category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const paginatedLogs = filteredLogs.slice(page * logsPerPage, (page + 1) * logsPerPage);

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Action', 'Operator', 'User ID', 'Details'],
      ...filteredLogs.map((log) => [
        log.created_at,
        log.action,
        log.operator,
        log.user_id,
        JSON.stringify(log.details),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${format(new Date(), 'yyyy-MM-dd-HHmm')}.csv`;
    a.click();
  };

  const getActionBadgeColor = (action: string) => {
    if (action.includes('denied') || action.includes('failed') || action.includes('deleted')) {
      return 'destructive';
    }
    if (action.includes('granted') || action.includes('created') || action.includes('approved')) {
      return 'default';
    }
    if (action.includes('updated') || action.includes('changed')) {
      return 'secondary';
    }
    return 'outline';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading audit logs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Audit Logs</CardTitle>
          <CardDescription className="text-slate-400">
            Complete history of all admin actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-700 text-white"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[200px] bg-slate-900/50 border-slate-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(ACTION_CATEGORIES).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={exportLogs}
              className="border-slate-700 text-white hover:bg-slate-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Logs Table */}
          <div className="border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/70">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Operator
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {paginatedLogs.map((log) => (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-sm text-slate-300">
                          {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm:ss')}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={getActionBadgeColor(log.action)}>
                            {log.action.replace(/_/g, ' ')}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">
                          {log.operator}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedLog(expandedLog === log.id ? null : log.id)
                            }
                            className="text-slate-400 hover:text-white"
                          >
                            {expandedLog === log.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </td>
                      </tr>
                      {expandedLog === log.id && (
                        <tr>
                          <td colSpan={4} className="px-4 py-3 bg-slate-900/30">
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-slate-400">User ID:</span>{' '}
                                <span className="text-slate-300 font-mono">{log.user_id}</span>
                              </div>
                              {log.details?.ip_address && (
                                <div>
                                  <span className="text-slate-400">IP Address:</span>{' '}
                                  <span className="text-slate-300">{log.details.ip_address}</span>
                                </div>
                              )}
                              <div>
                                <span className="text-slate-400">Details:</span>
                                <pre className="mt-1 p-2 bg-slate-900 rounded text-xs text-slate-300 overflow-x-auto">
                                  {JSON.stringify(log.details, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredLogs.length > logsPerPage && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                Showing {page * logsPerPage + 1} to{' '}
                {Math.min((page + 1) * logsPerPage, filteredLogs.length)} of{' '}
                {filteredLogs.length} logs
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="border-slate-700 text-white hover:bg-slate-700"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={(page + 1) * logsPerPage >= filteredLogs.length}
                  className="border-slate-700 text-white hover:bg-slate-700"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogsViewer;
