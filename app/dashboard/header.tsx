import { Button } from '@/components/ui/button'

import { NoahLogo } from './noah-logo'

export function DashboardHeader({ email }: { email: string }) {
  const initial = email.trim().charAt(0).toUpperCase() || 'A'

  return (
    <header className="border-border/70 bg-background/70 sticky top-0 z-20 border-b backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NoahLogo subLabel="Metrics console" />

        <div className="flex items-center gap-3">
          <div className="bg-secondary/60 ring-border/60 hidden items-center gap-2 rounded-full py-1 pl-1 pr-3 ring-1 sm:flex">
            <span className="from-primary to-accent flex size-6 items-center justify-center rounded-full bg-linear-to-br text-xs font-semibold text-white">
              {initial}
            </span>
            <span className="text-muted-foreground text-xs">{email}</span>
          </div>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
