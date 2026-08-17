'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = '$&#@*R%!?<>/\\|=+^~'

function noise(len: number) {
  let out = ''
  for (let i = 0; i < len; i++) {
    out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
  }
  return out
}

// Cycles words by scrambling through code glyphs, then locking in left to right.
// Reduced motion just swaps the word, no flicker. Pauses when off-screen.
export default function Typewriter({
  words,
  className = '',
  tickMs = 36,
  holdMs = 1700,
}: {
  words: readonly string[]
  className?: string
  tickMs?: number
  holdMs?: number
}) {
  const [text, setText] = useState(words[0] ?? '')
  const spanRef = useRef<HTMLSpanElement>(null)
  const idx = useRef(0)
  const revealed = useRef(0)
  const phase = useRef<'hold' | 'decode'>('hold')
  const holdUntil = useRef(0)
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
      const t = setInterval(() => {
        if (!visible.current || document.hidden) return
        idx.current = (idx.current + 1) % words.length
        setText(words[idx.current] ?? '')
      }, holdMs)
      return () => {
        clearInterval(t)
        io.disconnect()
        document.removeEventListener('visibilitychange', sync)
      }
    }

    holdUntil.current = Date.now() + holdMs
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return
      if (phase.current === 'hold') {
        if (Date.now() < holdUntil.current) return
        phase.current = 'decode'
        idx.current = (idx.current + 1) % words.length
        revealed.current = 0
      }

      const target = words[idx.current] ?? ''
      if (revealed.current < target.length) {
        if (Math.random() > 0.5) revealed.current += 1
        setText(
          target.slice(0, revealed.current) +
            noise(Math.max(0, target.length - revealed.current)),
        )
      } else {
        setText(target)
        phase.current = 'hold'
        holdUntil.current = Date.now() + holdMs
      }
    }, tickMs)

    return () => {
      window.clearInterval(id)
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [words, tickMs, holdMs])

  return (
    <span ref={spanRef} className={`caret ${className}`} aria-live="polite">
      {text}
    </span>
  )
}
