'use client'

import { useEffect, useRef, useState } from 'react'

type Phase = 'type' | 'hold' | 'delete'

// Types a word, holds, deletes it, then types the next. Pauses off-screen.
export default function Typewriter({
  words,
  className = '',
  typeMs = 52,
  holdMs = 1600,
  deleteMs = 28,
}: {
  words: readonly string[]
  className?: string
  typeMs?: number
  holdMs?: number
  deleteMs?: number
}) {
  const [text, setText] = useState('')
  const spanRef = useRef<HTMLSpanElement>(null)
  const idx = useRef(0)
  const pos = useRef(0)
  const phase = useRef<Phase>('type')
  const visible = useRef(true)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return
    let inView = true
    const sync = () => {
      visible.current = inView && !document.hidden
      el.classList.toggle('offscreen', !visible.current)
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

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setText(words[0] ?? '')
      const t = setInterval(() => {
        if (!visible.current) return
        idx.current = (idx.current + 1) % words.length
        setText(words[idx.current] ?? '')
      }, holdMs)
      return () => {
        clearInterval(t)
        io.disconnect()
        document.removeEventListener('visibilitychange', sync)
      }
    }

    let timeout = 0
    const step = () => {
      if (!visible.current) {
        timeout = window.setTimeout(step, typeMs)
        return
      }
      const target = words[idx.current] ?? ''
      let wait = typeMs
      if (phase.current === 'type') {
        pos.current = Math.min(target.length, pos.current + 1)
        setText(target.slice(0, pos.current))
        if (pos.current >= target.length) {
          phase.current = 'hold'
          wait = holdMs
        }
      } else if (phase.current === 'hold') {
        phase.current = 'delete'
        wait = deleteMs
      } else {
        pos.current = Math.max(0, pos.current - 1)
        setText(target.slice(0, pos.current))
        wait = deleteMs
        if (pos.current === 0) {
          idx.current = (idx.current + 1) % words.length
          phase.current = 'type'
          wait = 240
        }
      }
      timeout = window.setTimeout(step, wait)
    }
    timeout = window.setTimeout(step, 400)

    return () => {
      window.clearTimeout(timeout)
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [words, typeMs, holdMs, deleteMs])

  return (
    <span ref={spanRef} className={`caret ${className}`} aria-live="polite">
      {text}
    </span>
  )
}
