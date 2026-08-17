'use client'

import Image from 'next/image'
import { useEffect, useId, useRef } from 'react'

const N = 6
const BASE = [0.462, 0.436, 0.47, 0.442, 0.458, 0.432]
const AMP = [0.03, 0.034, 0.026, 0.032, 0.028, 0.036]
const PHASE = [0, 1.9, 3.4, 0.8, 4.6, 2.7]
const LERP = 0.12
const PUSH_R = 150

function blobPath(scale: number, t: number) {
  const pts: [number, number][] = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2 + Math.sin(t * 0.07) * 0.05
    const r = BASE[i] + Math.sin(t * 0.36 + PHASE[i]) * AMP[i]
    pts.push([0.5 * scale + Math.cos(a) * r * scale, 0.5 * scale + Math.sin(a) * r * scale])
  }
  const n = (v: number) => v.toFixed(4)
  let d = `M${n(pts[0][0])},${n(pts[0][1])}`
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % N]
    const p3 = pts[(i + 2) % N]
    d += `C${n(p1[0] + (p2[0] - p0[0]) / 5.6)},${n(p1[1] + (p2[1] - p0[1]) / 5.6)} ${n(p2[0] - (p3[0] - p1[0]) / 5.6)},${n(p2[1] - (p3[1] - p1[1]) / 5.6)} ${n(p2[0])},${n(p2[1])}`
  }
  return d + 'Z'
}

export default function HeroPortrait({
  src = '/headshot.jpeg',
  label,
}: {
  src?: string
  label: string
}) {
  const rawId = useId().replace(/:/g, '')
  const clipRef = useRef<SVGPathElement>(null)
  const ringRef = useRef<SVGPathElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dots = Array.from(wrap.querySelectorAll<HTMLElement>('[data-dot]'))
    const state = dots.map((el) => ({
      el,
      x: 0,
      y: 0,
      s: 1,
      ox: el.offsetLeft + el.offsetWidth / 2,
      oy: el.offsetTop + el.offsetHeight / 2,
    }))
    const pointer = { x: -9999, y: -9999 }
    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    if (reduce) {
      return () => window.removeEventListener('mousemove', onMove)
    }

    let inView = true
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { rootMargin: '80px' },
    )
    io.observe(wrap)

    let last = 0
    let raf = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (document.hidden || !inView) return
      if (now - last < 32) return
      last = now
      const t = now / 1000
      clipRef.current?.setAttribute('d', blobPath(1, t))
      ringRef.current?.setAttribute('d', blobPath(200, t))

      const box = wrap.getBoundingClientRect()
      state.forEach((d) => {
        const dx = box.left + d.ox + d.x - pointer.x
        const dy = box.top + d.oy + d.y - pointer.y
        const dist = Math.hypot(dx, dy)
        let tx = 0
        let ty = 0
        let ts = 1
        if (dist < PUSH_R && dist > 0.01) {
          const push = 1 - dist / PUSH_R
          tx = (dx / dist) * push * 34
          ty = (dy / dist) * push * 34
          ts = 1 + push * 0.75
        }
        d.x += (tx - d.x) * LERP
        d.y += (ty - d.y) * LERP
        d.s += (ts - d.s) * LERP
        d.el.style.transform = `translate(${d.x.toFixed(2)}px, ${d.y.toFixed(2)}px) scale(${d.s.toFixed(3)})`
      })
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-[320px] w-[320px] md:h-[384px] md:w-[384px]">
      <span
        data-dot
        className="absolute -top-1 left-[58%] h-[15px] w-[15px] rounded-full bg-orange"
        aria-hidden
      />
      <span
        data-dot
        className="absolute top-[14%] -right-1 h-[11px] w-[11px] rounded-full bg-ink opacity-70"
        aria-hidden
      />
      <span
        data-dot
        className="absolute bottom-7 -left-2 h-[13px] w-[13px] rounded-full bg-ink opacity-50"
        aria-hidden
      />
      <span
        data-dot
        className="absolute bottom-[16%] right-[6%] h-[9px] w-[9px] rounded-full bg-orange opacity-85"
        aria-hidden
      />
      <div className="absolute inset-[10px]">
        <svg width="0" height="0" className="absolute" aria-hidden>
          <defs>
            <clipPath id={`blob-${rawId}`} clipPathUnits="objectBoundingBox">
              <path
                ref={clipRef}
                d="M0.5,0.025C0.6276,0.0246 0.7844,0.1644 0.8594,0.2925C0.9344,0.4206 0.9842,0.6296 0.92,0.7425C0.8558,0.8554 0.6477,0.9263 0.5,0.925C0.3523,0.9237 0.1564,0.8475 0.093,0.735C0.0296,0.6225 0.0722,0.4218 0.1449,0.295C0.2176,0.1682 0.3724,0.0254 0.5,0.025Z"
              />
            </clipPath>
          </defs>
        </svg>
        <div className="absolute inset-0" style={{ clipPath: `url(#blob-${rawId})` }}>
          <Image
            src={src}
            alt={label}
            fill
            priority
            sizes="384px"
            className="object-cover"
          />
        </div>
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <path
            ref={ringRef}
            d="M100,5C125.5,4.9 156.9,32.9 171.9,58.5C186.9,84.1 196.8,125.9 184,148.5C171.2,171.1 129.5,185.3 100,185C70.5,184.7 31.3,169.5 18.6,147C5.9,124.5 14.4,84.4 29,59C43.5,33.6 74.5,5.1 100,5Z"
            fill="none"
            stroke="var(--portrait-outline)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
