"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Heart } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    product: [
      { label: t.footer.links.features, href: "#features" },
      { label: t.footer.links.howItWorks, href: "#how-it-works" },
      { label: t.footer.links.download, href: "#" },
      { label: t.footer.links.accessibility, href: "#" },
    ],
    company: [
      { label: t.footer.links.about, href: "#" },
      { label: t.footer.links.careers, href: "#" },
      { label: t.footer.links.blog, href: "#" },
      { label: t.footer.links.partners, href: "#" },
    ],
    legal: [
      { label: t.footer.links.terms, href: "#" },
      { label: t.footer.links.privacy, href: "#" },
      { label: t.footer.links.dataPolicy, href: "#" },
      { label: t.footer.links.cookiePolicy, href: "#" },
    ],
    support: [
      { label: t.footer.links.helpCenter, href: "#" },
      { label: t.footer.links.contact, href: "#" },
      { label: t.footer.links.faqLink, href: "#faq" },
      { label: t.footer.links.caregiverGuide, href: "#" },
    ],
  }

  return (
    <footer id="contact" className="relative border-t border-[#D9D2BE] py-16 px-6 bg-[#FDFBF6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
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
            <p className="text-sm text-[#4D6E7B] mb-6">{t.footer.tagline}</p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-9 h-9 border border-[#D9D2BE] rounded-full flex items-center justify-center text-[#4D6E7B] hover:text-[#1F3842] hover:border-[#7EA088] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 border border-[#D9D2BE] rounded-full flex items-center justify-center text-[#4D6E7B] hover:text-[#1F3842] hover:border-[#7EA088] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 border border-[#D9D2BE] rounded-full flex items-center justify-center text-[#4D6E7B] hover:text-[#1F3842] hover:border-[#7EA088] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1F3842] mb-4 uppercase tracking-wider">{t.footer.product}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1F3842] mb-4 uppercase tracking-wider">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1F3842] mb-4 uppercase tracking-wider">{t.footer.legal}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1F3842] mb-4 uppercase tracking-wider">{t.footer.support}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-[#4D6E7B] hover:text-[#7EA088] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#D9D2BE] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#4D6E7B]">{t.footer.copyright}</p>
          <p className="text-xs text-[#4D6E7B] flex items-center gap-1">
            {t.footer.madeWith} <Heart className="w-3 h-3 text-[#A95535] fill-[#A95535]" /> {t.footer.forThoseWhoCare}
          </p>
        </div>
      </div>
    </footer>
  )
}
