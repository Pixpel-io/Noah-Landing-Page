"use client"

import { useState, useEffect } from "react"

export function LegalLoader({ color = "#D86262" }: { color?: string }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-white transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="relative" style={{ animation: "legal-pulse 1.4s ease-in-out infinite" }}>
        <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" fill="#1F3842" />
          <path
            d="M12 25V12L24 25V12"
            stroke="#F5F1EA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="25" cy="11" r="1.8" fill={color} />
        </svg>
        <span
          className="absolute inset-[-6px] rounded-full border-3 border-transparent"
          style={{
            borderTopColor: color,
            animation: "legal-spin 1s linear infinite",
          }}
        />
      </div>
      <p className="text-sm font-medium text-[#6B7280] animate-pulse">
        Loading…
      </p>
      <style>{`
        @keyframes legal-spin { to { transform: rotate(360deg); } }
        @keyframes legal-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
      `}</style>
    </div>
  )
}
