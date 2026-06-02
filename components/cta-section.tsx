"use client"

import { ArrowUpRight, Heart, Mic, Brain, Stethoscope } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F3842] via-[#2B505C] to-[#1F3842]" />
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border border-[#7EA088] rounded-full" />
            <div className="absolute bottom-10 right-20 w-60 h-60 border border-[#D4A24D] rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-[#F5F1EA] rounded-full" />
          </div>

          <div className="relative px-5 py-14 sm:px-8 sm:py-20 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7EA088]/20 border border-[#7EA088]/30 rounded-full mb-8">
                <Heart className="w-4 h-4 text-[#7EA088]" />
                <span className="text-sm font-medium text-[#F5F1EA]">{t.cta.badge}</span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#F5F1EA] mb-6 max-w-3xl mx-auto leading-tight">
                {t.cta.headline}
              </h2>
              <p className="text-[#86A0A9] max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                {t.cta.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button className="flex items-center justify-center gap-2 bg-[#D4A24D] text-[#1F3842] rounded-full px-8 py-4 font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24D]/30 hover:scale-[1.02]">
                  {t.cta.primaryCta}
                  <ArrowUpRight className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center gap-2 border-2 border-[#F5F1EA]/20 text-[#F5F1EA] rounded-full px-8 py-4 font-medium transition-all duration-300 hover:bg-[#F5F1EA]/5 hover:border-[#F5F1EA]/40">
                  {t.cta.secondaryCta}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#C67C4E]/20 rounded-full flex items-center justify-center">
                    <Mic className="w-5 h-5 text-[#C67C4E]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F5F1EA]">{t.cta.premiumVoice}</p>
                    <p className="text-xs text-[#86A0A9]">{t.cta.premiumVoiceDesc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#8E91F6]/20 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#8E91F6]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F5F1EA]">{t.cta.claudeAi}</p>
                    <p className="text-xs text-[#86A0A9]">{t.cta.claudeAiDesc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-[#2D4A53]/40 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-[#86A0A9]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F5F1EA]">{t.cta.doctorRecording}</p>
                    <p className="text-xs text-[#86A0A9]">{t.cta.doctorRecordingDesc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
