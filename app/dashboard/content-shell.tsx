'use client'

import { useEffect, useState } from 'react'

export function ContentShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)
      if (!desktop) setSidebarOpen(false)
    }
    check()
    if (window.innerWidth >= 1024) setSidebarOpen(true)

    window.addEventListener('resize', check)

    function handleState(e: Event) {
      setSidebarOpen((e as CustomEvent).detail)
    }
    window.addEventListener('noah-dash:sidebar-state', handleState)
    return () => {
      window.removeEventListener('resize', check)
      window.removeEventListener('noah-dash:sidebar-state', handleState)
    }
  }, [])

  return (
    <div
      className="transition-[padding-left] duration-300"
      style={{ paddingLeft: sidebarOpen && isDesktop ? '264px' : '0' }}
    >
      {children}
    </div>
  )
}
