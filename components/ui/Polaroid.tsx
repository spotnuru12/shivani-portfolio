import Image from 'next/image'
import type { PolaroidShot } from '@/lib/data'

export default function Polaroid({
  shot,
  className = '',
}: {
  shot: PolaroidShot
  className?: string
}) {
  const behind = shot.behind

  return (
    <div className={`polaroid-stack ${className}`}>
      {behind ? (
        <div className="polaroid-behind" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={behind.src} alt="" />
        </div>
      ) : null}
      <figure className="polaroid relative z-[1]">
        <div className="polaroid-photo relative overflow-hidden">
          {shot.src ? (
            <Image src={shot.src} alt={shot.caption} fill className="object-cover" sizes="(max-width: 768px) 156px, 188px" />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-micro uppercase tracking-[0.16em] text-black/30">
              photo
            </span>
          )}
        </div>
        <figcaption className="polaroid-caption">{shot.caption}</figcaption>
      </figure>
    </div>
  )
}
