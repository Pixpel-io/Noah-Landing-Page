"use client"

import Link from "next/link"
import { Facebook, Linkedin, Instagram, Heart, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F3842] to-[#162C34]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(126,160,136,0.1),transparent_60%)]" />

      <div className="relative z-10 py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-14">
            {/* Logo + tagline + socials */}
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-transform duration-500 group-hover:rotate-[360deg]">
                  <circle cx="16" cy="16" r="15" fill="#7EA088" />
                  <path
                    d="M11 22V10.5L21 22V10"
                    stroke="#F5F1EA"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="22" cy="9" r="1.5" fill="#D4A24D" />
                </svg>
                <span className="text-lg font-bold text-[#F5F1EA] group-hover:text-[#7EA088] transition-colors duration-300">NOAH</span>
              </Link>
              <p className="text-sm text-[#F5F1EA]/60 mb-6 max-w-[260px] leading-relaxed">{t.footer.tagline}</p>
              <div className="flex gap-3">
                <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#F5F1EA]/70 hover:bg-[#7EA088] hover:text-white hover:shadow-[0_0_12px_rgba(126,160,136,0.5)] transition-all duration-300">
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#F5F1EA]/70 hover:bg-[#7EA088] hover:text-white hover:shadow-[0_0_12px_rgba(126,160,136,0.5)] transition-all duration-300">
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#F5F1EA]/70 hover:bg-[#7EA088] hover:text-white hover:shadow-[0_0_12px_rgba(126,160,136,0.5)] transition-all duration-300">
                  <Linkedin className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-[#F5F1EA] mb-5 uppercase tracking-wider">{t.footer.product}</h4>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-sm text-[#F5F1EA]/60 hover:text-[#7EA088] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.features}</Link></li>
                <li><Link href="#how-it-works" className="text-sm text-[#F5F1EA]/60 hover:text-[#7EA088] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.howItWorks}</Link></li>
                <li><Link href="#" className="text-sm text-[#F5F1EA]/60 hover:text-[#7EA088] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.download}</Link></li>
                <li><Link href="#" className="text-sm text-[#F5F1EA]/60 hover:text-[#7EA088] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.accessibility}</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-[#F5F1EA] mb-5 uppercase tracking-wider">{t.footer.company}</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#F5F1EA]/60 hover:text-[#7EA088] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.about}</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-[#F5F1EA] mb-5 uppercase tracking-wider">{t.footer.support}</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#F5F1EA]/60 hover:text-[#7EA088] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.contact}</Link></li>
                <li><Link href="#faq" className="text-sm text-[#F5F1EA]/60 hover:text-[#7EA088] hover:translate-x-1 inline-block transition-all duration-200">{t.footer.links.faqLink}</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-[#F5F1EA]/40">{t.footer.copyright}</p>
            <p className="text-xs text-[#F5F1EA]/40 flex items-center gap-1.5">
              {t.footer.madeWith} <Heart className="w-3 h-3 text-[#D4A24D] fill-[#D4A24D] animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
