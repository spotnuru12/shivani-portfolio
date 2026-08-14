'use client'

import { useEffect, useRef, useState } from 'react'

// A single big-number stat. Static numbers count up once on view; the `live`
// variant is a running "seconds you've spent here" counter (Peter-style).
export default function StatCounter({
  value,
  label,
  live,
}: {
  value: string
  label: string
  live?: 'seconds'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(live ? '0' : '0')

  // Live seconds-on-page counter.
  useEffect(() => {
    if (live !== 'seconds') return
    const id = setInterval(() => {
      setDisplay(String(Math.floor(performance.now() / 1000)))
    }, 1000)
    return () => clearInterval(id)
  }, [live])

  // Count-up animation for static numeric values.
  useEffect(() => {
    if (live) return
    const target = parseInt(value.replace(/[^0-9]/g, ''), 10)
    if (Number.isNaN(target)) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 900
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay(String(Math.round(target * eased)) + value.replace(/[0-9]/g, ''))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, live])

  return (
    <div ref={ref}>
      <div className="font-sans text-3xl md:text-4xl font-bold tabular-nums text-orange-ink leading-none">
        {display}
      </div>
      <div className="mt-2 text-[13px] text-muted leading-snug max-w-[15ch]">{label}</div>
    </div>
  )
}
