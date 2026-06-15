/**
 * Noah AI metrics dashboard.
 *
 * Server component — fetches all aggregates server-side with the anon
 * key (RLS-authorised, read-only) and renders. Metrics with no
 * production data source are shown with an explicit "Pending sync"
 * state and the reason, never a fabricated number.
 */
import {
  AlarmClock,
  AlertTriangle,
  CalendarCheck,
  CalendarClock,
  CreditCard,
  MessageSquare,
  Mic,
  Phone,
  Pill,
  ShoppingCart,
  Timer,
  UserMinus,
  UserPlus,
  Users,
} from 'lucide-react'

import { isSupabaseConfigured } from '@/lib/supabase/config'
import { getDashboardData } from '@/lib/dashboard/metrics'

import { MessagesChart, SignupsChart } from './charts'
import { NoahMark } from './noah-logo'
import { StatCard } from './stat-card'

export const metadata = { title: 'Dashboard · Noah AI' }

// Always render fresh — this is an internal console, not a public page.
export const dynamic = 'force-dynamic'

function SectionTitle({
  children,
  hint,
}: {
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className="reveal-fade mb-4 mt-12 first:mt-0">
      <div className="flex items-center gap-3">
        <span className="from-primary to-accent h-4 w-1 rounded-full bg-linear-to-b" />
        <h2 className="font-serif text-lg font-semibold tracking-tight">
          {children}
        </h2>
        <span className="from-border h-px flex-1 bg-linear-to-r to-transparent" />
      </div>
      {hint ? (
        <p className="text-muted-foreground mt-1.5 pl-4 text-sm">{hint}</p>
      ) : null}
    </div>
  )
}

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="border-destructive/40 bg-destructive/5 text-destructive rounded-lg border p-6">
        <h2 className="font-semibold">Supabase is not configured</h2>
        <p className="mt-1 text-sm">
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your environment.
        </p>
      </div>
    )
  }

  const data = await getDashboardData()
  const generated = new Date(data.generatedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <div>
      <div className="reveal border-border/60 relative mb-8 overflow-hidden rounded-3xl border p-7 sm:p-8">
        {/* Layered gradient backdrop for the hero */}
        <div
          aria-hidden
          className="from-card via-card to-secondary/50 absolute inset-0 -z-10 bg-linear-to-br"
        />
        <div
          aria-hidden
          className="bg-primary/15 absolute -right-16 -top-20 -z-10 size-64 rounded-full blur-3xl"
        />
        <div
          aria-hidden
          className="bg-accent/15 absolute -bottom-24 -left-10 -z-10 size-56 rounded-full blur-3xl"
        />

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="logo-lockup flex items-center gap-4">
            <span className="logo-orb relative inline-flex shrink-0">
              <NoahMark className="size-14" />
            </span>
            <div>
              <span className="text-primary/90 text-xs font-semibold uppercase tracking-[0.18em]">
                Noah AI · Analytics
              </span>
              <h1 className="font-serif mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                Overview
              </h1>
              <p className="text-muted-foreground mt-1.5 max-w-xl text-sm">
                Aggregate, read-only metrics from the Noah AI production
                database — live counts, derived signals, and growth trends.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="bg-chart-1/12 text-chart-1 ring-chart-1/25 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1">
              <span className="dot-pulse bg-chart-1 size-1.5 rounded-full" />
              Read-only · Live
            </span>
            <span className="text-muted-foreground text-xs">
              Updated {generated}
            </span>
          </div>
        </div>
      </div>

      {data.hadError ? (
        <div className="border-destructive/40 bg-destructive/5 text-destructive mb-6 flex items-start gap-2 rounded-lg border p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p>
            Some queries failed — the affected cards show “—”. This is
            usually a transient network issue or an RLS restriction on the
            anon key.
          </p>
        </div>
      ) : null}

      <SectionTitle hint="Real-time counts from production tables.">
        Engagement &amp; care
      </SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Medication reminders"
          metric={data.medicationReminders}
          icon={AlarmClock}
          index={0}
        />
        <StatCard
          title="Interaction time"
          metric={data.interactionMinutes}
          icon={Timer}
          unit="min"
          index={1}
        />
        <StatCard
          title="Conversation messages"
          metric={data.conversationsMessages}
          icon={MessageSquare}
          index={2}
        />
        <StatCard
          title="Medications tracked"
          metric={data.medicationsTracked}
          icon={Pill}
          index={3}
        />
        <StatCard
          title="Emergency contacts"
          metric={data.emergencyContacts}
          icon={Phone}
          index={4}
        />
        <StatCard
          title="Active users (messaged)"
          metric={data.activeUsers}
          icon={Users}
          index={5}
        />
      </div>

      <SectionTitle hint="Cumulative growth and daily volume.">
        Trends
      </SectionTitle>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="reveal" style={{ ['--i' as string]: 0 }}>
          <SignupsChart data={data.signupsByDay} />
        </div>
        <div className="reveal" style={{ ['--i' as string]: 1 }}>
          <MessagesChart data={data.messagesByDay} />
        </div>
      </div>

      <SectionTitle hint="User base from app_users.">Users</SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total users"
          metric={data.totalUsers}
          icon={Users}
          index={0}
        />
        <StatCard
          title="New users (30 days)"
          metric={data.newUsers30d}
          icon={UserPlus}
          index={1}
        />
      </div>

      <SectionTitle hint="Not yet persisted to Supabase — see each card for the reason. These will light up once the phase-2 server-side sync (documented in the app's metrics store and launch roadmap) lands. No values are estimated here.">
        Pending server-side sync
      </SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Appointments scheduled"
          metric={data.appointmentsScheduled}
          icon={CalendarClock}
          index={0}
        />
        <StatCard
          title="Consultations recorded"
          metric={data.consultationsRecorded}
          icon={Mic}
          index={1}
        />
        <StatCard
          title="Emergency calls triggered"
          metric={data.emergencyCallsTriggered}
          icon={Phone}
          index={2}
        />
        <StatCard
          title="New subscriptions"
          metric={data.newSubscriptions}
          icon={UserPlus}
          index={3}
        />
        <StatCard
          title="Ended subscriptions"
          metric={data.endedSubscriptions}
          icon={UserMinus}
          index={4}
        />
        <StatCard
          title="Sales"
          metric={data.sales}
          icon={ShoppingCart}
          index={5}
        />
      </div>

      <div className="border-border/60 text-muted-foreground mt-12 flex items-center justify-center gap-2 border-t pt-6 text-xs">
        <CreditCard className="size-3.5" />
        Read-only dashboard — the production database is never modified from
        here.
        <CalendarCheck className="size-3.5" />
      </div>
    </div>
  )
}
