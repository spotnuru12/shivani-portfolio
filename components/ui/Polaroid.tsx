import Image from 'next/image'
import type { PolaroidShot } from '@/lib/data'

export default function Polaroid({
  shot,
  className = '',
}: {
  shot: PolaroidShot
  className?: string
}) {
  return (
    <figure className={`polaroid ${className}`}>
      <div className="polaroid-photo relative overflow-hidden">
        {shot.src ? (
          <Image
            src={shot.src}
            alt={shot.alt ?? shot.caption ?? ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 156px, 188px"
            style={{ objectPosition: shot.position }}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[10px] uppercase tracking-[0.16em] text-black/30">
            photo
          </span>
        )}
      </div>
      {shot.caption ? (
        <figcaption className="polaroid-caption">{shot.caption}</figcaption>
      ) : (
        <div aria-hidden className="h-10" />
      )}
    </figure>
  )
}
