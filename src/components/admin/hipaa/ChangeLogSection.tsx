import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, History } from 'lucide-react';
import type { AuditChangeLog } from '@/hooks/useHIPAACompliance';

interface ChangeLogSectionProps {
  changeLog: AuditChangeLog[];
}

const ChangeLogSection: React.FC<ChangeLogSectionProps> = ({ changeLog }) => {
  const [search, setSearch] = useState('');

  const filteredLog = useMemo(() => {
    return changeLog.filter(entry => 
      entry.change_description.toLowerCase().includes(search.toLowerCase()) ||
      entry.editor_name.toLowerCase().includes(search.toLowerCase()) ||
      (entry.affected_table && entry.affected_table.toLowerCase().includes(search.toLowerCase()))
    );
  }, [changeLog, search]);

  const exportToCSV = () => {
    const headers = ['Date', 'Editor', 'Change Description', 'Reason', 'Affected Table', 'Record ID'];
    const rows = filteredLog.map(entry => [
      new Date(entry.created_at).toLocaleString(),
      entry.editor_name,
      entry.change_description,
      entry.reason || '',
      entry.affected_table || '',
      entry.affected_record_id || ''
    ]);

    const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hipaa-audit-changelog-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="bg-gray-800/50 border border-gray-700">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#B87333]" />
            Audit Change Log ({filteredLog.length} entries)
          </CardTitle>
          <Button onClick={exportToCSV} variant="outline" size="sm" className="border-[#B87333]/50 text-[#E5C5A1]">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search changes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-900/50 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-800">
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300 w-44">Date/Time</TableHead>
                <TableHead className="text-gray-300 w-40">Editor</TableHead>
                <TableHead className="text-gray-300">Change Description</TableHead>
                <TableHead className="text-gray-300 w-40">Affected Table</TableHead>
                <TableHead className="text-gray-300 w-48">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLog.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                    No change log entries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLog.map(entry => (
                  <TableRow key={entry.id} className="border-gray-700">
                    <TableCell className="text-gray-300 text-sm whitespace-nowrap">
                      {formatDate(entry.created_at)}
                    </TableCell>
                    <TableCell className="text-white text-sm">
                      {entry.editor_name}
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">
                      {entry.change_description}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {entry.affected_table || '-'}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm max-w-xs truncate">
                      {entry.reason || '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangeLogSection;
