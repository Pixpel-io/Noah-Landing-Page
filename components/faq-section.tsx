"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function FAQSection() {
  const { t } = useLanguage()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <section id="faq" className="py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.faq.sectionLabel}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#1F3842]">
              {t.faq.headline}
            </h2>
            <p className="text-[#4D6E7B] max-w-2xl mx-auto leading-relaxed">
              {t.faq.description}
            </p>
          </motion.div>

          {/* Questions list */}
          <div className="space-y-3">
            {t.faq.items.map((faq, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIndex(index)}
                className="w-full text-left bg-[#FDFBF6] border border-[#D9D2BE] rounded-xl px-6 py-5 hover:border-[#7EA088]/40 hover:shadow-md transition-all duration-200 group flex items-center justify-between gap-4"
              >
                <span className="text-base font-medium text-[#1F3842] group-hover:text-[#7EA088] transition-colors">
                  {faq.question}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#7EA088]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7EA088]/20 transition-colors">
                  <span className="text-[#7EA088] text-sm font-bold">+</span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Answer Popup */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="absolute inset-0 bg-[#1F3842]/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-[#FDFBF6] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-[#1F3842]/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#1F3842] px-6 py-5 flex items-start justify-between gap-4">
                <h3 className="text-[#F5F1EA] font-semibold text-lg leading-snug pr-2">
                  {t.faq.items[selectedIndex].question}
                </h3>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="w-9 h-9 rounded-full bg-[#F5F1EA]/10 flex items-center justify-center text-[#F5F1EA] hover:bg-[#F5F1EA]/20 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Answer */}
              <div className="px-6 py-6">
                <p className="text-[#4D6E7B] leading-relaxed text-[15px]">
                  {t.faq.items[selectedIndex].answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
