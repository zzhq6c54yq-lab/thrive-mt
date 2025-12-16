import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, Clock, Search, Edit } from 'lucide-react';
import type { RemediationItem } from '@/hooks/useHIPAACompliance';
import type { UseMutationResult } from '@tanstack/react-query';

interface RemediationSectionProps {
  remediations: RemediationItem[];
  updateRemediation: UseMutationResult<any, Error, any, unknown>;
}

const RemediationSection: React.FC<RemediationSectionProps> = ({ remediations, updateRemediation }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RemediationItem | null>(null);
  const [editForm, setEditForm] = useState({
    status: '',
    assigned_to: '',
    due_date: '',
    notes: '',
    resolution_verification: '',
  });

  const filteredRemediations = useMemo(() => {
    return remediations.filter(item => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesRisk = riskFilter === 'all' || item.risk_level === riskFilter;
      const matchesSearch = item.issue.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesRisk && matchesSearch;
    });
  }, [remediations, statusFilter, riskFilter, search]);

  const handleEdit = (item: RemediationItem) => {
    setSelectedItem(item);
    setEditForm({
      status: item.status,
      assigned_to: item.assigned_to || '',
      due_date: item.due_date || '',
      notes: item.notes || '',
      resolution_verification: item.resolution_verification || '',
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedItem) return;
    
    await updateRemediation.mutateAsync({
      id: selectedItem.id,
      updates: editForm,
    });

    setEditDialogOpen(false);
    setSelectedItem(null);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Closed': return 'bg-green-500/20 text-green-300 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const isOverdue = (item: RemediationItem) => {
    if (item.status === 'Closed' || !item.due_date) return false;
    return new Date(item.due_date) < new Date();
  };

  const openCount = remediations.filter(r => r.status === 'Open').length;
  const inProgressCount = remediations.filter(r => r.status === 'In Progress').length;
  const closedCount = remediations.filter(r => r.status === 'Closed').length;
  const overdueCount = remediations.filter(isOverdue).length;

  return (
    <div className="space-y-4">
      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-red-900/20 border border-red-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-red-400">{openCount}</div>
                <p className="text-xs text-gray-400">Open Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-900/20 border border-yellow-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-yellow-400">{inProgressCount}</div>
                <p className="text-xs text-gray-400">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-900/20 border border-green-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">{closedCount}</div>
                <p className="text-xs text-gray-400">Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={`${overdueCount > 0 ? 'bg-red-900/30 border-red-500/50' : 'bg-gray-800/50 border-gray-700'} border`}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-5 h-5 ${overdueCount > 0 ? 'text-red-400' : 'text-gray-400'}`} />
              <div>
                <div className={`text-2xl font-bold ${overdueCount > 0 ? 'text-red-400' : 'text-gray-400'}`}>{overdueCount}</div>
                <p className="text-xs text-gray-400">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800/50 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Remediation Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search issues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-gray-900/50 border-gray-600 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-600 text-white">
                <SelectValue placeholder="Risk" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Issue</TableHead>
                  <TableHead className="text-gray-300">Category</TableHead>
                  <TableHead className="text-gray-300">Risk</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Due Date</TableHead>
                  <TableHead className="text-gray-300">Assigned To</TableHead>
                  <TableHead className="text-gray-300 w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRemediations.map(item => (
                  <TableRow 
                    key={item.id} 
                    className={`border-gray-700 ${isOverdue(item) ? 'bg-red-900/20' : ''}`}
                  >
                    <TableCell className="text-white text-sm max-w-xs">
                      <div className="truncate">{item.issue}</div>
                      {isOverdue(item) && (
                        <Badge className="mt-1 bg-red-500/30 text-red-300 text-xs">OVERDUE</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskBadge(item.risk_level)} variant="outline">
                        {item.risk_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">
                      {item.due_date || '-'}
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">
                      {item.assigned_to || '-'}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(item)}
                        className="text-[#B87333] hover:text-[#E5C5A1]"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Update Remediation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Issue</Label>
              <p className="text-sm text-gray-400 p-2 bg-gray-900/50 rounded">{selectedItem?.issue}</p>
            </div>
            <div>
              <Label className="text-gray-300">Status</Label>
              <Select value={editForm.status} onValueChange={(val) => setEditForm(prev => ({ ...prev, status: val }))}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Assigned To</Label>
              <Input
                value={editForm.assigned_to}
                onChange={(e) => setEditForm(prev => ({ ...prev, assigned_to: e.target.value }))}
                className="bg-gray-900/50 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Due Date</Label>
              <Input
                type="date"
                value={editForm.due_date}
                onChange={(e) => setEditForm(prev => ({ ...prev, due_date: e.target.value }))}
                className="bg-gray-900/50 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Notes</Label>
              <Textarea
                value={editForm.notes}
                onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-gray-900/50 border-gray-600 text-white"
              />
            </div>
            {editForm.status === 'Closed' && (
              <div>
                <Label className="text-gray-300">Resolution Verification</Label>
                <Textarea
                  value={editForm.resolution_verification}
                  onChange={(e) => setEditForm(prev => ({ ...prev, resolution_verification: e.target.value }))}
                  placeholder="Describe how the issue was resolved and verified..."
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>
            )}
            <Button 
              onClick={handleSave} 
              disabled={updateRemediation.isPending}
              className="w-full bg-[#B87333] hover:bg-[#A06830]"
            >
              {updateRemediation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RemediationSection;
