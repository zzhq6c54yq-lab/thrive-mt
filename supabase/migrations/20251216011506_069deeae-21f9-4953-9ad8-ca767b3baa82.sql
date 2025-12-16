-- Create audit trigger function for PHI logging
CREATE OR REPLACE FUNCTION public.log_phi_audit()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_logs (
      action,
      table_name,
      record_id,
      old_data,
      new_data,
      user_id,
      actor_role
    ) VALUES (
      'UPDATE',
      TG_TABLE_NAME,
      NEW.id::text,
      to_jsonb(OLD),
      to_jsonb(NEW),
      auth.uid(),
      COALESCE(current_setting('app.user_role', true), 'user')
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_logs (
      action,
      table_name,
      record_id,
      old_data,
      user_id,
      actor_role
    ) VALUES (
      'DELETE',
      TG_TABLE_NAME,
      OLD.id::text,
      to_jsonb(OLD),
      auth.uid(),
      COALESCE(current_setting('app.user_role', true), 'user')
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for therapy_bookings (UPDATE and DELETE)
DROP TRIGGER IF EXISTS audit_therapy_bookings_update ON public.therapy_bookings;
CREATE TRIGGER audit_therapy_bookings_update
  AFTER UPDATE ON public.therapy_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.log_phi_audit();

DROP TRIGGER IF EXISTS audit_therapy_bookings_delete ON public.therapy_bookings;
CREATE TRIGGER audit_therapy_bookings_delete
  AFTER DELETE ON public.therapy_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.log_phi_audit();

-- Create triggers for meditation_sessions (UPDATE and DELETE)
DROP TRIGGER IF EXISTS audit_meditation_sessions_update ON public.meditation_sessions;
CREATE TRIGGER audit_meditation_sessions_update
  AFTER UPDATE ON public.meditation_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.log_phi_audit();

DROP TRIGGER IF EXISTS audit_meditation_sessions_delete ON public.meditation_sessions;
CREATE TRIGGER audit_meditation_sessions_delete
  AFTER DELETE ON public.meditation_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.log_phi_audit();