-- Create daily_check_ins table for mood tracking
CREATE TABLE daily_check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_score INTEGER NOT NULL CHECK (mood_score >= 1 AND mood_score <= 5),
  mood_label TEXT,
  tags TEXT[],
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_daily_check_ins_user_date ON daily_check_ins(user_id, created_at DESC);

ALTER TABLE daily_check_ins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert own check-ins" ON daily_check_ins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own check-ins" ON daily_check_ins FOR SELECT USING (auth.uid() = user_id);

-- Create activities_catalog table
CREATE TABLE activities_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  portal_tags TEXT[],
  goal_tags TEXT[],
  icon_name TEXT,
  route_path TEXT,
  is_featured BOOLEAN DEFAULT false,
  points_reward INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with initial activities
INSERT INTO activities_catalog (slug, title, description, category, estimated_minutes, portal_tags, goal_tags, icon_name, route_path, points_reward, is_featured) VALUES
('mindful_meditation_10min', '10-Minute Mindful Meditation', 'Calm your mind with guided meditation', 'meditation', 10, ARRAY['all'], ARRAY['anxiety', 'stress'], 'Brain', '/meditation-studio', 20, true),
('gratitude_visualizer', 'Gratitude Visualizer', 'Visualize what you''re grateful for', 'mindfulness', 3, ARRAY['all'], ARRAY['mood', 'positivity'], 'Heart', '/gratitude-visualizer', 10, true),
('sleep_tracker', 'Sleep Tracker', 'Review your sleep patterns', 'sleep', 5, ARRAY['all'], ARRAY['sleep'], 'Moon', '/sleep-tracker', 15, false),
('ai_journal', 'AI-Powered Journal', 'Write and get AI insights', 'journaling', 10, ARRAY['all'], ARRAY['anxiety', 'trauma', 'mood'], 'BookOpen', '/journal', 20, true),
('phq9_assessment', 'PHQ-9 Screening', 'Track depression symptoms', 'assessment', 5, ARRAY['all'], ARRAY['depression'], 'Activity', '/mental-wellness/phq-9', 25, false),
('breathwork', 'Breathwork Exercise', 'Calm your nervous system', 'breathing', 5, ARRAY['all'], ARRAY['anxiety', 'stress'], 'Wind', '/breathwork', 15, false),
('art_therapy', 'Art Therapy Session', 'Express yourself creatively', 'creativity', 15, ARRAY['all'], ARRAY['trauma', 'mood'], 'Palette', '/art-therapy', 20, false),
('binaural_beats', 'Binaural Beats', 'Focus with sound therapy', 'sound', 20, ARRAY['all'], ARRAY['focus', 'sleep'], 'Music', '/binaural-beats', 15, false);

ALTER TABLE activities_catalog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view activities catalog" ON activities_catalog FOR SELECT USING (true);

-- Create daily_plans table
CREATE TABLE daily_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_date DATE NOT NULL,
  activities JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, plan_date)
);

CREATE INDEX idx_daily_plans_user_date ON daily_plans(user_id, plan_date DESC);

ALTER TABLE daily_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own plans" ON daily_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON daily_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans" ON daily_plans FOR UPDATE USING (auth.uid() = user_id);

-- Create user_streaks table
CREATE TABLE user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_type TEXT NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, streak_type)
);

ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own streaks" ON user_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON user_streaks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON user_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create rewards_wallet table
CREATE TABLE rewards_wallet (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_points INTEGER DEFAULT 0,
  lifetime_earned INTEGER DEFAULT 0,
  lifetime_redeemed INTEGER DEFAULT 0,
  copay_credits_usd NUMERIC(10, 2) DEFAULT 0.00,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE rewards_wallet ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wallet" ON rewards_wallet FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON rewards_wallet FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wallet" ON rewards_wallet FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create reward_transactions table
CREATE TABLE reward_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('earn', 'redeem')),
  source TEXT NOT NULL,
  points INTEGER NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reward_transactions_user_date ON reward_transactions(user_id, created_at DESC);

ALTER TABLE reward_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON reward_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON reward_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create insights_cache table
CREATE TABLE insights_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL,
  insight_text TEXT NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ NOT NULL,
  metadata JSONB
);

CREATE INDEX idx_insights_cache_user_valid ON insights_cache(user_id, valid_until DESC);

ALTER TABLE insights_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own insights" ON insights_cache FOR SELECT USING (auth.uid() = user_id);

-- Update profiles table with new columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS time_preference_minutes INTEGER DEFAULT 10;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS primary_portal TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS secondary_portal TEXT;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for rewards_wallet
CREATE TRIGGER update_rewards_wallet_updated_at
  BEFORE UPDATE ON rewards_wallet
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_streaks
CREATE TRIGGER update_user_streaks_updated_at
  BEFORE UPDATE ON user_streaks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();