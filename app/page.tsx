"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NumbersSection } from "@/components/numbers-section"
import { StatsSection } from "@/components/stats-section"
import { WhyDifferentSection } from "@/components/why-different-section"
import { WhyExistsSection } from "@/components/why-exists-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <NumbersSection />
        <StatsSection />
        <WhyDifferentSection />
        <WhyExistsSection />
        <ServicesSection />
        <FeaturesSection />
        <CTASection />
        <TestimonialsSection />
        <FAQSection />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
