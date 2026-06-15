/**
 * Dashboard shell + admin gate.
 *
 * The middleware already guarantees a signed-in user reaches here. This
 * layout adds the fine-grained check the middleware can't do (it needs
 * the user's email): only addresses on DASHBOARD_ADMIN_EMAILS may see
 * any data. A signed-in non-admin gets an explicit access-denied screen
 * with a sign-out action rather than a silent redirect loop.
 */
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/supabase/config'

import { DashboardHeader } from './header'
import { poppins } from './fonts'
import './dashboard.css'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/dashboard')

  if (!isAdminEmail(user.email)) {
    return (
      <main className={`${poppins.variable} dash-root bg-background flex min-h-dvh items-center justify-center px-4`}>
        <div className="bg-card max-w-md rounded-2xl border p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl font-semibold">Access denied</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            <span className="text-foreground font-medium">{user.email}</span> is
            not on the authorised list for the Noah AI dashboard. If this is a
            mistake, ask an administrator to add your email to the allowlist.
          </p>
          <form action="/auth/signout" method="post" className="mt-6">
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div className={`${poppins.variable} dash-root min-h-dvh`}>
      <DashboardHeader email={user.email ?? ''} />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
