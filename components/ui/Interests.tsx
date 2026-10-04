'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { INTERESTS } from '@/lib/data'

function finePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export default function Interests() {
  const [active, setActive] = useState<string | null>(null)
  const [slot, setSlot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setSlot(document.getElementById('hero-portrait'))
  }, [])

  const current = INTERESTS.find((item) => item.label === active)
  const showPhoto = Boolean(current?.photo)

  return (
    <>
      <p className="mt-4 text-body text-ink-soft">
        Off the clock:{' '}
        {INTERESTS.map((item, i) => {
          const isLast = i === INTERESTS.length - 1
          const isActive = active === item.label
          return (
            <span key={item.label}>
              {isLast ? 'and ' : ''}
              <button
                type="button"
                className={`bg-transparent p-0 font-[inherit] text-[inherit] underline decoration-dotted decoration-orange underline-offset-4 ${
                  isActive ? 'italic text-orange-ink decoration-solid' : ''
                }`}
                onPointerEnter={() => {
                  if (finePointer()) setActive(item.label)
                }}
                onPointerLeave={() => {
                  if (finePointer()) setActive(null)
                }}
                onFocus={() => setActive(item.label)}
                onBlur={() => setActive(null)}
                onClick={() => {
                  if (!finePointer()) {
                    setActive((prev) => (prev === item.label ? null : item.label))
                  }
                }}
              >
                {item.label}
              </button>
              {isLast ? '.' : ', '}
            </span>
          )
        })}
      </p>
      {slot &&
        showPhoto &&
        current?.photo &&
        createPortal(
          <figure
            aria-hidden
            className={`interest-polaroid polaroid pointer-events-none absolute -left-3 bottom-[-12px] z-10 w-[44%] max-w-[148px] md:-left-8 ${
              showPhoto ? 'in' : ''
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.photo} alt="" className="aspect-square w-full object-cover" />
            <figcaption className="polaroid-caption">{current.label}</figcaption>
          </figure>,
          slot,
        )}
    </>
  )
}
