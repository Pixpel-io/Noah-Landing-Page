import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Noah AI - Your Caring Health Companion",
  description: "Noah AI is an intelligent health companion for older adults — offering 24/7 voice support, medication management, doctor visit recording, emergency contacts, and family check-ins. Designed with warmth, built for ease.",
  keywords: ["Noah AI", "health companion", "elderly care", "medication management", "AI assistant", "voice assistant", "doctor recording", "senior health app", "caregiver app", "family health"],
  authors: [{ name: "Noah AI" }],
  creator: "Noah AI",
  publisher: "Noah AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "https://noah-ai.com",
    siteName: "Noah AI",
    title: "Noah AI - Your Caring Health Companion",
    description: "An intelligent health companion for older adults — voice support, medication reminders, doctor visit recording, and family connection. Always available, always caring.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noah AI - Your Caring Health Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noah AI - Your Caring Health Companion",
    description: "An intelligent health companion for older adults — voice support, medication reminders, doctor visit recording, and family connection.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  metadataBase: new URL("https://noah-ai.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
