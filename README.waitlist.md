# Waitlist Setup

## Environment Variables

### Local Development
Create a `.env.local` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://ptrpavczxoutgxxyqcew.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Vercel Deployment
Add these environment variables in your Vercel project settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Database Setup

### 1. Create the waitlist table

The waitlist table structure (as shown in your Supabase):
```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL
);
```

### 2. Enable Row Level Security (RLS)

**IMPORTANT:** Run this SQL in your Supabase SQL Editor to fix the 401 error:

```sql
-- Enable Row Level Security on waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert into waitlist (anonymous signups)
CREATE POLICY "Allow anonymous inserts to waitlist"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);
```

This policy allows the anonymous (public) role to insert emails into the waitlist table, which is necessary for the coming-soon page to work.

## Features

- **Email validation** - Client-side email format validation
- **Duplicate detection** - Prevents the same email from being added twice (shows friendly error)
- **Shake animation** - Input shakes when user tries to submit without entering email
- **Success animation** - Nice animations when email is successfully added:
  - Input border turns green
  - Mail icon changes to checkmark with scale animation
  - Success message slides down
  - "Notify Me" button changes to "Added to Waitlist" with checkmark
- **Error handling** - Displays helpful error messages with context
- **Smooth scroll** - "Learn More" button smoothly scrolls to the preview section
- **Enter key support** - Press Enter in the email field to submit

