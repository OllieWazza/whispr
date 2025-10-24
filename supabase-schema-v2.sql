-- =====================================================
-- WHISPR DATABASE SCHEMA V2
-- Separate Buyers and Creators Tables
-- =====================================================

-- =====================================================
-- 1. BUYERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.buyers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  profile_picture_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. CREATORS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.creators (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  profile_picture_url TEXT,
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_completed_jobs INTEGER DEFAULT 0,
  response_time TEXT DEFAULT '24 hours',
  satisfaction_rate INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Personal', 'personal', 'Personal messages and greetings', '👤'),
  ('Voiceover', 'voiceover', 'Professional voiceover work', '🎙️'),
  ('Product', 'product', 'Product reviews and promotions', '📦'),
  ('Custom Video', 'custom-video', 'Personalized video content', '🎥'),
  ('Custom Photo', 'custom-photo', 'Custom photo content', '📸'),
  ('Voice Notes', 'voice-notes', 'Voice messages and notes', '🎵'),
  ('Videos', 'videos', 'Video content', '🎬'),
  ('Instant Buy', 'instant-buy', 'Ready-to-purchase content', '⚡')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 4. LISTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT CHECK (content_type IN ('voice', 'photo', 'video')),
  thumbnail_url TEXT,
  photo1_url TEXT,
  photo2_url TEXT,
  photo3_url TEXT,
  starting_price DECIMAL(10,2) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  is_instant_buy BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. LISTING_CATEGORIES (Junction Table)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.listing_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  UNIQUE(listing_id, category_id)
);

-- =====================================================
-- 6. LISTING_TIERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.listing_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  tier_name TEXT CHECK (tier_name IN ('standard', 'premium', 'exclusive')),
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  delivery_time TEXT,
  revisions INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, tier_name)
);

-- =====================================================
-- 7. INSTANT_BUYS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.instant_buys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT CHECK (media_type IN ('voice', 'photo', 'video')),
  media_url TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration TEXT,
  file_size_mb DECIMAL(10,2),
  total_purchases INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES public.buyers(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES public.listing_tiers(id) ON DELETE SET NULL,
  instant_buy_id UUID REFERENCES public.instant_buys(id) ON DELETE SET NULL,
  order_type TEXT CHECK (order_type IN ('custom', 'instant_buy')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'refunded')),
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  creator_earnings DECIMAL(10,2) NOT NULL,
  instructions TEXT,
  delivery_url TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID UNIQUE NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.buyers(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 10. WAITLIST TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for buyers table
DROP TRIGGER IF EXISTS update_buyers_updated_at ON public.buyers;
CREATE TRIGGER update_buyers_updated_at
  BEFORE UPDATE ON public.buyers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for creators table
DROP TRIGGER IF EXISTS update_creators_updated_at ON public.creators;
CREATE TRIGGER update_creators_updated_at
  BEFORE UPDATE ON public.creators
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for listings table
DROP TRIGGER IF EXISTS update_listings_updated_at ON public.listings;
CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for orders table
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update listing rating when review is added
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.listings
  SET 
    rating = (SELECT AVG(rating) FROM public.reviews WHERE listing_id = NEW.listing_id),
    total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE listing_id = NEW.listing_id)
  WHERE id = NEW.listing_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_listing_rating ON public.reviews;
CREATE TRIGGER trigger_update_listing_rating
  AFTER INSERT ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_listing_rating();

-- Function to update creator stats when order is completed
CREATE OR REPLACE FUNCTION update_creator_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.creators
    SET 
      total_completed_jobs = total_completed_jobs + 1,
      rating = (
        SELECT AVG(rating) 
        FROM public.reviews 
        WHERE creator_id = NEW.creator_id
      )
    WHERE id = NEW.creator_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_creator_stats ON public.orders;
CREATE TRIGGER trigger_update_creator_stats
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_creator_stats();

-- Function to increment instant buy purchases
CREATE OR REPLACE FUNCTION increment_instant_buy_purchases()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_type = 'instant_buy' AND NEW.instant_buy_id IS NOT NULL THEN
    UPDATE public.instant_buys
    SET total_purchases = total_purchases + 1
    WHERE id = NEW.instant_buy_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_increment_instant_buy_purchases ON public.orders;
CREATE TRIGGER trigger_increment_instant_buy_purchases
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION increment_instant_buy_purchases();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instant_buys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Buyers policies
DROP POLICY IF EXISTS "Buyers can view their own profile" ON public.buyers;
CREATE POLICY "Buyers can view their own profile"
  ON public.buyers FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Buyers can update their own profile" ON public.buyers;
CREATE POLICY "Buyers can update their own profile"
  ON public.buyers FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Buyers can insert their own profile" ON public.buyers;
CREATE POLICY "Buyers can insert their own profile"
  ON public.buyers FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Creators policies
