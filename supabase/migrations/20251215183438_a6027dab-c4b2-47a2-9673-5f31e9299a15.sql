-- Fix remaining RLS Security Issues

-- 4. Tighten whispers table RLS - require authentication for viewing
DROP POLICY IF EXISTS "Anyone can view whispers" ON public.whispers;
CREATE POLICY "Authenticated users can view whispers" 
ON public.whispers 
FOR SELECT 
TO authenticated
USING (true);

-- 5. Tighten henry_questions RLS - require authentication, only show answered (status = 'answered')
DROP POLICY IF EXISTS "Anyone can view answered questions" ON public.henry_questions;
CREATE POLICY "Authenticated users can view answered questions" 
ON public.henry_questions 
FOR SELECT 
TO authenticated
USING (status = 'answered');

-- 6. Tighten replies table RLS - require authentication
DROP POLICY IF EXISTS "Anyone can view replies" ON public.replies;
CREATE POLICY "Authenticated users can view replies" 
ON public.replies 
FOR SELECT 
TO authenticated
USING (true);