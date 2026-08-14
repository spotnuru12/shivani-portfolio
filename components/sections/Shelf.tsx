import SpotifyDashboard from '@/components/spotify/SpotifyDashboard'
import FilmShelf from '@/components/shelf/FilmShelf'
import BookShelf from '@/components/shelf/BookShelf'
import CurrentlyStrip from '@/components/shelf/CurrentlyStrip'
import ShelfStats from '@/components/shelf/ShelfStats'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { BOOKS, CURRENTLY_INTO, SHELF_BLURB, SHELF_HEADING } from '@/lib/data'
import { getLetterboxd } from '@/lib/letterboxd'

// Music · film · books, three-up on a ledge. Music is live from Spotify
// (client), film is live from the Letterboxd RSS diary (server), books are
// curated in lib/data.
export default async function Shelf() {
  const letterboxd = await getLetterboxd()

  const reading = BOOKS.find((b) => b.status === 'reading')?.title ?? null
  const watching = letterboxd?.films[0]?.title ?? null

  const stats = [
    letterboxd?.filmsThisYear != null
      ? { value: String(letterboxd.filmsThisYear), label: 'films this year' }
      : null,
    letterboxd?.avgRecentRating != null
      ? { value: `${letterboxd.avgRecentRating.toFixed(1)}★`, label: 'average rating' }
      : null,
    { value: String(BOOKS.filter((b) => b.status === 'finished').length), label: 'books finished' },
  ].filter((s): s is { value: string; label: string } => s !== null)

  return (
    <section id="listening" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="the shelf" title={SHELF_HEADING} />
        <p className="mt-4 max-w-prose text-[16px] text-ink-soft leading-relaxed">{SHELF_BLURB}</p>
      </Reveal>

      <Reveal delay={60} className="mt-8">
        <CurrentlyStrip reading={reading} watching={watching} into={CURRENTLY_INTO} />
      </Reveal>

      <div className="mt-10">
        <div className="grid items-stretch gap-5 md:grid-cols-3">
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
        <div className="relative" aria-hidden>
          <div className="shelf-ledge" />
          <span className="shelf-bracket shelf-bracket-l" />
          <span className="shelf-bracket shelf-bracket-r" />
        </div>
      </div>

      <Reveal delay={80} className="mt-14">
        <ShelfStats stats={stats} />
      </Reveal>
    </section>
  )
}
