-- =====================================================
-- FIX CREATORS RLS POLICY AND UPDATE CATEGORIES
-- =====================================================

-- =====================================================
-- STEP 1: FIX CREATORS RLS POLICIES
-- =====================================================

-- Drop and recreate the creators INSERT policy to be more permissive
DROP POLICY IF EXISTS "Creators can insert their own profile" ON public.creators;

-- Allow any authenticated user to insert a creator profile with their own ID
CREATE POLICY "Authenticated users can create creator profile"
  ON public.creators FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Also ensure authenticated users can view their own creator profile after creation
DROP POLICY IF EXISTS "Creators can view their own profile" ON public.creators;
CREATE POLICY "Creators can view their own profile"
  ON public.creators FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR true); -- Allow anyone to view (already covered by "Anyone can view creator profiles")

-- =====================================================
-- STEP 2: REPLACE CATEGORIES WITH TONE TAGS
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
  ('Mysterious', 'mysterious', 'Enigmatic and intriguing tone', '🎭')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

-- =====================================================
-- STEP 3: FIX BUYERS RLS POLICY (for consistency)
-- =====================================================

-- Drop and recreate the buyers INSERT policy
DROP POLICY IF EXISTS "Buyers can insert their own profile" ON public.buyers;

CREATE POLICY "Authenticated users can create buyer profile"
  ON public.buyers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- COMPLETE! ✅
-- =====================================================

