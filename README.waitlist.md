# Waitlist Setup

## Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://ptrpavczxoutgxxyqcew.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_anon_key_here` with your Supabase Anon Public key.

## Database Setup

The waitlist feature expects a `waitlist` table in Supabase with the following structure:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint for email (if not already added)
ALTER TABLE waitlist ADD CONSTRAINT waitlist_email_key UNIQUE (email);
```

This table will store email addresses from the coming-soon page.

## Features

- **Email validation** - Basic client-side email validation
- **Duplicate detection** - Prevents the same email from being added twice
- **Success feedback** - Shows confirmation when email is added
- **Error handling** - Displays helpful error messages
- **Smooth scroll** - "Learn More" button scrolls to the preview section

