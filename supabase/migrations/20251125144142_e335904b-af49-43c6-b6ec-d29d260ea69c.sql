-- Video Session Notes (therapist private notes)
CREATE TABLE IF NOT EXISTS video_session_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  therapist_id uuid REFERENCES auth.users NOT NULL,
  client_id uuid REFERENCES auth.users NOT NULL,
  notes text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Video Session Chat (in-session messages)
CREATE TABLE IF NOT EXISTS video_session_chat (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  sender_id uuid REFERENCES auth.users NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('therapist', 'client')),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Video Session Files (shared files during session)
CREATE TABLE IF NOT EXISTS video_session_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  uploader_id uuid REFERENCES auth.users NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size integer,
  created_at timestamptz DEFAULT now()
);

-- Video Session Logs (HIPAA audit trail)
CREATE TABLE IF NOT EXISTS video_session_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE video_session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_session_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_session_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_session_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for video_session_notes (therapist-only)
CREATE POLICY "Therapists can manage their session notes"
ON video_session_notes
FOR ALL
USING (
  therapist_id = auth.uid() OR 
  therapist_id IN (SELECT user_id FROM therapists WHERE user_id = auth.uid())
);

-- RLS Policies for video_session_chat (both participants can view/send)
CREATE POLICY "Session participants can view chat"
ON video_session_chat
FOR SELECT
USING (
  sender_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM video_session_notes 
    WHERE session_id = video_session_chat.session_id 
    AND (therapist_id = auth.uid() OR client_id = auth.uid())
  )
);

CREATE POLICY "Session participants can send messages"
ON video_session_chat
FOR INSERT
WITH CHECK (sender_id = auth.uid());

-- RLS Policies for video_session_files (both participants)
CREATE POLICY "Session participants can view files"
ON video_session_files
FOR SELECT
USING (
  uploader_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM video_session_notes 
    WHERE session_id = video_session_files.session_id 
    AND (therapist_id = auth.uid() OR client_id = auth.uid())
  )
);

CREATE POLICY "Session participants can upload files"
ON video_session_files
FOR INSERT
WITH CHECK (uploader_id = auth.uid());

-- RLS Policies for video_session_logs (therapists and admins only)
CREATE POLICY "Therapists and admins can view logs"
ON video_session_logs
FOR SELECT
USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM therapists WHERE user_id = auth.uid()) OR
  is_admin()
);

CREATE POLICY "Service role can insert logs"
ON video_session_logs
FOR INSERT
WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_video_session_notes_session ON video_session_notes(session_id);
CREATE INDEX IF NOT EXISTS idx_video_session_chat_session ON video_session_chat(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_video_session_files_session ON video_session_files(session_id);
CREATE INDEX IF NOT EXISTS idx_video_session_logs_session ON video_session_logs(session_id, created_at);

-- Auto-update updated_at for notes
CREATE OR REPLACE FUNCTION update_video_session_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER video_session_notes_updated_at
BEFORE UPDATE ON video_session_notes
FOR EACH ROW
EXECUTE FUNCTION update_video_session_notes_updated_at();

-- Storage bucket for session files
INSERT INTO storage.buckets (id, name, public)
VALUES ('session-files', 'session-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Session participants can view files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'session-files' AND
  (auth.uid()::text = (storage.foldername(name))[1] OR
   EXISTS (SELECT 1 FROM therapists WHERE user_id = auth.uid()))
);

CREATE POLICY "Session participants can upload files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'session-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Session participants can delete files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'session-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);