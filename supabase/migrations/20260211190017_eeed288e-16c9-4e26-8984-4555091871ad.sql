
-- Create user_health_metrics table for storing synced health data with sleep stage support
CREATE TABLE public.user_health_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  steps INTEGER,
  heart_rate_avg NUMERIC(5,1),
  heart_rate_min INTEGER,
  heart_rate_max INTEGER,
  active_calories INTEGER,
  distance_km NUMERIC(6,2),
  sleep_duration_hours NUMERIC(4,1),
  sleep_stages JSONB DEFAULT '{}',
  source TEXT NOT NULL DEFAULT 'manual',
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, metric_date, source)
);

-- Enable RLS
ALTER TABLE public.user_health_metrics ENABLE ROW LEVEL SECURITY;

-- Users can only access their own health metrics
CREATE POLICY "Users can view their own health metrics"
  ON public.user_health_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health metrics"
  ON public.user_health_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health metrics"
  ON public.user_health_metrics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health metrics"
  ON public.user_health_metrics FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_health_metrics_updated_at
  BEFORE UPDATE ON public.user_health_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Index for fast lookups
CREATE INDEX idx_user_health_metrics_user_date ON public.user_health_metrics(user_id, metric_date DESC);
CREATE INDEX idx_user_health_metrics_source ON public.user_health_metrics(source);
