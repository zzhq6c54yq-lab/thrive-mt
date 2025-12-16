-- Drop old public access policy on therapists table
DROP POLICY IF EXISTS "Therapists are viewable by everyone" ON public.therapists;

-- Verify only authenticated policies remain
-- (The "Authenticated users can view active therapists" and "Authenticated users can view all therapists" policies will remain)