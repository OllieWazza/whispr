-- =====================================================
-- DUMMY DATA FOR TESTING WHISPR
-- =====================================================
-- This script creates test creators, listings, and tiers
-- Run this AFTER running supabase-fresh-install.sql

-- =====================================================
-- 1. CREATE TEST CREATORS
-- =====================================================
-- Note: You'll need to manually create auth users first via Supabase Auth UI or signup flow
-- These IDs should match actual auth.users IDs you create

-- Example: After creating auth users, insert their profile data here
-- Replace these UUIDs with actual auth.users IDs from your Supabase Auth panel

INSERT INTO public.creators (id, email, display_name, bio, profile_picture_url, rating, total_completed_jobs, response_time, satisfaction_rate)
VALUES 
  -- Creator 1: Scarlett Vixen
  ('00000000-0000-0000-0000-000000000001', 'scarlett@whispr.test', 'Scarlett Vixen', 
   'Specializing in sultry ASMR and intimate storytelling. Let me bring your fantasies to life with my voice. 5+ years creating custom audio experiences that will leave you breathless. 💋',
   'https://images.unsplash.com/photo-1693333412376-7e9ab19f38de?w=400',
   5.0, 342, '1 hour', 99),

  -- Creator 2: Lacey Wilde
  ('00000000-0000-0000-0000-000000000002', 'lacey@whispr.test', 'Lacey Wilde',
   'Passionate about creating sensual stories that captivate and excite. Your desires are my inspiration.',
   'https://images.unsplash.com/photo-1620025719617-d52f785ae152?w=400',
   5.0, 478, '2 hours', 98),

  -- Creator 3: Vanessa Knight
  ('00000000-0000-0000-0000-000000000003', 'vanessa@whispr.test', 'Vanessa Knight',
   'Expert in roleplay and fantasy scenarios. Let\'s explore your deepest desires together.',
   'https://images.unsplash.com/photo-1700409589705-c06d984856af?w=400',
   5.0, 412, '30 minutes', 99),

  -- Creator 4: Bianca Luxe
  ('00000000-0000-0000-0000-000000000004', 'bianca@whispr.test', 'Bianca Luxe',
   'Intimate voice messages that feel like we\'re together. Your personal audio girlfriend.',
   'https://images.unsplash.com/photo-1615675101506-2ca1b9679a04?w=400',
   5.0, 523, '1 hour', 100),

  -- Creator 5: Angelica Noir
  ('00000000-0000-0000-0000-000000000005', 'angelica@whispr.test', 'Angelica Noir',
   'Flirty greetings and playful teasing. I love making you smile and blush.',
   'https://images.unsplash.com/photo-1739379201143-5c808ecab4a9?w=400',
   5.0, 467, '45 minutes', 97),

  -- Creator 6: Amber Reign
  ('00000000-0000-0000-0000-000000000006', 'amber@whispr.test', 'Amber Reign',
   'Roleplay master with a sultry voice. Let me be whoever you want me to be.',
   'https://images.unsplash.com/photo-1646375053039-9de58d924341?w=400',
   5.0, 256, '1 hour', 96),

  -- Creator 7: Roxy Blaze
  ('00000000-0000-0000-0000-000000000007', 'roxy@whispr.test', 'Roxy Blaze',
   'ASMR expert specializing in soothing and sensual sounds.',
   'https://images.unsplash.com/photo-1547626279-671ad06bbb45?w=400',
   4.5, 198, '2 hours', 95),

  -- Creator 8: Crystal Divine
  ('00000000-0000-0000-0000-000000000008', 'crystal@whispr.test', 'Crystal Divine',
   'Playful and teasing. I love having fun and making you feel special.',
   'https://images.unsplash.com/photo-1712407336051-1ab4a8676079?w=400',
   4.5, 289, '1 hour', 94)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. CREATE TEST LISTINGS
-- =====================================================

