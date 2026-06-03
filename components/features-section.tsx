"use client"

import { useState, useEffect } from "react"
import { Check, Mic, Pill, HeartPulse, Stethoscope } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const steps = [
    { icon: Mic, step: "01", title: t.features.step1Title, description: t.features.step1Desc, color: "#C67C4E" },
    { icon: Pill, step: "02", title: t.features.step2Title, description: t.features.step2Desc, color: "#7EA088" },
    { icon: Stethoscope, step: "03", title: t.features.step3Title, description: t.features.step3Desc, color: "#D4A24D" },
    { icon: HeartPulse, step: "04", title: t.features.step4Title, description: t.features.step4Desc, color: "#A95535" },
  ]

  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-32">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.features.sectionLabel}</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#1F3842]">
                {t.features.headline}
              </h2>
              <p className="text-[#4D6E7B] leading-relaxed text-lg">
                {t.features.description}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3">
              {t.features.checklist.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#7EA088]/5 transition-colors duration-300"
                >
                  <div className="w-6 h-6 bg-[#7EA088] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-[#1F3842] font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <FeatureSlider t={t} />
          </div>
        </div>

        {/* How it works steps */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#1F3842]">
              {t.features.howItWorks}
            </h2>
            <p className="text-[#4D6E7B] max-w-2xl mx-auto leading-relaxed text-lg">
              {t.features.howItWorksDesc}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="relative text-center p-8"
            >
              <div className="text-6xl font-bold mb-4" style={{ color: `${step.color}90` }}>{step.step}</div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: `${step.color}15` }}
              >
                <step.icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-[#1F3842]">{step.title}</h3>
              <p className="text-[#4D6E7B] leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureSlider({ t }: { t: any }) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7EA088]/10 to-[#D4A24D]/10 rounded-3xl blur-2xl" />
      <div className="relative rounded-3xl border border-[#D9D2BE] shadow-xl shadow-[#1F3842]/5 overflow-hidden h-[500px] sm:h-[550px] md:h-[600px]">
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            <motion.div
              key="mockup"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 h-[500px] sm:h-[550px] md:h-[600px] overflow-y-auto"
            >
              <div className="space-y-5">
                <div className="bg-[#F5F1EA] rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="15" fill="#1F3842" />
                      <path d="M11 22V10.5L21 22V10" stroke="#F5F1EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs font-semibold text-[#1F3842]">{t.features.chatNoah}</span>
                    <span className="text-[10px] bg-[#7EA088]/15 text-[#7EA088] px-2 py-0.5 rounded-full font-medium ml-auto">Claude Sonnet</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 w-fit">
                      <p className="text-sm text-[#1F3842]">{t.features.chatMsg1}</p>
                    </div>
                    <div className="bg-[#1F3842] rounded-2xl rounded-tr-sm px-4 py-2.5 w-fit ml-auto flex items-center gap-2">
                      <Mic className="w-3 h-3 text-[#D4A24D]" />
                      <p className="text-sm text-[#F5F1EA]">{t.features.chatMsg2}</p>
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 w-fit">
                      <p className="text-sm text-[#1F3842]">{t.features.chatMsg3}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2D4A53]/5 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-[#2D4A53]" strokeWidth={1.75} />
                      <span className="text-xs font-semibold text-[#1F3842]">{t.features.consultationRecording}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-[#A95535] rounded-full animate-pulse" />
                      <span className="text-[10px] text-[#A95535] font-medium">{t.features.recording}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-[#4D6E7B] italic">{t.features.consultationQuote}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-1.5 bg-[#D9D2BE] rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-[#2D4A53] rounded-full" />
                    </div>
                    <span className="text-[10px] text-[#4D6E7B]">12:34</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#7EA088]/8 rounded-2xl p-5">
                  <div>
                    <p className="text-sm font-semibold text-[#1F3842]">{t.features.todaysProgress}</p>
                    <p className="text-xs text-[#4D6E7B]">{t.features.medsProgress}</p>
                  </div>
                  <div className="relative w-14 h-14">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                      <path className="text-[#EBE5D5]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className="text-[#7EA088]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="75, 100" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#7EA088]">75%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="lady"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/LadyOld.jpg"
                alt="Senior woman using Noah AI"
                className="w-full h-[500px] sm:h-[550px] md:h-[600px] object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button
            onClick={() => setActiveSlide(0)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === 0 ? "bg-[#1F3842] w-6" : "bg-[#1F3842]/30"}`}
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === 1 ? "bg-[#1F3842] w-6" : "bg-[#1F3842]/30"}`}
          />
        </div>
      </div>
    </div>
  )
}
