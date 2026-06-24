"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, Shield } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const { locale } = useLanguage()
  const t = locale === "es" ? es : en

  useEffect(() => {
    const consent = localStorage.getItem("noah-cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem("noah-cookie-consent", "all")
    setVisible(false)
  }

  function acceptEssential() {
    localStorage.setItem("noah-cookie-consent", "essential")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[9998]"
            onClick={acceptEssential}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:left-auto md:right-6 md:max-w-md z-[9999] rounded-2xl bg-white border border-gray-100 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#D86262] via-[#734163] to-[#1F3842]" />

            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#734163]/10">
                    <Cookie className="w-5 h-5 text-[#734163]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F3842]">{t.title}</h3>
                </div>
                <button
                  onClick={acceptEssential}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-[#6B7280] leading-relaxed mb-5">
                {t.description}
              </p>

              {/* Links */}
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-3.5 h-3.5 text-[#734163]" />
                <div className="flex gap-3">
                  <Link href="/cookie-policy" className="text-xs text-[#D86262] hover:underline font-medium">
                    {t.cookiePolicy}
                  </Link>
                  <Link href="/privacy" className="text-xs text-[#D86262] hover:underline font-medium">
                    {t.privacyPolicy}
                  </Link>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={acceptEssential}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-[#1F3842] border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                >
                  {t.essentialOnly}
                </button>
                <button
                  onClick={accept}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#D86262] rounded-full hover:bg-[#c54545] hover:shadow-[0_0_16px_rgba(216,98,98,0.4)] transition-all duration-300"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const en = {
  title: "Cookie Settings",
  description: "We use cookies to ensure the proper functioning of our website and to improve your experience. You can manage your preferences below.",
  cookiePolicy: "Cookie Policy",
  privacyPolicy: "Privacy Policy",
  essentialOnly: "Essential only",
  acceptAll: "Accept all cookies",
}

const es = {
  title: "Configuración de Cookies",
  description: "Utilizamos cookies para garantizar el correcto funcionamiento de nuestro sitio web y mejorar tu experiencia. Puedes gestionar tus preferencias a continuación.",
  cookiePolicy: "Política de Cookies",
  privacyPolicy: "Política de Privacidad",
  essentialOnly: "Solo esenciales",
  acceptAll: "Aceptar todas",
}
