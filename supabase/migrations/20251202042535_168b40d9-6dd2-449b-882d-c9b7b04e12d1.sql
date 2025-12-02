-- Fix security: Enable RLS on achievement_badges (public read)
ALTER TABLE public.achievement_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view achievement badges"
  ON public.achievement_badges FOR SELECT
  USING (true);

-- =====================================================
-- PHASE 2: SMS WELLNESS CHECK-INS
-- =====================================================

DROP TABLE IF EXISTS public.sms_check_ins CASCADE;
DROP TABLE IF EXISTS public.sms_preferences CASCADE;

CREATE TABLE public.sms_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  phone_number TEXT,
  enabled BOOLEAN DEFAULT FALSE,
  frequency TEXT DEFAULT 'daily',
  preferred_time TIME DEFAULT '09:00:00',
  timezone TEXT DEFAULT 'America/New_York',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sms_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own SMS preferences"
  ON public.sms_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.sms_check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  response_text TEXT,
  responded_at TIMESTAMPTZ,
  mood_score INTEGER,
  parsed_sentiment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sms_check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own SMS check-ins"
  ON public.sms_check_ins FOR SELECT
  USING (auth.uid() = user_id);

-- =====================================================
-- PHASE 3: LIFE TRANSITION GUIDES
-- =====================================================

DROP TABLE IF EXISTS public.user_transition_progress CASCADE;
DROP TABLE IF EXISTS public.life_transition_programs CASCADE;

CREATE TABLE public.life_transition_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL,
  cover_image_url TEXT,
  weekly_content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.life_transition_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view transition programs"
  ON public.life_transition_programs FOR SELECT
  USING (true);

CREATE TABLE public.user_transition_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES public.life_transition_programs(id) ON DELETE CASCADE,
  current_week INTEGER DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  notes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, program_id)
);

ALTER TABLE public.user_transition_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own transition progress"
  ON public.user_transition_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- PHASE 4: SUPPORT CIRCLE (FAMILY/CAREGIVER ACCESS)
-- =====================================================

DROP TABLE IF EXISTS public.support_circle_permissions CASCADE;
DROP TABLE IF EXISTS public.support_circle_members CASCADE;

CREATE TABLE public.support_circle_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  member_email TEXT NOT NULL,
  member_name TEXT NOT NULL,
  relationship TEXT,
  status TEXT DEFAULT 'pending',
  invite_token TEXT UNIQUE,
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, member_email)
);

ALTER TABLE public.support_circle_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own support circle"
  ON public.support_circle_members FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.support_circle_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.support_circle_members(id) ON DELETE CASCADE,
  permission_type TEXT NOT NULL,
  enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, permission_type)
);

ALTER TABLE public.support_circle_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view own permissions"
  ON public.support_circle_permissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.support_circle_members
      WHERE id = member_id AND user_id = auth.uid()
    )
  );

-- =====================================================
-- SEED DATA: LIFE TRANSITION PROGRAMS
-- =====================================================

INSERT INTO public.life_transition_programs (slug, title, description, category, duration_weeks, weekly_content) VALUES
('divorce-recovery', 'Divorce Recovery Journey', 'Navigate the emotional and practical challenges of divorce with structured weekly guidance', 'relationships', 8, 
'[
  {"week": 1, "title": "Accepting the Change", "focus": "Processing grief and acknowledging emotions"},
  {"week": 2, "title": "Legal & Practical Steps", "focus": "Understanding the divorce process"},
  {"week": 3, "title": "Co-Parenting Foundations", "focus": "Creating healthy boundaries with children"},
  {"week": 4, "title": "Rebuilding Identity", "focus": "Rediscovering yourself outside the relationship"},
  {"week": 5, "title": "Financial Independence", "focus": "Managing finances as a single person"},
  {"week": 6, "title": "Social Connections", "focus": "Building new support networks"},
  {"week": 7, "title": "Future Planning", "focus": "Setting new goals and aspirations"},
  {"week": 8, "title": "Moving Forward", "focus": "Celebrating progress and continued growth"}
]'::jsonb),

('job-loss', 'Career Transition Support', 'Structured guidance through unexpected job loss and career change', 'career', 6,
'[
  {"week": 1, "title": "Processing the Loss", "focus": "Acknowledging feelings and avoiding self-blame"},
  {"week": 2, "title": "Financial Assessment", "focus": "Budgeting and understanding unemployment benefits"},
  {"week": 3, "title": "Skills Inventory", "focus": "Identifying transferable skills and strengths"},
  {"week": 4, "title": "Job Search Strategy", "focus": "Resume building and networking"},
  {"week": 5, "title": "Interview Preparation", "focus": "Confidence building and practice"},
  {"week": 6, "title": "New Opportunities", "focus": "Evaluating offers and making decisions"}
]'::jsonb),

