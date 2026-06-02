"use client"

import { useState } from "react"
import { X, MessageCircle, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function FAQSection() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section id="faq" className="py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.faq.sectionLabel}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#1F3842]">
              {t.faq.headline}
            </h2>
            <p className="text-[#4D6E7B] max-w-2xl mx-auto leading-relaxed mb-10">
              {t.faq.description}
            </p>

            {/* Quick preview - show first 3 questions as clickable cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
              {t.faq.items.slice(0, 3).map((faq, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setIsOpen(true)}
                  className="text-left p-4 rounded-2xl border border-[#D9D2BE] bg-[#FDFBF6] hover:border-[#7EA088]/40 hover:shadow-md transition-all duration-300 group"
                >
                  <p className="text-sm font-medium text-[#1F3842] group-hover:text-[#7EA088] transition-colors line-clamp-2">
                    {faq.question}
                  </p>
                  <ChevronRight className="w-4 h-4 text-[#D9D2BE] group-hover:text-[#7EA088] mt-2 transition-colors" />
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-0 border border-[#1F3842] rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group overflow-hidden mx-auto"
            >
              <span className="absolute inset-0 rounded-full scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 bg-[#1F3842]" />
              <span className="text-base font-medium pr-4 relative z-10 transition-colors duration-300 text-[#1F3842] group-hover:text-[#F5F1EA]">
                {t.faq.sectionLabel}
              </span>
              <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 bg-[#1F3842]">
                <MessageCircle className="w-4 h-4 text-[#F5F1EA]" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-[#1F3842]/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-[#F5F1EA] rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl shadow-[#1F3842]/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient accent */}
              <div className="sticky top-0 z-10 bg-[#1F3842] px-6 sm:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#7EA088] font-semibold mb-1">{t.faq.sectionLabel}</p>
                    <h3 className="font-serif text-2xl font-bold text-[#F5F1EA]">{t.faq.headline}</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-[#F5F1EA]/10 flex items-center justify-center text-[#F5F1EA] hover:bg-[#F5F1EA]/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-100px)] px-5 sm:px-8 py-6">
                <Accordion type="single" collapsible className="space-y-3">
                  {t.faq.items.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-[#FDFBF6] border border-[#D9D2BE] rounded-2xl px-5 data-[state=open]:border-[#7EA088]/50 data-[state=open]:shadow-sm transition-all duration-200"
                    >
                      <AccordionTrigger className="text-left text-[15px] font-semibold text-[#1F3842] hover:no-underline py-5 hover:text-[#7EA088] transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#4D6E7B] pb-5 leading-relaxed text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
