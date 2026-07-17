"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MobileHeroSection } from "@/components/mobile-hero-section"
import { NumbersSection } from "@/components/numbers-section"
import { StatsSection } from "@/components/stats-section"
import { WhyDifferentSection } from "@/components/why-different-section"
import { WhyExistsSection } from "@/components/why-exists-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturesSection } from "@/components/features-section"
import { VideoShowcaseSection } from "@/components/video-showcase-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { ScrollEffects } from "@/components/scroll-effects"
import { CookieConsent } from "@/components/cookie-consent"
import { LanguageProvider } from "@/lib/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="min-h-screen bg-background"
      >
        <ScrollEffects />
        <Header />
        {/* Mobile Hero for smartphones only */}
        <div className="block md:hidden">
          <MobileHeroSection />
        </div>
        {/* Desktop Hero for tablets and larger screens */}
        <div className="hidden md:block">
          <HeroSection />
        </div>
        <NumbersSection />
        <StatsSection />
        <WhyDifferentSection />
        <WhyExistsSection />
        <div className="px-4 sm:px-6 my-6"><hr className="max-w-7xl mx-auto border-t border-gray-200" /></div>
        <ServicesSection />
        <FeaturesSection />
        <div className="px-4 sm:px-6 my-6"><hr className="max-w-7xl mx-auto border-t border-gray-200" /></div>
        <VideoShowcaseSection />
        <TestimonialsSection />
        <div className="px-4 sm:px-6"><hr className="max-w-7xl mx-auto border-t border-gray-200" /></div>
        <FAQSection />
        <Footer />
        <CookieConsent />
      </motion.main>
    </LanguageProvider>
  )
}
