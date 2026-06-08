"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Users, Link2, Brain, HeartPulse, Heart } from "lucide-react"

export function NumbersSection() {
  const { t } = useLanguage()

  const stats = [
    { value: t.numbersSection.stat1Value, desc: t.numbersSection.stat1Desc, icon: Users, color: "#7EA088" },
    { value: t.numbersSection.stat2Value, desc: t.numbersSection.stat2Desc, icon: Link2, color: "#D4A24D" },
    { value: t.numbersSection.stat3Value, desc: t.numbersSection.stat3Desc, icon: Brain, color: "#A95535" },
    { value: t.numbersSection.stat4Value, desc: t.numbersSection.stat4Desc, icon: HeartPulse, color: "#1F3842" },
  ]

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-[#F5F1EA] rounded-3xl p-8 md:p-12 lg:p-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm tracking-wide text-[#7EA088] font-semibold mb-10"
        >
          {t.numbersSection.sectionLabel}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F3842] mb-6">
              {t.numbersSection.headline}
            </h2>
            <p className="text-[#4D6E7B] leading-relaxed mb-4">
              {t.numbersSection.paragraph1}
            </p>
            <p className="text-[#4D6E7B] leading-relaxed font-medium">
              {t.numbersSection.paragraph2}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-[#D9D2BE]/50 rounded-2xl p-5 text-center"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-3" style={{ color: stat.color }} />
                <p className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-xs text-[#4D6E7B] leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom quote banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-6"
      >
        <div className="bg-[#C17B50] rounded-full px-8 md:px-10 py-4 flex items-center justify-center gap-3">
          <Heart className="w-5 h-5 shrink-0 text-white" />
          <p className="text-white text-sm md:text-base font-medium">
            {t.numbersSection.bottomQuote}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
