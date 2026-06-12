"use client"

import { Mic, Camera, FileText, CalendarClock, ShieldCheck, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const icons = [Mic, Camera, FileText, CalendarClock, ShieldCheck, Bell]
const colors = ["#7EA088", "#D4A24D", "#A95535", "#1F3842", "#7EA088", "#D4A24D"]

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section id="features" className="pt-6 md:pt-8 pb-2 md:pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-14"
        >
          <p className="text-[20px] tracking-wide text-[#7EA088] font-normal mb-4 font-sans">
            {t.features.sectionLabel}
          </p>
          <h2 className="font-[family-name:var(--font-crimson)] text-3xl md:text-4xl lg:text-[60px] leading-[0.9] font-normal text-[#1F3842] heading-glow cursor-default">
            {t.features.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          {t.features.items.map((item, index) => {
            const Icon = icons[index]
            const color = colors[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center text-center cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md transition-shadow duration-300 hover:shadow-xl"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-base sm:text-lg md:text-[20px] font-semibold text-[#1F3842] mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-base text-black leading-relaxed">{item.description}</p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
