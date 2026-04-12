
-- Create henry_daily_usage table for tracking daily message limits
CREATE TABLE public.henry_daily_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  message_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, usage_date)
);

ALTER TABLE public.henry_daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage"
  ON public.henry_daily_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage"
  ON public.henry_daily_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage"
  ON public.henry_daily_usage FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX idx_henry_daily_usage_user_date ON public.henry_daily_usage(user_id, usage_date);

-- Function to get today's usage count (used by edge function with service role)
CREATE OR REPLACE FUNCTION public.get_henry_daily_count(_user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT message_count FROM public.henry_daily_usage 
     WHERE user_id = _user_id AND usage_date = CURRENT_DATE),
    0
  );
$$;

-- Trigger for updated_at
CREATE TRIGGER update_henry_daily_usage_updated_at
  BEFORE UPDATE ON public.henry_daily_usage
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
