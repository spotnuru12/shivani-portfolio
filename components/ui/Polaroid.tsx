import Image from 'next/image'
import type { PolaroidShot } from '@/lib/data'

const SPOTS = [
  { left: '0%', top: '6%', rotate: -7, z: 1 },
  { left: '42%', top: '-2%', rotate: 5, z: 3 },
  { left: '2%', top: '46%', rotate: 3, z: 2 },
  { left: '48%', top: '40%', rotate: -4, z: 4 },
] as const

export default function Polaroid({
  shot,
  index,
}: {
  shot: PolaroidShot
  index: number
}) {
  const spot = SPOTS[index % SPOTS.length]
  return (
    <figure
      className="polaroid absolute w-[54%] max-w-[280px]"
      style={{
        left: spot.left,
        top: spot.top,
        transform: `rotate(${spot.rotate}deg)`,
        zIndex: spot.z,
      }}
    >
      <div className="polaroid-photo relative overflow-hidden">
        {shot.src ? (
          <Image src={shot.src} alt={shot.caption} fill className="object-cover" sizes="280px" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[11px] uppercase tracking-[0.16em] text-black/30">
            photo
          </span>
        )}
      </div>
      <figcaption className="polaroid-caption">{shot.caption}</figcaption>
    </figure>
  )
}
