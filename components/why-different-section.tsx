"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function WhyDifferentSection() {
  const { t, locale } = useLanguage()

  return (
    <section className="pt-6 md:pt-8 pb-2 md:pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Top block - image left, text right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"
        >
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[480px] rounded-2xl overflow-hidden group">
            <Image
              src="/images/why-different-image.png"
              alt="Senior man using phone"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-start self-start pt-0">
            <p className="text-[20px] tracking-wide text-[#D86262] font-normal mb-6 font-sans">
              {t.whyDifferent.sectionLabel}
            </p>
            <h2 className="font-[family-name:var(--font-crimson)] text-3xl sm:text-4xl md:text-[60px] font-normal text-[#1F3842] mb-6 leading-[0.9] heading-glow cursor-default">
              {t.whyDifferent.headline}
            </h2>
            <p className="text-base text-black leading-relaxed max-w-sm">
              {t.whyDifferent.description}
            </p>
          </div>
        </motion.div>

        {/* Bottom block - Figma style: rounded card with border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-t-none rounded-b-xl border-t border-gray-200 overflow-hidden"
        >
          {/* Top section - full width image */}
          <div className="relative w-full overflow-hidden rounded-t-xl bg-[#F5F1EA]">
            <Image
              src={locale === "es" ? "/images/Headline and icons(2).png" : "/images/Headline and icons.png"}
              alt="Noah pillars overview"
              width={1200}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>

        </motion.div>


      </div>
    </section>
  )
}
