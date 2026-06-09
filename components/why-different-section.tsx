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
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
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

        {/* Bottom block - modern glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-3xl overflow-hidden group"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F3842] via-[#2B505C] to-[#1F3842]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative flex flex-col sm:flex-row sm:items-center">
            {/* Text content */}
            <div className="flex-1 px-6 sm:px-10 py-8 sm:py-10 relative z-10">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F1EA] mb-3 leading-tight">
                {t.whyDifferent.headline2}
              </h2>
              <p className="text-sm text-[#F5F1EA]/70 leading-relaxed max-w-md">
                {t.whyDifferent.description2}
              </p>
            </div>

            {/* Image */}
            <div className="hidden sm:block relative w-[200px] md:w-[260px] h-[180px] md:h-[200px] rounded-2xl overflow-hidden m-4 mr-6 shrink-0">
              <Image
                src="/images/Couple.png"
                alt="Elderly couple together"
                fill
                className="object-cover object-[70%_30%] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Pillars row */}
          <div className="relative border-t border-white/10 px-4 sm:px-10 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between items-center gap-3 md:gap-4">
              {t.whyDifferent.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index]
                return (
                  <div key={index} className="flex items-center gap-2.5 cursor-default group/pill">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/10 group-hover/pill:bg-white/30 group-hover/pill:shadow-[0_0_14px_rgba(255,255,255,0.6)] transition-all duration-300">
                      <Icon className="w-4 h-4 text-white/80 group-hover/pill:text-white group-hover/pill:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] transition-all duration-300" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#F5F1EA]/90 group-hover/pill:text-white transition-colors duration-300">{pillar}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
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
