'use client'

import { useState } from 'react'
import { Settings, X } from 'lucide-react'
import { COLOR_OPTIONS, useDashTheme } from './theme-context'

type DashThemeKey = 'heroColor' | 'signupsChartColor' | 'messagesChartColor' | 'cardAccentColor'

const SECTIONS: { key: DashThemeKey; label: string; description: string }[] = [
  { key: 'heroColor', label: 'Hero Banner', description: 'Welcome banner gradient color' },
  { key: 'signupsChartColor', label: 'User Growth Chart', description: 'Line chart color' },
  { key: 'messagesChartColor', label: 'Messages Chart', description: 'Bar chart color' },
  { key: 'cardAccentColor', label: 'Active Nav & Accents', description: 'Sidebar active item & button accents' },
]

export function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useDashTheme()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="nav-link group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
      >
        <Settings className="size-4.5 shrink-0" />
        Settings
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close settings"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
          />
          <div className="fixed right-0 top-0 z-[101] h-full w-80 overflow-y-auto border-l border-[var(--border)] bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Settings</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="mb-5 text-xs text-[var(--muted-foreground)]">
              Customize dashboard colors. Changes are saved to your browser.
            </p>

            <div className="space-y-6">
              {SECTIONS.map((section) => (
                <div key={section.key}>
                  <p className="text-sm font-medium text-[var(--foreground)]">{section.label}</p>
                  <p className="mb-2 text-xs text-[var(--muted-foreground)]">{section.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        title={c.name}
                        onClick={() => setTheme(section.key, c.value)}
                        className={`size-7 rounded-full transition-all ${
                          theme[section.key] === c.value
                            ? 'ring-2 ring-gray-400 ring-offset-2 scale-110'
                            : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
