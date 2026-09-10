/*
  # SiteSphere Database Schema

  ## Overview
  This migration creates the complete database structure for the SiteSphere platform,
  including user profiles, subscriptions, services, and payment tracking.

  ## New Tables

  ### 1. `profiles`
  Stores additional user information beyond authentication
  - `id` (uuid, primary key) - References auth.users
  - `full_name` (text) - User's full name
  - `email` (text) - User's email address
  - `phone` (text, optional) - Contact phone number
  - `company_name` (text, optional) - User's company name
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `subscriptions`
  Tracks user subscription plans and status
  - `id` (uuid, primary key) - Unique subscription ID
  - `user_id` (uuid) - References profiles(id)
  - `plan_type` (text) - Plan tier: 'basic', 'standard', 'premium'
  - `status` (text) - Subscription status: 'active', 'inactive', 'cancelled'
  - `start_date` (timestamptz) - Subscription start date
  - `end_date` (timestamptz, optional) - Subscription end date
  - `auto_renew` (boolean) - Auto-renewal status
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `selected_services`
  Stores services selected by users
  - `id` (uuid, primary key) - Unique record ID
  - `user_id` (uuid) - References profiles(id)
  - `service_name` (text) - Name of the selected service
  - `service_type` (text) - Type: 'web_development', 'mobile_app', 'portfolio', 'consulting', 'delivery'
  - `status` (text) - Service status: 'pending', 'in_progress', 'completed'
  - `created_at` (timestamptz) - Selection timestamp

  ### 4. `payment_history`
  Records all payment transactions
  - `id` (uuid, primary key) - Unique payment ID
  - `user_id` (uuid) - References profiles(id)
  - `amount` (numeric) - Payment amount
  - `currency` (text) - Currency code (default: 'USD')
  - `payment_method` (text) - Payment method used
  - `description` (text) - Payment description
  - `status` (text) - Payment status: 'completed', 'pending', 'failed'
  - `transaction_date` (timestamptz) - Transaction timestamp
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only read/update their own data
  - Authenticated users required for all operations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_type text NOT NULL CHECK (plan_type IN ('basic', 'standard', 'premium')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  auto_renew boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create selected_services table
CREATE TABLE IF NOT EXISTS selected_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_name text NOT NULL,
  service_type text NOT NULL CHECK (service_type IN ('web_development', 'mobile_app', 'portfolio', 'consulting', 'delivery')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Create payment_history table
CREATE TABLE IF NOT EXISTS payment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  payment_method text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE selected_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for subscriptions table
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for selected_services table
CREATE POLICY "Users can view own services"
  ON selected_services FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own services"
  ON selected_services FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own services"
  ON selected_services FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own services"
  ON selected_services FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for payment_history table
CREATE POLICY "Users can view own payment history"
  ON payment_history FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own payment records"
  ON payment_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();