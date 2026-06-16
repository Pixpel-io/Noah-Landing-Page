import { Activity, MessageSquare, Sparkles, UserPlus, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Metric } from '@/lib/dashboard/metrics'

function fmt(value: number | null): string {
  if (value === null) return '—'
  return new Intl.NumberFormat('en-US').format(value)
}

/** One headline KPI inside the hero strip. */
function HeroStat({
  label,
  metric,
  icon: Icon,
  index,
  iconAnim,
}: {
  label: string
  metric: Metric
  icon: LucideIcon
  index: number
  iconAnim?: 'heartbeat' | 'breathe' | 'tick' | 'bob' | 'wiggle'
}) {
  return (
    <div
      className="hero-stat reveal flex items-center gap-3 rounded-2xl px-4 py-3.5"
      style={{ ['--i' as string]: index + 1 }}
    >
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-xl',
          iconAnim === 'heartbeat'
            ? 'icon-heartbeat'
            : 'bg-primary/12 text-primary',
          iconAnim && iconAnim !== 'heartbeat' ? `icon-${iconAnim}` : null,
        )}
      >
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0">
        <p className="metric-value font-serif text-2xl font-semibold leading-none">
          {fmt(metric.value)}
        </p>
        <p className="text-muted-foreground mt-1 truncate text-xs">{label}</p>
      </div>
    </div>
  )
}

/**
 * Welcome hero — a wide gradient feature card (greeting + live badge) on
 * the left, and a 2×2 grid of the four headline KPIs on the right. Sets
 * the tone for the whole console, Donezo-style, while every number stays
 * sourced from real production data.
 */
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
      {/* Gradient greeting card */}
      <div
        className={cn(
          'hero-banner reveal relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 text-white sm:p-7',
        )}
        style={{ ['--i' as string]: 0 }}
      >
        <span aria-hidden className="hero-orb hero-orb-a" />
        <span aria-hidden className="hero-orb hero-orb-b" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="size-3.5" />
            Noah AI · Analytics
          </span>
          <h1 className="font-serif mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back 👋
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/80">
            Aggregate, read-only metrics from the Noah AI production
            database — live counts, derived signals, and growth trends.
          </p>
        </div>

        <div className="relative mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div>
            <p className="font-serif text-3xl font-semibold leading-none">
              {fmt(totalUsers.value)}
            </p>
            <p className="mt-1 text-xs text-white/70">Total users</p>
          </div>
          <span className="h-9 w-px bg-white/20" />
          <div>
            <p className="font-serif text-3xl font-semibold leading-none">
              {fmt(activeUsers.value)}
            </p>
            <p className="mt-1 text-xs text-white/70">Active users</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-white" />
            Read-only · Live
          </span>
        </div>
      </div>

      {/* 2×2 headline KPI grid */}
      <div className="grid grid-cols-2 gap-3">
        <HeroStat
          label="Total users"
          metric={totalUsers}
          icon={Users}
          index={0}
          iconAnim="breathe"
        />
        <HeroStat
          label="Active users"
          metric={activeUsers}
          icon={Activity}
          index={1}
          iconAnim="heartbeat"
        />
        <HeroStat
          label="Messages exchanged"
          metric={conversationsMessages}
          icon={MessageSquare}
          index={2}
          iconAnim="bob"
        />
        <HeroStat
          label="New users · 30d"
          metric={newUsers30d}
          icon={UserPlus}
          index={3}
          iconAnim="breathe"
        />
      </div>
    </div>
  )
}
