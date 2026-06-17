/**
 * User detail page — profile, stats, activity, medications, contacts.
 */
import Link from 'next/link'
import {
  Activity,
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Pill,
  Shield,
  Stethoscope,
  User,
  Users,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('app_users')
    .select('full_name')
    .eq('id', id)
    .single()
  return { title: `${data?.full_name || 'User'} · Noah AI Dashboard` }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatRelative(dateStr: string | null): string {
  if (!dateStr) return 'Never'
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateStr)
}

function getInitials(name: string | null): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const AVATAR_COLORS = [
  'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600',
  'from-violet-500 to-violet-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-cyan-500 to-cyan-600',
]

function getAvatarColor(name: string | null): string {
  if (!name) return AVATAR_COLORS[0]
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createAdminClient()

  const { data: user, error: userError } = await supabase
    .from('app_users')
    .select('*')
    .eq('id', id)
    .single()

  if (userError || !user) {
    return (
      <div className="border-destructive/40 bg-destructive/5 text-destructive rounded-lg border p-6">
        <h2 className="font-semibold">User not found</h2>
        <p className="mt-1 text-sm">
          {userError?.message || 'No user exists with this ID.'}
        </p>
        <Link
          href="/dashboard/users"
          className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to users
        </Link>
      </div>
    )
  }

  const [messagesResult, medicationsResult, contactsResult] = await Promise.all([
    supabase
      .from('app_messages')
      .select('id, role, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .limit(500),
    supabase
      .from('app_medications')
      .select('id, name, dosage, schedule, time_label, time_24h, indication, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('emergency_contacts')
      .select('id, name, relationship, phone, is_primary, email, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false }),
  ])

  const messages = messagesResult.data ?? []
  const medications = medicationsResult.data ?? []
  const contacts = contactsResult.data ?? []

  const totalMessages = messages.length
  const userMessages = messages.filter((m) => m.role === 'user').length
  const lastMessageAt = messages.length > 0 ? messages[0].created_at : null

  // Activity analysis
  const activityByDay = new Map<string, number>()
  const activityByHour = new Array(24).fill(0)
  for (const msg of messages) {
    if (msg.created_at) {
      const date = new Date(msg.created_at)
      const dayKey = date.toISOString().split('T')[0]
      activityByDay.set(dayKey, (activityByDay.get(dayKey) ?? 0) + 1)
      activityByHour[date.getHours()]++
    }
  }

  const sortedDays = [...activityByDay.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 10)

  const peakHour = activityByHour.indexOf(Math.max(...activityByHour))
  const maxHourCount = Math.max(...activityByHour, 1)

  const isRecentlyActive = lastMessageAt &&
    (Date.now() - new Date(lastMessageAt).getTime()) < 7 * 86400000

  return (
    <div>
      {/* Back link */}
      <div className="reveal-fade mb-5">
        <Link
          href="/dashboard/users"
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4" />
          All Users
        </Link>
      </div>

      {/* Profile header card */}
      <Card className="stat-card reveal gap-0 overflow-hidden border-0 py-0 shadow-lg" style={{ ['--i' as string]: 0 }}>
        <div className="from-primary/5 to-accent/5 h-20 bg-gradient-to-r" />
        <CardContent className="relative px-5 pb-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
            {/* Avatar */}
            <div className={`-mt-10 flex size-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white shadow-lg ring-4 ring-background ${getAvatarColor(user.full_name)}`}>
              {getInitials(user.full_name)}
            </div>
            {/* Name and status */}
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-xl font-semibold sm:text-2xl">
                  {user.full_name || 'Unnamed User'}
                </h1>
                {isRecentlyActive ? (
                  <Badge variant="default" className="gap-1 bg-emerald-500/90 text-[10px]">
                    <span className="size-1.5 animate-pulse rounded-full bg-white" />
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px]">
                    Inactive
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                Joined {formatDate(user.created_at)}
                {lastMessageAt && ` · Last active ${formatRelative(lastMessageAt)}`}
              </p>
            </div>
          </div>

          {/* Profile info grid */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {user.age && (
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                <User className="text-muted-foreground size-4" />
                <span className="text-sm">{user.age} years{user.gender ? ` · ${user.gender}` : ''}</span>
              </div>
            )}
            {(user.city || user.country) && (
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                <MapPin className="text-muted-foreground size-4" />
                <span className="text-sm">{[user.city, user.country].filter(Boolean).join(', ')}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                <Phone className="text-muted-foreground size-4" />
                <span className="text-sm">{user.phone}</span>
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                <Mail className="text-muted-foreground size-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            )}
            {user.timezone && (
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                <Globe className="text-muted-foreground size-4" />
                <span className="text-sm">{user.timezone}</span>
              </div>
            )}
            {user.preferred_locale && (
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                <Globe className="text-muted-foreground size-4" />
                <span className="text-sm">Language: {user.preferred_locale.toUpperCase()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats cards */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 1 }}>
          <CardContent className="flex items-center gap-3 px-4 py-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10">
              <MessageSquare className="size-4.5 text-blue-500" />
            </div>
            <div>
              <p className="font-serif text-xl font-semibold leading-none">{totalMessages}</p>
              <p className="text-muted-foreground mt-1 text-[11px]">Messages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 2 }}>
          <CardContent className="flex items-center gap-3 px-4 py-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Activity className="size-4.5 text-emerald-500" />
            </div>
            <div>
              <p className="font-serif text-xl font-semibold leading-none">{userMessages}</p>
              <p className="text-muted-foreground mt-1 text-[11px]">User sent</p>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 3 }}>
          <CardContent className="flex items-center gap-3 px-4 py-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10">
              <Pill className="size-4.5 text-violet-500" />
            </div>
            <div>
              <p className="font-serif text-xl font-semibold leading-none">{medications.length}</p>
              <p className="text-muted-foreground mt-1 text-[11px]">Medications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 4 }}>
          <CardContent className="flex items-center gap-3 px-4 py-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10">
              <Shield className="size-4.5 text-rose-500" />
            </div>
            <div>
              <p className="font-serif text-xl font-semibold leading-none">{contacts.length}</p>
              <p className="text-muted-foreground mt-1 text-[11px]">Contacts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Activity Timeline */}
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 5 }}>
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex size-7 items-center justify-center rounded-lg bg-orange-500/10">
                <Clock className="size-3.5 text-orange-500" />
              </div>
              Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 py-4">
            {sortedDays.length === 0 ? (
              <div className="py-10 text-center">
                <div className="bg-muted/50 mx-auto flex size-14 items-center justify-center rounded-2xl">
                  <Clock className="text-muted-foreground size-6" />
                </div>
                <p className="text-muted-foreground mt-3 text-sm">No activity recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Peak activity card */}
                <div className="rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">Peak Hour</p>
                      <p className="mt-0.5 text-sm font-semibold">
                        {peakHour.toString().padStart(2, '0')}:00 — {activityByHour[peakHour]} messages
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">Active Days</p>
                      <p className="mt-0.5 text-sm font-semibold">{activityByDay.size}</p>
                    </div>
                  </div>
                </div>

                {/* Hourly chart */}
                <div>
                  <p className="text-muted-foreground mb-2 text-[11px] font-medium uppercase tracking-wider">
                    24-Hour Distribution
                  </p>
                  <div className="flex items-end gap-[2px] rounded-lg bg-muted/30 p-3" style={{ height: '80px' }}>
                    {activityByHour.map((count, hour) => {
                      const height = count > 0 ? Math.max((count / maxHourCount) * 100, 10) : 4
                      const isHot = count === activityByHour[peakHour] && count > 0
                      return (
                        <div
                          key={hour}
                          className={`flex-1 rounded-t-sm transition-all ${
                            isHot
                              ? 'bg-orange-500 shadow-sm shadow-orange-500/30'
                              : count > 0
                                ? 'bg-primary/50 hover:bg-primary/70'
                                : 'bg-muted-foreground/10'
                          }`}
                          style={{ height: `${height}%` }}
                          title={`${hour.toString().padStart(2, '0')}:00 — ${count} msgs`}
                        />
                      )
                    })}
                  </div>
                  <div className="text-muted-foreground mt-1.5 flex justify-between px-1 text-[9px]">
                    <span>12AM</span>
                    <span>6AM</span>
                    <span>12PM</span>
                    <span>6PM</span>
                    <span>11PM</span>
                  </div>
                </div>

                {/* Active days list */}
                <div>
                  <p className="text-muted-foreground mb-2 text-[11px] font-medium uppercase tracking-wider">
                    Recent Active Days
                  </p>
                  <div className="space-y-1">
                    {sortedDays.slice(0, 5).map(([day, count]) => (
                      <div
                        key={day}
                        className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-muted/40"
                      >
                        <span className="text-muted-foreground text-xs">{formatDate(day)}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 rounded-full bg-primary/40" style={{ width: `${Math.max((count / Math.max(...sortedDays.map(([,c]) => c))) * 60, 8)}px` }} />
                          <span className="text-xs font-medium tabular-nums">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medications */}
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 6 }}>
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10">
                <Pill className="size-3.5 text-emerald-500" />
              </div>
              Medications
              {medications.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-[10px]">{medications.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 py-4">
            {medications.length === 0 ? (
              <div className="py-10 text-center">
                <div className="bg-muted/50 mx-auto flex size-14 items-center justify-center rounded-2xl">
                  <Pill className="text-muted-foreground size-6" />
                </div>
                <p className="text-muted-foreground mt-3 text-sm">No medications being tracked.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {medications.map((med) => (
                  <div key={med.id} className="group rounded-xl border p-3.5 transition-colors hover:bg-muted/30">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
                          <Pill className="size-3.5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{med.name}</p>
                          {med.dosage && (
                            <p className="text-muted-foreground text-[11px]">{med.dosage}</p>
                          )}
                        </div>
                      </div>
                      {med.time_label && (
                        <Badge variant="outline" className="text-[10px] font-medium">
                          {med.time_label}
                        </Badge>
                      )}
                    </div>
                    {(med.schedule || med.indication) && (
                      <div className="text-muted-foreground mt-2 flex items-center gap-3 pl-[42px] text-[11px]">
                        {med.schedule && <span>Schedule: {med.schedule}</span>}
                        {med.indication && <span>For: {med.indication}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 7 }}>
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex size-7 items-center justify-center rounded-lg bg-rose-500/10">
                <Shield className="size-3.5 text-rose-500" />
              </div>
              Emergency Contacts
              {contacts.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-[10px]">{contacts.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 py-4">
            {contacts.length === 0 ? (
              <div className="py-10 text-center">
                <div className="bg-muted/50 mx-auto flex size-14 items-center justify-center rounded-2xl">
                  <Users className="text-muted-foreground size-6" />
                </div>
                <p className="text-muted-foreground mt-3 text-sm">No emergency contacts configured.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="group rounded-xl border p-3.5 transition-colors hover:bg-muted/30">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-8 items-center justify-center rounded-lg ${
                          contact.is_primary ? 'bg-rose-500/10' : 'bg-muted/60'
                        }`}>
                          <Users className={`size-3.5 ${contact.is_primary ? 'text-rose-500' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">{contact.name}</p>
                            {contact.is_primary && (
                              <Badge className="bg-rose-500/90 text-[9px]">Primary</Badge>
                            )}
                          </div>
                          {contact.relationship && (
                            <p className="text-muted-foreground text-[11px] capitalize">{contact.relationship}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 pl-[42px] text-[11px]">
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="size-3" />
                          {contact.phone}
                        </span>
                      )}
                      {contact.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="size-3" />
                          {contact.email}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Consultations */}
        <Card className="stat-card reveal gap-0 border-0 py-0 shadow-md" style={{ ['--i' as string]: 8 }}>
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex size-7 items-center justify-center rounded-lg bg-violet-500/10">
                <Stethoscope className="size-3.5 text-violet-500" />
              </div>
              Consultations
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 py-4">
            <div className="py-10 text-center">
              <div className="bg-muted/50 mx-auto flex size-14 items-center justify-center rounded-2xl">
                <Stethoscope className="text-muted-foreground size-6" />
              </div>
              <p className="text-muted-foreground mt-3 text-sm">No consultations recorded yet.</p>
              <p className="text-muted-foreground mt-1 text-[11px]">
                Will appear once the user books consultations through the app.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
