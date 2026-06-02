"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, ArrowUpRight, ArrowRight, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isScrolled = true
  const { locale, t, toggleLocale } = useLanguage()

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "px-4 pt-4" : ""}`}>
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 rounded-2xl ${
          isScrolled
            ? "bg-[#F5F1EA]/80 backdrop-blur-xl border border-[#D9D2BE] px-6 py-3"
            : "bg-background/90 backdrop-blur-md px-6 py-5"
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2.5 cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
            <span className="text-lg font-semibold tracking-tight text-[#1F3842]">
              Noah
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
              className="text-sm text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="text-sm text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.features}
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className="text-sm text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.testimonials}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="text-sm text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.faq}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D9D2BE] hover:border-[#7EA088] hover:bg-[#7EA088]/5 transition-all duration-200"
              title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5 text-[#4D6E7B]" />
              <span className="text-xs font-semibold text-[#1F3842] uppercase">{locale === "en" ? "ES" : "EN"}</span>
            </button>

            <button
              className="relative flex items-center gap-0 border border-[#1F3842] rounded-full pl-5 pr-1 py-1 transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#1F3842]" />
              <span className="text-sm pr-3 relative z-10 transition-colors duration-300 text-[#1F3842] group-hover:text-[#F5F1EA]">
                {t.nav.downloadApp}
              </span>
              <span className="w-8 h-8 rounded-full flex items-center justify-center relative z-10">
                <ArrowRight className="w-4 h-4 group-hover:opacity-0 absolute transition-opacity duration-300 text-[#1F3842]" />
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#F5F1EA]" />
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#D9D2BE] hover:border-[#7EA088] transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5 text-[#4D6E7B]" />
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

        {isOpen && (
          <nav className="md:hidden mt-6 pb-6 flex flex-col gap-4 border-t border-[#D9D2BE] pt-6">
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
              className="text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.features}
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className="text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.testimonials}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="text-[#4D6E7B] hover:text-[#1F3842] transition-colors cursor-pointer"
            >
              {t.nav.faq}
            </a>
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[#D9D2BE]">
              <button
                className="relative flex items-center gap-0 border border-[#1F3842] rounded-full pl-5 pr-1 py-1 w-fit transition-all duration-300 group overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#1F3842]" />
                <span className="text-sm pr-3 relative z-10 transition-colors duration-300 text-[#1F3842] group-hover:text-[#F5F1EA]">
                  {t.nav.downloadApp}
                </span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center relative z-10">
                  <ArrowRight className="w-4 h-4 group-hover:opacity-0 absolute transition-opacity duration-300 text-[#1F3842]" />
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#F5F1EA]" />
                </span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
