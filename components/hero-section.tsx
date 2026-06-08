"use client"
import { useEffect, useState } from "react"
import { ArrowUpRight, ArrowRight, Pill, Calendar, Phone, Mic } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-20 w-80 h-80 bg-[#7EA088]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4A24D]/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#1F3842]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left - Text content */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] mb-4 sm:mb-6 text-[#1F3842]">
              {t.hero.headlinePart1}{" "}
              <span className="text-[#7EA088]">{t.hero.headlineHighlight}</span>{" "}
              {t.hero.headlinePart2}.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#4D6E7B] leading-relaxed mb-6 sm:mb-10 max-w-md">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="relative flex items-center gap-0 border border-[#D4A24D] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden">
                <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#D4A24D]" />
                <span className="text-base font-semibold pr-4 relative z-10 transition-colors duration-300 text-[#D4A24D] group-hover:text-[#1F3842]">
                  {t.hero.primaryCta}
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 bg-[#D4A24D] group-hover:bg-[#1F3842]/10">
                  <ArrowUpRight className="w-4 h-4 text-[#1F3842]" />
                </span>
              </button>
              <button className="relative flex items-center gap-0 border border-[#D9D2BE] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden">
                <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#7EA088]" />
                <span className="text-base font-medium pr-4 relative z-10 transition-colors duration-300 text-[#1F3842] group-hover:text-[#F5F1EA]">
                  {t.hero.secondaryCta}
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10">
                  <ArrowRight className="w-4 h-4 text-[#1F3842] group-hover:opacity-0 absolute transition-opacity duration-300" />
                  <ArrowUpRight className="w-4 h-4 text-[#F5F1EA] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
              </button>
            </div>
          </div>

          {/* Right - Image with floating cards */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative mx-auto w-full max-w-lg">
              {/* Outer sage green rounded container */}
              <div className="bg-[#7EA088] rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4">
                {/* Image inside with rounded corners */}
                <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                  <img
                    src="/images/hero-image.png"
                    alt="Senior woman using phone at home"
                    className="w-full h-[280px] sm:h-[340px] md:h-[380px] object-cover object-top"
                  />
                </div>

                {/* Tap to speak - in green area below image */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="flex flex-col items-center justify-center gap-2 pt-5 pb-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-[2px]">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[3px] rounded-full bg-[#1F3842]"
                          animate={{
                            height: ["6px", `${10 + (i % 3) * 6}px`, "6px"],
                          }}
                          transition={{
                            duration: 0.7 + (i % 3) * 0.15,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-[#1F3842]/30"
                      />
                      <div className="w-12 h-12 rounded-full bg-[#1F3842] flex items-center justify-center shadow-lg relative z-10">
                        <Mic className="w-5 h-5 text-[#F5F1EA]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[3px] rounded-full bg-[#1F3842]"
                          animate={{
                            height: ["6px", `${10 + ((4 - i) % 3) * 6}px`, "6px"],
                          }}
                          transition={{
                            duration: 0.7 + ((4 - i) % 3) * 0.15,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-white/90 font-medium">{t.hero.tapToSpeak}</span>
                </motion.div>
              </div>

              {/* Floating cards - extending outside the container */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="hidden sm:flex absolute -left-6 sm:-left-12 md:-left-16 top-[25%] bg-white rounded-2xl border border-[#D9D2BE]/60 p-3 sm:p-4 items-center gap-3 z-20 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(212,162,77,0.25)] transition-all duration-300 animate-float"
              >
                <div className="w-9 h-9 bg-[#D4A24D]/15 rounded-xl flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#D4A24D]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#1F3842]">{t.hero.drRecorded}</p>
                  <p className="text-xs text-[#4D6E7B]">{t.hero.aiSummary}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="hidden sm:flex absolute -right-6 sm:-right-12 md:-right-16 top-[48%] bg-white rounded-2xl border border-[#D9D2BE]/60 p-3 sm:p-4 items-center gap-3 z-20 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(126,160,136,0.25)] transition-all duration-300 animate-float-delayed"
              >
                <div className="w-9 h-9 bg-[#7EA088]/15 rounded-xl flex items-center justify-center">
                  <Pill className="w-4 h-4 text-[#7EA088]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#1F3842]">{t.hero.addAspirin}</p>
                  <p className="text-xs text-[#7EA088]">{t.hero.doneViaVoice}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="hidden sm:flex absolute -left-4 sm:-left-10 md:-left-14 bottom-[28%] bg-white rounded-2xl border border-[#D9D2BE]/60 p-3 sm:p-4 items-center gap-3 z-20 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(169,85,53,0.25)] transition-all duration-300 animate-float-slow"
              >
                <div className="w-9 h-9 bg-[#A95535]/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#A95535]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#1F3842]">{t.hero.emergency}</p>
                  <p className="text-xs text-[#4D6E7B]">{t.hero.oneTapCall}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
