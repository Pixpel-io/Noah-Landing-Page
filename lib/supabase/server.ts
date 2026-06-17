/**
 * Server-side Supabase client for Server Components, Route Handlers and
 * Server Actions. Wires Next's cookie store into @supabase/ssr so the
 * auth session (set during the OAuth callback) is read on every request.
 *
 * Reads with the anon key — RLS on the production project decides what
 * the dashboard can see. The dashboard never writes.
 */
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from './config'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // `setAll` is called from a Server Component, where setting
          // cookies is not allowed. The middleware refreshes the session
          // so this is safe to ignore.
        }
      },
    },
  })
}

/**
 * Admin client using the service_role key — bypasses RLS.
 * Use ONLY for server-side read-only dashboard metrics.
 */
export function createAdminClient() {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
}
