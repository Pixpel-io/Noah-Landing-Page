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
    <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#7EA088]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4A24D]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#8E91F6]/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {t.hero.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7EA088]/15 border border-[#7EA088]/20 rounded-full mb-8">
                <div className="w-2 h-2 bg-[#7EA088] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#1F3842]">{t.hero.badge}</span>
              </div>
            )}

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-[#1F3842]">
              {t.hero.headlinePart1}{" "}
              <span className="text-[#7EA088]">{t.hero.headlineHighlight}</span>{" "}
              {t.hero.headlinePart2}
            </h1>

            <p className="text-lg text-[#4D6E7B] leading-relaxed mb-10 max-w-lg">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="relative flex items-center gap-0 border border-[#1F3842] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden">
                <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#1F3842]" />
                <span className="text-base font-medium pr-4 relative z-10 transition-colors duration-300 text-[#1F3842] group-hover:text-[#F5F1EA]">
                  {t.hero.primaryCta}
                </span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 bg-[#1F3842] group-hover:bg-[#F5F1EA]/20">
                  <ArrowUpRight className="w-4 h-4 text-[#F5F1EA]" />
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

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-sm">
              <div className="relative bg-[#1F3842] rounded-[3rem] p-3 shadow-2xl shadow-[#1F3842]/30">
                <div className="bg-[#F5F1EA] rounded-[2.4rem] overflow-hidden">
                  <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                    <span className="text-xs text-[#4D6E7B]">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2.5 border border-[#4D6E7B] rounded-sm">
                        <div className="w-3 h-1.5 bg-[#7EA088] rounded-sm m-px" />
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="flex flex-col items-center mb-5"
                    >
                      <div className="relative mb-4">
                        <motion.div
                          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-[#7EA088]/30"
                          style={{ margin: "-8px" }}
                        />
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A24D] via-[#A95535] to-[#7EA088] p-1">
                          <div className="w-full h-full rounded-full bg-[#EBE5D5] flex items-center justify-center">
                            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                              <circle cx="16" cy="16" r="15" fill="#1F3842" />
                              <path d="M11 22V10.5L21 22V10" stroke="#F5F1EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="22" cy="9" r="1.5" fill="#D4A24D" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="font-serif text-xl font-bold text-[#1F3842]">{t.hero.speaking}</p>
                      <p className="text-xs text-[#4D6E7B] mt-1">{t.hero.voiceBy}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isVisible ? { opacity: 1 } : {}}
                      transition={{ delay: 1.0, duration: 0.5 }}
                      className="flex items-center justify-center gap-[3px] h-10 mb-5"
                    >
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[3px] rounded-full bg-[#7EA088]"
                          animate={{
                            height: ["8px", `${12 + Math.sin(i * 0.8) * 16}px`, "8px"],
                          }}
                          transition={{
                            duration: 0.8 + (i % 5) * 0.1,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#1F3842] flex items-center justify-center shadow-lg shadow-[#1F3842]/30">
                        <Mic className="w-7 h-7 text-[#F5F1EA]" />
                      </div>
                      <span className="text-xs text-[#4D6E7B]">{t.hero.tapToSpeak}</span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="px-6 py-4 border-t border-[#EBE5D5] flex justify-around items-center"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-[#1F3842]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Calendar className="w-5 h-5 text-[#86A0A9]" strokeWidth={1.75} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#D4A24D]/20 flex items-center justify-center -mt-2">
                      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="15" fill="#1F3842" />
                        <path d="M11 22V10.5L21 22V10" stroke="#F5F1EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Pill className="w-5 h-5 text-[#86A0A9]" strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-[#86A0A9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="hidden md:flex absolute -left-8 top-[15%] bg-white rounded-2xl border border-[#D9D2BE] shadow-lg shadow-[#1F3842]/8 p-3 items-center gap-3"
              >
                <div className="w-9 h-9 bg-[#D4A24D]/15 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#D4A24D]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1F3842]">{t.hero.drRecorded}</p>
                  <p className="text-xs text-[#4D6E7B]">{t.hero.aiSummary}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="hidden md:flex absolute -right-6 top-[60%] bg-white rounded-2xl border border-[#D9D2BE] shadow-lg shadow-[#1F3842]/8 p-3 items-center gap-3"
              >
                <div className="w-9 h-9 bg-[#7EA088]/15 rounded-full flex items-center justify-center">
                  <Pill className="w-4 h-4 text-[#7EA088]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1F3842]">{t.hero.addAspirin}</p>
                  <p className="text-xs text-[#7EA088]">{t.hero.doneViaVoice}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.9, duration: 0.6 }}
                className="hidden md:flex absolute -left-4 bottom-20 bg-white rounded-2xl border border-[#D9D2BE] shadow-lg shadow-[#1F3842]/8 p-3 items-center gap-3"
              >
                <div className="w-9 h-9 bg-[#A95535]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#A95535]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1F3842]">{t.hero.emergency}</p>
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
