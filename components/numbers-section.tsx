"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { Users, Pill, Stethoscope, HeartHandshake, Heart } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function NumbersSection() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const stats = [
    { value: t.numbersSection.stat1Value, desc: t.numbersSection.stat1Desc, icon: Users, bgColor: "#FEA060" },
    { value: t.numbersSection.stat2Value, desc: t.numbersSection.stat2Desc, icon: Pill, bgColor: "#D86262" },
    { value: t.numbersSection.stat3Value, desc: t.numbersSection.stat3Desc, icon: Stethoscope, bgColor: "#734163" },
    { value: t.numbersSection.stat4Value, desc: t.numbersSection.stat4Desc, icon: HeartHandshake, bgColor: "#F2CA1D" },
  ]

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      const slideWidth = slider.offsetWidth
      const scrollLeft = slider.scrollLeft
      const newSlide = Math.round(scrollLeft / slideWidth)
      setCurrentSlide(newSlide)
    }

    slider.addEventListener("scroll", handleScroll)
    return () => slider.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % stats.length
        scrollToSlide(nextSlide)
        return nextSlide
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [stats.length])

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current
    if (!slider) return
    const slideWidth = slider.offsetWidth
    slider.scrollTo({ left: slideWidth * index, behavior: "smooth" })
  }

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
            <p className="text-base sm:text-[20px] tracking-wide text-[#D86262] font-normal mb-8 sm:mb-12 font-sans">
              {t.numbersSection.sectionLabel}
            </p>
            <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] tracking-tight text-black mb-12 heading-glow cursor-default">
              {t.numbersSection.headline}
            </h2>
            <p className="text-base text-[#6F6F6F] leading-[1.4] tracking-tight">
              {t.numbersSection.paragraph1}
            </p>
            <p className="text-base text-[#6F6F6F] leading-[1.4] tracking-tight font-semibold mt-6">
              {t.numbersSection.paragraph2}
            </p>
          </motion.div>

          {/* Right - Stats grid (Desktop) / Slider (Mobile) */}
          <div className="flex-1 pt-10">
            {/* Mobile Slider */}
            <div className="sm:hidden">
              <div
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="min-w-full snap-center px-2"
                  >
                    <div className="flex flex-col items-start gap-4 py-10 pr-5 border-t border-[#E9E9E9]">
                      <div
                        className="w-[54px] h-[54px] flex items-center justify-center transition-all duration-300"
                      >
                        <stat.icon className="w-10 h-10 transition-all duration-300" style={{ color: stat.bgColor }} strokeWidth={1.8} />
                      </div>
                      <div className="w-full">
                        <p className="text-3xl font-medium leading-none tracking-tight text-black">
                          {stat.value}
                        </p>
                        <p className="text-base text-[#6F6F6F] leading-[1.4] tracking-tight mt-5">
                          {stat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider dots */}
              <div className="flex justify-center gap-2 mt-4">
                {stats.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "bg-[#D86262] w-6" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:grid grid-cols-2 gap-x-5 gap-y-0">
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
      </div>

      {/* Bottom quote banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto mt-6"
      >
        <div className="relative bg-[#734163] rounded-full px-5 sm:px-8 md:px-10 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden group cursor-default hover:shadow-lg hover:shadow-[#734163]/30 transition-shadow duration-300">
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
