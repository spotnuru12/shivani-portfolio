import SpotifyDashboard from '@/components/spotify/SpotifyDashboard'
import FilmShelf from '@/components/shelf/FilmShelf'
import BookShelf from '@/components/shelf/BookShelf'
import SpotifyStats from '@/components/shelf/SpotifyStats'
import FilmStats from '@/components/shelf/FilmStats'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { FILMS, SHELF_BLURB, SHELF_HEADING } from '@/lib/data'
import { getLetterboxd, type Film } from '@/lib/letterboxd'
import { filmStats } from '@/lib/media-stats'

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
  const watching = filmStats(letterboxd?.films?.length ? letterboxd.films : asDiary(FILMS))

  return (
    <section id="listening" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="the shelf" title={SHELF_HEADING} />
        <p className="mt-4 max-w-prose text-[16px] text-ink-soft leading-relaxed">{SHELF_BLURB}</p>
      </Reveal>

      <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
        <Reveal className="h-full">
          <SpotifyDashboard />
        </Reveal>
        <Reveal delay={80} className="h-full">
          <FilmShelf />
        </Reveal>
        <Reveal delay={160} className="h-full">
          <BookShelf />
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <p className="eyebrow eyebrow-lg mb-4">the numbers</p>
        <h3 className="font-display text-[32px] md:text-[42px] leading-[1.05]">
          Listening and watching, plotted
        </h3>
        <p className="mt-3 max-w-prose text-[15px] text-ink-soft leading-relaxed">
          Same two feeds as the cards above, plotted. Spotify is the last four weeks of
          top artists. Letterboxd is the public diary RSS, not the whole lifetime log.
        </p>
      </Reveal>

      <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
        <Reveal className="h-full">
          <SpotifyStats />
        </Reveal>
        <Reveal delay={80} className="h-full">
          <FilmStats
            stats={watching}
            live={!!letterboxd}
            profileUrl={letterboxd?.profileUrl ?? null}
          />
        </Reveal>
      </div>
    </section>
  )
}
