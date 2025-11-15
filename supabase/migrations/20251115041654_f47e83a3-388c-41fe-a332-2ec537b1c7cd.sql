-- Update therapist profile
UPDATE public.profiles 
SET 
  is_therapist = true,
  onboarding_completed = true,
  display_name = 'Dr. Sarah Mitchell'
WHERE id = '00000000-0000-0000-0000-000000000001';