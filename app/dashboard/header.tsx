import { Activity } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function DashboardHeader({ email }: { email: string }) {
  const initial = email.trim().charAt(0).toUpperCase() || 'A'

  return (
    <header className="border-border/70 bg-background/70 sticky top-0 z-20 border-b backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="bg-primary/15 text-primary ring-primary/25 flex size-9 items-center justify-center rounded-xl ring-1">
            <Activity className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-serif text-base font-semibold">Noah AI</p>
            <p className="text-muted-foreground text-xs">Metrics console</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-secondary/60 ring-border/60 hidden items-center gap-2 rounded-full py-1 pl-1 pr-3 ring-1 sm:flex">
            <span className="bg-primary/20 text-primary flex size-6 items-center justify-center rounded-full text-xs font-semibold">
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
