'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Pauses CSS animations (and anything keyed off `.offscreen`) when the
// block is out of view or the tab is hidden, so idle GPU work stops.
export default function PauseOffscreen({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let inView = true
    const sync = () => {
      el.classList.toggle('offscreen', !inView || document.hidden)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { rootMargin: '80px' },
    )
    io.observe(el)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
