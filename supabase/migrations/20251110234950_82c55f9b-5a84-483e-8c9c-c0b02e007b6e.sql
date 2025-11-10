-- Create therapists table
CREATE TABLE public.therapists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  approach TEXT,
  experience_years INTEGER,
  license_number TEXT,
  image_url TEXT,
  hourly_rate DECIMAL(10,2) NOT NULL DEFAULT 150.00,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create therapist availability table
CREATE TABLE public.therapist_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID NOT NULL REFERENCES public.therapists(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create therapy bookings table
CREATE TABLE public.therapy_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  therapist_id UUID NOT NULL REFERENCES public.therapists(id),
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  session_type TEXT NOT NULL DEFAULT 'video', -- video, phone, in-person
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, completed, cancelled, no-show
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, refunded
  payment_amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT, -- simulated for now
  concerns TEXT[],
  notes TEXT,
  video_room_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create therapy sessions table (for completed sessions with notes)
CREATE TABLE public.therapy_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.therapy_bookings(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapists(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  therapist_notes TEXT,
  client_notes TEXT,
  progress_rating INTEGER CHECK (progress_rating >= 1 AND progress_rating <= 5),
  homework_assigned TEXT,
  next_session_goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_sessions ENABLE ROW LEVEL SECURITY;

-- Therapists policies (public read, admin write)
CREATE POLICY "Therapists are viewable by everyone" 
ON public.therapists 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can view all therapists" 
ON public.therapists 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Therapists can update their own profile" 
ON public.therapists 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Availability policies
CREATE POLICY "Availability is viewable by everyone" 
ON public.therapist_availability 
FOR SELECT 
USING (true);

CREATE POLICY "Therapists can manage their availability" 
ON public.therapist_availability 
FOR ALL 
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

-- Booking policies
CREATE POLICY "Users can view their own bookings" 
ON public.therapy_bookings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Therapists can view their bookings" 
ON public.therapy_bookings 
FOR SELECT 
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can create bookings" 
ON public.therapy_bookings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.therapy_bookings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Therapists can update their bookings" 
ON public.therapy_bookings 
FOR UPDATE 
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

-- Session policies
CREATE POLICY "Users can view their own sessions" 
ON public.therapy_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Therapists can view their sessions" 
ON public.therapy_sessions 
FOR SELECT 
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Therapists can create session notes" 
ON public.therapy_sessions 
FOR INSERT 
WITH CHECK (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Therapists can update their session notes" 
ON public.therapy_sessions 
FOR UPDATE 
USING (
  therapist_id IN (
    SELECT id FROM public.therapists WHERE user_id = auth.uid()
  )
);

-- Create indexes for performance
CREATE INDEX idx_therapists_active ON public.therapists(is_active);
CREATE INDEX idx_therapists_specialties ON public.therapists USING GIN(specialties);
CREATE INDEX idx_availability_therapist ON public.therapist_availability(therapist_id);
CREATE INDEX idx_bookings_user ON public.therapy_bookings(user_id);
CREATE INDEX idx_bookings_therapist ON public.therapy_bookings(therapist_id);
CREATE INDEX idx_bookings_date ON public.therapy_bookings(appointment_date);
CREATE INDEX idx_sessions_user ON public.therapy_sessions(user_id);
CREATE INDEX idx_sessions_therapist ON public.therapy_sessions(therapist_id);

-- Add triggers for timestamps
CREATE TRIGGER update_therapists_updated_at
BEFORE UPDATE ON public.therapists
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.therapy_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
BEFORE UPDATE ON public.therapy_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();