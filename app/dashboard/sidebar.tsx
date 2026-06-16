'use client'

/**
 * Dashboard sidebar — the persistent left rail (Donezo-style).
 *
 * Navigation items are in-page anchors to the dashboard's sections. A
 * scroll-spy (IntersectionObserver) highlights the section currently in
 * view so the rail always reflects where you are. On small screens the
 * rail collapses into a slide-over drawer toggled from the topbar via a
 * shared custom event.
 */
import { useEffect, useState } from 'react'
import {
  Activity,
  CalendarClock,
  Clock3,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  LogOut,
  Smartphone,
  Users,
  X,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { NoahLogo } from './noah-logo'

type NavItem = {
  id: string
  label: string
  icon: typeof LayoutDashboard
}

const PRIMARY: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'engagement', label: 'Engagement', icon: Activity },
  { id: 'trends', label: 'Trends', icon: LineChart },
]

const SECONDARY: NavItem[] = [
  { id: 'pending', label: 'Pending sync', icon: CalendarClock },
]

/** Smoothly scroll a section into view, accounting for the sticky topbar. */
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: 'smooth' })
}

function NavLink({
  item,
  active,
  onNavigate,
  onSelect,
  accentColor,
}: {
  item: NavItem
  active: boolean
  onNavigate: () => void
  onSelect: (id: string) => void
  accentColor: string
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={() => {
        onSelect(item.id)
        scrollToSection(item.id)
        onNavigate()
      }}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'nav-link group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
        !active && 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
      style={active ? { color: '#ffffff' } : undefined}
    >
      <Icon
        className={cn(
          'size-4.5 shrink-0 transition-transform group-hover:scale-110',
          !active && 'text-muted-foreground',
        )}
        style={active ? { color: '#ffffff' } : undefined}
      />
      {item.label}
      {active ? (
        <span className="ml-auto size-1.5 rounded-full bg-white" />
      ) : null}
    </button>
  )
}

export function Sidebar() {
  const accentColor = '#fb923c'
  const [active, setActive] = useState('overview')
  const [open, setOpen] = useState(true)
  const [promoHidden, setPromoHidden] = useState(false)

  // On mount, check screen size for initial state
  useEffect(() => {
    if (window.innerWidth < 1024) setOpen(false)
  }, [])

  // Listen for the topbar's hamburger toggle.
  useEffect(() => {
    const toggle = () => {
      setOpen((v) => {
        const next = !v
        window.dispatchEvent(new CustomEvent('noah-dash:sidebar-state', { detail: next }))
        return next
      })
    }
    window.addEventListener('noah-dash:toggle-sidebar', toggle)
    return () => window.removeEventListener('noah-dash:toggle-sidebar', toggle)
  }, [])

  // Scroll-spy: highlight whichever section is nearest the top.
  useEffect(() => {
    const ids = [...PRIMARY, ...SECONDARY].map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      { rootMargin: '-88px 0px -65% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Mobile scrim */}
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          'dash-sidebar fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r p-4 transition-transform',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <NoahLogo subLabel="Analytics" />
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => {
              setOpen(false)
              window.dispatchEvent(new CustomEvent('noah-dash:sidebar-state', { detail: false }))
            }}
            className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg p-1.5 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-5 flex-1 space-y-1">
          <p className="text-muted-foreground/70 px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]">
            Menu
          </p>
          {PRIMARY.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              active={active === item.id}
              onNavigate={() => { if (window.innerWidth < 1024) setOpen(false) }}
              onSelect={setActive}
              accentColor={accentColor}
            />
          ))}

          <p className="text-muted-foreground/70 px-3 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.14em]">
            More
          </p>
          {SECONDARY.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              active={active === item.id}
              onNavigate={() => { if (window.innerWidth < 1024) setOpen(false) }}
              onSelect={setActive}
              accentColor={accentColor}
            />
          ))}
        </nav>

        {/* App promo card */}
        {!promoHidden && (
          <div className="promo-card relative mt-4 overflow-hidden rounded-2xl p-4 text-white">
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setPromoHidden(true)}
              className="absolute right-2 top-2 rounded-full p-1 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="size-4" />
            </button>
            <span aria-hidden className="promo-glow" />
            <Smartphone className="size-5" />
            <p className="mt-2.5 text-sm font-semibold leading-snug">
              Noah on your phone
            </p>
            <p className="mt-1 text-xs text-white/75">
              The full elder-care companion — reminders, voice & emergencies.
            </p>
            <a
              href="https://noahcares.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Learn more
            </a>
          </div>
        )}

        <form action="/auth/signout" method="post" className="mt-3">
          <button
            type="submit"
            className="text-muted-foreground hover:bg-secondary hover:text-foreground flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
          >
            <LogOut className="size-4.5" />
            Sign out
          </button>
        </form>
      </aside>
    </>
  )
}
