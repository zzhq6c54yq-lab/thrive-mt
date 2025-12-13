import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Shield, 
  Database, 
  Users, 
  BookOpen,
  ExternalLink
} from 'lucide-react';

interface ChecklistItem {
  task: string;
  status: 'complete' | 'in-progress' | 'pending';
  notes: string;
}

interface ChecklistSection {
  title: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const checklistData: ChecklistSection[] = [
  {
    title: 'Policies & Documentation',
    icon: <FileText className="w-5 h-5" />,
    items: [
      { task: 'RLS policies on sensitive tables', status: 'complete', notes: '152+ tables with RLS' },
      { task: 'HIPAA Readiness Letter', status: 'complete', notes: 'HIPAA_READINESS.md' },
      { task: 'SOC 2 Readiness Map', status: 'complete', notes: 'SOC2_READINESS_MAP.md' },
      { task: 'BAA Checklist & Vendor List', status: 'complete', notes: 'BAA_STATUS.md' },
      { task: 'App Store Disclosure Text', status: 'pending', notes: 'Awaiting native app' },
      { task: 'Audit Procedures', status: 'complete', notes: 'AUDIT_PROCEDURES.md' },
    ]
  },
  {
    title: 'App & Platform Compliance',
    icon: <Shield className="w-5 h-5" />,
    items: [
      { task: 'Privacy compliance review', status: 'complete', notes: 'Terms versioning active' },
      { task: 'Encryption at rest/transit', status: 'complete', notes: 'AES-256 / TLS 1.3' },
      { task: 'User request handling', status: 'complete', notes: 'GDPR procedures' },
      { task: 'App Store submission review', status: 'pending', notes: 'Awaiting native app' },
      { task: 'Audit walkthrough simulation', status: 'pending', notes: 'Schedule Q1 2025' },
    ]
  },
  {
    title: 'Logging & Monitoring',
    icon: <Database className="w-5 h-5" />,
    items: [
      { task: 'Audit triggers on PHI tables', status: 'complete', notes: '39+ tables' },
      { task: 'Log retention policy', status: 'complete', notes: '7-year retention' },
      { task: 'Suspicious activity alerts', status: 'complete', notes: 'Sentry integration' },
    ]
  },
  {
    title: 'Vendor Management',
    icon: <ExternalLink className="w-5 h-5" />,
    items: [
      { task: 'Vendor security checklist', status: 'complete', notes: 'In BAA_STATUS.md' },
      { task: 'Collect security documentation', status: 'in-progress', notes: 'Awaiting AI vendors' },
      { task: 'Verify contracts & BAAs', status: 'in-progress', notes: 'Supabase/Twilio done' },
    ]
  },
  {
    title: 'Internal Controls',
    icon: <Users className="w-5 h-5" />,
    items: [
      { task: 'PHI handling training', status: 'pending', notes: 'Schedule annual' },
      { task: 'Access control testing', status: 'complete', notes: 'RLS verified' },
      { task: 'Security scans', status: 'complete', notes: 'Linter clean' },
    ]
  },
  {
    title: 'Gap Analysis',
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      { task: 'Review audit findings', status: 'complete', notes: '1 warning remaining' },
      { task: 'Remediation timeline', status: 'complete', notes: 'In HIPAA doc' },
      { task: 'Audit package preparation', status: 'complete', notes: 'docs/compliance/' },
    ]
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'complete':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'in-progress':
      return <Clock className="w-4 h-4 text-yellow-400" />;
    case 'pending':
      return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'complete':
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Complete</Badge>;
    case 'in-progress':
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>;
    case 'pending':
      return <Badge variant="outline" className="text-muted-foreground">Pending</Badge>;
    default:
      return null;
  }
};

export default function AuditChecklistTab() {
  const totalItems = checklistData.reduce((sum, section) => sum + section.items.length, 0);
  const completedItems = checklistData.reduce(
    (sum, section) => sum + section.items.filter(item => item.status === 'complete').length,
    0
  );
  const inProgressItems = checklistData.reduce(
    (sum, section) => sum + section.items.filter(item => item.status === 'in-progress').length,
    0
  );
  const pendingItems = totalItems - completedItems - inProgressItems;
  const completionRate = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#D4A574]" />
          Audit Readiness Checklist
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          HIPAA + SOC 2 compliance preparation status
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 bg-card/50 border-border/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-medium text-foreground">Overall Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completedItems} of {totalItems} items complete
            </p>
          </div>
          <div className="text-3xl font-bold text-[#D4A574]">{completionRate}%</div>
        </div>
        <Progress value={completionRate} className="h-3" />
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-muted-foreground">{completedItems} Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{inProgressItems} In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{pendingItems} Pending</span>
          </div>
        </div>
      </Card>

      {/* Immediate Actions */}
      <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
        <h3 className="font-medium text-foreground flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Immediate Actions Required
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">1.</span>
            Enable Leaked Password Protection in Supabase Dashboard
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">2.</span>
            Obtain Together AI BAA or evaluate HIPAA-compliant alternatives
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400">3.</span>
            Confirm Resend HIPAA eligibility
          </li>
        </ul>
      </Card>

      {/* Checklist Sections */}
      <div className="space-y-4">
        {checklistData.map((section, sectionIndex) => {
          const sectionComplete = section.items.filter(i => i.status === 'complete').length;
          const sectionTotal = section.items.length;
          
          return (
            <Card key={sectionIndex} className="bg-card/50 border-border/50 overflow-hidden">
              <div className="p-4 border-b border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#B87333]/20 rounded-lg text-[#D4A574]">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {sectionComplete}/{sectionTotal} complete
                    </p>
                  </div>
                </div>
                <Progress 
                  value={(sectionComplete / sectionTotal) * 100} 
                  className="w-24 h-2"
                />
              </div>
              <div className="divide-y divide-border/30">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.task}</p>
                        <p className="text-xs text-muted-foreground">{item.notes}</p>
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Documentation Links */}
      <Card className="p-4 bg-card/50 border-border/50">
        <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4A574]" />
          Compliance Documentation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'HIPAA Readiness', path: 'docs/compliance/HIPAA_READINESS.md' },
            { name: 'SOC 2 Readiness Map', path: 'docs/compliance/SOC2_READINESS_MAP.md' },
            { name: 'BAA Status', path: 'docs/compliance/BAA_STATUS.md' },
            { name: 'Audit Procedures', path: 'docs/compliance/AUDIT_PROCEDURES.md' },
          ].map((doc) => (
            <div 
              key={doc.path}
              className="p-3 bg-muted/30 rounded-lg border border-border/30 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#D4A574]" />
              <div>
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{doc.path}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
