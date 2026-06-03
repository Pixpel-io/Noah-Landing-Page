"use client"

import { useState, useEffect, useRef } from "react"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const videoCardsEn = [
  { image: "/images/Uncle1.jpg", name: "Roberto García", role: "User, age 72", quote: "Noah helps me every day to stay on top of my health and feel accompanied." },
  { image: "/images/Uncle2.jpg", name: "Manuel Torres", role: "User, age 68", quote: "An incredible experience. Simple, warm, and always available when I need it." },
  { image: "/images/Uncle1.jpg", name: "Roberto García", role: "User, age 72", quote: "I no longer forget my medications. Noah reminds me gently, like a friend would." },
  { image: "/images/Uncle2.jpg", name: "Manuel Torres", role: "User, age 68", quote: "My daughter set it up for me and now I use it every day on my own." },
]

const videoCardsEs = [
  { image: "/images/Uncle1.jpg", name: "Roberto García", role: "Usuario, 72 años", quote: "Noah me ayuda cada día a mantenerme al tanto de mi salud y sentirme acompañado." },
  { image: "/images/Uncle2.jpg", name: "Manuel Torres", role: "Usuario, 68 años", quote: "Una experiencia increíble. Simple, cálida y siempre disponible cuando la necesito." },
  { image: "/images/Uncle1.jpg", name: "Roberto García", role: "Usuario, 72 años", quote: "Ya no olvido mis medicamentos. Noah me recuerda con cariño, como lo haría un amigo." },
  { image: "/images/Uncle2.jpg", name: "Manuel Torres", role: "Usuario, 68 años", quote: "Mi hija lo configuró para mí y ahora lo uso todos los días por mi cuenta." },
]

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const videoScrollRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()

  const videoCards = locale === "es" ? videoCardsEs : videoCardsEn
  const duplicatedVideos = [...videoCards, ...videoCards, ...videoCards]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isInitialized || !videoScrollRef.current) return

    const scrollContainer = videoScrollRef.current
    let animationFrameId: number
    let isActive = true

    const scroll = () => {
      if (!isActive || !scrollContainer || isPaused) {
        animationFrameId = requestAnimationFrame(scroll)
        return
      }

      scrollContainer.scrollLeft += 0.8
      const maxScroll = scrollContainer.scrollWidth / 3

      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft = 0
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      isActive = false
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused, isInitialized])

  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.testimonials.sectionLabel}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-[#1F3842]">
              {t.testimonials.headline}
            </h2>
          </motion.div>
        </div>

        {/* Video testimonials carousel */}
        <div className="relative mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F1EA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F1EA] to-transparent z-10 pointer-events-none" />

          <div
            ref={videoScrollRef}
            className="flex gap-5 overflow-x-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedVideos.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-[220px] sm:w-[260px]">
                {/* Video thumbnail */}
                <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[4/5]">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-[#1F3842] ml-1" fill="#1F3842" />
                    </div>
                  </div>
                </div>
                {/* Quote + name */}
                <p className="text-sm text-[#1F3842] leading-relaxed mb-2 line-clamp-3">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <p className="text-sm font-semibold text-[#1F3842]">{card.name}</p>
                <p className="text-xs text-[#7EA088]">{card.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
