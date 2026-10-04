'use client'

import { INTERESTS } from '@/lib/data'
import { useInterests } from '@/components/ui/InterestsContext'

// Rounded photo with a little speech-bubble note. Shows the hovered interest.
// `reserve` keeps its space when nothing is hovered (desktop right column).
export default function InterestShowcase({
  className = '',
  reserve = false,
}: {
  className?: string
  reserve?: boolean
}) {
  const { active } = useInterests()
  const withPhotos = INTERESTS.filter((item) => item.photo)
  const current = withPhotos.find((item) => item.label === active)

  if (!reserve && !current) return null

  return (
    <div aria-hidden className={`w-full max-w-[280px] ${className}`}>
      {/* Spacer: room for the note above, then the 4:3 photo. */}
      <div className="pt-9">
        <div className="aspect-[4/3] w-full" />
      </div>
      {withPhotos.map((item) => {
        const on = item.label === active
        return (
          <div
            key={item.label}
            className={`absolute inset-0 flex flex-col transition-[opacity,transform] duration-300 ease-out ${
              on ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
            }`}
          >
            <div className="flex h-9 items-start pl-2">
              {item.note ? (
                <span className="rounded-full rounded-bl-[4px] bg-[#b64616] px-3 py-1.5 text-[13px] font-semibold leading-none text-white shadow-lift">
                  {item.note}
                </span>
              ) : null}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.photo}
              alt=""
              className="min-h-0 w-full flex-1 rounded-2xl object-cover shadow-lift"
            />
          </div>
        )
      })}
    </div>
  )
}
