import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  required_addressable: string;
  risk_level: string;
  frequency: string;
  assigned_to: string | null;
  testing_procedures: string | null;
  evidence_required: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WeeklyAuditLog {
  id: string;
  week_ending: string;
  completed_by: string;
  completed_by_id: string | null;
  checklist_item_id: string | null;
  category: string;
  item: string;
  status: string;
  notes: string | null;
  evidence_link: string | null;
  created_at: string;
}

export interface RemediationItem {
  id: string;
  issue: string;
  category: string;
  risk_level: string;
  assigned_to: string | null;
  due_date: string | null;
  status: string;
  notes: string | null;
  evidence_link: string | null;
  resolution_verification: string | null;
  weekly_audit_log_id: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

export interface RiskAssessment {
  id: string;
  threat_vulnerability: string;
  likelihood: string;
  impact: string;
  risk_level: string;
  mitigation_plan: string | null;
  status: string;
  framework: string;
  testing_procedures: string | null;
  evidence_required: string | null;
  owner: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditChangeLog {
  id: string;
  user_id: string | null;
  editor_name: string;
  change_description: string;
  reason: string | null;
  affected_table: string | null;
  affected_record_id: string | null;
  created_at: string;
}

export interface AuditReport {
  id: string;
  report_type: string;
  report_name: string;
  generated_by: string | null;
  generated_by_name: string | null;
  period_start: string | null;
  period_end: string | null;
  content: any;
  summary: any;
  status: string;
  created_at: string;
}

export interface ComplianceMetrics {
  hipaaCompliance: number;
  soc2Compliance: number;
  totalItems: number;
  passedItems: number;
  failedItems: number;
  pendingItems: number;
  highRiskOpen: number;
  mediumRiskOpen: number;
  lowRiskOpen: number;
  overdueRemediations: number;
  soc2ReadinessScore: number;
}

export const useHIPAACompliance = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  // Fetch master checklist
  const { data: checklist = [], isLoading: checklistLoading } = useQuery({
    queryKey: ['hipaa-checklist'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hipaa_soc2_master_checklist')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data as ChecklistItem[];
    },
  });

  // Fetch weekly audit logs
  const { data: auditLogs = [], isLoading: auditLogsLoading } = useQuery({
    queryKey: ['weekly-audit-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('weekly_audit_logs')
        .select('*')
        .order('week_ending', { ascending: false })
        .limit(500);
      
      if (error) throw error;
      return data as WeeklyAuditLog[];
    },
  });

  // Fetch remediation items
  const { data: remediations = [], isLoading: remediationsLoading } = useQuery({
    queryKey: ['remediation-tracker'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('remediation_tracker')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as RemediationItem[];
    },
  });

  // Fetch risk assessments
  const { data: riskAssessments = [], isLoading: riskAssessmentsLoading } = useQuery({
    queryKey: ['hipaa-risk-assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hipaa_risk_assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as RiskAssessment[];
    },
  });

  // Fetch change log
  const { data: changeLog = [], isLoading: changeLogLoading } = useQuery({
    queryKey: ['hipaa-change-log'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hipaa_audit_change_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      
      if (error) throw error;
      return data as AuditChangeLog[];
    },
  });

  // Fetch audit reports
  const { data: auditReports = [], isLoading: auditReportsLoading } = useQuery({
    queryKey: ['hipaa-audit-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hipaa_audit_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AuditReport[];
    },
  });

