import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Metric } from '@/lib/dashboard/metrics'

function fmt(value: number | null): string {
  if (value === null) return '—'
  return new Intl.NumberFormat('en-US').format(value)
}

export function HeroSummary({
  totalUsers,
  activeUsers,
  conversationsMessages,
  newUsers30d,
}: {
  totalUsers: Metric
  activeUsers: Metric
  conversationsMessages: Metric
  newUsers30d: Metric
}) {
  return (
    <div
      className={cn(
        'hero-banner reveal relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 text-white sm:p-7',
      )}
      style={{ ['--i' as string]: 0 }}
    >
      <span aria-hidden className="hero-orb hero-orb-a" />
      <span aria-hidden className="hero-orb hero-orb-b" />

      <div className="relative">
        <span className="group/badge relative inline-flex cursor-default items-center gap-1.5 overflow-hidden rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur transition-colors duration-300 hover:bg-white/25">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/badge:translate-x-full" />
          <Sparkles className="relative z-10 size-3.5 transition-all duration-300 group-hover/badge:scale-125 group-hover/badge:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          <span className="relative z-10">Noah AI · Analytics</span>
        </span>
        <h1 className="font-serif mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back <span className="inline-block origin-[70%_70%] animate-[wave_1.8s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="mt-2 max-w-md text-sm text-white/80">
          Aggregate, read-only metrics from the Noah AI production
          database — live counts, derived signals, and growth trends.
        </p>
      </div>

      <div className="relative mt-6">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-3">
          <div className="cursor-default rounded-xl px-3 py-2 transition-all duration-200 hover:scale-110 hover:bg-white/15 hover:shadow-lg hover:shadow-white/10 sm:px-4">
            <p className="font-serif text-2xl font-semibold leading-none sm:text-3xl">
              {fmt(totalUsers.value)}
            </p>
            <p className="mt-1 text-[10px] text-white/70 sm:text-xs">Total users</p>
          </div>
          <span className="hidden h-9 w-px bg-white/20 sm:block" />
          <div className="cursor-default rounded-xl px-3 py-2 transition-all duration-200 hover:scale-110 hover:bg-white/15 hover:shadow-lg hover:shadow-white/10 sm:px-4">
            <p className="font-serif text-2xl font-semibold leading-none sm:text-3xl">
              {fmt(activeUsers.value)}
            </p>
            <p className="mt-1 text-[10px] text-white/70 sm:text-xs">Active users</p>
          </div>
          <span className="hidden h-9 w-px bg-white/20 sm:block" />
          <div className="cursor-default rounded-xl px-3 py-2 transition-all duration-200 hover:scale-110 hover:bg-white/15 hover:shadow-lg hover:shadow-white/10 sm:px-4">
            <p className="font-serif text-2xl font-semibold leading-none sm:text-3xl">
              {fmt(conversationsMessages.value)}
            </p>
            <p className="mt-1 text-[10px] text-white/70 sm:text-xs">Messages</p>
          </div>
          <span className="hidden h-9 w-px bg-white/20 sm:block" />
          <div className="cursor-default rounded-xl px-3 py-2 transition-all duration-200 hover:scale-110 hover:bg-white/15 hover:shadow-lg hover:shadow-white/10 sm:px-4">
            <p className="font-serif text-2xl font-semibold leading-none sm:text-3xl">
              {fmt(newUsers30d.value)}
            </p>
            <p className="mt-1 text-[10px] text-white/70 sm:text-xs">New · 30d</p>
          </div>
        </div>
        <div className="mt-3 flex justify-end sm:mt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-medium backdrop-blur sm:text-xs">
            <span className="size-1.5 animate-pulse rounded-full bg-white" />
            Read-only · Live
          </span>
        </div>
      </div>
    </div>
  )
}
