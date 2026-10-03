'use client'

import { MOCK_LISTENING, MOCK_TOP_ARTISTS } from '@/lib/spotify'
import { filmWindow, listeningPlot } from '@/lib/media-stats'
import type { Film } from '@/lib/letterboxd'
import { useSharedSpotify } from '@/components/spotify/SpotifyProvider'

function Pill({ children }: { children: string }) {
  return <span className="stat-pill">{children}</span>
}

export default function MediaMix({ films, filmsLive }: { films: Film[]; filmsLive: boolean }) {
  const live = useSharedSpotify()
  const names = live.topArtistNames.length > 0 ? live.topArtistNames : MOCK_TOP_ARTISTS
  const music = listeningPlot(names, 10)
  const movies = filmWindow(films)
  const genre = (live.topGenres.length > 0 ? live.topGenres : MOCK_LISTENING.genres)[0]
  const replayHeavier = music.evenness < movies.evenness
  const meanYear = movies.meanYear !== null ? String(Math.round(movies.meanYear)) : '—'
  const rewatch =
    movies.rewatchPct !== null ? `${Math.round(movies.rewatchPct * 100)}%` : '—'

  return (
    <div className="max-w-prose text-[15px] leading-[1.7] text-ink-soft">
      <div className="flex items-baseline gap-2.5">
        <h3 className="font-display text-[22px] md:text-[24px] leading-none text-ink">Stats</h3>
        <span className="text-[12px] text-muted">
          {live.live && filmsLive ? 'live' : live.loading ? 'loading' : 'sample'}
        </span>
      </div>

      <div className="mt-4">
        <div className="font-medium text-ink">Listening</div>
        <p className="mt-1">
          <Pill>{`${music.timesEven.toFixed(1)}×`}</Pill> vs an even top 10
          {' · '}evenness <Pill>{music.evenness.toFixed(2)}</Pill>
          {genre ? (
            <>
              {' · '}
              <Pill>{genre.name}</Pill>
            </>
          ) : null}
        </p>
      </div>

      <div className="mt-3.5">
        <div className="font-medium text-ink">Film</div>
        <p className="mt-1">
          mean year <Pill>{meanYear}</Pill>
          {' · '}
          <Pill>{rewatch}</Pill> rewatches
          {' · '}
          <Pill>{String(movies.n)}</Pill> in the diary
        </p>
      </div>

      <p className="mt-3.5 text-[14px]">
        {replayHeavier
          ? 'I replay more than I rewatch. Rank-weight, last four weeks, against the public diary.'
          : 'The diary bunches by era more than the top 10 bunches by artist. Rank-weight, last four weeks, against the public diary.'}
      </p>
    </div>
  )
}
