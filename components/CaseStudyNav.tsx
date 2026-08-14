'use client'

import { useEffect, useState } from 'react'

// Sticky left table-of-contents for case studies (Emmi Wu style). Highlights
// the section currently in view and smooth-scrolls on click.
export default function CaseStudyNav({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id)
        if (el && el.offsetTop <= y) {
          setActive(items[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  return (
    <nav className="hidden md:block">
      <ul className="sticky top-24 space-y-2.5">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="font-sans text-[12.5px] transition-colors"
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
