-- Enable Row Level Security on waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert into waitlist (anonymous signups)
CREATE POLICY "Allow anonymous inserts to waitlist"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Optional: Create policy to allow users to read all waitlist entries (if needed for admin purposes)
-- CREATE POLICY "Allow authenticated users to read waitlist"
-- ON waitlist
-- FOR SELECT
-- TO authenticated
-- USING (true);

