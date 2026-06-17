/**
 * Dashboard metrics — read-only aggregate queries against the Noah AI
 * production Supabase project.
 *
 * GROUND TRUTH (verified against the live DB + the app source):
 * The mobile app only ever WRITES to these tables:
 *   • app_users          — one row per onboarded user
 *   • app_messages        — every chat/voice turn (user + assistant)
 *   • app_medications     — medications the user is tracking
 *   • app_reminders       — scheduled medication reminders
 *   • emergency_contacts  — trusted contacts configured by the user
 *
 * Everything else the product spec asks for is NOT yet persisted to
 * Supabase, so we surface it honestly rather than inventing numbers:
 *   • Appointments scheduled / consultations recorded — live only in
 *     on-device Zustand stores (scheduling.store); the `scheduled_sessions`
 *     and `consultations` tables exist but are empty and never written to,
 *     and are RLS-locked to `auth.uid()` which the anon key cannot satisfy.
 *   • Emergency CALLS triggered — counted on-device (metrics.store /
 *     emergencyLog.store), never synced. (We CAN report emergency contacts
 *     configured, which is a real, different number.)
 *   • Subscriptions (new/ended) & Sales — no billing tables exist in the
 *     project at all; per the app's own metrics.store comment these are
 *     "phase-2 server-side billing webhooks".
 *
 * Each metric therefore carries an explicit `status`:
 *   'live'    — a real count/derivation from production data
 *   'derived' — computed from real production data (clearly labelled)
 *   'pending' — no production source yet; we say so instead of faking it
 */
import { createAdminClient } from '@/lib/supabase/admin'

export type MetricStatus = 'live' | 'derived' | 'pending'

export type Metric = {
  value: number | null
  status: MetricStatus
  /** Short human note explaining where the number comes from / why null. */
  source: string
}

export type TimePoint = { date: string; count: number }

export type DashboardData = {
  /** When the snapshot was taken (ISO). */
  generatedAt: string
  /** True if any query failed — surfaced as a banner in the UI. */
  hadError: boolean

  // Core counts ------------------------------------------------------------
  totalUsers: Metric
  newUsers30d: Metric
  medicationReminders: Metric
  medicationsTracked: Metric
  emergencyContacts: Metric
  conversationsMessages: Metric

  // Derived ----------------------------------------------------------------
  interactionMinutes: Metric
  activeUsers: Metric

  // Pending (no production source yet) ------------------------------------
  appointmentsScheduled: Metric
  consultationsRecorded: Metric
  emergencyCallsTriggered: Metric
  newSubscriptions: Metric
  endedSubscriptions: Metric
  sales: Metric

  // Time series for charts -------------------------------------------------
  signupsByDay: TimePoint[]
  messagesByDay: TimePoint[]
}

const pending = (source: string): Metric => ({
  value: null,
  status: 'pending',
  source,
})

/** Count rows in a table with a HEAD request (no payload transferred). */
async function countRows(
  supabase: ReturnType<typeof createAdminClient>,
  table: string,
): Promise<number | null> {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
  if (error) return null
  return count ?? 0
}

/**
 * Derive total interaction time from message timestamps.
 *
 * We have no explicit session/duration column, so we reconstruct
 * "conversation time" the standard way: order each user's messages by
 * time and sum the gaps between consecutive turns, treating any gap
 * larger than IDLE_GAP_MS as the boundary between two separate
 * conversations (so an overnight pause isn't counted as talk time).
 * A lone message contributes a small fixed read/think allowance.
 *
 * This is an approximation of real behaviour, clearly labelled 'derived'.
 */
const IDLE_GAP_MS = 10 * 60 * 1000 // 10 min => new conversation
const SOLO_MESSAGE_MS = 20 * 1000 // credit for a single-turn exchange

function deriveInteractionMs(
  rows: { user_id: string; created_at: string }[],
): number {
  const byUser = new Map<string, number[]>()
  for (const r of rows) {
    const t = Date.parse(r.created_at)
    if (Number.isNaN(t)) continue
    const arr = byUser.get(r.user_id) ?? []
    arr.push(t)
    byUser.set(r.user_id, arr)
  }

  let totalMs = 0
  for (const times of byUser.values()) {
    times.sort((a, b) => a - b)
    if (times.length === 1) {
      totalMs += SOLO_MESSAGE_MS
      continue
    }
    for (let i = 1; i < times.length; i++) {
      const gap = times[i] - times[i - 1]
      if (gap > 0 && gap <= IDLE_GAP_MS) totalMs += gap
      else totalMs += SOLO_MESSAGE_MS // session boundary — small credit
    }
  }
  return totalMs
}

