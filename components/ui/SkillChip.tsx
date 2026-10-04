'use client'

import { useId, useState } from 'react'
import { SKILL_DEFINITIONS } from '@/lib/data'

export default function SkillChip({ name }: { name: string }) {
  const def = SKILL_DEFINITIONS[name]
  const uid = useId()
  const tipId = def ? `skill-tip-${uid}` : undefined
  const [open, setOpen] = useState(false)

  if (!def) {
    return (
      <span className="hit inline-flex min-h-9 items-center rounded-full border border-line-strong px-3.5 py-1.5 text-caption text-ink-soft md:text-small">
        {name}
      </span>
    )
  }

  return (
    <span className={`relative inline-flex ${open ? 'z-20' : ''}`}>
      <button
        type="button"
        aria-describedby={tipId}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="skill-chip hit inline-flex min-h-9 cursor-help items-center rounded-full border border-line-strong px-3.5 py-1.5 text-caption text-ink-soft transition-colors md:text-small"
      >
        {name}
      </button>
      <span
        id={tipId}
        role="tooltip"
        className={`skill-tip pointer-events-none absolute left-1/2 top-0 z-30 w-[min(250px,calc(100vw-3rem))] -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-xl bg-note p-3 text-left text-caption text-note-ink shadow-lift transition-opacity duration-150 ${
          open ? 'is-open' : ''
        }`}
      >
        <span className="block">{def}</span>
        <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-note" />
      </span>
    </span>
  )
}
