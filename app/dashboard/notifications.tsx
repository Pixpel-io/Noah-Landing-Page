'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, Circle, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type LoginEvent = {
  email: string
  time: string
}

const AVATAR_BG = [
  'bg-blue-100 text-blue-600',
  'bg-emerald-100 text-emerald-600',
  'bg-orange-100 text-orange-600',
  'bg-rose-100 text-rose-600',
  'bg-violet-100 text-violet-600',
  'bg-cyan-100 text-cyan-600',
  'bg-fuchsia-100 text-fuchsia-600',
  'bg-lime-100 text-lime-600',
]

function getAvatarBg(email: string): string {
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_BG[Math.abs(hash) % AVATAR_BG.length]
}

export function Notifications({ currentEmail }: { currentEmail: string }) {
  const [events, setEvents] = useState<LoginEvent[]>([])
  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [presenceOpen, setPresenceOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const presenceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase.channel('dashboard-presence', {
      config: { presence: { key: currentEmail } },
    })

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        const users = Object.keys(state)
        setActiveUsers(users)
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        if (key && key !== currentEmail) {
          const event: LoginEvent = {
            email: key,
            time: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }
          setEvents((prev) => [event, ...prev].slice(0, 20))
          setUnread((prev) => prev + 1)
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ email: currentEmail, online_at: new Date().toISOString() })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentEmail])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
      if (presenceRef.current && !presenceRef.current.contains(e.target as Node)) {
        setPresenceOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOpen = () => {
    setOpen((v) => !v)
    if (!open) setUnread(0)
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Live pill */}
      <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600 ring-1 ring-emerald-100 sm:inline-flex">
        <span className="dot-pulse size-1.5 rounded-full bg-emerald-500" />
        Live
      </span>

      {/* Active users pill with dropdown */}
      {activeUsers.length > 0 && (
        <div ref={presenceRef} className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setPresenceOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600 ring-1 ring-blue-100 transition-all duration-200 hover:bg-blue-100"
          >
            <Users className="size-3" />
            {activeUsers.length} online
          </button>

          {presenceOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
              <div className="border-b px-3 py-2.5">
                <p className="text-xs font-semibold text-[var(--foreground)]">Who&apos;s online</p>
              </div>
              <div className="max-h-48 overflow-y-auto p-2">
                {activeUsers.map((user) => (
                  <div
                    key={user}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
                  >
                    <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${getAvatarBg(user)}`}>
                      {user.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-[var(--foreground)]">
                        {user.split('@')[0]}
                      </p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">{user}</p>
                    </div>
                    <Circle className="size-2 shrink-0 fill-emerald-500 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notifications bell */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          aria-label="Notifications"
          onClick={toggleOpen}
          className="text-muted-foreground hover:bg-primary/10 hover:text-primary relative rounded-full p-1.5 transition-all duration-200"
        >
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="border-b px-4 py-3">
              <p className="text-sm font-semibold text-[var(--foreground)]">Notifications</p>
              <p className="text-xs text-[var(--muted-foreground)]">Admin login activity</p>
            </div>

            {/* Active users list */}
            {activeUsers.length > 0 && (
              <div className="border-b px-4 py-2.5">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Active now
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeUsers.map((user) => (
                    <span
                      key={user}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700"
                    >
                      <Circle className="size-1.5 fill-emerald-500 text-emerald-500" />
                      {user.split('@')[0]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Login events */}
            <div className="max-h-56 overflow-y-auto">
              {events.length === 0 ? (
                <p className="px-4 py-6 text-center text-xs text-[var(--muted-foreground)]">
                  No login activity yet
                </p>
              ) : (
                events.map((event, i) => (
                  <div
                    key={`${event.email}-${event.time}-${i}`}
                    className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2.5 last:border-0"
                  >
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${getAvatarBg(event.email)}`}>
                      {event.email.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-[var(--foreground)]">
                        {event.email.split('@')[0]}
                      </p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">
                        Logged in at {event.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
