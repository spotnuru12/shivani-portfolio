'use client'

import { useRef, useState, type ReactNode } from 'react'
import type { StickyKind } from '@/lib/data'

// A draggable sticky note. Pointer-based drag (works with mouse + touch),
// picks up a lift shadow + higher z while held, and keeps its playful tilt.
export default function StickyNote({
  kind,
  rotate,
  children,
  className = '',
  fontClass = '',
  style,
}: {
  kind: StickyKind
  rotate: number
  children: ReactNode
  className?: string
  fontClass?: string
  style?: React.CSSProperties
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [z, setZ] = useState(1)
  const start = useRef({ x: 0, y: 0, px: 0, py: 0 })

  const onDown = (e: React.PointerEvent) => {
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    start.current = { x: pos.x, y: pos.y, px: e.clientX, py: e.clientY }
    setDragging(true)
    setZ(Date.now() % 100000) // bring to front
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return
    setPos({
      x: start.current.x + (e.clientX - start.current.px),
      y: start.current.y + (e.clientY - start.current.py),
    })
  }
  const onUp = (e: React.PointerEvent) => {
    setDragging(false)
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId) } catch {}
  }

  return (
    <div
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className={`note note-${kind} ${dragging ? 'dragging' : ''} ${fontClass} absolute select-none rounded-[3px] cursor-grab ${className}`}
      style={{
        ...style,
        transform: `translate(${pos.x}px, ${pos.y}px) rotate(${dragging ? 0 : rotate}deg)`,
        zIndex: z,
      }}
    >
      {children}
    </div>
  )
}
