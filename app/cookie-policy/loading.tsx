export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-white">
      <div className="noah-loader relative">
        <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" fill="#1F3842" />
          <path
            d="M12 25V12L24 25V12"
            stroke="#F5F1EA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="25" cy="11" r="1.8" fill="#FEA060" />
        </svg>
      </div>
      <p className="text-sm font-medium text-[#6B7280] animate-pulse">
        Loading…
      </p>
      <style>{`
        .noah-loader { animation: noah-loader-pulse 1.4s ease-in-out infinite; }
        .noah-loader::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #FEA060;
          animation: noah-loader-spin 1s linear infinite;
        }
        @keyframes noah-loader-spin { to { transform: rotate(360deg); } }
        @keyframes noah-loader-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
      `}</style>
    </div>
  )
}
