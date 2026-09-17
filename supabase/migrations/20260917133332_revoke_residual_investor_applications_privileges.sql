/*
  # Remove remaining client privileges on investor_applications

  1. Security
  - The table has no RLS policies, so reads and writes are already denied for
    anon and authenticated. Revoke the leftover SELECT/UPDATE/DELETE table
    privileges as well, so the deny-by-default intent is explicit at both the
    privilege and the policy layer.
  - The `send-investor-email` edge function uses the service role and is
    unaffected.
*/

REVOKE ALL ON TABLE investor_applications FROM anon;
REVOKE ALL ON TABLE investor_applications FROM authenticated;
