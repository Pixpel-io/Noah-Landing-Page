"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight, ArrowRight, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { locale, t, toggleLocale } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)

    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl border border-[#D9D2BE] shadow-lg shadow-[#1F3842]/5"
            : "bg-[#F5F1EA]/60 backdrop-blur-md border border-[#D9D2BE]/80"
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-transform duration-500 group-hover:rotate-[360deg]">
                <circle cx="16" cy="16" r="15" fill="#1F3842" />
                <path
                  d="M11 22V10.5L21 22V10"
                  stroke="#F5F1EA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="22" cy="9" r="1.5" fill="#D4A24D" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-[#7EA088]/0 group-hover:bg-[#7EA088]/20 transition-colors duration-300" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#1F3842] group-hover:text-[#7EA088] transition-colors duration-300">
              NOAH
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
              className="relative text-sm text-[#4D6E7B] hover:text-[#1F3842] transition-all duration-300 cursor-pointer px-4 py-2 rounded-full hover:bg-[#1F3842]/5"
            >
              {t.nav.discoverNoah}
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className="relative text-sm text-[#4D6E7B] hover:text-[#1F3842] transition-all duration-300 cursor-pointer px-4 py-2 rounded-full hover:bg-[#1F3842]/5"
            >
              {t.nav.testimonials}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="relative text-sm text-[#4D6E7B] hover:text-[#1F3842] transition-all duration-300 cursor-pointer px-4 py-2 rounded-full hover:bg-[#1F3842]/5"
            >
              {t.nav.faq}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={toggleLocale}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 group overflow-hidden hover:bg-[#7EA088]/10"
              title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Globe className="w-4 h-4 text-[#4D6E7B] group-hover:text-[#7EA088] transition-colors duration-300" />
              <span className="text-xs font-bold text-[#1F3842] uppercase group-hover:text-[#7EA088] transition-colors duration-300">{locale === "en" ? "ES" : "EN"}</span>
            </button>

            <button
              className="relative flex items-center gap-0 bg-[#D4A24D] rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden hover:bg-[#E5B55E] hover:shadow-[0_0_24px_rgba(212,162,77,0.6)] hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E5B55E] to-[#D4A24D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-sm font-medium pr-3 relative z-10 text-white">
                {t.nav.downloadApp}
              </span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center relative z-10">
                <ArrowRight className="w-3.5 h-3.5 group-hover:opacity-0 absolute transition-opacity duration-300 text-white" />
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white" />
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-[#7EA088]/10 transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5 text-[#4D6E7B]" />
              <span className="text-xs font-bold text-[#1F3842] uppercase">{locale === "en" ? "ES" : "EN"}</span>
            </button>

            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F3842] hover:bg-[#1F3842]/5 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-4 pb-4 mt-3 border-t border-[#D9D2BE]/50">
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                  className="text-[#4D6E7B] hover:text-[#1F3842] hover:bg-[#1F3842]/5 transition-all duration-200 cursor-pointer px-4 py-2.5 rounded-xl"
                >
                  {t.nav.discoverNoah}
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => handleSmoothScroll(e, "testimonials")}
                  className="text-[#4D6E7B] hover:text-[#1F3842] hover:bg-[#1F3842]/5 transition-all duration-200 cursor-pointer px-4 py-2.5 rounded-xl"
                >
                  {t.nav.testimonials}
                </a>
                <a
                  href="#faq"
                  onClick={(e) => handleSmoothScroll(e, "faq")}
                  className="text-[#4D6E7B] hover:text-[#1F3842] hover:bg-[#1F3842]/5 transition-all duration-200 cursor-pointer px-4 py-2.5 rounded-xl"
                >
                  {t.nav.faq}
                </a>
                <div className="mt-3 pt-3 border-t border-[#D9D2BE]/50 px-4">
                  <button
                    className="relative flex items-center gap-0 bg-[#D4A24D] rounded-full pl-5 pr-1.5 py-1.5 w-fit transition-all duration-300 group overflow-hidden"
                  >
                    <span className="text-sm font-medium pr-3 relative z-10 text-white">
                      {t.nav.downloadApp}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center relative z-10">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
