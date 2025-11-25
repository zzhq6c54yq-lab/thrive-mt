-- Fix function search path security issue by recreating the function
-- First drop the trigger, then recreate the function with proper search_path
DROP TRIGGER IF EXISTS video_session_notes_updated_at ON video_session_notes;
DROP FUNCTION IF EXISTS update_video_session_notes_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION update_video_session_notes_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER video_session_notes_updated_at
BEFORE UPDATE ON video_session_notes
FOR EACH ROW
EXECUTE FUNCTION update_video_session_notes_updated_at();

-- Add unique constraint for upsert to work properly
ALTER TABLE video_session_notes 
ADD CONSTRAINT video_session_notes_session_therapist_unique 
UNIQUE (session_id, therapist_id);

-- Make session-files bucket public for easier access
UPDATE storage.buckets SET public = true WHERE id = 'session-files';

-- Create voice-notes storage bucket for VoiceNotesToFuture component
INSERT INTO storage.buckets (id, name, public) 
VALUES ('voice-notes', 'voice-notes', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for voice-notes bucket
CREATE POLICY "Users can upload their own voice notes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'voice-notes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own voice notes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'voice-notes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own voice notes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'voice-notes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can view voice notes"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'voice-notes');