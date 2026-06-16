'use client'

/**
 * Dashboard topbar — sticky header with a section title, a (decorative)
 * search field, a live-status chip, and the signed-in admin identity.
 * The hamburger dispatches a window event the Sidebar listens for to
 * open its mobile drawer.
 */
import { useEffect, useRef, useState } from 'react'
import { LogOut, Menu, Moon, Search, Sun, User } from 'lucide-react'

import { Notifications } from './notifications'

const AVATAR_COLORS = [
  'from-blue-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-rose-500 to-pink-500',
  'from-violet-500 to-purple-500',
  'from-cyan-500 to-sky-500',
  'from-fuchsia-500 to-pink-500',
  'from-lime-500 to-green-500',
]

function getAvatarColor(email: string): string {
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function Topbar({
  email,
  generated,
}: {
  email: string
  generated: string
}) {
  const initial = email.trim().charAt(0).toUpperCase() || 'A'
  const avatarGradient = getAvatarColor(email)
  const [profileOpen, setProfileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ id: string; label: string }[]>([])
  const profileRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'engagement', label: 'Engagement & care' },
    { id: 'trends', label: 'Trends' },
    { id: 'pending', label: 'Pending server-side sync' },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('noah-dash-dark')
    if (saved === 'true') {
      setDark(true)
      document.querySelector('.dash-root')?.classList.add('dark')
    }
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    const root = document.querySelector('.dash-root')
    if (next) {
      root?.classList.add('dark')
      localStorage.setItem('noah-dash-dark', 'true')
    } else {
      root?.classList.remove('dark')
      localStorage.setItem('noah-dash-dark', 'false')
    }
  }

  function handleSearch(value: string) {
    setQuery(value)
    if (!value.trim()) {
      setSearchResults([])
      return
    }
    const q = value.toLowerCase()
    setSearchResults(SECTIONS.filter((s) => s.label.toLowerCase().includes(q)))
  }

  function jumpTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      el.classList.add('ring-2', 'ring-[var(--primary)]', 'rounded-lg')
      setTimeout(() => el.classList.remove('ring-2', 'ring-[var(--primary)]', 'rounded-lg'), 1500)
    }
    setQuery('')
    setSearchResults([])
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-20 px-3 pt-3 sm:px-5 lg:px-8">
      <div className="dash-topbar mx-auto flex max-w-6xl items-center gap-2 rounded-full px-3 py-2 sm:gap-3 sm:px-5">
        {/* Menu toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() =>
            window.dispatchEvent(new Event('noah-dash:toggle-sidebar'))
          }
          className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full p-1.5 transition-all duration-200"
        >
          <Menu className="size-[18px]" />
        </button>

        <span className="text-foreground hidden text-sm font-semibold sm:block">Admin Dashboard</span>

        <div ref={searchRef} className="relative mx-auto hidden w-full max-w-xs items-center md:flex lg:max-w-sm">
          <div className="bg-secondary/50 ring-border/50 focus-within:ring-primary/40 focus-within:bg-card flex w-full items-center gap-2 rounded-full px-3 py-1.5 ring-1 transition-all duration-200">
            <Search className="text-muted-foreground size-3.5" />
            <input
              type="text"
              placeholder="Search sections…"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="text-foreground placeholder:text-muted-foreground/60 w-full bg-transparent text-[13px] outline-none"
            />
            <kbd className="text-muted-foreground/70 border-border/60 bg-background hidden rounded border px-1.5 py-0.5 text-[10px] font-medium lg:inline">
              ⌘K
            </kbd>
          </div>

          {searchResults.length > 0 && (
            <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl">
              {searchResults.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => jumpTo(r.id)}
                  className="text-foreground hover:bg-primary/5 hover:text-primary flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors"
                >
                  <Search className="text-muted-foreground size-3.5" />
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* Dark mode toggle */}
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={toggleDark}
            className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full p-1.5 transition-all duration-200"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <Notifications currentEmail={email} />

          {/* Profile dropdown */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-1 transition-all duration-200 hover:bg-primary/5 sm:pr-2.5"
            >
              <span className={`flex size-7 items-center justify-center rounded-full bg-linear-to-br text-xs font-semibold text-white ${avatarGradient}`}>
                {initial}
              </span>
              <div className="hidden leading-tight sm:block text-left">
                <p className="text-foreground max-w-32 truncate text-xs font-medium">
                  {email.split('@')[0]}
                </p>
                <p className="text-muted-foreground text-[10px]">
                  {generated}
                </p>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {/* Profile info */}
                <div className="flex items-center gap-3 border-b px-4 py-4">
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-semibold text-white ${avatarGradient}`}>
                    {initial}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                      {email.split('@')[0]}
                    </p>
                    <p className="truncate text-xs text-[var(--muted-foreground)]">
                      {email}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--foreground)]">
                    <User className="size-4 text-[var(--muted-foreground)]" />
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">Last updated {generated}</p>
                    </div>
                  </div>

                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
