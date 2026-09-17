/*
  # Publish media only when explicitly marked public

  1. Changes
  - Add `storage.is_public boolean NOT NULL DEFAULT false`.
  - Backfill every existing row to `true` so the current site keeps showing the
    media it already displays.
  - Replace the always-true public SELECT policy with one scoped to
    `is_public = true`.

  2. Security
  - Media added from now on is private until deliberately published, so an
    unpublished or draft file is no longer enumerable through the Data API.
  - Writes remain service-role only (unchanged by this migration).
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'storage' AND column_name = 'is_public'
  ) THEN
    ALTER TABLE storage ADD COLUMN is_public boolean NOT NULL DEFAULT false;
    UPDATE storage SET is_public = true;
  END IF;
END $$;

DROP POLICY IF EXISTS "public_select_storage" ON storage;
CREATE POLICY "public_select_storage" ON storage FOR SELECT
TO anon, authenticated USING (is_public = true);
