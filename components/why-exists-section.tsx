"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { CheckCircle2, Heart, ArrowRight, ArrowUpRight } from "lucide-react"

export function WhyExistsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left - text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-[#7EA088] font-medium mb-3">
              {t.whyExists.sectionLabel}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#1F3842] mb-4 leading-tight">
              {t.whyExists.headline}
            </h2>
            <p className="text-[#4D6E7B] mb-8 italic">
              {t.whyExists.subtitle}
            </p>

            <div className="flex flex-col gap-4">
              {t.whyExists.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-[#7EA088] mt-0.5" />
                  <p className="text-sm text-[#1F3842]">{bullet}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - image + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/LadyOld.jpg"
                alt="Young woman helping elderly mother with phone"
                fill
                className="object-cover"
              />
            </div>
            <a
              href="#"
              className="relative flex items-center gap-0 border border-[#D4A24D] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#D4A24D]" />
              <span className="text-sm font-semibold pr-3 relative z-10 transition-colors duration-300 text-[#1F3842] group-hover:text-white">
                {t.whyExists.cta}
              </span>
              <span className="w-8 h-8 rounded-full flex items-center justify-center relative z-10">
                <ArrowRight className="w-4 h-4 group-hover:opacity-0 absolute transition-opacity duration-300 text-[#1F3842]" />
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-white text-[#1F3842]" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Bottom quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#7EA088] rounded-2xl px-8 md:px-10 py-5 flex items-center gap-4"
        >
          <Heart className="w-6 h-6 shrink-0 text-white" />
          <p className="text-white text-sm md:text-base leading-relaxed">
            {t.whyExists.bottomQuote}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
