"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Linkedin, Instagram, Heart } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { DownloadModal } from "./download-modal"

export function Footer() {
  const { t } = useLanguage()
  const [showDownload, setShowDownload] = useState(false)

  return (
    <footer id="contact" className="bg-white pt-12 pb-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top divider */}
        <div className="border-t border-[#D9D2BE]/50 mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-12">
          {/* Logo + tagline + socials */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none" className="transition-transform duration-500 group-hover:rotate-360">
                  <circle cx="18" cy="18" r="17" fill="#1F3842" />
                  <path
                    d="M12 25V12L24 25V12"
                    stroke="#F5F1EA"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="25" cy="11" r="1.8" fill="#D4A24D" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-[#7EA088]/0 group-hover:bg-[#7EA088]/20 group-hover:shadow-[0_0_16px_rgba(126,160,136,0.5)] transition-all duration-300" />
              </div>
              <span className="text-lg font-bold text-[#1F3842] group-hover:text-[#7EA088] transition-colors duration-300">NOAH</span>
            </Link>
            <p className="text-sm text-[#6B7280] mb-5 max-w-[260px] leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-8 h-8 rounded-full bg-[#1F3842] flex items-center justify-center text-white hover:bg-[#7EA088] hover:shadow-[0_0_12px_rgba(126,160,136,0.5)] transition-all duration-300">
                <Facebook className="w-3.5 h-3.5" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#1F3842] flex items-center justify-center text-white hover:bg-[#7EA088] hover:shadow-[0_0_12px_rgba(126,160,136,0.5)] transition-all duration-300">
                <Instagram className="w-3.5 h-3.5" />
              </Link>
              <Link href="https://www.linkedin.com/company/noahlife-io/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1F3842] flex items-center justify-center text-white hover:bg-[#7EA088] hover:shadow-[0_0_12px_rgba(126,160,136,0.5)] transition-all duration-300">
                <Linkedin className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[18px] font-bold text-[#1F3842] mb-4 font-[family-name:var(--font-dm-sans)]">{t.footer.company}</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.about}</Link></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[18px] font-bold text-[#1F3842] mb-4 font-[family-name:var(--font-dm-sans)]">{t.footer.product}</h4>
            <ul className="space-y-2.5">
              <li><Link href="#features" className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.features}</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.howItWorks}</Link></li>
              <li><button onClick={() => setShowDownload(true)} className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.download}</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[18px] font-bold text-[#1F3842] mb-4 font-[family-name:var(--font-dm-sans)]">{t.footer.support}</h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.contact}</Link></li>
              <li><Link href="#faq" className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.faqLink}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[18px] font-bold text-[#1F3842] mb-4 font-[family-name:var(--font-dm-sans)]">{t.footer.legal}</h4>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.privacy}</Link></li>
              <li><Link href="/terms" className="text-sm text-[#6B7280] hover:text-[#1F3842] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.terms}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#D9D2BE]/50 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#6B7280]">{t.footer.copyright}</p>
          <p className="text-xs text-[#6B7280] flex items-center gap-1.5">{t.footer.madeWith} <Heart className="w-3 h-3 text-[#D4A24D] fill-[#D4A24D] animate-pulse" /></p>
        </div>
      </div>
      <DownloadModal isOpen={showDownload} onClose={() => setShowDownload(false)} />
    </footer>
  )
}
