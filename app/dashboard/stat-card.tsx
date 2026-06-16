import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Metric } from '@/lib/dashboard/metrics'

function formatValue(value: number | null, unit?: string): string {
  if (value === null) return '—'
  const formatted = new Intl.NumberFormat('en-US').format(value)
  return unit ? `${formatted} ${unit}` : formatted
}

const STATUS_LABEL: Record<Metric['status'], string> = {
  live: 'Live',
  derived: 'Derived',
  pending: 'Pending',
}

const STATUS_DOT: Record<Metric['status'], string> = {
  live: 'bg-chart-1',
  derived: 'bg-chart-2',
  pending: 'bg-muted-foreground/60',
}

const STATUS_PILL: Record<Metric['status'], string> = {
  live: 'text-chart-1 bg-chart-1/10 border-chart-1/25',
  derived: 'text-chart-2 bg-chart-2/10 border-chart-2/25',
  pending: 'text-muted-foreground bg-muted/60 border-border',
}

/** Per-status accent rail gradient (CSS vars consumed by dashboard.css). */
const RAIL: Record<Metric['status'], CSSProperties> = {
  live: {
    ['--accent-rail-from' as string]: 'var(--chart-1)',
    ['--accent-rail-to' as string]: 'var(--chart-2)',
  },
  derived: {
    ['--accent-rail-from' as string]: 'var(--chart-2)',
    ['--accent-rail-to' as string]: 'var(--chart-5)',
  },
  pending: {
    ['--accent-rail-from' as string]: 'var(--border)',
    ['--accent-rail-to' as string]: 'var(--muted-foreground)',
  },
}

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
      style={{ ...RAIL[metric.status], ['--i' as string]: index }}
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
                : iconAnim === 'heartbeat'
                  ? `icon-heartbeat`
                  : 'bg-primary/12 text-primary',
              !isPending && iconAnim && iconAnim !== 'heartbeat'
                ? `icon-${iconAnim}`
                : null,
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
