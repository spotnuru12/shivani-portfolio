'use client'

import { INTERESTS } from '@/lib/data'
import { useInterests } from '@/components/ui/InterestsContext'
import InterestShowcase from '@/components/ui/InterestShowcase'

function finePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

// Last About paragraph. Each interest italicizes on hover/focus/tap; ones with
// a photo show it in the box under the school block (desktop) or right under
// this paragraph (mobile).
export default function Interests() {
  const { active, setActive } = useInterests()

  return (
    <>
      <p className="m-0">
        Outside of all this, I like{' '}
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
                  if (!finePointer()) setActive((prev) => (prev === item.label ? null : item.label))
                }}
              >
                {item.label}
              </button>
              {isLast ? '.' : ', '}
            </span>
          )
        })}
      </p>
      <InterestShowcase className="relative mt-2 md:hidden" />
    </>
  )
}
