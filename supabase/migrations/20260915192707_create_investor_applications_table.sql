/*
# Create investor_applications table

1. New Tables
- `investor_applications`
  - `id` (uuid, primary key) - Unique application ID
  - `name` (text, not null) - Applicant's full name
  - `email` (text, not null) - Applicant's email address
  - `phone` (text, not null) - Applicant's phone number
  - `company` (text, optional) - Applicant's company name
  - `investment_amount` (text, not null) - Selected investment range
  - `message` (text, optional) - Additional information from applicant
  - `created_at` (timestamptz) - Submission timestamp

2. Security
- Enable RLS on `investor_applications`.
- Allow anon + authenticated to INSERT (public form, no sign-in required).
- No SELECT/UPDATE/DELETE policies for anon — only the project owner
  can read submissions via the Supabase dashboard or service-role key.
*/

CREATE TABLE IF NOT EXISTS investor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  investment_amount text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE investor_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to submit an application
DROP POLICY IF EXISTS "anon_insert_investor_applications" ON investor_applications;
CREATE POLICY "anon_insert_investor_applications"
  ON investor_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);