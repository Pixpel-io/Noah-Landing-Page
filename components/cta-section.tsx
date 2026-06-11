"use client"

import { Heart, ArrowUpRight, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#1C4E59] text-center">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-40 h-40 border border-[#7EA088] rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 right-20 w-60 h-60 border border-[#D4A24D] rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 left-1/3 w-32 h-32 border border-[#F5F1EA] rounded-full"
            />
          </div>

          <div className="relative px-5 py-14 sm:px-8 sm:py-16 md:px-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Badge */}
            <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-[#7EA088]/20 border border-[#7EA088]/30 rounded-full mb-8 overflow-hidden group/badge cursor-default hover:border-[#7EA088]/60 transition-colors duration-300">
              <div className="absolute inset-0 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <Heart className="w-4 h-4 text-[#7EA088] relative z-10 group-hover/badge:scale-125 group-hover/badge:text-white group-hover/badge:fill-white group-hover/badge:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300" />
              <span className="text-sm font-medium text-[#F5F1EA] relative z-10">{t.cta.badge}</span>
            </div>

            {/* Headline */}
            <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[50px] font-semibold text-white mb-6 max-w-3xl mx-auto leading-tight">
              {t.cta.headline}
            </h2>

            {/* Description */}
            <p className="text-white/80 max-w-3xl mx-auto mb-10 text-lg sm:text-xl leading-[1.8] font-normal">
              {t.cta.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative flex items-center gap-0 border border-[#D4A24D] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden">
                <span className="absolute inset-0 rounded-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 bg-[#D4A24D]" />
                <span className="text-base font-semibold pr-4 relative z-10 transition-colors duration-300 text-[#D4A24D] group-hover:text-[#1F3842]">
                  {t.cta.primaryCta}
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 bg-[#D4A24D]">
                  <ArrowUpRight className="w-4 h-4 text-[#1F3842]" />
                </span>
              </button>
              <button className="relative flex items-center gap-0 border border-[#F5F1EA]/30 rounded-full px-6 py-2.5 transition-all duration-300 group overflow-hidden">
                <span className="absolute inset-0 rounded-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 bg-[#F5F1EA]" />
                <span className="text-base font-medium relative z-10 transition-colors duration-300 text-[#F5F1EA] group-hover:text-[#1F3842]">
                  {t.cta.secondaryCta}
                </span>
              </button>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
