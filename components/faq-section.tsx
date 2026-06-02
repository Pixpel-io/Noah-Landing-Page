"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export function FAQSection() {
  const { t } = useLanguage()

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#7EA088] font-semibold mb-4">{t.faq.sectionLabel}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#1F3842]">
            {t.faq.headline}
          </h2>
          <p className="text-[#4D6E7B] max-w-2xl mx-auto leading-relaxed">
            {t.faq.description}
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {t.faq.items.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-[#FDFBF6] border border-[#D9D2BE] rounded-xl px-6 data-[state=open]:border-[#7EA088]/40 transition-colors duration-200"
            >
              <AccordionTrigger className="text-left text-base font-medium text-[#1F3842] hover:no-underline py-5 hover:text-[#7EA088] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#4D6E7B] pb-5 leading-relaxed text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
