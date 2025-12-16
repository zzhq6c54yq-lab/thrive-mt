import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Filter } from 'lucide-react';
import type { ChecklistItem } from '@/hooks/useHIPAACompliance';

interface MasterChecklistSectionProps {
  checklist: ChecklistItem[];
}

const MasterChecklistSection: React.FC<MasterChecklistSectionProps> = ({ checklist }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(checklist.map(item => item.category));
    return Array.from(cats).sort();
  }, [checklist]);

  const filteredChecklist = useMemo(() => {
    return checklist.filter(item => {
      const matchesSearch = item.item.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesRisk = riskFilter === 'all' || item.risk_level === riskFilter;
      const matchesFrequency = frequencyFilter === 'all' || item.frequency === frequencyFilter;
      return matchesSearch && matchesCategory && matchesRisk && matchesFrequency;
    });
  }, [checklist, search, categoryFilter, riskFilter, frequencyFilter]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getCategoryColor = (category: string) => {
    if (category.startsWith('HIPAA')) return 'bg-[#B87333]/20 text-[#E5C5A1] border-[#B87333]/50';
    if (category.startsWith('SOC2')) return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  };

  const exportToCSV = () => {
    const headers = ['Category', 'Item', 'Required/Addressable', 'Risk Level', 'Frequency', 'Assigned To', 'Testing Procedures', 'Evidence Required', 'Notes'];
    const rows = filteredChecklist.map(item => [
      item.category,
      item.item,
      item.required_addressable,
      item.risk_level,
      item.frequency,
      item.assigned_to || '',
      item.testing_procedures || '',
      item.evidence_required || '',
      item.notes || ''
    ]);

    const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hipaa-soc2-checklist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <Card className="bg-gray-800/50 border border-gray-700">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg text-white">
            Master HIPAA & SOC 2 Checklist ({filteredChecklist.length} items)
          </CardTitle>
          <Button onClick={exportToCSV} variant="outline" size="sm" className="border-[#B87333]/50 text-[#E5C5A1]">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-900/50 border-gray-600 text-white"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
            <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
              <SelectValue placeholder="Frequency" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Frequencies</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Quarterly">Quarterly</SelectItem>
              <SelectItem value="Annual">Annual</SelectItem>
              <SelectItem value="As Needed">As Needed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-800">
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300 w-32">Category</TableHead>
                <TableHead className="text-gray-300">Item</TableHead>
                <TableHead className="text-gray-300 w-24">Type</TableHead>
                <TableHead className="text-gray-300 w-20">Risk</TableHead>
                <TableHead className="text-gray-300 w-24">Frequency</TableHead>
                <TableHead className="text-gray-300 w-48">Testing Procedures</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChecklist.map((item) => (
                <TableRow key={item.id} className="border-gray-700 hover:bg-gray-700/30">
                  <TableCell>
                    <Badge className={getCategoryColor(item.category)} variant="outline">
                      {item.category.replace('HIPAA-', '').replace('SOC2-', '')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white text-sm">
                    <div>{item.item}</div>
                    {item.notes && (
                      <div className="text-xs text-gray-400 mt-1">{item.notes}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-400">{item.required_addressable}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(item.risk_level)} variant="outline">
                      {item.risk_level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm">{item.frequency}</TableCell>
                  <TableCell className="text-gray-400 text-xs max-w-48 truncate">
                    {item.testing_procedures}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MasterChecklistSection;
