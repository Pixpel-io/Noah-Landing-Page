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
    <section id="testimonials" className="pt-6 md:pt-8 pb-2 md:pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] font-normal leading-[0.9] text-[#1F3842] heading-glow cursor-default">
              {t.testimonials.headline}
            </h2>
          </motion.div>
        </div>

        {/* Video testimonials carousel */}
        <div className="relative mb-16">
          <div
            ref={videoScrollRef}
            className="flex gap-5 overflow-x-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedVideos.map((card, index) => (
              <div key={index} className="shrink-0 w-52 sm:w-60 md:w-70 group/card cursor-pointer">
                {/* Video thumbnail */}
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-3/4 transition-all duration-300 group-hover/card:-translate-y-1">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-24 h-24 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover/card:scale-125 group-hover/card:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                      <polygon points="8,4 44,24 8,44" fill="none" stroke="white" strokeWidth="4.5" strokeLinejoin="round" className="transition-all duration-300 group-hover/card:fill-[rgba(255,255,255,0.15)]" />
                    </svg>
                  </div>
                </div>
                {/* Quote + name */}
                <p className="text-base text-black leading-relaxed mb-3 line-clamp-3">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <p className="text-sm font-bold text-[#1F3842]">{card.name}</p>
                <p className="text-xs text-[#7EA088]">{card.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
