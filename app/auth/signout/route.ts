/**
 * Sign-out endpoint. POST clears the Supabase session cookies and
 * redirects to the login page. Implemented as a route handler (rather
 * than a server action) so it can be hit from a plain <form> on the
 * access-denied screen as well as the dashboard header.
 */
import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { origin } = new URL(request.url)
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(`${origin}/login`, { status: 303 })
}
