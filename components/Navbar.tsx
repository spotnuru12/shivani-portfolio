'use client'

import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { PROFILE } from '@/lib/data'
import { useTheme } from '@/components/ui/ThemeProvider'

const SECTIONS = ['home', 'work', 'about', 'listening', 'projects', 'toolkit', 'contact'] as const
const LINKS: [string, string][] = [
  ['work', 'work'],
  ['about', 'about'],
  ['listening', 'shelf'],
  ['projects', 'projects'],
  ['toolkit', 'stack'],
  ['contact', 'contact'],
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // React is alive — cancel the "force-reveal" hydration watchdog set in layout.
    clearTimeout((window as unknown as { __t?: number }).__t)

    const ratios = new Map<string, number>()
    const pick = () => {
      let best: string = 'home'
      let bestRatio = 0
      for (const id of SECTIONS) {
        const ratio = ratios.get(id) ?? 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      }
      setActive((prev) => (prev === best ? prev : best))
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

    for (const id of SECTIONS) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="max-w-content mx-auto flex items-center justify-between px-6 md:px-10 py-3.5">
        <a
          href="#home"
          className="font-display text-[19px] tracking-tight hover:text-orange-ink transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          {PROFILE.name}
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden sm:flex items-center gap-1">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <NavLink id={id} label={label} active={active} />
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center rounded-full bg-ink text-bg px-4 py-2 text-[15px] font-medium hover:bg-orange transition-colors"
          >
            Resume
          </a>
          <button
            type="button"
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:text-orange-ink hover:border-orange transition-colors"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={17} strokeWidth={1.75} /> : <Menu size={17} strokeWidth={1.75} />}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="sm:hidden border-t border-line px-6 pb-4 pt-2">
          <ul className="flex flex-col">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <NavLink id={id} label={label} active={active} onClick={() => setMenuOpen(false)} block />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

function NavLink({
  id,
  label,
  active,
  onClick,
  block,
}: {
  id: string
  label: string
  active: string
  onClick?: () => void
  block?: boolean
}) {
  return (
    <a
      href={`#${id}`}
      aria-current={active === id ? 'true' : undefined}
      onClick={onClick}
      className={`${block ? 'block px-1 py-2.5 text-[16px]' : 'relative text-[14px] px-2.5 py-1.5 rounded-md'} transition-colors hover:text-orange-ink ${
        active === id ? 'text-orange-ink' : 'text-ink-soft'
      }`}
    >
      {label}
      {!block && active === id && (
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-orange" />
      )}
    </a>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft hover:text-orange-ink hover:border-orange transition-colors"
    >
      {isDark ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
    </button>
  )
}
