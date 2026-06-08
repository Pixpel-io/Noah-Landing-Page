"use client"

import { MessageCircle, Pill, Stethoscope, HeartHandshake, Brain, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

const icons = [MessageCircle, Pill, Stethoscope, HeartHandshake, Brain]
const colors = ["#7EA088", "#D4A24D", "#A95535", "#7EA088", "#D4A24D"]

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.services.sectionLabel}</p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#1F3842] heading-glow cursor-default">
            {t.services.headline}
          </h2>
        </motion.div>

        {/* 5 items in a horizontal row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 mb-16">
          {t.services.items.map((item, index) => {
            const Icon = icons[index]
            const color = colors[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-start cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:shadow-md"
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

        {/* Old lady image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden mb-20 group"
        >
          <img
            src="/images/Old-Lady.png"
            alt="Senior woman using phone"
            className="w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>

        {/* A button made to make every day simpler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-0"
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/Robot.png"
              alt="Noah portable device"
              fill
              className="object-cover scale-80"
            />
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F3842] mb-4 sm:mb-5 leading-tight">
              {t.services.buttonHeadline}
            </h3>
            <p className="text-sm sm:text-base text-[#4D6E7B] leading-relaxed mb-3 sm:mb-4">
              {t.services.buttonDesc1}
            </p>
            <p className="text-sm sm:text-base text-[#4D6E7B] leading-relaxed">
              {t.services.buttonDesc2}
            </p>
          </div>
        </motion.div>

        {/* Easy to use bullets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-4"
        >
          <p className="text-sm font-semibold text-[#1F3842] mb-5">{t.services.easyToUse}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {t.services.buttonBullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-3 py-3 border-b border-[#E5E5E5]">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#7EA088] mt-0.5" />
                <p className="text-sm text-[#4D6E7B]">{bullet}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
