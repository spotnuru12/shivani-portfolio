'use client'

import type { CSSProperties, ReactNode } from 'react'
import type { StickyKind } from '@/lib/data'
import Draggable from '@/components/ui/Draggable'

export default function StickyNote({
  kind,
  rotate,
  children,
  className = '',
  fontClass = '',
  style,
  z,
}: {
  kind: StickyKind
  rotate: number
  children: ReactNode
  className?: string
  fontClass?: string
  style?: CSSProperties
  z?: number
}) {
  return (
    <Draggable
      rotate={rotate}
      z={z}
      className={`note note-${kind} ${fontClass} rounded-[3px] ${className}`}
      style={style}
    >
      {children}
    </Draggable>
  )
}
