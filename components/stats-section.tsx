"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    { value: t.stats.stat1Value, title: t.stats.stat1Title, desc: t.stats.stat1Desc, color: "#7EA088" },
    { value: t.stats.stat2Value, title: t.stats.stat2Title, desc: t.stats.stat2Desc, color: "#D4A24D" },
    { value: t.stats.stat3Value, title: t.stats.stat3Title, desc: t.stats.stat3Desc, color: "#A95535" },
    { value: t.stats.stat4Value, title: t.stats.stat4Title, desc: t.stats.stat4Desc, color: "#1F3842" },
  ]

  return (
    <section id="stats-section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.stats.sectionLabel}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F3842]">
            {t.stats.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#FDFBF6] border border-[#D9D2BE] rounded-2xl p-4 sm:p-6 text-center flex flex-col"
            >
              <h3 className="text-sm font-semibold text-[#1F3842] mb-3 min-h-[40px] flex items-center justify-center">
                {stat.title}
              </h3>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs text-[#4D6E7B] leading-relaxed mt-auto">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
