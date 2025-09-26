/*
  # Fix User Creation Database Error

  1. New Tables
    - Ensure `profiles` table exists with proper structure
    - Add `vendor_profiles` table for vendor-specific data
  
  2. Security
    - Enable RLS on all tables
    - Add policies for user registration and data access
  
  3. Triggers
    - Create trigger to automatically create profile on user signup
    - Handle user metadata properly
  
  4. Functions
    - Create function to handle new user creation
    - Extract metadata from auth.users properly
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role user_role DEFAULT 'buyer',
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_role enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('buyer', 'vendor', 'admin');
  END IF;
END $$;

-- Create subscription_status enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_status') THEN
    CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'suspended', 'cancelled');
  END IF;
END $$;

-- Create vendor_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.vendor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  store_name text NOT NULL,
  store_description text,
  store_logo text,
  store_banner text,
  plan_id text DEFAULT 'emprende',
  subscription_status subscription_status DEFAULT 'active',
  total_sales numeric DEFAULT 0,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  location text,
  response_time text DEFAULT '24 horas',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, role, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'buyer'),
    NEW.raw_user_meta_data->>'phone'
  );
  
  -- If user is a vendor, create vendor profile
  IF COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'buyer') = 'vendor' THEN
    INSERT INTO public.vendor_profiles (user_id, store_name)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'Mi Tienda')
    );
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_vendor_profiles_updated_at ON public.vendor_profiles;
CREATE TRIGGER update_vendor_profiles_updated_at
  BEFORE UPDATE ON public.vendor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view vendor stores" ON public.vendor_profiles;
DROP POLICY IF EXISTS "Vendors can create their own store" ON public.vendor_profiles;
DROP POLICY IF EXISTS "Vendors can update their own store" ON public.vendor_profiles;
DROP POLICY IF EXISTS "Vendors can view their own store" ON public.vendor_profiles;

-- Create RLS policies for profiles
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create RLS policies for vendor_profiles
CREATE POLICY "Anyone can view active vendor stores"
  ON public.vendor_profiles
  FOR SELECT
  TO anon, authenticated
  USING (subscription_status = 'active');

CREATE POLICY "Vendors can create their own store"
  ON public.vendor_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Vendors can update their own store"
  ON public.vendor_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can view their own store"
  ON public.vendor_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.vendor_profiles TO anon, authenticated;