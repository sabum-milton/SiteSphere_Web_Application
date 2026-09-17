/*
  # Remove public UPDATE access from the storage media table

  1. Security
  - Drop the `public_update_storage` policy which allowed anon/authenticated
    callers to modify any row (USING true / WITH CHECK true).
  - Revoke the UPDATE table privilege from anon and authenticated.
  - Public SELECT is retained: the home page reads media links with the anon key.
  - The project owner continues to manage rows via the dashboard / service role,
    which bypasses RLS and is unaffected.
*/

DROP POLICY IF EXISTS "public_update_storage" ON storage;

REVOKE UPDATE ON TABLE storage FROM anon;
REVOKE UPDATE ON TABLE storage FROM authenticated;
