-- Create dashboard section interactions tracking table
CREATE TABLE dashboard_section_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id TEXT NOT NULL,
  interaction_type TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_seconds INTEGER,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_section_interactions_user ON dashboard_section_interactions(user_id);
CREATE INDEX idx_section_interactions_section ON dashboard_section_interactions(section_id);
CREATE INDEX idx_section_interactions_timestamp ON dashboard_section_interactions(timestamp);

-- Enable RLS
ALTER TABLE dashboard_section_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own interactions"
  ON dashboard_section_interactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interactions"
  ON dashboard_section_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create dashboard layout preferences table
CREATE TABLE dashboard_layout_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  section_order JSONB NOT NULL,
  is_custom BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  learning_enabled BOOLEAN DEFAULT TRUE,
  last_auto_adjustment TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_layout_prefs_user ON dashboard_layout_preferences(user_id);

-- Enable RLS
ALTER TABLE dashboard_layout_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences"
  ON dashboard_layout_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own preferences"
  ON dashboard_layout_preferences FOR ALL
  USING (auth.uid() = user_id);

-- Create dashboard section analytics table
CREATE TABLE dashboard_section_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id TEXT NOT NULL,
  date DATE NOT NULL,
  total_views INTEGER DEFAULT 0,
  total_time_seconds INTEGER DEFAULT 0,
  interaction_count INTEGER DEFAULT 0,
  engagement_score NUMERIC(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, section_id, date)
);

CREATE INDEX idx_section_analytics_user_date ON dashboard_section_analytics(user_id, date);

-- Enable RLS
ALTER TABLE dashboard_section_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analytics"
  ON dashboard_section_analytics FOR SELECT
  USING (auth.uid() = user_id);

-- Create toolkit category interactions table
CREATE TABLE toolkit_category_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL,
  interaction_type TEXT NOT NULL,
  tool_name TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_toolkit_interactions_user ON toolkit_category_interactions(user_id);

-- Enable RLS
ALTER TABLE toolkit_category_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own toolkit interactions"
  ON toolkit_category_interactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own toolkit interactions"
  ON toolkit_category_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);