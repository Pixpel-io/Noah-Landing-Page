"use client"

import { MessageCircle, Stethoscope, HeartHandshake, Brain, Pill } from "lucide-react"
import { useRef } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const icons = [MessageCircle, Pill, Stethoscope, HeartHandshake, Brain]
const colors = ["#7EA088", "#D4A24D", "#A95535", "#7EA088", "#D4A24D"]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">

        {/* Section label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.services.sectionLabel}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1F3842]">
            {t.services.headline}
          </h2>
        </motion.div>

        {/* 5 items in a horizontal row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
          {t.services.items.map((item, index) => {
            const Icon = icons[index]
            const color = colors[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-start"
              >
                <div
                  className="w-11 h-11 rounded-full border-2 flex items-center justify-center mb-4"
                  style={{ borderColor: color }}
                >
                  <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-[#1F3842] mb-1.5">{item.title}</h3>
                <p className="text-sm text-[#4D6E7B] leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
