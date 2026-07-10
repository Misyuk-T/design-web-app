// Lazy, optional Supabase client.
//
// The site runs with zero env vars: when either NEXT_PUBLIC_SUPABASE_URL or
// NEXT_PUBLIC_SUPABASE_ANON_KEY is missing, this returns `null` and the content
// layer (see content.ts) branches cleanly to local fallback content.
//
// Uses the public anon key only — read access is governed by RLS (public SELECT).

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a memoized Supabase client, or `null` when the required public env
 * vars are absent. Callers must treat `null` as "use fallback content".
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  cachedClient = createClient(url, anonKey, {
    auth: { persistSession: false },
  });

  return cachedClient;
}
