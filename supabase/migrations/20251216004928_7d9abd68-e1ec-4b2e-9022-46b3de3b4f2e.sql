-- Career applications table
CREATE TABLE IF NOT EXISTS public.career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Investor requests table
CREATE TABLE IF NOT EXISTS public.investor_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  investment_range TEXT,
  request_type TEXT NOT NULL,
  meeting_reason TEXT,
  preferred_times TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_requests ENABLE ROW LEVEL SECURITY;

-- Policies for anonymous insert (public forms)
CREATE POLICY "Anyone can submit career application" ON public.career_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit investor request" ON public.investor_requests FOR INSERT WITH CHECK (true);

-- Admin can view all
CREATE POLICY "Admins can view career applications" ON public.career_applications FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can view investor requests" ON public.investor_requests FOR SELECT USING (public.is_admin());

-- Admin can update
CREATE POLICY "Admins can update career applications" ON public.career_applications FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can update contact submissions" ON public.contact_submissions FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can update investor requests" ON public.investor_requests FOR UPDATE USING (public.is_admin());

-- Create resumes storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false) ON CONFLICT (id) DO NOTHING;

-- Storage policy for resume uploads (anyone can upload)
CREATE POLICY "Anyone can upload resumes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Admins can view resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes' AND public.is_admin());