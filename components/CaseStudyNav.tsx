'use client'

import { useEffect, useState } from 'react'

// Sticky left table-of-contents for case studies. Highlights the section
// currently in view — same IntersectionObserver approach as the site navbar.
export default function CaseStudyNav({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const ratios = new Map<string, number>()
    const pick = () => {
      let best = items[0]?.id
      let bestRatio = 0
      for (const item of items) {
        const ratio = ratios.get(item.id) ?? 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = item.id
        }
      }
      if (best) setActive((prev) => (prev === best ? prev : best))
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        pick()
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [items])

  return (
    <nav className="hidden md:block">
      <ul className="sticky top-24 space-y-2.5">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="text-caption transition-colors"
              style={{ color: active === it.id ? 'var(--orange-ink)' : 'var(--muted)' }}
            >
              {active === it.id ? '→ ' : '   '}{it.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
