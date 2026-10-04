import Image from 'next/image'
import { LetterboxdIcon, LiveDot } from '@/components/ui/Icons'
import { FILMS } from '@/lib/data'
import { stars, type Film, type LetterboxdData } from '@/lib/letterboxd'

// Server component: diary is fetched once in Shelf and passed in.
export default function FilmShelf({ data }: { data: LetterboxdData | null }) {

  const entries: { title: string; year: string; rating: number | null; poster: string | null; url?: string }[] =
    data
      ? data.films.slice(0, 5).map((f: Film) => ({
          title: f.title,
          year: f.year,
          rating: f.rating,
          poster: f.poster,
          url: f.url,
        }))
      : FILMS.map((f) => ({ title: f.title, year: f.year, rating: f.rating, poster: null }))

  return (
    <div className="shelf-card h-full">
      <div className="shelf-card-head">
        <div className="flex min-w-0 items-center gap-2">
          <LetterboxdIcon size={30} />
          <span className="truncate text-caption font-semibold">Watching</span>
          <LiveDot live={!!data} label="Letterboxd" />
        </div>
      </div>

      <div className="shelf-card-body">
        <div className="flex h-full flex-col">
          <div className="shelf-label flex items-baseline justify-between gap-2">
            <span className="opacity-70">Recently watched</span>
            {data && (
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hit inline-flex min-h-8 shrink-0 items-center normal-case tracking-normal"
                style={{ color: '#FF8000' }}
              >
                Letterboxd →
              </a>
            )}
          </div>

          <ul className="mt-3 space-y-2">
            {entries.map((film, i) => (
              <li key={`${film.title}-${i}`} className="flex items-center gap-3">
                <Poster src={film.poster} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-caption font-semibold leading-tight">
                    {film.title}
                  </div>
                  <div className="truncate text-micro opacity-60">{film.year}</div>
                </div>
                <span
                  className="shrink-0 text-micro leading-none"
                  style={{ color: '#00E054' }}
                  aria-label={film.rating ? `${film.rating} out of 5` : 'unrated'}
                >
                  {film.rating ? stars(film.rating) : '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Poster({ src }: { src: string | null }) {
  if (src) {
    return (
      <div className="relative h-[34px] w-[23px] shrink-0 overflow-hidden rounded-sm">
        <Image src={src} alt="" width={23} height={34} className="h-full w-full object-cover" unoptimized />
      </div>
    )
  }
  return (
    <div
      className="h-[34px] w-[23px] shrink-0 rounded-sm"
      style={{ background: 'linear-gradient(135deg, #2c333d, #1b2027)' }}
    />
  )
}
