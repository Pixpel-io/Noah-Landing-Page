"use client"

import { Mic, Camera, FileText, CalendarClock, ShieldCheck, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { useState, useRef, useEffect } from "react"

const icons = [Mic, Camera, FileText, CalendarClock, ShieldCheck, Bell]
const colors = ["#FEA060", "#D86262", "#734163", "#FEA060", "#D86262", "#734163"]

export function FeaturesSection() {
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
    <section id="features" className="pt-6 md:pt-8 pb-2 md:pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-14"
        >
          <p className="text-[20px] tracking-wide text-[#D86262] font-normal mb-4 font-sans">
            {t.features.sectionLabel}
          </p>
          <h2 className="font-[family-name:var(--font-crimson)] text-3xl md:text-4xl lg:text-[60px] leading-[0.9] font-normal text-[#1F3842] heading-glow cursor-default">
            {t.features.headline}
          </h2>
        </motion.div>

        {/* Mobile Slider */}
        <div className="sm:hidden">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {t.features.items.map((item, index) => {
              const Icon = icons[index]
              const color = colors[index]
              return (
                <div
                  key={index}
                  className="min-w-full snap-center px-2"
                >
                  <div className="flex flex-col items-center text-center py-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="w-10 h-10 text-white" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-[22px] font-semibold text-[#1F3842] mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-base text-black leading-relaxed max-w-[280px]">{item.description}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Slider dots */}
          <div className="flex justify-center gap-2 mt-4">
            {t.features.items.map((_, index) => (
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
        <div className="hidden sm:grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          {t.features.items.map((item, index) => {
            const Icon = icons[index]
            const color = colors[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center text-center cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md transition-shadow duration-300 hover:shadow-xl"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-base sm:text-lg md:text-[20px] font-semibold text-[#1F3842] mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-base text-black leading-relaxed">{item.description}</p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
