import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CheckCircle, XCircle, AlertTriangle, Calendar } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import type { ChecklistItem, WeeklyAuditLog } from '@/hooks/useHIPAACompliance';
import type { UseMutationResult } from '@tanstack/react-query';

interface WeeklyAuditSectionProps {
  checklist: ChecklistItem[];
  auditLogs: WeeklyAuditLog[];
  addAuditLog: UseMutationResult<any, Error, any, unknown>;
}

const WeeklyAuditSection: React.FC<WeeklyAuditSectionProps> = ({ checklist, auditLogs, addAuditLog }) => {
  const { user } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay() + 7);
    return sunday.toISOString().split('T')[0];
  });
  const [formData, setFormData] = useState({
    checklist_item_id: '',
    status: 'Pass',
    notes: '',
    evidence_link: '',
  });

  const weekOptions = useMemo(() => {
    const weeks = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - today.getDay() + 7 - (i * 7));
      weeks.push(sunday.toISOString().split('T')[0]);
    }
    return weeks;
  }, []);

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => log.week_ending === selectedWeek);
  }, [auditLogs, selectedWeek]);

  const selectedItem = useMemo(() => {
    return checklist.find(item => item.id === formData.checklist_item_id);
  }, [checklist, formData.checklist_item_id]);

  const handleSubmit = async () => {
    if (!selectedItem) return;
    
    await addAuditLog.mutateAsync({
      week_ending: selectedWeek,
      completed_by: user?.email || 'Unknown',
      completed_by_id: user?.id || null,
      checklist_item_id: formData.checklist_item_id,
      category: selectedItem.category,
      item: selectedItem.item,
      status: formData.status,
      notes: formData.notes || null,
      evidence_link: formData.evidence_link || null,
    });

    setFormData({ checklist_item_id: '', status: 'Pass', notes: '', evidence_link: '' });
    setDialogOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pass': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Fail': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'Needs Remediation': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Fail': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Needs Remediation': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  // Calculate audit progress for current week
  const weeklyProgress = useMemo(() => {
    const weeklyItems = checklist.filter(item => item.frequency === 'Weekly');
    const completed = filteredLogs.filter(log => 
      weeklyItems.some(item => item.id === log.checklist_item_id)
    ).length;
    return { total: weeklyItems.length, completed };
  }, [checklist, filteredLogs]);

  return (
    <div className="space-y-4">
      {/* Week Selector & Progress */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#B87333]" />
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-48 bg-gray-900/50 border-gray-600 text-white">
                <SelectValue placeholder="Select week" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {weekOptions.map(week => (
                  <SelectItem key={week} value={week}>Week ending {week}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline" className="bg-[#B87333]/20 text-[#E5C5A1] border-[#B87333]/50">
            {weeklyProgress.completed}/{weeklyProgress.total} weekly items completed
          </Badge>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#B87333] hover:bg-[#A06830] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Audit Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Audit Log Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Checklist Item</Label>
                <Select 
                  value={formData.checklist_item_id} 
                  onValueChange={(val) => setFormData(prev => ({ ...prev, checklist_item_id: val }))}
                >
                  <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select item to audit" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 max-h-64">
                    {checklist.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        <span className="text-xs text-gray-400">[{item.category}]</span> {item.item.slice(0, 50)}...
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedItem && (
                <div className="p-3 bg-gray-900/50 rounded-lg text-sm">
                  <p className="text-gray-300"><strong>Testing Procedures:</strong> {selectedItem.testing_procedures}</p>
                  <p className="text-gray-300 mt-1"><strong>Evidence Required:</strong> {selectedItem.evidence_required}</p>
                </div>
              )}

              <div>
                <Label className="text-gray-300">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
                >
                  <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Pass">Pass</SelectItem>
                    <SelectItem value="Fail">Fail</SelectItem>
                    <SelectItem value="Needs Remediation">Needs Remediation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add audit notes..."
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-300">Evidence Link</Label>
                <Input
                  value={formData.evidence_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, evidence_link: e.target.value }))}
                  placeholder="https://drive.google.com/..."
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <Button 
                onClick={handleSubmit} 
                disabled={!formData.checklist_item_id || addAuditLog.isPending}
                className="w-full bg-[#B87333] hover:bg-[#A06830]"
              >
                {addAuditLog.isPending ? 'Adding...' : 'Add Audit Entry'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Audit Logs Table */}
      <Card className="bg-gray-800/50 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">
            Audit Entries for Week Ending {selectedWeek}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No audit entries for this week. Click "Add Audit Entry" to begin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Category</TableHead>
                    <TableHead className="text-gray-300">Item</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Completed By</TableHead>
                    <TableHead className="text-gray-300">Notes</TableHead>
                    <TableHead className="text-gray-300">Evidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map(log => (
                    <TableRow key={log.id} className="border-gray-700">
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {log.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white text-sm max-w-xs truncate">
                        {log.item}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <Badge className={getStatusBadge(log.status)} variant="outline">
                            {log.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 text-sm">{log.completed_by}</TableCell>
                      <TableCell className="text-gray-400 text-sm max-w-xs truncate">
                        {log.notes || '-'}
                      </TableCell>
                      <TableCell>
                        {log.evidence_link ? (
                          <a 
                            href={log.evidence_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline text-sm"
                          >
                            View
                          </a>
                        ) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyAuditSection;
