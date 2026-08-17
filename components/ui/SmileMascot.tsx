'use client'

import { useEffect, useRef, useState } from 'react'

const LERP = 0.14
const REACH = 4.5

// Eyes track the cursor with lerp inside rAF so they never snap. Work
// stops when the face is off-screen or the tab is hidden.
export default function SmileMascot({ size = 64 }: { size?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const pupilsRef = useRef<SVGGElement | null>(null)
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let inView = false
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { rootMargin: '40px' },
    )
    io.observe(el)

    const onMove = (e: MouseEvent) => {
      if (!inView) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const angle = Math.atan2(dy, dx)
      const reach = Math.min(Math.hypot(dx, dy), REACH)
      target.x = reach * Math.cos(angle)
      target.y = reach * Math.sin(angle)
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (reduce || document.hidden || !inView) return
      current.x += (target.x - current.x) * LERP
      current.y += (target.y - current.y) * LERP
      const g = pupilsRef.current
      if (g) g.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let open: ReturnType<typeof setTimeout>
    let shut: ReturnType<typeof setTimeout>
    let stopped = false
    const schedule = () => {
      open = setTimeout(() => {
        if (document.hidden) {
          schedule()
          return
        }
        setBlink(true)
        shut = setTimeout(() => {
          setBlink(false)
          if (!stopped) schedule()
        }, 160)
      }, 2200 + Math.random() * 3500)
    }
    schedule()
    return () => {
      stopped = true
      clearTimeout(open)
      clearTimeout(shut)
    }
  }, [])

  return (
    <span ref={ref} className="inline-block align-middle" style={{ lineHeight: 0 }}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="var(--orange)" />
        <g ref={pupilsRef}>
          <ellipse
            cx="38"
            cy="46"
            rx={blink ? 4.5 : 3.8}
            ry={blink ? 0.6 : 6.5}
            fill="#00314f"
            style={{ transition: 'rx 140ms ease-in-out, ry 140ms ease-in-out' }}
          />
          <ellipse
            cx="62"
            cy="46"
            rx={blink ? 4.5 : 3.8}
            ry={blink ? 0.6 : 6.5}
            fill="#00314f"
            style={{ transition: 'rx 140ms ease-in-out, ry 140ms ease-in-out' }}
          />
        </g>
        <path
          d="M 36 60 Q 50 74 64 60"
          fill="none"
          stroke="#00314f"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
