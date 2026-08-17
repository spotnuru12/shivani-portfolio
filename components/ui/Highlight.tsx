'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Highlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.9 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} className={`hl ${on ? 'on' : ''}`}>
      {children}
    </span>
  )
}
