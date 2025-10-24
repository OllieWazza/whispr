-- =====================================================
-- FIX BUYERS POLICY SPECIFICALLY
-- =====================================================

-- Drop all buyers INSERT policies
DROP POLICY IF EXISTS "Buyers can insert during signup or when authenticated" ON public.buyers;
DROP POLICY IF EXISTS "Allow signup - buyers can insert their own profile" ON public.buyers;
DROP POLICY IF EXISTS "Buyers can insert their own profile" ON public.buyers;
DROP POLICY IF EXISTS "Authenticated users can create buyer profile" ON public.buyers;

-- Create the working policy (same as creators)
CREATE POLICY "Buyers can insert during signup or when authenticated"
  ON public.buyers FOR INSERT
  WITH CHECK (
    id IS NOT NULL AND (
      auth.uid() = id OR 
      auth.uid() IS NULL
    )
  );

-- Verify it was created
SELECT 
  tablename,
  policyname,
  cmd,
  with_check
FROM pg_policies 
WHERE tablename = 'buyers'
  AND cmd = 'INSERT';

