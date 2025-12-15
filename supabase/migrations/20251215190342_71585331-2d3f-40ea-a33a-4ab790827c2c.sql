-- Fix therapists_directory view - add RLS
ALTER VIEW public.therapists_directory SET (security_invoker = on);

-- Fix henry_qa_feed - enable RLS if it's a table
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'henry_qa_feed' AND schemaname = 'public') THEN
    ALTER TABLE public.henry_qa_feed ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Authenticated users can view qa feed" ON public.henry_qa_feed;
    CREATE POLICY "Authenticated users can view qa feed"
    ON public.henry_qa_feed FOR SELECT
    TO authenticated
    USING (true);
  END IF;
END $$;

-- For therapists/coaches - the policies requiring authentication were already applied
-- The scanner may be showing stale data. Double check by re-applying:
DROP POLICY IF EXISTS "Anyone can view active therapists" ON public.therapists;
DROP POLICY IF EXISTS "Public can view active therapists" ON public.therapists;

DROP POLICY IF EXISTS "Anyone can view active coaches" ON public.coaches;
DROP POLICY IF EXISTS "Public can view active coaches" ON public.coaches;