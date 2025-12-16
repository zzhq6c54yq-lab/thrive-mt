-- HIPAA & SOC 2 Audit System Database Schema

-- 1. Master HIPAA & SOC 2 Checklist
CREATE TABLE public.hipaa_soc2_master_checklist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  item text NOT NULL,
  required_addressable text DEFAULT 'Required',
  risk_level text DEFAULT 'Medium',
  frequency text DEFAULT 'Weekly',
  assigned_to text,
  testing_procedures text,
  evidence_required text,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Weekly Audit Logs
CREATE TABLE public.weekly_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_ending date NOT NULL,
  completed_by text NOT NULL,
  completed_by_id uuid REFERENCES auth.users(id),
  checklist_item_id uuid REFERENCES public.hipaa_soc2_master_checklist(id),
  category text NOT NULL,
  item text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  notes text,
  evidence_link text,
  created_at timestamptz DEFAULT now()
);

-- 3. Remediation Tracker
CREATE TABLE public.remediation_tracker (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issue text NOT NULL,
  category text NOT NULL,
  risk_level text NOT NULL DEFAULT 'Medium',
  assigned_to text,
  due_date date,
  status text DEFAULT 'Open',
  notes text,
  evidence_link text,
  resolution_verification text,
  weekly_audit_log_id uuid REFERENCES public.weekly_audit_logs(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  closed_at timestamptz
);

-- 4. Risk Assessments
CREATE TABLE public.hipaa_risk_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  threat_vulnerability text NOT NULL,
  likelihood text NOT NULL DEFAULT 'Medium',
  impact text NOT NULL DEFAULT 'Medium',
  risk_level text NOT NULL DEFAULT 'Medium',
  mitigation_plan text,
  status text DEFAULT 'Identified',
  framework text NOT NULL DEFAULT 'Both',
  testing_procedures text,
  evidence_required text,
  owner text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Audit Change Log
CREATE TABLE public.hipaa_audit_change_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  editor_name text NOT NULL,
  change_description text NOT NULL,
  reason text,
  affected_table text,
  affected_record_id uuid,
  created_at timestamptz DEFAULT now()
);

-- 6. Audit Reports
CREATE TABLE public.hipaa_audit_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type text NOT NULL,
  report_name text NOT NULL,
  generated_by uuid REFERENCES auth.users(id),
  generated_by_name text,
  period_start date,
  period_end date,
  content jsonb,
  summary jsonb,
  status text DEFAULT 'Draft',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hipaa_soc2_master_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.remediation_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hipaa_risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hipaa_audit_change_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hipaa_audit_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin only
CREATE POLICY "Admins can manage master checklist" ON public.hipaa_soc2_master_checklist FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage weekly audit logs" ON public.weekly_audit_logs FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage remediation tracker" ON public.remediation_tracker FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage risk assessments" ON public.hipaa_risk_assessments FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage audit change log" ON public.hipaa_audit_change_log FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage audit reports" ON public.hipaa_audit_reports FOR ALL USING (is_admin());

-- Seed the Master Checklist with 90+ items

