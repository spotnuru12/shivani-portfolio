'use client'

import { useId } from 'react'

// Portrait masked by a hand-drawn-ish blob path, with an optional stroke that
// traces the same path so the outline never drifts from the mask edge.
export default function BlobPortrait({
  size = 300,
  src = '/headshot.jpeg',
  strokeWidth = 4,
  label,
}: {
  size?: number
  src?: string
  strokeWidth?: number
  label: string
}) {
  const id = useId().replace(/:/g, '')
  const path =
    'M100,8 C140,2 178,28 188,68 C198,108 178,148 150,172 C122,196 78,200 50,176 C22,152 4,116 6,80 C8,44 36,18 64,12 C72,10 84,10 100,8 Z'

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={label}>
      <defs>
        <clipPath id={`blob-${id}`}>
          <path d={path} />
        </clipPath>
      </defs>
      <image
        href={src}
        x="0"
        y="0"
        width="200"
        height="200"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#blob-${id})`}
      />
      <path
        d={path}
        fill="none"
        stroke="var(--portrait-outline)"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}
