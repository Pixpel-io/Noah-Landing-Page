"use client"
import { useEffect, useState } from "react"
import { ArrowUpRight, Calendar, Phone, Mic, Pill } from "lucide-react"
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
    <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-0 items-start">
          {/* Left - Text content */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-[family-name:var(--font-crimson)] text-4xl sm:text-5xl md:text-7xl lg:text-[85px] font-normal leading-[0.8] mb-5 text-black">
              Your friendly voice, always<br />
              there for you.
            </h1>

            <p className="text-base text-black leading-relaxed mb-8 max-w-md">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="relative flex items-center gap-0 border border-[#D4A24D] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden">
                <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#D4A24D]" />
                <span className="text-base font-semibold pr-4 relative z-10 transition-colors duration-300 text-[#D4A24D] group-hover:text-[#1F3842]">
                  {t.hero.primaryCta}
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 bg-[#D4A24D] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#1F3842] transition-colors duration-300" />
                </span>
              </button>
              <button className="relative flex items-center gap-0 border border-[#D9D2BE] rounded-full px-6 py-2.5 transition-all duration-300 group overflow-hidden">
                <span className="absolute inset-0 rounded-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 bg-[#7EA088]" />
                <span className="text-base font-medium relative z-10 transition-colors duration-300 text-[#1F3842] group-hover:text-[#F5F1EA]">
                  {t.hero.secondaryCta}
                </span>
              </button>
            </div>

            {/* Trusted by */}
            <div className="mt-10 pt-6 border-t border-gray-200 max-w-lg">
              <p className="text-xs text-[#6B7280] mb-3">Trusted by:</p>
              <div className="flex items-center gap-4">
                <img
                  src="/images/svg14.png"
                  alt="Ajuntament de Sant Feliu de Llobregat"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right - Hero image composition matching Figma */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative w-full min-h-[360px] sm:min-h-[480px] md:min-h-[540px]">
              {/* Green background - left strip */}
              <div className="absolute top-[30%] left-0 bottom-[8%] w-[25%] bg-[#7FA088] rounded-[20px]" />
              <div className="absolute top-[30%] right-0 bottom-[8%] w-[25%] bg-[#7FA088]" />
              {/* Green background - bottom area */}
              <div className="absolute top-[65%] left-0 right-0 h-[29%] bg-[#7FA088] rounded-s-[20px]" />

              {/* iPad/Tablet frame - large, centered-right */}
              <div className="absolute top-[2%] left-[12%] right-[12%] z-10">
                <div className="bg-black rounded-[16px] sm:rounded-[20px] p-[6px] sm:p-2 shadow-2xl">
                  <div className="rounded-[12px] sm:rounded-[14px] overflow-hidden">
                    <img
                      src="/images/hero-image.png"
                      alt="Senior woman using device"
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>

              {/* Mic button + Tap to talk - centered in bottom green area */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute bottom-[10%] left-[35%] sm:left-[40%] flex flex-col items-center gap-2 z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] rounded-full bg-white"
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
                      className="absolute inset-0 rounded-full bg-white/30"
                    />
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1F3842] flex items-center justify-center shadow-lg relative z-10">
                      <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] rounded-full bg-white"
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
                <span className="text-sm text-white font-medium whitespace-nowrap">{t.hero.tapToSpeak}</span>
              </motion.div>

              {/* Dr. Martinez card - bottom-left, overlapping green */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-[45%] sm:bottom-[40%] left-0 sm:-left-20 bg-white rounded-xl border border-black px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 z-30 shadow-lg cursor-pointer hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(126,160,136,0.25)] transition-all duration-300 animate-float"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#7FA088]/15 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#7FA088]" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#1F3842] font-[family-name:var(--font-crimson)]">{t.hero.drRecorded}</p>
                  <p className="text-xs sm:text-sm text-black font-sans font-light">{t.hero.aiSummary}</p>
                </div>
              </motion.div>

              {/* Add aspirin card - right side, middle area */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute top-[52%] sm:top-[55%] right-0 sm:right-[20px] bg-white rounded-xl border border-black px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 z-30 shadow-lg cursor-pointer hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(212,162,77,0.25)] transition-all duration-300 animate-float-delayed"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#D4A24D]/15 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A24D]" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#1F3842] font-[family-name:var(--font-crimson)]">{t.hero.addAspirin}</p>
                  <p className="text-xs sm:text-sm text-black font-sans font-light">{t.hero.doneViaVoice}</p>
                </div>
              </motion.div>

              {/* Emergency card - bottom-left, below Dr. card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute bottom-[14%] sm:bottom-[12%] left-0 sm:-left-10 bg-white rounded-xl border border-black px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 z-30 shadow-lg cursor-pointer hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(169,85,53,0.25)] transition-all duration-300 animate-float-slow"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#A95535]/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#A95535]" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#1F3842] font-[family-name:var(--font-crimson)]">{t.hero.emergency}</p>
                  <p className="text-xs sm:text-sm text-black font-sans font-light">{t.hero.oneTapCall}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
