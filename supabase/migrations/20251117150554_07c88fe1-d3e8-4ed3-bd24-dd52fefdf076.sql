-- Add metadata column to daily_plans for storing AI insights
ALTER TABLE daily_plans ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Create analytics tracking table for monitoring plan generation
CREATE TABLE IF NOT EXISTS plan_generation_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  total_users INTEGER NOT NULL,
  successful_generations INTEGER NOT NULL,
  failed_generations INTEGER NOT NULL,
  avg_generation_time_ms INTEGER,
  ai_cost_usd NUMERIC(10, 4),
  errors JSONB
);

-- Enable RLS
ALTER TABLE plan_generation_analytics ENABLE ROW LEVEL SECURITY;

-- Only service role can view analytics
CREATE POLICY "Service role can view analytics" ON plan_generation_analytics
  FOR SELECT
  USING (true);