'use client'

/**
 * Dashboard topbar — sticky header with a section title, a (decorative)
 * search field, a live-status chip, and the signed-in admin identity.
 * The hamburger dispatches a window event the Sidebar listens for to
 * open its mobile drawer.
 */
import { Bell, Menu, Search } from 'lucide-react'

export function Topbar({
  email,
  generated,
}: {
  email: string
  generated: string
}) {
  const initial = email.trim().charAt(0).toUpperCase() || 'A'

  return (
    <header className="dash-topbar sticky top-0 z-20 border-b backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() =>
            window.dispatchEvent(new Event('noah-dash:toggle-sidebar'))
          }
          className="text-muted-foreground hover:bg-secondary hover:text-foreground -ml-1 rounded-lg p-2 transition-colors lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div className="hidden flex-col sm:flex">
          <h1 className="font-serif text-xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-xs">
            Live, read-only metrics from production
          </p>
        </div>

        {/* Decorative search — the dashboard has no free-text query yet, but
            the affordance anchors the topbar visually (Donezo pattern). */}
        <div className="mx-auto hidden w-full max-w-sm items-center gap-2 md:flex">
          <div className="bg-secondary/70 ring-border/70 focus-within:ring-primary/50 flex w-full items-center gap-2 rounded-xl px-3 py-2 ring-1 transition-shadow">
            <Search className="text-muted-foreground size-4" />
            <input
              type="text"
              placeholder="Search metrics…"
              className="text-foreground placeholder:text-muted-foreground/80 w-full bg-transparent text-sm outline-none"
            />
            <kbd className="text-muted-foreground/80 border-border bg-card hidden rounded-md border px-1.5 py-0.5 text-[10px] font-medium lg:inline">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="bg-chart-1/12 text-chart-1 ring-chart-1/25 hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 sm:inline-flex">
            <span className="dot-pulse bg-chart-1 size-1.5 rounded-full" />
            Live
          </span>

          <button
            type="button"
            aria-label="Notifications"
            className="icon-wiggle text-muted-foreground hover:bg-secondary hover:text-foreground relative rounded-xl p-2 transition-colors"
          >
            <Bell className="size-4.5" />
            <span className="bg-chart-3 ring-card absolute right-1.5 top-1.5 size-2 rounded-full ring-2" />
          </button>

          <div className="bg-secondary/60 ring-border/60 flex items-center gap-2 rounded-full py-1 pl-1 pr-1 ring-1 sm:pr-3">
            <span className="from-primary to-accent flex size-7 items-center justify-center rounded-full bg-linear-to-br text-xs font-semibold text-white">
              {initial}
            </span>
            <div className="hidden leading-tight sm:block">
              <p className="text-foreground max-w-40 truncate text-xs font-medium">
                {email}
              </p>
              <p className="text-muted-foreground text-[10px]">
                Updated {generated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
