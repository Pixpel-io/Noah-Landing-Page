"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Users, Pill, Stethoscope, HeartHandshake, Heart } from "lucide-react"

export function NumbersSection() {
  const { t } = useLanguage()

  const stats = [
    { value: t.numbersSection.stat1Value, desc: t.numbersSection.stat1Desc, icon: Users, bgColor: "#7FA088" },
    { value: t.numbersSection.stat2Value, desc: t.numbersSection.stat2Desc, icon: Pill, bgColor: "#D4A24D" },
    { value: t.numbersSection.stat3Value, desc: t.numbersSection.stat3Desc, icon: Stethoscope, bgColor: "#C76B49" },
    { value: t.numbersSection.stat4Value, desc: t.numbersSection.stat4Desc, icon: HeartHandshake, bgColor: "#7FA088" },
  ]

  return (
    <section className="px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-[#FFFEFA] border-t border-[#E9E9E9] pt-[13px] pb-[30px]">
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-[52px]">
          {/* Left - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:max-w-[418px] shrink-0"
          >
            <p className="text-base sm:text-[20px] tracking-wide text-[#7EA088] font-normal mb-8 sm:mb-12 font-sans">
              {t.numbersSection.sectionLabel}
            </p>
            <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] tracking-tight text-black mb-12 heading-glow cursor-default">
              A reality that affects millions<br />
              of families
            </h2>
            <p className="text-base text-[#6F6F6F] leading-[1.4] tracking-tight">
              {t.numbersSection.paragraph1}
            </p>
            <p className="text-base text-[#6F6F6F] leading-[1.4] tracking-tight font-semibold mt-6">
              {t.numbersSection.paragraph2}
            </p>
          </motion.div>

          {/* Right - Stats grid */}
          <div className="flex-1 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-start gap-4 py-10 pr-5 border-t border-[#E9E9E9] cursor-default"
              >
                <div
                  className="w-[54px] h-[54px] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg')
                    if (icon) icon.style.filter = `drop-shadow(0 0 8px ${stat.bgColor})`
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg')
                    if (icon) icon.style.filter = 'none'
                  }}
                >
                  <stat.icon className="w-10 h-10 transition-all duration-300" style={{ color: stat.bgColor }} strokeWidth={1.8} />
                </div>
                <div className="w-full">
                  <p className="text-3xl sm:text-[40px] font-medium leading-none tracking-tight text-black">
                    {stat.value}
                  </p>
                  <p className="text-base text-[#6F6F6F] leading-[1.4] tracking-tight mt-5">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom quote banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto mt-6"
      >
        <div className="relative bg-[#C17B50] rounded-full px-5 sm:px-8 md:px-10 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden group cursor-default hover:shadow-lg hover:shadow-[#C17B50]/30 transition-shadow duration-300">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-white group-hover:fill-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300" />
          <p className="text-white text-sm sm:text-base md:text-[18px] font-medium text-center relative z-10">
            {t.numbersSection.bottomQuote}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
