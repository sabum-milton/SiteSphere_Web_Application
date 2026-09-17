/*
  # Make subscriptions read-only for clients

  1. Security
  - Drop `Users can insert own subscriptions` and `Users can update own subscriptions`.
    Both only constrained `user_id`, so any account could write
    plan_type = 'premium' / status = 'active' for itself, granting a paid plan
    without any payment verification.
  - Revoke INSERT/UPDATE/DELETE table privileges from anon and authenticated.
  - The own-row SELECT policy is retained so a signed-in user can still read
    their own plan. Subscription rows are to be written by the service role
    after payment verification.
*/

DROP POLICY IF EXISTS "Users can insert own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON subscriptions;

REVOKE INSERT, UPDATE, DELETE ON TABLE subscriptions FROM anon;
REVOKE INSERT, UPDATE, DELETE ON TABLE subscriptions FROM authenticated;
