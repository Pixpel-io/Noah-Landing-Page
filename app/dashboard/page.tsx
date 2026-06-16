/**
 * Noah AI metrics dashboard.
 *
 * Server component — fetches all aggregates server-side with the anon
 * key (RLS-authorised, read-only) and renders. Metrics with no
 * production data source are shown with an explicit "Pending sync"
 * state and the reason, never a fabricated number.
 */
import {
  Activity,
  AlarmClock,
  AlertTriangle,
  CalendarClock,
  Mic,
  MessageSquare,
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
import { HeroSummary } from './hero-summary'
import { PdfReportButton } from './pdf-report'
import { StatCard } from './stat-card'

export const metadata = { title: 'Dashboard · Noah AI' }

// Always render fresh — this is an internal console, not a public page.
export const dynamic = 'force-dynamic'

function SectionTitle({
  id,
  children,
  hint,
}: {
  id?: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div id={id} className="reveal-fade mb-4 mt-11 scroll-mt-24 first:mt-0">
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

  return (
    <div>
      {/* Welcome hero + headline KPIs */}
      <section id="overview" className="scroll-mt-24">
        <HeroSummary
          totalUsers={data.totalUsers}
          activeUsers={data.activeUsers}
          conversationsMessages={data.conversationsMessages}
          newUsers30d={data.newUsers30d}
        />
      </section>

      {/* PDF Report Download */}
      <div className="mt-6 flex justify-end">
        <PdfReportButton data={data} />
      </div>

      {data.hadError ? (
        <div className="border-destructive/40 bg-destructive/5 text-destructive mt-6 flex items-start gap-2 rounded-lg border p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p>
            Some queries failed — the affected cards show “—”. This is
            usually a transient network issue or an RLS restriction on the
            anon key.
          </p>
        </div>
      ) : null}

      <SectionTitle id="engagement" hint="Real-time counts from production tables.">
        Engagement &amp; care
      </SectionTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Medication reminders"
          metric={data.medicationReminders}
          icon={AlarmClock}
          index={0}
          iconAnim="tick"
        />
        <StatCard
          title="Interaction time"
          metric={data.interactionMinutes}
          icon={Timer}
          unit="min"
          index={1}
          iconAnim="tick"
        />
        <StatCard
          title="Conversation messages"
          metric={data.conversationsMessages}
          icon={MessageSquare}
          index={2}
          iconAnim="bob"
        />
        <StatCard
          title="Medications tracked"
          metric={data.medicationsTracked}
          icon={Pill}
          index={3}
          iconAnim="breathe"
        />
        <StatCard
          title="Emergency contacts"
          metric={data.emergencyContacts}
          icon={Phone}
          index={4}
          iconAnim="wiggle"
        />
        <StatCard
          title="Active users (messaged)"
          metric={data.activeUsers}
          icon={Activity}
          index={5}
          iconAnim="heartbeat"
        />
      </div>

      <SectionTitle id="trends" hint="Cumulative growth and daily volume.">
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


      <SectionTitle
        id="pending"
        hint="Not yet persisted to Supabase — see each card for the reason. These will light up once the phase-2 server-side sync (documented in the app's metrics store and launch roadmap) lands. No values are estimated here."
      >
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

      <div className="border-border/60 text-muted-foreground mt-12 flex items-center justify-center gap-2 border-t pt-6 text-center text-xs">
        Read-only dashboard — the production database is never modified from
        here.
      </div>
    </div>
  )
}
