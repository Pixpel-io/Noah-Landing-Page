import { Button } from '@/components/ui/button'

export function DashboardHeader({ email }: { email: string }) {
  return (
    <header className="border-border bg-card/60 sticky top-0 z-10 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-semibold">Noah AI</span>
          <span className="text-muted-foreground hidden text-sm sm:inline">
            · Metrics dashboard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground hidden text-xs sm:inline">
            {email}
          </span>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="ghost" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
