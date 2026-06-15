import { cn } from '@/lib/utils'

/**
 * Noah brand mark — the EXACT logo from the landing page nav: a navy
 * circle, the "N" monogram stroke, and a gold accent dot. Kept 1:1 with
 * components/header.tsx so the dashboard and the marketing site share
 * one identity.
 */
export function NoahMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-full', className)}
      aria-hidden
    >
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
  )
}

/**
 * Full lockup: the landing logo mark + "NOAH" wordmark + sub-label.
 * The `logo-lockup` class drives the creative hover effects (spin + glow
 * ring + wordmark colour shift) defined in dashboard.css.
 */
export function NoahLogo({
  subLabel = 'Metrics console',
  size = 'md',
  className,
}: {
  subLabel?: string
  size?: 'md' | 'lg'
  className?: string
}) {
  const mark = size === 'lg' ? 'size-12' : 'size-9'
  const title = size === 'lg' ? 'text-2xl' : 'text-lg'

  return (
    <div className={cn('logo-lockup flex items-center gap-2.5', className)}>
      <span className="logo-orb relative inline-flex shrink-0">
        <NoahMark className={mark} />
      </span>
      <div className="leading-tight">
        <p
          className={cn(
            'logo-word font-serif font-bold tracking-tight',
            title,
          )}
        >
          NOAH
        </p>
        {subLabel ? (
          <p className="text-muted-foreground text-xs">{subLabel}</p>
        ) : null}
      </div>
    </div>
  )
}
