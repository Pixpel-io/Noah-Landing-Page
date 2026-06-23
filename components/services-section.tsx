"use client"

import { MessageCircleMore, Pill, Stethoscope, HeartHandshake } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { useState, useRef, useEffect } from "react"

const icons = [MessageCircleMore, Pill, Stethoscope, HeartHandshake]
const colors = ["#7EA088", "#D4A24D", "#A95535", "#7EA088"]

export function ServicesSection() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

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
        const nextSlide = (prev + 1) % icons.length
        scrollToSlide(nextSlide)
        return nextSlide
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [icons.length])

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current
    if (!slider) return
    const slideWidth = slider.offsetWidth
    slider.scrollTo({ left: slideWidth * index, behavior: "smooth" })
  }

  return (
    <section id="how-it-works" className="pt-4 md:pt-6 pb-2 md:pb-4 px-4 sm:px-6 relative overflow-hidden">
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

        {/* Mobile Slider */}
        <div className="sm:hidden mb-10">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {t.services.items.map((item, index) => {
              const Icon = icons[index]
              const color = colors[index]
              return (
                <div
                  key={index}
                  className="min-w-full snap-center px-4"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center mx-auto max-w-[320px]">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300"
                      style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
                    >
                      <Icon className="w-8 h-8" style={{ color }} strokeWidth={1.8} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1F3842] mb-3">{item.title}</h3>
                    <p className="text-sm text-[#6F6F6F] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Slider dots */}
          <div className="flex justify-center gap-2 mt-6">
            {t.services.items.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-[#7EA088] w-8" : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
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
          className="rounded-2xl overflow-hidden mb-6 group"
        >
          <img
            src="/images/services-hero.png"
            alt="Noah services overview"
            className="w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>


      </div>
    </section>
  )
}
