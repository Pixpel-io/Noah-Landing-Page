/**
 * Centralised Supabase / dashboard configuration.
 *
 * Kept in one place so the env-var contract is documented once and the
 * rest of the codebase imports typed helpers instead of poking at
 * `process.env` directly.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

/**
 * Admin allowlist for /dashboard. Comma-separated emails in
 * DASHBOARD_ADMIN_EMAILS. Comparison is case-insensitive and trimmed.
 * This is read server-side only (no NEXT_PUBLIC_ prefix) so the list is
 * never shipped to the browser bundle.
 */
export function getAdminEmails(): string[] {
  return (process.env.DASHBOARD_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  const allow = getAdminEmails()
  // Empty allowlist = deny everyone. This is a metrics console; failing
  // closed is the safe default if the operator forgot to configure it.
  if (allow.length === 0) return false
  return allow.includes(email.trim().toLowerCase())
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
