-- Phase 2: Storage Bucket Security Improvements

-- 1. Make voice-notes bucket private (contains sensitive mental health recordings)
UPDATE storage.buckets 
SET public = false 
WHERE id = 'voice-notes';

-- 2. Drop overly permissive voice-notes policies
DROP POLICY IF EXISTS "Public can view voice notes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view voice notes" ON storage.objects;

-- 3. Create secure voice-notes policies (owner-only access)
CREATE POLICY "Users can view own voice notes"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'voice-notes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload own voice notes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'voice-notes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own voice notes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'voice-notes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Drop overly permissive session-files policies
DROP POLICY IF EXISTS "Therapists can view session files" ON storage.objects;
DROP POLICY IF EXISTS "Any therapist can view session files" ON storage.objects;

-- 5. Create secure session-files policies (therapist sees only assigned clients)
CREATE POLICY "Therapists can view assigned client session files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'session-files' 
  AND (
    -- User can view their own files
    auth.uid()::text = (storage.foldername(name))[1]
    OR
    -- Therapist can view files of their assigned clients
    EXISTS (
      SELECT 1 FROM therapists t
      JOIN assignments a ON a.provider_id = t.user_id
      WHERE t.user_id = auth.uid() 
      AND a.patient_id::text = (storage.foldername(name))[1]
      AND a.status = 'active'
    )
  )
);

CREATE POLICY "Users can upload own session files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'session-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own session files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'session-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);