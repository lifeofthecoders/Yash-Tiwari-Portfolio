import { createClient } from '@supabase/supabase-js';

// Read environment variables and trim accidental whitespace.
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';

// Remove /rest/v1/ if accidentally copied from Supabase Data API.
const supabaseUrl = rawSupabaseUrl
  .trim()
  .replace(/\/rest\/v1\/?$/i, '')
  .replace(/\/+$/, '');

const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
).trim();

export const supabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey
);

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;