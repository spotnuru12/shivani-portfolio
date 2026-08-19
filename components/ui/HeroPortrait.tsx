'use client'

import { useEffect, useId, useRef } from 'react'

const RIM = 4

const LOBES = [
  { cx: 112, cy: 98, rx: 74, ry: 80, ax: 7, ay: 9, ar: 5, p: 0.2 },
  { cx: 74, cy: 76, rx: 54, ry: 58, ax: 9, ay: 6, ar: 4, p: 2.15 },
  { cx: 78, cy: 132, rx: 50, ry: 52, ax: 6, ay: 10, ar: 4, p: 4.1 },
] as const

export default function HeroPortrait({
  src = '/headshot.jpeg',
  label,
}: {
  src?: string
  label: string
}) {
  const rawId = useId().replace(/:/g, '')
  const wrapRef = useRef<HTMLDivElement>(null)
  const photoRefs = useRef<(SVGEllipseElement | null)[]>([])
  const rimRefs = useRef<(SVGEllipseElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let inView = true
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { rootMargin: '80px' },
    )
    io.observe(wrap)

    let raf = 0
    let last = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (document.hidden || !inView) return
      if (now - last < 32) return
      last = now
      const t = now / 1000
      LOBES.forEach((lobe, i) => {
        const cx = lobe.cx + Math.sin(t * 0.55 + lobe.p) * lobe.ax
        const cy = lobe.cy + Math.cos(t * 0.42 + lobe.p) * lobe.ay
        const rx = lobe.rx + Math.sin(t * 0.7 + lobe.p) * lobe.ar
        const ry = lobe.ry + Math.cos(t * 0.63 + lobe.p) * lobe.ar
        setEllipse(photoRefs.current[i], cx, cy, rx, ry)
        setEllipse(rimRefs.current[i], cx, cy, rx + RIM, ry + RIM)
      })
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  const goo = `goo-${rawId}`
  const mask = `mask-${rawId}`

  return (
    <div
      ref={wrapRef}
      className="relative h-[320px] w-[320px] md:h-[384px] md:w-[384px]"
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          <filter id={goo} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
          </filter>
          <mask id={mask} maskUnits="userSpaceOnUse">
            <g filter={`url(#${goo})`} fill="#fff">
              {LOBES.map((lobe, i) => (
                <ellipse
                  key={`m-${i}`}
                  ref={(el) => {
                    photoRefs.current[i] = el
                  }}
                  cx={lobe.cx}
                  cy={lobe.cy}
                  rx={lobe.rx}
                  ry={lobe.ry}
                />
              ))}
            </g>
          </mask>
        </defs>

        <g filter={`url(#${goo})`} fill="#e4571b">
          {LOBES.map((lobe, i) => (
            <ellipse
              key={`r-${i}`}
              ref={(el) => {
                rimRefs.current[i] = el
              }}
              cx={lobe.cx}
              cy={lobe.cy}
              rx={lobe.rx + RIM}
              ry={lobe.ry + RIM}
            />
          ))}
        </g>

        <image
          href={src}
          x="8"
          y="4"
          width="184"
          height="196"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${mask})`}
        />
      </svg>
    </div>
  )
}

function setEllipse(
  el: SVGEllipseElement | null | undefined,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
) {
  if (!el) return
  el.setAttribute('cx', cx.toFixed(2))
  el.setAttribute('cy', cy.toFixed(2))
  el.setAttribute('rx', rx.toFixed(2))
  el.setAttribute('ry', ry.toFixed(2))
}
