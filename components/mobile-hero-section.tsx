"use client"
import Image from "next/image"
import { Calendar, Phone, Pill } from "lucide-react"
import { motion } from "framer-motion"

export function MobileHeroSection() {
  return (
    <section className="bg-white pt-20 px-4 pb-8 flex flex-col items-center">
      {/* Text Content */}
      <div className="flex flex-col items-center gap-4 mb-8 max-w-[343px]">
        <h1 className="font-[family-name:var(--font-crimson)] text-[52px] leading-[95%] tracking-tight text-center text-black font-normal">
          Your friendly voice, always there for you.
        </h1>

        <p className="text-[13px] leading-[145%] text-center text-[#6F6F6F]">
          Noah helps older adults live with more independence and confidence through a simple, natural, and easy voice experience that keeps them company and is available 24 hours a day.
        </p>
      </div>

      {/* Phone mockup with cards overlay */}
      <div className="relative w-full max-w-[280px] mb-6 mx-auto">
        {/* Green background container with phone */}
        <div className="relative bg-[#7FA088] rounded-[36px] pt-4 pb-6 px-4 mt-[150px] h-[409px]">
          {/* Phone frame */}
          <div className="relative w-full aspect-[9/16] bg-black rounded-[32px] p-[8px] shadow-2xl overflow-hidden -mt-[66px]">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
              <Image
                src="/images/mobile-header/inner-screen-bg.png"
                alt="Noah App"
                fill
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>

          {/* Mic button at bottom center of phone */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-[50px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-white/30"
              />
              <div className="w-[72px] h-[72px] bg-[#1F3842] rounded-full flex items-center justify-center shadow-2xl relative z-10">
                <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none"/>
                  <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="bg-black rounded-lg px-4 py-2">
              <span className="text-white text-sm font-medium">Tap to talk</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards positioned absolutely over the phone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[190px] flex flex-col gap-2 z-30">
          {/* Dr. Martínez Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white border-[1.5px] border-black rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-md animate-float cursor-pointer hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(126,160,136,0.25)] transition-all duration-300"
          >
            <div className="w-5 h-5 shrink-0 text-[#7EA088]">
              <Calendar className="w-full h-full" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold text-black leading-tight">Dr. Martínez - Recorded</p>
              <p className="text-[10px] text-black/70 leading-tight">Visit summary ready</p>
            </div>
          </motion.div>

          {/* Emergency Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white border-[1.5px] border-black rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-md animate-float-delayed cursor-pointer hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(232,93,79,0.25)] transition-all duration-300"
          >
            <div className="w-5 h-5 shrink-0 text-[#E85D4F]">
              <Phone className="w-full h-full" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold text-black leading-tight">Emergency</p>
              <p className="text-[10px] text-black/70 leading-tight">Call with just one touch</p>
            </div>
          </motion.div>

          {/* Aspirin Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white border-[1.5px] border-black rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-md animate-float-slow cursor-pointer hover:-translate-y-2 hover:shadow-[0_14px_30px_rgba(212,162,77,0.25)] transition-all duration-300"
          >
            <div className="w-5 h-5 shrink-0 text-[#D4A24D]">
              <Pill className="w-full h-full" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold text-black leading-tight">"Add 500mg aspirin"</p>
              <p className="text-[10px] text-black/70 leading-tight">Added by voice</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="w-full max-w-[343px] flex flex-col gap-3">
        <button className="w-full bg-[#D4A24D] rounded-full py-3.5 px-6">
          <span className="text-white text-base font-bold">Talk to NOAH</span>
        </button>
        <button className="w-full bg-white border-2 border-[#D4A24D] rounded-full py-3.5 px-6">
          <span className="text-black text-base font-bold">See how it works</span>
        </button>
      </div>
    </section>
  )
}
