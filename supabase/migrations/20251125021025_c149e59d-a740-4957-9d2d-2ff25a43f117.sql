-- Phase 1: Create missing database tables for toolkit features

-- Sleep Tracker Entries
CREATE TABLE IF NOT EXISTS sleep_tracker_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date date NOT NULL,
  bed_time time NOT NULL,
  sleep_time time,
  wake_time time NOT NULL,
  quality integer NOT NULL CHECK (quality BETWEEN 1 AND 10),
  duration numeric NOT NULL,
  notes text,
  factors text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sleep_tracker_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sleep entries"
  ON sleep_tracker_entries FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_sleep_user_date ON sleep_tracker_entries(user_id, date DESC);

-- Assessment Results (PHQ-9, GAD-7, PSS-10)
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  assessment_type text NOT NULL,
  score integer NOT NULL,
  severity text,
  responses jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  shared_with_therapist boolean DEFAULT false
);

ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own assessment results"
  ON assessment_results FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_assessment_user_type ON assessment_results(user_id, assessment_type, created_at DESC);

-- Meditation Sessions
CREATE TABLE IF NOT EXISTS meditation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  session_title text NOT NULL,
  category text NOT NULL,
  duration_seconds integer NOT NULL,
  completed boolean DEFAULT true,
  audio_file_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own meditation sessions"
  ON meditation_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_meditation_user_date ON meditation_sessions(user_id, created_at DESC);

-- Binaural Beat Sessions
CREATE TABLE IF NOT EXISTS binaural_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  frequency_type text NOT NULL,
  duration_minutes integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE binaural_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own binaural sessions"
  ON binaural_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Video Diary Recordings
CREATE TABLE IF NOT EXISTS video_diary_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  video_url text NOT NULL,
  thumbnail_url text,
  duration_seconds integer,
  transcription text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE video_diary_recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own video diaries"
  ON video_diary_recordings FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Breathing Exercise Sessions
CREATE TABLE IF NOT EXISTS breathing_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  pattern_type text NOT NULL,
  duration_seconds integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE breathing_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own breathing sessions"
  ON breathing_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);