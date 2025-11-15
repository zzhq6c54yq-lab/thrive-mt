-- Create reset tokens table for therapist access resets
CREATE TABLE IF NOT EXISTS therapist_access_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  is_valid BOOLEAN DEFAULT true
);

-- Indexes for faster lookups
CREATE INDEX idx_reset_tokens_token ON therapist_access_reset_tokens(token);
CREATE INDEX idx_reset_tokens_ip ON therapist_access_reset_tokens(ip_address);
CREATE INDEX idx_reset_tokens_expires ON therapist_access_reset_tokens(expires_at);

-- Enable RLS
ALTER TABLE therapist_access_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Service role full access policy
CREATE POLICY "Service role full access" ON therapist_access_reset_tokens
  FOR ALL USING (true);

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_reset_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM therapist_access_reset_tokens
  WHERE expires_at < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;