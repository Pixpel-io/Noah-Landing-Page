import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Metric } from '@/lib/dashboard/metrics'

function formatValue(value: number | null, unit?: string): string {
  if (value === null) return '—'
  if (unit === 'min' && value > 60) {
    const days = Math.floor(value / 1440)
    const remainingMins = Math.round(value % 1440)
    if (days > 0) {
      return `${days}d ${remainingMins}m`
    }
    const hours = Math.floor(value / 60)
    const mins = Math.round(value % 60)
    return `${hours}h ${mins}m`
  }
  const formatted = new Intl.NumberFormat('en-US').format(value)
  return unit ? `${formatted} ${unit}` : formatted
}

const STATUS_LABEL: Record<Metric['status'], string> = {
  live: 'Live',
  derived: 'Derived',
  pending: 'Pending',
}

const STATUS_DOT: Record<Metric['status'], string> = {
  live: 'bg-emerald-500',
  derived: 'bg-violet-500',
  pending: 'bg-red-500',
}

const STATUS_PILL: Record<Metric['status'], string> = {
  live: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  derived: 'text-violet-600 bg-violet-50 border-violet-200',
  pending: 'text-red-600 bg-red-50 border-red-200',
}

const ICON_COLORS = [
  'bg-gray-100 text-black stat-icon-well',
  'bg-gray-100 text-black stat-icon-well',
  'bg-gray-100 text-black stat-icon-well',
  'bg-gray-100 text-black stat-icon-well',
  'bg-gray-100 text-black stat-icon-well',
  'bg-gray-100 text-black stat-icon-well',
]

/** Auto-loop animation applied to the icon well (defined in dashboard.css). */
export type IconAnim =
  | 'heartbeat'
  | 'breathe'
  | 'tick'
  | 'bob'
  | 'wiggle'

export function StatCard({
  title,
  metric,
  icon: Icon,
  unit,
  index = 0,
  /** Optional human note shown as a subtle trend chip (e.g. "30-day window"). */
  trend,
  /** Auto-running icon animation — only plays when the metric isn't pending. */
  iconAnim,
}: {
  title: string
  metric: Metric
  icon: LucideIcon
  unit?: string
  /** Position in its grid — drives the staggered entrance delay. */
  index?: number
  trend?: string
  iconAnim?: IconAnim
}) {
  const isPending = metric.status === 'pending'

  return (
    <Card
      style={{ ['--i' as string]: index }}
      className={cn('stat-card reveal gap-0 py-0', isPending && 'opacity-80')}
    >
      <span className="corner-glow" aria-hidden />
      <CardContent className="px-5 py-5">
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              'stat-icon flex size-10 items-center justify-center rounded-2xl',
              isPending
                ? 'bg-muted text-muted-foreground'
                : ICON_COLORS[index % ICON_COLORS.length],
            )}
          >
            <Icon className="size-5" />
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium',
              STATUS_PILL[metric.status],
            )}
          >
            <span
              className={cn(
                'size-1.5 rounded-full',
                STATUS_DOT[metric.status],
                metric.status === 'live' && 'dot-pulse',
              )}
            />
            {STATUS_LABEL[metric.status]}
          </span>
        </div>

        <p className="text-muted-foreground mt-4 text-sm font-medium">{title}</p>

        <div className="mt-1 flex items-end justify-between gap-2">
          <p
            className={cn(
              'metric-value font-serif text-[2.1rem] font-semibold leading-none',
              isPending ? 'text-muted-foreground' : 'text-foreground',
            )}
          >
            {formatValue(metric.value, unit)}
          </p>
          {trend && !isPending ? (
            <span className="text-chart-1 bg-chart-1/10 mb-0.5 inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold">
              <ArrowUpRight className="size-3" />
              {trend}
            </span>
          ) : null}
        </div>

        <p className="text-muted-foreground/90 mt-2.5 text-xs leading-relaxed">
          {metric.source}
        </p>
      </CardContent>
    </Card>
  )
}
