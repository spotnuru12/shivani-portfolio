'use client'

import { useEffect, useState } from 'react'
import { PROFILE } from '@/lib/data'

const SECTIONS = ['home', 'work', 'about', 'projects', 'listening', 'contact'] as const
const LINKS: [string, string][] = [
  ['work', 'work'],
  ['about', 'about'],
  ['projects', 'projects'],
  ['listening', 'shelf'],
  ['contact', 'contact'],
]

export default function Navbar() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    // React is alive — cancel the "force-reveal" hydration watchdog set in layout.
    clearTimeout((window as unknown as { __t?: number }).__t)
    const onScroll = () => {
      const y = window.scrollY + 130
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i])
        if (el && el.offsetTop <= y) {
          setActive(SECTIONS[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="max-w-content mx-auto flex items-center justify-between px-6 md:px-10 py-3.5">
        <a href="#home" className="font-display text-[18px] tracking-tight hover:text-orange-ink transition-colors">
          {PROFILE.name}
        </a>

        <nav className="flex items-center gap-1 sm:gap-3">
          <ul className="hidden sm:flex items-center gap-1">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className="relative text-[14px] px-2.5 py-1.5 rounded-md transition-colors hover:text-orange-ink"
                  style={{ color: active === id ? 'var(--orange-ink)' : 'var(--ink-soft)' }}
                >
                  {label}
                  {active === id && (
                    <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-[2px] rounded-full bg-orange" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-ink text-bg px-4 py-1.5 text-[13px] font-medium hover:bg-orange transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  )
}
