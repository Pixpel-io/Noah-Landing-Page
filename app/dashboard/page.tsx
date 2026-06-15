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
    <div className="mb-4 mt-10 first:mt-0">
      <div className="flex items-center gap-3">
        <span className="bg-primary/70 h-4 w-1 rounded-full" />
        <h2 className="font-serif text-lg font-semibold tracking-tight">
          {children}
        </h2>
        <span className="bg-border/70 h-px flex-1" />
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
      <div className="border-border/60 bg-card/40 mb-8 flex flex-wrap items-end justify-between gap-3 rounded-2xl border p-6 backdrop-blur">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">
            Overview
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Aggregate, read-only metrics from the Noah AI production database.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1">
            <span className="bg-chart-1 size-1.5 animate-pulse rounded-full" />
            Read-only
          </span>
          <span className="text-muted-foreground text-xs">
            Updated {generated}
          </span>
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
        />
        <StatCard
          title="Interaction time"
          metric={data.interactionMinutes}
          icon={Timer}
          unit="min"
        />
        <StatCard
          title="Conversation messages"
          metric={data.conversationsMessages}
          icon={MessageSquare}
        />
        <StatCard
          title="Medications tracked"
          metric={data.medicationsTracked}
          icon={Pill}
        />
        <StatCard
          title="Emergency contacts"
          metric={data.emergencyContacts}
          icon={Phone}
        />
        <StatCard
          title="Active users (messaged)"
          metric={data.activeUsers}
          icon={Users}
        />
      </div>

      <SectionTitle hint="Cumulative growth and daily volume.">
        Trends
      </SectionTitle>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SignupsChart data={data.signupsByDay} />
        <MessagesChart data={data.messagesByDay} />
      </div>

      <SectionTitle hint="User base from app_users.">Users</SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total users" metric={data.totalUsers} icon={Users} />
        <StatCard
          title="New users (30 days)"
          metric={data.newUsers30d}
          icon={UserPlus}
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
        />
        <StatCard
          title="Consultations recorded"
          metric={data.consultationsRecorded}
          icon={Mic}
        />
        <StatCard
          title="Emergency calls triggered"
          metric={data.emergencyCallsTriggered}
          icon={Phone}
        />
        <StatCard
          title="New subscriptions"
          metric={data.newSubscriptions}
          icon={UserPlus}
        />
        <StatCard
          title="Ended subscriptions"
          metric={data.endedSubscriptions}
          icon={UserMinus}
        />
        <StatCard title="Sales" metric={data.sales} icon={ShoppingCart} />
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
