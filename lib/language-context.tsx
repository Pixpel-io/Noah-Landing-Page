"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { translations, type Locale } from "./i18n"

type LanguageContextType = {
  locale: Locale
  t: typeof translations.en
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

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
