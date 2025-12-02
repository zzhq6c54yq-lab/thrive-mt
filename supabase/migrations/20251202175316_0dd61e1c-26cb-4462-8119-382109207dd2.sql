-- Update life_transition_programs with cover images
UPDATE life_transition_programs SET cover_image_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' WHERE slug = 'divorce-recovery';
UPDATE life_transition_programs SET cover_image_url = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80' WHERE slug = 'career-transition';
UPDATE life_transition_programs SET cover_image_url = 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&q=80' WHERE slug = 'grief-loss';
UPDATE life_transition_programs SET cover_image_url = 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80' WHERE slug = 'new-parent';
UPDATE life_transition_programs SET cover_image_url = 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=800&q=80' WHERE slug = 'retirement';
UPDATE life_transition_programs SET cover_image_url = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80' WHERE slug = 'chronic-illness';

-- Create waitlist_signups table
CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for waitlist
CREATE POLICY "Anyone can sign up for waitlist" 
ON public.waitlist_signups 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view waitlist
CREATE POLICY "Admins can view waitlist" 
ON public.waitlist_signups 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
));