/*
  # Remove public DELETE access from the storage media table

  1. Security
  - Drop the `public_delete_storage` policy which allowed any anon caller to
    delete every media row (USING true).
  - Revoke the DELETE table privilege from anon and authenticated.
  - Owner-side deletion via the dashboard / service role is unaffected.
*/

DROP POLICY IF EXISTS "public_delete_storage" ON storage;

REVOKE DELETE ON TABLE storage FROM anon;
REVOKE DELETE ON TABLE storage FROM authenticated;
