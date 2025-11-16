-- Add video_url column to therapists table
ALTER TABLE therapists 
ADD COLUMN video_url TEXT;

COMMENT ON COLUMN therapists.video_url IS 'URL to therapist introduction video in Supabase storage';

-- Create therapist-videos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('therapist-videos', 'therapist-videos', true);

-- Anyone can view therapist videos (public bucket)
CREATE POLICY "Public Access to Therapist Videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'therapist-videos');

-- Only therapists can upload their own videos
CREATE POLICY "Therapists can upload own videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'therapist-videos' AND
  (auth.uid()::text = (storage.foldername(name))[1])
);

-- Only therapists can update/delete their own videos
CREATE POLICY "Therapists can manage own videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'therapist-videos' AND
  (auth.uid()::text = (storage.foldername(name))[1])
);

CREATE POLICY "Therapists can delete own videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'therapist-videos' AND
  (auth.uid()::text = (storage.foldername(name))[1])
);