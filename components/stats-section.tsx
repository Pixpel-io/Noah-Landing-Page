"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function StatsSection() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const stats = [
    { value: t.stats.stat1Value, title: t.stats.stat1Title, desc: t.stats.stat1Desc, color: "#7EA088", image: "/images/Lonely.jpg" },
    { value: t.stats.stat2Value, title: t.stats.stat2Title, desc: t.stats.stat2Desc, color: "#D4A24D", image: "/images/Memory.jpg" },
    { value: t.stats.stat3Value, title: t.stats.stat3Title, desc: t.stats.stat3Desc, color: "#A95535", image: "/images/Family.jpg" },
    { value: t.stats.stat4Value, title: t.stats.stat4Title, desc: t.stats.stat4Desc, color: "#1F3842", image: "/images/Medication.jpg" },
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
    <section id="stats-section" className="pt-6 md:pt-8 pb-2 md:pb-4 px-4 sm:px-6">
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
                <div className="flex flex-col gap-3">
                  <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
                    <Image
                      src={stat.image}
                      alt={stat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-4 text-center flex flex-col items-center border border-gray-200">
                    <h3 className="text-lg font-semibold text-[#1F3842] mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-4xl font-bold mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-black leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider dots */}
          <div className="flex justify-center gap-2 mt-6">
            {stats.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-[#7EA088] w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
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
