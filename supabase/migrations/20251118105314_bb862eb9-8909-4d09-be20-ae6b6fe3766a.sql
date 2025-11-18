-- Phase 1: Enhanced Operations & Compliance Database Schema

-- 1.1 Platform Metrics and Crisis Management
CREATE TABLE IF NOT EXISTS public.platform_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_type text NOT NULL, -- 'revenue', 'users', 'engagement', 'sessions'
  recorded_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crisis_escalations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  severity text NOT NULL CHECK (severity IN ('high', 'critical')),
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to uuid,
  notes text,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- 1.2 HIPAA Compliance Tables
CREATE TABLE IF NOT EXISTS public.data_access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accessor_id uuid NOT NULL,
  accessed_user_id uuid,
  data_type text NOT NULL, -- 'profile', 'session_notes', 'messages', 'bookings'
  access_reason text,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.compliance_violations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  violation_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  user_id uuid REFERENCES public.profiles(id),
  details jsonb,
  resolved boolean DEFAULT false,
  resolved_by uuid,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 1.3 Enhanced User Management - Add new columns to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS risk_level text DEFAULT 'low' CHECK (risk_level IN ('low', 'moderate', 'high')),
  ADD COLUMN IF NOT EXISTS financial_aid_eligible boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS financial_aid_amount numeric,
  ADD COLUMN IF NOT EXISTS last_activity_at timestamptz;

-- 1.4 Enhanced Therapist Management - Add new columns to therapists
ALTER TABLE public.therapists 
  ADD COLUMN IF NOT EXISTS license_expiry date,
  ADD COLUMN IF NOT EXISTS background_check_status text DEFAULT 'pending' CHECK (background_check_status IN ('pending', 'in_progress', 'approved', 'rejected')),
  ADD COLUMN IF NOT EXISTS max_caseload integer DEFAULT 30,
  ADD COLUMN IF NOT EXISTS current_caseload integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS burnout_risk_score numeric;

CREATE TABLE IF NOT EXISTS public.therapist_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid REFERENCES public.therapists(id) ON DELETE CASCADE,
  credential_type text NOT NULL,
  file_url text NOT NULL,
  verified boolean DEFAULT false,
  verified_by uuid,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.platform_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_credentials ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Admin-only access)
-- Platform Metrics
CREATE POLICY "Admins can view platform metrics"
  ON public.platform_metrics FOR SELECT
  USING (is_admin());

CREATE POLICY "Service role can insert platform metrics"
  ON public.platform_metrics FOR INSERT
  WITH CHECK (true);

-- Crisis Escalations
CREATE POLICY "Admins can view crisis escalations"
  ON public.crisis_escalations FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update crisis escalations"
  ON public.crisis_escalations FOR UPDATE
  USING (is_admin());

CREATE POLICY "Service role can insert crisis escalations"
  ON public.crisis_escalations FOR INSERT
  WITH CHECK (true);

-- Data Access Logs
CREATE POLICY "Admins can view data access logs"
  ON public.data_access_logs FOR SELECT
  USING (is_admin());

CREATE POLICY "Service role can insert data access logs"
  ON public.data_access_logs FOR INSERT
  WITH CHECK (true);

-- Compliance Violations
CREATE POLICY "Admins can view compliance violations"
  ON public.compliance_violations FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update compliance violations"
  ON public.compliance_violations FOR UPDATE
  USING (is_admin());

CREATE POLICY "Service role can insert compliance violations"
  ON public.compliance_violations FOR INSERT
  WITH CHECK (true);

-- Therapist Credentials
CREATE POLICY "Admins can view therapist credentials"
  ON public.therapist_credentials FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert therapist credentials"
  ON public.therapist_credentials FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update therapist credentials"
  ON public.therapist_credentials FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete therapist credentials"
  ON public.therapist_credentials FOR DELETE
  USING (is_admin());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_platform_metrics_recorded_at ON public.platform_metrics(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_platform_metrics_type ON public.platform_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_crisis_escalations_status ON public.crisis_escalations(status);
CREATE INDEX IF NOT EXISTS idx_crisis_escalations_user_id ON public.crisis_escalations(user_id);
CREATE INDEX IF NOT EXISTS idx_data_access_logs_accessor_id ON public.data_access_logs(accessor_id);
CREATE INDEX IF NOT EXISTS idx_data_access_logs_created_at ON public.data_access_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_compliance_violations_resolved ON public.compliance_violations(resolved);
CREATE INDEX IF NOT EXISTS idx_therapist_credentials_therapist_id ON public.therapist_credentials(therapist_id);