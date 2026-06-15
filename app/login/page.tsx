/**
 * Dashboard login. Google-only sign-in (Supabase OAuth). Access is
 * further restricted to the admin email allowlist — see the dashboard
 * layout. An already-authenticated admin is sent straight through.
 */
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/supabase/config'

import { LoginForm } from './login-form'

export const metadata = {
  title: 'Sign in · Noah AI Dashboard',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>
}) {
  const { redirect: redirectParam, error } = await searchParams
  const redirectTo =
    redirectParam && redirectParam.startsWith('/') ? redirectParam : '/dashboard'

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Already signed in as an admin → skip the login screen.
  if (user && isAdminEmail(user.email)) {
    redirect(redirectTo)
  }

  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">Noah AI Dashboard</CardTitle>
          <CardDescription className="text-base">
            Internal metrics console. Sign in with an authorised Google
            account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={redirectTo} initialError={error} />
          <p className="text-muted-foreground mt-6 text-center text-xs">
            Access is restricted to Noah AI team members.{' '}
            <Link href="/" className="underline underline-offset-2">
              Back to site
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
