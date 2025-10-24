# Dummy Data Setup Guide

This guide explains how to populate your Whispr database with test data for development and testing.

---

## 📋 Overview

The `dummy-data.sql` file contains:
- **8 Test Creators** with profiles, ratings, and bios
- **10+ Listings** with various content types and prices
- **Pricing Tiers** (Basic, Premium, Exclusive) for each listing
- **1 Test Buyer** profile

---

## 🚀 Quick Start

### Step 1: Create Auth Users First

Before running the SQL script, you need to create auth users in Supabase. You have two options:

#### Option A: Use the Signup Flow (Recommended)
1. Start your dev server: `npm run dev`
2. Navigate to `/signup/creator` or `/signup/buyer`
3. Create test accounts with these emails:
   - scarlett@whispr.test
   - lacey@whispr.test
   - vanessa@whispr.test
   - bianca@whispr.test
   - angelica@whispr.test
   - amber@whispr.test
   - roxy@whispr.test
   - crystal@whispr.test
   - testbuyer@whispr.test (for buyer)

#### Option B: Create Users Manually in Supabase Dashboard
1. Go to your Supabase Dashboard
2. Navigate to: **Authentication** → **Users**
3. Click **"Add user"**
4. Create users with the emails listed above
5. **Copy the User IDs** for the next step

### Step 2: Update the SQL Script with Real User IDs

If you created users manually (Option B), you need to update `dummy-data.sql`:

1. Open `dummy-data.sql`
2. Replace the placeholder UUIDs:
   ```sql
   -- Change from:
   '00000000-0000-0000-0000-000000000001'
   
   -- To your actual auth.users ID:
   'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
   ```

If you used the signup flow (Option A), the UUIDs will already match!

### Step 3: Run the SQL Script

1. Go to your Supabase Dashboard
2. Navigate to: **SQL Editor**
3. Click **"New query"**
4. Copy the entire contents of `dummy-data.sql`
5. Paste into the editor
6. Click **"Run"**

---

## ✅ Verify the Data

After running the script, verify everything loaded:

```sql
-- Check creators
SELECT display_name, email, rating, total_completed_jobs 
FROM public.creators;

-- Check listings
SELECT l.title, c.display_name as creator_name, l.starting_price 
FROM public.listings l
JOIN public.creators c ON l.creator_id = c.id;

-- Check tiers
SELECT lt.tier_name, lt.price, l.title
FROM public.listing_tiers lt
JOIN public.listings l ON lt.listing_id = l.id;
```

---

## 🎨 Included Test Data

### Creators
1. **Scarlett Vixen** - ASMR & Sultry Whispers (Rating: 5.0, 342 orders)
2. **Lacey Wilde** - Sensual Storytelling (Rating: 5.0, 478 orders)
3. **Vanessa Knight** - Roleplay & Fantasy (Rating: 5.0, 412 orders)
4. **Bianca Luxe** - Voice Messages (Rating: 5.0, 523 orders)
5. **Angelica Noir** - Flirty Greetings (Rating: 5.0, 467 orders)
6. **Amber Reign** - Roleplay Master (Rating: 5.0, 256 orders)
7. **Roxy Blaze** - ASMR Expert (Rating: 4.5, 198 orders)
8. **Crystal Divine** - Playful Tease (Rating: 4.5, 289 orders)

### Listing Types
- Bedtime Stories
- Wake Up Calls
- Roleplay Sessions
- Girlfriend Experience Audio
- Daily Check-In Messages
- ASMR Relaxation
- Playful Teasing
- And more!

### Pricing Tiers
Each listing includes 2-3 tiers:
- **Basic**: £25-55, 24-48 hour delivery, 1 revision
- **Premium**: £45-85, 48-72 hour delivery, 2-3 revisions
- **Exclusive**: £100-150, 3-5 day delivery, unlimited revisions

---

## 🧪 Testing Features

Once data is loaded, you can test:

✅ **Homepage**: View top creators and trending listings  
✅ **Marketplace**: Browse all creators with real data  
✅ **Leaderboards**: See rankings (mock revenue/order data shown)  
✅ **Creator Profiles**: Click any creator to view their full profile  
✅ **Listing Details**: View listings with pricing tiers  
✅ **Creator Dashboard**: Log in as a creator to see your listings  
✅ **Buyer Dashboard**: Log in as a buyer to see your orders  

---

## 🔄 Reset Data

To start fresh, you can delete all dummy data:

```sql
-- Delete in correct order (respecting foreign keys)
DELETE FROM public.listing_tiers WHERE listing_id IN (
  SELECT id FROM public.listings WHERE creator_id LIKE '00000000-0000-0000-0000-%'
);

DELETE FROM public.listings WHERE creator_id LIKE '00000000-0000-0000-0000-%';

DELETE FROM public.creators WHERE id LIKE '00000000-0000-0000-0000-%';

DELETE FROM public.buyers WHERE id LIKE '00000000-0000-0000-0000-%';
```

Then run `dummy-data.sql` again!

---

## 📝 Notes

- **Profile Pictures**: Using Unsplash placeholder images
- **Safe to Re-run**: Script uses `ON CONFLICT DO NOTHING`
- **Production**: Replace with real data before launch
- **Categories**: Not linked yet (can be added later)
- **Orders**: No test orders included (would need buyer/seller pairs)
- **Reviews**: No test reviews included

---

## 🐛 Troubleshooting

### "Foreign key violation" error
- You forgot to create auth users first
- The user IDs in the SQL don't match your auth.users IDs

### "Duplicate key" error
- Data already exists
- Safe to ignore if using `ON CONFLICT DO NOTHING`
- Or delete existing data first (see Reset Data section)

### Creators not showing in app
- Check RLS policies are correct
- Verify creators table has data: `SELECT * FROM public.creators`
- Check browser console for errors

### Cannot log in as test users
- You must set passwords when creating auth users
- Use the "Send magic link" option in Supabase Auth UI
- Or use the signup flow to create accounts

---

## 🎯 Next Steps

After loading dummy data:

1. **Test all pages** - Browse, view profiles, check dashboards
2. **Test creator upload** - Create a new listing as a creator
3. **Test buyer flow** - Browse and view listings as a buyer
4. **Check responsiveness** - Test on mobile devices
5. **Add more data** - Create additional creators/listings as needed

Happy testing! 🚀

