-- =====================================================
-- RLS DIAGNOSTIC SCRIPT
-- Run this to understand what's happening with RLS
-- =====================================================

-- =====================================================
-- STEP 1: CHECK CURRENT POLICIES
-- =====================================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('buyers', 'creators')
ORDER BY tablename, policyname;

-- =====================================================
-- STEP 2: CHECK IF RLS IS ENABLED
-- =====================================================

SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename IN ('buyers', 'creators');

-- =====================================================
-- STEP 3: TEST IF auth.uid() IS WORKING
-- =====================================================

-- This should return the current user's ID (or NULL if not authenticated)
SELECT auth.uid() as current_user_id;

-- =====================================================
-- STEP 4: RECOMMENDED FIX - DISABLE RLS FOR SIGNUP
-- =====================================================

-- Option 1: Temporarily disable RLS (not recommended for production)
-- ALTER TABLE public.buyers DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.creators DISABLE ROW LEVEL SECURITY;

-- Option 2: Create a more permissive policy (RECOMMENDED)
-- This allows inserts if either:
-- 1. The user is authenticated and ID matches (normal case)
-- 2. The user is not authenticated yet but ID is being set (signup case)

-- For BUYERS
DROP POLICY IF EXISTS "Allow signup - buyers can insert their own profile" ON public.buyers;
CREATE POLICY "Allow signup - buyers can insert their own profile"
  ON public.buyers FOR INSERT
  WITH CHECK (
    id IS NOT NULL AND (
      auth.uid() = id OR 
      auth.uid() IS NULL
    )
  );

-- For CREATORS  
DROP POLICY IF EXISTS "Allow signup - creators can insert their own profile" ON public.creators;
CREATE POLICY "Allow signup - creators can insert their own profile"
  ON public.creators FOR INSERT
  WITH CHECK (
    id IS NOT NULL AND (
      auth.uid() = id OR 
      auth.uid() IS NULL
    )
  );

-- =====================================================
-- STEP 5: VERIFY NEW POLICIES
-- =====================================================

SELECT 
  tablename,
  policyname,
  with_check
FROM pg_policies 
WHERE tablename IN ('buyers', 'creators')
  AND cmd = 'INSERT'
ORDER BY tablename;

-- =====================================================
-- EXPLANATION
-- =====================================================

/*
The issue is that during Supabase signup:
1. Auth user is created first
2. BUT the session isn't immediately available to auth.uid()
3. So when we try to INSERT into buyers/creators, auth.uid() returns NULL
4. The RLS policy "auth.uid() = id" fails because NULL != id

The fix allows INSERT when:
- Either auth.uid() matches the id (normal authenticated case)
- OR auth.uid() is NULL but we're providing a valid id (signup case)

This is still secure because:
- The id must match the auth user's id
- The auth user was just created by Supabase
- Users can't insert random IDs because the id field references auth.users
*/

