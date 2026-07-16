"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function VideoShowcaseSection() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !video.muted
    video.muted = next
    setIsMuted(next)
    if (!next) video.play().catch(() => {})
  }

  return (
    <section className="pt-8 md:pt-14 pb-8 md:pb-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto rounded-[2rem] bg-[#F5F1EA] px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 md:mb-12"
        >
          <p className="text-[20px] tracking-wide text-[#D86262] font-normal mb-4 font-sans">
            {t.videoShowcase.sectionLabel}
          </p>
          <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] leading-[0.9] font-normal text-[#1F3842] mb-5 heading-glow cursor-default max-w-4xl">
            {t.videoShowcase.headline}
          </h2>
          <p className="text-base text-black leading-relaxed max-w-2xl">
            {t.videoShowcase.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-3xl overflow-hidden group shadow-2xl bg-black"
        >
          <video
            ref={videoRef}
            className="w-full h-auto block aspect-video object-cover cursor-pointer"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/noah-promo-poster.jpg"
            onClick={toggleSound}
          >
            <source src="/videos/noah-promo.mp4" type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium border border-white/20 transition-all duration-300 hover:bg-black/70 hover:scale-105"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.videoShowcase.unmute}</span>
              </>
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
