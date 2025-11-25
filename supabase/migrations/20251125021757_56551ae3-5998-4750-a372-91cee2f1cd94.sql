-- Phase 4: Signature Moments Database Tables

-- Voice Notes to Future Self
CREATE TABLE voice_notes_future (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  audio_url text NOT NULL,
  title text NOT NULL,
  message text,
  recording_date timestamptz DEFAULT now(),
  delivery_date timestamptz NOT NULL,
  delivered boolean DEFAULT false,
  delivered_at timestamptz,
  reply_audio_url text,
  created_at timestamptz DEFAULT now()
);

-- The Garden - Growth Visualization
CREATE TABLE garden_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  plant_type text NOT NULL, -- 'lavender', 'sunflower', 'rose', 'oak_tree'
  activity_category text NOT NULL, -- 'meditation', 'gratitude', 'journaling', etc.
  growth_stage text NOT NULL DEFAULT 'seed', -- 'seed', 'sprout', 'flower', 'tree'
  planted_at timestamptz DEFAULT now(),
  last_watered_at timestamptz DEFAULT now(),
  days_grown integer DEFAULT 0,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Constellation View - Journey as Stars
CREATE TABLE constellation_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  star_name text NOT NULL,
  activity_type text NOT NULL,
  x_position numeric NOT NULL,
  y_position numeric NOT NULL,
  brightness numeric DEFAULT 1.0,
  color text DEFAULT '#D4AF37',
  date_created timestamptz DEFAULT now(),
  metadata jsonb
);

-- Warmth Meter - Community Impact
CREATE TABLE community_impact (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  impact_type text NOT NULL, -- 'heart', 'reply', 'save', 'quote'
  source_post_id uuid,
  anonymous_quote text,
  created_at timestamptz DEFAULT now()
);

-- Timeline Milestones
CREATE TABLE journey_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  milestone_type text NOT NULL, -- 'first_session', '7_day_streak', 'assessment_improvement', etc.
  title text NOT NULL,
  description text,
  icon_name text,
  achieved_at timestamptz DEFAULT now(),
  metadata jsonb
);

-- Sound Preferences
CREATE TABLE user_sound_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users,
  sounds_enabled boolean DEFAULT true,
  ambient_sound text DEFAULT 'none', -- 'none', 'fireplace', 'rain', 'forest'
  haptics_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE voice_notes_future ENABLE ROW LEVEL SECURITY;
ALTER TABLE garden_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE constellation_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_impact ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sound_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users own their data)
CREATE POLICY "users_own_voice_notes" ON voice_notes_future FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_garden" ON garden_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_constellation" ON constellation_data FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_impact" ON community_impact FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_milestones" ON journey_milestones FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_sound_prefs" ON user_sound_preferences FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_voice_notes_delivery ON voice_notes_future(user_id, delivery_date) WHERE delivered = false;
CREATE INDEX idx_garden_user ON garden_progress(user_id, last_watered_at);
CREATE INDEX idx_constellation_user ON constellation_data(user_id, date_created DESC);
CREATE INDEX idx_impact_user ON community_impact(user_id, created_at DESC);
CREATE INDEX idx_milestones_user ON journey_milestones(user_id, achieved_at DESC);