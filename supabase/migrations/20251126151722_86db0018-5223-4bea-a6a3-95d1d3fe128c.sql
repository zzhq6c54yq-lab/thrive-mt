-- Add assigned_therapist_id column to profiles table for default therapist assignment
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS assigned_therapist_id UUID REFERENCES therapists(id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_assigned_therapist ON profiles(assigned_therapist_id);

-- Auto-assign Dr. Damien Pena as default therapist for users without one
UPDATE profiles 
SET assigned_therapist_id = (
  SELECT id FROM therapists WHERE name = 'Dr. Damien Pena' LIMIT 1
)
WHERE assigned_therapist_id IS NULL;