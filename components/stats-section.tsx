"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    { value: t.stats.stat1Value, title: t.stats.stat1Title, desc: t.stats.stat1Desc, color: "#7EA088", image: "/images/Lonely.jpg" },
    { value: t.stats.stat2Value, title: t.stats.stat2Title, desc: t.stats.stat2Desc, color: "#D4A24D", image: "/images/Memory.jpg" },
    { value: t.stats.stat3Value, title: t.stats.stat3Title, desc: t.stats.stat3Desc, color: "#A95535", image: "/images/Family.jpg" },
    { value: t.stats.stat4Value, title: t.stats.stat4Title, desc: t.stats.stat4Desc, color: "#1F3842", image: "/images/Medication.jpg" },
  ]

  return (
    <section id="stats-section" className="py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <p className="text-[20px] tracking-wide text-[#7EA088] font-normal mb-4 font-sans">{t.stats.sectionLabel}</p>
          <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] leading-[0.9] font-normal text-[#1F3842] heading-glow cursor-default">
            {t.stats.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col gap-3 cursor-default"
            >
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden group">
                <Image
                  src={stat.image}
                  alt={stat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-5 text-center flex flex-col items-center flex-1 border border-gray-200">
                <h3 className="text-lg sm:text-[22px] font-semibold text-[#1F3842] mb-1 sm:mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[80px] font-bold mb-1 sm:mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
