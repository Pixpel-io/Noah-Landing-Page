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
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.faq.sectionLabel}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F3842]">
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
              className="border border-[#E5E5E5] rounded-2xl px-6 py-4"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left flex items-center justify-between gap-4"
              >
                <span className={`text-base font-medium transition-colors ${openIndex === index ? "text-[#7EA088]" : "text-[#1F3842]"}`}>
                  {faq.question}
                </span>
                <ChevronUp
                  className={`w-5 h-5 shrink-0 text-[#4D6E7B] transition-transform duration-300 ${
                    openIndex === index ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#4D6E7B] leading-relaxed pt-3">
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
