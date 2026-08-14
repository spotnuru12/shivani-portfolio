'use client'

import { useEffect, useRef, useState } from 'react'

// The little face at the end of "something cool". Eyes track the cursor and
// blink on a jittered timer so it never feels metronomic. Just a face, no hat.
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
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="var(--orange)" />
        <g
          style={{
            transform: `translate(${pupil.x}px, ${pupil.y}px)`,
            transition: 'transform 90ms ease-out',
          }}
        >
          <ellipse
            cx="38"
            cy="46"
            rx={blink ? 4.5 : 3.8}
            ry={blink ? 0.6 : 6.5}
            fill="var(--bg)"
            style={{ transition: 'rx 140ms ease-in-out, ry 140ms ease-in-out' }}
          />
          <ellipse
            cx="62"
            cy="46"
            rx={blink ? 4.5 : 3.8}
            ry={blink ? 0.6 : 6.5}
            fill="var(--bg)"
            style={{ transition: 'rx 140ms ease-in-out, ry 140ms ease-in-out' }}
          />
        </g>
        <path
          d="M 36 60 Q 50 74 64 60"
          fill="none"
          stroke="var(--bg)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
