"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { MessageCircle, HeartPulse, Brain, ShieldAlert, Users, Heart } from "lucide-react"

const pillarIcons = [MessageCircle, HeartPulse, Brain, ShieldAlert, Users]
const pillarColors = ["#7EA088", "#D4A24D", "#A95535", "#D4A24D", "#7EA088"]

export function WhyDifferentSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Top block - white bg with image left, text right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          <div className="relative min-h-[300px] md:min-h-[400px] border-l-4 border-[#D4A24D]">
            <Image
              src="/images/Smile.jpg"
              alt="Senior man smiling with phone"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-sm tracking-wide text-[#7EA088] font-medium mb-4">
              {t.whyDifferent.sectionLabel}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F3842] mb-6 leading-tight">
              {t.whyDifferent.headline}
            </h2>
            <p className="text-[#4D6E7B] leading-relaxed">
              {t.whyDifferent.description}
            </p>
          </div>
        </motion.div>

        {/* Bottom block - light bg with text left, image right, pillars below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-[#F5F1EA] rounded-3xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-stretch">
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F3842] mb-3 leading-tight">
                {t.whyDifferent.headline2}
              </h2>
              <p className="text-sm md:text-base text-[#4D6E7B] leading-relaxed">
                {t.whyDifferent.description2}
              </p>
            </div>
            <div className="relative w-full md:w-[300px] lg:w-[340px] min-h-[220px] md:min-h-0 rounded-2xl overflow-hidden m-4 md:m-3">
              <Image
                src="/images/Couple.png"
                alt="Elderly couple together"
                fill
                className="object-cover object-[70%_30%]"
              />
            </div>
          </div>

          {/* Pillars row */}
          <div className="border-t border-[#D9D2BE]/20 px-6 md:px-8 py-4 bg-white/30">
            <div className="flex flex-wrap justify-between items-center gap-3">
              {t.whyDifferent.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index]
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: pillarColors[index] }} />
                    <span className="text-sm font-medium text-[#1F3842]">{pillar}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#1F3842] rounded-2xl px-8 md:px-10 py-5 flex items-center gap-4"
        >
          <Heart className="w-6 h-6 shrink-0 text-[#7EA088]" />
          <p className="text-white text-sm md:text-base leading-relaxed">
            {t.whyDifferent.quote}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
