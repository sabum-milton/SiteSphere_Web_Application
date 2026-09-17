/*
  # Make payment_history read-only for clients

  1. Security
  - Drop `Users can insert own payment records`. It only constrained `user_id`,
    so any account could mint payment rows with an arbitrary amount and
    status = 'completed'.
  - Revoke INSERT/UPDATE/DELETE table privileges from anon and authenticated.
  - The own-row SELECT policy is retained so a signed-in user can still read
    their payment history. Payment rows are to be written by the service role
    from a verified payment webhook.
*/

DROP POLICY IF EXISTS "Users can insert own payment records" ON payment_history;

REVOKE INSERT, UPDATE, DELETE ON TABLE payment_history FROM anon;
REVOKE INSERT, UPDATE, DELETE ON TABLE payment_history FROM authenticated;
