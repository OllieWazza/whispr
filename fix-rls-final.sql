-- =====================================================
-- FINAL FIX FOR RLS POLICIES
-- This handles existing policies and makes signup work
-- =====================================================

-- =====================================================
-- STEP 1: DROP ALL EXISTING POLICIES
-- =====================================================

-- Drop all buyers policies
DROP POLICY IF EXISTS "Buyers can view their own profile" ON public.buyers;
DROP POLICY IF EXISTS "Buyers can update their own profile" ON public.buyers;
DROP POLICY IF EXISTS "Buyers can insert their own profile" ON public.buyers;
DROP POLICY IF EXISTS "Authenticated users can create buyer profile" ON public.buyers;

-- Drop all creators policies
DROP POLICY IF EXISTS "Anyone can view creator profiles" ON public.creators;
DROP POLICY IF EXISTS "Creators can view their own profile" ON public.creators;
DROP POLICY IF EXISTS "Creators can update their own profile" ON public.creators;
DROP POLICY IF EXISTS "Creators can insert their own profile" ON public.creators;
DROP POLICY IF EXISTS "Authenticated users can create creator profile" ON public.creators;

-- =====================================================
-- STEP 2: CREATE NEW PERMISSIVE POLICIES
-- =====================================================

-- BUYERS POLICIES
-- Allow anyone (including anon) to insert, but must match their auth.uid()
CREATE POLICY "Allow signup - buyers can insert their own profile"
  ON public.buyers FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Buyers can view their own profile
CREATE POLICY "Buyers can view their own profile"
  ON public.buyers FOR SELECT
  USING (auth.uid() = id);

-- Buyers can update their own profile
CREATE POLICY "Buyers can update their own profile"
  ON public.buyers FOR UPDATE
  USING (auth.uid() = id);

-- CREATORS POLICIES
-- Allow anyone (including anon) to insert, but must match their auth.uid()
CREATE POLICY "Allow signup - creators can insert their own profile"
  ON public.creators FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Anyone can view creator profiles (public)
CREATE POLICY "Anyone can view creator profiles"
  ON public.creators FOR SELECT
  USING (true);

-- Creators can update their own profile
CREATE POLICY "Creators can update their own profile"
  ON public.creators FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- STEP 3: REPLACE CATEGORIES WITH TONE TAGS
-- =====================================================

-- Clear existing categories
DELETE FROM public.categories;

-- Insert new tone tags
INSERT INTO public.categories (name, slug, description, icon) VALUES
  -- Row 1
  ('Flirty', 'flirty', 'Playful and teasing voice tone', '😘'),
  ('Playful', 'playful', 'Fun and lighthearted tone', '😄'),
  ('Soothing', 'soothing', 'Calm and relaxing voice', '😌'),
  ('Sultry', 'sultry', 'Deep and seductive tone', '🔥'),
  ('Soft-spoken', 'soft-spoken', 'Gentle and quiet voice', '🤫'),
  ('Energetic', 'energetic', 'Upbeat and lively tone', '⚡'),
  ('Seductive', 'seductive', 'Alluring and enticing voice', '💋'),
  ('Innocent', 'innocent', 'Sweet and pure tone', '😇'),
  ('Dominant', 'dominant', 'Commanding and assertive voice', '👑'),
  ('Submissive', 'submissive', 'Obedient and yielding tone', '🙇'),
  ('Sweet', 'sweet', 'Kind and gentle voice', '🍬'),
  ('Naughty', 'naughty', 'Mischievous and cheeky tone', '😈'),
  -- Row 2
  ('Teasing', 'teasing', 'Playfully provocative voice', '😏'),
  ('Confident', 'confident', 'Self-assured and strong tone', '💪'),
  ('Shy', 'shy', 'Reserved and timid voice', '🙈'),
  ('Professional', 'professional', 'Business-like and formal tone', '💼'),
  ('Casual', 'casual', 'Relaxed and informal voice', '👕'),
  ('Intimate', 'intimate', 'Close and personal tone', '💕'),
  ('Passionate', 'passionate', 'Intense and emotional voice', '❤️‍🔥'),
  ('Mysterious', 'mysterious', 'Enigmatic and intriguing tone', '🎭');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check that policies were created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('buyers', 'creators')
ORDER BY tablename, policyname;

-- =====================================================
-- COMPLETE! ✅
-- =====================================================
-- You should see 3 policies for buyers and 3 for creators
-- Now try signing up as a buyer or creator!

