-- Enable RLS on auth_user_audit table
ALTER TABLE auth_user_audit ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
$$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view audit logs" ON auth_user_audit;
DROP POLICY IF EXISTS "Service role can insert audit logs" ON auth_user_audit;

-- Admin-only audit log access
CREATE POLICY "Admins can view audit logs"
ON auth_user_audit
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Service role can insert
CREATE POLICY "Service role can insert audit logs"
ON auth_user_audit
FOR INSERT
TO service_role
WITH CHECK (true);

-- Create anonymized leaderboard function
CREATE OR REPLACE FUNCTION public.get_anonymized_leaderboard(limit_count INT DEFAULT 10)
RETURNS TABLE(
  rank BIGINT,
  tokens_earned INT,
  total_appreciations INT,
  is_current_user BOOLEAN
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  WITH ranked_users AS (
    SELECT 
      user_id,
      tokens_earned,
      total_appreciations,
      ROW_NUMBER() OVER (ORDER BY tokens_earned DESC) as rank
    FROM insight_tokens
    WHERE tokens_earned > 0
  )
  SELECT 
    rank,
    tokens_earned,
    total_appreciations,
    (user_id = auth.uid()) as is_current_user
  FROM ranked_users
  WHERE rank <= limit_count
  ORDER BY rank;
$$;

GRANT EXECUTE ON FUNCTION public.get_anonymized_leaderboard(INT) TO authenticated;