# Migration Guide: Single Users Table → Separate Buyers & Creators Tables

## Overview
This migration changes the database structure from:
- ✗ One `users` table with `user_type` column
- ✓ Two separate tables: `buyers` and `creators`

## Step 1: Run the New SQL Schema in Supabase

1. Go to **Supabase Dashboard** → **SQL Editor** → **New Query**
2. Copy and paste the entire contents of `supabase-schema-v2.sql`
3. Click **Run** to execute

This will create:
- `buyers` table
- `creators` table
- All other tables (listings, orders, reviews, etc.)
- All RLS policies
- All triggers and functions
- Storage buckets and policies

## Step 2: Clean Up Old Data (if needed)

If you have an existing `users` table with data, you'll need to migrate it:

```sql
-- Migrate buyers from old users table
INSERT INTO public.buyers (id, email, display_name, profile_picture_url, created_at)
SELECT id, email, display_name, profile_picture_url, created_at
FROM public.users
WHERE user_type = 'buyer'
ON CONFLICT (id) DO NOTHING;

-- Migrate creators from old users table
INSERT INTO public.creators (id, email, display_name, profile_picture_url, bio, rating, total_completed_jobs, response_time, satisfaction_rate, created_at)
SELECT id, email, display_name, profile_picture_url, bio, rating, total_completed_jobs, response_time, satisfaction_rate, created_at
FROM public.users
WHERE user_type = 'creator'
ON CONFLICT (id) DO NOTHING;

-- Optional: Drop old users table after migration
-- DROP TABLE IF EXISTS public.users;
```

## Step 3: Update TypeScript Types

The database types will automatically be different. When you regenerate types with Supabase CLI, you'll get:
- `buyers` table type
- `creators` table type

## Step 4: Update AuthContext

The `AuthContext` needs to be updated to:
- Check both `buyers` and `creators` tables for the user profile
- Determine user type based on which table contains the user
- Create profile in the correct table during signup

## Step 5: Update Frontend Code

Key changes needed:
1. **Profile fetching** - Check both tables to determine user type
2. **Sign up** - Insert into `buyers` or `creators` table based on selection
3. **Marketplace queries** - Query `creators` table instead of filtering `users` by `user_type`
4. **Dashboard queries** - Use appropriate table (`buyers` or `creators`)

## Benefits of This Approach

✅ **Cleaner schema** - No need for `user_type` checks everywhere
✅ **Better performance** - Separate indexes for buyers and creators
✅ **Type safety** - TypeScript knows the exact shape of each user type
✅ **Flexible** - Can add buyer-specific or creator-specific columns without affecting the other
✅ **Clearer RLS policies** - Policies are specific to each user type

## Database Structure Summary

### Buyers Table
- `id` (UUID, references auth.users)
- `email` (TEXT, unique)
- `display_name` (TEXT)
- `profile_picture_url` (TEXT)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Creators Table
- `id` (UUID, references auth.users)
- `email` (TEXT, unique)
- `display_name` (TEXT)
- `profile_picture_url` (TEXT)
- `bio` (TEXT)
- `rating` (DECIMAL)
- `total_completed_jobs` (INTEGER)
- `response_time` (TEXT)
- `satisfaction_rate` (INTEGER)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Foreign Keys Updated
- `listings.creator_id` → references `creators(id)`
- `orders.buyer_id` → references `buyers(id)`
- `orders.creator_id` → references `creators(id)`
- `reviews.reviewer_id` → references `buyers(id)`
- `reviews.creator_id` → references `creators(id)`

