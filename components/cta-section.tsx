"use client"

import { ArrowUpRight, ArrowRight, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F3842] via-[#2B505C] to-[#1F3842]" />
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border border-[#7EA088] rounded-full" />
            <div className="absolute bottom-10 right-20 w-60 h-60 border border-[#D4A24D] rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-[#F5F1EA] rounded-full" />
          </div>

          <div className="relative px-5 py-14 sm:px-8 sm:py-20 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7EA088]/20 border border-[#7EA088]/30 rounded-full mb-8">
                <Heart className="w-4 h-4 text-[#7EA088]" />
                <span className="text-sm font-medium text-[#F5F1EA]">{t.cta.badge}</span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#F5F1EA] mb-6 max-w-3xl mx-auto leading-tight">
                {t.cta.headline}
              </h2>
              <p className="text-[#86A0A9] max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                {t.cta.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button className="relative flex items-center gap-0 border border-[#D4A24D] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden">
                  <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#D4A24D]" />
                  <span className="text-base font-semibold pr-4 relative z-10 transition-colors duration-300 text-[#D4A24D] group-hover:text-[#1F3842]">
                    {t.cta.primaryCta}
                  </span>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 bg-[#D4A24D] group-hover:bg-[#1F3842]/20">
                    <ArrowUpRight className="w-4 h-4 text-[#1F3842]" />
                  </span>
                </button>
                <button className="relative flex items-center gap-0 border border-[#F5F1EA]/30 rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden">
                  <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#F5F1EA]" />
                  <span className="text-base font-medium pr-4 relative z-10 transition-colors duration-300 text-[#F5F1EA] group-hover:text-[#1F3842]">
                    {t.cta.secondaryCta}
                  </span>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10">
                    <ArrowRight className="w-4 h-4 text-[#F5F1EA] group-hover:opacity-0 absolute transition-opacity duration-300" />
                    <ArrowUpRight className="w-4 h-4 text-[#1F3842] opacity-0 group-hover:opacity-100 transition-all duration-300" />
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
