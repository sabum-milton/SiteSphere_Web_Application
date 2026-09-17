/*
  # Remove public INSERT access from the storage media table

  1. Security
  - Drop the `public_insert_storage` policy which allowed any anon caller to
    insert rows (WITH CHECK true). Because the home page selects the newest
    matching row, an injected row was always the one rendered.
  - Revoke the INSERT table privilege from anon and authenticated.
  - Public SELECT remains so the site can keep reading media links.
*/

DROP POLICY IF EXISTS "public_insert_storage" ON storage;

REVOKE INSERT ON TABLE storage FROM anon;
REVOKE INSERT ON TABLE storage FROM authenticated;
