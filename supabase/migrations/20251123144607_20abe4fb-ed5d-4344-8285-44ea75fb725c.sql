-- Phase 4: Dashboard Integration Schema

-- User activity stream for cross-dashboard visibility
CREATE TABLE IF NOT EXISTS user_activity_stream (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  visible_to_therapist BOOLEAN DEFAULT true,
  visible_to_admin BOOLEAN DEFAULT true
);

-- Therapist-client notes
CREATE TABLE IF NOT EXISTS therapist_client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists NOT NULL,
  client_id UUID REFERENCES auth.users NOT NULL,
  note_type TEXT NOT NULL,
  content TEXT NOT NULL,
  visible_to_client BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cross-dashboard notifications
CREATE TABLE IF NOT EXISTS cross_dashboard_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID REFERENCES auth.users NOT NULL,
  sender_type TEXT NOT NULL,
  sender_id UUID,
  notification_type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_stream_user ON user_activity_stream(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_stream_visible ON user_activity_stream(visible_to_therapist, visible_to_admin);
CREATE INDEX IF NOT EXISTS idx_client_notes_therapist ON therapist_client_notes(therapist_id, client_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON cross_dashboard_notifications(recipient_id, read, created_at DESC);

-- RLS Policies
ALTER TABLE user_activity_stream ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_dashboard_notifications ENABLE ROW LEVEL SECURITY;

-- User activity stream policies
CREATE POLICY "Users can view own activity" ON user_activity_stream
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON user_activity_stream
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Therapists can view client activity" ON user_activity_stream
  FOR SELECT USING (
    visible_to_therapist = true AND
    EXISTS (
      SELECT 1 FROM therapists t
      WHERE t.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all activity" ON user_activity_stream
  FOR SELECT USING (visible_to_admin = true AND is_admin());

-- Therapist notes policies
CREATE POLICY "Therapists can manage their notes" ON therapist_client_notes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM therapists t
      WHERE t.id = therapist_id AND t.user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can view visible notes" ON therapist_client_notes
  FOR SELECT USING (auth.uid() = client_id AND visible_to_client = true);

-- Notification policies
CREATE POLICY "Users can view own notifications" ON cross_dashboard_notifications
  FOR SELECT USING (auth.uid() = recipient_id);

CREATE POLICY "Users can update own notifications" ON cross_dashboard_notifications
  FOR UPDATE USING (auth.uid() = recipient_id);

CREATE POLICY "System can insert notifications" ON cross_dashboard_notifications
  FOR INSERT WITH CHECK (true);