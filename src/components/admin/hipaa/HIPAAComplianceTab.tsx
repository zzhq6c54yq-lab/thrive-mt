import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileText, ClipboardList, AlertTriangle, TrendingUp, Activity, History, FileCheck } from 'lucide-react';
import { useHIPAACompliance } from '@/hooks/useHIPAACompliance';
import SummaryMetricsSection from './SummaryMetricsSection';
import MasterChecklistSection from './MasterChecklistSection';
import WeeklyAuditSection from './WeeklyAuditSection';
import RemediationSection from './RemediationSection';
import TrendAnalysisSection from './TrendAnalysisSection';
import RiskAssessmentSection from './RiskAssessmentSection';
import ChangeLogSection from './ChangeLogSection';
import AuditReportingSection from './AuditReportingSection';

const HIPAAComplianceTab: React.FC = () => {
  const {
    checklist,
    auditLogs,
    remediations,
    riskAssessments,
    changeLog,
    auditReports,
    metrics,
    trendData,
    isLoading,
    addAuditLog,
    updateRemediation,
    addRiskAssessment,
    generateReport,
  } = useHIPAACompliance();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white text-lg">Loading HIPAA & SOC 2 Compliance System...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-[#B87333]" />
        <div>
          <h2 className="text-2xl font-bold text-white">HIPAA & SOC 2 Compliance</h2>
          <p className="text-gray-400 text-sm">Integrated audit system with 90+ compliance controls</p>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="flex flex-wrap gap-1 w-full bg-gray-800/50 border border-[#B87333]/30 p-2 h-auto">
          <TabsTrigger value="summary" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Summary</span>
          </TabsTrigger>
          <TabsTrigger value="checklist" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Checklist</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Weekly Audit</span>
          </TabsTrigger>
          <TabsTrigger value="remediation" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">Remediation</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Trends</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Risk</span>
          </TabsTrigger>
          <TabsTrigger value="changelog" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Change Log</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] px-3 py-1.5">
            <FileCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="summary">
            <SummaryMetricsSection metrics={metrics} />
          </TabsContent>

          <TabsContent value="checklist">
            <MasterChecklistSection checklist={checklist} />
          </TabsContent>

          <TabsContent value="weekly">
            <WeeklyAuditSection 
              checklist={checklist} 
              auditLogs={auditLogs} 
              addAuditLog={addAuditLog} 
            />
          </TabsContent>

          <TabsContent value="remediation">
            <RemediationSection 
              remediations={remediations} 
              updateRemediation={updateRemediation} 
            />
          </TabsContent>

          <TabsContent value="trends">
            <TrendAnalysisSection 
              trendData={trendData} 
              remediations={remediations}
              auditLogs={auditLogs}
            />
          </TabsContent>

          <TabsContent value="risk">
            <RiskAssessmentSection 
              riskAssessments={riskAssessments} 
              addRiskAssessment={addRiskAssessment} 
            />
          </TabsContent>

          <TabsContent value="changelog">
            <ChangeLogSection changeLog={changeLog} />
          </TabsContent>

          <TabsContent value="reports">
            <AuditReportingSection 
              auditReports={auditReports} 
              metrics={metrics}
              generateReport={generateReport} 
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HIPAAComplianceTab;
