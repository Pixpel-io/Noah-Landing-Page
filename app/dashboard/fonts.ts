/**
 * Poppins — loaded ONLY for the dashboard + login routes.
 *
 * Exposed as a CSS variable (`--font-poppins`) and applied to the
 * `.dash-root` wrapper, so it never affects the landing page (which
 * keeps using Inter from the root layout).
 */
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})
