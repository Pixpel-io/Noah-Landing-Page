"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function FloatingNav() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-6 bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-lg shadow-black/10 border border-gray-100"
        >
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, "how-it-works")}
            className="text-sm font-medium text-[#4D6E7B] hover:text-[#1F3842] transition-colors whitespace-nowrap"
          >
            {t.nav.discoverNoah}
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleSmoothScroll(e, "testimonials")}
            className="text-sm font-medium text-[#4D6E7B] hover:text-[#1F3842] transition-colors whitespace-nowrap"
          >
            {t.nav.testimonials}
          </a>
          <a
            href="#faq"
            onClick={(e) => handleSmoothScroll(e, "faq")}
            className="text-sm font-medium text-[#4D6E7B] hover:text-[#1F3842] transition-colors whitespace-nowrap"
          >
            {t.nav.faq}
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
