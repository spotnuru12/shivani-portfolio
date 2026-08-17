'use client'

import { useRef, useState, type CSSProperties, type ReactNode } from 'react'

// Pointer-drag for polaroids. Position is mutated on the node during the
// gesture so React does not re-render on every move.
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
  const node = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const start = useRef({ x: 0, y: 0, px: 0, py: 0 })
  const dragging = useRef(false)
  const [lifted, setLifted] = useState(false)
  const [z, setZ] = useState(zInit)

  const paint = () => {
    const el = node.current
    if (!el) return
    const tilt = dragging.current ? 0 : rotate
    el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${tilt}deg)`
  }

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    start.current = { x: pos.current.x, y: pos.current.y, px: e.clientX, py: e.clientY }
    dragging.current = true
    setLifted(true)
    setZ(Date.now() % 100000)
    e.currentTarget.style.willChange = 'transform'
    paint()
  }
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    pos.current = {
      x: start.current.x + (e.clientX - start.current.px),
      y: start.current.y + (e.clientY - start.current.py),
    }
    paint()
  }
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    setLifted(false)
    e.currentTarget.style.willChange = ''
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    paint()
  }

  return (
    <div
      ref={node}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className={`absolute select-none cursor-grab touch-none ${lifted ? 'dragging' : ''} ${className}`}
      style={{
        ...style,
        transform: `translate(0px, 0px) rotate(${rotate}deg)`,
        zIndex: z,
      }}
    >
      {children}
    </div>
  )
}
