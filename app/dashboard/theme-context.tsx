'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export const COLOR_OPTIONS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Orange', value: '#fb923c' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Indigo', value: '#6366f1' },
]

type DashTheme = {
  heroColor: string
  signupsChartColor: string
  messagesChartColor: string
  cardAccentColor: string
}

type DashThemeContextType = {
  theme: DashTheme
  setTheme: (key: keyof DashTheme, value: string) => void
}

const defaults: DashTheme = {
  heroColor: '#fb923c',
  signupsChartColor: '#3b82f6',
  messagesChartColor: '#fb923c',
  cardAccentColor: '#fb923c',
}

const DashThemeContext = createContext<DashThemeContextType>({
  theme: defaults,
  setTheme: () => {},
})

export function DashThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<DashTheme>(() => {
    if (typeof window === 'undefined') return defaults
    try {
      const saved = localStorage.getItem('noah-dash-theme')
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults
    } catch {
      return defaults
    }
  })

  const setTheme = (key: keyof DashTheme, value: string) => {
    setThemeState((prev) => {
      const next = { ...prev, [key]: value }
      try { localStorage.setItem('noah-dash-theme', JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <DashThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </DashThemeContext.Provider>
  )
}

export function useDashTheme() {
  return useContext(DashThemeContext)
}
