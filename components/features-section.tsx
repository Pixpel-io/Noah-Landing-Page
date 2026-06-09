"use client"

import { Mic, Camera, FileText, CalendarClock, ShieldCheck, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const icons = [Mic, Camera, FileText, CalendarClock, ShieldCheck, Bell]
const colors = ["#7EA088", "#D4A24D", "#A95535", "#1F3842", "#7EA088", "#D4A24D"]

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section id="features" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-14"
        >
          <p className="text-sm tracking-wide text-[#7EA088] font-semibold mb-4">
            {t.features.sectionLabel}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F3842]">
            {t.features.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
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
                <h3 className="text-sm font-semibold text-[#1F3842] mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-[#4D6E7B] leading-relaxed">{item.description}</p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