/** Bucket ISO timestamps into per-day counts (UTC), sorted ascending. */
function bucketByDay(timestamps: string[]): TimePoint[] {
  const map = new Map<string, number>()
  for (const ts of timestamps) {
    const day = ts.slice(0, 10) // YYYY-MM-DD
    if (!day) continue
    map.set(day, (map.get(day) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = createAdminClient()
  const now = new Date()
  const thirtyDaysAgoIso = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString()

  let hadError = false
  const flagError = <T>(v: T | null): T | null => {
    if (v === null) hadError = true
    return v
  }

  // Counts (HEAD requests — cheap) ----------------------------------------
  const [
    totalUsers,
    medsReminders,
    medsTracked,
    emergencyContacts,
    totalMessages,
  ] = await Promise.all([
    countRows(supabase, 'app_users'),
    countRows(supabase, 'app_reminders'),
    countRows(supabase, 'app_medications'),
    countRows(supabase, 'emergency_contacts'),
    countRows(supabase, 'app_messages'),
  ])

  // New users in the last 30 days -----------------------------------------
  const { count: newUsersCount, error: newUsersErr } = await supabase
    .from('app_users')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgoIso)
  if (newUsersErr) hadError = true

  // Signups over time -----------------------------------------------------
  const { data: userRows, error: userRowsErr } = await supabase
    .from('app_users')
    .select('created_at')
    .order('created_at', { ascending: true })
  if (userRowsErr) hadError = true
  const signupsByDay = bucketByDay(
    (userRows ?? []).map((r) => r.created_at as string),
  )

  // Messages: timestamps + user_id for interaction-time derivation,
  // active-user count and per-day volume. Capped generously; the live
  // table is ~1.2k rows so this is a single round-trip.
  const { data: msgRows, error: msgRowsErr } = await supabase
    .from('app_messages')
    .select('user_id, created_at')
    .order('created_at', { ascending: true })
    .limit(50000)
  if (msgRowsErr) hadError = true

  const messages = (msgRows ?? []) as {
    user_id: string
    created_at: string
  }[]
  const interactionMs = deriveInteractionMs(messages)
  const activeUserIds = new Set(messages.map((m) => m.user_id))
  const messagesByDay = bucketByDay(messages.map((m) => m.created_at))

  return {
    generatedAt: now.toISOString(),
    hadError,

    totalUsers: {
      value: flagError(totalUsers),
      status: 'live',
      source: 'app_users — one row per onboarded user',
    },
    newUsers30d: {
      value: newUsersErr ? null : (newUsersCount ?? 0),
      status: 'live',
      source: 'app_users created in the last 30 days',
    },
    medicationReminders: {
      value: flagError(medsReminders),
      status: 'live',
      source: 'app_reminders — scheduled medication reminders',
    },
    medicationsTracked: {
      value: flagError(medsTracked),
      status: 'live',
      source: 'app_medications — medications under management',
    },
    emergencyContacts: {
      value: flagError(emergencyContacts),
      status: 'live',
      source: 'emergency_contacts — trusted contacts configured',
    },
    conversationsMessages: {
      value: flagError(totalMessages),
      status: 'live',
      source: 'app_messages — total chat/voice turns exchanged',
    },

    interactionMinutes: {
      value: Math.round(interactionMs / 60000),
      status: 'derived',
      source:
        'Derived from app_messages timestamps (gap-summed conversation time, 10-min idle boundary)',
    },
    activeUsers: {
      value: activeUserIds.size,
      status: 'derived',
      source: 'Distinct users who have exchanged at least one message',
    },

    // The app persists scheduled sessions + consultation recordings to
    // on-device storage only (scheduling.store → AsyncStorage); the
    // `scheduled_sessions` / `consultations` tables are never written to,
    // and are RLS-locked to auth.uid() which the anon key can't satisfy.
    // Either way the anon key reads 0 — so we report 'pending' honestly
    // instead of a misleading zero.
    appointmentsScheduled: pending(
      'App saves scheduled appointments on-device only (not synced to Supabase) and the server table is RLS-locked to the owning user — the dashboard anon key cannot read them.',
    ),
    consultationsRecorded: pending(
      'Consultation recordings are saved on-device only (not synced to Supabase); the consultations table stays empty + RLS-locked to the owning user.',
    ),
    emergencyCallsTriggered: pending(
      'Emergency dial events are counted on-device (emergency log) and never synced to Supabase — no server table exists.',
    ),
    newSubscriptions: pending(
      'No billing/subscriptions table exists in the project — nothing to read.',
    ),
    endedSubscriptions: pending(
      'No billing/subscriptions table exists in the project — nothing to read.',
    ),
    sales: pending(
      'No sales/payments table exists in the project — nothing to read.',
    ),

    signupsByDay,
    messagesByDay,
  }
}
