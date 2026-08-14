import SpotifyDashboard from '@/components/spotify/SpotifyDashboard'
import FilmShelf from '@/components/shelf/FilmShelf'
import BookShelf from '@/components/shelf/BookShelf'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { SHELF_BLURB, SHELF_HEADING } from '@/lib/data'

// Music · film · books, three-up. Music is live from Spotify (client), film is
// live from the Letterboxd RSS diary (server), books are curated in lib/data.
export default function Shelf() {
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
    </section>
  )
}
