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

export function SignupsChart({ data }: { data: TimePoint[] }) {
  const cumulative = toCumulative(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>User growth</CardTitle>
        <CardDescription>
          Cumulative onboarded users (app_users) over time
        </CardDescription>
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
                content={<ChartTooltipContent labelFormatter={formatDay} />}
              />
              <defs>
                <linearGradient id="fillSignups" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                dataKey="total"
                type="monotone"
                stroke="var(--color-total)"
                strokeWidth={2}
                fill="url(#fillSignups)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export function MessagesChart({ data }: { data: TimePoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation volume</CardTitle>
        <CardDescription>
          Chat / voice messages exchanged per day (app_messages)
        </CardDescription>
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
                content={<ChartTooltipContent labelFormatter={formatDay} />}
              />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
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
