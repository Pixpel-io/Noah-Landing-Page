"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { CheckCircle2, Heart } from "lucide-react"

export function WhyExistsSection() {
  const { t } = useLanguage()

  return (
    <section className="pt-6 md:pt-8 pb-2 md:pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top border line */}
        <div className="border-t border-gray-200 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left - text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <p className="text-[20px] tracking-wide text-[#D86262] font-normal mb-6 font-sans">
              {t.whyExists.sectionLabel}
            </p>
            <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] font-normal text-[#1F3842] mb-8 leading-[0.9] heading-glow cursor-default">
              {t.whyExists.headline}
            </h2>
            <p className="text-base text-black mb-8">
              {t.whyExists.subtitle}
            </p>

            <div className="flex flex-col">
              {t.whyExists.bullets.map((bullet, index) => (
                <div key={index} className="flex items-center gap-3 py-4 border-t border-gray-200">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-[#734163]" />
                  <p className="text-base text-black">{bullet}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - image + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/features-carousel.png"
                alt="Noah app features"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative mt-8 sm:mt-12 bg-[#FEA060] rounded-2xl px-5 sm:px-8 md:px-10 py-4 sm:py-5 flex items-center justify-center gap-3 sm:gap-4 overflow-hidden group cursor-default hover:shadow-lg hover:shadow-[#FEA060]/30 transition-shadow duration-300"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <Heart className="w-6 h-6 shrink-0 text-white relative z-10 group-hover:fill-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300" />
          <p className="text-white text-base md:text-[18px] leading-relaxed relative z-10 text-center">
            {t.whyExists.bottomQuote}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
