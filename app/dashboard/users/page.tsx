/**
 * Users list page — polished table with avatars, status indicators, and stats.
 */
import Link from 'next/link'
import {
  Activity,
  ChevronRight,
  MapPin,
  MessageSquare,
  Search,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createAdminClient } from '@/lib/supabase/admin'

export const metadata = { title: 'Users · Noah AI Dashboard' }
export const dynamic = 'force-dynamic'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
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
  if (diffDays < 30) return `${diffDays}d ago`
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
  'from-amber-500 to-amber-600',
  'from-rose-500 to-rose-600',
]

function getAvatarColor(name: string | null): string {
  if (!name) return AVATAR_COLORS[0]
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

type UserRow = {
  id: string
  full_name: string | null
  age: number | null
  gender: string | null
  phone: string | null
  city: string | null
  country: string | null
  created_at: string | null
  message_count: number
  last_message_at: string | null
}

export default async function UsersPage() {
  const supabase = createAdminClient()

  const { data: users, error: usersError } = await supabase
    .from('app_users')
    .select('id, full_name, age, gender, phone, city, country, created_at')
    .order('created_at', { ascending: false })

  if (usersError) {
    return (
      <div className="border-destructive/40 bg-destructive/5 text-destructive rounded-lg border p-6">
        <h2 className="font-semibold">Failed to load users</h2>
        <p className="mt-1 text-sm">{usersError.message}</p>
      </div>
    )
  }

  const { data: messageCounts } = await supabase
    .from('app_messages')
    .select('user_id, created_at')
    .order('created_at', { ascending: false })

  const userMessageMap = new Map<string, { count: number; lastAt: string | null }>()
  if (messageCounts) {
    for (const msg of messageCounts) {
      const existing = userMessageMap.get(msg.user_id)
      if (existing) {
        existing.count++
      } else {
        userMessageMap.set(msg.user_id, { count: 1, lastAt: msg.created_at })
      }
    }
  }

  const enrichedUsers: UserRow[] = (users ?? []).map((u) => {
    const msgData = userMessageMap.get(u.id)
    return {
      ...u,
      message_count: msgData?.count ?? 0,
      last_message_at: msgData?.lastAt ?? null,
    }
  })

  const totalUsers = enrichedUsers.length
  const activeUsers = enrichedUsers.filter((u) => u.message_count > 0).length
  const totalMessages = enrichedUsers.reduce((sum, u) => sum + u.message_count, 0)

  return (
    <div>
      {/* Hero banner */}
      <div
        className="hero-banner reveal relative overflow-hidden rounded-3xl p-6 text-white sm:p-7"
        style={{ ['--i' as string]: 0 }}
      >
        <span aria-hidden className="hero-orb hero-orb-a" />
        <span aria-hidden className="hero-orb hero-orb-b" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="size-3.5" />
            User Management
          </span>
          <h1 className="font-serif mt-3 text-2xl font-semibold tracking-tight">
            All Users
          </h1>
          <p className="mt-1 text-sm text-white/75">
            Monitor user activity, engagement, and health data usage.
          </p>
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="font-serif text-2xl font-semibold">{totalUsers}</p>
            <p className="mt-0.5 text-[11px] text-white/70">Total Users</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="font-serif text-2xl font-semibold">{activeUsers}</p>
            <p className="mt-0.5 text-[11px] text-white/70">Active Users</p>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="font-serif text-2xl font-semibold">{totalMessages.toLocaleString()}</p>
            <p className="mt-0.5 text-[11px] text-white/70">Total Messages</p>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="mt-6">
        <Card className="stat-card reveal gap-0 overflow-hidden border-0 py-0 shadow-lg" style={{ ['--i' as string]: 1 }}>
          {/* Table header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2.5">
              <Users className="text-muted-foreground size-4" />
              <span className="text-sm font-semibold">{totalUsers} Users</span>
              <Badge variant="secondary" className="text-[10px]">
                {activeUsers} active
              </Badge>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Search className="size-3.5" />
              Sorted by latest
            </div>
          </div>

          {/* Table */}
          {enrichedUsers.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="text-muted-foreground mx-auto size-12" />
              <p className="text-muted-foreground mt-3">No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider">User</th>
                    <th className="text-muted-foreground hidden px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider sm:table-cell">Location</th>
                    <th className="text-muted-foreground hidden px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider lg:table-cell">Joined</th>
                    <th className="text-muted-foreground px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider">Messages</th>
                    <th className="text-muted-foreground hidden px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider md:table-cell">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {enrichedUsers.map((user) => {
                    const isActive = user.last_message_at &&
                      (Date.now() - new Date(user.last_message_at).getTime()) < 7 * 86400000
                    return (
                      <tr
                        key={user.id}
                        className="group transition-colors hover:bg-muted/40"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white shadow-sm ${getAvatarColor(user.full_name)}`}>
                              {getInitials(user.full_name)}
                            </div>
                            <div>
                              <p className="text-sm font-medium leading-tight">
                                {user.full_name || 'Unnamed'}
                              </p>
                              <p className="text-muted-foreground mt-0.5 text-[11px]">
                                {[user.age && `${user.age}y`, user.gender].filter(Boolean).join(' · ') || '—'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-muted-foreground hidden px-5 py-3.5 sm:table-cell">
                          {user.city || user.country ? (
                            <div className="flex items-center gap-1.5 text-xs">
                              <MapPin className="size-3 shrink-0" />
                              <span className="max-w-[120px] truncate">
                                {[user.city, user.country].filter(Boolean).join(', ')}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs">—</span>
                          )}
                        </td>
                        <td className="text-muted-foreground hidden px-5 py-3.5 text-xs lg:table-cell">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {user.message_count > 0 ? (
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-500">
                              <MessageSquare className="size-3" />
                              {user.message_count}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">0</span>
                          )}
                        </td>
                        <td className="hidden px-5 py-3.5 md:table-cell">
                          {isActive ? (
                            <div className="flex items-center gap-1.5">
                              <span className="size-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                              <span className="text-xs text-emerald-500 font-medium">
                                {formatRelative(user.last_message_at)}
                              </span>
                            </div>
                          ) : user.last_message_at ? (
                            <div className="flex items-center gap-1.5">
                              <span className="size-2 rounded-full bg-amber-500/60" />
                              <span className="text-muted-foreground text-xs">
                                {formatRelative(user.last_message_at)}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="bg-muted-foreground/40 size-2 rounded-full" />
                              <span className="text-muted-foreground text-xs">Inactive</span>
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Link
                            href={`/dashboard/users/${user.id}`}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary group-hover:text-primary"
                          >
                            View
                            <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
