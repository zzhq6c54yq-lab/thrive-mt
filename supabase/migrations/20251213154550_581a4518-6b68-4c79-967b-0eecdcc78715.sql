-- =============================================
-- EXPANDED PHI AUDIT TRIGGERS MIGRATION
-- Adds audit triggers to 20+ additional PHI tables
-- =============================================

-- Personal/Health Data Tables
CREATE TRIGGER phi_audit_chatbot_conversations
  AFTER INSERT OR UPDATE OR DELETE ON public.chatbot_conversations
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_coaching_sessions
  AFTER INSERT OR UPDATE OR DELETE ON public.coaching_sessions
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_gratitude_entries
  AFTER INSERT OR UPDATE OR DELETE ON public.gratitude_entries
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_sleep_tracker_entries
  AFTER INSERT OR UPDATE OR DELETE ON public.sleep_tracker_entries
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_sobriety_tracking
  AFTER INSERT OR UPDATE OR DELETE ON public.sobriety_tracking
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_user_health_connections
  AFTER INSERT OR UPDATE OR DELETE ON public.user_health_connections
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

-- Communication/Support Data Tables
CREATE TRIGGER phi_audit_buddy_messages
  AFTER INSERT OR UPDATE OR DELETE ON public.buddy_messages
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_community_group_messages
  AFTER INSERT OR UPDATE OR DELETE ON public.community_group_messages
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_sms_check_ins
  AFTER INSERT OR UPDATE OR DELETE ON public.sms_check_ins
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_sms_checkin_responses
  AFTER INSERT OR UPDATE OR DELETE ON public.sms_checkin_responses
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_sponsor_connections
  AFTER INSERT OR UPDATE OR DELETE ON public.sponsor_connections
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

-- Clinical Data Tables
CREATE TRIGGER phi_audit_homework_tasks
  AFTER INSERT OR UPDATE OR DELETE ON public.homework_tasks
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_therapy_sessions
  AFTER INSERT OR UPDATE OR DELETE ON public.therapy_sessions
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_support_circles
  AFTER INSERT OR UPDATE OR DELETE ON public.support_circles
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_support_circle_members
  AFTER INSERT OR UPDATE OR DELETE ON public.support_circle_members
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

-- Additional User Data Tables
CREATE TRIGGER phi_audit_buddy_matches
  AFTER INSERT OR UPDATE OR DELETE ON public.buddy_matches
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_binaural_sessions
  AFTER INSERT OR UPDATE OR DELETE ON public.binaural_sessions
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_breathing_sessions
  AFTER INSERT OR UPDATE OR DELETE ON public.breathing_sessions
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_art_therapy_gallery
  AFTER INSERT OR UPDATE OR DELETE ON public.art_therapy_gallery
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_career_assessments
  AFTER INSERT OR UPDATE OR DELETE ON public.career_assessments
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

CREATE TRIGGER phi_audit_barter_applications
  AFTER INSERT OR UPDATE OR DELETE ON public.barter_applications
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();

-- Audit Log for terms re-consent tracking
CREATE TRIGGER phi_audit_auth_user_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.auth_user_audit
  FOR EACH ROW EXECUTE FUNCTION public.log_phi_changes();