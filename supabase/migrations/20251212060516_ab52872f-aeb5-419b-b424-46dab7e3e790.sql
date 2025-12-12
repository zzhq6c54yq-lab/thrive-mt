-- =============================================
-- ThriveMT Backend Enhancement Migration (Final)
-- =============================================

-- 1. Add storage_files table for file audit trail
CREATE TABLE IF NOT EXISTS public.storage_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  bucket text NOT NULL,
  path text NOT NULL,
  mime_type text,
  size bigint,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on storage_files
ALTER TABLE public.storage_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for storage_files
CREATE POLICY "Users can view own files" ON public.storage_files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own files" ON public.storage_files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own files" ON public.storage_files
  FOR DELETE USING (auth.uid() = user_id);

-- 2. Add points_ledger table for gamification audit trail
CREATE TABLE IF NOT EXISTS public.points_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  change int NOT NULL,
  reason text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on points_ledger
ALTER TABLE public.points_ledger ENABLE ROW LEVEL SECURITY;

-- RLS policies for points_ledger
CREATE POLICY "Users can view own points ledger" ON public.points_ledger
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert points" ON public.points_ledger
  FOR INSERT WITH CHECK (true);

-- 3. Add performance indexes (corrected column names)
CREATE INDEX IF NOT EXISTS idx_therapy_bookings_user_date 
  ON public.therapy_bookings (user_id, appointment_date DESC);

CREATE INDEX IF NOT EXISTS idx_therapist_messages_client_created 
  ON public.therapist_messages (client_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_storage_files_user 
  ON public.storage_files (user_id);

CREATE INDEX IF NOT EXISTS idx_points_ledger_user 
  ON public.points_ledger (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_henry_messages_conv_created 
  ON public.henry_messages (conversation_id, created_at DESC);

-- 4. Add trigger for auto-applying points changes
CREATE OR REPLACE FUNCTION public.apply_points_change()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles 
  SET points = COALESCE(points, 0) + NEW.change
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger if not exists
DROP TRIGGER IF EXISTS trg_apply_points ON public.points_ledger;
CREATE TRIGGER trg_apply_points
  AFTER INSERT ON public.points_ledger
  FOR EACH ROW EXECUTE FUNCTION public.apply_points_change();

-- 5. Drop duplicate henry_messages_v2 table if empty
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'henry_messages_v2') THEN
    IF NOT EXISTS (SELECT 1 FROM public.henry_messages_v2 LIMIT 1) THEN
      DROP TABLE IF EXISTS public.henry_messages_v2;
      RAISE NOTICE 'Dropped empty henry_messages_v2 table';
    ELSE
      RAISE NOTICE 'henry_messages_v2 contains data, skipping drop';
    END IF;
  END IF;
END $$;