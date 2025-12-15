-- Fix remaining RLS issues with correct column names

-- 4. Henry Answers - require authentication, check published_at is not null
DROP POLICY IF EXISTS "Anyone can view published answers" ON public.henry_answers;
CREATE POLICY "Authenticated users can view published answers" 
ON public.henry_answers 
FOR SELECT 
TO authenticated
USING (published_at IS NOT NULL);

-- 5. Activities Catalog - require authentication
DROP POLICY IF EXISTS "Anyone can view activities catalog" ON public.activities_catalog;
CREATE POLICY "Authenticated users can view activities catalog" 
ON public.activities_catalog 
FOR SELECT 
TO authenticated
USING (true);

-- 6. Achievement Badges - require authentication
DROP POLICY IF EXISTS "Anyone can view achievement badges" ON public.achievement_badges;
CREATE POLICY "Authenticated users can view achievement badges" 
ON public.achievement_badges 
FOR SELECT 
TO authenticated
USING (true);

-- 7. Life Transition Programs - require authentication (no is_active column)
DROP POLICY IF EXISTS "Anyone can view transition programs" ON public.life_transition_programs;
CREATE POLICY "Authenticated users can view transition programs" 
ON public.life_transition_programs 
FOR SELECT 
TO authenticated
USING (true);