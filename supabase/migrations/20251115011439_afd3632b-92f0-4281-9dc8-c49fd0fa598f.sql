-- Create demo therapist profile and data
DO $$
DECLARE
  therapist_user_id UUID;
  therapist_id UUID;
  existing_therapist_id UUID;
BEGIN
  -- Get the user ID for therapist@demo.com
  SELECT id INTO therapist_user_id FROM auth.users WHERE email = 'therapist@demo.com';
  
  IF therapist_user_id IS NULL THEN
    RAISE EXCEPTION 'Therapist user not found';
  END IF;
  
  -- Create or update profile
  INSERT INTO public.profiles (id, email, display_name, is_therapist, onboarding_completed)
  VALUES (
    therapist_user_id,
    'therapist@demo.com',
    'Dr. Sarah Mitchell',
    true,
    true
  )
  ON CONFLICT (id) DO UPDATE SET
    is_therapist = true,
    display_name = 'Dr. Sarah Mitchell',
    onboarding_completed = true;
  
  -- Check if therapist record exists
  SELECT id INTO existing_therapist_id FROM public.therapists WHERE user_id = therapist_user_id;
  
  IF existing_therapist_id IS NULL THEN
    -- Create new therapist record
    INSERT INTO public.therapists (
      user_id,
      name,
      title,
      bio,
      specialties,
      approach,
      experience_years,
      hourly_rate,
      rating,
      total_reviews,
      is_active,
      license_number,
      image_url
    )
    VALUES (
      therapist_user_id,
      'Dr. Sarah Mitchell',
      'Licensed Clinical Psychologist',
      'Specializing in CBT and trauma-informed care with over 15 years of experience helping clients overcome anxiety, depression, and relationship challenges.',
      ARRAY['Anxiety', 'Depression', 'Trauma', 'Relationship Issues', 'CBT'],
      'Cognitive Behavioral Therapy (CBT) with a trauma-informed lens',
      15,
      150.00,
      4.9,
      127,
      true,
      'PSY-12345-CA',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    )
    RETURNING id INTO therapist_id;
  ELSE
    -- Update existing therapist record
    UPDATE public.therapists SET
      name = 'Dr. Sarah Mitchell',
      title = 'Licensed Clinical Psychologist',
      is_active = true
    WHERE id = existing_therapist_id
    RETURNING id INTO therapist_id;
  END IF;
  
END $$;