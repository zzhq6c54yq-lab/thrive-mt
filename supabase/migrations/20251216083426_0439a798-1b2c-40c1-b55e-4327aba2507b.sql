-- Add Smart Match fields to therapists table
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS states_licensed text[] DEFAULT '{}';
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS insurance_panels text[] DEFAULT '{}';
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS session_types_offered text[] DEFAULT ARRAY['60-Individual'];
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS self_pay_rate numeric DEFAULT 150.00;
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS therapist_percentage numeric DEFAULT 0.60;
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS platform_percentage numeric DEFAULT 0.40;
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS npi_number text;
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS caqh_verified boolean DEFAULT false;
ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS availability_schedule jsonb DEFAULT '{}';

-- Create CPT Session Codes table
CREATE TABLE IF NOT EXISTS public.cpt_session_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cpt_code text UNIQUE NOT NULL,
  session_duration integer NOT NULL,
  session_type text NOT NULL,
  description text,
  max_insurance_reimbursement numeric NOT NULL,
  self_pay_rate_suggested numeric NOT NULL,
  telehealth_compatible boolean DEFAULT true,
  documentation_requirements text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cpt_session_codes ENABLE ROW LEVEL SECURITY;

-- RLS policy for authenticated users to view CPT codes
CREATE POLICY "Authenticated users can view CPT codes" ON public.cpt_session_codes
  FOR SELECT TO authenticated USING (true);

-- Admin can manage CPT codes
CREATE POLICY "Admins can manage CPT codes" ON public.cpt_session_codes
  FOR ALL USING (is_admin());

-- Seed CPT codes
INSERT INTO public.cpt_session_codes (cpt_code, session_duration, session_type, description, max_insurance_reimbursement, self_pay_rate_suggested, documentation_requirements)
VALUES 
  ('90832', 30, 'Individual', 'Individual psychotherapy, 30 minutes', 80.00, 100.00, 'Progress notes with treatment goals'),
  ('90834', 45, 'Individual', 'Individual psychotherapy, 45 minutes', 120.00, 150.00, 'Progress notes with treatment goals'),
  ('90837', 60, 'Individual', 'Individual psychotherapy, 60 minutes', 160.00, 200.00, 'Progress notes with treatment goals'),
  ('90847', 60, 'Family', 'Family psychotherapy with patient present', 180.00, 220.00, 'Family therapy notes'),
  ('90846', 50, 'Family', 'Family psychotherapy without patient present', 160.00, 200.00, 'Family therapy notes'),
  ('90853', 60, 'Group', 'Group psychotherapy', 50.00, 65.00, 'Group therapy attendance and notes')
ON CONFLICT (cpt_code) DO NOTHING;

-- Create smart match requests table
CREATE TABLE IF NOT EXISTS public.smart_match_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  state text NOT NULL,
  insurance_provider text,
  session_type text NOT NULL,
  session_duration integer NOT NULL,
  preferred_time text,
  concerns text[],
  self_pay_allowed boolean DEFAULT true,
  status text DEFAULT 'pending',
  matched_therapist_id uuid REFERENCES public.therapists(id),
  session_rate numeric,
  therapist_payout numeric,
  platform_revenue numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.smart_match_requests ENABLE ROW LEVEL SECURITY;

-- Users can view/create their own requests
CREATE POLICY "Users can manage own smart match requests" ON public.smart_match_requests
  FOR ALL USING (auth.uid() = user_id);

-- Admins can view all requests  
CREATE POLICY "Admins can view all smart match requests" ON public.smart_match_requests
  FOR SELECT USING (is_admin());

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_smart_match_state ON public.smart_match_requests(state);
CREATE INDEX IF NOT EXISTS idx_smart_match_status ON public.smart_match_requests(status);
CREATE INDEX IF NOT EXISTS idx_therapists_states ON public.therapists USING GIN(states_licensed);
CREATE INDEX IF NOT EXISTS idx_therapists_insurance ON public.therapists USING GIN(insurance_panels);