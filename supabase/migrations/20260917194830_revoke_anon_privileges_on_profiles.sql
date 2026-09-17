/*
  # Remove residual anon privileges on profiles

  1. Changes
  - Revoke every table privilege on `profiles` from the `anon` role.

  2. Security
  - `profiles` holds personal data (name, email, phone, company) and all of its
    policies target `authenticated` only. The anonymous role had full DML
    privileges that were masked solely by the absence of an anon policy.
  - No client code reads or writes this table, so nothing breaks.
*/

REVOKE ALL ON TABLE profiles FROM anon;
