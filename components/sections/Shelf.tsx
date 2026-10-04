import SpotifyDashboard from '@/components/spotify/SpotifyDashboard'
import { SpotifyProvider } from '@/components/spotify/SpotifyProvider'
import FilmShelf from '@/components/shelf/FilmShelf'
import MediaMix from '@/components/shelf/MediaMix'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { FILMS, SHELF_BLURB, SHELF_HEADING } from '@/lib/data'
import { getLetterboxd, type Film } from '@/lib/letterboxd'

function asDiary(films: { title: string; year: string; rating: number }[]): Film[] {
  return films.map((f) => ({
    title: f.title,
    year: f.year,
    rating: f.rating,
    watchedDate: '',
    rewatch: false,
    poster: null,
    url: '',
  }))
}

export default async function Shelf() {
  const letterboxd = await getLetterboxd()
  const films = letterboxd?.films?.length ? letterboxd.films : asDiary(FILMS)

  return (
    <section id="media" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="media" title={SHELF_HEADING} />
        <p className="mt-4 max-w-prose text-body text-ink-soft">{SHELF_BLURB}</p>
      </Reveal>

      <SpotifyProvider>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <SpotifyDashboard />
          </Reveal>
          <Reveal delay={80} className="h-full">
            <FilmShelf data={letterboxd} />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <MediaMix films={films} />
        </Reveal>
      </SpotifyProvider>
    </section>
  )
}
