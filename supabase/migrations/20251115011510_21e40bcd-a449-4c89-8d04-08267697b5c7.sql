-- Insert therapist profile
INSERT INTO public.profiles (id, email, display_name, is_therapist, onboarding_completed)
SELECT 
  u.id,
  u.email,
  'Dr. Sarah Mitchell',
  true,
  true
FROM auth.users u
WHERE u.email = 'therapist@demo.com'
ON CONFLICT (id) DO UPDATE SET
  is_therapist = true,
  display_name = 'Dr. Sarah Mitchell',
  email = 'therapist@demo.com',
  onboarding_completed = true;