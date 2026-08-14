import SpotifyDashboard from '@/components/spotify/SpotifyDashboard'
import FilmShelf from '@/components/shelf/FilmShelf'
import BookShelf from '@/components/shelf/BookShelf'
import Reveal from '@/components/ui/Reveal'
import { SHELF_BLURB, SHELF_HEADING } from '@/lib/data'

// Music · film · books, three-up. Music is live from Spotify (client), film is
// live from the Letterboxd RSS diary (server), books are curated in lib/data.
export default function Shelf() {
  return (
    <section id="listening" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <p className="eyebrow mb-4">the shelf</p>
        <h2 className="font-display text-[30px] md:text-[38px] leading-tight">{SHELF_HEADING}</h2>
        <p className="mt-3 max-w-prose text-[16px] text-ink-soft leading-relaxed">{SHELF_BLURB}</p>
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