-- HIPAA-Administrative Safeguards (20 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('HIPAA-Admin', 'HIPAA policies documented & up-to-date', 'Required', 'High', 'Weekly', 'Review policy versions; interview staff', 'Policy docs, revision logs', 'Overlaps SOC2-CC1 (integrity)'),
('HIPAA-Admin', 'Employee HIPAA training completed', 'Required', 'High', 'Weekly', 'Check completion rates; quiz staff', 'Certificates, training logs', 'Overlaps SOC2-CC5 (HR practices)'),
('HIPAA-Admin', 'Business Associate Agreements verified', 'Required', 'High', 'Monthly', 'Review contracts; audit vendor compliance', 'Signed BAAs, audit reports', 'Overlaps SOC2-Org (third-party commitments)'),
('HIPAA-Admin', 'Incident reporting process reviewed', 'Required', 'High', 'Weekly', 'Simulate incident; review logs', 'Incident reports, response drills', 'Overlaps SOC2-CC7 (system operations)'),
('HIPAA-Admin', 'Risk assessment performed & documented', 'Required', 'High', 'Quarterly', 'Conduct gap analysis; external review if needed', 'Risk reports, mitigation plans', 'Overlaps SOC2-CC3 (risk assessment)'),
('HIPAA-Admin', 'Sanctions for HIPAA violations enforced', 'Required', 'High', 'Quarterly', 'Review violation logs; apply policies', 'Sanction records, HR files', 'Overlaps SOC2-CC1 (ethical values)'),
('HIPAA-Admin', 'Security awareness program in place', 'Addressable', 'Medium', 'Weekly', 'Send reminders; phishing simulations', 'Email logs, simulation results', 'Overlaps SOC2-CC2 (communication)'),
('HIPAA-Admin', 'Audit trail review documented', 'Required', 'High', 'Weekly', 'Analyze logs for anomalies', 'Audit reports, findings docs', 'Overlaps SOC2-CC4 (monitoring)'),
('HIPAA-Admin', 'Contingency planning & disaster recovery policies documented', 'Required', 'High', 'Quarterly', 'Test plan; simulate recovery', 'Test results, plan docs', 'Overlaps SOC2-Availability'),
('HIPAA-Admin', 'Security Management Process: Risk analysis & management', 'Required', 'High', 'Quarterly', 'Internal/external assessment', 'Analysis reports', 'Overlaps SOC2-CC3'),
('HIPAA-Admin', 'Assigned Security Responsibility: Designate Security Officer', 'Required', 'High', 'Annual', 'Verify role assignment', 'Org chart, appointment letter', 'Overlaps SOC2-CC1'),
('HIPAA-Admin', 'Workforce Security: Authorization/supervision, clearance, termination', 'Addressable', 'Medium', 'Monthly', 'Background checks; access revocation', 'HR records, access logs', 'Overlaps SOC2-CC6 (access controls)'),
('HIPAA-Admin', 'Information Access Management: Access authorization/modification', 'Required', 'High', 'Weekly', 'Role-based access reviews', 'Access matrices, change logs', 'Overlaps SOC2-CC6'),
('HIPAA-Admin', 'Evaluation: Periodic technical/non-technical reviews', 'Required', 'Medium', 'Quarterly', 'Internal audits', 'Evaluation reports', 'Overlaps SOC2-CC4'),
('HIPAA-Admin', 'Privacy Officer designated', 'Required', 'High', 'Annual', 'Verify role assignment', 'Appointment letter', 'HIPAA Privacy Rule'),
('HIPAA-Admin', 'Minimum necessary standard applied', 'Required', 'High', 'Weekly', 'Review access levels', 'Access audit logs', 'Limit PHI exposure'),
('HIPAA-Admin', 'Patient rights procedures documented', 'Required', 'Medium', 'Monthly', 'Request simulations', 'Rights logs, procedures', 'Access, amendment, accounting'),
('HIPAA-Admin', 'Notice of Privacy Practices distributed', 'Required', 'Medium', 'Annual', 'Notice distribution verification', 'Distribution records', 'Patient awareness'),
('HIPAA-Admin', 'Complaint process established', 'Required', 'Medium', 'Quarterly', 'Complaint handling review', 'Complaint logs', 'Patient grievance handling'),
('HIPAA-Admin', 'Documentation retention policy (6 years)', 'Required', 'High', 'Annual', 'Retention audit', 'Retention schedule', 'HIPAA requirement');

-- HIPAA-Physical Safeguards (10 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('HIPAA-Physical', 'Secure workstations', 'Required', 'Medium', 'Weekly', 'Inspect locks/passwords', 'Inspection checklists', 'Overlaps SOC2-CC6 (physical access)'),
('HIPAA-Physical', 'Backup procedures checked', 'Required', 'High', 'Weekly', 'Verify encryption/integrity', 'Backup logs, test restores', 'Overlaps SOC2-Availability/Processing Integrity'),
('HIPAA-Physical', 'Device inventory maintained', 'Addressable', 'Medium', 'Monthly', 'Scan/update inventory', 'Inventory spreadsheets', 'Overlaps SOC2-CC7'),
('HIPAA-Physical', 'Secure disposal/shredding of PHI', 'Required', 'High', 'Weekly', 'Witness disposal; log processes', 'Disposal certificates', 'Overlaps SOC2-Confidentiality'),
('HIPAA-Physical', 'Server/hosting physical security confirmed', 'Addressable', 'High', 'Monthly', 'Review access logs', 'Facility audits', 'Overlaps SOC2-CC6'),
('HIPAA-Physical', 'Environmental controls in place (fire, water, etc.)', 'Addressable', 'Medium', 'Monthly', 'Monitor sensors', 'Monitoring reports', 'Overlaps SOC2-Availability'),
('HIPAA-Physical', 'Facility Access Controls: Contingency operations, security plan', 'Addressable', 'Medium', 'Monthly', 'Access simulations', 'Access logs', 'Overlaps SOC2-CC6'),
('HIPAA-Physical', 'Workstation Security: Physical safeguards', 'Required', 'Medium', 'Weekly', 'Physical inspections', 'Photos/checklists', 'Overlaps SOC2-CC6'),
('HIPAA-Physical', 'Device/Media Controls: Disposal, re-use, accountability', 'Required', 'High', 'Quarterly', 'Track media lifecycle', 'Accountability logs', 'Overlaps SOC2-Confidentiality'),
('HIPAA-Physical', 'Visitor access controls', 'Addressable', 'Low', 'Monthly', 'Review visitor logs', 'Sign-in sheets', 'Physical security');

-- HIPAA-Technical Safeguards (25 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('HIPAA-Technical', 'PHI encryption at rest', 'Addressable', 'High', 'Weekly', 'Test database samples', 'Encryption configs', 'Overlaps SOC2-CC6/Confidentiality'),
('HIPAA-Technical', 'PHI encryption in transit', 'Addressable', 'High', 'Weekly', 'Confirm HTTPS/TLS', 'Cert scans', 'Overlaps SOC2-CC6/Confidentiality'),
('HIPAA-Technical', 'Audit logs enabled & reviewed', 'Required', 'High', 'Weekly', 'Log analysis for anomalies', 'Review reports', 'Overlaps SOC2-CC4/CC7'),
('HIPAA-Technical', 'Session timeout / auto-logout', 'Addressable', 'Medium', 'Weekly', 'Test timeouts', 'Test screenshots', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Data integrity mechanisms in place', 'Addressable', 'Medium', 'Monthly', 'Verify hashing/checksums', 'Integrity tests', 'Overlaps SOC2-Processing Integrity'),
('HIPAA-Technical', 'Authentication & access controls enforced', 'Required', 'High', 'Weekly', '2FA tests; password audits', 'Auth logs', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Malware & threat detection active', 'Addressable', 'Medium', 'Weekly', 'Update/scan antivirus', 'Scan reports', 'Overlaps SOC2-CC7'),
('HIPAA-Technical', 'Emergency access / contingency plan tested', 'Required', 'High', 'Quarterly', 'Simulate access', 'Test results', 'Overlaps SOC2-Availability'),
('HIPAA-Technical', 'Penetration testing performed', 'Addressable', 'High', 'Quarterly', 'Run scans; remediate', 'Pen test reports', 'Overlaps SOC2-CC9'),
('HIPAA-Technical', 'Disaster recovery plan tested', 'Required', 'High', 'Quarterly', 'Full simulation', 'Recovery logs', 'Overlaps SOC2-Availability'),
('HIPAA-Technical', 'Secure remote access (VPN, endpoint security)', 'Addressable', 'High', 'Weekly', 'Connection tests', 'VPN logs', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Logging of all remote sessions', 'Required', 'High', 'Weekly', 'Review session logs', 'Log samples', 'Overlaps SOC2-CC4'),
('HIPAA-Technical', 'Secure API access / transmission checks', 'Addressable', 'High', 'Weekly', 'Endpoint reviews', 'API audits', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Backup & restore testing', 'Required', 'High', 'Monthly', 'Integrity verifies', 'Restore tests', 'Overlaps SOC2-Availability'),
('HIPAA-Technical', 'Encryption key management verified', 'Addressable', 'High', 'Monthly', 'Key rotation audits', 'Key mgmt docs', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Mobile device security policies enforced', 'Addressable', 'Medium', 'Weekly', 'Device compliance scans', 'Policy enforcement logs', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Vulnerability scanning & patch management', 'Addressable', 'High', 'Weekly', 'Scan/update systems', 'Scan reports', 'Overlaps SOC2-CC9'),
('HIPAA-Technical', 'Logging & monitoring of admin actions', 'Required', 'High', 'Weekly', 'Admin audit reviews', 'Monitoring dashboards', 'Overlaps SOC2-CC4'),
('HIPAA-Technical', 'Breach drill conducted', 'Required', 'High', 'Quarterly', 'Simulate/response timing', 'Drill reports', 'Overlaps SOC2-CC7'),
('HIPAA-Technical', 'Access Control: Unique ID, emergency access, auto-logoff', 'Required', 'High', 'Weekly', 'ID/access tests', 'Control configs', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Integrity: Authenticate ePHI', 'Addressable', 'Medium', 'Monthly', 'ePHI verification', 'Auth tests', 'Overlaps SOC2-Processing Integrity'),
('HIPAA-Technical', 'Person/Entity Authentication: Verify identity', 'Required', 'High', 'Weekly', 'ID checks', 'Verification logs', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Transmission Security: Integrity controls, encryption', 'Addressable', 'High', 'Weekly', 'Transmission tests', 'Security scans', 'Overlaps SOC2-CC6'),
('HIPAA-Technical', 'Automatic logoff configured', 'Addressable', 'Medium', 'Weekly', 'Test session timeouts', 'Config screenshots', '15-minute timeout recommended'),
('HIPAA-Technical', 'Unique user identification enforced', 'Required', 'High', 'Weekly', 'Review user accounts', 'Account audit', 'No shared accounts');

-- HIPAA-Privacy & Breach (10 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('HIPAA-Privacy', 'PHI use/disclosure policies documented', 'Required', 'High', 'Quarterly', 'Policy reviews', 'Policy docs', 'Overlaps SOC2-Privacy/Confidentiality'),
('HIPAA-Privacy', 'Patient rights: Access/amendment procedures', 'Required', 'Medium', 'Monthly', 'Request simulations', 'Rights logs', 'Overlaps SOC2-Privacy'),
('HIPAA-Privacy', 'Training on privacy completed', 'Required', 'High', 'Weekly', 'Training sessions', 'Attendance records', 'Overlaps SOC2-Privacy'),
('HIPAA-Privacy', 'Sanctions for privacy violations', 'Required', 'High', 'Quarterly', 'Violation handling', 'Sanction files', 'Overlaps SOC2-Privacy'),
('HIPAA-Privacy', 'Accounting of disclosures maintained', 'Required', 'Medium', 'Monthly', 'Review disclosure logs', 'Accounting records', 'Required for 6 years'),
('HIPAA-Breach', 'Risk assessment post-incident', 'Required', 'High', 'As Needed', 'Incident analysis', 'Assessment reports', 'Overlaps SOC2-CC7'),
('HIPAA-Breach', 'Notifications: Individuals (60 days)', 'Required', 'High', 'As Needed', 'Notification drills', 'Notification records', 'Overlaps SOC2-Privacy'),
('HIPAA-Breach', 'Notifications: HHS reporting', 'Required', 'High', 'As Needed', 'Report submission process', 'HHS submissions', 'Annual for < 500, immediate for >= 500'),
('HIPAA-Breach', 'Media notification (500+ affected)', 'Required', 'High', 'As Needed', 'Media notification plan', 'Press releases', 'State-specific requirements'),
('HIPAA-Breach', 'Breach documentation retained', 'Required', 'High', 'As Needed', 'Documentation review', 'Breach files', '6 year retention');

-- SOC2-Security Common Criteria (15 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('SOC2-Security', 'CC1: Control Environment - Commitment to integrity/ethical values', 'Required', 'High', 'Quarterly', 'Ethics surveys; board reviews', 'Policy docs, meeting minutes', 'Overlaps HIPAA-Admin (training/sanctions)'),
('SOC2-Security', 'CC1: Board independence and oversight', 'Required', 'Medium', 'Quarterly', 'Board meeting reviews', 'Meeting minutes', 'Governance structure'),
('SOC2-Security', 'CC2: Communication and Information - Internal/external comms', 'Required', 'Medium', 'Monthly', 'Comm audits', 'Email/policy distribution logs', 'Overlaps HIPAA-Admin (awareness)'),
('SOC2-Security', 'CC3: Risk Assessment - Identify/mitigate risks', 'Required', 'High', 'Quarterly', 'Risk workshops; external assessments', 'Risk registers, gap reports', 'Overlaps HIPAA-Risk Assessment'),
('SOC2-Security', 'CC3: Gap analysis performed', 'Required', 'High', 'Quarterly', 'Gap analysis review', 'Gap reports', 'Identifies control deficiencies'),
('SOC2-Security', 'CC4: Monitoring of Controls - Ongoing evaluations', 'Required', 'High', 'Weekly', 'Control testing; alert reviews', 'Monitoring dashboards, incident logs', 'Overlaps HIPAA-Audit trails'),
('SOC2-Security', 'CC4: Breakdowns notifications process', 'Required', 'High', 'Weekly', 'Alert system testing', 'Alert logs', 'Timely escalation'),
('SOC2-Security', 'CC5: Control Activities - Approvals, verifications', 'Required', 'Medium', 'Monthly', 'Activity sampling', 'Reconciliation reports', 'Overlaps HIPAA-Evaluations'),
('SOC2-Security', 'CC6: Logical and Physical Access Controls', 'Required', 'High', 'Weekly', 'Access reviews; 2FA tests', 'Access logs, firewall configs', 'Overlaps HIPAA-Physical/Technical'),
('SOC2-Security', 'CC6: Firewall and network security', 'Required', 'High', 'Weekly', 'Firewall rule review', 'Config exports', 'Network protection'),
('SOC2-Security', 'CC7: System Operations - Manage/maintain systems', 'Required', 'High', 'Weekly', 'Ops reviews; failover tests', 'Ops logs, incident responses', 'Overlaps HIPAA-Incident reporting'),
('SOC2-Security', 'CC8: Change Management - Manage IT changes', 'Required', 'High', 'As Needed', 'Change approvals; testing', 'Change tickets, post-change reviews', 'Overlaps HIPAA-Evaluations'),
('SOC2-Security', 'CC9: Risk Mitigation - Strategies to reduce risks', 'Required', 'High', 'Quarterly', 'Mitigation planning; pen tests', 'Mitigation plans, test reports', 'Overlaps HIPAA-Penetration testing'),
('SOC2-Security', 'Web application firewalls for CSRF/XSS/SQL injection', 'Addressable', 'High', 'Weekly', 'Vulnerability scans', 'Scan results', 'Overlaps HIPAA-Technical (threat detection)'),
('SOC2-Security', 'Network monitoring/intrusion detection with SIEM', 'Required', 'High', 'Weekly', 'Log analysis', 'SIEM dashboards', 'Overlaps HIPAA-Audit logs');

-- SOC2-Availability (5 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('SOC2-Availability', 'Controls for minimum service levels (uptime guarantees)', 'Addressable', 'Medium', 'Monthly', 'Uptime monitoring', 'SLA reports', 'Overlaps HIPAA-Contingency'),
('SOC2-Availability', 'Site failover and security incident handling', 'Addressable', 'High', 'Quarterly', 'Failover drills', 'Drill logs', 'Overlaps HIPAA-Disaster recovery'),
('SOC2-Availability', 'Capacity planning documented', 'Addressable', 'Medium', 'Quarterly', 'Resource utilization review', 'Capacity reports', 'Prevent service degradation'),
('SOC2-Availability', 'Backup and recovery procedures', 'Required', 'High', 'Weekly', 'Backup verification', 'Backup logs', 'Data availability'),
('SOC2-Availability', 'Business continuity plan tested', 'Required', 'High', 'Annual', 'BCP drill', 'Drill results', 'Operational resilience');

-- SOC2-Processing Integrity (5 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('SOC2-Processing', 'Data processing complete, valid, accurate, timely', 'Addressable', 'Medium', 'Monthly', 'Data validation tests', 'Processing logs', 'Overlaps HIPAA-Integrity'),
('SOC2-Processing', 'Respond to individual data rights requests', 'Addressable', 'Medium', 'As Needed', 'Rights request handling', 'Request records', 'Overlaps HIPAA-Patient rights'),
('SOC2-Processing', 'Input validation controls', 'Required', 'High', 'Weekly', 'Input testing', 'Validation logs', 'Prevent bad data'),
('SOC2-Processing', 'Error handling procedures', 'Required', 'Medium', 'Weekly', 'Error log review', 'Error reports', 'Data quality'),
('SOC2-Processing', 'Data quality monitoring', 'Addressable', 'Medium', 'Monthly', 'Quality metrics review', 'Quality reports', 'Ongoing accuracy');

-- SOC2-Confidentiality (5 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('SOC2-Confidentiality', 'Workforce training on PHI use/disclosure', 'Addressable', 'High', 'Weekly', 'Training audits', 'Training materials', 'Overlaps HIPAA-Privacy'),
('SOC2-Confidentiality', 'Data encrypted at rest/in transit', 'Addressable', 'High', 'Weekly', 'Encryption verifies', 'Config audits', 'Overlaps HIPAA-Encryption'),
('SOC2-Confidentiality', 'Data classification scheme', 'Required', 'High', 'Quarterly', 'Classification review', 'Classification docs', 'Know your data'),
('SOC2-Confidentiality', 'Data retention and disposal', 'Required', 'High', 'Monthly', 'Retention audit', 'Disposal records', 'Secure lifecycle'),
('SOC2-Confidentiality', 'Third-party data handling agreements', 'Required', 'High', 'Monthly', 'Agreement review', 'Signed agreements', 'Vendor management');

-- SOC2-Privacy (10 items)
INSERT INTO public.hipaa_soc2_master_checklist (category, item, required_addressable, risk_level, frequency, testing_procedures, evidence_required, notes) VALUES
('SOC2-Privacy', 'Define/document privacy policies for PHI', 'Addressable', 'High', 'Quarterly', 'Policy reviews', 'Policy docs', 'Overlaps HIPAA-Privacy policies'),
('SOC2-Privacy', 'Policy governance/accountability process', 'Addressable', 'High', 'Quarterly', 'Governance audits', 'Process flows', 'Overlaps HIPAA-Privacy Officer'),
('SOC2-Privacy', 'Identify/classify/prioritize PHI criticality', 'Addressable', 'High', 'Monthly', 'Classification scans', 'Risk assessments', 'Overlaps HIPAA-Risk assessment'),
('SOC2-Privacy', 'Prevent/detect/address/notify on breaches', 'Addressable', 'High', 'As Needed', 'Breach simulations', 'Incident plans', 'Overlaps HIPAA-Breach notification'),
('SOC2-Privacy', 'Obtain explicit/implicit consent', 'Addressable', 'High', 'As Needed', 'Consent audits', 'Consent forms', 'Overlaps HIPAA-Patient rights'),
('SOC2-Privacy', 'Limit uses/disclosures to Notice', 'Addressable', 'High', 'Weekly', 'Retention audits', 'Disposal logs', 'Overlaps HIPAA-Confidentiality'),
('SOC2-Privacy', 'Grant access/review/copies of PHI', 'Addressable', 'Medium', 'As Needed', 'Access request tests', 'Request handling logs', 'Overlaps HIPAA-Patient rights'),
('SOC2-Privacy', 'Correct/amend/append PHI', 'Addressable', 'Medium', 'As Needed', 'Amendment simulations', 'Amendment records', 'Overlaps HIPAA-Patient rights'),
('SOC2-Privacy', 'Third-party privacy commitments', 'Addressable', 'High', 'Monthly', 'Vendor audits', 'Commitment docs, assessments', 'Overlaps HIPAA-BAAs'),
('SOC2-Privacy', 'Process for inquiries/complaints', 'Addressable', 'Medium', 'Monthly', 'Complaint handling', 'Complaint logs', 'Overlaps HIPAA-Patient rights');

-- Create indexes for performance
CREATE INDEX idx_weekly_audit_logs_week ON public.weekly_audit_logs(week_ending);
CREATE INDEX idx_weekly_audit_logs_status ON public.weekly_audit_logs(status);
CREATE INDEX idx_remediation_tracker_status ON public.remediation_tracker(status);
CREATE INDEX idx_remediation_tracker_risk ON public.remediation_tracker(risk_level);
CREATE INDEX idx_hipaa_checklist_category ON public.hipaa_soc2_master_checklist(category);
CREATE INDEX idx_hipaa_checklist_risk ON public.hipaa_soc2_master_checklist(risk_level);