-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('buyer', 'creator')),
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

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view all profiles"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  USING (true);

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Personal', 'personal', 'Personal voice notes and messages', '💌'),
  ('Voiceover', 'voiceover', 'Professional voiceover services', '🎙️'),
  ('Product', 'product', 'Product photography and videos', '📦'),
  ('Custom Video', 'custom-video', 'Custom video content', '🎬'),
  ('Custom Photo', 'custom-photo', 'Custom photography', '📸'),
  ('Voice Notes', 'voice', 'Voice note services', '🎤'),
  ('Videos', 'video', 'Video services', '🎥'),
  ('Instant Buy', 'instant-buy', 'Pre-made content available instantly', '⚡');

-- =====================================================
-- LISTINGS TABLE
-- =====================================================
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('voice', 'photo', 'video')),
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

-- Enable RLS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Policies for listings
CREATE POLICY "Anyone can view listings"
  ON public.listings FOR SELECT
  USING (true);

CREATE POLICY "Users can create own listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON public.listings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings"
  ON public.listings FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- LISTING_CATEGORIES (Many-to-Many)
-- =====================================================
CREATE TABLE public.listing_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, category_id)
);

-- Enable RLS
ALTER TABLE public.listing_categories ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view listing categories"
  ON public.listing_categories FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own listing categories"
  ON public.listing_categories FOR ALL
  USING (
    listing_id IN (
      SELECT id FROM public.listings WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- LISTING_TIERS TABLE
-- =====================================================
CREATE TABLE public.listing_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  tier_name TEXT NOT NULL CHECK (tier_name IN ('standard', 'premium', 'exclusive')),
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  delivery_time TEXT NOT NULL,
  revisions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, tier_name)
);

-- Enable RLS
ALTER TABLE public.listing_tiers ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view listing tiers"
  ON public.listing_tiers FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own listing tiers"
  ON public.listing_tiers FOR ALL
  USING (
    listing_id IN (
      SELECT id FROM public.listings WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- INSTANT_BUYS TABLE (Pre-made downloadable content)
-- =====================================================
CREATE TABLE public.instant_buys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('voice', 'photo', 'video')),
  media_url TEXT NOT NULL, -- Stored in Supabase Storage
  price DECIMAL(10,2) NOT NULL,
  duration TEXT, -- For voice/video (e.g., "30 seconds")
  file_size_mb DECIMAL(10,2),
  total_purchases INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.instant_buys ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view instant buys"
  ON public.instant_buys FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own instant buys"
  ON public.instant_buys FOR ALL
  USING (
    listing_id IN (
      SELECT id FROM public.listings WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES public.listing_tiers(id) ON DELETE SET NULL,
  instant_buy_id UUID REFERENCES public.instant_buys(id) ON DELETE SET NULL,
  order_type TEXT NOT NULL CHECK (order_type IN ('custom', 'instant_buy')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'refunded')),
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  creator_earnings DECIMAL(10,2) NOT NULL,
  instructions TEXT, -- For custom orders
  delivery_url TEXT, -- Final delivered content
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  CHECK (
    (order_type = 'custom' AND tier_id IS NOT NULL AND instant_buy_id IS NULL) OR
    (order_type = 'instant_buy' AND instant_buy_id IS NOT NULL AND tier_id IS NULL)
  )
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own orders as buyer"
  ON public.orders FOR SELECT
  USING (auth.uid() = buyer_id);

CREATE POLICY "Users can view own orders as seller"
  ON public.orders FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Users can create orders as buyer"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Sellers can update own orders"
  ON public.orders FOR UPDATE
  USING (auth.uid() = seller_id);

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id) -- One review per order
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Buyers can create reviews for completed orders"
  ON public.reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE id = order_id 
      AND buyer_id = auth.uid() 
      AND status = 'completed'
    )
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listing_tiers_updated_at BEFORE UPDATE ON public.listing_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instant_buys_updated_at BEFORE UPDATE ON public.instant_buys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update listing rating when review is added
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.listings
  SET 
    rating = (
      SELECT AVG(rating)::DECIMAL(3,2) 
      FROM public.reviews 
      WHERE listing_id = NEW.listing_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM public.reviews 
      WHERE listing_id = NEW.listing_id
    )
  WHERE id = NEW.listing_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_listing_rating_trigger
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_listing_rating();

-- Update user rating when review is added
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET rating = (
    SELECT AVG(rating)::DECIMAL(3,2) 
    FROM public.reviews 
    WHERE seller_id = NEW.seller_id
  )
  WHERE id = NEW.seller_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_rating_trigger
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_user_rating();

-- Update user total_completed_jobs when order is completed
CREATE OR REPLACE FUNCTION update_user_completed_jobs()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.users
    SET total_completed_jobs = total_completed_jobs + 1
    WHERE id = NEW.seller_id;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_completed_jobs_trigger
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_user_completed_jobs();

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================
-- Note: Run these in Supabase Dashboard SQL Editor

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('listing-photos', 'listing-photos', true),
  ('instant-buys', 'instant-buys', false), -- Private, only accessible after purchase
  ('profile-pictures', 'profile-pictures', true),
  ('order-deliveries', 'order-deliveries', false) -- Private
ON CONFLICT (id) DO NOTHING;

-- Storage policies for listing-photos (public)
CREATE POLICY "Anyone can view listing photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'listing-photos');

CREATE POLICY "Authenticated users can upload listing photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'listing-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own listing photos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'listing-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own listing photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'listing-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for instant-buys (private, only accessible to buyers)
CREATE POLICY "Buyers can view purchased instant buys"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'instant-buys' AND
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.instant_buy_id::text = (storage.foldername(name))[1]
      AND orders.buyer_id = auth.uid()
      AND orders.status = 'completed'
    )
  );

CREATE POLICY "Sellers can upload instant buys"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'instant-buys' AND auth.role() = 'authenticated');

-- Storage policies for profile-pictures (public)
CREATE POLICY "Anyone can view profile pictures"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload own profile picture"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own profile picture"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for order-deliveries (private)
CREATE POLICY "Buyers can view order deliveries"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'order-deliveries' AND
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id::text = (storage.foldername(name))[1]
      AND orders.buyer_id = auth.uid()
    )
  );

CREATE POLICY "Sellers can upload order deliveries"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'order-deliveries' AND
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id::text = (storage.foldername(name))[1]
      AND orders.seller_id = auth.uid()
    )
  );


