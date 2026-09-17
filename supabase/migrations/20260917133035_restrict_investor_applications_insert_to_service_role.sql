/*
  # Remove anonymous INSERT access from investor_applications

  1. Security
  - Drop `anon_insert_investor_applications` (WITH CHECK true). The public form
    submits through the `send-investor-email` edge function, which uses the
    service role key and therefore bypasses RLS entirely.
  - Revoke the INSERT table privilege from anon and authenticated so the REST
    API can no longer be used to write fabricated applications directly.
  - No SELECT/UPDATE/DELETE policies exist, so reads remain owner-only.
*/

DROP POLICY IF EXISTS "anon_insert_investor_applications" ON investor_applications;

REVOKE INSERT ON TABLE investor_applications FROM anon;
REVOKE INSERT ON TABLE investor_applications FROM authenticated;
