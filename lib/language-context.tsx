"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Locale } from "./i18n"

type LanguageContextType = {
  locale: Locale
  t: typeof translations.en
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

function detectSpain(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return tz === "Europe/Madrid" || tz === "Atlantic/Canary"
  } catch {
    return false
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    if (detectSpain()) {
      setLocale("es")
    }
  }, [])

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "es" : "en"))
  }

  const t = translations[locale]

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