('grief-healing', 'Grief & Loss Support', 'Compassionate guidance through the mourning process', 'loss', 12,
'[
  {"week": 1, "title": "Understanding Grief", "focus": "What to expect in the grieving process"},
  {"week": 2, "title": "Allowing Emotions", "focus": "Creating space for all feelings"},
  {"week": 3, "title": "Self-Care Basics", "focus": "Meeting physical and emotional needs"},
  {"week": 4, "title": "Memory Keeping", "focus": "Honoring your loved one"},
  {"week": 5, "title": "Social Support", "focus": "Connecting with others who understand"},
  {"week": 6, "title": "Managing Triggers", "focus": "Navigating holidays and anniversaries"},
  {"week": 7, "title": "Finding Meaning", "focus": "Making sense of loss"},
  {"week": 8, "title": "Guilt & Regret", "focus": "Processing complicated emotions"},
  {"week": 9, "title": "Identity Shifts", "focus": "Adjusting to life changes"},
  {"week": 10, "title": "Continuing Bonds", "focus": "Maintaining connection in new ways"},
  {"week": 11, "title": "Growth Through Grief", "focus": "Post-traumatic growth"},
  {"week": 12, "title": "Moving Forward", "focus": "Living fully while honoring loss"}
]'::jsonb),

('new-parent', 'New Parent Adjustment', 'Support for the overwhelming transition to parenthood', 'family', 8,
'[
  {"week": 1, "title": "The Fourth Trimester", "focus": "Physical and emotional recovery"},
  {"week": 2, "title": "Sleep & Survival", "focus": "Managing exhaustion and expectations"},
  {"week": 3, "title": "Identity Shifts", "focus": "Becoming a parent while staying yourself"},
  {"week": 4, "title": "Partner Dynamics", "focus": "Maintaining connection through change"},
  {"week": 5, "title": "Asking for Help", "focus": "Building your support network"},
  {"week": 6, "title": "Mental Health Check", "focus": "Recognizing postpartum challenges"},
  {"week": 7, "title": "Work-Life Balance", "focus": "Planning return to work or staying home"},
  {"week": 8, "title": "Finding Your Rhythm", "focus": "Creating sustainable routines"}
]'::jsonb),

('chronic-illness', 'Chronic Illness Adjustment', 'Emotional support for navigating a new health diagnosis', 'health', 10,
'[
  {"week": 1, "title": "Processing the Diagnosis", "focus": "Allowing shock and grief"},
  {"week": 2, "title": "Understanding Your Condition", "focus": "Becoming informed and empowered"},
  {"week": 3, "title": "Building Your Care Team", "focus": "Finding the right healthcare providers"},
  {"week": 4, "title": "Lifestyle Adjustments", "focus": "Making sustainable changes"},
  {"week": 5, "title": "Managing Pain & Symptoms", "focus": "Practical coping strategies"},
  {"week": 6, "title": "Identity & Self-Worth", "focus": "You are more than your illness"},
  {"week": 7, "title": "Communicating Needs", "focus": "Talking to loved ones about limitations"},
  {"week": 8, "title": "Work Accommodations", "focus": "Navigating employment with illness"},
  {"week": 9, "title": "Finding Community", "focus": "Connecting with others who understand"},
  {"week": 10, "title": "Living Fully", "focus": "Thriving despite chronic illness"}
]'::jsonb),

('retirement', 'Retirement Transition', 'Finding purpose and joy in the next chapter of life', 'life-stage', 6,
'[
  {"week": 1, "title": "Identity Beyond Work", "focus": "Who are you without your career?"},
  {"week": 2, "title": "Structure & Routine", "focus": "Creating meaningful daily rhythms"},
  {"week": 3, "title": "Social Connections", "focus": "Maintaining and building friendships"},
  {"week": 4, "title": "Purpose & Passion", "focus": "Discovering what brings you joy"},
  {"week": 5, "title": "Financial Confidence", "focus": "Living comfortably in retirement"},
  {"week": 6, "title": "Thriving Forward", "focus": "Embracing this new chapter"}
]'::jsonb);

-- =====================================================
-- UPDATE TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_sms_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER sms_preferences_updated_at
  BEFORE UPDATE ON public.sms_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_sms_preferences_updated_at();

CREATE OR REPLACE FUNCTION update_transition_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER transition_progress_updated_at
  BEFORE UPDATE ON public.user_transition_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_transition_progress_updated_at();