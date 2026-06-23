"use client"

import Link from "next/link"
import { ArrowLeft, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LegalHeader() {
  const { locale, toggleLocale } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#D9D2BE]/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="relative">
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none" className="sm:w-9 sm:h-9 transition-transform duration-500 group-hover:rotate-[360deg]">
              <circle cx="18" cy="18" r="17" fill="#1F3842" />
              <path
                d="M12 25V12L24 25V12"
                stroke="#F5F1EA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="25" cy="11" r="1.8" fill="#D4A24D" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-[#7EA088]/0 group-hover:bg-[#7EA088]/20 group-hover:shadow-[0_0_16px_rgba(126,160,136,0.5)] transition-all duration-300" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#1F3842] group-hover:text-[#7EA088] transition-colors duration-300">NOAH</span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-full hover:bg-[#7EA088] hover:text-white transition-colors group/lang min-h-11 min-w-11 justify-center sm:min-h-0 sm:min-w-0"
            title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
          >
            <Globe className="w-4 h-4 text-[#4D6E7B] group-hover/lang:text-white transition-colors" />
            <span className="text-xs font-semibold text-[#1F3842] uppercase group-hover/lang:text-white transition-colors">{locale === "en" ? "ES" : "EN"}</span>
          </button>

          <a
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 border border-[#D4A24D] rounded-full px-3 sm:px-5 py-2 sm:py-2.5 overflow-hidden group/btn transition-all duration-300 hover:shadow-[0_0_16px_rgba(212,162,77,0.4)] relative no-underline min-h-11"
          >
            <span className="absolute inset-0 rounded-full bg-[#D4A24D] scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300 pointer-events-none" />
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4A24D] group-hover/btn:text-white relative z-10 transition-colors duration-300" />
            <span className="text-xs sm:text-sm font-medium text-[#D4A24D] group-hover/btn:text-white relative z-10 transition-colors duration-300">
              {locale === "en" ? "Home" : "Inicio"}
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
