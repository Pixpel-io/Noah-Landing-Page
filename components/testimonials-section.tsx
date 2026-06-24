"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const videoCards = [
  {
    video: "https://res.cloudinary.com/dcxh05s3p/video/upload/q_auto,f_auto,w_720/v1782286247/video-1038_singular_display_jrecni.mov",
    poster: "/images/Uncle1.jpg",
    name: "Roberto García",
    roleEn: "User, age 72",
    roleEs: "Usuario, 72 años",
    quoteEn: "Noah helps me every day to stay on top of my health and feel accompanied.",
    quoteEs: "Noah me ayuda cada día a mantenerme al tanto de mi salud y sentirme acompañado.",
  },
  {
    video: "https://res.cloudinary.com/dcxh05s3p/video/upload/q_auto,f_auto,w_720/v1782286233/video-1033_singular_display_gfhyps.mov",
    poster: "/images/Uncle2.jpg",
    name: "Manuel Torres",
    roleEn: "User, age 68",
    roleEs: "Usuario, 68 años",
    quoteEn: "An incredible experience. Simple, warm, and always available when I need it.",
    quoteEs: "Una experiencia increíble. Simple, cálida y siempre disponible cuando la necesito.",
  },
  {
    video: "https://res.cloudinary.com/dcxh05s3p/video/upload/q_auto,f_auto,w_720/v1782286218/video-1031_singular_display_oj5q0w.mov",
    poster: "/images/Uncle1.jpg",
    name: "Roberto García",
    roleEn: "User, age 72",
    roleEs: "Usuario, 72 años",
    quoteEn: "I no longer forget my medications. Noah reminds me gently, like a friend would.",
    quoteEs: "Ya no olvido mis medicamentos. Noah me recuerda con cariño, como lo haría un amigo.",
  },
]

export function TestimonialsSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const { t, locale } = useLanguage()

  const handlePlay = (index: number) => {
    if (playingIndex === index) {
      videoRefs.current[index]?.pause()
      setPlayingIndex(null)
    } else {
      if (playingIndex !== null) {
        videoRefs.current[playingIndex]?.pause()
      }
      videoRefs.current[index]?.play()
      setPlayingIndex(index)
    }
  }

  const handleVideoEnd = () => {
    setPlayingIndex(null)
  }

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

        {/* Video testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {videoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group/card"
            >
              {/* Video container */}
              <div
                className="relative rounded-xl overflow-hidden mb-4 aspect-[9/16] bg-black cursor-pointer"
                onClick={() => handlePlay(index)}
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el }}
                  src={card.video}
                  poster={card.poster}
                  playsInline
                  preload="none"
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover"
                />
                {/* Play/Pause overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playingIndex === index ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover/card:scale-110">
                    {playingIndex === index ? (
                      <Pause className="w-7 h-7 text-white" fill="white" />
                    ) : (
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    )}
                  </div>
                </div>
              </div>
              {/* Quote + name */}
              <p className="text-base text-black leading-relaxed mb-3 line-clamp-3">
                &ldquo;{locale === "es" ? card.quoteEs : card.quoteEn}&rdquo;
              </p>
              <p className="text-sm font-bold text-[#1F3842]">{card.name}</p>
              <p className="text-xs text-[#D86262]">{locale === "es" ? card.roleEs : card.roleEn}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
