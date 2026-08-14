'use client'

import { useEffect, useRef, useState } from 'react'

// The little face at the end of "something cool". Eyes track the cursor and
// blink on a jittered timer so it never feels metronomic.
export default function SmileMascot({ size = 64 }: { size?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const angle = Math.atan2(dy, dx)
      const reach = Math.min(Math.hypot(dx, dy), 4.5)
      setPupil({ x: reach * Math.cos(angle), y: reach * Math.sin(angle) })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    let open: ReturnType<typeof setTimeout>
    let shut: ReturnType<typeof setTimeout>
    const schedule = () => {
      open = setTimeout(() => {
        setBlink(true)
        shut = setTimeout(() => setBlink(false), 160)
        schedule()
      }, 2200 + Math.random() * 3500)
    }
    schedule()
    return () => {
      clearTimeout(open)
      clearTimeout(shut)
    }
  }, [])

  return (
    <span ref={ref} className="inline-block align-middle" style={{ lineHeight: 0 }}>
      <svg viewBox="0 0 100 110" width={size} height={size * 1.1} aria-hidden="true">
        {/* "S" curl flourish, for Shivani */}
        <path
          d="M 28 12 Q 40 -2, 52 12 Q 64 26, 48 30"
          fill="none"
          stroke="var(--orange)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="62" r="38" fill="var(--orange)" stroke="var(--orange)" strokeWidth="3.2" />
        <g
          style={{
            transform: `translate(${pupil.x}px, ${pupil.y}px)`,
            transition: 'transform 90ms ease-out',
          }}
        >
          <ellipse
            cx="38"
            cy="58"
            rx={blink ? 4.5 : 3.8}
            ry={blink ? 0.6 : 6.5}
            fill="var(--bg)"
            style={{ transition: 'rx 140ms ease-in-out, ry 140ms ease-in-out' }}
          />
          <ellipse
            cx="62"
            cy="58"
            rx={blink ? 4.5 : 3.8}
            ry={blink ? 0.6 : 6.5}
            fill="var(--bg)"
            style={{ transition: 'rx 140ms ease-in-out, ry 140ms ease-in-out' }}
          />
        </g>
        <path
          d="M 38 72 Q 50 84 62 72"
          fill="none"
          stroke="var(--bg)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
