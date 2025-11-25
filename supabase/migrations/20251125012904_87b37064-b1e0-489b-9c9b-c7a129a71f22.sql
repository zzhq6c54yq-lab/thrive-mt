-- Phase 1: Critical Tables (Fixed)

-- Henry Messages V2
CREATE TABLE IF NOT EXISTS public.henry_messages_v2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES henry_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  agent_type TEXT CHECK (agent_type IN ('router', 'therapy', 'crisis', 'wellness', 'coaching')),
  risk_assessment JSONB DEFAULT '{}'::jsonb,
  intent_classification JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Journal Entries
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  ai_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Insights
CREATE TABLE IF NOT EXISTS public.user_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL,
  insight_text TEXT NOT NULL,
  confidence_score NUMERIC,
  supporting_data JSONB,
  generated_at TIMESTAMPTZ DEFAULT now(),
  viewed BOOLEAN DEFAULT false
);

-- Update user_goals
ALTER TABLE public.user_goals 
ADD COLUMN IF NOT EXISTS completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

-- Crisis Escalations V2
CREATE TABLE IF NOT EXISTS public.crisis_escalations_v2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  trigger_source TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'moderate', 'high', 'critical')),
  trigger_data JSONB,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'acknowledged', 'resolved')),
  assigned_to UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Update therapists table
ALTER TABLE public.therapists 
ADD COLUMN IF NOT EXISTS specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS experience_years INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS match_score_factors JSONB DEFAULT '{}'::jsonb;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_henry_messages_v2_conversation ON public.henry_messages_v2(conversation_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_date ON public.journal_entries(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_insights_user ON public.user_insights(user_id, generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_crisis_escalations_v2_status ON public.crisis_escalations_v2(status, created_at DESC);

-- RLS Policies (using DROP IF EXISTS)
ALTER TABLE public.henry_messages_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_escalations_v2 ENABLE ROW LEVEL SECURITY;

-- Henry Messages V2 Policies
DROP POLICY IF EXISTS "Users can view own henry messages v2" ON public.henry_messages_v2;
CREATE POLICY "Users can view own henry messages v2"
  ON public.henry_messages_v2 FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM henry_conversations WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert own henry messages v2" ON public.henry_messages_v2;
CREATE POLICY "Users can insert own henry messages v2"
  ON public.henry_messages_v2 FOR INSERT
  TO authenticated
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM henry_conversations WHERE user_id = auth.uid()
    )
  );

-- Journal Entries Policies
DROP POLICY IF EXISTS "Users can manage own journal entries" ON public.journal_entries;
CREATE POLICY "Users can manage own journal entries"
  ON public.journal_entries FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- User Insights Policies
DROP POLICY IF EXISTS "Users can view own insights" ON public.user_insights;
CREATE POLICY "Users can view own insights"
  ON public.user_insights FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own insights" ON public.user_insights;
CREATE POLICY "Users can update own insights"
  ON public.user_insights FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Crisis Escalations V2 Policies
DROP POLICY IF EXISTS "Users can view own crisis escalations v2" ON public.crisis_escalations_v2;
CREATE POLICY "Users can view own crisis escalations v2"
  ON public.crisis_escalations_v2 FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Service role can manage crisis escalations v2" ON public.crisis_escalations_v2;
CREATE POLICY "Service role can manage crisis escalations v2"
  ON public.crisis_escalations_v2 FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Trigger for journal updated_at
CREATE OR REPLACE FUNCTION update_journal_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS journal_updated_at_trigger ON public.journal_entries;
CREATE TRIGGER journal_updated_at_trigger
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_journal_updated_at();