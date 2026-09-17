/*
  # Canonicalise and protect profiles.email

  1. Changes
  - Normalise existing `profiles.email` values to trimmed lowercase.
  - Add a CHECK constraint so stored values must already be canonical.
  - Add a unique index on `email` so two profiles cannot claim the same address
    (case and whitespace variants can no longer collide).
  - Revoke table-wide UPDATE on `profiles` from `authenticated` and re-grant it
    only on the user-editable columns, so the stored email can no longer be
    changed to an unverified address after the profile is created.

  2. Security
  - Prevents an identifier used to reach a person from diverging from the
    verified sign-in identity, and removes the case/whitespace collision that
    would let a lookup land on the wrong profile.
  - SELECT and INSERT are unchanged, so profile creation and reads keep working.
*/

UPDATE profiles
SET email = lower(btrim(email))
WHERE email <> lower(btrim(email));

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_email_canonical_check'
  ) THEN
    ALTER TABLE profiles
      ADD CONSTRAINT profiles_email_canonical_check
      CHECK (email = lower(btrim(email)));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique_idx ON profiles (email);

REVOKE UPDATE ON TABLE profiles FROM authenticated;
GRANT UPDATE (full_name, phone, company_name) ON TABLE profiles TO authenticated;
