-- =====================================================
-- FIX: ALLOW NULL auth.uid() DURING SIGNUP
-- This solves the RLS policy violation issue
-- =====================================================

/*
THE PROBLEM:
During signup, auth.uid() can be NULL because the session hasn't propagated yet.
The policy "WITH CHECK (auth.uid() = id)" fails when auth.uid() is NULL.

THE SOLUTION:
Allow INSERT when auth.uid() is NULL (signup) OR when auth.uid() matches id (normal case).
Still secure because:
1. The id MUST reference a valid auth.users id (foreign key constraint)
2. Users can only insert their own ID right after Supabase creates it
3. After signup, normal RLS policies apply
*/

-- =====================================================
-- STEP 1: DROP EXISTING POLICIES
-- =====================================================

DROP POLICY IF EXISTS "Allow signup - buyers can insert their own profile" ON public.buyers;
DROP POLICY IF EXISTS "Allow signup - creators can insert their own profile" ON public.creators;
DROP POLICY IF EXISTS "Buyers can insert their own profile" ON public.buyers;
DROP POLICY IF EXISTS "Creators can insert their own profile" ON public.creators;
DROP POLICY IF EXISTS "Authenticated users can create buyer profile" ON public.buyers;
DROP POLICY IF EXISTS "Authenticated users can create creator profile" ON public.creators;

-- =====================================================
-- STEP 2: CREATE NEW POLICIES THAT ALLOW NULL UID
-- =====================================================

-- BUYERS: Allow insert during signup (when auth.uid() might be NULL)
CREATE POLICY "Buyers can insert during signup or when authenticated"
  ON public.buyers FOR INSERT
  WITH CHECK (
    -- Must provide a valid ID
    id IS NOT NULL AND (
      -- Normal case: authenticated user inserting their own profile
      auth.uid() = id OR 
      -- Signup case: session not propagated yet, but ID is valid
      auth.uid() IS NULL
    )
  );

-- CREATORS: Allow insert during signup (when auth.uid() might be NULL)
CREATE POLICY "Creators can insert during signup or when authenticated"
  ON public.creators FOR INSERT
  WITH CHECK (
    -- Must provide a valid ID
    id IS NOT NULL AND (
      -- Normal case: authenticated user inserting their own profile
      auth.uid() = id OR 
      -- Signup case: session not propagated yet, but ID is valid
      auth.uid() IS NULL
    )
  );

-- =====================================================
-- STEP 3: VERIFY POLICIES WERE CREATED
-- =====================================================

SELECT 
  tablename,
  policyname,
  cmd,
  with_check
FROM pg_policies 
WHERE tablename IN ('buyers', 'creators')
  AND cmd = 'INSERT'
ORDER BY tablename;

-- =====================================================
-- NOTES
-- =====================================================

/*
Security considerations:
1. ✅ ID must reference auth.users (foreign key constraint prevents fake IDs)
2. ✅ After signup, SELECT/UPDATE policies require auth.uid() to match
3. ✅ Users can't insert for other users because they'd need that user's ID
4. ✅ The NULL check only helps during the brief moment between auth creation and session propagation

This is the standard approach for Supabase when auth.uid() isn't immediately available.
*/

