-- Create audit_logs table for HIPAA-compliant PHI access logging
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  actor_role text,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs (append-only for compliance)
CREATE POLICY "Admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (is_admin());

-- Service role can insert audit logs (for triggers)
CREATE POLICY "Service role can insert audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (true);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON public.audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

-- Create trigger function for logging PHI changes
CREATE OR REPLACE FUNCTION public.log_phi_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_logs(user_id, action, table_name, record_id, actor_role, old_data, created_at)
    VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      OLD.id,
      current_setting('request.jwt.claims', true)::jsonb->>'role',
      to_jsonb(OLD),
      now()
    );
    RETURN OLD;
  ELSE
    INSERT INTO public.audit_logs(user_id, action, table_name, record_id, actor_role, old_data, new_data, created_at)
    VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      NEW.id,
      current_setting('request.jwt.claims', true)::jsonb->>'role',
      CASE WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
      to_jsonb(NEW),
      now()
    );
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply triggers to PHI tables
CREATE TRIGGER audit_profiles_changes
AFTER INSERT OR UPDATE OR DELETE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_henry_conversations_changes
AFTER INSERT OR UPDATE OR DELETE ON public.henry_conversations
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_henry_messages_changes
AFTER INSERT OR UPDATE OR DELETE ON public.henry_messages
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_journal_entries_changes
AFTER INSERT OR UPDATE OR DELETE ON public.journal_entries
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_mood_entries_changes
AFTER INSERT OR UPDATE OR DELETE ON public.mood_entries
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_daily_check_ins_changes
AFTER INSERT OR UPDATE OR DELETE ON public.daily_check_ins
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_assessment_results_changes
AFTER INSERT OR UPDATE OR DELETE ON public.assessment_results
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_crisis_escalations_changes
AFTER INSERT OR UPDATE OR DELETE ON public.crisis_escalations
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_therapist_client_notes_changes
AFTER INSERT OR UPDATE OR DELETE ON public.therapist_client_notes
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_video_session_notes_changes
AFTER INSERT OR UPDATE OR DELETE ON public.video_session_notes
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER audit_therapy_bookings_changes
AFTER INSERT OR UPDATE OR DELETE ON public.therapy_bookings
FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

-- Add consent_accepted_at column to profiles if not exists
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS consent_accepted_at timestamptz,
ADD COLUMN IF NOT EXISTS terms_version text;