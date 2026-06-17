/**
 * Admin Supabase client using the service_role key — bypasses RLS.
 * Use ONLY for server-side read-only dashboard metrics.
 *
 * Separate from server.ts to avoid pulling in next/headers (cookies)
 * when only the admin client is needed.
 */
import { createClient } from '@supabase/supabase-js'

import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from './config'

export function createAdminClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
}
