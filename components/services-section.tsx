"use client"

import { MessageCircleMore, Pill, Stethoscope, HeartHandshake, Gamepad2, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

const icons = [MessageCircleMore, Pill, Stethoscope, HeartHandshake, Gamepad2]
const colors = ["#7EA088", "#D4A24D", "#A95535", "#7EA088", "#D4A24D"]

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-14"
        >
          <p className="text-[20px] tracking-wide text-[#7EA088] font-normal mb-4 font-sans">{t.services.sectionLabel}</p>
          <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] leading-[0.9] font-normal text-[#1F3842] heading-glow cursor-default">
            {t.services.headline}
          </h2>
        </motion.div>

        {/* 5 items in a horizontal row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 mb-10">
          {t.services.items.map((item, index) => {
            const Icon = icons[index]
            const color = colors[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-start cursor-default"
              >
                <div
                  className="mb-4 transition-all duration-300 hover:scale-110 cursor-pointer"
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg')
                    if (icon) icon.style.filter = `drop-shadow(0 0 8px ${color})`
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg')
                    if (icon) icon.style.filter = 'none'
                  }}
                >
                  <Icon className="w-13 h-13 transition-all duration-300" style={{ color }} strokeWidth={1.6} />
                </div>
                <h3 className="text-[20px] font-bold text-[#1F3842] mb-1">{item.title}</h3>
                <p className="text-base text-black leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Services hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-2xl overflow-hidden mb-20 group"
        >
          <img
            src="/images/services-hero.png"
            alt="Noah services overview"
            className="w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>

        {/* A button made to make every day simpler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-0"
        >
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden group">
            <Image
              src="/images/device-image.png"
              alt="Noah portable device"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="pt-0">
            <h3 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] font-normal text-[#1F3842] mb-6 leading-[0.9] heading-glow cursor-default">
              {t.services.buttonHeadline}
            </h3>
            <p className="text-base text-black leading-[1.7] mb-5">
              {t.services.buttonDesc1}
            </p>
            <p className="text-base text-black leading-[1.7]">
              {t.services.buttonDesc2}
            </p>
          </div>
        </motion.div>

        {/* Easy to use bullets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8"
        >
          <p className="text-[20px] font-medium text-[#6F6F6F] mb-4">{t.services.easyToUse}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {t.services.buttonBullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-3 py-4 border-b border-[#E5E5E5]">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#7EA088]" />
                <p className="text-sm text-black">{bullet}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
