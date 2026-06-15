import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  pending: 'Pending sync',
}

const STATUS_CLASS: Record<Metric['status'], string> = {
  live: 'bg-chart-1/15 text-chart-4 border-chart-1/30',
  derived: 'bg-chart-2/15 text-chart-4 border-chart-2/30',
  pending: 'bg-muted text-muted-foreground border-border',
}

export function StatCard({
  title,
  metric,
  icon: Icon,
  unit,
}: {
  title: string
  metric: Metric
  icon: LucideIcon
  unit?: string
}) {
  const isPending = metric.status === 'pending'

  return (
    <Card className={cn('gap-3 py-5', isPending && 'opacity-90')}>
      <CardHeader className="px-5">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <Icon className="size-4" />
            {title}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn('text-[10px] font-medium', STATUS_CLASS[metric.status])}
          >
            {STATUS_LABEL[metric.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-5">
        <p
          className={cn(
            'font-serif text-3xl font-semibold tracking-tight',
            isPending && 'text-muted-foreground',
          )}
        >
          {formatValue(metric.value, unit)}
        </p>
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
          {metric.source}
        </p>
      </CardContent>
    </Card>
  )
}
