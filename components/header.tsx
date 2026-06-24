"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, ArrowRight, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { DownloadModal } from "./download-modal"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const { locale, t, toggleLocale } = useLanguage()

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)

    if (element) {
      const headerOffset = 80
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={handleLogoClick} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="transition-transform duration-500 group-hover:rotate-360">
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
            <div className="absolute inset-0 rounded-full bg-[#D86262]/0 group-hover:bg-[#D86262]/20 group-hover:shadow-[0_0_16px_rgba(216,98,98,0.5)] transition-all duration-300" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1F3842] group-hover:text-[#D86262] transition-colors duration-300">NOAH</span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, "how-it-works")}
            className="text-sm font-medium text-[#1F3842] hover:text-[#D86262] transition-colors cursor-pointer"
          >
            {t.nav.discoverNoah}
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleSmoothScroll(e, "testimonials")}
            className="text-sm font-medium text-[#1F3842] hover:text-[#D86262] transition-colors cursor-pointer"
          >
            {t.nav.testimonials}
          </a>
          <a
            href="#faq"
            onClick={(e) => handleSmoothScroll(e, "faq")}
            className="text-sm font-medium text-[#1F3842] hover:text-[#D86262] transition-colors cursor-pointer"
          >
            {t.nav.faq}
          </a>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#734163] hover:text-white transition-colors group/lang"
            title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
          >
            <Globe className="w-4 h-4 text-[#734163] group-hover/lang:text-white transition-colors" />
            <span className="text-xs font-semibold text-[#1F3842] uppercase group-hover/lang:text-white transition-colors">{locale === "en" ? "ES" : "EN"}</span>
          </button>

          <button onClick={() => setShowDownload(true)} className="relative flex items-center gap-2 border border-[#D86262] rounded-full px-5 py-2.5 overflow-hidden group/btn transition-all duration-300 hover:shadow-[0_0_16px_rgba(216,98,98,0.4)]">
            <span className="absolute inset-0 rounded-full bg-[#D86262] scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300" />
            <span className="text-sm font-medium text-[#D86262] group-hover/btn:text-white relative z-10 transition-colors duration-300">{t.nav.downloadApp}</span>
            <ArrowRight className="w-4 h-4 text-[#D86262] group-hover/btn:text-white relative z-10 transition-colors duration-300" />
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2.5 py-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-[#734163]" />
            <span className="text-xs font-semibold text-[#1F3842] uppercase">{locale === "en" ? "ES" : "EN"}</span>
          </button>

          <button
            className="text-[#1F3842]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              <a
                href="#how-it-works"
                onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                className="text-[#1F3842] py-2 cursor-pointer"
              >
                {t.nav.discoverNoah}
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleSmoothScroll(e, "testimonials")}
                className="text-[#1F3842] py-2 cursor-pointer"
              >
                {t.nav.testimonials}
              </a>
              <a
                href="#faq"
                onClick={(e) => handleSmoothScroll(e, "faq")}
                className="text-[#1F3842] py-2 cursor-pointer"
              >
                {t.nav.faq}
              </a>
              <button onClick={() => { setShowDownload(true); setIsOpen(false) }} className="flex items-center gap-2 bg-[#D86262] rounded-full px-5 py-2.5 w-fit mt-2">
                <span className="text-sm font-medium text-white">{t.nav.downloadApp}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <DownloadModal isOpen={showDownload} onClose={() => setShowDownload(false)} />
    </header>
  )
}