DROP POLICY IF EXISTS "Anyone can view creator profiles" ON public.creators;
CREATE POLICY "Anyone can view creator profiles"
  ON public.creators FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Creators can update their own profile" ON public.creators;
CREATE POLICY "Creators can update their own profile"
  ON public.creators FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Creators can insert their own profile" ON public.creators;
CREATE POLICY "Creators can insert their own profile"
  ON public.creators FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Categories policies
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  TO public
  USING (true);

-- Listings policies
DROP POLICY IF EXISTS "Anyone can view listings" ON public.listings;
CREATE POLICY "Anyone can view listings"
  ON public.listings FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Creators can insert their own listings" ON public.listings;
CREATE POLICY "Creators can insert their own listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Creators can update their own listings" ON public.listings;
CREATE POLICY "Creators can update their own listings"
  ON public.listings FOR UPDATE
  USING (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Creators can delete their own listings" ON public.listings;
CREATE POLICY "Creators can delete their own listings"
  ON public.listings FOR DELETE
  USING (auth.uid() = creator_id);

-- Listing categories policies
DROP POLICY IF EXISTS "Anyone can view listing categories" ON public.listing_categories;
CREATE POLICY "Anyone can view listing categories"
  ON public.listing_categories FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Creators can manage their listing categories" ON public.listing_categories;
CREATE POLICY "Creators can manage their listing categories"
  ON public.listing_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE listings.id = listing_categories.listing_id
      AND listings.creator_id = auth.uid()
    )
  );

-- Listing tiers policies
DROP POLICY IF EXISTS "Anyone can view listing tiers" ON public.listing_tiers;
CREATE POLICY "Anyone can view listing tiers"
  ON public.listing_tiers FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Creators can manage their listing tiers" ON public.listing_tiers;
CREATE POLICY "Creators can manage their listing tiers"
  ON public.listing_tiers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE listings.id = listing_tiers.listing_id
      AND listings.creator_id = auth.uid()
    )
  );

-- Instant buys policies
DROP POLICY IF EXISTS "Anyone can view instant buys" ON public.instant_buys;
CREATE POLICY "Anyone can view instant buys"
  ON public.instant_buys FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Creators can manage their instant buys" ON public.instant_buys;
CREATE POLICY "Creators can manage their instant buys"
  ON public.instant_buys FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.listings
      WHERE listings.id = instant_buys.listing_id
      AND listings.creator_id = auth.uid()
    )
  );

-- Orders policies
DROP POLICY IF EXISTS "Buyers can view their own orders" ON public.orders;
CREATE POLICY "Buyers can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = buyer_id);

DROP POLICY IF EXISTS "Creators can view orders for their listings" ON public.orders;
CREATE POLICY "Creators can view orders for their listings"
  ON public.orders FOR SELECT
  USING (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Buyers can create orders" ON public.orders;
CREATE POLICY "Buyers can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

DROP POLICY IF EXISTS "Creators can update their orders" ON public.orders;
CREATE POLICY "Creators can update their orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = creator_id);

-- Reviews policies
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Buyers can create reviews for their orders" ON public.reviews;
CREATE POLICY "Buyers can create reviews for their orders"
  ON public.reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id
    AND EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_id
      AND orders.buyer_id = auth.uid()
      AND orders.status = 'completed'
    )
  );

-- Waitlist policies
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.waitlist;
CREATE POLICY "Enable insert for everyone"
  ON public.waitlist FOR INSERT
  TO public
  WITH CHECK (true);

-- =====================================================
-- STORAGE BUCKETS AND POLICIES
-- =====================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('listing-photos', 'listing-photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('instant-buys', 'instant-buys', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('order-deliveries', 'order-deliveries', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile pictures (public bucket)
DROP POLICY IF EXISTS "Anyone can view profile pictures" ON storage.objects;
CREATE POLICY "Anyone can view profile pictures"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-pictures');

DROP POLICY IF EXISTS "Users can upload their own profile pictures" ON storage.objects;
CREATE POLICY "Users can upload their own profile pictures"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-pictures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can update their own profile pictures" ON storage.objects;
CREATE POLICY "Users can update their own profile pictures"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile-pictures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can delete their own profile pictures" ON storage.objects;
CREATE POLICY "Users can delete their own profile pictures"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile-pictures'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for listing photos (public bucket)
DROP POLICY IF EXISTS "Anyone can view listing photos" ON storage.objects;
CREATE POLICY "Anyone can view listing photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-photos');

DROP POLICY IF EXISTS "Creators can upload listing photos" ON storage.objects;
CREATE POLICY "Creators can upload listing photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'listing-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Creators can update listing photos" ON storage.objects;
CREATE POLICY "Creators can update listing photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'listing-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Creators can delete listing photos" ON storage.objects;
CREATE POLICY "Creators can delete listing photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'listing-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================
-- COMPLETE
-- =====================================================