  // Calculate compliance metrics
  const calculateMetrics = (): ComplianceMetrics => {
    const currentWeek = new Date();
    currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
    const weekStr = currentWeek.toISOString().split('T')[0];

    const currentWeekLogs = auditLogs.filter(log => log.week_ending >= weekStr);
    const hipaaLogs = currentWeekLogs.filter(log => log.category.startsWith('HIPAA'));
    const soc2Logs = currentWeekLogs.filter(log => log.category.startsWith('SOC2'));

    const hipaaPass = hipaaLogs.filter(log => log.status === 'Pass').length;
    const soc2Pass = soc2Logs.filter(log => log.status === 'Pass').length;

    const openRemediations = remediations.filter(r => r.status !== 'Closed');
    const overdueRemediations = openRemediations.filter(r => {
      if (!r.due_date) return false;
      return new Date(r.due_date) < new Date();
    }).length;

    // Calculate SOC 2 readiness (% of SOC2 items tested in last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const soc2Checklist = checklist.filter(item => item.category.startsWith('SOC2'));
    const testedSoc2Items = new Set(
      auditLogs
        .filter(log => log.category.startsWith('SOC2') && new Date(log.created_at) >= sixMonthsAgo)
        .map(log => log.checklist_item_id)
    ).size;
    const soc2ReadinessScore = soc2Checklist.length > 0 
      ? Math.round((testedSoc2Items / soc2Checklist.length) * 100) 
      : 0;

    return {
      hipaaCompliance: hipaaLogs.length > 0 ? Math.round((hipaaPass / hipaaLogs.length) * 100) : 100,
      soc2Compliance: soc2Logs.length > 0 ? Math.round((soc2Pass / soc2Logs.length) * 100) : 100,
      totalItems: currentWeekLogs.length,
      passedItems: currentWeekLogs.filter(log => log.status === 'Pass').length,
      failedItems: currentWeekLogs.filter(log => log.status === 'Fail').length,
      pendingItems: currentWeekLogs.filter(log => log.status === 'Pending' || log.status === 'Needs Remediation').length,
      highRiskOpen: openRemediations.filter(r => r.risk_level === 'High').length,
      mediumRiskOpen: openRemediations.filter(r => r.risk_level === 'Medium').length,
      lowRiskOpen: openRemediations.filter(r => r.risk_level === 'Low').length,
      overdueRemediations,
      soc2ReadinessScore,
    };
  };

