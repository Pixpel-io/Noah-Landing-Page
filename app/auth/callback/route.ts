/**
 * OAuth callback — Supabase redirects here with a `code` after the
 * Google consent screen. We exchange it for a session (cookies are set
 * via @supabase/ssr) and then bounce the user on to the dashboard.
 *
 * The admin-allowlist check is enforced in the dashboard layout, not
 * here, so a non-admin still gets a session but simply cannot see any
 * data — they're shown an "access denied" screen with a sign-out action.
 */
import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectError = searchParams.get('error_description')

  // The `redirect` param is forwarded through the OAuth flow via the
  // `next` query value set on the login page.
  const next = searchParams.get('next') ?? '/dashboard'

  if (redirectError) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(redirectError)}`,
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Respect proxy headers when deployed behind a load balancer.
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`,
    )
  }

  return NextResponse.redirect(`${origin}/login?error=missing_code`)
}
