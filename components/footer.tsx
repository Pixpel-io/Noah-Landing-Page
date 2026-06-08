"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contact" className="border-t border-[#E5E5E5] py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 mb-12">
          {/* Logo + tagline + socials */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="#1F3842" />
                <path
                  d="M11 22V10.5L21 22V10"
                  stroke="#F5F1EA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="22" cy="9" r="1.5" fill="#D4A24D" />
              </svg>
              <span className="text-base font-semibold text-[#1F3842]">Noah</span>
            </Link>
            <p className="text-sm text-[#4D6E7B] mb-5 max-w-[240px]">{t.footer.tagline}</p>
            <div className="flex gap-3">
              <Link href="#" className="text-[#4D6E7B] hover:text-[#1F3842] transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-[#4D6E7B] hover:text-[#1F3842] transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-[#4D6E7B] hover:text-[#1F3842] transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F3842] mb-4">{t.footer.product}</h4>
            <ul className="space-y-1.5">
              <li><Link href="#features" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.features}</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.howItWorks}</Link></li>
              <li><Link href="#" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.download}</Link></li>
              <li><Link href="#" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.accessibility}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F3842] mb-4">{t.footer.company}</h4>
            <ul className="space-y-1.5">
              <li><Link href="#" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.about}</Link></li>
              <li><Link href="#" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.blog}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F3842] mb-4">{t.footer.support}</h4>
            <ul className="space-y-1.5">
              <li><Link href="#" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.contact}</Link></li>
              <li><Link href="#faq" className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">{t.footer.links.faqLink}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#4D6E7B]">{t.footer.copyright}</p>
          <p className="text-xs text-[#4D6E7B]">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