  // Add audit log entry
  const addAuditLog = useMutation({
    mutationFn: async (log: Omit<WeeklyAuditLog, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('weekly_audit_logs')
        .insert(log)
        .select()
        .single();
      
      if (error) throw error;

      // Auto-create remediation for failures
      if (log.status === 'Fail' || log.status === 'Needs Remediation') {
        await supabase.from('remediation_tracker').insert({
          issue: log.item,
          category: log.category,
          risk_level: checklist.find(c => c.id === log.checklist_item_id)?.risk_level || 'Medium',
          weekly_audit_log_id: data.id,
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        });
      }

      // Log the change
      await supabase.from('hipaa_audit_change_log').insert({
        user_id: user?.id,
        editor_name: user?.email || 'Unknown',
        change_description: `Added audit log: ${log.item} - ${log.status}`,
        affected_table: 'weekly_audit_logs',
        affected_record_id: data.id,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weekly-audit-logs'] });
      queryClient.invalidateQueries({ queryKey: ['remediation-tracker'] });
      queryClient.invalidateQueries({ queryKey: ['hipaa-change-log'] });
      toast.success('Audit log added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add audit log');
      console.error('Error adding audit log:', error);
    },
  });

  // Update remediation status
  const updateRemediation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<RemediationItem> }) => {
      const { data, error } = await supabase
        .from('remediation_tracker')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
          closed_at: updates.status === 'Closed' ? new Date().toISOString() : null,
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;

      await supabase.from('hipaa_audit_change_log').insert({
        user_id: user?.id,
        editor_name: user?.email || 'Unknown',
        change_description: `Updated remediation: ${data.issue} - ${updates.status || 'modified'}`,
        affected_table: 'remediation_tracker',
        affected_record_id: id,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['remediation-tracker'] });
      queryClient.invalidateQueries({ queryKey: ['hipaa-change-log'] });
      toast.success('Remediation updated');
    },
    onError: (error) => {
      toast.error('Failed to update remediation');
      console.error('Error updating remediation:', error);
    },
  });

  // Add risk assessment
  const addRiskAssessment = useMutation({
    mutationFn: async (assessment: Omit<RiskAssessment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('hipaa_risk_assessments')
        .insert(assessment)
        .select()
        .single();
      
      if (error) throw error;

      await supabase.from('hipaa_audit_change_log').insert({
        user_id: user?.id,
        editor_name: user?.email || 'Unknown',
        change_description: `Added risk assessment: ${assessment.threat_vulnerability}`,
        affected_table: 'hipaa_risk_assessments',
        affected_record_id: data.id,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hipaa-risk-assessments'] });
      queryClient.invalidateQueries({ queryKey: ['hipaa-change-log'] });
      toast.success('Risk assessment added');
    },
    onError: (error) => {
      toast.error('Failed to add risk assessment');
      console.error('Error adding risk assessment:', error);
    },
  });

  // Generate audit report
  const generateReport = useMutation({
    mutationFn: async (reportData: { type: string; name: string; periodStart: string; periodEnd: string }) => {
      const periodLogs = auditLogs.filter(
        log => log.week_ending >= reportData.periodStart && log.week_ending <= reportData.periodEnd
      );

      const summary = {
        totalAudits: periodLogs.length,
        passed: periodLogs.filter(l => l.status === 'Pass').length,
        failed: periodLogs.filter(l => l.status === 'Fail').length,
        needsRemediation: periodLogs.filter(l => l.status === 'Needs Remediation').length,
        byCategory: checklist.reduce((acc, item) => {
          const categoryLogs = periodLogs.filter(l => l.category === item.category);
          if (!acc[item.category]) {
            acc[item.category] = { total: 0, passed: 0, failed: 0 };
          }
          acc[item.category].total += categoryLogs.length;
          acc[item.category].passed += categoryLogs.filter(l => l.status === 'Pass').length;
          acc[item.category].failed += categoryLogs.filter(l => l.status === 'Fail').length;
          return acc;
        }, {} as Record<string, { total: number; passed: number; failed: number }>),
        openRemediations: remediations.filter(r => r.status !== 'Closed').length,
        riskAssessments: riskAssessments.length,
      };

      const { data, error } = await supabase
        .from('hipaa_audit_reports')
        .insert([{
          report_type: reportData.type,
          report_name: reportData.name,
          generated_by: user?.id,
          generated_by_name: user?.email,
          period_start: reportData.periodStart,
          period_end: reportData.periodEnd,
          content: { logs: periodLogs, remediations, riskAssessments } as any,
          summary: summary as any,
          status: 'Final',
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hipaa-audit-reports'] });
      toast.success('Report generated successfully');
    },
    onError: (error) => {
      toast.error('Failed to generate report');
      console.error('Error generating report:', error);
    },
  });

  // Get trend data for charts
  const getTrendData = () => {
    const weeks: Record<string, { week: string; hipaaPass: number; hipaaFail: number; soc2Pass: number; soc2Fail: number }> = {};
    
    auditLogs.forEach(log => {
      const week = log.week_ending;
      if (!weeks[week]) {
        weeks[week] = { week, hipaaPass: 0, hipaaFail: 0, soc2Pass: 0, soc2Fail: 0 };
      }
      
      if (log.category.startsWith('HIPAA')) {
        if (log.status === 'Pass') weeks[week].hipaaPass++;
        else if (log.status === 'Fail') weeks[week].hipaaFail++;
      } else if (log.category.startsWith('SOC2')) {
        if (log.status === 'Pass') weeks[week].soc2Pass++;
        else if (log.status === 'Fail') weeks[week].soc2Fail++;
      }
    });

    return Object.values(weeks).sort((a, b) => a.week.localeCompare(b.week)).slice(-12);
  };

  return {
    checklist,
    auditLogs,
    remediations,
    riskAssessments,
    changeLog,
    auditReports,
    metrics: calculateMetrics(),
    trendData: getTrendData(),
    isLoading: checklistLoading || auditLogsLoading || remediationsLoading || riskAssessmentsLoading || changeLogLoading || auditReportsLoading,
    addAuditLog,
    updateRemediation,
    addRiskAssessment,
    generateReport,
  };
};
