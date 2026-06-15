/**
 * Browser-side Supabase client (used by client components, e.g. the
 * Google sign-in button). Reads the public anon key only.
 */
import { createBrowserClient } from '@supabase/ssr'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
