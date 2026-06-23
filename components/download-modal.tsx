"use client"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const { locale } = useLanguage()
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <h3 className="text-xl font-bold text-[#1F3842] mb-2 text-center">{locale === "es" ? "Descargar NOAH" : "Download NOAH"}</h3>
            <p className="text-sm text-[#6B7280] mb-6 text-center">{locale === "es" ? "Elige tu plataforma" : "Choose your platform"}</p>

            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 bg-black rounded-xl hover:bg-gray-900 transition-colors group"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white shrink-0" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div>
                  <p className="text-[10px] text-white/70 leading-none">{locale === "es" ? "Descargar en" : "Download on the"}</p>
                  <p className="text-lg font-semibold text-white leading-tight">App Store</p>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.noahai.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 bg-black rounded-xl hover:bg-gray-900 transition-colors group"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 shrink-0">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4"/>
                  <path d="M14.499 12.707l2.302 2.302-10.937 6.333 8.635-8.635z" fill="#EA4335"/>
                  <path d="M17.698 9.509l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491z" fill="#FBBC04"/>
                  <path d="M5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z" fill="#34A853"/>
                </svg>
                <div>
                  <p className="text-[10px] text-white/70 leading-none">{locale === "es" ? "DISPONIBLE EN" : "GET IT ON"}</p>
                  <p className="text-lg font-semibold text-white leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
