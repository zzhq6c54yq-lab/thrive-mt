-- Phase 1: Provider Assignments System
CREATE TABLE IF NOT EXISTS public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_type text NOT NULL CHECK (provider_type IN ('therapist', 'coach')),
  organization_id uuid REFERENCES public.tenants(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'ended')),
  assigned_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (patient_id, provider_id, provider_type)
);

-- RLS for assignments
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view their own assignments"
ON public.assignments FOR SELECT
USING (auth.uid() = patient_id);

CREATE POLICY "Providers can view assignments they manage"
ON public.assignments FOR SELECT
USING (auth.uid() = provider_id);

CREATE POLICY "Providers can create assignments"
ON public.assignments FOR INSERT
WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Providers can update their assignments"
ON public.assignments FOR UPDATE
USING (auth.uid() = provider_id);

CREATE POLICY "Admins can manage all assignments"
ON public.assignments FOR ALL
USING (is_admin());

-- Phase 2: Homework & Self-Help Tasks
CREATE TABLE IF NOT EXISTS public.homework_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assigned_by uuid NOT NULL REFERENCES public.profiles(id),
  assigned_to uuid NOT NULL REFERENCES public.profiles(id),
  organization_id uuid REFERENCES public.tenants(id),
  title text NOT NULL,
  description text,
  task_type text CHECK (task_type IN ('journal', 'exercise', 'reading', 'activity', 'assessment', 'meditation', 'custom')) DEFAULT 'custom',
  due_date date,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  resources jsonb DEFAULT '[]',
  completed_at timestamptz,
  completion_notes text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS for homework_tasks
ALTER TABLE public.homework_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their assigned tasks"
ON public.homework_tasks FOR SELECT
USING (auth.uid() = assigned_to);

CREATE POLICY "Providers can view tasks they assigned"
ON public.homework_tasks FOR SELECT
USING (auth.uid() = assigned_by);

CREATE POLICY "Providers can create tasks"
ON public.homework_tasks FOR INSERT
WITH CHECK (auth.uid() = assigned_by);

CREATE POLICY "Providers can update tasks they assigned"
ON public.homework_tasks FOR UPDATE
USING (auth.uid() = assigned_by);

CREATE POLICY "Users can update their own task status"
ON public.homework_tasks FOR UPDATE
USING (auth.uid() = assigned_to);

CREATE POLICY "Admins can manage all tasks"
ON public.homework_tasks FOR ALL
USING (is_admin());

-- Phase 3: AI Session Summaries
CREATE TABLE IF NOT EXISTS public.ai_session_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.henry_conversations(id),
  user_id uuid NOT NULL REFERENCES public.profiles(id),
  therapist_id uuid REFERENCES public.therapists(id),
  summary_type text CHECK (summary_type IN ('weekly', 'monthly', 'session')) DEFAULT 'session',
  content text NOT NULL,
  key_topics text[],
  risk_flags text[],
  mood_trend text,
  generated_at timestamptz DEFAULT now(),
  reviewed_by uuid REFERENCES public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- RLS for ai_session_summaries
ALTER TABLE public.ai_session_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own summaries"
ON public.ai_session_summaries FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Therapists can view client summaries"
ON public.ai_session_summaries FOR SELECT
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Service role can manage summaries"
ON public.ai_session_summaries FOR ALL
USING (true)
WITH CHECK (true);

-- Phase 5: Data Retention Policies
CREATE TABLE IF NOT EXISTS public.data_retention_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.tenants(id),
  data_type text NOT NULL,
  retention_days integer NOT NULL DEFAULT 2555,
  auto_purge boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS for data_retention_policies
ALTER TABLE public.data_retention_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage retention policies"
ON public.data_retention_policies FOR ALL
USING (is_admin());

-- Add soft delete columns to sensitive tables
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- Triggers for updated_at
CREATE TRIGGER update_assignments_updated_at
BEFORE UPDATE ON public.assignments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_homework_tasks_updated_at
BEFORE UPDATE ON public.homework_tasks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_retention_policies_updated_at
BEFORE UPDATE ON public.data_retention_policies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();