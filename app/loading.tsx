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
          <circle cx="25" cy="11" r="1.8" fill="#D4A24D" />
        </svg>
      </div>
      <p className="text-sm font-medium text-[#6B7280] animate-pulse">
        Loading…
      </p>
    </div>
  )
}
