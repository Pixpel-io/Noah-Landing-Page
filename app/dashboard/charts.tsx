'use client'

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

/** Accumulate per-day counts into a running total for the growth curve. */
function toCumulative(points: TimePoint[]): { date: string; total: number }[] {
  let running = 0
  return points.map((p) => {
    running += p.count
    return { date: p.date, total: running }
  })
}

function formatDay(date: string): string {
  // date is YYYY-MM-DD; render as "May 14"
  const d = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
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
  tone,
}: {
  icon: typeof TrendingUp
  children: React.ReactNode
  tone: 'chart-1' | 'chart-2'
}) {
  return (
    <span
      className={
        tone === 'chart-1'
          ? 'bg-chart-1/12 text-chart-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium'
          : 'bg-chart-2/12 text-chart-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium'
      }
    >
      <Icon className="size-3.5" />
      {children}
    </span>
  )
}

export function SignupsChart({ data }: { data: TimePoint[] }) {
  const cumulative = toCumulative(data)
  const latestTotal = cumulative.at(-1)?.total ?? 0

  return (
    <Card
      className="chart-card group"
      style={{ ['--scan-color' as string]: 'var(--chart-1)' }}
    >
      <span className="live-scan" aria-hidden />
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              User growth
              <span className="text-chart-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
                <span className="dot-pulse bg-chart-1 size-1.5 rounded-full" />
                Live
              </span>
            </CardTitle>
            <CardDescription>
              Cumulative onboarded users (app_users) over time
            </CardDescription>
          </div>
          {cumulative.length > 0 ? (
            <HeaderChip icon={TrendingUp} tone="chart-1">
              {latestTotal.toLocaleString('en-US')} total
            </HeaderChip>
          ) : null}
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
                  stroke: 'var(--color-total)',
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
                content={<ChartTooltipContent labelFormatter={formatDay} />}
              />
              <defs>
                <linearGradient id="fillSignups" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.55} />
                  <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <Area
                dataKey="total"
                type="monotone"
                stroke="var(--color-total)"
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
  const total = data.reduce((sum, p) => sum + p.count, 0)

  return (
    <Card className="chart-card group">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              Conversation volume
              <span className="text-chart-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
                <span className="dot-pulse bg-chart-2 size-1.5 rounded-full" />
                Live
              </span>
            </CardTitle>
            <CardDescription>
              Chat / voice messages exchanged per day (app_messages)
            </CardDescription>
          </div>
          {data.length > 0 ? (
            <HeaderChip icon={MessageSquare} tone="chart-2">
              {total.toLocaleString('en-US')} total
            </HeaderChip>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyChart label="No messages recorded yet" />
        ) : (
          <ChartContainer
            config={messagesConfig}
            className="aspect-[16/7] w-full"
          >
            <BarChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
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
                cursor={{ fill: 'var(--color-count)', fillOpacity: 0.08 }}
                content={<ChartTooltipContent labelFormatter={formatDay} />}
              />
              <defs>
                <linearGradient id="fillMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-count)" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="var(--color-count)" stopOpacity={0.55} />
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