INSERT INTO public.listings (creator_id, title, description, content_type, starting_price, rating, total_reviews, is_instant_buy, thumbnail_url)
VALUES 
  -- Scarlett Vixen's Listings
  ('00000000-0000-0000-0000-000000000001', 'Sultry Bedtime Story - Custom ASMR', 
   'Let me whisper you to sleep with a personalized bedtime story, designed just for you. Soft, sultry, and deeply relaxing.',
   'voice', 35.00, 5.0, 45, false,
   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'),

  ('00000000-0000-0000-0000-000000000001', 'Good Morning Sunshine - Wake Up Call',
   'Start your day right with a flirty, playful wake-up message personalized just for you.',
   'voice', 25.00, 5.0, 78, false,
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'),

  -- Lacey Wilde's Listings
  ('00000000-0000-0000-0000-000000000002', 'Sensual Story Time - Adult Fantasy',
   'A custom sensual story brought to life with my voice. Tell me your fantasy and I\'ll make it unforgettable.',
   'voice', 45.00, 5.0, 67, false,
   'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400'),

  ('00000000-0000-0000-0000-000000000002', 'Intimate Voice Letter',
   'A personal, intimate voice message just for you. Share your thoughts and I\'ll respond with warmth.',
   'voice', 30.00, 4.9, 34, false,
   'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'),

  -- Vanessa Knight's Listings
  ('00000000-0000-0000-0000-000000000003', 'Roleplay Session - Your Fantasy',
   'Let\'s bring your fantasy to life. Tell me who you want me to be and I\'ll deliver an immersive experience.',
   'voice', 55.00, 5.0, 89, false,
   'https://images.unsplash.com/photo-1640876305588-dbdab5869200?w=400'),

  -- Bianca Luxe's Listings
  ('00000000-0000-0000-0000-000000000004', 'Girlfriend Experience Audio',
   'A sweet, intimate audio message as if I\'m your girlfriend. Perfect for when you miss that special someone.',
   'voice', 40.00, 5.0, 112, false,
   'https://images.unsplash.com/photo-1696337431362-ba8368c09bf7?w=400'),

  ('00000000-0000-0000-0000-000000000004', 'Daily Check-In Messages',
   'Subscribe for daily personalized voice messages. I\'ll be your virtual companion.',
   'voice', 50.00, 5.0, 98, false,
   'https://images.unsplash.com/photo-1615675101506-2ca1b9679a04?w=400'),

  -- Angelica Noir's Listings
  ('00000000-0000-0000-0000-000000000005', 'Flirty Voice Note Bundle',
   'A collection of playful, flirty voice notes to brighten your day.',
   'voice', 35.00, 4.8, 56, false,
   'https://images.unsplash.com/photo-1739379201143-5c808ecab4a9?w=400'),

  -- Amber Reign's Listings
  ('00000000-0000-0000-0000-000000000006', 'Dominant Roleplay Session',
   'Let me take control. A sultry, dominant roleplay experience tailored to your desires.',
   'voice', 48.00, 5.0, 43, false,
   'https://images.unsplash.com/photo-1646375053039-9de58d924341?w=400'),

  -- Roxy Blaze's Listings
  ('00000000-0000-0000-0000-000000000007', 'ASMR Relaxation Session',
   'Pure ASMR bliss. Triggers, whispers, and sounds to help you unwind and relax.',
   'voice', 30.00, 4.5, 34, false,
   'https://images.unsplash.com/photo-1547626279-671ad06bbb45?w=400'),

  -- Crystal Divine's Listings
  ('00000000-0000-0000-0000-000000000008', 'Playful Teasing Audio',
   'Fun, playful, and just a little bit naughty. Let me tease you with my words.',
   'voice', 38.00, 4.6, 28, false,
   'https://images.unsplash.com/photo-1712407336051-1ab4a8676079?w=400');

-- =====================================================
-- 3. CREATE PRICING TIERS FOR LISTINGS
-- =====================================================
-- Note: This assumes the listings were inserted in order
-- You may need to adjust listing_id values based on actual UUIDs generated

-- For each listing, create 2-3 tiers (Basic, Premium, Exclusive)

-- Scarlett Vixen - Sultry Bedtime Story
INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'basic', 35.00, 
  '3-minute personalized bedtime story • 1 revision • MP3 format • Delivered in 24 hours',
  '24 hours', 1
FROM public.listings WHERE title = 'Sultry Bedtime Story - Custom ASMR' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'premium', 60.00,
  '5-minute premium story • 3 revisions • HD audio • Script consultation • Delivered in 48 hours',
  '48 hours', 3
FROM public.listings WHERE title = 'Sultry Bedtime Story - Custom ASMR' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'exclusive', 100.00,
  '10-minute exclusive experience • Unlimited revisions • Studio quality • Video call consultation • Delivered in 3 days',
  '3 days', 999
FROM public.listings WHERE title = 'Sultry Bedtime Story - Custom ASMR' LIMIT 1;

-- Scarlett Vixen - Good Morning Call
INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'basic', 25.00,
  '30-second wake-up message • 1 revision • Delivered in 12 hours',
  '12 hours', 1
FROM public.listings WHERE title = 'Good Morning Sunshine - Wake Up Call' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'premium', 45.00,
  '2-minute personalized message • 2 revisions • HD audio • Delivered in 24 hours',
  '24 hours', 2
FROM public.listings WHERE title = 'Good Morning Sunshine - Wake Up Call' LIMIT 1;

-- Lacey Wilde - Sensual Story
INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'basic', 45.00,
  '5-minute sensual story • 1 revision • Delivered in 48 hours',
  '48 hours', 1
FROM public.listings WHERE title = 'Sensual Story Time - Adult Fantasy' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'premium', 75.00,
  '10-minute premium story • 3 revisions • HD audio • Custom script • Delivered in 3 days',
  '3 days', 3
FROM public.listings WHERE title = 'Sensual Story Time - Adult Fantasy' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'exclusive', 120.00,
  '20-minute exclusive fantasy • Unlimited revisions • Studio quality • Video consultation • Delivered in 5 days',
  '5 days', 999
FROM public.listings WHERE title = 'Sensual Story Time - Adult Fantasy' LIMIT 1;

-- Lacey Wilde - Voice Letter
INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'basic', 30.00,
  '3-minute intimate message • 1 revision • Delivered in 24 hours',
  '24 hours', 1
FROM public.listings WHERE title = 'Intimate Voice Letter' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'premium', 50.00,
  '7-minute personal response • 2 revisions • HD audio • Delivered in 48 hours',
  '48 hours', 2
FROM public.listings WHERE title = 'Intimate Voice Letter' LIMIT 1;

-- Vanessa Knight - Roleplay
INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'basic', 55.00,
  '5-minute roleplay • 1 revision • Delivered in 48 hours',
  '48 hours', 1
FROM public.listings WHERE title = 'Roleplay Session - Your Fantasy' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'premium', 85.00,
  '10-minute immersive roleplay • 3 revisions • Character development • Delivered in 3 days',
  '3 days', 3
FROM public.listings WHERE title = 'Roleplay Session - Your Fantasy' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'exclusive', 150.00,
  '20-minute premium roleplay • Unlimited revisions • Full script • Video call prep • Delivered in 5 days',
  '5 days', 999
FROM public.listings WHERE title = 'Roleplay Session - Your Fantasy' LIMIT 1;

-- Bianca Luxe - GFE Audio
INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'basic', 40.00,
  '5-minute girlfriend experience • 1 revision • Delivered in 24 hours',
  '24 hours', 1
FROM public.listings WHERE title = 'Girlfriend Experience Audio' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'premium', 70.00,
  '10-minute intimate experience • 3 revisions • Personalized details • Delivered in 48 hours',
  '48 hours', 3
FROM public.listings WHERE title = 'Girlfriend Experience Audio' LIMIT 1;

-- Bianca Luxe - Daily Messages
INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'basic', 50.00,
  '1 daily message for 7 days • Personalized greetings',
  '24 hours', 0
FROM public.listings WHERE title = 'Daily Check-In Messages' LIMIT 1;

INSERT INTO public.listing_tiers (listing_id, tier_name, price, description, delivery_time, revisions)
SELECT id, 'premium', 120.00,
  '2 daily messages for 14 days • Morning & evening check-ins • Personalized content',
  '24 hours', 0
FROM public.listings WHERE title = 'Daily Check-In Messages' LIMIT 1;

-- Continue with remaining listings...
-- (You can add more tiers following the same pattern)

-- =====================================================
-- 4. CREATE TEST BUYER
-- =====================================================
-- Example buyer profile (you'll need to create the auth user first)

INSERT INTO public.buyers (id, email, display_name)
VALUES 
  ('00000000-0000-0000-0000-000000000100', 'testbuyer@whispr.test', 'Test Buyer')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. The UUIDs used here (000000...) are placeholders
--    You MUST create actual auth users via Supabase Auth first
--    Then replace these IDs with the real auth.users IDs

-- 2. To create auth users:
--    - Go to Supabase Dashboard > Authentication > Users
--    - Click "Add user" and create accounts
--    - Copy the user ID and use it in this script

-- 3. Alternatively, use the signup flow in your app to create users
--    Then their profiles will be automatically created

-- 4. For production, you'd want to:
--    - Use real profile pictures
--    - Add proper category linking
--    - Create sample orders and reviews
--    - Add instant buy items

-- 5. This script is safe to run multiple times (uses ON CONFLICT DO NOTHING)

