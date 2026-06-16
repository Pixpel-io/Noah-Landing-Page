'use client'

import { useState, useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import { MessageSquare, TrendingUp } from 'lucide-react'
import type { DotProps } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { TimePoint } from '@/lib/dashboard/metrics'

type TimeRange = '7d' | '30d' | 'months' | 'years'

const RANGE_LABELS: Record<TimeRange, string> = {
  '7d': '7D',
  '30d': '30D',
  months: 'Months',
  years: 'Years',
}

function bucketByMonth(points: TimePoint[]): TimePoint[] {
  const map = new Map<string, number>()
  for (const p of points) {
    const month = p.date.slice(0, 7) // YYYY-MM
    map.set(month, (map.get(month) ?? 0) + p.count)
  }
  return [...map.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

function bucketByYear(points: TimePoint[]): TimePoint[] {
  const map = new Map<string, number>()
  for (const p of points) {
    const year = p.date.slice(0, 4) // YYYY
    map.set(year, (map.get(year) ?? 0) + p.count)
  }
  return [...map.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

function filterByDays(points: TimePoint[], days: number): TimePoint[] {
  if (points.length === 0) return []
  const latest = points[points.length - 1].date
  const cutoff = new Date(`${latest}T00:00:00Z`)
  cutoff.setUTCDate(cutoff.getUTCDate() - days)
  const cutoffStr = cutoff.toISOString().slice(0, 10)
  return points.filter((p) => p.date >= cutoffStr)
}

function applyRange(data: TimePoint[], range: TimeRange): TimePoint[] {
  switch (range) {
    case '7d':
      return filterByDays(data, 7)
    case '30d':
      return filterByDays(data, 30)
    case 'months':
      return bucketByMonth(data)
    case 'years':
      return bucketByYear(data)
  }
}

/** Accumulate per-day counts into a running total for the growth curve. */
function toCumulative(points: TimePoint[]): { date: string; total: number }[] {
  let running = 0
  return points.map((p) => {
    running += p.count
    return { date: p.date, total: running }
  })
}

function formatDay(date: string): string {
  if (date.length === 4) return date // year only
  if (date.length === 7) {
    // YYYY-MM → "Jan 2025"
    const d = new Date(`${date}-01T00:00:00Z`)
    if (Number.isNaN(d.getTime())) return date
    return d.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
  }
  // YYYY-MM-DD → "May 14"
  const d = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function getAvailableMonths(data: TimePoint[]): string[] {
  const set = new Set<string>()
  for (const p of data) set.add(p.date.slice(0, 7))
  return [...set].sort()
}

function getAvailableYears(data: TimePoint[]): string[] {
  const set = new Set<string>()
  for (const p of data) set.add(p.date.slice(0, 4))
  return [...set].sort()
}

function filterByMonth(data: TimePoint[], month: string): TimePoint[] {
  return data.filter((p) => p.date.startsWith(month))
}

function filterByYear(data: TimePoint[], year: string): TimePoint[] {
  return data.filter((p) => p.date.startsWith(year))
}

function RangeToggle({
  value,
  onChange,
  data,
  subValue,
  onSubChange,
}: {
  value: TimeRange
  onChange: (r: TimeRange) => void
  data: TimePoint[]
  subValue: string | null
  onSubChange: (v: string) => void
}) {
  const months = useMemo(() => getAvailableMonths(data), [data])
  const years = useMemo(() => getAvailableYears(data), [data])

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="bg-secondary/70 ring-border/60 inline-flex items-center gap-0.5 rounded-lg p-0.5 ring-1">
        {(Object.keys(RANGE_LABELS) as TimeRange[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onChange(r)}
            className={`rounded-md px-2 py-1 text-[11px] font-medium transition-all sm:px-2.5 sm:text-xs ${
              value === r
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {RANGE_LABELS[r]}
          </button>
        ))}
      </div>
      {value === 'months' && months.length > 0 && (
        <select
          value={subValue ?? ''}
          onChange={(e) => onSubChange(e.target.value)}
          className="bg-secondary/70 ring-border/60 text-foreground rounded-lg px-2.5 py-1 text-xs font-medium ring-1 outline-none"
        >
          <option value="">All months</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </option>
          ))}
        </select>
      )}
      {value === 'years' && years.length > 0 && (
        <select
          value={subValue ?? ''}
          onChange={(e) => onSubChange(e.target.value)}
          className="bg-secondary/70 ring-border/60 text-foreground rounded-lg px-2.5 py-1 text-xs font-medium ring-1 outline-none"
        >
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}


const signupsConfig = {
  total: { label: 'Total users', color: 'var(--chart-1)' },
} satisfies ChartConfig

const messagesConfig = {
  count: { label: 'Messages', color: 'var(--chart-2)' },
} satisfies ChartConfig

/**
 * Live pulsing marker drawn ONLY on the final data point of the area
 * line — a heartbeat ring + glowing core, like a live ticker. recharts
 * calls the dot renderer once per point, passing `index`; we render
 * nothing except on the last one.
 */
function LiveDot(
  props: DotProps & { index?: number; lastIndex: number },
) {
  const { cx, cy, index, lastIndex } = props
  if (cx == null || cy == null || index !== lastIndex) return <g />
  return (
    <g>
      <circle
        className="live-ring"
        cx={cx}
        cy={cy}
        r={4}
        fill="none"
        stroke="var(--color-total)"
        strokeWidth={2}
      />
      <circle
        className="live-core"
        cx={cx}
        cy={cy}
        r={4}
        fill="var(--color-total)"
        stroke="var(--card)"
        strokeWidth={2}
      />
    </g>
  )
}

/** Small rounded chip used in the chart headers (icon + summary). */
function HeaderChip({
  icon: Icon,
  children,
  color,
}: {
  icon: typeof TrendingUp
  children: React.ReactNode
  color: string
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${color}18`, color }}
    >
      <Icon className="size-3.5" />
      {children}
    </span>
  )
}

export function SignupsChart({ data }: { data: TimePoint[] }) {
  const chartColor = '#06b6d4'
  const [range, setRange] = useState<TimeRange>('30d')
  const [sub, setSub] = useState<string | null>(null)
  const filtered = useMemo(() => {
    let result = applyRange(data, range)
    if (range === 'months' && sub) result = filterByMonth(data, sub)
    if (range === 'years' && sub) result = filterByYear(data, sub)
    return result
  }, [data, range, sub])
  const cumulative = toCumulative(filtered)
  const latestTotal = toCumulative(data).at(-1)?.total ?? 0

  const handleRangeChange = (r: TimeRange) => {
    setRange(r)
    setSub(null)
  }

  return (
    <Card
      className="chart-card group"
      style={{ ['--scan-color' as string]: 'var(--chart-1)' }}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              User growth
              <span className="text-emerald-500 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
                <span className="dot-pulse bg-emerald-500 size-1.5 rounded-full" />
                Live
              </span>
            </CardTitle>
            <CardDescription>
              Cumulative onboarded users (app_users) over time
            </CardDescription>
          </div>
          {cumulative.length > 0 ? (
            <HeaderChip icon={TrendingUp} color={chartColor}>
              {latestTotal.toLocaleString('en-US')} total
            </HeaderChip>
          ) : null}
        </div>
        <div className="mt-2 flex justify-end">
          <RangeToggle value={range} onChange={handleRangeChange} data={data} subValue={sub} onSubChange={setSub} />
        </div>
      </CardHeader>
      <CardContent>
        {cumulative.length === 0 ? (
          <EmptyChart label="No signups recorded yet" />
        ) : (
          <ChartContainer config={signupsConfig} className="aspect-[16/7] w-full">
            <AreaChart data={cumulative} margin={{ left: 4, right: 12, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tickFormatter={formatDay}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={32}
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={{
                  stroke: chartColor,
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
                content={<ChartTooltipContent labelFormatter={formatDay} />}
              />
              <defs>
                <linearGradient id="fillSignups" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.55} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <Area
                dataKey="total"
                type="monotone"
                stroke={chartColor}
                strokeWidth={2.5}
                fill="url(#fillSignups)"
                isAnimationActive
                animationDuration={1100}
                animationEasing="ease-out"
                dot={<LiveDot lastIndex={cumulative.length - 1} />}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: 'var(--card)',
                  className: 'chart-active-dot',
                }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export function MessagesChart({ data }: { data: TimePoint[] }) {
  const chartColor = '#f43f5e'
  const [range, setRange] = useState<TimeRange>('30d')
  const [sub, setSub] = useState<string | null>(null)
  const filtered = useMemo(() => {
    if (range === 'months' && sub) return filterByMonth(data, sub)
    if (range === 'years' && sub) return filterByYear(data, sub)
    return applyRange(data, range)
  }, [data, range, sub])
  const total = data.reduce((sum, p) => sum + p.count, 0)

  const handleRangeChange = (r: TimeRange) => {
    setRange(r)
    setSub(null)
  }

  return (
    <Card className="chart-card group">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              Conversation volume
              <span className="text-emerald-500 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
                <span className="dot-pulse bg-emerald-500 size-1.5 rounded-full" />
                Live
              </span>
            </CardTitle>
            <CardDescription>
              Chat / voice messages exchanged per day (app_messages)
            </CardDescription>
          </div>
          {data.length > 0 ? (
            <HeaderChip icon={MessageSquare} color={chartColor}>
              {total.toLocaleString('en-US')} total
            </HeaderChip>
          ) : null}
        </div>
        <div className="mt-2 flex justify-end">
          <RangeToggle value={range} onChange={handleRangeChange} data={data} subValue={sub} onSubChange={setSub} />
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <EmptyChart label="No messages recorded yet" />
        ) : (
          <ChartContainer
            config={messagesConfig}
            className="aspect-[16/7] w-full"
          >
            <BarChart data={filtered} margin={{ left: 4, right: 12, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tickFormatter={formatDay}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={32}
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={{ fill: chartColor, fillOpacity: 0.08 }}
                content={<ChartTooltipContent labelFormatter={formatDay} />}
              />
              <defs>
                <linearGradient id="fillMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0.55} />
                </linearGradient>
              </defs>
              <Bar
                dataKey="count"
                fill="url(#fillMessages)"
                radius={[5, 5, 0, 0]}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="text-muted-foreground flex aspect-[16/7] w-full items-center justify-center text-sm">
      {label}
    </div>
  )
}
