import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Shield, AlertTriangle } from 'lucide-react';
import type { RiskAssessment } from '@/hooks/useHIPAACompliance';
import type { UseMutationResult } from '@tanstack/react-query';

interface RiskAssessmentSectionProps {
  riskAssessments: RiskAssessment[];
  addRiskAssessment: UseMutationResult<any, Error, any, unknown>;
}

const RiskAssessmentSection: React.FC<RiskAssessmentSectionProps> = ({ riskAssessments, addRiskAssessment }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    threat_vulnerability: '',
    likelihood: 'Medium',
    impact: 'Medium',
    risk_level: 'Medium',
    mitigation_plan: '',
    status: 'Identified',
    framework: 'Both',
    testing_procedures: '',
    evidence_required: '',
    owner: '',
  });

  const calculateRiskLevel = (likelihood: string, impact: string) => {
    const riskMatrix: Record<string, Record<string, string>> = {
      'Low': { 'Low': 'Low', 'Medium': 'Low', 'High': 'Medium', 'Critical': 'High' },
      'Medium': { 'Low': 'Low', 'Medium': 'Medium', 'High': 'High', 'Critical': 'High' },
      'High': { 'Low': 'Medium', 'Medium': 'High', 'High': 'High', 'Critical': 'Critical' },
      'Critical': { 'Low': 'High', 'Medium': 'High', 'High': 'Critical', 'Critical': 'Critical' },
    };
    return riskMatrix[likelihood]?.[impact] || 'Medium';
  };

  const handleLikelihoodChange = (likelihood: string) => {
    const risk_level = calculateRiskLevel(likelihood, formData.impact);
    setFormData(prev => ({ ...prev, likelihood, risk_level }));
  };

  const handleImpactChange = (impact: string) => {
    const risk_level = calculateRiskLevel(formData.likelihood, impact);
    setFormData(prev => ({ ...prev, impact, risk_level }));
  };

  const handleSubmit = async () => {
    await addRiskAssessment.mutateAsync(formData);
    setFormData({
      threat_vulnerability: '',
      likelihood: 'Medium',
      impact: 'Medium',
      risk_level: 'Medium',
      mitigation_plan: '',
      status: 'Identified',
      framework: 'Both',
      testing_procedures: '',
      evidence_required: '',
      owner: '',
    });
    setDialogOpen(false);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Identified': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'Mitigating': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Accepted': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      case 'Resolved': return 'bg-green-500/20 text-green-300 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const criticalCount = riskAssessments.filter(r => r.risk_level === 'Critical' && r.status !== 'Resolved').length;
  const highCount = riskAssessments.filter(r => r.risk_level === 'High' && r.status !== 'Resolved').length;

  return (
    <div className="space-y-4">
      {/* Risk Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-purple-900/20 border border-purple-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-purple-400">{criticalCount}</div>
                <p className="text-xs text-gray-400">Critical Risks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-900/20 border border-red-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-red-400">{highCount}</div>
                <p className="text-xs text-gray-400">High Risks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#B87333]" />
              <div>
                <div className="text-2xl font-bold text-white">{riskAssessments.length}</div>
                <p className="text-xs text-gray-400">Total Assessments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-900/20 border border-green-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {riskAssessments.filter(r => r.status === 'Resolved').length}
                </div>
                <p className="text-xs text-gray-400">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Register */}
      <Card className="bg-gray-800/50 border border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">Risk Register</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#B87333] hover:bg-[#A06830] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Risk Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>New Risk Assessment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Threat/Vulnerability</Label>
                  <Textarea
                    value={formData.threat_vulnerability}
                    onChange={(e) => setFormData(prev => ({ ...prev, threat_vulnerability: e.target.value }))}
                    placeholder="Describe the threat or vulnerability..."
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Likelihood</Label>
                    <Select value={formData.likelihood} onValueChange={handleLikelihoodChange}>
                      <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Impact</Label>
                    <Select value={formData.impact} onValueChange={handleImpactChange}>
                      <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <Label className="text-gray-300">Calculated Risk Level:</Label>
                  <Badge className={`ml-2 ${getRiskBadge(formData.risk_level)}`} variant="outline">
                    {formData.risk_level}
                  </Badge>
                </div>
                <div>
                  <Label className="text-gray-300">Framework</Label>
                  <Select value={formData.framework} onValueChange={(val) => setFormData(prev => ({ ...prev, framework: val }))}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="HIPAA">HIPAA</SelectItem>
                      <SelectItem value="SOC2">SOC 2</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Mitigation Plan</Label>
                  <Textarea
                    value={formData.mitigation_plan}
                    onChange={(e) => setFormData(prev => ({ ...prev, mitigation_plan: e.target.value }))}
                    placeholder="Describe the mitigation strategy..."
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Owner</Label>
                  <Input
                    value={formData.owner}
                    onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                    placeholder="Responsible person/team"
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!formData.threat_vulnerability || addRiskAssessment.isPending}
                  className="w-full bg-[#B87333] hover:bg-[#A06830]"
                >
                  {addRiskAssessment.isPending ? 'Adding...' : 'Add Risk Assessment'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Threat/Vulnerability</TableHead>
                  <TableHead className="text-gray-300">Risk Level</TableHead>
                  <TableHead className="text-gray-300">Framework</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Owner</TableHead>
                  <TableHead className="text-gray-300">Mitigation Plan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskAssessments.map(risk => (
                  <TableRow key={risk.id} className="border-gray-700">
                    <TableCell className="text-white text-sm max-w-xs">
                      <div className="truncate">{risk.threat_vulnerability}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskBadge(risk.risk_level)} variant="outline">
                        {risk.risk_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{risk.framework}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(risk.status)} variant="outline">
                        {risk.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">{risk.owner || '-'}</TableCell>
                    <TableCell className="text-gray-400 text-sm max-w-xs truncate">
                      {risk.mitigation_plan || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentSection;
