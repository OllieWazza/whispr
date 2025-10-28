-- Setup Storage Buckets and Policies for WHISPR
-- Run this in your Supabase SQL Editor

-- 1. Create buckets (if they don't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('audio-files', 'audio-files', true, 104857600, ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/webm', 'audio/ogg', 'audio/mp4', 'audio/m4a']::text[]),
  ('listing-photos', 'listing-photos', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[])
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload audio files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload listing photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view audio files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view listing photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own photos" ON storage.objects;

-- 3. Create policies for audio-files bucket

-- Allow authenticated users to upload audio files
CREATE POLICY "Authenticated users can upload audio files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'audio-files'
);

-- Allow everyone to view audio files (public bucket)
CREATE POLICY "Anyone can view audio files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audio-files');

-- Allow authenticated users to update their own files
CREATE POLICY "Users can update their own audio files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'audio-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'audio-files' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Create policies for listing-photos bucket

-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload listing photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'listing-photos'
);

-- Allow everyone to view photos (public bucket)
CREATE POLICY "Anyone can view listing photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'listing-photos');

-- Allow authenticated users to update their own photos
CREATE POLICY "Users can update their own photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'listing-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own photos
CREATE POLICY "Users can delete their own photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'listing-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 5. Verify setup
SELECT 
  id as "Bucket Name",
  public as "Public?",
  file_size_limit as "Max File Size (bytes)",
  allowed_mime_types as "Allowed Types"
FROM storage.buckets
WHERE id IN ('audio-files', 'listing-photos');

-- 6. Show policies
SELECT 
  policyname as "Policy Name",
  bucket_id as "Bucket",
  roles as "Roles",
  cmd as "Command"
FROM storage.policies
WHERE bucket_id IN ('audio-files', 'listing-photos')
ORDER BY bucket_id, cmd;

