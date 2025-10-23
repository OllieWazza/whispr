-- First, drop any existing policies on the waitlist table
DROP POLICY IF EXISTS "Allow anonymous inserts to waitlist" ON waitlist;
DROP POLICY IF EXISTS "Enable insert for everyone" ON waitlist;

-- Enable Row Level Security on waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow EVERYONE (authenticated and anonymous) to insert into waitlist
CREATE POLICY "Enable insert for everyone"
ON waitlist
FOR INSERT
TO public
WITH CHECK (true);

-- Optional: If you want to allow reading waitlist entries (for admin purposes)
-- CREATE POLICY "Enable read for authenticated users"
-- ON waitlist
-- FOR SELECT
-- TO authenticated
-- USING (true);

