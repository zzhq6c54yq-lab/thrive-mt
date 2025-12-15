-- Create RLS policies for views by making them security invoker
-- therapists_directory is already set, but ensure henry_qa_feed is also secured

-- Check if henry_qa_feed is a view and set security_invoker
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.views WHERE table_name = 'henry_qa_feed' AND table_schema = 'public') THEN
    EXECUTE 'ALTER VIEW public.henry_qa_feed SET (security_invoker = on)';
  END IF;
END $$;

-- Drop any remaining public policies on community_groups and re-add authenticated-only
DROP POLICY IF EXISTS "Anyone can view active groups" ON public.community_groups;
DROP POLICY IF EXISTS "Anyone can view active community groups" ON public.community_groups;

CREATE POLICY "Authenticated users can view active groups"
ON public.community_groups FOR SELECT
TO authenticated
USING (is_active = true);