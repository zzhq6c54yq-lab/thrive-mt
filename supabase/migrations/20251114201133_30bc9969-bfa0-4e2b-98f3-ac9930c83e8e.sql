-- Add therapist-related columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_therapist BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create therapist_messages table for secure messaging
CREATE TABLE IF NOT EXISTS public.therapist_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE,
  client_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('therapist', 'client')),
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_urgent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on therapist_messages
ALTER TABLE public.therapist_messages ENABLE ROW LEVEL SECURITY;

-- Therapists can view messages for their clients
CREATE POLICY "Therapists can view their client messages"
ON public.therapist_messages
FOR SELECT
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

-- Therapists can send messages to their clients
CREATE POLICY "Therapists can send messages to clients"
ON public.therapist_messages
FOR INSERT
WITH CHECK (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  ) AND sender_type = 'therapist'
);

-- Therapists can update their messages (mark as read, etc.)
CREATE POLICY "Therapists can update their messages"
ON public.therapist_messages
FOR UPDATE
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

-- Clients can view their messages
CREATE POLICY "Clients can view their messages"
ON public.therapist_messages
FOR SELECT
USING (auth.uid() = client_id);

-- Clients can send messages to their therapist
CREATE POLICY "Clients can send messages to therapists"
ON public.therapist_messages
FOR INSERT
WITH CHECK (
  auth.uid() = client_id AND sender_type = 'client'
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_therapist_messages_therapist ON public.therapist_messages(therapist_id);
CREATE INDEX IF NOT EXISTS idx_therapist_messages_client ON public.therapist_messages(client_id);
CREATE INDEX IF NOT EXISTS idx_therapist_messages_created ON public.therapist_messages(created_at DESC);

-- Update profiles RLS to allow therapists to view client profiles
CREATE POLICY "Therapists can view their client profiles"
ON public.profiles
FOR SELECT
USING (
  id IN (
    SELECT user_id FROM public.therapy_bookings 
    WHERE therapist_id IN (
      SELECT id FROM public.therapists WHERE user_id = auth.uid()
    )
  )
);

-- Insert demo therapist account
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'therapist@demo.com',
  crypt('0001', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"display_name":"Dr. Sarah Mitchell"}'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert demo therapist profile
INSERT INTO public.profiles (id, email, is_therapist, display_name, avatar_url, onboarding_completed)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'therapist@demo.com',
  TRUE,
  'Dr. Sarah Mitchell',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  is_therapist = TRUE,
  display_name = 'Dr. Sarah Mitchell',
  avatar_url = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop';

-- Insert demo therapist record
INSERT INTO public.therapists (id, user_id, name, title, bio, specialties, experience_years, hourly_rate, rating, total_reviews, is_active, image_url, license_number, approach)
VALUES (
  '10000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Dr. Sarah Mitchell',
  'Licensed Clinical Psychologist',
  'I specialize in helping individuals navigate anxiety, depression, trauma, and relationship challenges. With over 12 years of experience, I use evidence-based approaches including CBT, DBT, and mindfulness techniques to create a safe, supportive space for healing and growth.',
  ARRAY['Anxiety', 'Depression', 'Trauma', 'Relationships', 'CBT', 'DBT', 'Mindfulness'],
  12,
  150.00,
  4.9,
  324,
  TRUE,
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  'PSY-12345-CA',
  'I believe in a collaborative, client-centered approach that combines evidence-based techniques with compassionate understanding. Together, we''ll work to identify your strengths and develop practical strategies for lasting change.'
) ON CONFLICT (id) DO UPDATE SET
  name = 'Dr. Sarah Mitchell',
  title = 'Licensed Clinical Psychologist',
  bio = 'I specialize in helping individuals navigate anxiety, depression, trauma, and relationship challenges. With over 12 years of experience, I use evidence-based approaches including CBT, DBT, and mindfulness techniques to create a safe, supportive space for healing and growth.',
  specialties = ARRAY['Anxiety', 'Depression', 'Trauma', 'Relationships', 'CBT', 'DBT', 'Mindfulness'],
  experience_years = 12,
  rating = 4.9,
  total_reviews = 324;