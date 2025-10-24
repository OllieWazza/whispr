# WHISPR Setup Instructions

Welcome to WHISPR! This guide will help you get the application up and running with Supabase authentication.

## What's Been Implemented

✅ **Database Schema**: Updated SQL schema with `user_type` field for buyers and creators
✅ **Supabase Integration**: Full authentication setup with email/password and OAuth providers
✅ **Protected Routes**: Route protection based on user type (buyer vs creator)
✅ **Sign Up Flows**: Separate signup forms for buyers and creators
✅ **Sign In**: Universal signin that redirects to appropriate dashboard
✅ **Real Data Fetching**: Marketplace and home pages fetch real creators from Supabase
✅ **Auth Context**: Global authentication state management

## Prerequisites

- Node.js installed
- Supabase account and project created
- Database tables set up (run the SQL script)

## Setup Steps

### 1. Install Dependencies

The Supabase client has already been installed, but if you need to reinstall:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:

```env
VITE_SUPABASE_URL=https://ptrpavczxoutgxxyqcew.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnBhdmN6eG91dGd4eHlxY2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjYwNTAsImV4cCI6MjA3NjcwMjA1MH0.oWm0OUkDZfj1EptU_91HwyeeruYXBtkfzK1x9MNUe3E
```

### 3. Run the Database Setup SQL

1. Open your [Supabase Dashboard](https://supabase.com/dashboard/project/ptrpavczxoutgxxyqcew)
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the contents of `src/supabase.sql`
5. Click **Run** to execute the script

This will create:
- Users table with `user_type` field
- Categories table
- Listings table
- Orders table
- Reviews table
- All necessary triggers and RLS policies
- Storage buckets

### 4. Configure OAuth Providers (Optional)

To enable Google and Apple sign-in, follow the guide in `SETUP_OAUTH.md`.

**Quick summary:**
- Google: Create OAuth credentials in Google Cloud Console
- Apple: Set up Sign in with Apple in Apple Developer portal
- Add credentials to Supabase Dashboard

### 5. Start the Development Server

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`

## Project Structure

```
src/
├── lib/
│   ├── supabase.ts              # Supabase client configuration
│   └── database.types.ts        # TypeScript types for database
├── contexts/
│   └── AuthContext.tsx          # Authentication context and hooks
├── components/
│   └── ProtectedRoute.tsx       # Route protection component
├── pages/
│   ├── signin.tsx               # Sign in page
│   ├── signup-buyer.tsx         # Buyer signup
│   ├── signup-creator.tsx       # Creator signup
│   ├── buyer-dashboard.tsx      # Buyer dashboard (protected)
│   ├── creator-dashboard.tsx    # Creator dashboard (protected)
│   ├── marketplace.tsx          # Marketplace with real data
│   └── home.tsx                 # Homepage with real data
└── supabase.sql                 # Database setup script
```

## Key Features

### Authentication Flow

1. **Sign Up**:
   - Users choose buyer or creator account type
   - Account is created in Supabase auth
   - Profile is created in `users` table with appropriate `user_type`
   - User is redirected to their dashboard

2. **Sign In**:
   - Universal sign-in page
   - After authentication, user is redirected based on their `user_type`:
     - Buyers → `/buyer-dashboard`
     - Creators → `/creator/dashboard`

3. **Protected Routes**:
   - Buyer-only routes: `/buyer-dashboard`, `/checkout`, `/request`
   - Creator-only routes: `/creator/dashboard`, `/creator/upload`
   - Authentication required for all protected routes
   - Wrong user type redirects to appropriate dashboard

### Data Fetching

All pages now fetch real data from Supabase:
- **Marketplace**: Shows all creators with their listings
- **Home Page**: Displays top creators and trending creators
- **Fallback**: Shows mock data if database is empty (for development)

### User Types

- **Buyer** (`user_type: 'buyer'`)
  - Can browse marketplace
  - Can purchase content
  - Access to buyer dashboard
  
- **Creator** (`user_type: 'creator'`)
  - Can create listings
  - Can upload content
  - Access to creator dashboard
  - **Note**: Users cannot be both buyer and creator

## Testing the App

### 1. Create a Test Buyer Account

1. Go to `http://localhost:5173/signup/buyer`
2. Fill out the form
3. Click "Continue"
4. You should be redirected to `/buyer-dashboard`

### 2. Create a Test Creator Account

1. Go to `http://localhost:5173/signup/creator`
2. Fill out the form
3. Click "Continue"
4. You should be redirected to `/creator/dashboard`

### 3. Test Sign In

1. Sign out (if signed in)
2. Go to `http://localhost:5173/signin`
3. Sign in with your test account
4. You should be redirected to the appropriate dashboard

### 4. Test Protected Routes

1. While signed out, try to access `/buyer-dashboard`
2. You should be redirected to `/signin`
3. After signing in as a buyer, you can access the buyer dashboard
4. Try accessing `/creator/dashboard` - you should be redirected back to `/buyer-dashboard`

## Troubleshooting

### "Missing Supabase environment variables"

Make sure your `.env.local` file exists and contains the correct values.

### Authentication not working

1. Check that the SQL script has been run successfully
2. Check browser console for errors
3. Check Supabase Dashboard > Authentication > Logs for auth errors
4. Verify your Supabase URL and anon key are correct

### No creators showing on marketplace

This is expected if your database is empty. The app will show mock data as a fallback. To add real creators:

1. Sign up as a creator
2. Go to `/creator/upload` to create a listing
3. The creator will now appear on the marketplace

### OAuth not working

Follow the complete OAuth setup guide in `SETUP_OAUTH.md`.

## Database Tables

### users
- `id` (UUID, references auth.users)
- `email` (TEXT)
- `user_type` ('buyer' | 'creator') **← NEW FIELD**
- `display_name` (TEXT)
- `profile_picture_url` (TEXT)
- `bio` (TEXT)
- `rating` (DECIMAL)
- `total_completed_jobs` (INTEGER)
- `response_time` (TEXT)
- `satisfaction_rate` (INTEGER)

### listings
Created by creators to sell content

### orders
Tracks purchases between buyers and creators

### reviews
Customer reviews for completed orders

See `src/supabase.sql` for complete schema.

## Next Steps

1. ✅ Basic authentication is working
2. ✅ Protected routes are set up
3. ✅ Real data is being fetched
4. 🔄 Set up OAuth providers (optional)
5. 🔄 Create listing upload functionality for creators
6. 🔄 Implement order creation for buyers
7. 🔄 Add payment integration (Stripe)
8. 🔄 Set up file uploads for creator content
9. 🔄 Implement review system

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Check Supabase Dashboard logs
3. Refer to `SETUP_OAUTH.md` for OAuth setup
4. Review `src/supabase.sql` for database schema

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Your Supabase Project**: https://supabase.com/dashboard/project/ptrpavczxoutgxxyqcew

Happy coding! 🚀

