"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { MessageCircle, HeartPulse, Brain, ShieldAlert, Users, Heart } from "lucide-react"

const pillarIcons = [MessageCircle, HeartPulse, Brain, ShieldAlert, Users]
const pillarColors = ["#7EA088", "#D4A24D", "#A95535", "#D4A24D", "#7EA088"]

export function WhyDifferentSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Top block - white bg with image left, text right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          <div className="relative min-h-[220px] sm:min-h-[300px] md:min-h-[400px] border-l-4 border-[#D4A24D]">
            <Image
              src="/images/Smile.jpg"
              alt="Senior man smiling with phone"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <p className="text-sm tracking-wide text-[#7EA088] font-medium mb-4">
              {t.whyDifferent.sectionLabel}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F3842] mb-4 sm:mb-6 leading-tight">
              {t.whyDifferent.headline}
            </h2>
            <p className="text-[#4D6E7B] leading-relaxed">
              {t.whyDifferent.description}
            </p>
          </div>
        </motion.div>

        {/* Bottom block - banner style: text left, small image right, pillars below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-[#F5F1EA] rounded-2xl overflow-hidden"
        >
          <div className="relative flex flex-col sm:flex-row sm:items-center px-6 sm:px-8 py-6 min-h-[140px]">
            <div className="flex-1 relative z-10 sm:max-w-[60%]">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#1F3842] mb-2 leading-tight">
                {t.whyDifferent.headline2}
              </h2>
              <p className="text-sm text-[#7EA088] leading-relaxed">
                {t.whyDifferent.description2}
              </p>
            </div>
            <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[180px] md:w-[220px] overflow-hidden rounded-r-2xl">
              <Image
                src="/images/Couple.png"
                alt="Elderly couple together"
                fill
                className="object-cover object-[70%_30%]"
              />
            </div>
          </div>

          {/* Pillars row */}
          <div className="border-t border-[#E5E5E5] px-4 sm:px-8 py-4 bg-[#FAFAFA]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between items-center gap-3 md:gap-4">
              {t.whyDifferent.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index]
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F5F1EA] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" style={{ color: pillarColors[index] }} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#1F3842]">{pillar}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-[#1F3842] rounded-2xl px-5 sm:px-8 md:px-10 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 overflow-hidden group cursor-default hover:shadow-lg hover:shadow-[#1F3842]/40 transition-shadow duration-300"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Heart className="w-6 h-6 shrink-0 text-[#7EA088] relative z-10 group-hover:fill-white group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300" />
          <p className="text-white text-sm md:text-base leading-relaxed relative z-10">
            {t.whyDifferent.quote}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
