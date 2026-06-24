"use client"

import Link from "next/link"
import { Heart, Facebook, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LegalFooter() {
  const { locale } = useLanguage()
  const t = locale === "es" ? es : en

  return (
    <footer className="bg-white pt-8 sm:pt-12 pb-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-[#D9D2BE]/50 mb-6 sm:mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none" className="transition-transform duration-500 group-hover:rotate-[360deg]">
                  <circle cx="18" cy="18" r="17" fill="#1F3842" />
                  <path d="M12 25V12L24 25V12" stroke="#F5F1EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="25" cy="11" r="1.8" fill="#D86262" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-[#D86262]/0 group-hover:bg-[#D86262]/20 group-hover:shadow-[0_0_16px_rgba(216,98,98,0.5)] transition-all duration-300" />
              </div>
              <span className="text-lg font-bold text-[#1F3842] group-hover:text-[#D86262] transition-colors duration-300">NOAH</span>
            </Link>
            <p className="text-sm text-[#6B7280] mb-5 max-w-[260px] leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-9 h-9 rounded-full bg-[#1F3842] flex items-center justify-center text-white hover:bg-[#D86262] hover:shadow-[0_0_12px_rgba(216,98,98,0.5)] transition-all duration-300">
                <Facebook className="w-3.5 h-3.5" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-[#1F3842] flex items-center justify-center text-white hover:bg-[#D86262] hover:shadow-[0_0_12px_rgba(216,98,98,0.5)] transition-all duration-300">
                <Instagram className="w-3.5 h-3.5" />
              </Link>
              <Link href="https://www.linkedin.com/company/noahlife-io/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1F3842] flex items-center justify-center text-white hover:bg-[#D86262] hover:shadow-[0_0_12px_rgba(216,98,98,0.5)] transition-all duration-300">
                <Linkedin className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#1F3842] mb-2.5 sm:mb-4">{t.company}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-[#6B7280] hover:text-[#D86262] hover:translate-x-1 inline-block transition-all duration-200 py-0.5">{t.about}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#1F3842] mb-2.5 sm:mb-4">{t.product}</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-sm text-[#6B7280] hover:text-[#D86262] hover:translate-x-1 inline-block transition-all duration-200 py-0.5">{t.features}</Link></li>
              <li><Link href="/#how-it-works" className="text-sm text-[#6B7280] hover:text-[#D86262] hover:translate-x-1 inline-block transition-all duration-200 py-0.5">{t.howItWorks}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#1F3842] mb-2.5 sm:mb-4">{t.legal}</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-[#6B7280] hover:text-[#D86262] hover:translate-x-1 inline-block transition-all duration-200 py-0.5">{t.privacy}</Link></li>
              <li><Link href="/terms" className="text-sm text-[#6B7280] hover:text-[#D86262] hover:translate-x-1 inline-block transition-all duration-200 py-0.5">{t.terms}</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-[#6B7280] hover:text-[#D86262] hover:translate-x-1 inline-block transition-all duration-200 py-0.5">{t.cookies}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#D9D2BE]/50 pt-4 sm:pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
          <p className="text-xs text-[#6B7280]">{t.copyright}</p>
          <p className="text-xs text-[#6B7280] flex items-center gap-1.5">{t.madeWith} <Heart className="w-3 h-3 text-[#D86262] fill-[#D86262] animate-pulse" /></p>
        </div>
      </div>
    </footer>
  )
}

const en = {
  tagline: "Your caring AI health companion, designed for those who deserve a little extra support.",
  company: "Company",
  product: "Product",
  legal: "Legal",
  about: "About",
  features: "Features",
  howItWorks: "How it works",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  cookies: "Cookie Policy",
  copyright: "© Pixpel LDA. All rights reserved.",
  madeWith: "Made with love for the ones who matter",
}

const es = {
  tagline: "Tu compañero de salud con IA, diseñado para quienes merecen un poco más de apoyo.",
  company: "Empresa",
  product: "Producto",
  legal: "Legal",
  about: "Nosotros",
  features: "Funciones",
  howItWorks: "Cómo funciona",
  privacy: "Política de Privacidad",
  terms: "Condiciones de Uso",
  cookies: "Política de Cookies",
  copyright: "© Pixpel LDA. Todos los derechos reservados.",
  madeWith: "Hecho con amor para quienes importan",
}
