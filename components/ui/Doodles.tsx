const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
}

export function GlobeDoodle() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="16.5" {...S} />
      <path d="M24 7.5c-6 5-6 28 0 33" {...S} />
      <path className="merid" d="M24 7.5c6 5 6 28 0 33" {...S} />
      <path d="M8.5 18h31M8.5 30h31" {...S} />
    </svg>
  )
}

export function PaperDoodle() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden>
      <rect x="14" y="8" width="21" height="31" rx="2" {...S} />
      <path d="M18.5 16.5h12M18.5 22.5h12M18.5 28.5h8" {...S} />
      <rect
        className="flap"
        x="14"
        y="8"
        width="21"
        height="31"
        rx="2"
        fill="var(--bg)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function HeadsetDoodle() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden>
      <path d="M9 21a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6l-3 3h-4l-3-3h-6a4 4 0 0 1-4-4z" {...S} />
      <path d="M9 23c-2.2 0-3.5 1-3.5 3M39 23c2.2 0 3.5 1 3.5 3" {...S} />
      <g className="scan">
        <path d="M15.5 24h4M28.5 24h4" {...S} />
      </g>
    </svg>
  )
}
