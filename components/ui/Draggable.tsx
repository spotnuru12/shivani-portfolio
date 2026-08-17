'use client'

import { useRef, useState, type CSSProperties, type ReactNode } from 'react'

// Shared pointer-drag for bulletin-board pins (sticky notes + polaroids).
// Keeps the tilt until pickup, then lifts the piece to the front.
export default function Draggable({
  rotate,
  children,
  className = '',
  style,
  z: zInit = 1,
}: {
  rotate: number
  children: ReactNode
  className?: string
  style?: CSSProperties
  z?: number
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [z, setZ] = useState(zInit)
  const start = useRef({ x: 0, y: 0, px: 0, py: 0 })

  const onDown = (e: React.PointerEvent) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    start.current = { x: pos.x, y: pos.y, px: e.clientX, py: e.clientY }
    setDragging(true)
    setZ(Date.now() % 100000)
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
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }

  return (
    <div
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className={`absolute select-none cursor-grab touch-none ${dragging ? 'dragging' : ''} ${className}`}
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
