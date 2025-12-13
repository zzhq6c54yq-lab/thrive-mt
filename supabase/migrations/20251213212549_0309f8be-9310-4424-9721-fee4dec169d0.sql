-- Create audit_checklist table for self-executing audit system
CREATE TABLE public.audit_checklist (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  row_number integer NOT NULL,
  module text NOT NULL,
  feature text NOT NULL,
  scenario text NOT NULL,
  expected_outcome text NOT NULL,
  backend_check text,
  frontend_check text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'pass', 'fail', 'manual_required', 'skipped', 'running')),
  notes text,
  error_details jsonb,
  execution_time_ms integer,
  tester text,
  tested_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  automation_type text DEFAULT 'automated' CHECK (automation_type IN ('automated', 'semi_automated', 'manual')),
  priority text DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  category text,
  subcategory text,
  related_table text,
  related_function text,
  device_type text,
  browser text,
  is_regression boolean DEFAULT false,
  last_pass_at timestamp with time zone,
  failure_count integer DEFAULT 0
);

-- Create index for efficient querying
CREATE INDEX idx_audit_checklist_status ON public.audit_checklist(status);
CREATE INDEX idx_audit_checklist_module ON public.audit_checklist(module);
CREATE INDEX idx_audit_checklist_priority ON public.audit_checklist(priority);
CREATE INDEX idx_audit_checklist_category ON public.audit_checklist(category);
CREATE INDEX idx_audit_checklist_automation_type ON public.audit_checklist(automation_type);

-- Enable RLS
ALTER TABLE public.audit_checklist ENABLE ROW LEVEL SECURITY;

-- Only admins can view and manage audit checklist
CREATE POLICY "Admins can manage audit checklist"
ON public.audit_checklist
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Create audit_runs table to track execution batches
CREATE TABLE public.audit_runs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  run_name text NOT NULL,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  status text DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'cancelled')),
  total_tests integer DEFAULT 0,
  passed_tests integer DEFAULT 0,
  failed_tests integer DEFAULT 0,
  manual_tests integer DEFAULT 0,
  skipped_tests integer DEFAULT 0,
  run_by uuid REFERENCES auth.users(id),
  run_by_email text,
  notes text,
  filters jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit_runs
ALTER TABLE public.audit_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage audit runs"
ON public.audit_runs
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Create audit_run_results table to track individual test results per run
CREATE TABLE public.audit_run_results (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id uuid NOT NULL REFERENCES public.audit_runs(id) ON DELETE CASCADE,
  checklist_item_id uuid NOT NULL REFERENCES public.audit_checklist(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pass', 'fail', 'manual_required', 'skipped', 'error')),
  execution_time_ms integer,
  error_message text,
  error_details jsonb,
  screenshot_url text,
  logs jsonb,
  tested_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_run_results_run_id ON public.audit_run_results(run_id);
CREATE INDEX idx_audit_run_results_status ON public.audit_run_results(status);

-- Enable RLS on audit_run_results
ALTER TABLE public.audit_run_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage audit run results"
ON public.audit_run_results
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Create function to update updated_at
CREATE TRIGGER update_audit_checklist_updated_at
BEFORE UPDATE ON public.audit_checklist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();