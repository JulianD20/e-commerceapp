import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'buyer' | 'vendor' | 'admin';
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface VendorProfile {
  id: string;
  user_id: string;
  store_name: string;
  store_description?: string;
  store_logo?: string;
  store_banner?: string;
  plan_id: string;
  subscription_status: 'active' | 'inactive' | 'suspended' | 'cancelled';
  total_sales: number;
  rating: number;
  location?: string;
  response_time: string;
  created_at: string;
  updated_at: string;
}

export interface User extends Profile {
  vendor_profile?: VendorProfile;
}