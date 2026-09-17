/*
# Create storage table for media files

1. New Tables
- `storage`
  - `fileid` (uuid, primary key, auto-generated)
  - `file_name` (text, not null) — display name of the file
  - `file_url` (text, not null) — URL to the image or video
  - `size` (text) — human-readable file size (e.g. "2.5 MB")
  - `created_at` (timestamptz, default now)

2. Security
- Enable RLS on `storage`.
- Public read/write for anon + authenticated (single-tenant app, no sign-in).
*/

CREATE TABLE IF NOT EXISTS storage (
  fileid uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_url text NOT NULL,
  size text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE storage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_storage" ON storage;
CREATE POLICY "public_select_storage" ON storage FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_storage" ON storage;
CREATE POLICY "public_insert_storage" ON storage FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_storage" ON storage;
CREATE POLICY "public_update_storage" ON storage FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_storage" ON storage;
CREATE POLICY "public_delete_storage" ON storage FOR DELETE
TO anon, authenticated USING (true);
