'use client'

import { useEffect, useState } from 'react'

// Cycling typewriter: types a word, holds, deletes, moves to the next.
// The blinking caret is a CSS pseudo-element (.caret) so it never desyncs.
export default function Typewriter({
  words,
  className = '',
  typeMs = 90,
  deleteMs = 45,
  holdMs = 1400,
}: {
  words: string[]
  className?: string
  typeMs?: number
  deleteMs?: number
  holdMs?: number
}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing')

  useEffect(() => {
    const word = words[index % words.length]
    let t: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs)
      } else {
        t = setTimeout(() => setPhase('holding'), holdMs)
      }
    } else if (phase === 'holding') {
      t = setTimeout(() => setPhase('deleting'), 200)
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), deleteMs)
      } else {
        setIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, index, words, typeMs, deleteMs, holdMs])

  return (
    <span className={`caret ${className}`} aria-live="polite">
      {text}
    </span>
  )
}
