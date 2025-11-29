-- Create coaches table
CREATE TABLE public.coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  approach TEXT,
  experience_years INTEGER DEFAULT 0,
  certifications TEXT[] DEFAULT '{}',
  image_url TEXT,
  hourly_rate NUMERIC(10,2),
  weekly_text_rate NUMERIC(10,2) DEFAULT 29.00,
  rating NUMERIC(3,2) DEFAULT 5.0,
  total_reviews INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  communication_styles TEXT[] DEFAULT '{}',
  availability_hours TEXT,
  languages TEXT[] DEFAULT ARRAY['English'],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active coaches
CREATE POLICY "Anyone can view active coaches"
ON public.coaches
FOR SELECT
USING (is_active = true);

-- Policy: Coaches can update their own profile
CREATE POLICY "Coaches can update own profile"
ON public.coaches
FOR UPDATE
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_coaches_active ON public.coaches(is_active);
CREATE INDEX idx_coaches_specialties ON public.coaches USING GIN(specialties);

-- Insert sample coaches
INSERT INTO public.coaches (name, title, bio, specialties, approach, experience_years, certifications, image_url, hourly_rate, rating, total_reviews, communication_styles, availability_hours, languages) VALUES
('Maya Thompson', 'Certified Wellness Coach', 'Specializing in stress management and work-life balance, I help clients develop sustainable habits and find peace in their daily routines.', ARRAY['Stress Management', 'Habits & Routines', 'Work-Life Balance', 'Burnout Prevention'], 'Warm, supportive approach focused on building sustainable changes through small, consistent steps.', 8, ARRAY['ICF Certified', 'Stress Management Specialist', 'Mindfulness-Based Coach'], 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', 35.00, 4.9, 127, ARRAY['Text', 'Video', 'Audio'], 'Mon-Fri 9am-6pm, Sat 10am-2pm', ARRAY['English', 'Spanish']),

('James Rivera', 'Motivation & Goal Coach', 'I empower clients to unlock their potential through actionable goal-setting and accountability. Perfect for those feeling stuck or unmotivated.', ARRAY['Motivation', 'Goal Setting', 'Life Transitions', 'Career Development'], 'Direct, action-oriented coaching that combines accountability with empathy to drive real results.', 6, ARRAY['Certified Life Coach', 'Career Transition Specialist'], 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', 32.00, 4.8, 94, ARRAY['Text', 'Video', 'Audio'], 'Tue-Sat 10am-7pm', ARRAY['English']),

('Dr. Aisha Patel', 'Emotional Wellness Coach', 'With a background in psychology, I help clients build emotional resilience, improve communication, and strengthen relationships.', ARRAY['Emotional Resilience', 'Communication Skills', 'Relationships', 'Self-Awareness'], 'Evidence-based coaching rooted in positive psychology and emotional intelligence principles.', 10, ARRAY['PhD Psychology', 'ICF Master Coach', 'Emotional Intelligence Certified'], 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400', 42.00, 5.0, 203, ARRAY['Text', 'Video'], 'Mon-Fri 8am-5pm', ARRAY['English', 'Hindi', 'Gujarati']),

('Marcus Chen', 'Productivity & Accountability Coach', 'I help high-achievers overcome procrastination, build better systems, and reach their full potential without burning out.', ARRAY['Productivity', 'Accountability', 'Time Management', 'Career Growth'], 'Structured, systems-based approach combining proven productivity frameworks with personal accountability.', 5, ARRAY['Certified Productivity Coach', 'Agile Coach'], 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 38.00, 4.9, 156, ARRAY['Text', 'Audio', 'Video'], 'Mon-Fri 7am-8pm', ARRAY['English', 'Mandarin']),

('Sofia Martinez', 'Self-Compassion & Burnout Coach', 'I guide clients toward self-compassion and sustainable well-being, specializing in burnout recovery and mindfulness practices.', ARRAY['Self-Compassion', 'Burnout Recovery', 'Mindfulness', 'Stress Reduction'], 'Gentle, mindfulness-based coaching that honors your pace while building resilience from within.', 7, ARRAY['Mindfulness-Based Stress Reduction', 'Certified Burnout Coach', 'Self-Compassion Teacher'], 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', 36.00, 4.9, 178, ARRAY['Text', 'Video'], 'Mon-Thu 11am-7pm, Fri 9am-3pm', ARRAY['English', 'Spanish']);