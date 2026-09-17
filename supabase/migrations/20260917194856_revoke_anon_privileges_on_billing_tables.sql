/*
  # Remove residual anon read privileges on billing tables

  1. Changes
  - Revoke every table privilege on `payment_history` from `anon`.
  - Revoke every table privilege on `subscriptions` from `anon`.

  2. Security
  - Both tables are client read-only and own-row scoped for `authenticated`.
    The anonymous role retained SELECT on billing amounts, payment methods and
    plan types; it has no legitimate reason to hold it.
  - `authenticated` SELECT is untouched, so signed-in reads keep working.
*/

REVOKE ALL ON TABLE payment_history FROM anon;
REVOKE ALL ON TABLE subscriptions FROM anon;
