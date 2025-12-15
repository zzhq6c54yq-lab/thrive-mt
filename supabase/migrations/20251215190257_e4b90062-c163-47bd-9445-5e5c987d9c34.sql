-- Fix support_wall - require authentication, use is_flagged instead of is_approved
DROP POLICY IF EXISTS "Authenticated users can view support wall posts" ON public.support_wall;
DROP POLICY IF EXISTS "Anyone can view support wall posts" ON public.support_wall;
DROP POLICY IF EXISTS "Anyone can view non-flagged posts" ON public.support_wall;

CREATE POLICY "Authenticated users can view non-flagged posts"
ON public.support_wall FOR SELECT
TO authenticated
USING (is_flagged = false);