-- Create admin_sessions table for secure session management
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_token text UNIQUE NOT NULL,
  ip_address text,
  user_agent text,
  expires_at timestamp with time zone NOT NULL,
  last_activity timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admin_sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view their own sessions
CREATE POLICY "Admins can view own sessions"
  ON public.admin_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id AND has_role(auth.uid(), 'admin'));

-- Policy: Service role can manage sessions
CREATE POLICY "Service role can manage sessions"
  ON public.admin_sessions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON public.admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON public.admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON public.admin_sessions(expires_at);

-- Add indexes to auth_user_audit for better performance
CREATE INDEX IF NOT EXISTS idx_auth_user_audit_user_id ON public.auth_user_audit(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_user_audit_action ON public.auth_user_audit(action);
CREATE INDEX IF NOT EXISTS idx_auth_user_audit_created_at ON public.auth_user_audit(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_user_audit_operator ON public.auth_user_audit(operator);

-- Function to cleanup expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_admin_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.admin_sessions
  WHERE expires_at < NOW();
END;
$$;