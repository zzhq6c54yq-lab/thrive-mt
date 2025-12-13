import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Search, Download, RefreshCw, User, Database, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  actor_role: string | null;
  old_data: any;
  new_data: any;
  created_at: string;
}

export default function AuditLogsTab() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableFilter, setTableFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    fetchAuditLogs();
  }, [tableFilter, actionFilter]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (tableFilter !== 'all') {
        query = query.eq('table_name', tableFilter);
      }

      if (actionFilter !== 'all') {
        query = query.eq('action', actionFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs(data || []);

      // Extract unique table names for filter
      const uniqueTables = [...new Set((data || []).map(log => log.table_name))];
      setTables(uniqueTables);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User ID', 'Action', 'Table', 'Record ID', 'Role'].join(','),
      ...filteredLogs.map(log => [
        format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss'),
        log.user_id || 'N/A',
        log.action,
        log.table_name,
        log.record_id || 'N/A',
        log.actor_role || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Audit logs exported');
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT': return 'text-green-400 bg-green-500/20';
      case 'UPDATE': return 'text-blue-400 bg-blue-500/20';
      case 'DELETE': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredLogs = logs.filter(log =>
    log.table_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.user_id?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-[#D4A574]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#D4A574]" />
            PHI Audit Trail
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Complete audit log of all PHI data changes for HIPAA compliance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={fetchAuditLogs}
            className="border-[#B87333]/30"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={exportLogs}
            className="bg-[#B87333] hover:bg-[#D4A574] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by table, user ID, or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>
        <Select value={tableFilter} onValueChange={setTableFilter}>
          <SelectTrigger className="bg-card border-border/50">
            <SelectValue placeholder="Filter by table" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tables</SelectItem>
            {tables.map(table => (
              <SelectItem key={table} value={table}>{table}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="bg-card border-border/50">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="INSERT">INSERT</SelectItem>
            <SelectItem value="UPDATE">UPDATE</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-card/50 border-green-500/30">
          <div className="text-2xl font-bold text-green-400">
            {logs.filter(l => l.action === 'INSERT').length}
          </div>
          <div className="text-sm text-muted-foreground">Inserts</div>
        </Card>
        <Card className="p-4 bg-card/50 border-blue-500/30">
          <div className="text-2xl font-bold text-blue-400">
            {logs.filter(l => l.action === 'UPDATE').length}
          </div>
          <div className="text-sm text-muted-foreground">Updates</div>
        </Card>
        <Card className="p-4 bg-card/50 border-red-500/30">
          <div className="text-2xl font-bold text-red-400">
            {logs.filter(l => l.action === 'DELETE').length}
          </div>
          <div className="text-sm text-muted-foreground">Deletes</div>
        </Card>
      </div>

      {/* Logs Table */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  <User className="w-3 h-3 inline mr-1" />
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  <Database className="w-3 h-3 inline mr-1" />
                  Table
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Record ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                filteredLogs.slice(0, 50).map((log) => (
                  <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">
                      {format(new Date(log.created_at), 'MMM d, yyyy HH:mm:ss')}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {log.user_id ? `${log.user_id.slice(0, 8)}...` : 'System'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      <span className="px-2 py-1 bg-[#B87333]/20 text-[#D4A574] rounded text-xs">
                        {log.table_name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {log.record_id ? `${log.record_id.slice(0, 8)}...` : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {log.actor_role || 'user'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredLogs.length > 50 && (
          <div className="p-4 text-center text-sm text-muted-foreground border-t border-border/50">
            Showing 50 of {filteredLogs.length} logs. Export to see all.
          </div>
        )}
      </Card>
    </div>
  );
}
