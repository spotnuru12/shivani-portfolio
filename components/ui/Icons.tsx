// Brand marks lucide-react doesn't ship (it dropped brand icons), kept as
// inline SVG so the shelf headers can use the real logos.

import type { SVGProps } from 'react'

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
  size?: number
}

export function SpotifyIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 1 1-.33-1.46c4.56-1.04 8.47-.6 11.65 1.34.36.22.47.69.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.99-8.16-2.57-11.99-1.4a.94.94 0 1 1-.55-1.8c4.37-1.34 9.78-.69 13.5 1.6.45.27.59.86.33 1.29zm.13-3.41C15.13 8.4 8.5 8.18 4.86 9.29a1.12 1.12 0 0 1-.65-2.15c4.18-1.27 11.5-1.02 15.81 1.54.53.32.7 1.01.39 1.55-.32.53-1.01.7-1.55.39-.05 0-.05-.04-.04-.04z" />
    </svg>
  )
}

/**
 * Live/sample indicator for the shelf card headers. The tab row leaves no room
 * for an "— sample" suffix, and a dot survives the narrow column.
 */
export function LiveDot({
  live,
  loading = false,
  label,
}: {
  live: boolean
  loading?: boolean
  label: string
}) {
  const state = live ? 'live' : loading ? 'loading' : 'sample data'
  return (
    <span
      title={`${label}: ${state}`}
      aria-label={`${label}: ${state}`}
      role="img"
      className="inline-block h-[6px] w-[6px] shrink-0 rounded-full"
      style={{
        background: live ? '#1DB954' : 'rgba(232,232,232,0.3)',
        boxShadow: live ? '0 0 0 3px rgba(29,185,84,0.18)' : 'none',
      }}
    />
  )
}

/** Letterboxd's three-dot mark, in its brand colors. */
export function LetterboxdIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 24" aria-hidden {...rest}>
      <circle cx="12" cy="12" r="11" fill="#FF8000" />
      <circle cx="36" cy="12" r="11" fill="#40BCF4" />
      <circle cx="24" cy="12" r="11" fill="#00E054" />
      <circle cx="18" cy="12" r="5.6" fill="#00E054" opacity="0.62" />
      <circle cx="30" cy="12" r="5.6" fill="#00E054" opacity="0.62" />
    </svg>
  )
}
