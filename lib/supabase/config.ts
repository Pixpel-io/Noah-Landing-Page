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
 * Admin allowlist for /dashboard. Two independent allow rules, both read
 * server-side only (no NEXT_PUBLIC_ prefix) so they never reach the
 * browser bundle:
 *
 *   1. DASHBOARD_ADMIN_DOMAINS — comma-separated email domains; ANY
 *      account on one of these domains is allowed. Defaults to
 *      `pixpel.io`, so every @pixpel.io Google account can sign in
 *      out of the box.
 *   2. DASHBOARD_ADMIN_EMAILS — comma-separated individual emails, for
 *      granting access to people outside the allowed domains.
 *
 * Comparison is case-insensitive and trimmed.
 */
const DEFAULT_ADMIN_DOMAINS = 'pixpel.io'

export function getAdminEmails(): string[] {
  return (process.env.DASHBOARD_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function getAdminDomains(): string[] {
  return (process.env.DASHBOARD_ADMIN_DOMAINS ?? DEFAULT_ADMIN_DOMAINS)
    .split(',')
    .map((d) => d.trim().toLowerCase().replace(/^@/, ''))
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  const normalised = email.trim().toLowerCase()

  // Domain match — e.g. anyone @pixpel.io.
  const domain = normalised.split('@')[1] ?? ''
  if (domain && getAdminDomains().includes(domain)) return true

  // Explicit per-email allowlist for guests outside the domains.
  return getAdminEmails().includes(normalised)
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
