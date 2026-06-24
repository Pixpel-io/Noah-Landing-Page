"use client"

import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const videoCards = [
  {
    video: "https://res.cloudinary.com/dcxh05s3p/video/upload/q_auto,f_auto,w_720/v1782286247/video-1038_singular_display_jrecni.mov",
    poster: "https://res.cloudinary.com/dcxh05s3p/video/upload/so_0,w_720,q_auto,f_jpg/v1782286247/video-1038_singular_display_jrecni.mov",
    name: "Roberto García",
    roleEn: "User, age 72",
    roleEs: "Usuario, 72 años",
    quoteEn: "At our age we don't realize what we need, but in a few years we will,reminders, recorded doctor visits, knowing what they really told us. A very interesting app.",
    quoteEs: "A nuestra edad no somos conscientes de lo que necesitamos, pero en unos años sí,recordatorios, visitas médicas grabadas, saber lo que realmente nos dijeron. Una aplicación muy interesante.",
  },
  {
    video: "https://res.cloudinary.com/dcxh05s3p/video/upload/q_auto,f_auto,w_720/v1782286233/video-1033_singular_display_gfhyps.mov",
    poster: "https://res.cloudinary.com/dcxh05s3p/video/upload/so_0,w_720,q_auto,f_jpg/v1782286233/video-1033_singular_display_gfhyps.mov",
    name: "María López",
    roleEn: "User, age 68",
    roleEs: "Usuaria, 68 años",
    quoteEn: "I really liked it. I never used AI before, but just as a planner it's great because I forget things and never write anything down. Very interesting.",
    quoteEs: "Me ha gustado mucho. Nunca usaba la inteligencia artificial, pero solo como agenda me parece interesante porque ya se me olvidan cosas y no apunto nunca nada.",
  },
  {
    video: "https://res.cloudinary.com/dcxh05s3p/video/upload/q_auto,f_auto,w_720/v1782286218/video-1031_singular_display_oj5q0w.mov",
    poster: "https://res.cloudinary.com/dcxh05s3p/video/upload/so_0,w_720,q_auto,f_jpg/v1782286218/video-1031_singular_display_oj5q0w.mov",
    name: "Manuel Torres",
    roleEn: "User, age 75",
    roleEs: "Usuario, 75 años",
    quoteEn: "I need it because I have problems with medication, sometimes I forget. With this I wouldn't forget. And recording medical appointments? Very good, I see it very well.",
    quoteEs: "Lo necesito porque tengo problemas con la medicación, a veces se me olvida. Con esto no se me olvidaría. ¿Y la grabación de citas médicas? Muy bien, lo veo muy bien.",
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
            <div key={index} className="group/card cursor-pointer">
              {/* Video thumbnail */}
              <div
                className="relative rounded-xl overflow-hidden mb-4 aspect-3/4 bg-black"
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
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover/card:scale-110">
                    {playingIndex === index ? (
                      <Pause className="w-6 h-6 text-white" fill="white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
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
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
