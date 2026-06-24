"use client"

import { useState } from "react"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="pt-6 md:pt-8 pb-2 md:pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[20px] tracking-wide text-[#D86262] font-normal mb-4 font-sans">{t.faq.sectionLabel}</p>
          <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] leading-[0.9] font-normal text-[#1F3842] heading-glow cursor-default">
            {t.faq.headline}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {t.faq.items.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              viewport={{ once: true }}
              onClick={() => toggleIndex(index)}
              className={`rounded-2xl px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 cursor-pointer bg-white ${
                openIndex === index
                  ? "border border-[#D86262]/40 shadow-md shadow-[#D86262]/10"
                  : "border border-[#E5E5E5] hover:border-[#D9D2BE] hover:shadow-sm"
              }`}
            >
              <div
                className="w-full text-left flex items-center justify-between gap-4"
              >
                <span className={`text-sm sm:text-base font-medium transition-colors duration-300 ${openIndex === index ? "text-[#D86262]" : "text-[#1F3842]"}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  openIndex === index ? "bg-[#D86262]/10 rotate-0" : "bg-transparent rotate-180"
                }`}>
                  <ChevronUp className={`w-4 h-4 transition-colors duration-300 ${
                    openIndex === index ? "text-[#D86262]" : "text-[#4D6E7B]"
                  }`} />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-base text-black leading-relaxed pt-3 border-t border-[#E5E5E5]/50 mt-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
