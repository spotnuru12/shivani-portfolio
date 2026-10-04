export function GlobeDoodle() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse className="merid" cx="12" cy="12" rx="3.75" ry="8.5" />
      <path d="M3.5 12h17M5 7.75h14M5 16.25h14" />
    </svg>
  )
}

export function PaperDoodle() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 7v12.5A1.5 1.5 0 0 0 6.5 21H15" />
      <path d="M8 3.5h7.25L19 7.25V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
      <path className="flap" d="M15 3.5v4h4" />
      <path d="M10.75 10.5h5.5M10.75 13.25h5.5M10.75 16h3" />
    </svg>
  )
}

export function HeadsetDoodle() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 9V7.5A2.5 2.5 0 0 1 9.5 5h5A2.5 2.5 0 0 1 17 7.5V9" />
      <rect x="3" y="9" width="18" height="9" rx="3" />
      <path className="scan" d="M10 18l.9-2.25h2.2L14 18" />
      <path d="M3 12.5H1.75M22.25 12.5H21" />
    </svg>
  )
}
